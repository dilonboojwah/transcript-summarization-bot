import React from "react";
import LoadingIcon from "../assets/icons-primary/loading.svg";

const UploadingFile: React.FC = () => {
  return (
    <div className="w-[559px] h-[364px] bg-[#FCFCFD] rounded-[12px] flex flex-col justify-center items-center">
      {/* Loading Icon */}
      <img src={LoadingIcon} alt="Loading Icon" className="mb-6" />

      {/* Uploading Text */}
      <p className="text-[20px] leading-[30px] font-semibold text-gray-900 mb-2"> 
        Uploading
      </p>

      {/* Status Message */}
      <p className="text-[18px] leading-[30px] font-regular text-gray-600">
        Please wait... this may take 5-10 seconds
      </p>
    </div>
  );
};

export default UploadingFile;
