import React from "react";
import { FaBars } from "react-icons/fa";
import Button from "./Button";
import Link from "next/link";

interface HeaderProps {
  isConnected: boolean;
  userAddress?: string;
}

const Header: React.FC<HeaderProps> = ({ isConnected, userAddress }) => {
  return (
    <header className="bg-default p-4 bg-gradient-to-r from-green-100 to-blue-100">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-primary font-bold text-xl">
          <Link href="/">MotionMint</Link>
        </div>
        <div className="flex items-center">
          {isConnected ? (
            <span className="text-accent text-sm mr-4">{userAddress}</span>
          ) : (
            <Button label="Connect Wallet" />
          )}
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
