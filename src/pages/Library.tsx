import React from "react";
import { useNavigate } from "react-router-dom";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import DashboardLayout from "../layout/DashboardLayout";
import Button from "../components/Button";
import LibraryTableHeading from "../components/LibraryTableHeading";
import LibrarySummaryEntry from "../components/LibrarySummaryEntry";
import LibraryItemScroller from "../components/LibraryItemScroller";
import PlusSignIcon from "../assets/icons-secondary/plus-sign.svg";
import NoSummariesIcon from "../assets/icons-primary/no-summaries.svg";
import { prefetchUserData } from "../utils/api";
import supabase from "../utils/supabaseClient"; // Ensure supabase client is imported

interface Summary {
  summary_id: string;
  filename_appended: string;
  uploaded_at: string;
}

interface UserProfileAndSummaries {
  username: string;
  summaries: Summary[];
}

const Library: React.FC = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient(); // React Query client for cache updates

  // Use React Query to fetch user data and summaries
  const { data, isLoading } = useQuery<UserProfileAndSummaries>({
    queryKey: ["userProfileAndSummaries"], // Unique key for caching
    queryFn: prefetchUserData, // Fetch function
    staleTime: 300000, // Data remains fresh for 5 minutes
    retry: 3, // Retry failed queries up to 3 times
  });

  // Extract username and summaries from the fetched data
  const username = data?.username || "";
  const [summaries, setSummaries] = React.useState<Summary[]>(data?.summaries || []);

  // Update summaries when data changes
  React.useEffect(() => {
    if (data?.summaries) {
      setSummaries(data.summaries);
    }
  }, [data]);

  // Handle deleting a summary
  const handleDeleteSummary = async (summaryId: string) => {
    try {
      const { error } = await supabase
        .from("summaries")
        .delete()
        .eq("summary_id", summaryId);

      if (error) {
        console.error("Error deleting summary:", error.message);
        return;
      }

      // Remove the deleted summary from the local state
      setSummaries((prevSummaries) =>
        prevSummaries.filter((summary) => summary.summary_id !== summaryId)
      );

      // Optionally invalidate the query to refetch data
      queryClient.invalidateQueries({ queryKey: ["userProfileAndSummaries"] });
    } catch (err) {
      console.error("Unexpected error during delete:", err);
    }
  };

  // Handle loading state
  if (isLoading) {
    return (
      <DashboardLayout username="" onLogout={async () => console.log("User logged out")}>
        <div className="flex justify-center items-center h-screen">
          <p></p>
        </div>
      </DashboardLayout>
    );
  }

  // Function to extract the original file name by removing the timestamp
  const getOriginalFileName = (fileNameWithTimestamp: string) => {
    const parts = fileNameWithTimestamp.split("_");
    parts.pop(); // Remove the timestamp portion
    return parts.join("_");
  };

  return (
    <DashboardLayout
      username={username}
      onLogout={async () => {
        console.log("User logged out");
      }}
    >
      {/* Top Section */}
      <div className="flex justify-between items-center mt-[120px] px-[150px]">
        <div>
          <h1 className="text-[30px] leading-[38px] font-nasalization text-white">Library</h1>
          <p className="text-[16px] leading-[24px] font-regular text-gray-300">
            View all your TSB summaries.
          </p>
        </div>
        <Button
          size="large"
          text="Create Summary"
          icon={<img src={PlusSignIcon} alt="Plus Sign" />}
          onClick={() => navigate("/summarize")}
          className="w-[260px] h-[50px] text-[17px] leading-[120%] gap-[4px] font-medium"
        />
      </div>

      {/* Summaries Section */}
      {summaries.length > 0 ? (
        <div className="flex flex-col items-center w-full mt-[36px]">
          <div className="w-full max-w-[831px]">
            <LibraryTableHeading />
          </div>
          <div
            className="w-full max-w-[831px] overflow-y-scroll h-[400px] scrollbar-none"
            style={{ maxHeight: "400px", overflowY: "auto", overflowX: "hidden" }}
          >
            {summaries.map((summary) => (
              <LibrarySummaryEntry
                key={summary.summary_id}
                summaryId={summary.summary_id}
                filePath={`files/${summary.filename_appended}`}
                fileName={getOriginalFileName(summary.filename_appended)}
                dateUploaded={new Date(summary.uploaded_at).toLocaleDateString()}
                onDeleteComplete={() => handleDeleteSummary(summary.summary_id)}
              />
            ))}
          </div>
          <div className="absolute bottom-0 left-0 w-full flex justify-center">
            <LibraryItemScroller />
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center flex-grow relative top-[-30px]">
          <img
            src={NoSummariesIcon}
            alt="No Summaries Found"
            className="mb-[20px]" // Reduced space below the icon
          />
          <p className="text-[#fafafa] font-regular text-[26px] leading-[32px] font-poppins">
            No summaries found
          </p>
          <p className="text-gray-100 font-regular text-[18px] leading-[24px] font-poppins mt-[8px]">
            Start by uploading a file!
          </p>
        </div>
      )}
    </DashboardLayout>
  );
};

export default Library;
