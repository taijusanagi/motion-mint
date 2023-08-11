import React from "react";
import { FaBars } from "react-icons/fa";

import Link from "next/link";
import useIsConnected from "@/hooks/useIsConnected";

import { ConnectButton } from "@rainbow-me/rainbowkit";

const Header: React.FC = () => {
  const { isConnected } = useIsConnected();

  return (
    <header className="bg-default p-4 bg-gradient-to-r from-green-100 to-blue-100">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-primary font-bold text-xl">
          <Link href="/">MotionMint</Link>
        </div>
        <div className="flex items-center">
          <div className="mr-4">
            <ConnectButton accountStatus="avatar" />
          </div>
          {isConnected && (
            <div className="relative group">
              <FaBars className="text-default hover:text-primary cursor-pointer" />
              <nav className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                <ul className="p-2 space-y-2">
                  <li>
                    <Link href="/dashboard" className="block text-default hover:text-primary px-4 py-2">
                      Dashboard
                    </Link>
                  </li>
                  <li>
                    <Link href="/market" className="block text-default hover:text-primary px-4 py-2">
                      Market
                    </Link>
                  </li>
                  <li>
                    <Link href="/upload" className="block text-default hover:text-primary px-4 py-2">
                      Create
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
