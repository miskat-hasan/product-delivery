import ShipmentStatus from "@/components/dashboard/ShipmentStatus";
import { Suspense } from "react";

const page = () => {
  return (
    <Suspense fallback={<div>Loading preview...</div>}>
      <ShipmentStatus />
    </Suspense>
  );
};

export default page;
