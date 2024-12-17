import React from "react";

interface ButtonProps {
  size: "large" | "medium" | "small"; // Button sizes
  text: string; // Text to display
  icon?: React.ReactNode; // Optional icon (e.g., an arrow or upload icon)
  iconPosition?: "left" | "right"; // Position of the icon
  onClick?: () => void; // Click handler
  disabled?: boolean; // Disable state
  className?: string; // Custom className for additional styling
  customBg?: boolean; // Flag to disable the default background gradient
}

const Button: React.FC<ButtonProps> = ({
  size,
  text,
  icon,
  iconPosition = "left", // Default icon position is "left"
  onClick,
  disabled,
  className = "", // Default to empty string if no className provided
  customBg = false, // Use default background unless explicitly disabled
}) => {
  const baseStyles =
    "flex items-center justify-center font-poppins rounded-full text-white focus:outline-none transition ease-in-out";

  // Dynamic size styles
  const sizeStyles = {
    large: "px-4 py-3 text-[16px] font-medium",
    medium: "h-[44px] px-4 py-2 gap-[4px] text-[16px]",
    small: "w-[101px] h-[30px] px-3 py-1 text-[12px] font-semibold",
  };

  // Default background style
  const defaultBg = customBg ? "" : "bg-gradient-lighter";

  return (
    <button
      className={`${baseStyles} ${sizeStyles[size]} ${defaultBg} ${
        disabled ? "opacity-50 cursor-not-allowed" : ""
      } ${className}`} // Move className to the end
      onClick={onClick}
      disabled={disabled}
    >
      {icon && iconPosition === "left" && (
        <span className="mr-[4px]">{icon}</span> /* Adjusted margin */
      )}
      <span>{text}</span>
      {icon && iconPosition === "right" && (
        <span className="ml-[4px]">{icon}</span> /* Adjusted margin */
      )}
    </button>
  );
};

export default Button;
