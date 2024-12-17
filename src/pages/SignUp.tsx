import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import supabase from "../utils/supabaseClient";
import TSBLogoColored from "../assets/logos/TSB-logo-colored.svg";
import InputField from "../components/InputField";
import Button from "../components/Button";
import AuthLayout from "../layout/AuthLayout";

const SignUp: React.FC = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessages, setErrorMessages] = useState<
    { field: string; message: string }[]
  >([]);
  const navigate = useNavigate();

  const handleSignUp = async () => {
    // Clear previous errors
    setErrorMessages([]);

    const errors: { field: string; message: string }[] = [];
    if (!name) errors.push({ field: "name", message: "Name is required" });
    if (!username) errors.push({ field: "username", message: "Username is required" });
    if (!password) errors.push({ field: "password", message: "Password is required" });

    if (errors.length > 0) {
      setErrorMessages(errors);
      return;
    }

    const dummyEmail = `${username}@boojwah.com`;

    try {
      // Sign up the user in auth.users
      const { data: signUpData, error: signUpError } = await supabase.auth.signUp({
        email: dummyEmail,
        password: password,
        options: {
          data: { name, username },
        },
      });

      // Handle Supabase signup error (e.g., duplicate email)
      if (signUpError) {
        if (signUpError.status === 422) {
          setErrorMessages([{ field: "username", message: "Username already taken" }]);
          return;
        }

        setErrorMessages([{ field: "password", message: signUpError.message }]);
        throw signUpError;
      }

      // Sync data to public.users table
      const { error: syncError } = await supabase.from("users").insert([
        {
          user_id: signUpData.user?.id,
          name,
          username,
          dummy_email: dummyEmail,
          created_at: new Date().toISOString(),
        },
      ]);
      
      // Handle Supabase signup error (e.g., duplicate user_id)
      if (syncError) {
        if (syncError.code === "23505") {
          setErrorMessages([{ field: "username", message: "Username already taken" }]);
          return;
        }
        throw syncError;
      }

      // Fetch session
      const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
      if (sessionError || !sessionData.session) {
        throw new Error("Session creation failed. Please try again.");
      }

      // Redirect to dashboard with username
      navigate("/summarize", { state: { username } });
    } catch (err) {
      setErrorMessages([{ field: "", message: "An unexpected error occurred. Please try again." }]);
    }
  };

  const handleLogIn = () => {
    navigate("/signin");
  };

  return (
    <AuthLayout heading="TSB">
      <div className="mx-auto text-center">
        <img
          src={TSBLogoColored}
          alt="TSB Logo"
          className="mx-auto w-20 h-20 mb-6"
        />
        <h1 className="text-3xl font-nasalization mb-8">Sign up</h1>
        <InputField
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          error={!!errorMessages.find((err) => err.field === "name")}
          errorMessage={errorMessages.find((err) => err.field === "name")?.message || ""}
        />
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
        <div className="mt-6">
          <Button
            size="large"
            text="Create Account"
            onClick={handleSignUp}
            className="w-[408px] h-[60px] text-[17px]"
          />
        </div>
        <div className="mt-4 flex justify-center items-center text-sm">
          <span className="text-gray-600">Already have an account?</span>
          <span
            onClick={handleLogIn}
            className="ml-2 text-purple-600 font-semibold cursor-pointer"
          >
            Log in
          </span>
        </div>
      </div>
    </AuthLayout>
  );
};

export default SignUp;
