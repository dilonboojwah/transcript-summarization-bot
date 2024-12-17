import React from "react";
import Button from "../components/Button";
import ChevronDownIcon from "../assets/icons-secondary/chevron-down.svg";
import PurpleArrowLeftIcon from "../assets/icons-primary/purple-arrow-left.svg";
import PurpleArrowRightIcon from "../assets/icons-primary/purple-arrow-right.svg";

const LibraryItemScroller: React.FC = () => {
  const handleLeftArrowClick = () => {
    console.log("Left arrow clicked");
  };

  const handleRightArrowClick = () => {
    console.log("Right arrow clicked");
  };

  return (
    <div
      className="w-[924px] h-[96px] bg-purple-950 rounded-t-[36px] flex items-center justify-between"
    >
      {/* Show Items Button */}
      <div className="ml-[52px] flex items-center">
        <Button
          size="medium"
          text="Show 25 items"
          iconPosition="right"
          icon={
            <img
              src={ChevronDownIcon}
              alt="Chevron Down"
            />
          }
          onClick={() => console.log("Show items clicked")}
          className="font-medium text-[11.9px] leading-[20px] pl-[18px]"
        />
      </div>

      {/* Pagination Controls */}
      <div
        className="flex items-center justify-between w-[320px] h-[36px] mr-[52px]" // Adjusted width from 343px to 300px
      >
        {/* Left Arrow */}
        <img
          src={PurpleArrowLeftIcon}
          alt="Previous Page"
          onClick={handleLeftArrowClick}
          className="cursor-pointer mr-[8px]" // Added margin-right to move it closer to the text
        />

        {/* Page Info */}
        <p className="text-[14px] leading-[20px] font-medium text-purple-25 mx-2"> 
          Page 1 of 1
        </p>

        {/* Right Arrow */}
        <img
          src={PurpleArrowRightIcon}
          alt="Next Page"
          onClick={handleRightArrowClick}
          className="cursor-pointer ml-[8px]" // Added margin-left to keep spacing consistent
        />
      </div>
    </div>
  );
};

export default LibraryItemScroller;
