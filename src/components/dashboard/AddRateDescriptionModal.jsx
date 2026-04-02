"use client";
import { useState, useEffect } from "react";
import { useForm, useFieldArray } from "react-hook-form";

const CloseSvg = () => (
  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
    <path d="M15 5L5 15M5 5l10 10" stroke="#6B7280" strokeWidth="1.8" strokeLinecap="round" />
  </svg>
);

const TrashSvg = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
    <path d="M3 6h18M8 6V4h8v2M19 6l-1 14H6L5 6" stroke="#EF4444" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const PlusSvg = () => (
  <svg width="14" height="14" viewBox="0 0 20 20" fill="none">
    <path d="M10 4v12M4 10h12" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

const RATE_CLASSES = ["", "Q", "S", "B", "M", "N", "R", "C", "U", "E", "Y", "K", "P"];
const UNIT_OPTIONS = ["cm", "in", "mm"];
const VOLUME_FACTORS = { cm: 6000, in: 366 };

const AddRateDescriptionModal = ({ onClose, onAdd }) => {
  const { register, handleSubmit, watch, setValue, control, formState: { errors } } = useForm({
    defaultValues: {
      rateClass: "",
      itemNumber: "",
      rateCharge: "",
      total: "",
      calculateTotals: true,
      natureQuantity: "",
      extraDescription: "",
      unit: "cm",
      dimensions: [{ pieces: "", length: "", width: "", height: "", weightPc: "" }],
      manualPieces: "",
      manualGrossWeight: "",
      manualKL: "K",
      manualChargeableWeight: "",
    },
  });

  const { fields, append, remove } = useFieldArray({ control, name: "dimensions" });

  const watchCalc = watch("calculateTotals");
  const watchDims = watch("dimensions");
  const watchUnit = watch("unit");
  const watchRateCharge = watch("rateCharge");

  // Calculated values
  const [calcPieces, setCalcPieces] = useState(0);
  const [calcGrossWeight, setCalcGrossWeight] = useState(0);
  const [calcChargeableWeight, setCalcChargeableWeight] = useState(0);
  const [calcTotal, setCalcTotal] = useState("");
  const [volumeDisplay, setVolumeDisplay] = useState("0.000MC (0.00K)");

  useEffect(() => {
    if (!watchCalc) return;

    let totalPieces = 0;
    let totalGross = 0;
    let totalVolWeight = 0;
    let totalVolMC = 0;

    const factor = VOLUME_FACTORS[watchUnit] || 6000;

    watchDims.forEach((row) => {
      const p = parseFloat(row.pieces) || 0;
      const l = parseFloat(row.length) || 0;
      const w = parseFloat(row.width) || 0;
      const h = parseFloat(row.height) || 0;
      const wpc = parseFloat(row.weightPc) || 0;

      totalPieces += p;
      totalGross += p * wpc;

      const volPerPiece = (l * w * h) / factor;
      totalVolWeight += p * volPerPiece;
      totalVolMC += (p * l * w * h) / 1000000; // cubic meters
    });

    setCalcPieces(totalPieces);
    setCalcGrossWeight(parseFloat(totalGross.toFixed(2)));
    setCalcChargeableWeight(parseFloat(Math.max(totalGross, totalVolWeight).toFixed(2)));
    setVolumeDisplay(
      `${totalVolMC.toFixed(3)}MC (${totalVolWeight.toFixed(2)}K)`
    );
  }, [watchDims, watchUnit, watchCalc]);

  useEffect(() => {
    if (!watchCalc) return;
    const rate = parseFloat(watchRateCharge) || 0;
    const cw = calcChargeableWeight;
    if (rate && cw) {
      setCalcTotal((rate * cw).toFixed(2));
    } else {
      setCalcTotal("");
    }
  }, [watchRateCharge, calcChargeableWeight, watchCalc]);

  const onSubmit = (data) => {
    const payload = {
      pieces: watchCalc ? calcPieces : data.manualPieces,
      grossWeight: watchCalc ? calcGrossWeight : data.manualGrossWeight,
      kl: watchCalc ? "K" : data.manualKL,
      rateClass: data.rateClass,
      itemNumber: data.itemNumber,
      chargeableWeight: watchCalc ? calcChargeableWeight : data.manualChargeableWeight,
      rateCharge: data.rateCharge,
      total: watchCalc ? calcTotal : data.total,
      natureQuantity: data.natureQuantity,
      extraDescription: data.extraDescription,
    };
    onAdd(payload);
    onClose();
  };

  const inputCls =
    "w-full rounded-xl px-3 py-2 text-sm font-normal leading-[1.45] placeholder:text-gray-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3D8FBE] border border-gray-400 hover:border-gray-700 transition-all duration-150 bg-white";
  const disabledCls =
    "w-full rounded-xl px-3 py-2 text-sm font-normal leading-[1.45] border border-gray-300 bg-neutral-100 text-gray-500 cursor-not-allowed";
  const labelCls = "leading-[1.45] font-medium text-sm text-gray-700 mb-1 block";

  return (
    <div className="fixed inset-0 z-[99] flex items-center justify-center bg-[#333333CC]">
      <div className="absolute inset-0" onClick={onClose} />

      <div className="relative z-10 w-full bg-[#FEFEFE] max-w-[760px] max-h-[calc(100vh-40px)] overflow-y-auto px-6 py-[28px] rounded-3xl border border-[#3D8FBE] mx-3 shadow-xl">
        
        {/* Header */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-2.5 text-2xl font-medium text-gray-800">
           
            Add Rate Description
          </div>
          <button
            onClick={onClose}
            className="size-8 flex items-center justify-center rounded-full bg-[#F3F3F5] hover:bg-[#e5e5e6] cursor-pointer transition-colors"
          >
            <CloseSvg />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Top two columns */}
          <div className="grid grid-cols-2 gap-4">
            
            {/* LEFT — Information */}
            <div className="border border-gray-200 rounded-2xl p-4 bg-gray-50 space-y-3">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest">Information</p>

              {/* Pieces */}
              <div>
                <label className={labelCls}>Pieces</label>
                {watchCalc ? (
                  <input type="text" value={calcPieces || ""} readOnly className={disabledCls} />
                ) : (
                  <input type="number" {...register("manualPieces")} placeholder="0" className={inputCls} />
                )}
              </div>

              {/* Gross weight + K/L */}
              <div>
                <label className={labelCls}>Gross weight</label>
                <div className="flex items-center gap-2">
                  {watchCalc ? (
                    <input type="text" value={calcGrossWeight || ""} readOnly className={disabledCls} />
                  ) : (
                    <input type="number" step="0.01" {...register("manualGrossWeight")} placeholder="0.00" className={inputCls} />
                  )}
                  <select
                    {...register("manualKL")}
                    // disabled={watchCalc}
                    className="rounded-xl px-2 py-2 text-sm border border-gray-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3D8FBE] bg-white w-16 disabled:bg-neutral-100 disabled:text-gray-400"
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
                  {RATE_CLASSES.map((r) => <option key={r} value={r}>{r}</option>)}
                </select>
              </div>

              {/* Item number */}
              <div>
                <label className={labelCls}>Item number</label>
                <input type="text" {...register("itemNumber")} placeholder="Enter item number" className={inputCls} />
              </div>

              {/* Chargeable weight */}
              <div>
                <label className={labelCls}>Chargeable weight</label>
                <div className="flex items-center gap-2">
                  {watchCalc ? (
                    <input type="text" value={calcChargeableWeight || ""} readOnly className={disabledCls} />
                  ) : (
                    <input type="number" step="0.01" {...register("manualChargeableWeight")} placeholder="0.00" className={inputCls} />
                  )}
                  <select
                    // disabled={watchCalc}
                    className="rounded-xl px-2 py-2 text-sm border border-gray-400 focus:outline-none bg-white w-32 disabled:bg-neutral-100 disabled:text-gray-400 text-xs"
                  >
                    <option value="6000">6000 cm³/kg</option>
                    <option value="366">366 in³/kg</option>
                  </select>
                </div>
              </div>

              {/* Rate/Charge */}
              <div>
                <label className={labelCls}>Rate / Charge</label>
                <input type="number" step="0.0001" {...register("rateCharge")} placeholder="0.0000" className={inputCls} />
              </div>

              {/* Total */}
              <div>
                <label className={labelCls}>Total</label>
                {watchCalc ? (
                  <input type="text" value={calcTotal || ""} readOnly className={disabledCls} />
                ) : (
                  <input type="number" step="0.01" {...register("total")} placeholder="0.00" className={inputCls} />
                )}
              </div>

              {/* Calculate totals checkbox */}
              <div className="flex items-center gap-2 pt-1">
                <input
                  id="calc-totals"
                  type="checkbox"
                  {...register("calculateTotals")}
                  className="h-4 w-4 rounded border-gray-300 text-blue-500 focus:ring-blue-400 cursor-pointer accent-blue-500"
                />
                <label htmlFor="calc-totals" className="text-sm text-gray-600 cursor-pointer select-none">
                  calculate totals
                </label>
              </div>
            </div>

            {/* RIGHT — Nature and quantity */}
            <div className="border border-gray-200 rounded-2xl p-4 bg-gray-50 space-y-3">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest">Nature and quantity of goods</p>
              <textarea
                rows={8}
                {...register("natureQuantity")}
                placeholder="Describe the nature and quantity of goods..."
                className="w-full rounded-xl px-3 py-2.5 text-sm font-normal leading-[1.45] placeholder:text-gray-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3D8FBE] border border-gray-400 hover:border-gray-700 transition-all duration-150 resize-none"
              />
            </div>
          </div>

          {/* Dimensions */}
          <div className="border border-gray-200 rounded-2xl p-4 bg-gray-50 space-y-3">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest">Dimensions</p>
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <span className="text-sm text-gray-600">Unit</span>
                  <select
                    {...register("unit")}
                    className="rounded-lg px-2 py-1 text-sm border border-gray-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3D8FBE] bg-white"
                  >
                    {UNIT_OPTIONS.map((u) => <option key={u} value={u}>{u}</option>)}
                  </select>
                </div>
                <span className="text-xs text-gray-500 bg-white border border-gray-200 rounded-lg px-2 py-1">
                  Volume: {volumeDisplay}
                </span>
              </div>
            </div>

            {/* Table header */}
            <div className="grid grid-cols-[1fr_1fr_1fr_1fr_1fr_32px] gap-1.5 px-1">
              {["Pieces", "Length", "Width", "Height", "Weight (pc)", ""].map((h, i) => (
                <div key={i} className="text-xs font-semibold text-gray-600">{h}</div>
              ))}
            </div>

            {/* Dimension rows */}
            <div className="space-y-1.5">
              {fields.map((field, index) => (
                <div key={field.id} className="grid grid-cols-[1fr_1fr_1fr_1fr_1fr_32px] gap-1.5 items-center">
                  <input
                    type="number"
                    {...register(`dimensions.${index}.pieces`)}
                    placeholder="0"
                    className="rounded-lg px-2 py-2 text-sm border border-gray-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3D8FBE] hover:border-gray-600 transition-all bg-white w-full"
                  />
                  <input
                    type="number"
                    step="0.01"
                    {...register(`dimensions.${index}.length`)}
                    placeholder="0"
                    className="rounded-lg px-2 py-2 text-sm border border-gray-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3D8FBE] hover:border-gray-600 transition-all bg-white w-full"
                  />
                  <input
                    type="number"
                    step="0.01"
                    {...register(`dimensions.${index}.width`)}
                    placeholder="0"
                    className="rounded-lg px-2 py-2 text-sm border border-gray-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3D8FBE] hover:border-gray-600 transition-all bg-white w-full"
                  />
                  <input
                    type="number"
                    step="0.01"
                    {...register(`dimensions.${index}.height`)}
                    placeholder="0"
                    className="rounded-lg px-2 py-2 text-sm border border-gray-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3D8FBE] hover:border-gray-600 transition-all bg-white w-full"
                  />
                  <input
                    type="number"
                    step="0.01"
                    {...register(`dimensions.${index}.weightPc`)}
                    placeholder="0"
                    className="rounded-lg px-2 py-2 text-sm border border-gray-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3D8FBE] hover:border-gray-600 transition-all bg-white w-full"
                  />
                  <button
                    type="button"
                    onClick={() => fields.length > 1 && remove(index)}
                    disabled={fields.length === 1}
                    className="flex items-center justify-center size-8 rounded-lg hover:bg-red-50 transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                  >
                    <TrashSvg />
                  </button>
                </div>
              ))}
            </div>

            {/* Add row button */}
            <button
              type="button"
              onClick={() => append({ pieces: "", length: "", width: "", height: "", weightPc: "" })}
              className="flex items-center gap-1.5 text-sm text-blue-500 hover:text-blue-600 font-medium cursor-pointer transition-colors mt-1"
            >
              <div className="size-5 flex items-center justify-center rounded-full border border-blue-400 bg-[#ECF4F9]">
                <PlusSvg />
              </div>
              Add row
            </button>
          </div>

          {/* Extra description */}
          <div className="border border-gray-200 rounded-2xl p-4 bg-gray-50 space-y-2">
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest">Extra description</p>
            <textarea
              rows={3}
              {...register("extraDescription")}
              placeholder="Additional description..."
              className="w-full rounded-xl px-3 py-2.5 text-sm font-normal leading-[1.45] placeholder:text-gray-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#3D8FBE] border border-gray-400 hover:border-gray-700 transition-all duration-150 resize-none"
            />
          </div>

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
              Accept
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddRateDescriptionModal;
