"use client";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

const CloseSvg = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path
      d="M15 5L5 15M5 5l10 10"
      stroke="#6B7280"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  </svg>
);

const RATE_CLASSES = [
  "",
  "Q",
  "S",
  "B",
  "M",
  "N",
  "R",
  "C",
  "U",
  "E",
  "Y",
  "K",
  "P",
];

const AddRateDescriptionModal = ({ onClose, onAdd, editData = null }) => {
  const { register, handleSubmit, watch, setValue, reset } = useForm({
    defaultValues: {
      rateClass: "",
      itemNumber: "",
      rateCharge: "",
      natureQuantity: "",
      pieces: "",
      grossWeight: "",
      kl: "K",
      chargeableWeight: "",
      total: "",
    },
  });

  // Pre-fill form when editing
  useEffect(() => {
    if (editData) {
      reset({
        pieces: editData.pieces || "",
        grossWeight: editData.grossWeight || "",
        kl: editData.kl || "K",
        rateClass: editData.rateClass || "",
        itemNumber: editData.itemNumber || "",
        chargeableWeight: editData.chargeableWeight || "",
        rateCharge: editData.rateCharge || "",
        total: editData.total || "",
        natureQuantity: editData.natureQuantity || "",
      });
    }
  }, [editData, reset]);

  const watchGrossWeight = watch("grossWeight");
  const watchChargeableWeight = watch("chargeableWeight");
  const watchRateCharge = watch("rateCharge");

  const hasGrossWeight =
    watchGrossWeight !== "" && !isNaN(parseFloat(watchGrossWeight));

  // If gross weight is entered, mirror it into chargeable weight
  useEffect(() => {
    if (hasGrossWeight) {
      setValue("chargeableWeight", watchGrossWeight);
    }
  }, [watchGrossWeight, hasGrossWeight, setValue]);

  // Recalculate total whenever relevant fields change
  useEffect(() => {
    const rate = parseFloat(watchRateCharge) || 0;
    const gw = parseFloat(watchGrossWeight) || 0;
    const cw = parseFloat(watchChargeableWeight) || 0;

    const base = gw > 0 ? gw : cw;
    const total = base > 0 && rate > 0 ? (base * rate).toFixed(2) : "";
    setValue("total", total);
  }, [watchGrossWeight, watchChargeableWeight, watchRateCharge, setValue]);

  const onSubmit = (data) => {
    onAdd({
      pieces: data.pieces,
      grossWeight: data.grossWeight,
      kl: data.kl,
      rateClass: data.rateClass,
      itemNumber: data.itemNumber,
      chargeableWeight: data.chargeableWeight,
      rateCharge: data.rateCharge,
      total: data.total,
      natureQuantity: data.natureQuantity,
    });
    onClose();
  };

  const inputCls =
    "w-full rounded-xl px-3 py-2 text-sm font-normal leading-[1.45] placeholder:text-gray-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3D8FBE] border border-gray-400 hover:border-gray-700 transition-all duration-150 bg-white";
  const disabledCls =
    "w-full rounded-xl px-3 py-2 text-sm font-normal leading-[1.45] border border-gray-300 bg-neutral-100 text-gray-500 cursor-not-allowed";
  const labelCls =
    "leading-[1.45] font-medium text-sm text-gray-700 mb-1 block";

  return (
    <div className="fixed inset-0 z-[99] flex items-center justify-center bg-[#333333CC]">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative z-10 w-full bg-[#FEFEFE] max-w-[760px] max-h-[calc(100vh-40px)] overflow-y-auto px-6 py-[28px] rounded-3xl border border-[#3D8FBE] mx-3 shadow-xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div className="text-2xl font-medium text-gray-800">
            {editData ? "Edit Rate Description" : "Add Rate Description"}
          </div>
          <button
            type="button"
            onClick={onClose}
            className="size-8 flex items-center justify-center rounded-full bg-[#F3F3F5] hover:bg-[#e5e5e6] cursor-pointer transition-colors"
          >
            <CloseSvg />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            {/* LEFT — Information */}
            <div className="border border-gray-200 rounded-2xl p-4 bg-gray-50 space-y-3">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest">
                Information
              </p>

              {/* Pieces */}
              <div>
                <label className={labelCls}>Pieces</label>
                <input
                  type="number"
                  {...register("pieces")}
                  placeholder="0"
                  className={inputCls}
                />
              </div>

              {/* Gross weight + K/L */}
              <div>
                <label className={labelCls}>Gross weight</label>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    step="0.01"
                    {...register("grossWeight")}
                    placeholder="0.00"
                    className={inputCls}
                  />
                  <select
                    {...register("kl")}
                    className="rounded-xl px-2 py-2 text-sm border border-gray-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3D8FBE] bg-white w-16"
                  >
                    <option value="K">K</option>
                    <option value="L">L</option>
                  </select>
                </div>
              </div>

              {/* Rate class */}
              <div>
                <label className={labelCls}>Rate class</label>
                <select {...register("rateClass")} className={inputCls}>
                  {RATE_CLASSES.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </div>

              {/* Item number */}
              <div>
                <label className={labelCls}>Item number</label>
                <input
                  type="text"
                  {...register("itemNumber")}
                  placeholder="Enter item number"
                  className={inputCls}
                />
              </div>

              {/* Chargeable weight */}
              <div>
                <label className={labelCls}>Chargeable weight</label>
                <input
                  type="number"
                  step="0.01"
                  {...register("chargeableWeight")}
                  placeholder="0.00"
                  disabled={hasGrossWeight}
                  className={hasGrossWeight ? disabledCls : inputCls}
                />
              </div>

              {/* Rate/Charge */}
              <div>
                <label className={labelCls}>Rate / Charge</label>
                <input
                  type="number"
                  step="0.0001"
                  {...register("rateCharge")}
                  placeholder="0.0000"
                  className={inputCls}
                />
              </div>

              {/* Total — always disabled */}
              <div>
                <label className={labelCls}>Total</label>
                <input
                  type="text"
                  {...register("total")}
                  readOnly
                  placeholder="Auto-calculated"
                  className={disabledCls}
                />
              </div>
            </div>

            {/* RIGHT — Nature and quantity */}
            <div className="border border-gray-200 rounded-2xl p-4 bg-gray-50 space-y-3">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest">
                Nature and quantity of goods
              </p>
              <textarea
                rows={8}
                {...register("natureQuantity")}
                placeholder="Describe the nature and quantity of goods..."
                className="w-full rounded-xl px-3 py-2.5 text-sm font-normal leading-[1.45] placeholder:text-gray-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3D8FBE] border border-gray-400 hover:border-gray-700 transition-all duration-150 resize-none"
              />
            </div>
          </div>

          {/* Dimensions — commented out for now */}
          {/* <div className="border border-gray-200 rounded-2xl p-4 bg-gray-50 space-y-3">
            ...
          </div> */}

          {/* Extra description — commented out for now */}
          {/* <div className="border border-gray-200 rounded-2xl p-4 bg-gray-50 space-y-2">
            ...
          </div> */}

          {/* Actions */}
          <div className="flex items-center justify-end gap-2 pt-1">
            <button
              type="button"
              onClick={onClose}
              className="flex items-center justify-center px-6 py-2.5 rounded-2xl w-[152px] border border-blue-500 bg-[#ECF4F9] hover:bg-[#dde5eb] text-blue-500 font-medium cursor-pointer transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="py-2.5 px-8 rounded-2xl w-[152px] bg-blue-500 text-white font-medium hover:bg-blue-500/85 transition-colors cursor-pointer"
            >
              {editData ? "Save" : "Accept"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddRateDescriptionModal;
