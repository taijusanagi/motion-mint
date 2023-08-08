import React from "react";
import { FaGithub } from "react-icons/fa";

const Footer: React.FC = () => {
  return (
    <footer className="bg-default shadow-sm p-4 mt-8">
      <div className="container mx-auto flex justify-center">
        <a
          href="https://github.com/taijusanagi/motion-mint"
          target="_blank"
          rel="noopener noreferrer"
          className="text-gray-400 hover:text-primary"
        >
          <FaGithub size={24} />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
