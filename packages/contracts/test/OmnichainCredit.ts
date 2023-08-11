/* eslint-disable @typescript-eslint/no-explicit-any */
import { ethers, network } from "hardhat";
import { targets, chainIds, endpoints, contracts } from "../config/networks";
import { ethers as _ethers } from "ethers";

describe("Lock", function () {
  // We define a fixture to reuse the same setup in every test.
  // We use loadFixture to run this setup once, snapshot that state,
  // and reset Hardhat Network to that snapshot in every test.
  async function setup() {
    const target = (targets as any)[network.name];
    console.log("network name", network.name);
    console.log("target", target);

    const targetChainId = (chainIds as any)[target];
    const localContract = (contracts as any)[network.name];
    console.log("localContract", localContract);
    const remoteContract = (contracts as any)[target];
    console.log("remoteContract", remoteContract);
    const localEndpoint = (endpoints as any)[network.name];
    console.log("targetEndpoint", localEndpoint);

    // Contracts are deployed using the first signer/account by default
    const OmnichainCredit = await ethers.getContractFactory("OmnichainCredit");
    // const omnichainCredit = await OmnichainCredit.deploy(localEndpoint);
    const omnichainCredit = (await OmnichainCredit.attach(localContract)) as any;
    console.log("omnichainCredit", await omnichainCredit.getAddress());

    const [signer] = await ethers.getSigners();
    return { signer, omnichainCredit, targetChainId, remoteContract, localContract };
    // await omnichainCredit.setTrustedRemote(targetChainId, trustedRemote);
  }

  describe("Setup", function () {
    if (network.name === "hardhat") {
      return;
    }
    it("Query", async function () {
      const { signer, omnichainCredit } = await setup();
      const signerAddress = await signer.getAddress();
      console.log("signerAddress", signerAddress);
      console.log("credit", await omnichainCredit.credit(signerAddress));
      console.log("isNotFirstTime", await omnichainCredit.isNotFirstTime(signerAddress));
    });

    it.skip("Set Trusted Remote", async function () {
      const { omnichainCredit, remoteContract, localContract, targetChainId } = await setup();
      const trustedRemote = _ethers.solidityPacked(["address", "address"], [remoteContract, localContract]);
      console.log("trustedRemote", trustedRemote);
      const isTrustedRemote = await omnichainCredit.isTrustedRemote(targetChainId, trustedRemote);
      if (!isTrustedRemote) {
        console.log("registering trusted remote");
        await omnichainCredit.setTrustedRemote(targetChainId, trustedRemote);
      } else {
        console.log("trusted remote already registered");
      }
    });

    it.skip("Use in local", async function () {
      const { omnichainCredit } = await setup();
      const tx = await omnichainCredit.useCredit(0, 1);
      console.log(tx.hash);
    });

    it.skip("Use in remote", async function () {
      const { omnichainCredit, targetChainId } = await setup();
      const tx = await omnichainCredit.useCredit(targetChainId, 1, { value: ethers.parseEther("0.001") });
      console.log(tx.hash);
    });
  });
});
