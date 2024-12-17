import React from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../utils/supabaseClient";
import Button from "../components/Button";
import LogoutArrowIcon from "../assets/icons-secondary/logout-arrow.svg";
import AvatarIcon from "../assets/icons-primary/dummy-avatar.svg";

interface UserProfileProps {
  username: string;
  onLogout?: () => void; // Optional onLogout handler
}

const UserProfile: React.FC<UserProfileProps> = ({ username }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await supabase.auth.signOut(); // End session
      console.log("User logged out");
      navigate("/signin");
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };

  return (
    <div className="w-[305px] p-4 border-t border-gray-800 flex items-center justify-between">
      {/* Avatar and Username */}
      <div className="flex items-center">
        <img src={AvatarIcon} alt="User Avatar" className="w-12 h-12 rounded-full" />
        <div className="ml-4 overflow-hidden">
          <p
            className="text-[14px] font-semibold text-white leading-[20px] truncate overflow-hidden text-ellipsis whitespace-nowrap"
            style={{ maxWidth: "115px" }}
            title={username}
          >
            {username}
          </p>
        </div>
      </div>

      {/* Logout Button */}
      <Button
        size="small"
        text="Logout"
        icon={<img src={LogoutArrowIcon} alt="Log Out Icon" className="w-auto h-auto" />}
        onClick={handleLogout}
        className="w-[80px]"
      />
    </div>
  );
};


export default UserProfile;
