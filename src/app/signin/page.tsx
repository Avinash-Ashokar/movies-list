"use client";

import { useEffect, useState } from "react";
import InputField from "@/components/input-field";
import Checkbox from "@/components/checkbox";
import Button from "@/components/button";
import { useRouter } from "next/navigation";
import { loginUser } from "../api/auth/login";
import { useUserStateContext } from "@/context/userStateContext";
import { notifyError, validateEmail, validatePassword } from "@/utility/helper";
import useKeyPress from "@/hooks/useKeyPress";

export default function SignInPage() {
  const { user } = useUserStateContext();
  const router = useRouter();

  useEffect(() => {
    if (user) router.push("/");
  }, [user, router]);

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

  const handleLogin = async () => {
    let isValid = true;

    if (!email || !validateEmail(email)) {
      setInputError((prev) => ({ ...prev, email: "Invalid email address" }));
      isValid = false;
    }

    if (!password || !validatePassword(password)) {
      setInputError((prev) => ({
        ...prev,
        password: "Password must be at least 6 characters",
      }));
      isValid = false;
    }

    if (!isValid) {
      notifyError("Please fix the errors before logging in");
      return;
    }

    const response = await loginUser(email, password, rememberMe);

    if (!response.ok) {
      notifyError(response.errorMessage || "Error in Logging In");
      return;
    }

    router.push("/");
  };

  useKeyPress("Enter", () => {
    handleLogin();
  });

  return (
    <div className="flex-grow flex flex-col justify-center items-center">
      <div className="flex w-full gap-y-6 flex-col items-center p-6 max-w-[500px] sm:p-0 sm:max-w-[300px]">
        <h2 className="text-heading-2 font-semibold sm:text-heading-1 font-montserrat text-textColor">
          Sign in
        </h2>
        <div className="flex min-w-full gap-y-6 flex-col">
          <InputField
            inputData={email}
            setInputData={(data: string) => setEmail(data)}
            placeholderText="Email"
            hasError={inputError["email"]}
          />
          <InputField
            inputData={password}
            setInputData={(data: string) => setPassword(data)}
            placeholderText="Password"
            type="password"
            hasError={inputError["password"]}
          />
        </div>
        <Checkbox isSelected={rememberMe} setIsSelected={setRememberMe} />
        <Button type="action" label="Login" onClick={handleLogin} />
      </div>
    </div>
  );
}
