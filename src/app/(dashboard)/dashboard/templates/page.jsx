"use client";

import { DeleteTemplate, GetALLTemplates } from "@/hooks/api/dashboardApi";
import TemplateImage from "../../../../../public/template.png";
import Image from "next/image";
import Link from "next/link";

const Page = () => {
  const { data, isLoading } = GetALLTemplates();

  const { mutate, isPending } = DeleteTemplate();

  const handleDelete = (id) => {
    mutate({ endpoint: `/api/templates/${id}` });
  };

  return (
    <div>
      <h3 className="text-[#333] text-[36px] font-medium">All Templates</h3>
      <div className="grid grid-cols-2 xs:flex flex-wrap gap-2 md:gap-6 mt-6 items-center">
        {isLoading ? (
          Array(4)
            .fill(null)
            .map((_, index) => (
              <div
                key={index}
                className="flex w-[170px] flex-col items-center gap-[12px] animate-pulse"
              >
                <div className="h-[218px] self-stretch rounded-[16px] bg-gray-200"></div>
                <div className="h-4 w-3/4 bg-gray-200 rounded"></div>
              </div>
            ))
        ) : data?.data?.length > 0 ? (
          data?.data?.map((item, index) => (
            <Link
              key={item?.id}
              href={`../dashboard/air-waybill?id=${item?.id}`}
            >
              <div className="flex xs: w-[170px] flex-col items-center gap-[12px]">
                <figure className="h-[218px] self-stretch rounded-[16px] overflow-hidden">
                  <Image
                    src={TemplateImage}
                    width={200}
                    height={200}
                    alt=""
                    className="size-full object-cover"
                  />
                </figure>
                <h5 className="text-[#3D8FBE] text-center text-[16px] font-medium not-italic leading-[24px]">
                  {/* AWB-{item?.serial_id} */}
                  {item?.template_name}
                </h5>
              </div>
            </Link>
          ))
        ) : (
          <p className="pt-5">No template found</p>
        )}
      </div>
    </div>
  );
};

export default Page;
