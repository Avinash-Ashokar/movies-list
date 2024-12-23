"use client";

import UpdateMovie from "@/components/update-movie";
import { useUserStateContext } from "@/context/userStateContext";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function AddMoviePage() {
  const { user } = useUserStateContext();
  const router = useRouter();

  useEffect(() => {
    if (!user) router.push("/signin");
  }, [user, router]);

  return <UpdateMovie headerTitle="Create a new movie" />;
}
