import "@/styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import type { AppProps } from "next/app";

import { getDefaultWallets, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { configureChains, createConfig, WagmiConfig } from "wagmi";
import { goerli, optimismGoerli, baseGoerli, zoraTestnet } from "wagmi/chains";
import { publicProvider } from "wagmi/providers/public";

const { chains, publicClient } = configureChains([goerli, optimismGoerli, baseGoerli, zoraTestnet], [publicProvider()]);

const { connectors } = getDefaultWallets({
  appName: "MotionMint",
  projectId: "motion-mint",
  chains,
});

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors,
  publicClient,
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig config={wagmiConfig}>
      <RainbowKitProvider chains={chains}>
        <Component {...pageProps} />{" "}
      </RainbowKitProvider>
    </WagmiConfig>
  );
}
