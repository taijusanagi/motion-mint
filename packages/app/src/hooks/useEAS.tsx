import { easAddresses } from "@/utils/eas";
import { EAS } from "@ethereum-attestation-service/eas-sdk";
import { useEffect, useState } from "react";
import { useNetwork, usePublicClient } from "wagmi";
import { ethers } from "ethers";

const useEAS = () => {
  const publicClient = usePublicClient();
  const [eas, setEAS] = useState<EAS>();

  const { chain } = useNetwork();

  useEffect(() => {
    if (!chain) {
      setEAS(undefined);
      return;
    }
    let eas = {} as EAS;
    if (chain.id === 5) {
      //Ethereum Georli
      setEAS(undefined);
      return;
    } else if (chain.id === 420) {
      //Optimism Georli
      eas = new EAS(easAddresses["optimism-goerli"]);
      eas.connect(ethers.getDefaultProvider("optimism-goerli"));
    } else if (chain.id === 999) {
      //ZORA Georli
      setEAS(undefined);
      return;
    } else if (chain.id === 84531) {
      //Base Georli
      eas = new EAS(easAddresses["base-goerli"]);
      eas.connect(ethers.getDefaultProvider("base-goerli"));
    } else {
      setEAS(undefined);
      return;
    }
    setEAS(eas);
  }, [chain]);

  return { eas };
};

export default useEAS;
