"use client"; // Indicates that this component is a client component in Next.js

import { useEffect, useState } from "react"; // Importing React hooks
import InputField from "@/components/input-field"; // Custom input field component
import Checkbox from "@/components/checkbox"; // Custom checkbox component
import Button from "@/components/button"; // Custom button component
import { useRouter } from "next/navigation"; // Hook for navigation
import { loginUser } from "../api/auth/login"; // Function to handle user login
import { useUserStateContext } from "@/context/userStateContext"; // Context for user state
import { notifyError, validateEmail, validatePassword } from "@/utility/helper"; // Utility functions for validation and notifications
import useKeyPress from "@/hooks/useKeyPress"; // Custom hook for detecting key presses

export default function SignInPage() {
  const { user } = useUserStateContext(); // Get user state from context
  const router = useRouter(); // Initialize router for navigation

  // Redirect to home if user is already logged in
  useEffect(() => {
    if (user) router.push("/");
  }, [user, router]);

  // State variables for email, password, remember me checkbox, and input errors
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [inputError, setInputError] = useState<{
    email: string;
    password: string;
  }>({
    email: "",
    password: "",
  });

  // Function to handle login logic
  const handleLogin = async () => {
    let isValid = true; // Flag to track form validity

    // Validate email input
    if (!email || !validateEmail(email)) {
      setInputError((prev) => ({ ...prev, email: "Invalid email address" }));
      isValid = false; // Set validity to false if email is invalid
    }

    // Validate password input
    if (!password || !validatePassword(password)) {
      setInputError((prev) => ({
        ...prev,
        password: "Password must be at least 6 characters",
      }));
      isValid = false; // Set validity to false if password is invalid
    }

    // If the form is not valid, notify the user and exit
    if (!isValid) {
      notifyError("Please fix the errors before logging in");
      return;
    }

    // Attempt to log in the user
    const response = await loginUser(email, password, rememberMe);

    // Handle login response
    if (!response.ok) {
      notifyError(response.errorMessage || "Error in Logging In");
      return; // Exit if login fails
    }

    // Redirect to home on successful login
    router.push("/");
  };

  // Use custom hook to handle Enter key press for login
  useKeyPress("Enter", () => {
    handleLogin();
  });

  // Render the sign-in form
  return (
    <div className="flex-grow flex flex-col justify-center items-center">
      <div className="flex w-full gap-y-6 flex-col items-center p-6 max-w-[500px] sm:p-0 sm:max-w-[300px]">
        <h2 className="text-heading-2 font-semibold sm:text-heading-1 font-montserrat text-textColor">
          Sign in
        </h2>
        <div className="flex min-w-full gap-y-6 flex-col">
          <InputField
            inputData={email} // Bind email state to input
            setInputData={(data: string) => setEmail(data)} // Update email state on change
            placeholderText="Email" // Placeholder for email input
            hasError={inputError["email"]} // Show error if email is invalid
          />
          <InputField
            inputData={password} // Bind password state to input
            setInputData={(data: string) => setPassword(data)} // Update password state on change
            placeholderText="Password" // Placeholder for password input
            type="password" // Set input type to password
            hasError={inputError["password"]} // Show error if password is invalid
          />
        </div>
        <Checkbox isSelected={rememberMe} setIsSelected={setRememberMe} />
        <Button type="action" label="Login" onClick={handleLogin} />
      </div>
    </div>
  );
}
