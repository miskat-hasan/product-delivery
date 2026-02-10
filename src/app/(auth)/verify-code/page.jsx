import { VerifyCode } from "@/components/dashboard/VerifyCode";
import { Suspense } from "react";

export default function VerifyCodePage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <VerifyCode />
    </Suspense>
  );
}
