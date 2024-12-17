import React from "react";
import SolarSystemGraphic from "../assets/solar-system.svg";
import OpenAILogo from "../assets/logos/OpenAI-logo-default.svg";

interface AuthLayoutProps {
  children: React.ReactNode; // Content specific to the page (e.g., SignUp, SignIn)
  heading: string; // Heading displayed on the right section
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children, heading }) => (
  <div className="flex w-screen h-screen bg-white">
    {/* Left Section */}
    <div className="flex flex-col justify-center w-[48%] h-full bg-white p-8 relative">
      {children}
      {/* Footer */}
      <div className="absolute left-[32px] bottom-[32px] text-gray-700 text-[14px] leading-[20px] font-regular">
        &copy; TSB 2024
      </div>
    </div>

    {/* Right Section */}
    <div className="flex flex-col justify-center items-center w-[52%] h-full bg-purple-950 rounded-l-[80px]">
      <img
        src={SolarSystemGraphic}
        alt="Solar System"
        className="w-[80%] max-h-[60%] mb-2"
      />
      <h2 className="text-5xl font-nasalization text-gray-25 mb-4">{heading}</h2>
      <p className="text-[26px] leading-[38px] font-regular text-gray-25 text-center w-[423px] mb-4">
        A transcript summarization <br /> bot powered by
      </p>
      <img src={OpenAILogo} alt="OpenAI Logo" className="w-40 h-auto" />
    </div>
  </div>
);

export default AuthLayout;
