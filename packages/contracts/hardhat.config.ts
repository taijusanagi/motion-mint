import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";

const config: HardhatUserConfig = {
  solidity: "0.8.18",
  networks: {
    "optimism-georli": {
      url: "https://goerli.optimism.io",
      accounts: [process.env.PRIVATE_KEY as string],
    },
    "base-georli": {
      url: "https://goerli.base.org",
      accounts: [process.env.PRIVATE_KEY as string],
    },
  },
};

export default config;
