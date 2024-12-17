import React from "react";

const LibraryTableHeading: React.FC = () => {
  return (
    <div className="flex items-center w-full h-[62px]">
      {/* Original File Name Column */}
      <div
        className="flex items-center justify-center text-[14px] font-light text-gray-300"
        style={{ width: "420px" }}
      >
        Original File Name
      </div>

      {/* Date Uploaded Column */}
      <div
        className="flex items-center justify-center text-[14px] font-light text-gray-300"
        style={{ width: "218px" }}
      >
        Date Uploaded
      </div>

      {/* View Summary Column */}
      <div
        className="flex items-center justify-center text-[14px] font-light text-gray-300"
        style={{ width: "193px" }}
      >
        View Summary
      </div>
    </div>
  );
};

export default LibraryTableHeading;
