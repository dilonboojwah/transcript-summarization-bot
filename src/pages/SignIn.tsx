import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../utils/supabaseClient";
import TSBLogoColored from "../assets/logos/TSB-logo-colored.svg";
import InputField from "../components/InputField";
import Button from "../components/Button";
import AuthLayout from "../layout/AuthLayout";

const SignIn: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessages, setErrorMessages] = useState<
    { field: string; message: string }[]
  >([]);
  const navigate = useNavigate();

  const handleLogIn = async () => {
    setErrorMessages([]);
  
    const errors: { field: string; message: string }[] = [];
    if (!username) errors.push({ field: "username", message: "Username is required" });
    if (!password) errors.push({ field: "password", message: "Password is required" });
  
    if (errors.length > 0) {
      setErrorMessages(errors);
      return;
    }
  
    try {
      // Fetch user data
      const { data: userMetadata, error: userError } = await supabase
        .from("users")
        .select("user_id, dummy_email, username")
        .eq("username", username)
        .single();
  
      if (userError || !userMetadata) {
        setErrorMessages([{ field: "username", message: "Invalid username/password combination" }]);
        return;
      }
  
      const { dummy_email } = userMetadata;
  
      // Authenticate user
      const { error: authError } = await supabase.auth.signInWithPassword({
        email: dummy_email,
        password,
      });
  
      if (authError) {
        setErrorMessages([{ field: "username", message: "Invalid username/password combination" }]);
        return;
      }
  
      // Redirect to dashboard with username
      navigate("/summarize", { state: { username } });
    } catch (error) {
      setErrorMessages([{ field: "", message: "An unexpected error occurred. Please try again." }]);
    }
  };
  

  const handleSignUp = () => {
    navigate("/signup");
  };

  return (
    <AuthLayout heading="TSB">
      <div className="mx-auto text-center">
        <img
          src={TSBLogoColored}
          alt="TSB Logo"
          className="mx-auto w-20 h-20 mb-6"
        />
        <h1 className="text-3xl font-nasalization mb-8">Sign in</h1>
        <div className="my-6">
          <InputField
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            error={!!errorMessages.find((err) => err.field === "username")}
            errorMessage={
              errorMessages.find((err) => err.field === "username")?.message || ""
            }
          />
        </div>
        <div className="my-6">
          <InputField
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            error={!!errorMessages.find((err) => err.field === "password")}
            errorMessage={
              errorMessages.find((err) => err.field === "password")?.message || ""
            }
          />
        </div>
        <div className="mt-6">
          <Button
            size="large"
            text="Log In"
            onClick={handleLogIn}
            className="w-[408px] h-[60px] text-[17px]"
          />
        </div>
        <div className="mt-4 flex justify-center items-center text-sm">
          <span className="text-gray-600">Don&apos;t have an account?</span>
          <span
            onClick={handleSignUp}
            className="ml-2 text-purple-600 font-semibold cursor-pointer"
          >
            Sign up
          </span>
        </div>
      </div>
    </AuthLayout>
  );
};

export default SignIn;
