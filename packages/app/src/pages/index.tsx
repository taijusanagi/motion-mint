// pages/index.tsx

import { Inter } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Button from "@/components/Button";

import { FaRocket, FaDollarSign, FaUsers } from "react-icons/fa";

const inter = Inter({ subsets: ["latin"] });

export default function LandingPage() {
  const headerState = {
    isConnected: true, // user is connected
    userAddress: "0x1234...abcd", // user's Ethereum address
    isCreator: true, // user is a creator
  };

  return (
    <div className={`min-h-screen flex flex-col ${inter.className}`}>
      <Header {...headerState} />

      <main className="flex-1 mx-auto max-w-4xl p-4">
        <section className="text-center py-24">
          <h1 className="text-4xl font-bold text-primary mb-4">MotionMint</h1>
          <p className="text-xl text-default mb-8">Motion, Mint, Monetize - The Future of Motion Data.</p>
          <Button label="Connect Wallet" className="bg-primary text-default mx-2" />
        </section>
        <section className="py-8 text-center">
          <h2 className="text-3xl font-bold text-default mb-8">About</h2>
          <p className="text-lg text-default">
            MotionMint is where videos evolve into valuable motion data, enabling creators to showcase, share, and
            monetize their dynamic artistry.
          </p>
        </section>

        <section className="py-8 text-center">
          <h2 className="text-3xl font-bold text-default mb-8">Benefits</h2>
          <div className="grid grid-cols-3 gap-8">
            <div className="text-center flex flex-col items-center">
              <div className="text-3xl text-primary mb-4">
                <FaRocket />
              </div>
              <h3 className="text-xl font-semibold text-default mb-2">Seamless Conversion</h3>
              <p className="text-default">Transform videos into motion data effortlessly with cutting-edge AI.</p>
            </div>
            <div className="text-center flex flex-col items-center">
              <div className="text-3xl text-primary mb-4">
                <FaDollarSign />
              </div>
              <h3 className="text-xl font-semibold text-default mb-2">Monetization Opportunity</h3>
              <p className="text-default">Unlock new revenue streams by selling motion data rights.</p>
            </div>
            <div className="text-center flex flex-col items-center">
              <div className="text-3xl text-primary mb-4">
                <FaUsers />
              </div>
              <h3 className="text-xl font-semibold text-default mb-2">Showcase & Share</h3>
              <p className="text-default">
                A dedicated platform to display, gain recognition, and connect with a like-minded community.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
