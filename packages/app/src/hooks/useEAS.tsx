import { easAddresses, easSubDomain } from "@/utils/eas";
import { EAS } from "@ethereum-attestation-service/eas-sdk";
import { useEffect, useState } from "react";
import { useNetwork, usePublicClient } from "wagmi";
import { ethers } from "ethers";

const useEAS = () => {
  const publicClient = usePublicClient();
  const [eas, setEAS] = useState<EAS>();
  const [subdomain, setSubdomain] = useState("");

  const { chain } = useNetwork();

  useEffect(() => {
    if (!chain) {
      setEAS(undefined);
      setSubdomain("");
      return;
    }
    let eas = {} as EAS;
    if (chain.id === 5) {
      //Ethereum Georli
      setEAS(undefined);
      setSubdomain("");
      return;
    } else if (chain.id === 420) {
      //Optimism Georli
      eas = new EAS(easAddresses["optimism-goerli"]);
      eas.connect(ethers.getDefaultProvider("optimism-goerli"));
      setSubdomain(easSubDomain["optimism-goerli"]);
    } else if (chain.id === 999) {
      //ZORA Georli
      setEAS(undefined);
      setSubdomain("");
      return;
    } else if (chain.id === 84531) {
      //Base Georli
      eas = new EAS(easAddresses["base-goerli"]);
      eas.connect(ethers.getDefaultProvider("base-goerli"));
      setSubdomain(easSubDomain["base-goerli"]);
    } else {
      setEAS(undefined);
      setSubdomain("");
      return;
    }
    setEAS(eas);
  }, [chain]);

  return { subdomain, eas };
};

export default useEAS;
