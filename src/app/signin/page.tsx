"use client";

import { useEffect, useState } from "react";

import InputField from "@/components/input-field";
import Checkbox from "@/components/checkbox";
import Button from "@/components/button";
import { useRouter } from "next/navigation";
import { loginUser } from "../api/auth/login";
import { useUserStateContext } from "@/context/userStateContext";

export default function SignInPage() {
  const { user } = useUserStateContext();
  const router = useRouter();

  useEffect(() => {
    if (user) router.push("/");
  }, [user, router]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [rememberMe, setRememberMe] = useState(false);

  const handleLogin = async () => {
    await loginUser(email, password, rememberMe);
    router.push("/");
  };

  return (
    <div className="flex-grow flex flex-col justify-center items-center">
      <div className="flex w-full gap-y-6 flex-col items-center p-6">
        <h1 className="font-montserrat text-[48px] mb-4 font-semibold leading-[80px] text-center sm:text-[64px]">
          Sign in
        </h1>
        <div className="flex min-w-full gap-y-6 flex-col">
          <InputField
            inputData={email}
            setInputData={(data: string) => setEmail(data)}
            placeholderText="Email"
          />
          <InputField
            inputData={password}
            setInputData={(data: string) => setPassword(data)}
            placeholderText="Password"
          />
        </div>
        <Checkbox isSelected={rememberMe} setIsSelected={setRememberMe} />
        <Button type="action" label="Login" onClick={handleLogin} />
      </div>
    </div>
  );
}
