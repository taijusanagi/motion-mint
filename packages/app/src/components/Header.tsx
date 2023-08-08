import React from "react";
import { FaBars } from "react-icons/fa";

interface HeaderProps {
  isConnected: boolean;
  userAddress?: string;
  isCreator?: boolean;
}

const Header: React.FC<HeaderProps> = ({ isConnected, userAddress, isCreator }) => {
  return (
    <header className="bg-default shadow-sm p-4">
      <div className="container mx-auto flex justify-between items-center">
        <div className="text-primary font-bold text-xl">MotionMint</div>
        <div className="flex items-center">
          {isConnected ? (
            <span className="text-accent mr-4">{userAddress}</span>
          ) : (
            <button className="bg-primary text-default rounded-md p-2 mr-4">Connect Wallet</button>
          )}
          <div className="relative group">
            <FaBars className="text-default hover:text-primary cursor-pointer" />
            <nav className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-200">
              {isConnected && (
                <ul className="p-2 space-y-2">
                  <li>
                    <a href="/dashboard" className="block text-default hover:text-primary px-4 py-2">
                      Dashboard
                    </a>
                  </li>
                  {isCreator && (
                    <>
                      <li>
                        <a href="/mymotiondata" className="block text-default hover:text-primary px-4 py-2">
                          My Motion Data
                        </a>
                      </li>
                      <li>
                        <a href="/earnings" className="block text-default hover:text-primary px-4 py-2">
                          Earnings
                        </a>
                      </li>
                    </>
                  )}
                </ul>
              )}
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
