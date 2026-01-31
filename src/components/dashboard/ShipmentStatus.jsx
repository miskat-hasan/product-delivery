import { DownloadSvg, LocationSvg, PlaneSvg } from "../svg/Svg";

const ShipmentStatus = () => {
  const currentStep = 3;
  const steps = [
    "Created",
    "Accepted",
    "In Customs",
    "Out For Delivery",
    "Delivered",
  ];
  return (
    <div className="py-[84px] px-[60px]">
      <div className="flex justify-between items-end">
        <div className="space-y-2">
          <div className="flex items-center gap-4">
            <h4 className="text-[30px] font-medium text-black-500">
              AWB-2024-1234
            </h4>
            <div className="rounded-full px-2.5 py-1 bg-[#6F42C11A] text-[#6F42C1] h-fit">
              With Custom
            </div>
          </div>
          <p className="text-black-300">Created on October 20, 2024</p>
        </div>
        <button className="flex items-center justify-center px-6 py-2.5 h-fit gap-2.5 rounded-lg border border-blue-500 bg-[#ECF4F9] text-blue-500 font-medium max-w-[533px] w-full">
          <DownloadSvg />
          Download Documents
        </button>
      </div>
      {/* Progress Bar */}
      <div className="relative my-[50px]">
        <div className="w-full h-[65px] bg-[#ECF4F9] rounded-full overflow-hidden">
          <div
            className="h-full bg-[#00A63E] rounded-full"
            style={{ width: `${(currentStep / steps.length) * 100}%` }}
          />
        </div>
        <div className="absolute inset-0 flex">
          {steps.map((step, index) => {
            const isActive = index < currentStep;

            return (
              <div
                key={step}
                className="flex-1 flex items-center justify-center"
              >
                <span
                  className={`
                      text-xl z-10
                      ${isActive ? "text-white" : "text-[#333333]"}
                    `}
                >
                  {step}
                </span>
              </div>
            );
          })}
        </div>
      </div>

      {/* grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-6 flex flex-col gap-6 rounded-3xl border border-black-100">
          <div className="flex items-center gap-2">
            <LocationSvg />
            <h5 className="text-2xl font-medium text-[#0A0A0A]">
              Route Information
            </h5>
          </div>
          <div>
            <div className="text-[#6A7282] flex items-center justify-between">
              <p>Origin</p>
              <p>Destination</p>
            </div>
            <div className="text-[#6A7282] flex items-center justify-between">
              <p className="text-[#101828] font-medium">Miami</p>
              <div className="flex items-center gap-2 w-full max-w-[356px]">
                <div className="flex-1 h-[1px] bg-black-300"/>
                <PlaneSvg />
                <div className="flex-1 h-[1px] bg-black-300"/>
              </div>
              <p className="text-[#101828] font-medium">Managua</p>
            </div>
            <div className="text-[#4A5565] flex items-center justify-between">
              <p>MIA</p>
              <p>MGA</p>
            </div>
          </div>
          <div className="p-3 rounded-[14px] flex gap-3 bg-[#EAF6EC]">
            {/* <C */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ShipmentStatus;
