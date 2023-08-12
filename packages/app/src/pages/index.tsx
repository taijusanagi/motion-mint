import { useRouter } from "next/router";
import { Inter } from "next/font/google";

import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Button from "@/components/Button";
import useIsConnected from "@/hooks/useIsConnected";
import { FaRocket, FaDollarSign, FaUsers } from "react-icons/fa";

const inter = Inter({ subsets: ["latin"] });

export default function LandingPage() {
  const router = useRouter();
  const { isConnected } = useIsConnected();
  return (
    <div
      className={`break-all min-h-screen flex flex-col bg-gradient-to-r from-green-100 to-blue-100 ${inter.className}`}
    >
      <Header />

      <main className="flex-1 mx-auto w-full max-w-4xl px-4">
        <section className="text-center py-24">
          <h1 className="text-4xl font-bold text-primary mb-4">MotionMint</h1>
          <p className="text-xl text-default mb-8">Transforming Videos into Certified Motion Data with AI.</p>
          <Button
            label={!isConnected ? "Connect Wallet" : "Start App"}
            className="bg-primary text-default mx-2"
            onClick={() => {
              if (!isConnected) {
              } else {
                router.push("/upload");
              }
            }}
          />
        </section>
        <section className="py-8 flex justify-center">
          <video autoPlay muted loop className="background-video h-80 rounded-md shadow-sm">
            <source src="/demo.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </section>
        <section className="py-8 text-center">
          <h2 className="text-3xl font-bold text-default mb-8">About</h2>
          <p className="text-lg text-default">
            {`MotionMint, where videos do more than play, they transform. Our advanced AI turns videos into motion data, and each motion is stamped with trust, coming from verified creators attestaion.`}
          </p>
        </section>
        <section className="py-8 text-center">
          <h2 className="text-3xl font-bold text-default mb-8">Benefits</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
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
              <h3 className="text-xl font-semibold text-default mb-2">Verifiable</h3>
              <p className="text-default">Users can verify the content is original content by the creator.</p>
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
        <section className="py-8 text-center">
          <h2 className="text-3xl font-bold text-default mb-8">Technical Detail</h2>
          <img src="/diagram.png" alt="MotionMint" className="mx-auto" />
        </section>
      </main>
      <Footer />
    </div>
  );
}
