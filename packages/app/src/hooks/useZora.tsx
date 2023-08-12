import { ZDK, ZDKNetwork, ZDKChain } from "@zoralabs/zdk";
import { useEffect, useState } from "react";
import { useNetwork } from "wagmi";

const useZora = () => {
  const [zdk, setZDK] = useState<ZDK>();
  const [zoraSubdomain, setZoraSubdomain] = useState<string>("");

  const { chain } = useNetwork();

  useEffect(() => {
    if (!chain) {
      setZDK(undefined);
      setZoraSubdomain("");
      return;
    }
    let networkInfo = {} as any;
    if (chain.id === 5) {
      //Ethereum Georli
      setZDK(undefined);
      setZoraSubdomain("");
      return;
    } else if (chain.id === 420) {
      //Optimism Georli
      networkInfo = {
        network: ZDKNetwork.Optimism,
        chain: ZDKChain.OptimismGoerli,
      };
      setZoraSubdomain("ogor");
    } else if (chain.id === 999) {
      //ZORA Georli
      networkInfo = {
        network: ZDKNetwork.Zora,
        chain: ZDKChain.ZoraGoerli,
      };
      setZoraSubdomain("zgor");
    } else if (chain.id === 84531) {
      //Base Georli
      networkInfo = {
        network: ZDKNetwork.Base,
        chain: ZDKChain.BaseGoerli,
      };
      setZoraSubdomain("basegor");
    } else {
      setZDK(undefined);
      setZoraSubdomain("");
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

  return { zdk, zoraSubdomain };
};

export default useZora;
