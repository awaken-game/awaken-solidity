import { Network } from "../enums/network";

/// https://docs.layerzero.network/contracts/endpoint-addresses

type LZ_ENDPOINT_ID_MAP = {
  [key in Network]: number;
};

const lzEndpointId: LZ_ENDPOINT_ID_MAP = {
  [Network.arbitrum_sepolia]: 40231,
  [Network.avalanche_fuji]: 40106,
  [Network.zksync_sepolia]: 40248,
  [Network.arbitrum]: 30110,
  [Network.avalanche]: 30106,
  [Network.zksync_era]: 30165,
};

export const getLzEndpointId = (network: Network | string): number => {
  if (!network || !lzEndpointId[network as Network]) throw Error(`Not support ${network}`);

  return lzEndpointId[network as Network];
};
