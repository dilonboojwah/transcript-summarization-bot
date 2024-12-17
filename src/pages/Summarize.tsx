import React, { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import DashboardLayout from "../layout/DashboardLayout";
import UploadFile from "../components/UploadFile";
import UploadingFile from "../components/UploadingFile";
import FileUploaded from "../components/FileUploaded";
import TSBLogoWhite from "../assets/logos/TSB-logo-and-words-white.svg";
import OpenAILogoSmall from "../assets/logos/OpenAI-logo-small.svg";
import { fetchUserProfile } from "../utils/api"; // Ensure this fetches user profile
import supabase from "../utils/supabaseClient";

const Summarize: React.FC = () => {
  const [currentState, setCurrentState] = useState<
    "upload" | "uploading" | "uploaded"
  >("upload");

  const queryClient = useQueryClient(); // React Query client for cache management

  // Use React Query to fetch user profile
  const { data: userProfile, isLoading } = useQuery({
    queryKey: ["userProfile"], // Unique query key
    queryFn: fetchUserProfile, // Function to fetch user profile
    staleTime: 300000, // Cache data for 5 minutes
    retry: 3, // Retry failed queries
  });

  const username = userProfile?.username || "";

  // Handle file upload
  const handleFileUpload = async (file: File) => {
    if (!file || !["application/pdf", "text/plain"].includes(file.type)) {
      alert("Only PDF or TXT files are supported.");
      return;
    }

    setCurrentState("uploading");

    try {
      const appendedFileName = `${file.name}_${Date.now()}`;
      const filePath = `files/${appendedFileName}`;

      // Upload file to Supabase storage
      const { error: storageError } = await supabase.storage
        .from("uploads")
        .upload(filePath, file);

      if (storageError) {
        console.error("Storage error:", storageError);
        throw new Error(`Error uploading file: ${storageError.message}`);
      }

      console.log("File successfully uploaded to storage.");

      // Send file to FastAPI for parsing and summarization
      const formData = new FormData();
      formData.append("file", file);

      const response = await fetch(`${process.env.TSB_BACKEND_URL}/upload`, // Replace with "http://127.0.0.1:8000/upload" if I want to test locally
      { 
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        const errorDetails = await response.text();
        console.error("Error response from FastAPI:", errorDetails);
        throw new Error("Error parsing file via FastAPI.");
      }

      const { text, word_count, summary } = await response.json();

      // Save metadata and parsed data in Supabase summaries table
      const { error: insertError } = await supabase.from("summaries").insert([
        {
          summary_id: crypto.randomUUID(),
          user_id: userProfile?.userId, // Use userId from cached userProfile
          filename_appended: appendedFileName,
          uploaded_at: new Date().toISOString(),
          original_text: text, // Parsed text from FastAPI
          summary: summary, // Summary from FastAPI
          word_count: word_count, // Word count from FastAPI
        },
      ]);

      if (insertError) {
        console.error("Insert error:", insertError);
        throw new Error(`Error inserting file metadata: ${insertError.message}`);
      }

      console.log("File metadata and parsed text successfully stored in summaries table.");

      // Invalidate the library query to fetch the updated summaries
      queryClient.invalidateQueries({ queryKey: ["userProfileAndSummaries"] });

      setCurrentState("uploaded");
    } catch (error) {
      console.error("Error during file upload:", error);
      alert("An error occurred during file upload. Please try again.");
      setCurrentState("upload");
    }
  };

  // Handle loading state
  if (isLoading) {
    return (
      <DashboardLayout
      username={username}
      onLogout={async () => {
        console.log("User logged out");
        }}
      >
        <div className="flex justify-center items-center h-screen">
          <p></p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout
      username={username}
      onLogout={async () => {
        await supabase.auth.signOut();
        console.log("User logged out");
      }}
    >
      <div className="flex flex-col items-center mt-[120px]">
        <img src={TSBLogoWhite} alt="TSB Logo" className="mb-2" />
        <div className="flex items-center text-center">
          <p className="text-[20px] leading-[30px] font-regular text-gray-25">
            A transcript summarization bot powered by
          </p>
          <img src={OpenAILogoSmall} alt="OpenAI Logo" className="ml-[5px]" />
        </div>
      </div>

      <div className="mt-[40px] flex justify-center">
        {currentState === "upload" && (
          <UploadFile onUpload={(file: File) => handleFileUpload(file)} />
        )}
        {currentState === "uploading" && <UploadingFile />}
        {currentState === "uploaded" && <FileUploaded />}
      </div>
    </DashboardLayout>
  );
};

export default Summarize;
