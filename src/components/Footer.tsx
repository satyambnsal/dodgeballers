import { GITHUB_SATYAM_URL, TELEGRAM_SATYAM_URL } from "@/utils/constants";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import React from "react";

const Footer = () => {
  return (
    <footer className="right- fixed bottom-0 right-1 py-4 text-xs text-lime-900">
      <div className="container mx-auto flex items-center space-x-2">
        <p className="text-xs"> Feedback ? Reach out!</p>
        <a
          href={GITHUB_SATYAM_URL}
          className="mr-4 text-gray-300 transition duration-300 hover:text-gray-400"
          target="_blank"
        >
          <GitHubLogoIcon />
        </a>
        <a
          href={TELEGRAM_SATYAM_URL}
          className="text-gray-300 transition duration-300 hover:text-gray-400"
          target="_blank"
        >
          Telegram
        </a>
      </div>
    </footer>
  );
};

export default Footer;
