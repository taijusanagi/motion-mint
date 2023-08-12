import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.18",
  networks: {
    "optimism-goerli": {
      url: "https://goerli.optimism.io",
      accounts: [process.env.PRIVATE_KEY as string],
    },
    "base-goerli": {
      url: "https://goerli.base.org",
      accounts: [process.env.PRIVATE_KEY as string],
    },
  },
};

export default config;
