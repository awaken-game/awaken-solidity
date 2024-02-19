# Awaken Solidity

## Contracts

| Name | Feature |
|--|--|
| AwakenToken.sol | ERC20 token of Awaken |


## Deploy and verify contract

```
npx hardhat deploy:token --network {network} --name {token_name} --symbol {token_symbol} --supply {token_suply} --verify
```

## Deploy flow
1. Deploy AwakenToken to the main network with suply `200.000.000`
2. Deploy AwakenToken to the second network with suply `0`
3. Sets the peer token address

## Example deploy testnet (Avalanche Fuji - Arbitrum Sepolia)

### 1. Deploy token

- avalanche_fuji: `npx hardhat deploy:token --network avalanche_fuji --name "Awaken Token" --symbol AWG --supply 200000000`

- arbitrum_sepolia: `npx hardhat deploy:token --network arbitrum_sepolia --name "Awaken Token" --symbol AWG`

### 2. Set peer

- avalanche_fuji: `npx hardhat lzSetPeer --network avalanche_fuji --remotenetwork arbitrum_sepolia --local {token_avalanche_address} --remote {token_arbitrum_address}`

- arbitrum_sepolia: `npx hardhat lzSetPeer --network arbitrum_sepolia --remotenetwork avalanche_fuji --local {token_arbitrum_address} --remote {token_avalanche_address}`

### 3. Send token

- Avalanche Fuji -> Arbitrum Sepolia: `npx hardhat lzSend --network avalanche_fuji --remotenetwork arbitrum_sepolia --local {token_avalanche_address} --to {destination} --qty {qty}`

- Arbitrum Sepolia -> Avalanche Fuji: `npx hardhat lzSend --network arbitrum_sepolia --remotenetwork avalanche_fuji --local {token_arbitrum_address} --to {destination} --qty {qty}`
