"use client";

import { useForm } from "react-hook-form";
import React, { useState } from "react";
import { MdPermContactCalendar } from "react-icons/md";
import { FaRegPenToSquare, FaRegTrashCan } from "react-icons/fa6";
import Link from "next/link";
import ContactFinder from "@/components/dashboard/ContactFinder";
import AirlineFinderModal from "@/components/dashboard/AirlineFinderModal";
import AddOtherChargeModal from "@/components/dashboard/AddOtherChargeModal";
import AddRateDescriptionModal from "@/components/dashboard/AddRateDescriptionModal";
import { StoreAirWaybill } from "@/hooks/api/dashboardApi";

const Page = () => {
  const { register, handleSubmit } = useForm({});

  // ── Contact finder ──────────────────────────────────────────────
  const [isContactFinderOpen, setIsContactFinderOpen] = useState(null);
  const [isAirlineFinderOpen, setIsAirlineFinderOpen] = useState(false);
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

  // ── Other charges ───────────────────────────────────────────────
  const [isAddChargeOpen, setIsAddChargeOpen] = useState(false);
  const [otherCharges, setOtherCharges] = useState([
    { description: "lorem", amount: "10", entitlement: "DUE AGENT" },
  ]);

  const handleAddCharge = (charge) =>
    setOtherCharges((prev) => [...prev, charge]);
  const handleDeleteCharge = (index) =>
    setOtherCharges((prev) => prev.filter((_, i) => i !== index));

  // ── Rate descriptions ───────────────────────────────────────────
  const [isAddRateOpen, setIsAddRateOpen] = useState(false);
  const [rateDescriptions, setRateDescriptions] = useState([
    {
      pieces: "23",
      grossWeight: "10",
      kl: "K",
      rateClass: "",
      itemNumber: "23",
      chargeableWeight: "50",
      rateCharge: "20",
      total: "220",
      natureQuantity: "1410",
    },
    {
      pieces: "31",
      grossWeight: "20",
      kl: "K",
      rateClass: "",
      itemNumber: "5",
      chargeableWeight: "10",
      rateCharge: "20",
      total: "220",
      natureQuantity: "D.M.S (cm) 54*40*31 : 31 PCS",
    },
  ]);

  const handleAddRate = (rate) =>
    setRateDescriptions((prev) => [...prev, rate]);
  const handleDeleteRate = (index) =>
    setRateDescriptions((prev) => prev.filter((_, i) => i !== index));

  // ── Charges declaration selects ─────────────────────────────────
  const [wtVal, setWtVal] = useState("ppd");
  const [otherDecl, setOtherDecl] = useState("ppd");

  // ── Charges summary — user-editable fields ──────────────────────
  const [prepaidValuation, setPrepaidValuation] = useState("");
  const [prepaidTax, setPrepaidTax] = useState("");
  const [collectValuation, setCollectValuation] = useState("");
  const [collectTax, setCollectTax] = useState("");

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

  // ── Form submit ─────────────────────────────────────────────────
  const onSubmit = (data) => {
    const payload = {
      issued_by: data.issued_by || "",
      is_template: Number(data.is_template),
      serial_id: data.serial_id || "",
      consignment_details: {
        airline_prefix: data.airline_prefix || "",
        serial_number: data.serial_number || "",
        origin: data.origin || "",
      },
      shipper: {
        account_number: selectedContacts.shipper?.account_number || "",
        name_address: selectedContacts.shipper
          ? `${selectedContacts.shipper.full_name}, ${selectedContacts.shipper.city}, ${selectedContacts.shipper.state}, ${selectedContacts.shipper.country}`
          : "",
      },
      consignee: {
        account_number: selectedContacts.consignee?.account_number || "",
        name_address: selectedContacts.consignee
          ? `${selectedContacts.consignee.full_name}, ${selectedContacts.consignee.city}, ${selectedContacts.consignee.state}, ${selectedContacts.consignee.country}`
          : "",
      },
      agent: {
        account_number: selectedContacts.carriers_agent?.account_number || "",
        name_address: selectedContacts.carriers_agent
          ? `${selectedContacts.carriers_agent.full_name}, ${selectedContacts.carriers_agent.city}, ${selectedContacts.carriers_agent.state}, ${selectedContacts.carriers_agent.country}`
          : "",
        iata_code: data.iata_code || "",
      },
      accounting_info: data.accounting_info || "",
      flights_booking: {
        departure: data.departure || "",
        route: {
          to_first_carrier: data.to_first_carrier || "",
          by_first_carrier: data.by_first_carrier || "",
          to_second_carrier: data.to_second_carrier || "",
          by_second_carrier: data.by_second_carrier || "",
          to_third_carrier: data.to_third_carrier || "",
          by_third_carrier: data.by_third_carrier || "",
        },
        destination: data.destination || "",
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

    // console.log("Payload:", payload);
    mutate(payload);
  };

  // ── Shared input class ──────────────────────────────────────────
  const inp =
    "w-full rounded-xl px-3 py-2.5 text-sm sm:text-base font-normal leading-[1.45] placeholder:text-gray-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-300 border border-gray-400 hover:border-gray-700 transition-all duration-150";

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
                <input type="text" {...register("departure")} className={inp} />
              </div>

              {/* Route */}
              <div className="bg-gray-50 rounded-[14px] p-2 shadow-sm space-y-2">
                <h6 className="text-lg">Route</h6>
                <div className="flex items-center gap-2 w-full">
                  <div className="space-y-1">
                    <div className="leading-[1.45] font-medium text-sm sm:text-base text-gray-700">
                      To
                    </div>
                    <input
                      type="text"
                      {...register("to_first_carrier")}
                      className={inp}
                    />
                  </div>
                  <div className="space-y-1 flex-1">
                    <div className="leading-[1.45] font-medium text-sm sm:text-base text-gray-700">
                      By first carrier
                    </div>
                    <input
                      type="text"
                      {...register("by_first_carrier")}
                      className={inp}
                    />
                  </div>
                </div>
                <div className="flex items-center gap-2 w-full">
                  <div className="space-y-1">
                    <div className="leading-[1.45] font-medium text-sm sm:text-base text-gray-700">
                      To
                    </div>
                    <input
                      type="text"
                      {...register("to_second_carrier")}
                      className={inp}
                    />
                  </div>
                  <div className="space-y-1">
                    <div className="leading-[1.45] font-medium text-sm sm:text-base text-gray-700">
                      By
                    </div>
                    <input
                      type="text"
                      {...register("by_second_carrier")}
                      className={inp}
                    />
                  </div>
                  <div className="space-y-1">
                    <div className="leading-[1.45] font-medium text-sm sm:text-base text-gray-700">
                      To
                    </div>
                    <input
                      type="text"
                      {...register("to_third_carrier")}
                      className={inp}
                    />
                  </div>
                  <div className="space-y-1">
                    <div className="leading-[1.45] font-medium text-sm sm:text-base text-gray-700">
                      By
                    </div>
                    <input
                      type="text"
                      {...register("by_third_carrier")}
                      className={inp}
                    />
                  </div>
                </div>
              </div>

              <div className="space-y-1">
                <div className="leading-[1.45] font-medium text-sm sm:text-base text-gray-700">
                  Destination
                </div>
                <input
                  type="text"
                  {...register("destination")}
                  className={inp}
                />
              </div>

              {/* Flight/Date */}
              <div className="bg-gray-50 rounded-[14px] p-2 shadow-sm space-y-2">
                <h6 className="text-lg">Flight/Date</h6>
                <div className="flex items-center gap-2 w-full">
                  <div className="space-y-1 flex-1">
                    <input
                      type="text"
                      {...register("flight")}
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
                  type="text"
                  {...register("airline_prefix")}
                  className={inp}
                />
              </div>
              <div className="space-y-1">
                <div className="leading-[1.45] font-medium text-sm sm:text-base text-gray-700">
                  Serial number
                </div>
                <input
                  type="text"
                  {...register("serial_number")}
                  className={inp}
                />
              </div>
              <div className="space-y-1">
                <div className="leading-[1.45] font-medium text-sm sm:text-base text-gray-700">
                  Origin
                </div>
                <input type="text" {...register("origin")} className={inp} />
              </div>
            </div>

            {/* Issuer */}
            <div className="bg-white rounded-[14px] p-2 lg:p-4 shadow-sm space-y-2">
              <h6 className="text-xl">Issuer</h6>
              <div className="space-y-1">
                <div className="leading-[1.45] font-medium text-sm sm:text-base text-gray-700">
                  Issued by
                </div>
                <textarea rows={5} {...register("issued_by")} className={inp} />
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
                  {...register("accounting_info")}
                  className={inp}
                />
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
                      },
                    })}
                    className={inp}
                  />
                </div>
              </div>

              {/* Value for carriage + WT/VAL */}
              <div className="flex items-center gap-2 w-full">
                <div className="space-y-1 flex-1">
                  <div className="leading-[1.45] font-medium text-sm sm:text-base text-gray-700">
                    Value for carriage
                  </div>
                  <input
                    type="text"
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
                    type="text"
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
                  type="text"
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
                {...register("requirements")}
                className={inp}
              />
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
                  {rateDescriptions.map((row, i) => (
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
                  ))}
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
                      type="text"
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
                      type="text"
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
                      type="text"
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
                      type="text"
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

            {/* Collect charges */}
            <div className="bg-white rounded-[14px] p-2 lg:p-4 shadow-sm space-y-2">
              <h6 className="text-xl">Collect charges</h6>
              <div className="flex items-center gap-2">
                <div className="space-y-1">
                  <div className="leading-[1.45] font-medium text-sm sm:text-base text-gray-700">
                    Currency conv. rates
                  </div>
                  <input
                    type="text"
                    {...register("currency_conv_rates")}
                    className={inp}
                  />
                </div>
                <div className="space-y-1">
                  <div className="leading-[1.45] font-medium text-sm sm:text-base text-gray-700">
                    CC charges
                  </div>
                  <input
                    type="text"
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
                    type="text"
                    {...register("charges_at_destination")}
                    className={inp}
                  />
                </div>
                <div className="space-y-1">
                  <div className="leading-[1.45] font-medium text-sm sm:text-base text-gray-700">
                    Total collect charges
                  </div>
                  <input
                    type="text"
                    {...register("total_collect_charges")}
                    className={inp}
                  />
                </div>
              </div>
            </div>
            <div className="bg-white max-md:hidden rounded-[14px] p-2 lg:p-4 shadow-sm space-y-2">
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
            </div>
          </div>

          {/* ── BOTTOM RIGHT ── */}
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
                    {otherCharges.map((charge, i) => (
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
                    ))}
                  </tbody>
                </table>
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
                    {...register("shipper_cert_signature")}
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
                      {...register("carrier_exec_place")}
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
                    {...register("carrier_exec_signature")}
                    className={inp}
                  />
                </div>
              </div>
            </div>
            <div className="bg-white md:hidden rounded-[14px] p-2 lg:p-4 shadow-sm space-y-2">
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
        <AirlineFinderModal
          onClose={() => setIsAirlineFinderOpen(false)}
          onSelect={(data) => console.log(data)}
        />
      )}
      {isAddChargeOpen && (
        <AddOtherChargeModal
          onClose={() => setIsAddChargeOpen(false)}
          onAdd={handleAddCharge}
          totalPieces={totalPieces}
          totalGrossWeight={totalGrossWeight}
          totalChargeableWeight={totalChargeableWeight}
          totalDueCarrier={prepaidDueCarrier + collectDueCarrier}
          totalDueAgent={prepaidDueAgent + collectDueAgent}
          prepaidWeightCharge={prepaidWeightCharge}
          collectWeightCharge={collectWeightCharge}
        />
      )}
      {isAddRateOpen && (
        <AddRateDescriptionModal
          onClose={() => setIsAddRateOpen(false)}
          onAdd={handleAddRate}
        />
      )}
    </section>
  );
};

export default Page;
