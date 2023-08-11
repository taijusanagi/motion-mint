import { ZDK, ZDKNetwork, ZDKChain } from "@zoralabs/zdk";
import { useEffect, useState } from "react";
import { useNetwork } from "wagmi";
const useZora = () => {
  const [zdk, setZDK] = useState<ZDK>();

  const { chain } = useNetwork();

  useEffect(() => {
    if (!chain) {
      return;
    }
    let networkInfo = {} as any;
    if (chain.id === 5) {
      //Ethereum Georli
      networkInfo = {
        network: ZDKNetwork.Ethereum,
        chain: ZDKChain.Goerli,
      };
    } else if (chain.id === 420) {
      //Optimism Georli
      networkInfo = {
        network: ZDKNetwork.Optimism,
        chain: ZDKChain.OptimismGoerli,
      };
    } else if (chain.id === 999) {
      //ZORA Georli
      networkInfo = {
        network: ZDKNetwork.Zora,
        chain: ZDKChain.ZoraGoerli,
      };
    } else if (chain.id === 84531) {
      //Base Georli
      networkInfo = {
        network: ZDKNetwork.Base,
        chain: ZDKChain.BaseGoerli,
      };
    } else {
      return;
    }
    const API_ENDPOINT = "https://api.zora.co/graphql";
    const args = {
      endPoint: API_ENDPOINT,
      networks: [networkInfo],
    };
    const zdk = new ZDK(args);
    setZDK(zdk);
  }, [chain]);

  return { zdk };
};

export default useZora;
