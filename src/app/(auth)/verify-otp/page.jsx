import VerifyOTP from "@/components/dashboard/VerifyOTP";
import { Suspense } from "react";

export default function VerifyCodePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyOTP />
    </Suspense>
  );
}
