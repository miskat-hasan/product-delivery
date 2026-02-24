"use client";

import ContactFinder from "@/components/dashboard/ContactFinder";
import { FilePlusSvg } from "@/components/svg/Svg";
import { StoreAirWaybill } from "@/hooks/api/dashboardApi";
import useAuth from "@/hooks/useAuth";
import Link from "next/link";
import React, { useState } from "react";
import { useForm } from "react-hook-form";

const AirWaybillForm = () => {
  const form = useForm({});

  const { user } = useAuth();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = form;

  const [isContactFinderOpen, setIsContactFinderOpen] = useState(null);

  const [selectedContacts, setSelectedContacts] = useState({
    shipper: null,
    consignee: null,
    carriers_agent: null,
  });

  const [contactErrors, setContactErrors] = useState({
    shipper: false,
    consignee: false,
    carriers_agent: false,
  });

  const handleContactSelect = (contact) => {
    setSelectedContacts((prev) => ({
      ...prev,
      [isContactFinderOpen]: contact,
    }));
    setContactErrors((prev) => ({
      ...prev,
      [isContactFinderOpen]: false,
    }));
  };

  const buildPayload = (formData) => {
    return {
      issue_by: user?.id,

      shipper: {
        account_number: selectedContacts?.shipper?.account_number,
        name: selectedContacts?.shipper?.full_name,
        address:
          selectedContacts?.shipper?.city +
          ", " +
          selectedContacts?.shipper?.state +
          ", " +
          selectedContacts?.shipper?.country,
      },

      consignee: {
        account_number: selectedContacts?.consignee?.account_number,
        name: selectedContacts?.consignee?.full_name,
        address:
          selectedContacts?.consignee?.city +
          ", " +
          selectedContacts?.consignee?.state +
          ", " +
          selectedContacts?.consignee?.country,
      },

      agent: {
        account_number: selectedContacts?.carriers_agent?.account_number,
        name: selectedContacts?.carriers_agent?.full_name,
        address:
          selectedContacts?.carriers_agent?.city +
          ", " +
          selectedContacts?.carriers_agent?.state +
          ", " +
          selectedContacts?.carriers_agent?.country,
        iata_code: formData?.carriers_agent_iata_code,
      },

      accounting_info: formData?.accounting_info,

      flights_booking: {
        airport_of_departure: formData?.airport_of_departure,
        reference_number: formData?.reference_number,
        optional_shipping_1: formData?.optional_shipping_1,
        optional_shipping_2: formData?.optional_shipping_2,
        routing_and_destination_to_1: formData?.routing_and_destination_to_1,
        routing_and_destination_to_2: formData?.routing_and_destination_to_2,
        routing_and_destination_to_3: formData?.routing_and_destination_to_3,
        routing_and_destination_by_1: formData?.routing_and_destination_by_1,
        routing_and_destination_by_2: formData?.routing_and_destination_by_2,
        first_carrier: formData?.first_carrier,
        currency: formData?.currency,
        chgs_code: formData?.chgs_code,
        ppd_1: formData?.ppd_1,
        ppd_2: formData?.ppd_2,
        coll_1: formData?.coll_1,
        coll_2: formData?.coll_2,
        declared_value_for_carriage: formData?.declared_value_for_carriage,
        declared_value_for_customs: formData?.declared_value_for_customs,
        airport_of_destination: formData?.airport_of_destination,
        requested_flight: formData?.requested_flight,
        requested_date: formData?.requested_date,
        amount_of_insurance: formData?.amount_of_insurance,
      },

      handling_info: {
        description: formData?.handling_information_description,
        sci: formData?.handling_information_sci,
      },

      nature_quantity: {
        no_of_rcp_pieces: formData?.no_of_rcp_pieces,
        gross_weight: formData?.gross_weight,
        kg_lb: formData?.kg_lb,
        rate_class: formData?.rate_class,
        chargeable_weight: formData?.chargeable_weight,
        rage_charge: formData?.rage_charge,
        total: formData?.total,
        nature_and_quantity_of_goods: formData?.nature_and_quantity_of_goods,
      },

      charges_summary: {
        prepaid: {
          weight_charge: formData?.charges_summary_prepaid_weight_charge,
          valuation_charge: formData?.charges_summary_prepaid_valuation_charge,
          tax: formData?.charges_summary_prepaid_tax,
          total_other_charges_due_agent:
            formData?.charges_summary_prepaid_total_other_charges_due_agent,
          total_other_charges_due_carrier:
            formData?.charges_summary_prepaid_total_other_charges_due_carrier,
          total_prepaid: formData?.total_prepaid,
        },
        collect: {
          weight_charge: formData?.charges_summary_collect_weight_charge,
          valuation_charge: formData?.charges_summary_collect_valuation_charge,
          tax: formData?.charges_summary_collect_tax,
          total_other_charges_due_agent:
            formData?.charges_summary_collect_total_other_charges_due_agent,
          total_other_charges_due_carrier:
            formData?.charges_summary_collect_total_other_charges_due_carrier,
          total_collect: formData?.total_collect,
        },
      },

      other_charges: {
        currency_conversion_rates: formData?.currency_conversion_rates,
        cc_charges_in_dest_currency: formData?.cc_charges_in_dest_currency,
        charges_at_destination: formData?.charges_at_destination,
        total_collect_charges: formData?.total_collect_charges,
        description: formData?.other_charges_description,
      },
    };
  };

  const { mutate, isPending } = StoreAirWaybill();

  const onSubmit = (data) => {
    // Validate contact selections
    const newContactErrors = {
      shipper: !selectedContacts.shipper,
      consignee: !selectedContacts.consignee,
      carriers_agent: !selectedContacts.carriers_agent,
    };
    setContactErrors(newContactErrors);

    if (Object.values(newContactErrors).some(Boolean)) return;

    const payload = buildPayload(data);
    mutate(payload);
  };

  // Helper: shared input error ring style
  const errClass = (hasError) =>
    hasError ? "ring-1 ring-red-500" : "";

  return (
    <div className="w-full max-w-[1418px] mx-auto py-10">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="w-full">
          <h5 className="text-3xl flex justify-end mb-2">777-12345675</h5>
          <div className="border-2 relative">
            <div className="absolute size-[61px] -top-[62px] left-[121.84] border-l-2 border-r-2" />
            {/* separator */}
            <div className="w-full flex">
              {/* left side */}
              <div className="border-r-2 left-side flex flex-col">
                <div className="grid grid-cols-2">
                  <div className="p-2 flex flex-col">
                    <p className="text-black text-xl">
                      Shipper&rsquo;s Name and Address
                    </p>
                    <div
                      onClick={() => setIsContactFinderOpen("shipper")}
                      className={`flex items-center justify-center size-[44px] bg-[#F5F5F5] hover:bg-[#e6e2e2] transition-colors rounded-full mt-[10px] self-end cursor-pointer ${contactErrors.shipper ? "ring-2 ring-red-500" : ""}`}
                    >
                      <FilePlusSvg />
                    </div>
                    {contactErrors.shipper && (
                      <p className="text-red-500 text-xs mt-1">Shipper is required</p>
                    )}
                  </div>
                  <div className="text-black text-xl border-b-2 border-l-2 flex  flex-col px-2 justify-center pt-3 min-h-[94.502px]">
                    <p>Shipper&rsquo;s Account Number</p>
                    <input
                      type="text"
                      value={
                        selectedContacts.shipper
                          ? `${selectedContacts.shipper.account_number}`
                          : ""
                      }
                      readOnly
                      className={`bg-[#F5F5F5] text-black-500 text-xs w-full border border-black-100 px-2 py-2 min-h-[42px] ${errClass(contactErrors.shipper)}`}
                    />
                  </div>
                </div>
                <div className="px-[10px] py-[14px] border-b-2">
                  <textarea
                    value={
                      selectedContacts.shipper
                        ? `${selectedContacts.shipper.full_name}
${selectedContacts.shipper.city}, ${selectedContacts.shipper.state}, ${selectedContacts.shipper.country}`
                        : ""
                    }
                    readOnly
                    className={`bg-[#F5F5F5] text-black-500 text-xs w-full border border-black-100 px-2 py-3 min-h-[120px] ${errClass(contactErrors.shipper)}`}
                    placeholder="Shipper's Name And Address |"
                  ></textarea>
                </div>
              </div>
              {/* right side */}
              <div className="flex flex-col right-side">
                <div className="px-2 py-3">
                  <p className="text-xl mb-[30px]">Not Negotiable</p>
                  <h3 className="text-[27.5px] font-bold">Air Waybill</h3>
                  <p className="text-xl">
                    Issued by <strong>{user?.full_name}</strong>
                  </p>
                </div>
                <div className="border-y-2 px-2 py-6 text-xl mt-auto">
                  Copies 1, 2 and 3 of this Air Waybill are originals and have
                  the same validity.
                </div>
              </div>
            </div>
            {/* separator */}
            <div className="w-full flex">
              {/* left */}
              <div className="left-side border-r-2">
                <div className="grid grid-cols-2">
                  <div className="p-2 flex flex-col">
                    <p className="text-black text-xl">
                      Consignee&rsquo;s Name and Address
                    </p>
                    <div
                      onClick={() => setIsContactFinderOpen("consignee")}
                      className={`flex items-center justify-center size-[44px] bg-[#F5F5F5] hover:bg-[#e6e2e2] transition-colors rounded-full mt-[10px] self-end cursor-pointer ${contactErrors.consignee ? "ring-2 ring-red-500" : ""}`}
                    >
                      <FilePlusSvg />
                    </div>
                    {contactErrors.consignee && (
                      <p className="text-red-500 text-xs mt-1">Consignee is required</p>
                    )}
                  </div>
                  <div className="text-black text-xl border-b-2 border-l-2 flex flex-col px-2 justify-center pt-3 min-h-[94.502px] bg-[#DFDFDF]">
                    Consignee&rsquo;s Account Number
                    <input
                      type="text"
                      value={
                        selectedContacts.consignee
                          ? `${selectedContacts.consignee.account_number}`
                          : ""
                      }
                      readOnly
                      className={`bg-[#F5F5F5] text-black-500 text-xs w-full border border-black-100 px-2 py-2 min-h-[42px] ${errClass(contactErrors.consignee)}`}
                    />
                  </div>
                </div>
                {/* text area */}
                <div className="px-[10px] py-[14px] border-b-2">
                  <textarea
                    value={
                      selectedContacts.consignee
                        ? `${selectedContacts.consignee.full_name}
${selectedContacts.consignee.city}, ${selectedContacts.consignee.state}, ${selectedContacts.consignee.country}`
                        : ""
                    }
                    readOnly
                    className={`bg-[#F5F5F5] text-black-500 text-xs w-full border border-black-100 px-2 py-3 min-h-[120px] ${errClass(contactErrors.consignee)}`}
                  ></textarea>
                </div>
              </div>
              {/* right */}
              <div className="right-side px-2 py-3 text-[15.75px] border-b-2">
                It is agreed that the goods described herein are accepted in
                apparent good order and condition (except as noted) for carriage
                SUBJECT TO THE CONDITIONS OF CONTRACT ON THE REVERSE HEREOF. ALL
                GOODS MAY BE CARRIED BY ANY OTHER MEANS INCLUDING ROAD OR ANY
                OTHER CARRIER UNLESS SPECIFIC CONTRARY INSTRUCTIONS ARE GIVEN
                HEREON BY THE SHIPPER, AND SHIPPER AGREES THAT THE SHIPMENT MAY
                BE CARRIED VIA INTERMEDIATE STOPPING PLACES WHICH THE CARRIER
                DEEMS APPROPRIATE. THE SHIPPER&rsquo;S ATTENTION IS DRAWN TO THE
                NOTICE CONCERNING CARRIER&rsquo;S LIMITATION OF LIABILITY.
                Shipper may increase such limitation of liability by declaring a
                higher value for carriage and paying a supplemental charge if
                required.
              </div>
            </div>
            {/* separator */}
            <div className="w-full flex">
              {/* left */}
              <div className="left-side border-r-2">
                <div className="px-[10px] pb-[10px] border-b-2">
                  <div className="my-[8px] flex items-center justify-between">
                    <p className="text-[19.688px]">
                      Issuing Carrier&rsquo;s Agent Name and City
                    </p>
                    <div
                      onClick={() => setIsContactFinderOpen("carriers_agent")}
                      className={`flex items-center justify-center size-[30px] bg-[#F5F5F5] hover:bg-[#e6e2e2] transition-colors rounded-full mt-[10px] self-end cursor-pointer ${contactErrors.carriers_agent ? "ring-2 ring-red-500" : ""}`}
                    >
                      <FilePlusSvg className={"size-4"} />
                    </div>
                  </div>
                  {contactErrors.carriers_agent && (
                    <p className="text-red-500 text-xs mb-1">Carrier&apos;s Agent is required</p>
                  )}
                  <textarea
                    value={
                      selectedContacts.carriers_agent
                        ? `${selectedContacts.carriers_agent.full_name}
${selectedContacts.carriers_agent.city}, ${selectedContacts.carriers_agent.state}, ${selectedContacts.carriers_agent.country}`
                        : ""
                    }
                    readOnly
                    className={`bg-[#F5F5F5] text-black-500 text-xs w-full border border-black-100 px-2 py-3 min-h-[94px] ${errClass(contactErrors.carriers_agent)}`}
                  ></textarea>
                </div>
                <div className="grid grid-cols-2 border-b-2">
                  <div className="text-black text-xl flex flex-col px-2.5 pb-2.5 pt-1.5 pt-3 min-h-[94.502px]">
                    Agent&rsquo;s IATA Code
                    <input
                      type="text"
                      {...register("carriers_agent_iata_code", { required: true })}
                      className={`bg-[#F5F5F5] text-black-500 text-xs w-full border border-black-100 px-2 py-2 min-h-[42px] ${errClass(errors.carriers_agent_iata_code)}`}
                    />
                    {errors.carriers_agent_iata_code && (
                      <p className="text-red-500 text-xs mt-1">Required</p>
                    )}
                  </div>
                  <div className="text-black text-xl border-l-2 flex flex-col px-2.5 pb-2.5 pt-1.5 pt-3 min-h-[94.502px]">
                    Account No.
                    <input
                      type="text"
                      value={
                        selectedContacts.carriers_agent
                          ? `${selectedContacts.carriers_agent.account_number}`
                          : ""
                      }
                      readOnly
                      className={`bg-[#F5F5F5] text-black-500 text-xs w-full border border-black-100 px-2 py-2 min-h-[42px] ${errClass(contactErrors.carriers_agent)}`}
                    />
                  </div>
                </div>
              </div>
              {/* right */}
              <div className="right-side text-xl px-2 py-3 border-b-2">
                Accounting Information
                <textarea
                  {...register("accounting_info", { required: true })}
                  className={`bg-[#F5F5F5] text-black-500 text-xs w-full border border-black-100 px-2 py-3 mt-3 min-h-[192px] ${errClass(errors.accounting_info)}`}
                ></textarea>
                {errors.accounting_info && (
                  <p className="text-red-500 text-xs mt-1">Required</p>
                )}
              </div>
            </div>
            {/* separator */}
            <div className="w-full flex">
              {/* left */}
              <div className="left-side border-r-2 border-b-2 px-[10px]">
                <div className="pb-2">
                  Airport of Departure (Addr. of First Carrier) and Requested
                  Routing
                </div>
                <input
                  {...register("airport_of_departure", { required: true })}
                  type="text"
                  className={`bg-[#F5F5F5] text-black-500 text-xs w-full border border-black-100 px-2 py-2 min-h-[42px] ${errClass(errors.airport_of_departure)}`}
                />
                {errors.airport_of_departure && (
                  <p className="text-red-500 text-xs mt-1">Required</p>
                )}
              </div>
              {/* right */}
              <div className="right-side border-b-2">
                <div className="flex relative">
                  <p className="absolute text-[15.75px] top-1.5 left-2 text-nowrap flex flex-col">
                    Reference Number
                    <input
                      {...register("reference_number", { required: true })}
                      type="text"
                      className={`bg-[#F5F5F5] text-black-500 text-xs max-w-[80%] border border-black-100 px-2 py-2 min-h-[32px] ${errClass(errors.reference_number)}`}
                    />
                    {errors.reference_number && (
                      <span className="text-red-500 text-xs">Required</span>
                    )}
                  </p>

                  <div className="mx-auto relative">
                    <p className="left-1/2 absolute -translate-x-1/2 text-[15.75px]">
                      Optional Shipping Information
                    </p>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="462"
                      height="57"
                      viewBox="0 0 462 57"
                      fill="none"
                    >
                      <path
                        d="M0.693359 0.701172L55.8079 55.4338H405.392L460.998 0.701172"
                        stroke="black"
                        stroke-width="1.9688"
                      />
                    </svg>
                  </div>
                </div>

                <div className="flex">
                  <div className="w-[260.7px]" />
                  <div className="h-[39.77px] flex-1 border-l-2 border-r-2 p-1">
                    <input
                      {...register("optional_shipping_1", { required: true })}
                      type="text"
                      className={`bg-[#F5F5F5] text-black-500 text-xs w-full border border-black-100 px-2 py-2 min-h-[32px] ${errClass(errors.optional_shipping_1)}`}
                    />
                  </div>
                  <div className="w-[237.11px] px-1 pt-1">
                    <input
                      {...register("optional_shipping_2", { required: true })}
                      type="text"
                      className={`bg-[#F5F5F5] text-black-500 text-xs w-full border border-black-100 px-2 py-2 min-h-[32px] ${errClass(errors.optional_shipping_2)}`}
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* separator */}
            <div className="w-full flex">
              {/* left */}
              <div className="left-side flex border-b-2 h-[96.471px]">
                <div className="w-[74.814px] text-xl p-2.5 h-full border-r-2">
                  To
                  <input
                    type="text"
                    {...register("routing_and_destination_to_1", { required: true, maxLength: 10 })}
                    className={`bg-[#F5F5F5] text-[#222222] text-xs w-full border border-black-100 px-2 py-2 min-h-[42px] ${errClass(errors.routing_and_destination_to_1)}`}
                  />
                </div>
                <div>
                  <div className="flex pr-2">
                    <p className="ml-0.5 mt-1">By First Carrier</p>
                    <div className="relative flex">
                      <p className="absolute text-nowrap text-[11.813px] top-0.5 left-1/2 -translate-x-1/2">
                        Routing and Destination
                      </p>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="211"
                        height="28"
                        viewBox="0 0 211 28"
                        fill="none"
                      >
                        <path
                          d="M0.711914 0.683594L25.6997 26.8686H184.194L209.404 0.683594"
                          stroke="black"
                          stroke-width="1.9688"
                        />
                      </svg>
                    </div>
                  </div>
                  <div className="pt-3 px-2">
                    <input
                      type="text"
                      {...register("first_carrier", { required: true })}
                      className={`bg-[#F5F5F5] text-black-500 text-xs w-full border border-black-100 px-2 py-3 min-h-[42px] ${errClass(errors.first_carrier)}`}
                    />
                  </div>
                </div>
                <div className="w-[70.877px] text-xl p-2.5 h-full border-l-2">
                  To
                  <input
                    type="text"
                    {...register("routing_and_destination_to_2", { required: true })}
                    className={`bg-[#F5F5F5] text-[#222222] text-xs w-full border border-black-100 px-2 py-2 min-h-[42px] ${errClass(errors.routing_and_destination_to_2)}`}
                  />
                </div>
                <div className="w-[61.1px] text-xl p-2.5 h-full border-l-2">
                  by
                  <input
                    type="text"
                    {...register("routing_and_destination_by_1", { required: true })}
                    className={`bg-[#F5F5F5] text-[#222222] text-xs w-full border border-black-100 px-2 py-2 min-h-[42px] ${errClass(errors.routing_and_destination_by_1)}`}
                  />
                </div>
                <div className="w-[70.877px] text-xl p-2.5 h-full border-l-2">
                  To
                  <input
                    type="text"
                    {...register("routing_and_destination_to_3", { required: true })}
                    className={`bg-[#F5F5F5] text-[#222222] text-xs w-full border border-black-100 px-2 py-2 min-h-[42px] ${errClass(errors.routing_and_destination_to_3)}`}
                  />
                </div>
                <div className="w-[61.1px] text-xl p-2.5 h-full border-l-2">
                  by
                  <input
                    type="text"
                    {...register("routing_and_destination_by_2", { required: true })}
                    className={`bg-[#F5F5F5] text-[#222222] text-xs w-full border border-black-100 px-2 py-2 min-h-[42px] ${errClass(errors.routing_and_destination_by_2)}`}
                  />
                </div>
              </div>
              <div className="right-side border-b-2 shrink-0 flex">
                <div className="text-[13.782px] px-1 py-3.5 border-x-2 w-[70.877px]">
                  Currency
                  <input
                    type="text"
                    {...register("currency", { required: true })}
                    className={`bg-[#F5F5F5] text-[#222222] text-xs w-full border border-black-100 px-2 py-2 min-h-[42px] ${errClass(errors.currency)}`}
                  />
                </div>
                <div className="text-[11.813px] py-3 px-[1px] border-r-2 w-[37px]">
                  CHGS <br />
                  Code
                  <input
                    type="text"
                    {...register("chgs_code", { required: true })}
                    className={`bg-[#F5F5F5] text-[#222222] text-xs w-full border border-black-100 px-1 py-1 min-h-[32px] ${errClass(errors.chgs_code)}`}
                  />
                </div>
                <div className="w-[77.5px] flex flex-col h-full">
                  <p className="border-b-2 border-r-2 text-[13.782px] text-center">
                    WT/VAL
                  </p>
                  <div className="flex flex-1">
                    <p className="text-[11.813px] text-center pt-1 border-r-2 flex-1 px-0.5">
                      PPD
                      <input
                        type="text"
                        {...register("ppd_1", { required: true })}
                        className={`bg-[#F5F5F5] text-[#222222] text-xs w-full border border-black-100 px-1 py-1 min-h-[32px] ${errClass(errors.ppd_1)}`}
                      />
                    </p>
                    <p className="text-[11.813px] text-center pt-1 border-r-2 flex-1 px-0.5">
                      COLL
                      <input
                        type="text"
                        {...register("coll_1", { required: true })}
                        className={`bg-[#F5F5F5] text-[#222222] text-xs w-full border border-black-100 px-1 py-1 min-h-[32px] ${errClass(errors.coll_1)}`}
                      />
                    </p>
                  </div>
                </div>
                <div className="w-[77.5px] flex flex-col h-full">
                  <p className="border-b-2 text-[13.782px] text-center">
                    WT/VAL
                  </p>
                  <div className="flex flex-1">
                    <p className="text-[11.813px] text-center pt-1 border-r-2 flex-1 px-0.5">
                      PPD
                      <input
                        type="text"
                        {...register("ppd_2", { required: true })}
                        className={`bg-[#F5F5F5] text-[#222222] text-xs w-full border border-black-100 px-1 py-1 min-h-[32px] ${errClass(errors.ppd_2)}`}
                      />
                    </p>
                    <p className="text-[11.813px] text-center pt-1 flex-1 px-0.5">
                      COLL
                      <input
                        type="text"
                        {...register("coll_2", { required: true })}
                        className={`bg-[#F5F5F5] text-[#222222] text-xs w-full border border-black-100 px-1 py-1 min-h-[32px] ${errClass(errors.coll_2)}`}
                      />
                    </p>
                  </div>
                </div>
                <div className="w-[239px] text-[13.782px] text-center border-l-2 px-1">
                  Declared Value for Carriage
                  <input
                    type="text"
                    {...register("declared_value_for_carriage", { required: true })}
                    className={`bg-[#F5F5F5] text-[#222222] text-xs w-full border border-black-100 px-2 py-2 min-h-[42px] ${errClass(errors.declared_value_for_carriage)}`}
                  />
                </div>
                <div className="w-[239px] text-[13.782px] text-center border-l-2 px-1">
                  Declared Value for Customs
                  <input
                    type="text"
                    {...register("declared_value_for_customs", { required: true })}
                    className={`bg-[#F5F5F5] text-[#222222] text-xs w-full border border-black-100 px-2 py-2 min-h-[42px] ${errClass(errors.declared_value_for_customs)}`}
                  />
                </div>
              </div>
            </div>
            {/* separator */}
            <div className="w-full flex">
              {/* left */}
              <div className="left-side border-r-2 grid grid-cols-2">
                <div className="border-2 text-xl text-center p-2">
                  Airport of Destination
                  <input
                    type="text"
                    {...register("airport_of_destination", { required: true })}
                    className={`bg-[#F5F5F5] text-black-500 text-xs w-full border border-black-100 px-2 py-3 min-h-[42px] mt-2.5 ${errClass(errors.airport_of_destination)}`}
                  />
                  {errors.airport_of_destination && (
                    <p className="text-red-500 text-xs mt-1">Required</p>
                  )}
                </div>
                <div className="border-l-2">
                  <div className="relative flex">
                    <p className="absolute top-2 left-1/2 -translate-x-1/2 text-nowrap">
                      Requested Flight/Date
                    </p>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="248"
                      height="55"
                      viewBox="0 0 248 55"
                      fill="none"
                      className="mx-auto"
                    >
                      <path
                        d="M0.859375 0.482422L30.279 53.2462H216.883L246.565 0.482422"
                        stroke="black"
                        stroke-width="1.9688"
                      />
                    </svg>
                  </div>

                  <div className="grid grid-cols-2">
                    <div className="border-r-2 h-[47.785px] px-2 py-1">
                      <input
                        type="text"
                        {...register("requested_flight", { required: true })}
                        className={`bg-[#F5F5F5] text-black-500 text-xs w-full border border-black-100 px-2 py-1 min-h-[31px] ${errClass(errors.requested_flight)}`}
                      />
                    </div>
                    <div className="px-2 py-1">
                      <input
                        type="text"
                        {...register("requested_date", { required: true })}
                        className={`bg-[#F5F5F5] text-black-500 text-xs w-full border border-black-100 px-2 py-1 min-h-[31px] ${errClass(errors.requested_date)}`}
                      />
                    </div>
                  </div>
                </div>
              </div>
              {/* right */}
              <div className="right-side flex">
                <div className="text-xl pt-2 px-1.5 border-r-2 flex flex-col">
                  Amount of Insurance
                  <input
                    type="text"
                    {...register("amount_of_insurance", { required: true })}
                    className={`bg-[#F5F5F5] text-black-500 text-xs border border-black-100 px-2 py-1 min-h-[31px] ${errClass(errors.amount_of_insurance)}`}
                  />
                  {errors.amount_of_insurance && (
                    <p className="text-red-500 text-xs mt-1">Required</p>
                  )}
                </div>
                <div className="flex-1 px-2.5 pt-[18px] pb-[22px] text-[13.782px]">
                  INSURANCE – If carrier offers insurance, and such insurance is
                  requested in accordance with the conditions thereof, indicate
                  amount to be insured in figures in box marked &quot;Amount of
                  Insurance&quot;.
                </div>
              </div>
            </div>
            {/* separator */}
            <div className="w-full h-[170.104px] border-y-2 flex justify-between">
              <div className="flex-1 mt-3 mx-2.5">
                <p className="text-xl">Handling Information</p>
                <textarea
                  {...register("handling_information_description", { required: true })}
                  className={`bg-[#F5F5F5] text-black-500 w-full text-xs w-full border border-black-100 px-2 py-3 min-h-[116px] ${errClass(errors.handling_information_description)}`}
                ></textarea>
                {errors.handling_information_description && (
                  <p className="text-red-500 text-xs mt-1">Required</p>
                )}
              </div>
              <div className="h-[75.602px] w-[226.806px] border-l-2 border-t-2 ml-auto text-center self-end-safe text-xl p-1">
                SCI
                <input
                  type="text"
                  {...register("handling_information_sci", { required: true })}
                  className={`bg-[#F5F5F5] text-black-500 text-xs w-full border border-black-100 px-2 py-1 min-h-[31px] ${errClass(errors.handling_information_sci)}`}
                />
                {errors.handling_information_sci && (
                  <p className="text-red-500 text-xs mt-1">Required</p>
                )}
              </div>
            </div>
            {/* separator */}
            <div className="h-[553.626px] border-b-2 flex">
              <div className="w-[75.602px] border-r-2 flex justify-between flex-col">
                <div>
                  <div className="px-2 py-1 border-b-2 h-[68px] leading-none">
                    No. of RCP Pieces
                  </div>
                  <div className="p-1">
                    <input
                      type="text"
                      {...register("no_of_rcp_pieces", { required: true })}
                      className={`bg-[#F5F5F5] text-black-500 text-xs w-full border border-black-100 px-2 py-3 min-h-[31px] ${errClass(errors.no_of_rcp_pieces)}`}
                    />
                  </div>
                </div>
                <div className="w-full h-[68px] border-t-2" />
              </div>
              <div className="w-[132.303px] border-r-2 flex justify-between flex-col">
                <div>
                  <div className="px-2 py-1 border-b-2 h-[68px] text-center">
                    Gross <br /> Weight
                  </div>
                  <div className="p-1">
                    <input
                      type="text"
                      {...register("gross_weight", { required: true })}
                      className={`bg-[#F5F5F5] text-black-500 text-xs w-full border border-black-100 px-2 py-3 min-h-[31px] ${errClass(errors.gross_weight)}`}
                    />
                  </div>
                </div>
                <div className="w-full h-[68px] border-t-2" />
              </div>
              <div className="w-[50.279px] border-r-2 flex justify- flex-col">
                <div className="py-1 border-b-2 h-[68px] text-center">
                  kg <br />
                  lb
                </div>
                <div className="px-0.5 pt-1">
                  <input
                    type="text"
                    {...register("kg_lb", { required: true })}
                    className={`bg-[#F5F5F5] text-black-500 text-xs w-full border border-black-100 px-0.5 py-3 min-h-[31px] ${errClass(errors.kg_lb)}`}
                  />
                </div>
              </div>
              <div className="w-[22.838px] bg-[#D9D9D9] border-r-2" />
              <div className="flex">
                <div className="w-[18.9px]" />
                <div className="w-[130.334px] border-r-2 flex flex-col">
                  <div>
                    <div className="h-[68px] flex flex-col">
                      <p className="text-xl">Rate Class</p>
                      <p className="text-[11.813px] border-y-2 flex-1 border-l-2 text-center">
                        Commodity <br />
                      </p>
                    </div>
                    <div className="p-1 border-l-2">
                      <input
                        type="text"
                        {...register("rate_class", { required: true })}
                        className={`bg-[#F5F5F5] text-black-500 text-xs w-full border border-black-100 px-2 py-3 min-h-[31px] ${errClass(errors.rate_class)}`}
                      />
                    </div>
                  </div>
                  <div className="flex-1 border-l-2" />
                </div>
              </div>
              <div className="w-[18.9px] bg-[#D9D9D9] border-r-2" />
              <div className="w-[132.303px] border-r-2">
                <div>
                  <div className="text-center h-[68px] border-b-2 text-xl flex items-center justify-center">
                    Chargeable
                    <br /> Weight
                  </div>
                  <div className="p-1">
                    <input
                      type="text"
                      {...register("chargeable_weight", { required: true })}
                      className={`bg-[#F5F5F5] text-black-500 text-xs w-full border border-black-100 px-2 py-3 min-h-[31px] ${errClass(errors.chargeable_weight)}`}
                    />
                  </div>
                </div>
              </div>
              <div className="w-[18.9px] bg-[#D9D9D9] border-r-2" />
              <div className="w-[151.204px] border-r-2">
                <div className="h-[68px] border-b-2 flex flex-col py-2 px-5 relative">
                  <p>Rate</p>
                  <div className="w-[77.976px] bg-black h-[1px] -rotate-45" />
                  <p className="self-end">Charge</p>
                </div>
                <div className="p-1">
                  <input
                    type="text"
                    {...register("rage_charge", { required: true })}
                    className={`bg-[#F5F5F5] text-black-500 text-xs w-full border border-black-100 px-2 py-3 min-h-[31px] ${errClass(errors.rage_charge)}`}
                  />
                </div>
              </div>
              <div className="w-[18.9px] bg-[#D9D9D9] border-r-2" />
              <div className="w-[226.806px] border-r-2 flex flex-col justify-between">
                <div>
                  <div className="text-center h-[68px] text-xl border-b-2 flex items-center justify-center">
                    Total
                  </div>
                  <div className="p-1">
                    <input
                      type="text"
                      {...register("total", { required: true })}
                      className={`bg-[#F5F5F5] text-black-500 text-xs w-full border border-black-100 px-2 py-3 min-h-[31px] ${errClass(errors.total)}`}
                    />
                  </div>
                </div>
                <div className="w-full h-[68px] border-t-2" />
              </div>
              <div className="w-[18.9px] bg-[#D9D9D9] border-r-2" />
              <div className="w-[430px] flex flex-col justify-between">
                <div>
                  <div className="text-center h-[68px] text-xl border-b-2 flex items-center justify-center">
                    Nature and Quantity of Goods (incl. Dimensions or Volume)
                  </div>
                  <div className="p-1">
                    <input
                      type="text"
                      {...register("nature_and_quantity_of_goods", { required: true })}
                      className={`bg-[#F5F5F5] text-black-500 text-xs w-full border border-black-100 px-2 py-3 min-h-[31px] ${errClass(errors.nature_and_quantity_of_goods)}`}
                    />
                  </div>
                </div>
                <div className="w-full h-[68px] border-t-2" />
              </div>
            </div>
            {/* separator */}
            <div className="w-full flex">
              {/* mini left */}
              <div className="mini-left-side border-r-2">
                {/* prepaid */}
                <div className="border-b-2">
                  <div className="px-[18.9px] flex">
                    <div className="relative">
                      <p className="absolute top-[2px] left-1/2 -translate-x-1/2">
                        Prepaid
                      </p>
                      <svg xmlns="http://www.w3.org/2000/svg" width="134" height="29" viewBox="0 0 134 29" fill="none">
                        <path d="M0.845703 0.507812L16.687 27.0866H117.166L133.149 0.507812" stroke="black" stroke-width="1.9688" />
                      </svg>
                    </div>
                    <div className="relative">
                      <p className="absolute top-[2px] left-1/2 -translate-x-1/2">
                        Weight Charge
                      </p>
                      <svg xmlns="http://www.w3.org/2000/svg" width="229" height="29" viewBox="0 0 229 29" fill="none">
                        <path d="M0.803711 0.583984L19.6273 27.1628H207.982L227.609 0.583984" stroke="black" stroke-width="1.9688" />
                      </svg>
                    </div>
                    <div className="relative">
                      <p className="absolute top-[2px] left-1/2 -translate-x-1/2">
                        Collect
                      </p>
                      <svg xmlns="http://www.w3.org/2000/svg" width="134" height="29" viewBox="0 0 134 29" fill="none">
                        <path d="M0.845703 0.507812L16.687 27.0866H117.166L133.149 0.507812" stroke="black" stroke-width="1.9688" />
                      </svg>
                    </div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="border-r-2 h-[40.557px] p-1">
                      <input
                        type="text"
                        {...register("charges_summary_prepaid_weight_charge", { required: true })}
                        className={`bg-[#F5F5F5] text-black-500 text-xs w-full border border-black-100 px-2 py-1 min-h-[31px] ${errClass(errors.charges_summary_prepaid_weight_charge)}`}
                      />
                    </div>
                    <div className="p-1">
                      <input
                        type="text"
                        {...register("charges_summary_collect_weight_charge", { required: true })}
                        className={`bg-[#F5F5F5] text-black-500 text-xs w-full border border-black-100 px-2 py-1 min-h-[31px] ${errClass(errors.charges_summary_collect_weight_charge)}`}
                      />
                    </div>
                  </div>
                </div>
                {/* Valuation Charge */}
                <div className="border-b-2">
                  <div className="px-[18.9px] flex">
                    <div className="relative mx-auto">
                      <p className="absolute top-[2px] left-1/2 -translate-x-1/2">
                        Valuation Charge
                      </p>
                      <svg xmlns="http://www.w3.org/2000/svg" width="267" height="29" viewBox="0 0 267 29" fill="none">
                        <path d="M0.758789 0.642578L22.7196 27.2214H242.467L265.365 0.642578" stroke="black" stroke-width="1.9688" />
                      </svg>
                    </div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="border-r-2 h-[49.023px] p-1">
                      <input
                        type="text"
                        {...register("charges_summary_prepaid_valuation_charge", { required: true })}
                        className={`bg-[#F5F5F5] text-black-500 text-xs w-full border border-black-100 px-2 py-1 min-h-[31px] ${errClass(errors.charges_summary_prepaid_valuation_charge)}`}
                      />
                    </div>
                    <div className="p-1">
                      <input
                        type="text"
                        {...register("charges_summary_collect_valuation_charge", { required: true })}
                        className={`bg-[#F5F5F5] text-black-500 text-xs w-full border border-black-100 px-2 py-1 min-h-[31px] ${errClass(errors.charges_summary_collect_valuation_charge)}`}
                      />
                    </div>
                  </div>
                </div>
                {/* Tax */}
                <div className="border-b-2">
                  <div className="px-[18.9px] flex">
                    <div className="relative mx-auto">
                      <p className="absolute top-[2px] left-1/2 -translate-x-1/2">
                        Tax
                      </p>
                      <svg xmlns="http://www.w3.org/2000/svg" width="153" height="28" viewBox="0 0 153 28" fill="none">
                        <path d="M0.890625 0.435547L13.4397 27.0143H139.01L152.094 0.435547" stroke="black" stroke-width="1.9688" />
                      </svg>
                    </div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="border-r-2 h-[49.023px] p-1">
                      <input
                        type="text"
                        {...register("charges_summary_prepaid_tax", { required: true })}
                        className={`bg-[#F5F5F5] text-black-500 text-xs w-full border border-black-100 px-2 py-1 min-h-[31px] ${errClass(errors.charges_summary_prepaid_tax)}`}
                      />
                    </div>
                    <div className="p-1">
                      <input
                        type="text"
                        {...register("charges_summary_collect_tax", { required: true })}
                        className={`bg-[#F5F5F5] text-black-500 text-xs w-full border border-black-100 px-2 py-1 min-h-[31px] ${errClass(errors.charges_summary_collect_tax)}`}
                      />
                    </div>
                  </div>
                </div>
              </div>
              {/* right */}
              <div className="py-[2px] px-1.5 border-b-2 w-full flex flex-col">
                Other Charges
                <textarea
                  {...register("other_charges_description", { required: true })}
                  className={`bg-[#F5F5F5] text-black-500 text-xs w-full border border-black-100 my-3 px-2 py-3 flex-1 ${errClass(errors.other_charges_description)}`}
                ></textarea>
                {errors.other_charges_description && (
                  <p className="text-red-500 text-xs mb-1">Required</p>
                )}
              </div>
            </div>
            {/* separator */}
            <div className="w-full flex">
              {/* mini left */}
              <div className="mini-left-side shrink-0 border-r-2">
                {/* Total Other Charges Due Agent */}
                <div className="border-b-2">
                  <div className="px-[18.9px] flex">
                    <div className="relative mx-auto">
                      <p className="absolute top-[2px] left-1/2 -translate-x-1/2 text-nowrap">
                        Total Other Charges Due Agent
                      </p>
                      <svg xmlns="http://www.w3.org/2000/svg" width="417" height="29" viewBox="0 0 417 29" fill="none">
                        <path d="M0.600586 0.791016L35.1105 27.3698H380.428L416.411 0.791016" stroke="black" stroke-width="1.9688" />
                      </svg>
                    </div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="border-r-2 h-[49.023px] p-1">
                      <input
                        type="text"
                        {...register("charges_summary_prepaid_total_other_charges_due_agent", { required: true })}
                        className={`bg-[#F5F5F5] text-black-500 text-xs w-full border border-black-100 px-2 py-1 min-h-[31px] ${errClass(errors.charges_summary_prepaid_total_other_charges_due_agent)}`}
                      />
                    </div>
                    <div className="p-1">
                      <input
                        type="text"
                        {...register("charges_summary_collect_total_other_charges_due_agent", { required: true })}
                        className={`bg-[#F5F5F5] text-black-500 text-xs w-full border border-black-100 px-2 py-1 min-h-[31px] ${errClass(errors.charges_summary_collect_total_other_charges_due_agent)}`}
                      />
                    </div>
                  </div>
                </div>
                {/* Total Other Charges Due Carrier */}
                <div className="border-b-2">
                  <div className="px-[18.9px] flex">
                    <div className="relative mx-auto">
                      <p className="absolute top-[2px] left-1/2 -translate-x-1/2 text-nowrap">
                        Total Other Charges Due Carrier
                      </p>
                      <svg xmlns="http://www.w3.org/2000/svg" width="417" height="29" viewBox="0 0 417 29" fill="none">
                        <path d="M0.600586 0.791016L35.1105 27.3698H380.428L416.411 0.791016" stroke="black" stroke-width="1.9688" />
                      </svg>
                    </div>
                  </div>
                  <div className="grid grid-cols-2">
                    <div className="border-r-2 h-[49.023px] p-1">
                      <input
                        type="text"
                        {...register("charges_summary_prepaid_total_other_charges_due_carrier", { required: true })}
                        className={`bg-[#F5F5F5] text-black-500 text-xs w-full border border-black-100 px-2 py-1 min-h-[31px] ${errClass(errors.charges_summary_prepaid_total_other_charges_due_carrier)}`}
                      />
                    </div>
                    <div className="p-1">
                      <input
                        type="text"
                        {...register("charges_summary_collect_total_other_charges_due_carrier", { required: true })}
                        className={`bg-[#F5F5F5] text-black-500 text-xs w-full border border-black-100 px-2 py-1 min-h-[31px] ${errClass(errors.charges_summary_collect_total_other_charges_due_carrier)}`}
                      />
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2 divide-x-2 border-b-2">
                  <div className="h-[75.602px] bg-[#D9D9D9]" />
                  <div className="h-[75.602px] bg-[#D9D9D9]" />
                </div>
              </div>
              {/* right side */}
              <div className="w-full border-b-2 flex flex-col justify-between">
                <p className="p-[3px]">
                  Shipper certifies that the particulars on the face hereof are
                  correct and that{" "}
                  <span className="font-bold">
                    insofar as any part of the consignment contains dangerous
                    goods, such part is properly described by name and is in
                    proper condition for carriage by air according to the
                    applicable Dangerous Goods Regulations.
                  </span>{" "}
                </p>
                <div className="max-w-[513.463px] w-full mx-auto border-t-2 border-dashed text-center pb-2 pt-[18px]">
                  <p>Signature of Shipper or his Agent</p>
                </div>
              </div>
            </div>
            {/* separator */}
            <div className="w-full flex">
              {/* mini left */}
              <div className="mini-left-side shrink-0 border-r-2">
                {/* Total prepaid & total collect */}
                <div className="grid grid-cols-2 divide-x-2 border-b-2 h-[75.602px]">
                  <div className="flex flex-col">
                    <div className="relative w-full">
                      <p className="absolute top-[2px] left-1/2 -translate-x-1/2 text-nowrap">
                        Total Prepaid
                      </p>
                      <svg xmlns="http://www.w3.org/2000/svg" width="229" height="29" viewBox="0 0 229 29" fill="none" className="mx-auto">
                        <path d="M0.803711 0.583984L19.6273 27.1628H207.982L227.609 0.583984" stroke="black" stroke-width="1.9688" />
                      </svg>
                    </div>
                    <div className="p-1">
                      <input
                        type="text"
                        {...register("total_prepaid", { required: true })}
                        className={`bg-[#F5F5F5] text-black-500 text-xs w-full border border-black-100 px-2 py-1 min-h-[31px] ${errClass(errors.total_prepaid)}`}
                      />
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <div className="relative w-full">
                      <p className="absolute top-[2px] left-1/2 -translate-x-1/2 text-nowrap">
                        Total Collect
                      </p>
                      <svg xmlns="http://www.w3.org/2000/svg" width="229" height="29" viewBox="0 0 229 29" fill="none" className="mx-auto">
                        <path d="M0.803711 0.583984L19.6273 27.1628H207.982L227.609 0.583984" stroke="black" stroke-width="1.9688" />
                      </svg>
                    </div>
                    <div className="p-1">
                      <input
                        type="text"
                        {...register("total_collect", { required: true })}
                        className={`bg-[#F5F5F5] text-black-500 text-xs w-full border border-black-100 px-2 py-1 min-h-[31px] ${errClass(errors.total_collect)}`}
                      />
                    </div>
                  </div>
                </div>
                {/* Currency */}
                <div className="grid grid-cols-2 divide-x-2 h-[75.602px] bg-[#D9D9D9]">
                  <div className="relative w-full">
                    <p className="absolute top-[2px] left-1/2 -translate-x-1/2 text-nowrap">
                      Currency Conversion Rates
                    </p>
                    <svg xmlns="http://www.w3.org/2000/svg" width="268" height="29" viewBox="0 0 268 29" fill="none">
                      <path d="M0.757812 0.644531L22.8004 27.2233H243.365L266.349 0.644531" stroke="black" stroke-width="1.9688" />
                    </svg>
                    <div className="px-2 pt-1">
                      <input
                        type="text"
                        {...register("currency_conversion_rates", { required: true })}
                        className={`bg-[#F5F5F5] text-black-500 text-xs w-full border border-black-100 px-2 py-1 min-h-[31px] ${errClass(errors.currency_conversion_rates)}`}
                      />
                    </div>
                  </div>
                  <div className="relative w-full">
                    <p className="absolute top-[2px] left-1/2 -translate-x-1/2 text-nowrap">
                      CC Charges in Dest. Currency
                    </p>
                    <svg xmlns="http://www.w3.org/2000/svg" width="267" height="29" viewBox="0 0 267 29" fill="none">
                      <path d="M0.757812 0.644531L22.784 27.2233H243.186L266.152 0.644531" stroke="black" stroke-width="1.9688" />
                    </svg>
                    <div className="px-2 pt-1">
                      <input
                        type="text"
                        {...register("cc_charges_in_dest_currency", { required: true })}
                        className={`bg-[#F5F5F5] text-black-500 text-xs w-full border border-black-100 px-2 py-1 min-h-[31px] ${errClass(errors.cc_charges_in_dest_currency)}`}
                      />
                    </div>
                  </div>
                </div>
              </div>
              {/* right side */}
              <div className="w-full flex flex-col justify-end">
                <div className="border-t-2 border-dashed pt-[18px] pb-3 mx-1 flex items-center justify-between">
                  <p>Executed on (date)</p>
                  <p>at (place)</p>
                  <p>Signature of Issuing Carrier or its Agent</p>
                </div>
              </div>
            </div>
          </div>
          {/* separator */}
          <div className="w-full border-l-2 flex">
            {/* mini left side */}
            <div className="mini-left-side shrink-0 border-r-2">
              {/* Destination */}
              <div className="grid grid-cols-2 divide-x-2 border-b-2 h-[75.602px] bg-[#D9D9D9]">
                <div className="w-full flex items-center justify-center text-center">
                  For Carrier&rsquo;s Use only at Destination
                </div>
                <div className="relative w-full">
                  <p className="absolute top-[2px] left-1/2 -translate-x-1/2 text-nowrap">
                    Charges at Destination
                  </p>
                  <svg xmlns="http://www.w3.org/2000/svg" width="229" height="29" viewBox="0 0 229 29" fill="none" className="mx-auto">
                    <path d="M0.803711 0.583984L19.6273 27.1628H207.982L227.609 0.583984" stroke="black" stroke-width="1.9688" />
                  </svg>
                  <div className="px-2 pt-1">
                    <input
                      type="text"
                      {...register("charges_at_destination", { required: true })}
                      className={`bg-[#F5F5F5] text-black-500 text-xs w-full border border-black-100 px-2 py-1 min-h-[31px] ${errClass(errors.charges_at_destination)}`}
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* right side */}
            <div className="w-[263.622px] bg-[#D9D9D9] border-b-2 border-r-2">
              <div className="relative w-full">
                <p className="absolute top-[2px] left-1/2 -translate-x-1/2 text-nowrap">
                  Total Collect Charges
                </p>
                <svg xmlns="http://www.w3.org/2000/svg" width="229" height="29" viewBox="0 0 229 29" fill="none" className="mx-auto">
                  <path d="M0.803711 0.583984L19.6273 27.1628H207.982L227.609 0.583984" stroke="black" stroke-width="1.9688" />
                </svg>
                <div className="px-2 pt-1">
                  <input
                    type="text"
                    {...register("total_collect_charges", { required: true })}
                    className={`bg-[#F5F5F5] text-black-500 text-xs w-full border border-black-100 px-2 py-1 min-h-[31px] ${errClass(errors.total_collect_charges)}`}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-5 my-7">
          <div className="text-3xl font-bold text-[#231F20] text-center basis-1/2">
            ORIGINAL 3 (FOR SHIPPER)
          </div>
          <div className="flex items-center gap-5">
            <Link href={"/dashboard"}>
              <button className="text-lg font-medium text-blue-500 w-[300px] cursor-pointer border border-blue-500 rounded-2xl bg-[#C3DCEB] hover:bg-[#bad2e0] py-4 px-4 ">
                Continue to dashboard
              </button>
            </Link>
            <button
              type="submit"
              className="text-lg font-medium text-black-300 w-[300px] cursor-pointer rounded-2xl bg-black-100 hover:bg-black-50 py-4 px-4 "
              disabled={isPending}
            >
              {isPending ? "Submitting..." : "Submit the Form"}
            </button>
          </div>
        </div>
      </form>
      {isContactFinderOpen && (
        <ContactFinder
          contactFinder={isContactFinderOpen}
          onClose={() => setIsContactFinderOpen(null)}
          onSelect={handleContactSelect}
        />
      )}
    </div>
  );
};

export default AirWaybillForm;