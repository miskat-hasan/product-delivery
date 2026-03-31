"use client";
import { useForm } from "react-hook-form";

const CloseSvg = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M15 5L5 15M5 5l10 10" stroke="#6B7280" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

const AddOtherChargeModal = ({ onClose, onAdd }) => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      description: "",
      amount: "",
      entitlement: "due_agent",
      enableCalculation: false,
      method: "rate_x_qty_or_min",
      rate: "",
      rateBase: "gross_weight",
      minimum: "",
      maximum: "",
    },
  });

  const enableCalc = watch("enableCalculation");

  const onSubmit = (data) => {
    const payload = {
      description: data.description,
      amount: data.amount,
      entitlement: data.entitlement === "due_agent" ? "DUE AGENT" : "DUE CARRIER",
      ...(data.enableCalculation && {
        calculation: {
          method: data.method,
          rate: data.rate,
          rateBase: data.rateBase,
          minimum: data.minimum,
          maximum: data.maximum,
        },
      }),
    };
    onAdd(payload);
    reset();
    onClose();
  };

  return (
    <div className="fixed inset-0 z-[99] flex items-center justify-center bg-[#333333CC]">
      {/* Backdrop */}
      <div className="absolute inset-0" onClick={onClose} />

      {/* Modal */}
      <div className="relative z-10 w-full bg-[#FEFEFE] max-w-[520px] max-h-[calc(100vh-50px)] overflow-y-auto px-6 py-[30px] rounded-3xl border border-[#3D8FBE] mx-3 shadow-xl">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-2.5 text-primary-black text-2xl font-medium">
            Add
          </div>
          <button
            onClick={onClose}
            className="size-8 flex items-center justify-center rounded-full bg-[#F3F3F5] hover:bg-[#e5e5e6] cursor-pointer transition-colors"
          >
            <CloseSvg />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          
          {/* Description */}
          <div className="space-y-1.5">
            <label className="leading-[1.45] font-medium text-sm text-gray-700">
              Description
            </label>
            <input
              type="text"
              {...register("description", { required: "Description is required" })}
              placeholder="Enter description"
              className="w-full rounded-xl px-3 py-2.5 text-sm font-normal leading-[1.45] placeholder:text-gray-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3D8FBE] border border-gray-400 hover:border-gray-700 transition-all duration-150"
            />
            {errors.description && (
              <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>
            )}
          </div>

          {/* Amount + Entitlement row */}
          <div className="flex items-start gap-3">
            {/* Amount */}
            <div className="space-y-1.5 flex-1">
              <label className="leading-[1.45] font-medium text-sm text-gray-700">
                Amount
              </label>
              <input
                type="number"
                step="0.01"
                {...register("amount", { required: "Amount is required" })}
                placeholder="0.00"
                className="w-full rounded-xl px-3 py-2.5 text-sm font-normal leading-[1.45] placeholder:text-gray-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3D8FBE] border border-gray-400 hover:border-gray-700 transition-all duration-150"
              />
              {errors.amount && (
                <p className="text-red-500 text-xs mt-1">{errors.amount.message}</p>
              )}
            </div>

            {/* Entitlement */}
            <div className="space-y-1.5 flex-1">
              <label className="leading-[1.45] font-medium text-sm text-gray-700">
                Entitlement
              </label>
              <select
                {...register("entitlement")}
                className="w-full rounded-xl px-3 py-2.5 text-sm font-normal leading-[1.45] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3D8FBE] border border-gray-400 hover:border-gray-700 transition-all duration-150 bg-white cursor-pointer"
              >
                <option value="due_agent">Due agent</option>
                <option value="due_carrier">Due carrier</option>
              </select>
            </div>
          </div>

          {/* Rate calculation box */}
          <div className="border border-gray-300 rounded-xl p-4 bg-gray-50 space-y-3">
            <p className="text-sm font-semibold text-gray-600 uppercase tracking-wide">
              Rate Calculation
            </p>

            {/* Enable calculation checkbox */}
            <div className="flex items-center gap-2">
              <input
                id="enable-calc"
                type="checkbox"
                {...register("enableCalculation")}
                className="h-4 w-4 rounded border-gray-300 text-blue-500 focus:ring-blue-400 cursor-pointer"
              />
              <label htmlFor="enable-calc" className="text-sm text-gray-600 cursor-pointer">
                Enable calculation
              </label>
            </div>

            {/* Conditional fields */}
            <div
              className={`space-y-3 transition-all duration-200 ${
                enableCalc ? "opacity-100" : "opacity-40 pointer-events-none"
              }`}
            >
              {/* Method */}
              <div className="space-y-1.5">
                <label className="leading-[1.45] font-medium text-sm text-gray-700">
                  Method
                </label>
                <select
                  {...register("method")}
                  className="w-full rounded-xl px-3 py-2.5 text-sm font-normal leading-[1.45] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3D8FBE] border border-gray-400 hover:border-gray-700 transition-all duration-150 bg-white cursor-pointer"
                >
                  <option value="rate_x_qty_or_min">(rate × quantity) or minimum</option>
                  <option value="rate_x_qty">minimum + (rate × quantity)</option>
                </select>
              </div>

              {/* Rate row */}
              <div className="space-y-1.5">
                <label className="leading-[1.45] font-medium text-sm text-gray-700">
                  Rate
                </label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    step="0.0001"
                    {...register("rate")}
                    placeholder="0.0000"
                    className="flex-1 rounded-xl px-3 py-2.5 text-sm font-normal leading-[1.45] placeholder:text-gray-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3D8FBE] border border-gray-400 hover:border-gray-700 transition-all duration-150"
                  />
                  <span className="text-gray-500 text-sm font-medium">×</span>
                  <select
                    {...register("rateBase")}
                    className="flex-1 rounded-xl px-3 py-2.5 text-sm font-normal leading-[1.45] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3D8FBE] border border-gray-400 hover:border-gray-700 transition-all duration-150 bg-white cursor-pointer"
                  >
                    <option value="gross_weight">Gross weight</option>
                    <option value="chargeable_weight">Chargeable weight</option>
                    <option value="pieces">No. of pieces</option>
                    <option value="fixed">Charges due carrier</option>
                    <option value="fixed">Charges due agent</option>
                  </select>
                </div>
              </div>

              {/* Minimum & Maximum */}
              <div className="flex items-center gap-3">
                <div className="space-y-1.5 flex-1">
                  <label className="leading-[1.45] font-medium text-sm text-gray-700">
                    Minimum
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    {...register("minimum")}
                    placeholder="0.00"
                    className="w-full rounded-xl px-3 py-2.5 text-sm font-normal leading-[1.45] placeholder:text-gray-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3D8FBE] border border-gray-400 hover:border-gray-700 transition-all duration-150"
                  />
                </div>
                <div className="space-y-1.5 flex-1">
                  <label className="leading-[1.45] font-medium text-sm text-gray-700">
                    Maximum
                  </label>
                  <input
                    type="number"
                    step="0.01"
                    {...register("maximum")}
                    placeholder="0.00"
                    className="w-full rounded-xl px-3 py-2.5 text-sm font-normal leading-[1.45] placeholder:text-gray-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3D8FBE] border border-gray-400 hover:border-gray-700 transition-all duration-150"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center justify-end gap-2 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex items-center justify-center px-6 py-2.5 gap-2.5 rounded-2xl w-[152px] border border-blue-500 bg-[#ECF4F9] hover:bg-[#dde5eb] text-blue-500 font-medium cursor-pointer transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="py-2.5 px-8 rounded-2xl w-[152px] bg-blue-500 text-white font-medium hover:bg-blue-500/85 transition-colors cursor-pointer"
            >
              Accept
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddOtherChargeModal;