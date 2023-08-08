// components/Header.tsx

import React from "react";

interface HeaderProps {
  isConnected: boolean;
  userAddress?: string;
  isCreator?: boolean;
}

const Header: React.FC<HeaderProps> = ({ isConnected, userAddress, isCreator }) => {
  return (
    <header className="bg-default shadow-sm p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-primary font-bold text-xl">MotionMint</div>

        {/* Middle Navigation Links based on User's Role */}
        <nav>
          {isConnected && (
            <ul className="flex space-x-4">
              <li>
                <a href="/dashboard" className="text-default hover:text-primary">
                  Dashboard
                </a>
              </li>
              {isCreator && (
                <>
                  <li>
                    <a href="/mymotiondata" className="text-default hover:text-primary">
                      My Motion Data
                    </a>
                  </li>
                  <li>
                    <a href="/earnings" className="text-default hover:text-primary">
                      Earnings
                    </a>
                  </li>
                </>
              )}
            </ul>
          )}
        </nav>

        {/* Right Section (Ethereum Address or Connect Wallet button) */}
        <div className="flex items-center">
          {isConnected ? (
            <span className="text-accent mr-4">{userAddress}</span>
          ) : (
            <button className="bg-primary text-default rounded-md p-2">Connect Wallet</button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
