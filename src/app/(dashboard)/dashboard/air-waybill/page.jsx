"use client";

import { useForm } from "react-hook-form";
import React, { useState, useEffect } from "react";
import { MdPermContactCalendar } from "react-icons/md";
import { FaRegPenToSquare, FaRegTrashCan } from "react-icons/fa6";
import Link from "next/link";
import ContactFinder from "@/components/dashboard/ContactFinder";
import AirlineFinderModal from "@/components/dashboard/AirlineFinderModal";
import AddOtherChargeModal from "@/components/dashboard/AddOtherChargeModal";
import AddRateDescriptionModal from "@/components/dashboard/AddRateDescriptionModal";
import {
  GetSingleTemplate,
  StoreAirWaybill,
  useGetAllAirports,
} from "@/hooks/api/dashboardApi";
import { FiUploadCloud } from "react-icons/fi";
import AirportComboBox from "@/components/ui/CompoBox";
import { useSearchParams } from "next/navigation";

const Page = () => {
  const params = useSearchParams();
  const id = params.get("id");

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm({});

  const { data: awbFormData, isLoading: awbFormDataLoading } =
    GetSingleTemplate(id);

  console.log(awbFormData);

  // ── Contact finder ──────────────────────────────────────────────
  const [isContactFinderOpen, setIsContactFinderOpen] = useState(null);
  const [isAirlineFinderOpen, setIsAirlineFinderOpen] = useState(false);
  const [preview, setPreview] = useState(null);
  const [logoFile, setLogoFile] = useState(null);
  const [editingRateIndex, setEditingRateIndex] = useState(null);
  const [editingChargeIndex, setEditingChargeIndex] = useState(null);

  const [selectedContacts, setSelectedContacts] = useState({
    shipper: null,
    consignee: null,
    carriers_agent: null,
  });

  const handleContactSelect = (contact) => {
    setSelectedContacts((prev) => ({
      ...prev,
      [isContactFinderOpen]: contact,
    }));
  };

  // ── Combo box field states ──────────────────────────────────────
  const [originValue, setOriginValue] = useState("");
  const [toFirstCarrierValue, setToFirstCarrierValue] = useState("");
  const [toSecondCarrierValue, setToSecondCarrierValue] = useState("");
  const [toThirdCarrierValue, setToThirdCarrierValue] = useState("");
  const [departureValue, setDepartureValue] = useState("");
  const [destinationValue, setDestinationValue] = useState("");
  
  // ── Other charges ───────────────────────────────────────────────
  const [isAddChargeOpen, setIsAddChargeOpen] = useState(false);
  const [otherCharges, setOtherCharges] = useState([]);

  const handleEditCharge = (charge, index) => {
    setEditingChargeIndex(index);
    setIsAddChargeOpen(true);
  };

  const handleSaveCharge = (charge) => {
    if (editingChargeIndex !== null) {
      setOtherCharges((prev) =>
        prev.map((c, i) => (i === editingChargeIndex ? charge : c)),
      );
      setEditingChargeIndex(null);
    } else {
      setOtherCharges((prev) => [...prev, charge]);
    }
  };

  const handleDeleteCharge = (index) =>
    setOtherCharges((prev) => prev.filter((_, i) => i !== index));

  // ── Rate descriptions ───────────────────────────────────────────
  const [isAddRateOpen, setIsAddRateOpen] = useState(false);
  const [rateDescriptions, setRateDescriptions] = useState([]);

  const handleEditRate = (rate, index) => {
    setEditingRateIndex(index);
    setIsAddRateOpen(true);
  };

  const handleSaveRate = (rate) => {
    if (editingRateIndex !== null) {
      setRateDescriptions((prev) =>
        prev.map((r, i) => (i === editingRateIndex ? rate : r)),
      );
      setEditingRateIndex(null);
    } else {
      setRateDescriptions((prev) => [...prev, rate]);
    }
  };

  const handleDeleteRate = (index) =>
    setRateDescriptions((prev) => prev.filter((_, i) => i !== index));

  // logo file
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogoFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  // ── Charges declaration selects ─────────────────────────────────
  const [wtVal, setWtVal] = useState("ppd");
  const [otherDecl, setOtherDecl] = useState("ppd");

  // ── Charges summary — user-editable fields ──────────────────────
  const [prepaidValuation, setPrepaidValuation] = useState("");
  const [prepaidTax, setPrepaidTax] = useState("");
  const [collectValuation, setCollectValuation] = useState("");
  const [collectTax, setCollectTax] = useState("");

  // ── Pre-fill form when template data loads ──────────────────────
  useEffect(() => {
    if (!awbFormData?.data) return;
    const d = awbFormData.data;

    reset({
      issued_by: d.issued_by || "",
      is_template: d.is_template === 1,
      template_name: d.template_name || "",
      serial_id: d.serial_id || "",
      airline_prefix: d.consignment_details?.airline_prefix || "",
      serial_number: d.consignment_details?.serial_number || "",
      iata_code: d.agent?.iata_code || "",
      accounting_info: d.accounting_info || "",
      by_first_carrier: d.flights_booking?.route?.by_first_carrier || "",
      by_second_carrier: d.flights_booking?.route?.by_second_carrier || "",
      by_third_carrier: d.flights_booking?.route?.by_third_carrier || "",
      flight: d.flights_booking?.flight || "",
      flight_date: d.flights_booking?.date || "",
      chcg: d.charges_declaration?.chcg || "",
      value_for_carriage: d.charges_declaration?.value_for_carriage || "",
      value_for_customs: d.charges_declaration?.value_for_customs || "",
      amount_of_insurance: d.charges_declaration?.amount_of_insurance || "",
      requirements: d.handling_info?.requirements || "",
      sci: d.handling_info?.sci || "",
      currency_conv_rates: d.collect_charges?.currency_conv_rates || "",
      cc_charges: d.collect_charges?.cc_charges || "",
      charges_at_destination: d.collect_charges?.charges_at_destination || "",
      total_collect_charges: d.collect_charges?.total_collect_charges || "",
      shipper_cert_text: d.shipper_certification?.text || "",
      shipper_cert_signature: d.shipper_certification?.signature || "",
      carrier_exec_text: d.carrier_execution?.execution || "",
      carrier_exec_date: d.carrier_execution?.date || "",
      carrier_exec_place: d.carrier_execution?.place || "",
      carrier_exec_signature: d.carrier_execution?.signature || "",
    });

    setOriginValue(d.consignment_details?.origin || "");
    setDepartureValue(d.flights_booking?.departure || "");
    setDestinationValue(d.flights_booking?.destination || "");
    setToFirstCarrierValue(d.flights_booking?.route?.to_first_carrier || "");
    setToSecondCarrierValue(d.flights_booking?.route?.to_second_carrier || "");
    setToThirdCarrierValue(d.flights_booking?.route?.to_third_carrier || "");

    setSelectedContacts({
      shipper: d.shipper
        ? {
            account_number: d.shipper.account_number || "",
            name_address: d.shipper.name_address || "",
          }
        : null,
      consignee: d.consignee
        ? {
            account_number: d.consignee.account_number || "",
            name_address: d.consignee.name_address || "",
          }
        : null,
      carriers_agent: d.agent
        ? {
            account_number: d.agent.account_number || "",
            name_address: d.agent.name_address || "",
          }
        : null,
    });

    setWtVal(d.charges_declaration?.wt_val || "ppd");
    setOtherDecl(d.charges_declaration?.other || "ppd");

    setPrepaidValuation(d.charges_summary?.prepaid?.valuation_charge || "");
    setPrepaidTax(d.charges_summary?.prepaid?.tax || "");
    setCollectValuation(d.charges_summary?.collect?.valuation_charge || "");
    setCollectTax(d.charges_summary?.collect?.tax || "");

    if (Array.isArray(d.rate_description)) {
      setRateDescriptions(
        d.rate_description.map((r) => ({
          pieces: r.pieces || "",
          grossWeight: r.gross_weight || "",
          kl: r.k_l || "",
          rateClass: r.rate_class || "",
          itemNumber: r.item_no || "",
          chargeableWeight: r.charge_weight || "",
          rateCharge: r.rate_charge || "",
          total: r.total || "",
          natureQuantity: r.nature_and_quantity || "",
        })),
      );
    }

    if (Array.isArray(d.other_charges)) {
      setOtherCharges(
        d.other_charges.map((c) => ({
          description: c.description || "",
          amount: c.amount || "",
          entitlement: c.entitlement || "",
        })),
      );
    }

    if (d.logo) {
      setPreview(process.env.NEXT_PUBLIC_SITE_URL + "/" + d.logo);
    }
  }, [awbFormData]);

  // ── Derived totals from rate descriptions ───────────────────────
  const totalPieces = rateDescriptions.reduce(
    (s, r) => s + Number(r.pieces),
    0,
  );
  const totalGrossWeight = rateDescriptions.reduce(
    (s, r) => s + Number(r.grossWeight),
    0,
  );
  const totalChargeableWeight = rateDescriptions.reduce(
    (s, r) => s + Number(r.chargeableWeight),
    0,
  );
  const rateDescTotal = rateDescriptions.reduce(
    (s, r) => s + Number(r.total),
    0,
  );

  // ── Weight charge routing ───────────────────────────────────────
  const prepaidWeightCharge = wtVal === "ppd" ? rateDescTotal : 0;
  const collectWeightCharge = wtVal === "coll" ? rateDescTotal : 0;

  // ── Other charges split by entitlement + ppd/coll ───────────────
  const prepaidDueAgent =
    otherDecl === "ppd"
      ? otherCharges
          .filter((c) => c.entitlement === "DUE AGENT")
          .reduce((s, c) => s + Number(c.amount), 0)
      : 0;
  const prepaidDueCarrier =
    otherDecl === "ppd"
      ? otherCharges
          .filter((c) => c.entitlement === "DUE CARRIER")
          .reduce((s, c) => s + Number(c.amount), 0)
      : 0;
  const collectDueAgent =
    otherDecl === "coll"
      ? otherCharges
          .filter((c) => c.entitlement === "DUE AGENT")
          .reduce((s, c) => s + Number(c.amount), 0)
      : 0;
  const collectDueCarrier =
    otherDecl === "coll"
      ? otherCharges
          .filter((c) => c.entitlement === "DUE CARRIER")
          .reduce((s, c) => s + Number(c.amount), 0)
      : 0;

  // ── Charges summary totals ──────────────────────────────────────
  const prepaidTotal =
    prepaidWeightCharge +
    Number(prepaidValuation || 0) +
    Number(prepaidTax || 0) +
    prepaidDueAgent +
    prepaidDueCarrier;

  const collectTotal =
    collectWeightCharge +
    Number(collectValuation || 0) +
    Number(collectTax || 0) +
    collectDueAgent +
    collectDueCarrier;

  const { mutate, isPending } = StoreAirWaybill();

  // ── GET All Airports DATA ─────────────────────────────────────────────────
  const { data: airportData, isLoading: airportDataLoading } =
    useGetAllAirports();
  const airports = airportData?.data || [];

  // ── Watch is_template checkbox ──────────────────────────────────
  const isTemplate = watch("is_template");

  // ── Form submit ─────────────────────────────────────────────────
  const onSubmit = (data) => {
    const payload = {
      issued_by: data.issued_by || "",
      is_template: data.is_template ? 1 : 0,
      template_name: data.is_template ? data.template_name || "" : "",
      serial_id: data.serial_id || "",
      consignment_details: {
        airline_prefix: data.airline_prefix || "",
        serial_number: data.serial_number || "",
        origin: originValue || "",
      },
      shipper: {
        account_number: selectedContacts.shipper?.account_number || "",
        name_address: selectedContacts.shipper?.name_address || "",
      },
      consignee: {
        account_number: selectedContacts.consignee?.account_number || "",
        name_address: selectedContacts.consignee?.name_address || "",
      },
      agent: {
        account_number: selectedContacts.carriers_agent?.account_number || "",
        name_address: selectedContacts.carriers_agent?.name_address || "",
        iata_code: data.iata_code || "",
      },
      accounting_info: data.accounting_info || "",
      flights_booking: {
        departure: departureValue || "",
        route: {
          to_first_carrier: toFirstCarrierValue || "",
          by_first_carrier: data.by_first_carrier || "",
          to_second_carrier: toSecondCarrierValue || "",
          by_second_carrier: data.by_second_carrier || "",
          to_third_carrier: toThirdCarrierValue || "",
          by_third_carrier: data.by_third_carrier || "",
        },
        destination: destinationValue || "",
        flight: data.flight || "",
        date: data.flight_date || "",
      },
      charges_declaration: {
        currency: "usd",
        chcg: data.chcg || "",
        value_for_carriage: data.value_for_carriage || "",
        wt_val: wtVal,
        value_for_customs: data.value_for_customs || "",
        other: otherDecl,
        amount_of_insurance: data.amount_of_insurance || "",
      },
      handling_info: {
        requirements: data.requirements || "",
        sci: data.sci || "",
      },
      rate_description: rateDescriptions.map((r) => ({
        pieces: r.pieces,
        gross_weight: r.grossWeight,
        k_l: r.kl,
        item_no: r.itemNumber,
        rate_class: r.rateClass,
        charge_weight: r.chargeableWeight,
        rate_charge: r.rateCharge,
        total: r.total,
        nature_and_quantity: r.natureQuantity,
      })),
      charges_summary: {
        prepaid: {
          weight_charge: String(prepaidWeightCharge),
          valuation_charge: prepaidValuation,
          tax: prepaidTax,
          other_charges_due_agent: String(prepaidDueAgent),
          other_charges_due_carrier: String(prepaidDueCarrier),
          total_prepaid: String(prepaidTotal),
        },
        collect: {
          weight_charge: String(collectWeightCharge),
          valuation_charge: collectValuation,
          tax: collectTax,
          other_charges_due_agent: String(collectDueAgent),
          other_charges_due_carrier: String(collectDueCarrier),
          total_collect: String(collectTotal),
        },
      },
      collect_charges: {
        currency_conv_rates: data.currency_conv_rates || "",
        cc_charges: data.cc_charges || "",
        charges_at_destination: data.charges_at_destination || "",
        total_collect_charges: data.total_collect_charges || "",
      },
      other_charges: otherCharges.map((c) => ({
        description: c.description,
        amount: c.amount,
        entitlement: c.entitlement,
      })),
      shipper_certification: {
        text: data.shipper_cert_text || "",
        signature: data.shipper_cert_signature || "",
      },
      carrier_execution: {
        execution: data.carrier_exec_text || "",
        date: data.carrier_exec_date || "",
        place: data.carrier_exec_place || "",
        signature: data.carrier_exec_signature || "",
      },
    };

    const formData = new FormData();

    const appendToFormData = (fd, data, parentKey = "") => {
      if (data === null || data === undefined) {
        fd.append(parentKey, "");
      } else if (data instanceof File) {
        fd.append(parentKey, data, data.name);
      } else if (Array.isArray(data)) {
        data.forEach((item, index) => {
          appendToFormData(fd, item, `${parentKey}[${index}]`);
        });
      } else if (typeof data === "object") {
        Object.entries(data).forEach(([key, value]) => {
          appendToFormData(fd, value, parentKey ? `${parentKey}[${key}]` : key);
        });
      } else {
        fd.append(parentKey, data);
      }
    };

    appendToFormData(formData, payload);

    if (logoFile) {
      formData.append("logo", logoFile, logoFile.name);
    }

    mutate(formData);
  };

  // ── Shared input class ──────────────────────────────────────────
  const inp =
    "w-full rounded-xl px-3 py-2.5 text-sm sm:text-base font-normal leading-[1.45] placeholder:text-gray-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-300 border border-gray-400 hover:border-gray-700 transition-all duration-150 uppercase placeholder:capitalize";

  const inpDisabled = `${inp} disabled:bg-neutral-200`;

  return (
    <section>
      <h3 className="text-2xl mb-2">Create New Shipment</h3>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-2 gap-2 lg:gap-4">
          {/* ── LEFT SIDE ── */}
          <div className="space-y-2 max-md:col-span-2">
            {/* Shipper */}
            <div className="bg-white rounded-[14px] p-2 lg:p-4 shadow-sm space-y-2">
              <div className="flex items-center justify-between gap-2">
                <h6 className="text-xl">Shipper</h6>
                <button
                  type="button"
                  onClick={() => setIsContactFinderOpen("shipper")}
                  className="cursor-pointer"
                >
                  <MdPermContactCalendar className="size-6 lg:size-7 text-gray-700" />
                </button>
              </div>
              <div className="space-y-1">
                <div className="leading-[1.45] font-medium text-sm sm:text-base text-gray-700">
                  Account number
                </div>
                <input
                  type="text"
                  value={
                    selectedContacts.shipper &&
                    selectedContacts.shipper.account_number
                  }
                  className={inp}
                />
              </div>
              <div className="space-y-1">
                <div className="leading-[1.45] font-medium text-sm sm:text-base text-gray-700">
                  Name and address
                </div>
                <textarea
                  rows={4}
                  value={
                    selectedContacts.shipper &&
                    `${selectedContacts.shipper.name_address}`
                  }
                  className={inp}
                />
              </div>
            </div>

            {/* Consignee */}
            <div className="bg-white rounded-[14px] p-2 lg:p-4 shadow-sm space-y-2">
              <div className="flex items-center justify-between gap-2">
                <h6 className="text-xl">Consignee</h6>
                <button
                  type="button"
                  onClick={() => setIsContactFinderOpen("consignee")}
                  className="cursor-pointer"
                >
                  <MdPermContactCalendar className="size-6 lg:size-7 text-gray-700" />
                </button>
              </div>
              <div className="space-y-1">
                <div className="leading-[1.45] font-medium text-sm sm:text-base text-gray-700">
                  Account number
                </div>
                <input
                  type="text"
                  value={
                    selectedContacts.consignee &&
                    selectedContacts.consignee.account_number
                  }
                  className={inp}
                />
              </div>
              <div className="space-y-1">
                <div className="leading-[1.45] font-medium text-sm sm:text-base text-gray-700">
                  Name and address
                </div>
                <textarea
                  rows={4}
                  value={
                    selectedContacts.consignee &&
                    `${selectedContacts.consignee.name_address}`
                  }
                  className={inp}
                />
              </div>
            </div>

            {/* Issuing carrier's agent */}
            <div className="bg-white rounded-[14px] p-2 lg:p-4 shadow-sm space-y-2">
              <div className="flex items-center justify-between gap-2">
                <h6 className="text-xl">Issuing carrier&apos;s agent</h6>
                <button
                  type="button"
                  onClick={() => setIsContactFinderOpen("carriers_agent")}
                  className="cursor-pointer"
                >
                  <MdPermContactCalendar className="size-6 lg:size-7 text-gray-700" />
                </button>
              </div>
              <div className="space-y-1">
                <div className="leading-[1.45] font-medium text-sm sm:text-base text-gray-700">
                  Name and city
                </div>
                <textarea
                  rows={4}
                  value={
                    selectedContacts.carriers_agent &&
                    `${selectedContacts.carriers_agent.name_address}`
                  }
                  className={inp}
                />
              </div>
              <div className="space-y-1">
                <div className="leading-[1.45] font-medium text-sm sm:text-base text-gray-700">
                  IATA code
                </div>
                <input type="text" {...register("iata_code")} className={inp} />
              </div>
              <div className="space-y-1">
                <div className="leading-[1.45] font-medium text-sm sm:text-base text-gray-700">
                  Account No.
                </div>
                <input
                  type="text"
                  value={
                    selectedContacts.carriers_agent &&
                    selectedContacts.carriers_agent.account_number
                  }
                  className={inp}
                />
              </div>
            </div>

            {/* Routing and flights booking */}
            <div className="bg-white rounded-[14px] p-2 lg:p-4 shadow-sm space-y-2">
              <h6 className="text-xl">Routing and flights booking</h6>
              <div className="space-y-1">
                <div className="leading-[1.45] font-medium text-sm sm:text-base text-gray-700">
                  Departure
                </div>
                <AirportComboBox
                  airports={airports}
                  mode="short"
                  value={departureValue?.replace(/\(.*?\)$/, "").trim()}
                  onChange={setDepartureValue}
                  className={inp}
                  placeholder="Search airport..."
                />
              </div>

              {/* Route */}
              <div className="bg-gray-50 rounded-[14px] p-2 shadow-sm space-y-2">
                <h6 className="text-lg">Route</h6>
                <div className="flex items-center gap-2 w-full">
                  <div className="space-y-1">
                    <div className="leading-[1.45] font-medium text-sm sm:text-base text-gray-700">
                      To
                    </div>
                    <AirportComboBox
                      airports={airports}
                      mode="prefix"
                      value={toFirstCarrierValue?.split("/")[0]}
                      onChange={setToFirstCarrierValue}
                      className={inp}
                    />
                  </div>
                  <div className="space-y-1 flex-1">
                    <div className="leading-[1.45] font-medium text-sm sm:text-base text-gray-700">
                      By first carrier
                    </div>
                    <input
                      type="text"
                      {...register("by_first_carrier", {
                        onChange: (e) => {
                          if (e.target.value.length > 3) {
                            e.target.value = e.target.value.slice(0, 3);
                          }
                        },
                      })}
                      className={inp}
                    />
                  </div>
                </div>
                <div className="flex items-center gap-2 w-full">
                  <div className="space-y-1">
                    <div className="leading-[1.45] font-medium text-sm sm:text-base text-gray-700">
                      To
                    </div>
                    <AirportComboBox
                      airports={airports}
                      mode="prefix"
                      value={toSecondCarrierValue?.split("/")[0]}
                      onChange={setToSecondCarrierValue}
                      className={inp}
                    />
                  </div>
                  <div className="space-y-1">
                    <div className="leading-[1.45] font-medium text-sm sm:text-base text-gray-700">
                      By
                    </div>
                    <input
                      type="text"
                      {...register("by_second_carrier", {
                        onChange: (e) => {
                          if (e.target.value.length > 3) {
                            e.target.value = e.target.value.slice(0, 3);
                          }
                        },
                      })}
                      className={inp}
                    />
                  </div>
                  <div className="space-y-1">
                    <div className="leading-[1.45] font-medium text-sm sm:text-base text-gray-700">
                      To
                    </div>
                    <AirportComboBox
                      airports={airports}
                      mode="prefix"
                      value={toThirdCarrierValue?.split("/")[0]}
                      onChange={setToThirdCarrierValue}
                      className={inp}
                    />
                  </div>
                  <div className="space-y-1">
                    <div className="leading-[1.45] font-medium text-sm sm:text-base text-gray-700">
                      By
                    </div>
                    <input
                      type="text"
                      {...register("by_third_carrier", {
                        onChange: (e) => {
                          if (e.target.value.length > 3) {
                            e.target.value = e.target.value.slice(0, 3);
                          }
                        },
                      })}
                      className={inp}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-1">
                <div className="leading-[1.45] font-medium text-sm sm:text-base text-gray-700">
                  Destination
                </div>
                <AirportComboBox
                  airports={airports}
                  mode="short"
                  value={destinationValue?.replace(/\(.*?\)$/, "").trim()}
                  onChange={setDestinationValue}
                  className={inp}
                  placeholder="Search airport..."
                />
              </div>

              {/* Flight/Date */}
              <div className="bg-gray-50 rounded-[14px] p-2 shadow-sm space-y-2">
                <h6 className="text-lg">Flight/Date</h6>
                <div className="flex items-center gap-2 w-full">
                  <div className="space-y-1 flex-1">
                    <input
                      type="text"
                      {...register("flight", {
                        onChange: (e) => {
                          if (e.target.value.length > 10) {
                            e.target.value = e.target.value.slice(0, 10);
                          }
                        },
                      })}
                      placeholder="Flight"
                      className={inp}
                    />
                  </div>
                  <div className="space-y-1 flex-1">
                    <input
                      type="date"
                      {...register("flight_date")}
                      className={inp}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── RIGHT SIDE ── */}
          <div className="space-y-2 max-md:col-span-2">
            {/* Consignment details */}
            <div className="bg-white rounded-[14px] p-2 lg:p-4 shadow-sm space-y-2">
              <h6 className="text-xl">Consignment details</h6>
              <div className="space-y-1">
                <div className="leading-[1.45] font-medium text-sm sm:text-base text-gray-700">
                  Airline prefix
                </div>
                <input
                  type="number"
                  {...register("airline_prefix", {
                    onChange: (e) => {
                      if (e.target.value.length > 3) {
                        e.target.value = e.target.value.slice(0, 3);
                      }
                    },
                  })}
                  className={inp}
                />
              </div>
              <div className="space-y-1">
                <div className="leading-[1.45] font-medium text-sm sm:text-base text-gray-700">
                  Serial number
                </div>
                <input
                  type="number"
                  {...register("serial_number", {
                    onChange: (e) => {
                      if (e.target.value.length > 8) {
                        e.target.value = e.target.value.slice(0, 8);
                      }
                    },
                  })}
                  className={inp}
                />
              </div>
              <div className="space-y-1">
                <div className="leading-[1.45] font-medium text-sm sm:text-base text-gray-700">
                  Origin
                </div>
                <AirportComboBox
                  airports={airports}
                  mode="prefix"
                  value={originValue?.split("/")[0]}
                  onChange={setOriginValue}
                  className={inp}
                  placeholder="Search airport..."
                />
              </div>
            </div>

            {/* air line logo */}
            <div className="bg-white rounded-[14px] p-2 lg:p-4 shadow-sm space-y-2">
              <label className="block text-primary-text text-xl leading-[150%] mb-1">
                Logo
              </label>

              <input
                type="file"
                accept="image/*"
                id="logo"
                className="hidden"
                onChange={handleFileChange}
              />

              <label
                htmlFor="logo"
                className={`flex flex-col items-center justify-center border border-dashed bg-gradient-to-r from-[#F9FCFF] to-[#E3F2FD]/40 border-gray-300 rounded-[20px] cursor-pointer bg-gray-50 hover:border-teal-500 transition py-10`}
              >
                {preview ? (
                  <img
                    src={preview}
                    alt="Uploaded preview"
                    className="object-cover rounded-xl border border-gray-200 shadow-sm"
                  />
                ) : (
                  <>
                    <div className="bg-white border border-[#EAECF0] w-10 h-10 rounded-[10px] flex items-center justify-center mb-3">
                      <FiUploadCloud className="text-[#6B7280] text-xl" />
                    </div>
                    <p className="text-sub-text">Click to upload the Logo</p>
                  </>
                )}
              </label>
            </div>

            {/* Issuer */}
            <div className="bg-white rounded-[14px] p-2 lg:p-4 shadow-sm space-y-2">
              <h6 className="text-xl">Issuer</h6>
              <div className="space-y-1">
                <div className="leading-[1.45] font-medium text-sm sm:text-base text-gray-700">
                  Issued by
                </div>
                <textarea
                  rows={5}
                  {...register("issued_by", {
                    maxLength: {
                      value: 100,
                      message: "Maximum value is 100 character.",
                    },
                  })}
                  className={inp}
                />
                {errors?.issued_by && (
                  <p className="text-red-500 text-xs pl-1">
                    {errors?.issued_by?.message}
                  </p>
                )}
              </div>
            </div>

            {/* Accounting information */}
            <div className="bg-white rounded-[14px] p-2 lg:p-4 shadow-sm space-y-2">
              <h6 className="text-xl">Accounting information</h6>
              <div className="space-y-1">
                <div className="leading-[1.45] font-medium text-sm sm:text-base text-gray-700">
                  Details
                </div>
                <textarea
                  rows={5}
                  {...register("accounting_info", {
                    maxLength: {
                      value: 150,
                      message: "Maximum value is 150 character.",
                    },
                  })}
                  className={inp}
                />
                {errors?.accounting_info && (
                  <p className="text-red-500 text-xs pl-1">
                    {errors?.accounting_info?.message}
                  </p>
                )}
              </div>
            </div>

            {/* Charges declaration */}
            <div className="bg-white rounded-[14px] p-2 lg:p-4 shadow-sm space-y-2">
              <h6 className="text-xl">Charges declaration</h6>

              {/* Currency & CHCG */}
              <div className="flex items-center gap-2 w-full">
                <div className="space-y-1">
                  <div className="leading-[1.45] font-medium text-sm sm:text-base text-gray-700">
                    Currency
                  </div>
                  <input
                    type="text"
                    disabled
                    value="USD"
                    className={inpDisabled}
                  />
                </div>
                <div className="space-y-1">
                  <div className="leading-[1.45] font-medium text-sm sm:text-base text-gray-700">
                    CHCG
                  </div>
                  <input
                    type="text"
                    {...register("chcg", {
                      maxLength: {
                        value: 2,
                        message: "Maximum value is 2 character.",
                      },
                    })}
                    className={inp}
                  />
                  {errors?.chcg && (
                    <p className="text-red-500 text-xs pl-1">
                      {errors?.chcg?.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Value for carriage + WT/VAL */}
              <div className="flex items-center gap-2 w-full">
                <div className="space-y-1 flex-1">
                  <div className="leading-[1.45] font-medium text-sm sm:text-base text-gray-700">
                    Value for carriage
                  </div>
                  <input
                    type="number"
                    {...register("value_for_carriage")}
                    className={inp}
                  />
                </div>
                <div className="space-y-1">
                  <div className="leading-[1.45] font-medium text-sm sm:text-base text-gray-700">
                    WT/VAL
                  </div>
                  <select
                    value={wtVal}
                    onChange={(e) => setWtVal(e.target.value)}
                    className={inp}
                  >
                    <option value="ppd">PPD</option>
                    <option value="coll">COLL</option>
                  </select>
                </div>
              </div>

              {/* Value for customs + Other */}
              <div className="flex items-center gap-2 w-full">
                <div className="space-y-1 flex-1">
                  <div className="leading-[1.45] font-medium text-sm sm:text-base text-gray-700">
                    Value for customs
                  </div>
                  <input
                    type="number"
                    {...register("value_for_customs")}
                    className={inp}
                  />
                </div>
                <div className="space-y-1">
                  <div className="leading-[1.45] font-medium text-sm sm:text-base text-gray-700">
                    Other
                  </div>
                  <select
                    value={otherDecl}
                    onChange={(e) => setOtherDecl(e.target.value)}
                    className={inp}
                  >
                    <option value="ppd">PPD</option>
                    <option value="coll">COLL</option>
                  </select>
                </div>
              </div>

              {/* Amount of insurance */}
              <div className="space-y-1">
                <div className="leading-[1.45] font-medium text-sm sm:text-base text-gray-700">
                  Amount of insurance
                </div>
                <input
                  type="number"
                  {...register("amount_of_insurance")}
                  className={inp}
                />
              </div>
            </div>
          </div>

          {/* ── HANDLING INFORMATION (full width) ── */}
          <div className="col-span-2 bg-white rounded-[14px] p-2 lg:p-4 shadow-sm space-y-2">
            <h6 className="text-xl">Handling information</h6>
            <div className="space-y-1">
              <div className="leading-[1.45] font-medium text-sm sm:text-base text-gray-700">
                Requirements
              </div>
              <textarea
                rows={4}
                {...register("requirements", {
                  maxLength: {
                    value: 200,
                    message: "Maximum value is 200 character.",
                  },
                })}
                className={inp}
              />
              {errors?.requirements && (
                <p className="text-red-500 text-xs pl-1">
                  {errors?.requirements?.message}
                </p>
              )}
            </div>
            <div className="flex items-center gap-2 w-full">
              <div className="space-y-1">
                <div className="leading-[1.45] font-medium text-sm sm:text-base text-gray-700">
                  SCI
                </div>
                <input type="text" {...register("sci")} className={inp} />
              </div>
            </div>
          </div>

          {/* ── RATE DESCRIPTION (full width) ── */}
          <div className="col-span-2 bg-white rounded-[14px] p-2 lg:p-4 shadow-sm space-y-2">
            <h6 className="text-xl">Rate description</h6>
            <div className="flex items-center gap-2">
              <button
                type="button"
                className="bg-gray-200 px-4 py-1.5 rounded-md border border-gray-400 shadow text-sm cursor-pointer hover:bg-gray-100"
                onClick={() => setIsAddRateOpen(true)}
              >
                Add
              </button>
            </div>
            <div className="overflow-x-auto pt-2">
              <table className="w-full min-w-[800px] text-sm sm:text-base text-left text-gray-700">
                <thead className="bg-gray-50 text-black capitalize font-semibold">
                  <tr>
                    <th className="px-3 sm:px-6 py-2 text-nowrap text-base">
                      Pieces
                    </th>
                    <th className="px-3 sm:px-6 text-nowrap text-base">
                      Gross w.
                    </th>
                    <th className="px-3 sm:px-6 text-nowrap text-base">K/L</th>
                    <th className="px-3 sm:px-6 text-nowrap text-base">
                      Rate Class
                    </th>
                    <th className="px-3 sm:px-6 text-nowrap text-base">
                      Item no.
                    </th>
                    <th className="px-3 sm:px-6 text-nowrap text-base">
                      Charg. w.
                    </th>
                    <th className="px-3 sm:px-6 text-nowrap text-base">
                      Rate/Charge
                    </th>
                    <th className="px-3 sm:px-6 text-nowrap text-base">
                      Total
                    </th>
                    <th className="px-3 sm:px-6 text-nowrap text-base">
                      Nature and quantity
                    </th>
                    <th className="px-3 sm:px-6 py-2 text-nowrap text-base">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {rateDescriptions.length > 0 ? (
                    rateDescriptions.map((row, i) => (
                      <tr
                        key={i}
                        className="border-b hover:bg-gray-50 transition-all"
                      >
                        <td className="px-3 sm:px-6 py-3 text-gray-800">
                          {row.pieces}
                        </td>
                        <td className="px-3 sm:px-6 py-3 text-gray-800">
                          {row.grossWeight}
                        </td>
                        <td className="px-3 sm:px-6 py-3 text-gray-800">
                          {row.kl}
                        </td>
                        <td className="px-3 sm:px-6 py-3 text-gray-800">
                          {row.rateClass}
                        </td>
                        <td className="px-3 sm:px-6 py-3 text-gray-800">
                          {row.itemNumber}
                        </td>
                        <td className="px-3 sm:px-6 py-3 text-gray-800">
                          {row.chargeableWeight}
                        </td>
                        <td className="px-3 sm:px-6 py-3 text-gray-800">
                          {row.rateCharge}
                        </td>
                        <td className="px-3 sm:px-6 py-3 text-gray-800">
                          {row.total}
                        </td>
                        <td className="px-3 sm:px-6 py-3 text-gray-800">
                          {row.natureQuantity}
                        </td>
                        <td className="px-3 sm:px-6 py-3">
                          <div className="flex items-center gap-2">
                            <button
                              type="button"
                              onClick={() => handleEditRate(row, i)}
                              className="text-blue-500 hover:text-blue-700 cursor-pointer"
                            >
                              <FaRegPenToSquare />
                            </button>
                            <button
                              type="button"
                              onClick={() => handleDeleteRate(i)}
                              className="text-red-500 hover:text-red-700 cursor-pointer"
                            >
                              <FaRegTrashCan />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        className="px-3 pt-4 text-center text-gray-400"
                        colSpan={10}
                      >
                        no rate description added
                      </td>
                    </tr>
                  )}
                  {/* Total label row */}
                  <tr>
                    <td
                      className="px-3 sm:px-6 py-2 font-bold text-gray-900"
                      colSpan={10}
                    >
                      Total:
                    </td>
                  </tr>
                  {/* Totals row */}
                  <tr className="border-t bg-gray-50">
                    <td className="px-3 sm:px-6 py-3 text-gray-800 font-semibold">
                      {totalPieces}
                    </td>
                    <td className="px-3 sm:px-6 py-3 text-gray-800 font-semibold">
                      {totalGrossWeight}
                    </td>
                    <td className="px-3 sm:px-6 py-3" />
                    <td className="px-3 sm:px-6 py-3" />
                    <td className="px-3 sm:px-6 py-3" />
                    <td className="px-3 sm:px-6 py-3 text-gray-800 font-semibold">
                      {totalChargeableWeight}
                    </td>
                    <td className="px-3 sm:px-6 py-3" />
                    <td className="px-3 sm:px-6 py-3 text-gray-800 font-semibold">
                      {rateDescTotal}
                    </td>
                    <td className="px-3 sm:px-6 py-3" />
                    <td className="px-3 sm:px-6 py-3" />
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* ── BOTTOM LEFT ── */}
          <div className="space-y-2 max-md:col-span-2">
            {/* Other charges */}
            <div className="bg-white rounded-[14px] p-2 lg:p-4 shadow-sm space-y-2">
              <h6 className="text-xl">Other charges</h6>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  className="bg-gray-200 px-4 py-1.5 rounded-md border border-gray-400 shadow text-sm cursor-pointer hover:bg-gray-100"
                  onClick={() => setIsAddChargeOpen(true)}
                >
                  Add
                </button>
              </div>
              <div className="overflow-x-auto pt-2">
                <table className="w-full text-sm sm:text-base text-left text-gray-700">
                  <thead className="bg-gray-50 text-black capitalize font-semibold">
                    <tr>
                      <th className="px-3 sm:px-6 py-2 text-nowrap text-base">
                        Description
                      </th>
                      <th className="px-3 sm:px-6 text-nowrap text-base">
                        Amount
                      </th>
                      <th className="px-3 sm:px-6 text-nowrap text-base">
                        Entitlement
                      </th>
                      <th className="px-3 sm:px-6 py-2 text-nowrap text-base">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {otherCharges.length > 0 ? (
                      otherCharges.map((charge, i) => (
                        <tr
                          key={i}
                          className="border-b hover:bg-gray-50 transition-all"
                        >
                          <td className="px-3 sm:px-6 py-3 text-gray-800">
                            {charge.description}
                          </td>
                          <td className="px-3 sm:px-6 py-3 text-gray-800">
                            {charge.amount}
                          </td>
                          <td className="px-3 sm:px-6 py-3 text-gray-800">
                            {charge.entitlement}
                          </td>
                          <td className="px-3 sm:px-6 py-3">
                            <div className="flex items-center gap-2">
                              <button
                                type="button"
                                onClick={() => handleEditCharge(charge, i)}
                                className="text-blue-500 hover:text-blue-700 cursor-pointer"
                              >
                                <FaRegPenToSquare />
                              </button>
                              <button
                                type="button"
                                onClick={() => handleDeleteCharge(i)}
                                className="text-red-500 hover:text-red-700 cursor-pointer"
                              >
                                <FaRegTrashCan />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))
                    ) : (
                      <tr>
                        <td
                          className="px-3 pt-4 text-center text-gray-400"
                          colSpan={10}
                        >
                          no other charges added
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Charges summary */}
            <div className="bg-white rounded-[14px] p-2 lg:p-4 shadow-sm space-y-2">
              <h6 className="text-xl">Charges summary</h6>

              {/* Prepaid */}
              <div className="bg-gray-50 rounded-[14px] p-2 shadow-sm space-y-2">
                <h6 className="text-lg">Prepaid</h6>
                <div className="flex items-center gap-2 w-full">
                  <div className="space-y-1">
                    <div className="leading-[1.45] font-medium text-sm sm:text-base text-gray-700">
                      Weight charge
                    </div>
                    <input
                      type="text"
                      disabled
                      value={prepaidWeightCharge || ""}
                      className={inpDisabled}
                    />
                  </div>
                  <div className="space-y-1">
                    <div className="leading-[1.45] font-medium text-sm sm:text-base text-gray-700">
                      Valuation charge
                    </div>
                    <input
                      type="number"
                      value={prepaidValuation}
                      onChange={(e) => setPrepaidValuation(e.target.value)}
                      className={inp}
                    />
                  </div>
                  <div className="space-y-1">
                    <div className="leading-[1.45] font-medium text-sm sm:text-base text-gray-700">
                      Tax
                    </div>
                    <input
                      type="number"
                      value={prepaidTax}
                      onChange={(e) => setPrepaidTax(e.target.value)}
                      className={inp}
                    />
                  </div>
                </div>
                <div className="flex items-center gap-2 w-full">
                  <div className="space-y-1">
                    <div className="leading-[1.45] font-medium text-sm sm:text-base text-gray-700">
                      Other charges due agent
                    </div>
                    <input
                      type="text"
                      disabled
                      value={prepaidDueAgent || ""}
                      className={inpDisabled}
                    />
                  </div>
                  <div className="space-y-1">
                    <div className="leading-[1.45] font-medium text-sm sm:text-base text-gray-700">
                      Other charges due carrier
                    </div>
                    <input
                      type="text"
                      disabled
                      value={prepaidDueCarrier || ""}
                      className={inpDisabled}
                    />
                  </div>
                  <div className="space-y-1">
                    <div className="leading-[1.45] font-medium text-sm sm:text-base text-gray-700">
                      Total
                    </div>
                    <input
                      type="text"
                      disabled
                      value={prepaidTotal || ""}
                      className={inpDisabled}
                    />
                  </div>
                </div>
              </div>

              {/* Collect */}
              <div className="bg-gray-50 rounded-[14px] p-2 shadow-sm space-y-2">
                <h6 className="text-lg">Collect</h6>
                <div className="flex items-center gap-2 w-full">
                  <div className="space-y-1">
                    <div className="leading-[1.45] font-medium text-sm sm:text-base text-gray-700">
                      Weight charge
                    </div>
                    <input
                      type="text"
                      disabled
                      value={collectWeightCharge || ""}
                      className={inpDisabled}
                    />
                  </div>
                  <div className="space-y-1">
                    <div className="leading-[1.45] font-medium text-sm sm:text-base text-gray-700">
                      Valuation charge
                    </div>
                    <input
                      type="number"
                      value={collectValuation}
                      onChange={(e) => setCollectValuation(e.target.value)}
                      className={inp}
                    />
                  </div>
                  <div className="space-y-1">
                    <div className="leading-[1.45] font-medium text-sm sm:text-base text-gray-700">
                      Tax
                    </div>
                    <input
                      type="number"
                      value={collectTax}
                      onChange={(e) => setCollectTax(e.target.value)}
                      className={inp}
                    />
                  </div>
                </div>
                <div className="flex items-center gap-2 w-full">
                  <div className="space-y-1">
                    <div className="leading-[1.45] font-medium text-sm sm:text-base text-gray-700">
                      Other charges due agent
                    </div>
                    <input
                      type="text"
                      disabled
                      value={collectDueAgent || ""}
                      className={inpDisabled}
                    />
                  </div>
                  <div className="space-y-1">
                    <div className="leading-[1.45] font-medium text-sm sm:text-base text-gray-700">
                      Other charges due carrier
                    </div>
                    <input
                      type="text"
                      disabled
                      value={collectDueCarrier || ""}
                      className={inpDisabled}
                    />
                  </div>
                  <div className="space-y-1">
                    <div className="leading-[1.45] font-medium text-sm sm:text-base text-gray-700">
                      Total
                    </div>
                    <input
                      type="text"
                      disabled
                      value={collectTotal || ""}
                      className={inpDisabled}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* ── BOTTOM RIGHT ── */}
          <div className="space-y-2 max-md:col-span-2">
            {/* Collect charges */}
            <div className="bg-white rounded-[14px] p-2 lg:p-4 shadow-sm space-y-2">
              <h6 className="text-xl">Collect charges</h6>
              <div className="flex items-center gap-2">
                <div className="space-y-1">
                  <div className="leading-[1.45] font-medium text-sm sm:text-base text-gray-700">
                    Currency conv. rates
                  </div>
                  <input
                    type="number"
                    {...register("currency_conv_rates")}
                    className={inp}
                  />
                </div>
                <div className="space-y-1">
                  <div className="leading-[1.45] font-medium text-sm sm:text-base text-gray-700">
                    CC charges
                  </div>
                  <input
                    type="number"
                    {...register("cc_charges")}
                    className={inp}
                  />
                </div>
              </div>
              <div className="flex items-center gap-2">
                <div className="space-y-1">
                  <div className="leading-[1.45] font-medium text-sm sm:text-base text-gray-700">
                    Charges at destination
                  </div>
                  <input
                    type="number"
                    {...register("charges_at_destination")}
                    className={inp}
                  />
                </div>
                <div className="space-y-1">
                  <div className="leading-[1.45] font-medium text-sm sm:text-base text-gray-700">
                    Total collect charges
                  </div>
                  <input
                    type="number"
                    {...register("total_collect_charges")}
                    className={inp}
                  />
                </div>
              </div>
            </div>

            {/* Shipper's certification */}
            <div className="bg-white rounded-[14px] p-2 lg:p-4 shadow-sm space-y-2">
              <h6 className="text-xl">Shipper&apos;s certification</h6>
              <div className="space-y-2">
                <textarea
                  rows={2}
                  {...register("shipper_cert_text")}
                  className={inp}
                />
                <div className="space-y-1">
                  <div className="leading-[1.45] font-medium text-sm sm:text-base text-gray-700">
                    Signature
                  </div>
                  <input
                    type="text"
                    {...register("shipper_cert_signature", {
                      onChange: (e) => {
                        if (e.target.value.length > 80) {
                          e.target.value = e.target.value.slice(0, 80);
                        }
                      },
                    })}
                    className={inp}
                  />
                </div>
              </div>
            </div>

            {/* Carrier's execution */}
            <div className="bg-white rounded-[14px] p-2 lg:p-4 shadow-sm space-y-2">
              <h6 className="text-xl">Carrier&apos;s execution</h6>
              <div className="space-y-2">
                <textarea
                  rows={2}
                  {...register("carrier_exec_text")}
                  className={inp}
                />
                <div className="flex items-center gap-1">
                  <div className="space-y-1">
                    <div className="leading-[1.45] font-medium text-sm sm:text-base text-gray-700">
                      Date
                    </div>
                    <input
                      type="date"
                      {...register("carrier_exec_date")}
                      className={inp}
                    />
                  </div>
                  <div className="space-y-1 flex-1">
                    <div className="leading-[1.45] font-medium text-sm sm:text-base text-gray-700">
                      Place
                    </div>
                    <input
                      type="text"
                      {...register("carrier_exec_place", {
                        onChange: (e) => {
                          if (e.target.value.length > 30) {
                            e.target.value = e.target.value.slice(0, 30);
                          }
                        },
                      })}
                      className={inp}
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <div className="leading-[1.45] font-medium text-sm sm:text-base text-gray-700">
                    Signature
                  </div>
                  <input
                    type="text"
                    {...register("carrier_exec_signature", {
                      onChange: (e) => {
                        if (e.target.value.length > 30) {
                          e.target.value = e.target.value.slice(0, 30);
                        }
                      },
                    })}
                    className={inp}
                  />
                </div>
              </div>
            </div>

            {/* Save as Template */}
            <div className="bg-white rounded-[14px] p-2 lg:p-4 shadow-sm space-y-2">
              <label
                htmlFor="save_as_template"
                className="flex items-center gap-2"
              >
                <input
                  type="checkbox"
                  name="save_as_template"
                  {...register("is_template")}
                />
                Save as Template
              </label>
              {isTemplate && (
                <div className="space-y-1">
                  <div className="leading-[1.45] font-medium text-sm sm:text-base text-gray-700">
                    Template name
                  </div>
                  <input
                    type="text"
                    {...register("template_name")}
                    placeholder="Enter template name"
                    className={inp}
                  />
                </div>
              )}
            </div>
          </div>
        </div>

        {/* ── SUBMIT ROW ── */}
        <div className="flex max-md:flex-col items-center gap-5 my-7 pt-7">
          <div className="basis-1/2" />
          <div className="flex max-md:flex-col items-center gap-5">
            <Link href="/dashboard">
              <button
                type="button"
                className="text-lg font-medium text-blue-500 w-[300px] cursor-pointer border border-blue-500 rounded-2xl bg-[#C3DCEB] hover:bg-[#bad2e0] py-4 px-4"
              >
                Continue to dashboard
              </button>
            </Link>
            <button
              type="submit"
              disabled={isPending}
              className="text-lg font-medium text-black-300 w-[300px] cursor-pointer rounded-2xl bg-black-100 hover:bg-black-50 py-4 px-4 disabled:opacity-60"
            >
              {isPending ? "Submitting ..." : "Submit the Form"}
            </button>
          </div>
        </div>
      </form>

      {/* ── MODALS ── */}
      {isContactFinderOpen && (
        <ContactFinder
          contactFinder={isContactFinderOpen}
          onClose={() => setIsContactFinderOpen(null)}
          onSelect={handleContactSelect}
        />
      )}
      {isAirlineFinderOpen && (
        <AirlineFinderModal onClose={() => setIsAirlineFinderOpen(false)} />
      )}

      {isAddRateOpen && (
        <AddRateDescriptionModal
          onClose={() => {
            setIsAddRateOpen(false);
            setEditingRateIndex(null);
          }}
          onAdd={handleSaveRate}
          editData={
            editingRateIndex !== null
              ? rateDescriptions[editingRateIndex]
              : null
          }
        />
      )}

      {isAddChargeOpen && (
        <AddOtherChargeModal
          onClose={() => {
            setIsAddChargeOpen(false);
            setEditingChargeIndex(null);
          }}
          onAdd={handleSaveCharge}
          editData={
            editingChargeIndex !== null
              ? otherCharges[editingChargeIndex]
              : null
          }
          totalPieces={totalPieces}
          totalGrossWeight={totalGrossWeight}
          totalChargeableWeight={totalChargeableWeight}
          totalDueCarrier={prepaidDueCarrier + collectDueCarrier}
          totalDueAgent={prepaidDueAgent + collectDueAgent}
          prepaidWeightCharge={prepaidWeightCharge}
          collectWeightCharge={collectWeightCharge}
        />
      )}
    </section>
  );
};

export default Page;
