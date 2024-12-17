import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import DashboardLayout from "../layout/DashboardLayout";
import SummaryDetailStats from "../components/SummaryDetailStats";
import SummaryTextCard from "../components/SummaryTextCard";
import BackArrowIcon from "../assets/icons-secondary/back-arrow.svg";
import { prefetchUserData } from "../utils/api";

const SummaryDetail: React.FC = () => {
  const { summaryId } = useParams<{ summaryId: string }>(); // Get summaryId from URL
  const navigate = useNavigate();

  // Use React Query to fetch user data and summaries
  const { data, isLoading } = useQuery({
    queryKey: ["userProfileAndSummaries"], // Unique key for caching
    queryFn: prefetchUserData, // Fetch function
    staleTime: 300000, // Data remains fresh for 5 minutes
    retry: 3, // Retry failed queries up to 3 times
  });

  // Extract username and summaries from the fetched data
  const username = data?.username || "";
  const summaries = data?.summaries || [];

  // Find the summary with the matching summaryId
  const selectedSummary = summaries.find((summary) => summary.summary_id === summaryId);

  // Handle loading state
  if (isLoading) {
    return (
      <DashboardLayout username="Loading..." onLogout={() => console.log("User logged out")}>
        <div className="flex justify-center items-center h-screen">
          <p className="text-white">Loading...</p>
        </div>
      </DashboardLayout>
    );
  }

  // Handle case where summary is not found
  if (!selectedSummary) {
    return (
      <DashboardLayout username={username} onLogout={() => console.log("User logged out")}>
        <div className="flex justify-center items-center h-screen">
          <p className="text-white">Summary not found.</p>
        </div>
      </DashboardLayout>
    );
  }

  // Extract details of the selected summary
  const fileName = selectedSummary.filename_appended.split("_").slice(0, -1).join("_");
  const wordCount = selectedSummary.word_count || 0;
  const dateCreated = new Date(selectedSummary.uploaded_at).toLocaleDateString();
  const summary = selectedSummary.summary || "";

  return (
    <DashboardLayout username={username} onLogout={() => console.log("User logged out")}>
      <img
        src={BackArrowIcon}
        alt="Back to Library"
        className="absolute top-[110px] left-[144px] cursor-pointer"
        onClick={() => navigate("/library")}
      />
      <h1 className="text-[44px] leading-[55px] font-nasalization text-white text-center mt-[100px]">
        Summary Detail
      </h1>
      <div className="mt-[52px] flex justify-center">
        <SummaryDetailStats fileName={fileName} wordCount={wordCount} dateCreated={dateCreated} />
      </div>
      <div className="mt-[75px] flex justify-center pb-[40px]">
        <SummaryTextCard summary={summary.trim()} />
      </div>
    </DashboardLayout>
  );
};

export default SummaryDetail;
