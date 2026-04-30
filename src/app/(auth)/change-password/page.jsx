import ChangePasswordForm from "@/components/dashboard/ChangePasswordForm";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ChangePasswordForm />
    </Suspense>
  );
}