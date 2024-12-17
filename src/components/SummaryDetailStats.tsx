import React from "react";
import FileNameIcon from "../assets/icons-primary/file-name.svg";
import WordCountIcon from "../assets/icons-primary/word-count.svg";
import DateCreatedIcon from "../assets/icons-primary/date-created.svg";

interface SummaryDetailStatsProps {
  fileName: string;
  wordCount: number;
  dateCreated: string;
}

const SummaryDetailStats: React.FC<SummaryDetailStatsProps> = ({
  fileName,
  wordCount,
  dateCreated,
}) => {
  // Reusable container component
  const StatContainer: React.FC<{
    title: string;
    value: string;
    icon: string;
  }> = ({ title, value, icon }) => (
    <div className="w-[340px] h-[92px] border border-gray-600 rounded-[12px] flex items-center justify-between px-[24px]">
      <div>
        <p className="text-[16px] leading-[22px] font-light text-gray-400">
          {title}
        </p>
        <p
          className="text-[20px] leading-[40px] font-regular text-gray-25 truncate overflow-hidden whitespace-nowrap max-w-[220px]"
          title={value} // Show full file name in a tooltip
        >
          {value}
        </p>
      </div>
      <img
        src={icon}
        alt={`${title} Icon`}
      />
    </div>
  );
  

  return (
    <div className="flex justify-between items-center space-x-[20px]">
      {/* File Name Container */}
      <StatContainer
        title="Original File Name"
        value={fileName}
        icon={FileNameIcon}
      />

      {/* Word Count Container */}
      <StatContainer
        title="File Word Count"
        value={`${wordCount} words`}
        icon={WordCountIcon}
      />

      {/* Date Created Container */}
      <StatContainer
        title="Date Created"
        value={dateCreated}
        icon={DateCreatedIcon}
      />
    </div>
  );
};

export default SummaryDetailStats;
