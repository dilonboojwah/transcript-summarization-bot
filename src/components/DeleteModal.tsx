import React from "react";
import Button from "../components/Button";
import AlertIcon from "../assets/icons-primary/alert.svg";

interface DeleteModalProps {
  onConfirm: () => void; // Function to handle delete confirmation
  onCancel: () => void; // Function to handle cancel action
}

const DeleteModal: React.FC<DeleteModalProps> = ({ onConfirm, onCancel }) => {
  return (
    <div className="w-[559px] h-[364px] bg-[#FCFCFD] rounded-[12px] flex flex-col justify-center items-center">
      {/* Alert Icon */}
      <img src={AlertIcon} alt="Alert Icon" className="mb-6" />

      {/* Title */}
      <p className="text-[24px] leading-[30px] font-semibold text-gray-900 mb-[8px] text-center">
        Delete transcript?
      </p>

      {/* Subtext */}
      <p className="text-[18px] leading-[30px] font-regular text-gray-600 text-center px-6">
        Are you sure you want to delete this transcript and generated summary?
      </p>

      {/* Buttons */}
      <div className="mt-[28px] flex space-x-4">
        {/* Yes Button */}
        <Button
          size="medium"
          text="Yes"
          onClick={onConfirm}
          className="w-[150px] bg-purple-500 text-white font-medium"
        />
        {/* Cancel Button */}
        <Button
          size="medium"
          text="Cancel"
          onClick={onCancel}
          customBg={true} // Disable default gradient
          className="w-[150px] bg-[#FCFCFD] border border-purple-500 text-[#161b26] font-light"
        />
      </div>
    </div>
  );
};

export default DeleteModal;
