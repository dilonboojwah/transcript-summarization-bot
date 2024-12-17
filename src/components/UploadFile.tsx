import React, { useRef } from "react";
import Button from "../components/Button";
import UploadCloudIcon from "../assets/icons-primary/upload-cloud.svg";
import UploadArrowIcon from "../assets/icons-secondary/upload-arrow.svg";

interface UploadFileProps {
  onUpload: (file: File) => void; // Accept a file for upload
}

const UploadFile: React.FC<UploadFileProps> = ({ onUpload }) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null); // Ref to access the file input

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Trigger file input click
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onUpload(file); // Trigger onUpload with the selected file
    }
  };

  return (
    <div className="w-[559px] h-[364px] bg-[#FCFCFD] rounded-[12px] flex flex-col justify-center items-center">
      {/* Upload Icon */}
      <img
        src={UploadCloudIcon}
        alt="Upload Cloud Icon"
        className="mb-[12px]"
      />

      {/* Upload Text */}
      <p className="text-[20px] leading-[30px] font-regular text-gray-900 mb-[4px]">
        Upload transcript
      </p>

      {/* Supported Formats */}
      <p className="text-[14px] leading-[20px] font-regular text-gray-600 mb-[23px]">
        .pdf and .txt supported
      </p>

      {/* Upload Button */}
      <Button
        size="medium"
        text="Upload"
        icon={
          <img
            src={UploadArrowIcon}
            alt="Upload Arrow Icon"
            className="w-[18px] h-[18px]"
          />
        }
        className="w-[193px] font-medium"
        onClick={handleButtonClick} // Trigger the file input click
      />

      {/* Hidden File Input */}
      <input
        ref={fileInputRef} // Attach the ref to the input
        id="file-upload"
        type="file"
        accept=".pdf,.txt"
        className="hidden"
        onChange={handleFileChange} // Handle file selection
      />
    </div>
  );
};

export default UploadFile;
