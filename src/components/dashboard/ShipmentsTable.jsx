import { CheckMarkSvg, ThreeDotSvg } from "../svg/Svg";

const ShipmentsTable = () => {
  return (
    <div className="bg-[#FEFEFE] rounded-2xl p-6">
      <div className="flex items-center justify-between mb-6">
        <h6 className="text-2xl text-[#111827] font-medium">Shipments</h6>
        <button className="flex items-center justify-center px-6 py-2.5 gap-2.5 rounded-lg border border-blue-500 bg-[#ECF4F9] text-blue-500 font-medium">
          Create New +
        </button>
      </div>
      <div className="overflow-x-auto">
        <table className="min-w-[1352px] w-full">
          <thead>
            <tr className="text-left">
              <th className="text-xl font-medium text-black-500 border-b pb-6 border-[#C0C0C0]">
                AWB Number
              </th>
              <th className="text-xl font-medium text-black-500 border-b pb-6 border-[#C0C0C0]">
                Status
              </th>
              <th className="text-xl font-medium text-black-500 border-b pb-6 border-[#C0C0C0]">
                Route
              </th>
              <th className="text-xl font-medium text-black-500 border-b pb-6 border-[#C0C0C0]">
                Parties
              </th>
              <th className="text-xl font-medium text-black-500 border-b pb-6 border-[#C0C0C0]">
                Documents
              </th>
              <th className="text-xl font-medium text-black-500 border-b pb-6 border-[#C0C0C0] text-center">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {Array(6)
              .fill(null)
              .map((_, idx) => (
                <tr key={idx}>
                  <td className="py-3.5 text-blue-500 font-medium">
                    AWB-123-12345678
                  </td>
                  <td className="py-3.5">
                    <span className="p-2.5 rounded-full bg-[#FFF9E6] text-[#FFC107]">
                      Ready for Pickup
                    </span>
                  </td>
                  <td className="py-3.5 text-black-500">Miami → Managua</td>
                  <td className="py-3.5">
                    <p className="text-black-300">Agent: John Smith</p>
                    <p className="text-black-300">Broker: Sarah Johnson</p>
                  </td>
                  <td className="py-3.5">
                    <div className="flex items-center gap-1 text-[#28A745]">
                      <CheckMarkSvg className="size-4" /> Complete
                    </div>
                  </td>
                  <td className="py-3.5">
                    <div className="flex items-center justify-center">
                      <ThreeDotSvg />
                    </div>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ShipmentsTable;
