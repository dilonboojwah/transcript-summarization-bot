import React from "react";
import { useNavigate } from "react-router-dom"; // Import navigation hook
import Button from "../components/Button";
import SuccessIcon from "../assets/icons-primary/success.svg"; // Import the success icon

const FileUploaded: React.FC = () => {
  const navigate = useNavigate(); // Initialize navigation hook

  const handleGoToLibrary = () => {
    navigate("/library"); // Navigate to the Library page
  };

  return (
    <div className="w-[559px] h-[364px] bg-[#FCFCFD] rounded-[12px] flex flex-col justify-center items-center">
      {/* Success Icon */}
      <img src={SuccessIcon} alt="Success Icon" className="mb-6" />

      {/* Success Message */}
      <p className="text-[24px] leading-[30px] font-semibold text-gray-900 mb-[4px] text-center">
        File uploaded successfully!
      </p>

      {/* Subtext */}
      <p className="text-[18px] leading-[30px] font-regular text-gray-600 text-center">
        Go to the Library to view your summary.
      </p>

      {/* Button */}
      <div className="mt-[28px]">
        <Button size="medium" text="Go to Library" onClick={handleGoToLibrary} className="font-medium"/>
      </div>
    </div>
  );
};

export default FileUploaded;
