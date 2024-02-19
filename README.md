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
1. Deploy AwakenToken to the main network
2. Deploy AwakenToken to the second network
3. Sets the peer token address