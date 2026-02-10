"use client";

import useAuth from "@/hooks/useAuth";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  const { token, user } = useAuth();

  useEffect(() => {
    if (!token && !user) {
      router.replace("/login");
      return;
    }
    router.replace("/dashboard");
  }, [token, user, router]);

  // Optional loading UI
  return null;
}
