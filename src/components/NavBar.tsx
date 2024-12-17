import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import TSBLogoColored from "../assets/logos/TSB-logo-and-words-colored.svg";
import LightningIcon from "../assets/icons-secondary/lightning-summarize.svg";
import LibraryIcon from "../assets/icons-secondary/library.svg";

const NavBar: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = [
    {
      label: "Summarize",
      icon: LightningIcon,
      route: "/summarize",
    },
    {
      label: "Library",
      icon: LibraryIcon,
      route: "/library",
    },
  ];

  return (
    <div className="w-[337px] h-screen bg-gray-950 flex flex-col py-6 px-6">
      {/* TSB Logo */}
      <div className="mb-8 cursor-pointer" onClick={() => navigate("/summarize")}>
        <img
          src={TSBLogoColored}
          alt="TSB Logo"
          className="w-auto h-auto"
        />
      </div>

      {/* Navigation Items */}
      <div className="space-y-5">
        {navItems.map((item) => (
          <div
            key={item.label}
            onClick={() => navigate(item.route)}
            className={`flex items-center w-[283px] h-[62px] px-4 cursor-pointer ${
              (location.pathname === item.route || 
                (item.route === "/library" && location.pathname === "/summary-detail"))
                ? "bg-gray-800 rounded-[12px]"
                : "hover:bg-gray-800 hover:rounded-[12px]"
            }`}
          >
            <img
              src={item.icon}
              alt={`${item.label} Icon`}
              className="w-6 h-6 mr-3"
            />
            <span className="text-gray-300 text-[16px] leading-[24px] font-poppins">
              {item.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NavBar;
