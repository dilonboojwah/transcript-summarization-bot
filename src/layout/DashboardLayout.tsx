import React from "react";
import NavBar from "../components/NavBar";
import UserProfile from "../components/UserProfile";
import BackgroundGradient from "../assets/transparent-background-gradient.svg";

interface DashboardLayoutProps {
  children: React.ReactNode; // Main content specific to the page
  username: string; // Username for the UserProfile component
  onLogout: () => void; // Logout handler
}

const DashboardLayout: React.FC<DashboardLayoutProps> = ({
  children,
  username,
  onLogout,
}) => {
  return (
    <div className="flex w-screen h-screen relative">
      {/* Left Section: NavBar and UserProfile */}
      <div className="flex flex-col w-[337px] bg-gray-950">
        <NavBar />
        <div className="mt-auto mb-[4px] flex justify-center">
          <UserProfile username={username} onLogout={onLogout} />
        </div>
      </div>

      {/* Main Section */}
      <div
        className="flex flex-col w-full bg-cover bg-center relative overflow-y-auto"
        style={{
          backgroundImage: `url(${BackgroundGradient})`,
        }}
      >
        {children}
      </div>
    </div>
  );
};

export default DashboardLayout;
