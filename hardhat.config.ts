import "@nomicfoundation/hardhat-chai-matchers";
import "@nomicfoundation/hardhat-toolbox";
import "@nomicfoundation/hardhat-ethers";
import "@openzeppelin/hardhat-upgrades";
import "dotenv/config";
import { HardhatUserConfig } from "hardhat/config";
import { NetworkUserConfig } from "hardhat/types";

import { Network } from "./enums/network";

import "./tasks/accounts";
import "./tasks/clean";
import "./tasks/deploy";
import "./tasks/layerzero";

// Ensure that we have all the environment variables we need.

const privateKey: string | undefined = process.env.PRIVATE_KEY;
if (!privateKey) {
  throw new Error("Please set your PRIVATE_KEY in a .env file");
}

const networkMap: {
  [key in Network]: NetworkUserConfig;
} = {
  [Network.arbitrum_sepolia]: {
    url: `https://sepolia-rollup.arbitrum.io/rpc`,
    chainId: 421614,
    accounts: [`0x${privateKey}`],
  },
  [Network.avalanche_fuji]: {
    url: "https://api.avax-test.network/ext/bc/C/rpc",
    chainId: 43113,
    accounts: [`0x${privateKey}`],
  },
  [Network.zksync_sepolia]: {
    url: "https://sepolia.era.zksync.dev",
    chainId: 300,
    accounts: [`0x${privateKey}`],
  },
  [Network.arbitrum]: {
    url: `https://arb1.arbitrum.io/rpc`,
    chainId: 42161,
    accounts: [`0x${privateKey}`],
  },
  [Network.avalanche]: {
    url: "https://api.avax.network/ext/bc/C/rpc",
    chainId: 43114,
    accounts: [`0x${privateKey}`],
  },
  [Network.zksync_era]: {
    url: "https://mainnet.era.zksync.io",
    chainId: 324,
    accounts: [`0x${privateKey}`],
  },
};

const apiKey: { [key in Network]: string } = {
  [Network.arbitrum_sepolia]: process.env.ARBITRUM_API_KEY,
  [Network.avalanche_fuji]: process.env.AVALANCHE_API_KEY,
  [Network.zksync_sepolia]: process.env.ZKSYNC_API_KEY,
  [Network.arbitrum]: process.env.ARBITRUM_API_KEY,
  [Network.avalanche]: process.env.AVALANCHE_API_KEY,
  [Network.zksync_era]: process.env.ZKSYNC_API_KEY,
};

const config: HardhatUserConfig = {
  defaultNetwork: process.env.NETWORK || Network.avalanche_fuji,
  gasReporter: {
    currency: "USDT",
    enabled: process.env.REPORT_GAS ? true : false,
    excludeContracts: [],
    src: "./contracts",
  },
  networks: {
    hardhat: {
      accounts: { mnemonic: "here is where your twelve words mnemonic should be put my friend" },
      chainId: 31337,
    },
    ...networkMap,
  },
  paths: {
    artifacts: "./artifacts",
    cache: "./cache",
    sources: "./contracts",
    tests: "./test",
  },
  solidity: {
    compilers: [
      {
        version: "0.8.2",
        settings: {
          metadata: {
            // Not including the metadata hash
            // https://github.com/paulrberg/solidity-template/issues/31
            bytecodeHash: "none",
          },
          // Disable the optimizer when debugging
          // https://hardhat.org/hardhat-network/#solidity-optimizer-support
          optimizer: {
            enabled: true,
            runs: 800,
          },
        },
      },
    ],
    settings: {
      outputSelection: {
        "*": {
          "*": [
            "abi",
            "evm.bytecode",
            "evm.deployedBytecode",
            "evm.methodIdentifiers",
            "metadata",
          ],
          "": ["ast"],
        },
      },
    },
  },
  typechain: {
    outDir: "typechain",
    target: "ethers-v6",
  },
  etherscan: {
    // Your API key for Etherscan
    // Obtain one at https://etherscan.io/
    apiKey,
    customChains: [
      {
        network: Network.avalanche_fuji,
        chainId: 43113,
        urls: {
          apiURL: "https://api.routescan.io/v2/network/testnet/evm/43113/etherscan",
          browserURL: "https://avalanche.testnet.routescan.io",
        },
      },
      {
        network: Network.arbitrum_sepolia,
        chainId: 421614,
        urls: {
          apiURL: "https://api-sepolia.arbiscan.io/api",
          browserURL: "https://sepolia.arbiscan.io",
        },
      },
    ],
  },
  sourcify: {
    enabled: true,
  },
};

export default config;
