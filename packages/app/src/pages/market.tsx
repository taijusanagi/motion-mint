// pages/marketplace.tsx

import React from "react";
import { FaSearch } from "react-icons/fa";
import { Inter } from "next/font/google";
import Header from "@/components/Header";

const inter = Inter({ subsets: ["latin"] });

const Market: React.FC = () => {
  const headerState = {
    isConnected: true,
    userAddress: "0x1234...abcd",
  };

  const motions = [
    {
      thumbnailUrl: "https://via.placeholder.com/400",
      price: 59.99,
      licenseType: "Standard",
      creatorName: "Alice",
    },
    {
      thumbnailUrl: "https://via.placeholder.com/400",
      price: 99.99,
      licenseType: "Exclusive",
      creatorName: "Bob",
    },
    {
      thumbnailUrl: "https://via.placeholder.com/400",
      price: 99.99,
      licenseType: "Exclusive",
      creatorName: "Bob",
    },
    {
      thumbnailUrl: "https://via.placeholder.com/400",
      price: 99.99,
      licenseType: "Exclusive",
      creatorName: "Bob",
    },
    {
      thumbnailUrl: "https://via.placeholder.com/400",
      price: 99.99,
      licenseType: "Exclusive",
      creatorName: "Bob",
    },
  ];

  return (
    <div className={`min-h-screen flex flex-col ${inter.className}`}>
      <Header {...headerState} />
      <main className="flex-1 mx-auto w-full max-w-4xl py-12 px-4 relative">
        <p className="mb-4 text-xs text-accent">
          Advanced functions like search/fillter are not implemented yet. Go to motion detail page to test buy/sell
          functinality.
        </p>
        <div className="mb-8 relative rounded-md shadow-sm">
          <input
            type="text"
            placeholder="Search motion data or creators..."
            className="w-full p-4 border rounded-md bg-default placeholder-default"
            disabled={true}
          />
          <FaSearch className="absolute top-1/2 transform -translate-y-1/2 right-5 text-accent" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {motions.map((motion, idx) => (
            <div key={idx} className="border p-4 rounded-md shadow-sm text-center bg-default">
              <img
                src={motion.thumbnailUrl}
                alt="Motion Thumbnail"
                className="mb-4 w-full h-32 object-cover rounded-md"
              />
              <p className="text-lg font-bold mb-2">${motion.price.toFixed(2)}</p>
              <p className="text-sm mb-2">{motion.licenseType}</p>
              <p className="text-xs text-accent">{motion.creatorName}</p>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Market;
