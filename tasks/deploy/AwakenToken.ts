import ethers from "ethers";
import { task } from "hardhat/config";
import { getLzEndpoint } from "../../constants/lzEndpoint";

task("deploy:token")
  .addParam("name", undefined, "Awaken Token")
  .addParam("symbol", undefined, "AWG")
  .addParam("supply", undefined, "0")
  .addFlag("verify", "Verify contracts at Etherscan")
  .setAction(async ({ name, symbol, supply: initSuply, verify }, hre) => {
    const contractFactory = await hre.ethers.getContractFactory("AwakenToken");

    const supply = ethers.parseUnits(initSuply || "0", 18);
    const lzEndpoint = getLzEndpoint(hre.network.name);

    const contract = await contractFactory.deploy(name, symbol, lzEndpoint, supply);
    await contract.waitForDeployment();

    const contractAddress = await contract.getAddress();
    console.log("Contract deployed to: ", contractAddress);

    if (verify) {
      // We need to wait a little bit to verify the contract after deployment
      await new Promise(resolve => setTimeout(resolve, 30000));
      await hre.run("verify:verify", {
        address: contractAddress,
        constructorArguments: [name, symbol, lzEndpoint, supply],
        libraries: {},
      });
    }
  });
