// components/Footer.tsx

import React from "react";

const Footer: React.FC = () => {
  return (
    <footer className="bg-default shadow-sm p-4 mt-8">
      <div className="container mx-auto flex justify-center">
        {/* Footer Links */}
        <nav>
          <ul className="flex space-x-4">
            <li>
              <a href="/about" className="text-default hover:text-primary">
                About
              </a>
            </li>
            <li>
              <a href="/terms" className="text-default hover:text-primary">
                Terms of Service
              </a>
            </li>
            {/* Add any other footer links you might want */}
          </ul>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
