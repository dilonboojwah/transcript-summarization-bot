import supabase from "../utils/supabaseClient";

// Fetch the authenticated user's profile
export const fetchUserProfile = async () => {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    throw new Error(error?.message || "User is not authenticated.");
  }

  const { data: profile, error: profileError } = await supabase
    .from("users")
    .select("username")
    .eq("user_id", user.id)
    .single();

  if (profileError) {
    throw new Error(profileError.message);
  }

  if (!profile?.username) {
    throw new Error("Username not found for the authenticated user.");
  }

  return { username: profile.username, userId: user.id };
};

// Fetch summaries for a user
export const fetchSummaries = async (userId: string) => {
  const { data, error } = await supabase
    .from("summaries")
    .select("summary_id, filename_appended, uploaded_at, word_count, summary")
    .eq("user_id", userId)
    .order("uploaded_at", { ascending: false }); // Ensure most recent appears first

  if (error) {
    throw new Error(error.message);
  }

  return data || [];
};

// Prefetch user data and summaries
export const prefetchUserData = async () => {
  try {
    const { username, userId } = await fetchUserProfile(); // Fetch user profile
    const summaries = await fetchSummaries(userId); // Fetch summaries for the user
    return { username, summaries };
  } catch (error) {
    // Type narrowing for error
    if (error instanceof Error) {
      console.error("Error prefetching user data and summaries:", error.message);
    } else {
      console.error("Unknown error occurred while prefetching data:", error);
    }
    throw error;
  }
};
