import ShipmentStatus from "@/components/dashboard/ShipmentStatus";
import { Suspense } from "react";

const page = async ({ params }) => {
  const { id } = await params;

  return (
    <Suspense fallback={<div>Loading preview...</div>}>
      <ShipmentStatus id={id} />
    </Suspense>
  );
};

export default page;
