import { Address } from "web3";
import { Network } from "../enums/network";

/// https://docs.layerzero.network/contracts/endpoint-addresses

type LZ_ENDPOINT_MAP = {
  [key in Network]: Address;
};

const lzEndpoint: LZ_ENDPOINT_MAP = {
  [Network.arbitrum_sepolia]: "0x6edce65403992e310a62460808c4b910d972f10f",
  [Network.avalanche_fuji]: "0x6edce65403992e310a62460808c4b910d972f10f",
  [Network.zksync_sepolia]: "0x79B6b18Ef779403F7a709970825B8Cf737E27887",
  [Network.arbitrum]: "0x1a44076050125825900e736c501f859c50fe728c",
  [Network.avalanche]: "0x1a44076050125825900e736c501f859c50fe728c",
  [Network.zksync_era]: "0xd07C30aF3Ff30D96BDc9c6044958230Eb797DDBF",
};

export const getLzEndpoint = (network: Network | string): string => {
  if (!network || !lzEndpoint[network as Network]) throw Error(`Not support ${network}`);

  return lzEndpoint[network as Network];
};
