import { Suspense } from "react";
import React from "react";
import AirWaybillPreview from "@/components/dashboard/AirWaybillPreview";

export default function PrintPreviewPage() {
  return (
    <Suspense fallback={<div>Loading preview...</div>}>
      <AirWaybillPreview />
    </Suspense>
  );
}

