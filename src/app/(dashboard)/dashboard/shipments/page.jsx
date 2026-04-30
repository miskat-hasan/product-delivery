import ShipmentsTable from "@/components/dashboard/ShipmentsTable";

const page = () => {
  return (
    // <div className="overflow-hidden">
    //   <div className="flex items-center justify-between mb-6">
    //     <h6 className="text-2xl md:text-4xl text-[#111827] font-medium">
    //       Shipments
    //     </h6>
    //     <button className="py-4 px-8 text-white rounded-2xl bg-blue-500 text-lg font-medium cursor-pointer hover:bg-blue-500/85">
    //       Create New
    //     </button>
    //   </div>

    //   <div className="bg-white-50 w-[700px] xl:w-[890px] 2xl:w-full overflow-x-auto rounded-2xl p-6">
    //    <table className="w-full">
    //         <thead>
    //           <tr className="text-left">
    //             <th className="text-nowrap px-3 text-xl font-medium text-black-500 border-b pb-6 border-[#C0C0C0]">
    //               AWB Number
    //             </th>
    //             <th className="text-nowrap px-3 text-xl font-medium text-black-500 border-b pb-6 border-[#C0C0C0]">
    //               Status
    //             </th>
    //             <th className="text-nowrap px-3 text-xl font-medium text-black-500 border-b pb-6 border-[#C0C0C0]">
    //               Route
    //             </th>
    //             <th className="text-nowrap px-3 text-xl font-medium text-black-500 border-b pb-6 border-[#C0C0C0]">
    //               Parties
    //             </th>
    //             <th className="text-nowrap px-3 text-xl font-medium text-black-500 border-b pb-6 border-[#C0C0C0]">
    //               Documents
    //             </th>
    //             <th className="text-nowrap px-3 text-xl font-medium text-black-500 border-b pb-6 border-[#C0C0C0] text-center">
    //               Actions
    //             </th>
    //           </tr>
    //         </thead>
    //         <tbody>
    //           {Array(6)
    //             .fill(null)
    //             .map((_, idx) => (
    //               <tr key={idx}>
    //                 <td className="text-nowrap px-3 py-3.5 text-blue-500 font-medium">
    //                   AWB-123-12345678
    //                 </td>
    //                 <td className="text-nowrap px-3 py-3.5">
    //                   <span className="p-2.5 rounded-full bg-[#FFF9E6] text-[#FFC107]">
    //                     Ready for Pickup
    //                   </span>
    //                 </td>
    //                 <td className="text-nowrap px-3 py-3.5 text-black-500">Miami → Managua</td>
    //                 <td className="text-nowrap px-3 py-3.5">
    //                   <p className="text-black-300">Agent: John Smith</p>
    //                   <p className="text-black-300">Broker: Sarah Johnson</p>
    //                 </td>
    //                 <td className="text-nowrap px-3 py-3.5">
    //                   <div className="flex items-center gap-1 text-[#28A745]">
    //                     <CheckMarkSvg className="size-4" /> Complete
    //                   </div>
    //                 </td>
    //                 <td className="text-nowrap px-3 py-3.5">
    //                   <div className="flex items-center justify-center">
    //                     <button className="cursor-pointer">
    //                       <ThreeDotSvg />
    //                     </button>
    //                   </div>
    //                 </td>
    //               </tr>
    //             ))}
    //         </tbody>
    //       </table>
    //   </div>
    // </div>
    <div>
      <ShipmentsTable />
    </div>
  );
};

export default page;
