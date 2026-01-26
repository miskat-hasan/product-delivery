"use client";

import useAuth from "@/hooks/useAuth";
import { redirect } from "next/navigation";

export default function Home() {
  const { token, user } = useAuth();
  if (token && user) {
    redirect("/admin/class_and_students/upcoming_classes");
  } else {
    redirect("/login");
  }
}
