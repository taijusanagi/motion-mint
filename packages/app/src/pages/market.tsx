// pages/marketplace.tsx

import React from "react";
import { FaSearch } from "react-icons/fa";
import { useRouter } from "next/router";
import { Inter } from "next/font/google";
import Header from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

const Market: React.FC = () => {
  const router = useRouter();
  const headerState = {
    isConnected: true,
    userAddress: "0x1234...abcd",
  };

  const motions = [
    {
      id: "1",
      thumbnailUrl: "https://via.placeholder.com/400",
      price: 59.99,
      licenseType: "Standard",
      creatorName: "Alice",
    },
    {
      id: "2",
      thumbnailUrl: "https://via.placeholder.com/400",
      price: 99.99,
      licenseType: "Exclusive",
      creatorName: "Bob",
    },
    {
      id: "3",
      thumbnailUrl: "https://via.placeholder.com/400",
      price: 99.99,
      licenseType: "Exclusive",
      creatorName: "Bob",
    },
    {
      id: "4",
      thumbnailUrl: "https://via.placeholder.com/400",
      price: 99.99,
      licenseType: "Exclusive",
      creatorName: "Bob",
    },
    {
      id: "5",
      thumbnailUrl: "https://via.placeholder.com/400",
      price: 99.99,
      licenseType: "Exclusive",
      creatorName: "Bob",
    },
  ];

  return (
    <div className={`min-h-screen flex flex-col bg-gradient-to-r from-green-100 to-blue-100 ${inter.className}`}>
      <Header {...headerState} />
      <main className="flex-1 mx-auto w-full max-w-4xl py-12 px-4 relative">
        <h2 className="text-2xl font-bold text-default mb-2">Market</h2>
        <p className="mb-4 text-xs text-accent">
          Motion data listed on market. Go to motion detail page to test buy/sell functinality.
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {motions.map((motion, idx) => (
            <div
              key={idx}
              className="border p-2 rounded-md shadow-sm bg-default cursor-pointer"
              onClick={() => {
                router.push(`/motions/${motion.id}`);
              }}
            >
              <img
                src={motion.thumbnailUrl}
                alt="Motion Thumbnail"
                className="mb-2 w-full h-40 object-cover rounded-md"
              />
              <p className="font-bold mb-4 text-right">${motion.price.toFixed(2)}</p>
              <div className="flex justify-between items-center">
                <p className="text-xs mr-2">{motion.licenseType}</p>
                <p className="text-xs text-primary">@{motion.creatorName}</p>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Market;
