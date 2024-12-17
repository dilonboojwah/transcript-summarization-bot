import React from "react";
import Button from "../components/Button";
import CopyTextIcon from "../assets/icons-secondary/copy-text.svg";

interface SummaryTextProps {
  summary: string;
}

const SummaryTextCard: React.FC<SummaryTextProps> = ({ summary }) => {
  const handleCopy = () => {
    navigator.clipboard
      .writeText(summary)
      .catch((err) => {
        console.error("Failed to copy text: ", err);
      });
  };

  const formatSummary = (text: string) => {
    const lines = text.split("\n"); // Split the string into lines
    let seenDivider = false; // Track whether the divider has been encountered
  
    return lines.map((line, index) => {
      if (line.startsWith("###")) {
        // Markdown-style headings (e.g., "### Heading")
        return (
          <h3
            key={index}
            className="text-[24px] leading-[32px] font-semibold text-gray-25 mb-4"
          >
            {line.replace(/^###\s*/, "")}
          </h3>
        );
      } else if (line.startsWith("**") && !line.includes(":")) {
        // Bold headings (e.g., "**Heading**" without inline text)
        return (
          <h2
            key={index}
            className="text-[18px] leading-[32px] font-semibold text-gray-25 mb-2"
          >
            {line.replace(/\*\*/g, "")}
          </h2>
        );
      } else if (line.startsWith("- ")) {
        // List items (e.g., "- Bullet point")
        return (
          <li
            key={index}
            className="list-outside list-disc pl-2 text-[18px] leading-[28px] font-light text-gray-25 mb-1"
            style={{ 
              listStylePosition: "outside",
              marginLeft: "-4px" 
            }}
          >
            {line
              .replace("- ", "")
              .split(/(\*\*.*?\*\*)/) // Split by inline bold markers
              .map((part, i) =>
                part.startsWith("**") && part.endsWith("**") ? (
                  <span key={i} className="font-semibold text-gray-25">
                    {part.replace(/\*\*/g, "")}
                  </span>
                ) : (
                  part
                )
              )}
          </li>
        );
      } else if (line.trim() === "---") {
        // Section divider
        seenDivider = true; // Toggle the flag when encountering the divider
        return <hr key={index} className="my-4 border-gray-600" />;
      } else if (line.trim() === "") {
        // Empty lines for spacing
        return <div key={index} className="mb-5" />;
      } else {
        // Normal paragraphs with inline bolding
        return (
          <p
            key={index}
            className={`text-[16px] leading-[25px] font-light text-gray-25 ${
              seenDivider ? "pl-7" : "" // Apply pl-8 only after the divider
            }`}
          >
            {line.split(/(\*\*.*?\*\*)/).map((part, i) =>
              part.startsWith("**") && part.endsWith("**") ? (
                <span key={i} className="font-semibold text-gray-25">
                  {part.replace(/\*\*/g, "")}
                </span>
              ) : (
                part
              )
            )}
          </p>
        );
      }
    });
  };
  
  
  
  

  return (
    <div className="w-[906px] bg-black bg-opacity-[36%] border border-gray-700 rounded-[12px] p-[50px] flex flex-col items-center">
      {/* Header Section */}
      <div className="flex justify-between items-center w-full max-w-[742px] mb-[32px]">
        {/* "Summary" Heading */}
        <h1 className="text-[30px] font-nasalization text-white">Summary</h1>

        {/* Copy Button */}
        <Button
          size="small"
          text="Copy"
          icon={<img src={CopyTextIcon} alt="Copy Icon" className="w-[14px]" />}
          onClick={handleCopy}
          className="w-[95px] gap-[2px]"
        />
      </div>

      {/* Summary Text */}
      <div
        className="w-full max-w-[742px] text-[18px] leading-[32px] font-light text-gray-25 overflow-hidden"
        style={{ paddingBottom: "10px" }}
      >
        {formatSummary(summary)}
      </div>
    </div>
  );
};

export default SummaryTextCard;
