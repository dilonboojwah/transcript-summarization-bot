import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../utils/supabaseClient";
import DownloadIcon from "../assets/icons-secondary/download.svg";
import TrashIcon from "../assets/icons-secondary/trash.svg";
import ViewSummaryArrowIcon from "../assets/icons-secondary/view-summary-arrow.svg";
import DeleteModal from "../components/DeleteModal";

interface LibrarySummaryEntryProps {
  summaryId: string; // ID of the summary in the database
  filePath: string; // Path of the file in the Supabase bucket
  fileName: string; // Original file name
  dateUploaded: string; // Upload date
  onDeleteComplete: () => void; // Callback to update the UI after deletion
}

const LibrarySummaryEntry: React.FC<LibrarySummaryEntryProps> = ({
  summaryId,
  filePath,
  fileName,
  dateUploaded,
  onDeleteComplete,
}) => {
  const navigate = useNavigate();
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDownload = async () => {
    try {
      const { data, error } = await supabase.storage
        .from("uploads")
        .download(filePath);

      if (error) {
        console.error("Error downloading file:", error.message);
        alert("Failed to download the file.");
        return;
      }

      // Create a URL for the downloaded file and trigger a download
      const url = window.URL.createObjectURL(data);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", fileName); // Set the file name
      document.body.appendChild(link);
      link.click();
      link.remove();
    } catch (error) {
      console.error("Unexpected error during download:", error);
    }
  };

  const handleDelete = async () => {
    try {
      // Delete file from Supabase storage
      const { error: storageError } = await supabase.storage
        .from("uploads")
        .remove([filePath]);

      if (storageError) {
        console.error("Error deleting file from storage:", storageError.message);
        alert("Failed to delete the file from storage.");
        return;
      }

      // Delete record from Supabase database
      const { error: dbError } = await supabase
        .from("summaries")
        .delete()
        .eq("summary_id", summaryId);

      if (dbError) {
        console.error("Error deleting summary from database:", dbError.message);
        alert("Failed to delete the summary.");
        return;
      }

      // Call callback to update the parent UI
      onDeleteComplete();
    } catch (error) {
      console.error("Unexpected error during deletion:", error);
      alert("An unexpected error occurred while deleting the summary.");
    }
  };

  return (
    <>
      <div className="flex items-center w-[831px] h-[62px] border-t border-gray-600">
        {/* Original File Name Column */}
        <div
          className="flex items-center"
          style={{ width: "420px", paddingLeft: "32px", position: "relative" }}
        >
          <p
            className="text-[14px] font-regular text-gray-25 leading-[20px] truncate overflow-hidden text-ellipsis whitespace-nowrap"
            style={{ maxWidth: "220px" }}
            title={fileName} // Tooltip for full file name
          >
            {fileName}
          </p>
          <div
            className="flex items-center space-x-[12px]"
            style={{
              position: "absolute",
              right: "62px", // Fixed spacing for the icons
            }}
          >
            <img
              src={DownloadIcon}
              alt="Download"
              className="cursor-pointer"
              onClick={handleDownload}
            />
            <img
              src={TrashIcon}
              alt="Trash"
              className="cursor-pointer"
              onClick={() => setShowDeleteModal(true)}
            />
          </div>
        </div>

        {/* Date Uploaded Column */}
        <div
          className="flex items-center justify-center text-[14px] font-regular text-gray-25 leading-[20px]"
          style={{ width: "218px" }}
        >
          {dateUploaded}
        </div>

        {/* View Summary Column */}
        <div
          className="flex items-center justify-center"
          style={{ width: "193px" }}
        >
          <img
            src={ViewSummaryArrowIcon}
            alt="View Summary"
            className="cursor-pointer"
            onClick={() => navigate(`/summary-detail/${summaryId}`)}
          />
        </div>
      </div>

      {/* Delete Modal */}
      {showDeleteModal && (
        <>
          {/* Background overlay */}
          <div className="fixed inset-0 bg-black bg-opacity-50 z-40"></div>

          {/* Modal */}
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <DeleteModal
              onConfirm={() => {
                handleDelete();
                setShowDeleteModal(false);
              }}
              onCancel={() => setShowDeleteModal(false)}
            />
          </div>
        </>
      )}
    </>
  );
};

export default LibrarySummaryEntry;
