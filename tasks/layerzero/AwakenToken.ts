import { Options, addressToBytes32 } from "@layerzerolabs/lz-utility-v2";
import { task } from "hardhat/config";
import { SendParamStruct } from "typechain/contracts/AwakenToken";
import { Address } from "web3";
import { getLzEndpointId } from "../../constants/lzEndpointId";
import { Network } from "../../enums/network";

task("lzSetPeer")
  .addParam<Address>("local", "local addresss")
  .addParam<Address>("remote", "remote addresss")
  .addParam<Network>("remotenetwork")
  .setAction(async ({ local, remote, remotenetwork }, hre) => {
    const remoteLzEndpointId = getLzEndpointId(remotenetwork);

    const localContract = await hre.ethers.getContractAt("AwakenToken", local);
    const remoteAddressBytes32 = addressToBytes32(remote);
    const isTrustedRemoteSet = await localContract.isPeer(remoteLzEndpointId, remoteAddressBytes32);

    if (isTrustedRemoteSet) {
      console.log("Already set remote");
      return;
    }

    try {
      const transaction = await localContract.setPeer(remoteLzEndpointId, remoteAddressBytes32);
      const transactionHash = await transaction.wait();
      console.log(`✅ tx: ${transactionHash?.hash}`);
    } catch (e: any) {
      if (e.error.message.includes("The chainId + address is already trusted")) {
        console.log("Already set remote");
      } else {
        console.log(`❌ [${hre.network.name}] setPeer(${remoteLzEndpointId}, ${remoteAddressBytes32})`);
      }
    }
  });

task("lzSend")
  .addParam<number>("qty", "qty")
  .addParam<Address>("local", "local contract address")
  .addParam<Address>("to", "destination addresss")
  .addParam<Network>("remotenetwork")
  .setAction(async ({ qty: qtyInput, local, to, remotenetwork }, hre) => {
    const qty = hre.ethers.parseEther(qtyInput);
    const remoteLzEndpointId = getLzEndpointId(remotenetwork);

    const localContract = await hre.ethers.getContractAt("AwakenToken", local);

    const remoteAddressBytes32 = addressToBytes32(to);

    // use 200000 wei in native gas on destination
    const extraOptions = Options.newOptions().addExecutorLzReceiveOption(200000, 0);

    const sendParams: SendParamStruct = {
      dstEid: remoteLzEndpointId,
      to: remoteAddressBytes32,
      amountLD: qty,
      minAmountLD: qty,
      extraOptions: extraOptions.toHex(),
      composeMsg: "0x",
      oftCmd: "0x",
    };

    // estimate send fee
    const fee = await localContract.quoteSend(sendParams, false);

    // send
    const [{ address: refund }] = await hre.ethers.getSigners();

    const send = await localContract.send(sendParams, fee, refund, { value: fee.nativeFee });

    const receipt = await send.wait();
    console.log({ receipt });
  });
