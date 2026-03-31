"use client";

import { useForm } from "react-hook-form";
import React, { useState } from "react";
import { MdPermContactCalendar } from "react-icons/md";
import { IoMdSettings } from "react-icons/io";
import Link from "next/link";
import ContactFinder from "@/components/dashboard/ContactFinder";
import AirlineFinderModal from "@/components/dashboard/AirlineFinderModal";
import AddOtherChargeModal from "@/components/dashboard/AddOtherChargeModal";
import AddRateDescriptionModal from "@/components/dashboard/AddRateDescriptionModal";

const Page = () => {
  const form = useForm({});

  // const { user } = useAuth();
  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = form;

  const [isContactFinderOpen, setIsContactFinderOpen] = useState(null);

  const [isAirlineFinderOpen, setIsAirlineFinderOpen] = useState(false);

  const [isAddChargeOpen, setIsAddChargeOpen] = useState(false);
  const [otherCharges, setOtherCharges] = useState([
    { description: "lorem", amount: "10", entitlement: "DUE AGENT" },
  ]);

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
  ]);

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

  const handleAirlineFinder = (data) => {
    console.log(data);
  };

  const handleAddCharge = (charge) => {
    setOtherCharges((prev) => [...prev, charge]);
  };

  const handleAddRate = (rate) => {
    setRateDescriptions((prev) => [...prev, rate]);
  };

  return (
    <section>
      <h3 className="text-2xl mb-2">Create New Shipment</h3>
      <div className="grid md:grid-cols-2 gap-2 lg:gap-4">
        {/* left side */}
        <div className="space-y-2">
          {/* shipper */}
          <div className="bg-white rounded-[14px] p-2 lg:p-4 shadow-sm space-y-2">
            <div className="flex items-center justify-between gap-2">
              <h6 className="text-xl">Shipper</h6>
              <button
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
                  selectedContacts.shipper
                    ? `${selectedContacts.shipper.account_number}`
                    : ""
                }
                className="w-full rounded-xl px-3 py-2.5 text-sm sm:text-base font-normal leading-[1.45] placeholder:text-gray-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-300 border border-gray-400 hover:border-gray-700 transition-all duration-150"
              />
            </div>
            <div className="space-y-1">
              <div className="leading-[1.45] font-medium text-sm sm:text-base text-gray-700">
                Name and address
              </div>
              <textarea
                rows={4}
                value={
                  selectedContacts.shipper
                    ? `${selectedContacts.shipper.full_name}
 ${selectedContacts.shipper.city}, ${selectedContacts.shipper.state}, ${selectedContacts.shipper.country}`
                    : ""
                }
                className="w-full rounded-xl px-3 py-2.5 text-sm sm:text-base font-normal leading-[1.45] placeholder:text-gray-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-300 border border-gray-400 hover:border-gray-700 transition-all duration-150"
              ></textarea>
            </div>
          </div>
          {/* Consignee */}
          <div className="bg-white rounded-[14px] p-2 lg:p-4 shadow-sm space-y-2">
            <div className="flex items-center justify-between gap-2">
              <h6 className="text-xl">Consignee</h6>
              <button
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
                  selectedContacts.consignee
                    ? `${selectedContacts.consignee.account_number}`
                    : ""
                }
                className="w-full rounded-xl px-3 py-2.5 text-sm sm:text-base font-normal leading-[1.45] placeholder:text-gray-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-300 border border-gray-400 hover:border-gray-700 transition-all duration-150"
              />
            </div>
            <div className="space-y-1">
              <div className="leading-[1.45] font-medium text-sm sm:text-base text-gray-700">
                Name and address
              </div>
              <textarea
                rows={4}
                value={
                  selectedContacts.consignee
                    ? `${selectedContacts.consignee.full_name}
 ${selectedContacts.consignee.city}, ${selectedContacts.consignee.state}, ${selectedContacts.consignee.country}`
                    : ""
                }
                className="w-full rounded-xl px-3 py-2.5 text-sm sm:text-base font-normal leading-[1.45] placeholder:text-gray-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-300 border border-gray-400 hover:border-gray-700 transition-all duration-150"
              ></textarea>
            </div>
          </div>

          {/* Issuing carrier's agent */}
          <div className="bg-white rounded-[14px] p-2 lg:p-4 shadow-sm space-y-2">
            <div className="flex items-center justify-between gap-2">
              <h6 className="text-xl">Issuing carrier&apos;s agent</h6>
              <button
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
                  selectedContacts.carriers_agent
                    ? `${selectedContacts.carriers_agent.full_name}
 ${selectedContacts.carriers_agent.city}, ${selectedContacts.carriers_agent.state}, ${selectedContacts.carriers_agent.country}`
                    : ""
                }
                className="w-full rounded-xl px-3 py-2.5 text-sm sm:text-base font-normal leading-[1.45] placeholder:text-gray-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-300 border border-gray-400 hover:border-gray-700 transition-all duration-150"
              ></textarea>
            </div>
            <div className="space-y-1">
              <div className="leading-[1.45] font-medium text-sm sm:text-base text-gray-700">
                IATA code
              </div>
              <input
                type="text"
                className="w-full rounded-xl px-3 py-2.5 text-sm sm:text-base font-normal leading-[1.45] placeholder:text-gray-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-300 border border-gray-400 hover:border-gray-700 transition-all duration-150"
              />
            </div>
            <div className="space-y-1">
              <div className="leading-[1.45] font-medium text-sm sm:text-base text-gray-700">
                Account No.
              </div>
              <input
                type="text"
                value={
                  selectedContacts.carriers_agent
                    ? `${selectedContacts.carriers_agent.account_number}`
                    : ""
                }
                className="w-full rounded-xl px-3 py-2.5 text-sm sm:text-base font-normal leading-[1.45] placeholder:text-gray-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-300 border border-gray-400 hover:border-gray-700 transition-all duration-150"
              />
            </div>
          </div>

          {/* Routing and flights booking */}
          <div className="bg-white rounded-[14px] p-2 lg:p-4 shadow-sm space-y-2">
            <h6 className="text-xl">Routing and flights booking</h6>

            {/* departure */}
            <div className="space-y-1">
              <div className="leading-[1.45] font-medium text-sm sm:text-base text-gray-700">
                Departure
              </div>
              <input
                type="text"
                className="w-full rounded-xl px-3 py-2.5 text-sm sm:text-base font-normal leading-[1.45] placeholder:text-gray-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-300 border border-gray-400 hover:border-gray-700 transition-all duration-150"
              />
            </div>

            {/* route */}
            <div className="bg-gray-50 rounded-[14px] p-2 shadow-sm space-y-2">
              <h6 className="text-lg">Route</h6>
              <div className="flex items-center gap-2 w-full">
                <div className="space-y-1">
                  <div className="leading-[1.45] font-medium text-sm sm:text-base text-gray-700">
                    To
                  </div>
                  <input
                    type="text"
                    className="w-full rounded-xl px-3 py-2.5 text-sm sm:text-base font-normal leading-[1.45] placeholder:text-gray-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-300 border border-gray-400 hover:border-gray-700 transition-all duration-150"
                  />
                </div>
                <div className="space-y-1 flex-1">
                  <div className="leading-[1.45] font-medium text-sm sm:text-base text-gray-700">
                    By first carrier
                  </div>
                  <input
                    type="text"
                    className="w-full rounded-xl px-3 py-2.5 text-sm sm:text-base font-normal leading-[1.45] placeholder:text-gray-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-300 border border-gray-400 hover:border-gray-700 transition-all duration-150"
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
                    className="w-full rounded-xl px-3 py-2.5 text-sm sm:text-base font-normal leading-[1.45] placeholder:text-gray-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-300 border border-gray-400 hover:border-gray-700 transition-all duration-150"
                  />
                </div>
                <div className="space-y-1">
                  <div className="leading-[1.45] font-medium text-sm sm:text-base text-gray-700">
                    By
                  </div>
                  <input
                    type="text"
                    className="w-full rounded-xl px-3 py-2.5 text-sm sm:text-base font-normal leading-[1.45] placeholder:text-gray-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-300 border border-gray-400 hover:border-gray-700 transition-all duration-150"
                  />
                </div>
                <div className="space-y-1">
                  <div className="leading-[1.45] font-medium text-sm sm:text-base text-gray-700">
                    To
                  </div>
                  <input
                    type="text"
                    className="w-full rounded-xl px-3 py-2.5 text-sm sm:text-base font-normal leading-[1.45] placeholder:text-gray-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-300 border border-gray-400 hover:border-gray-700 transition-all duration-150"
                  />
                </div>
                <div className="space-y-1">
                  <div className="leading-[1.45] font-medium text-sm sm:text-base text-gray-700">
                    By
                  </div>
                  <input
                    type="text"
                    className="w-full rounded-xl px-3 py-2.5 text-sm sm:text-base font-normal leading-[1.45] placeholder:text-gray-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-300 border border-gray-400 hover:border-gray-700 transition-all duration-150"
                  />
                </div>
              </div>
            </div>

            {/* Destination */}
            <div className="space-y-1">
              <div className="leading-[1.45] font-medium text-sm sm:text-base text-gray-700">
                Destination
              </div>
              <input
                type="text"
                className="w-full rounded-xl px-3 py-2.5 text-sm sm:text-base font-normal leading-[1.45] placeholder:text-gray-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-300 border border-gray-400 hover:border-gray-700 transition-all duration-150"
              />
            </div>

            {/* Flight/Date */}
            <div className="bg-gray-50 rounded-[14px] p-2 shadow-sm space-y-2">
              <h6 className="text-lg">Flight/Date</h6>
              <div className="flex items-center gap-2 w-full">
                <div className="space-y-1">
                  <input
                    type="text"
                    className="w-full rounded-xl px-3 py-2.5 text-sm sm:text-base font-normal leading-[1.45] placeholder:text-gray-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-300 border border-gray-400 hover:border-gray-700 transition-all duration-150"
                  />
                </div>
                <div className="space-y-1">
                  <input
                    type="text"
                    className="w-full rounded-xl px-3 py-2.5 text-sm sm:text-base font-normal leading-[1.45] placeholder:text-gray-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-300 border border-gray-400 hover:border-gray-700 transition-all duration-150"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* right side */}
        <div className="space-y-2">
          {/* Consignment details */}
          <div className="bg-white rounded-[14px] p-2 lg:p-4 shadow-sm space-y-2">
            <h6 className="text-xl">Consignment details</h6>
            <div className="space-y-1">
              <div className="leading-[1.45] font-medium text-sm sm:text-base text-gray-700">
                Airline prefix
              </div>
              <input
                type="text"
                className="w-full rounded-xl px-3 py-2.5 text-sm sm:text-base font-normal leading-[1.45] placeholder:text-gray-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-300 border border-gray-400 hover:border-gray-700 transition-all duration-150"
              />
            </div>
            <div className="space-y-1">
              <div className="leading-[1.45] font-medium text-sm sm:text-base text-gray-700">
                Serial number
              </div>
              <input
                type="text"
                className="w-full rounded-xl px-3 py-2.5 text-sm sm:text-base font-normal leading-[1.45] placeholder:text-gray-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-300 border border-gray-400 hover:border-gray-700 transition-all duration-150"
              />
            </div>
            <div className="space-y-1">
              <div className="leading-[1.45] font-medium text-sm sm:text-base text-gray-700">
                Origin
              </div>
              <input
                type="text"
                className="w-full rounded-xl px-3 py-2.5 text-sm sm:text-base font-normal leading-[1.45] placeholder:text-gray-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-300 border border-gray-400 hover:border-gray-700 transition-all duration-150"
              />
            </div>
            <div className="flex gap-2 mt-4 max-md:col-span-2">
              <input
                id="bidding-checkbox"
                type="checkbox"
                {...form.register("listing")}
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <label
                htmlFor="bidding-checkbox"
                className="text-sm text-gray-600"
              >
                assign on save
              </label>
            </div>
          </div>

          {/* Issuer*/}
          <div className="bg-white rounded-[14px] p-2 lg:p-4 shadow-sm space-y-2">
            <div className="flex items-center justify-between gap-2">
              <h6 className="text-xl">Issuer</h6>
              <button
                className="cursor-pointer"
                onClick={() => setIsAirlineFinderOpen(true)}
              >
                <MdPermContactCalendar className="size-6 lg:size-7 text-gray-700" />
              </button>
            </div>
            <div className="space-y-1">
              <div className="leading-[1.45] font-medium text-sm sm:text-base text-gray-700">
                Issued by
              </div>
              <textarea
                rows={2}
                className="w-full rounded-xl px-3 py-2.5 text-sm sm:text-base font-normal leading-[1.45] placeholder:text-gray-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-300 border border-gray-400 hover:border-gray-700 transition-all duration-150"
              ></textarea>
            </div>
          </div>

          {/* Accounting information*/}
          <div className="bg-white rounded-[14px] p-2 lg:p-4 shadow-sm space-y-2">
            <h6 className="text-xl">Accounting information</h6>
            <div className="space-y-1">
              <div className="leading-[1.45] font-medium text-sm sm:text-base text-gray-700">
                Details
              </div>
              <textarea
                rows={3}
                className="w-full rounded-xl px-3 py-2.5 text-sm sm:text-base font-normal leading-[1.45] placeholder:text-gray-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-300 border border-gray-400 hover:border-gray-700 transition-all duration-150"
              ></textarea>
            </div>
          </div>

          {/* Shipment Reference information */}
          <div className="bg-white rounded-[14px] p-2 lg:p-4 shadow-sm space-y-2">
            <h6 className="text-xl">Shipment reference information</h6>
            <div className="space-y-1">
              <div className="leading-[1.45] font-medium text-sm sm:text-base text-gray-700">
                Reference number
              </div>
              <input
                type="text"
                className="w-full rounded-xl px-3 py-2.5 text-sm sm:text-base font-normal leading-[1.45] placeholder:text-gray-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-300 border border-gray-400 hover:border-gray-700 transition-all duration-150"
              />
            </div>
            <div className="space-y-1">
              <div className="leading-[1.45] font-medium text-sm sm:text-base text-gray-700">
                Serial number
              </div>
              <input
                type="text"
                className="w-full rounded-xl px-3 py-2.5 text-sm sm:text-base font-normal leading-[1.45] placeholder:text-gray-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-300 border border-gray-400 hover:border-gray-700 transition-all duration-150"
              />
            </div>
            <div className="space-y-1">
              <div className="leading-[1.45] font-medium text-sm sm:text-base text-gray-700">
                Origin
              </div>
              <input
                type="text"
                className="w-full rounded-xl px-3 py-2.5 text-sm sm:text-base font-normal leading-[1.45] placeholder:text-gray-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-300 border border-gray-400 hover:border-gray-700 transition-all duration-150"
              />
            </div>
            <div className="flex gap-2 mt-4 max-md:col-span-2">
              <input
                id="bidding-checkbox"
                type="checkbox"
                {...form.register("listing")}
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <label
                htmlFor="bidding-checkbox"
                className="text-sm text-gray-600"
              >
                assign on save
              </label>
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
                  className="w-full rounded-xl px-3 py-2.5 text-sm sm:text-base font-normal leading-[1.45] placeholder:text-gray-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-300 border border-gray-400 hover:border-gray-700 transition-all duration-150"
                />
              </div>
              <div className="space-y-1">
                <div className="leading-[1.45] font-medium text-sm sm:text-base text-gray-700">
                  CHCG
                </div>
                <input
                  type="text"
                  className="w-full rounded-xl px-3 py-2.5 text-sm sm:text-base font-normal leading-[1.45] placeholder:text-gray-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-300 border border-gray-400 hover:border-gray-700 transition-all duration-150"
                />
              </div>
            </div>

            {/* Value for carriage */}
            <div className="flex items-center gap-2 w-full">
              <div className="space-y-1">
                <div className="leading-[1.45] font-medium text-sm sm:text-base text-gray-700">
                  Value for carriage
                </div>
                <input
                  type="text"
                  className="w-full rounded-xl px-3 py-2.5 text-sm sm:text-base font-normal leading-[1.45] placeholder:text-gray-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-300 border border-gray-400 hover:border-gray-700 transition-all duration-150"
                />
              </div>
              <div className="space-y-1">
                <div className="leading-[1.45] font-medium text-sm sm:text-base text-gray-700">
                  WT/VAL
                </div>
                <select className="w-full rounded-xl px-3 py-2.5 text-sm sm:text-base font-normal leading-[1.45] placeholder:text-gray-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-300 border border-gray-400 hover:border-gray-700 transition-all duration-150">
                  <option value="ppd">PPD</option>
                  <option value="coll">COLL</option>
                </select>
              </div>
            </div>

            {/* Value for customs */}
            <div className="flex items-center gap-2 w-full">
              <div className="space-y-1">
                <div className="leading-[1.45] font-medium text-sm sm:text-base text-gray-700">
                  Value for customs
                </div>
                <input
                  type="text"
                  className="w-full rounded-xl px-3 py-2.5 text-sm sm:text-base font-normal leading-[1.45] placeholder:text-gray-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-300 border border-gray-400 hover:border-gray-700 transition-all duration-150"
                />
              </div>
              <div className="space-y-1">
                <div className="leading-[1.45] font-medium text-sm sm:text-base text-gray-700">
                  Other
                </div>
                <select className="w-full rounded-xl px-3 py-2.5 text-sm sm:text-base font-normal leading-[1.45] placeholder:text-gray-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-300 border border-gray-400 hover:border-gray-700 transition-all duration-150">
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
                className="w-full rounded-xl px-3 py-2.5 text-sm sm:text-base font-normal leading-[1.45] placeholder:text-gray-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-300 border border-gray-400 hover:border-gray-700 transition-all duration-150"
              />
            </div>
          </div>
        </div>

        {/* Handling information */}
        <div className="col-span-2 bg-white rounded-[14px] p-2 lg:p-4 shadow-sm space-y-2">
          <h6 className="text-xl">Handling information</h6>

          {/* Requirements */}
          <div className="space-y-1">
            <div className="leading-[1.45] font-medium text-sm sm:text-base text-gray-700">
              Requirements
            </div>
            <textarea
              rows={4}
              className="w-full rounded-xl px-3 py-2.5 text-sm sm:text-base font-normal leading-[1.45] placeholder:text-gray-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-300 border border-gray-400 hover:border-gray-700 transition-all duration-150"
            ></textarea>
          </div>

          {/* SCI & Destination */}
          <div className="flex items-center gap-2 w-full">
            <div className="space-y-1">
              <div className="leading-[1.45] font-medium text-sm sm:text-base text-gray-700">
                SCI
              </div>
              <input
                type="text"
                className="w-full rounded-xl px-3 py-2.5 text-sm sm:text-base font-normal leading-[1.45] placeholder:text-gray-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-300 border border-gray-400 hover:border-gray-700 transition-all duration-150"
              />
            </div>
            <div className="space-y-1 flex-1">
              <div className="leading-[1.45] font-medium text-sm sm:text-base text-gray-700">
                Destination
              </div>
              <input
                type="text"
                className="w-full rounded-xl px-3 py-2.5 text-sm sm:text-base font-normal leading-[1.45] placeholder:text-gray-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-300 border border-gray-400 hover:border-gray-700 transition-all duration-150"
              />
            </div>
          </div>
        </div>

        {/* Rate description */}
        <div className="col-span-2 bg-white rounded-[14px] p-2 lg:p-4 shadow-sm space-y-2">
          <h6 className="text-xl">Rate description</h6>
          <div className="flex items-center gap-2">
            <button
              className="bg-gray-200 px-4 py-1.5 rounded-md border border-gray-400 shadow text-sm"
              onClick={() => setIsAddRateOpen(true)}
            >
              Add
            </button>
            <button className="bg-gray-200 px-4 py-1.5 rounded-md border border-gray-400 shadow text-sm">
              Modify
            </button>
            <button className="bg-gray-200 px-4 py-1.5 rounded-md border border-gray-400 shadow text-sm">
              Remove
            </button>
          </div>
          <div className="overflow-x-auto pt-2">
            <table className="w-full min-w-[800px] text-sm sm:text-base text-left text-gray-700">
              <thead className="bg-gray-50 text-black capitalize text-[16px] sm:text-[18px] font-semibold">
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
                  <th className="px-3 sm:px-6 text-nowrap text-base">Total</th>
                  <th className="px-3 sm:px-6 text-nowrap text-base">
                    Nature and quantity
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
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* bottom left */}
        <div className="space-y-2">
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
                    disabled={true}
                    className="w-full rounded-xl px-3 py-2.5 text-sm sm:text-base font-normal leading-[1.45] placeholder:text-gray-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-300 border border-gray-400 hover:border-gray-700 transition-all duration-150 disabled:bg-neutral-200"
                  />
                </div>
                <div className="space-y-1">
                  <div className="leading-[1.45] font-medium text-sm sm:text-base text-gray-700">
                    Valuation charge
                  </div>
                  <input
                    type="text"
                    className="w-full rounded-xl px-3 py-2.5 text-sm sm:text-base font-normal leading-[1.45] placeholder:text-gray-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-300 border border-gray-400 hover:border-gray-700 transition-all duration-150"
                  />
                </div>
                <div className="space-y-1">
                  <div className="leading-[1.45] font-medium text-sm sm:text-base text-gray-700">
                    Tax
                  </div>
                  <input
                    type="text"
                    className="w-full rounded-xl px-3 py-2.5 text-sm sm:text-base font-normal leading-[1.45] placeholder:text-gray-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-300 border border-gray-400 hover:border-gray-700 transition-all duration-150"
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
                    disabled={true}
                    className="w-full rounded-xl px-3 py-2.5 text-sm sm:text-base font-normal leading-[1.45] placeholder:text-gray-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-300 border border-gray-400 hover:border-gray-700 transition-all duration-150 disabled:bg-neutral-200"
                  />
                </div>
                <div className="space-y-1">
                  <div className="leading-[1.45] font-medium text-sm sm:text-base text-gray-700">
                    Other charges due carrier
                  </div>
                  <input
                    type="text"
                    disabled={true}
                    className="w-full rounded-xl px-3 py-2.5 text-sm sm:text-base font-normal leading-[1.45] placeholder:text-gray-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-300 border border-gray-400 hover:border-gray-700 transition-all duration-150 disabled:bg-neutral-200"
                  />
                </div>
                <div className="space-y-1">
                  <div className="leading-[1.45] font-medium text-sm sm:text-base text-gray-700">
                    Total
                  </div>
                  <input
                    type="text"
                    disabled={true}
                    className="w-full rounded-xl px-3 py-2.5 text-sm sm:text-base font-normal leading-[1.45] placeholder:text-gray-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-300 border border-gray-400 hover:border-gray-700 transition-all duration-150 disabled:bg-neutral-200"
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
                    disabled={true}
                    className="w-full rounded-xl px-3 py-2.5 text-sm sm:text-base font-normal leading-[1.45] placeholder:text-gray-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-300 border border-gray-400 hover:border-gray-700 transition-all duration-150 disabled:bg-neutral-200"
                  />
                </div>
                <div className="space-y-1">
                  <div className="leading-[1.45] font-medium text-sm sm:text-base text-gray-700">
                    Valuation charge
                  </div>
                  <input
                    type="text"
                    className="w-full rounded-xl px-3 py-2.5 text-sm sm:text-base font-normal leading-[1.45] placeholder:text-gray-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-300 border border-gray-400 hover:border-gray-700 transition-all duration-150"
                  />
                </div>
                <div className="space-y-1">
                  <div className="leading-[1.45] font-medium text-sm sm:text-base text-gray-700">
                    Tax
                  </div>
                  <input
                    type="text"
                    className="w-full rounded-xl px-3 py-2.5 text-sm sm:text-base font-normal leading-[1.45] placeholder:text-gray-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-300 border border-gray-400 hover:border-gray-700 transition-all duration-150"
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
                    disabled={true}
                    className="w-full rounded-xl px-3 py-2.5 text-sm sm:text-base font-normal leading-[1.45] placeholder:text-gray-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-300 border border-gray-400 hover:border-gray-700 transition-all duration-150 disabled:bg-neutral-200"
                  />
                </div>
                <div className="space-y-1">
                  <div className="leading-[1.45] font-medium text-sm sm:text-base text-gray-700">
                    Other charges due carrier
                  </div>
                  <input
                    type="text"
                    disabled={true}
                    className="w-full rounded-xl px-3 py-2.5 text-sm sm:text-base font-normal leading-[1.45] placeholder:text-gray-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-300 border border-gray-400 hover:border-gray-700 transition-all duration-150 disabled:bg-neutral-200"
                  />
                </div>
                <div className="space-y-1">
                  <div className="leading-[1.45] font-medium text-sm sm:text-base text-gray-700">
                    Total
                  </div>
                  <input
                    type="text"
                    disabled={true}
                    className="w-full rounded-xl px-3 py-2.5 text-sm sm:text-base font-normal leading-[1.45] placeholder:text-gray-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-300 border border-gray-400 hover:border-gray-700 transition-all duration-150 disabled:bg-neutral-200"
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
                  className="w-full rounded-xl px-3 py-2.5 text-sm sm:text-base font-normal leading-[1.45] placeholder:text-gray-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-300 border border-gray-400 hover:border-gray-700 transition-all duration-150"
                />
              </div>
              <div className="space-y-1">
                <div className="leading-[1.45] font-medium text-sm sm:text-base text-gray-700">
                  CC charges
                </div>
                <input
                  type="text"
                  className="w-full rounded-xl px-3 py-2.5 text-sm sm:text-base font-normal leading-[1.45] placeholder:text-gray-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-300 border border-gray-400 hover:border-gray-700 transition-all duration-150"
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
                  className="w-full rounded-xl px-3 py-2.5 text-sm sm:text-base font-normal leading-[1.45] placeholder:text-gray-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-300 border border-gray-400 hover:border-gray-700 transition-all duration-150"
                />
              </div>
              <div className="space-y-1">
                <div className="leading-[1.45] font-medium text-sm sm:text-base text-gray-700">
                  Total collect charges{" "}
                </div>
                <input
                  type="text"
                  className="w-full rounded-xl px-3 py-2.5 text-sm sm:text-base font-normal leading-[1.45] placeholder:text-gray-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-300 border border-gray-400 hover:border-gray-700 transition-all duration-150"
                />
              </div>
            </div>
          </div>
        </div>

        {/* bottom right */}
        <div className="space-y-2">
          {/* Other charges */}
          <div className="col-span-2 bg-white rounded-[14px] p-2 lg:p-4 shadow-sm space-y-2">
            <h6 className="text-xl">Other charges</h6>
            <div className="flex items-center gap-2">
              <button
                className="bg-gray-200 px-4 py-1.5 rounded-md border border-gray-400 shadow text-sm cursor-pointer"
                onClick={() => setIsAddChargeOpen(true)}
              >
                Add
              </button>
              <button className="bg-gray-200 px-4 py-1.5 rounded-md border border-gray-400 shadow text-sm">
                Modify
              </button>
              <button className="bg-gray-200 px-4 py-1.5 rounded-md border border-gray-400 shadow text-sm">
                Remove
              </button>
            </div>
            <div className="overflow-x-auto pt-2">
              <table className="w-full text-sm sm:text-base text-left text-gray-700">
                <thead className="bg-gray-50 text-black capitalize text-[16px] sm:text-[18px] font-semibold">
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
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Shipper's certification */}
          <div className="bg-white rounded-[14px] p-2 lg:p-4 shadow-sm space-y-2">
            <div className="flex items-center justify-between gap-2">
              <h6 className="text-xl">Shipper&apos;s certification</h6>
              {/* <button>
                <IoMdSettings className="size-6 lg:size-7 text-gray-700" />
              </button> */}
            </div>
            <div>
              <textarea
                rows={2}
                className="w-full rounded-xl px-3 py-2.5 text-sm sm:text-base font-normal leading-[1.45] placeholder:text-gray-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-300 border border-gray-400 hover:border-gray-700 transition-all duration-150"
              ></textarea>
              <div className="space-y-1">
                <div className="leading-[1.45] font-medium text-sm sm:text-base text-gray-700">
                  Signature
                </div>
                <input
                  type="text"
                  className="w-full rounded-xl px-3 py-2.5 text-sm sm:text-base font-normal leading-[1.45] placeholder:text-gray-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-300 border border-gray-400 hover:border-gray-700 transition-all duration-150"
                />
              </div>
            </div>
          </div>

          {/* Carrier's execution */}
          <div className="bg-white rounded-[14px] p-2 lg:p-4 shadow-sm space-y-2">
            <div className="flex items-center justify-between gap-2">
              <h6 className="text-xl">Carrier&apos;s execution</h6>
              {/* <button>
                <IoMdSettings className="size-6 lg:size-7 text-gray-700" />
              </button> */}
            </div>
            <div>
              <textarea
                rows={2}
                className="w-full rounded-xl px-3 py-2.5 text-sm sm:text-base font-normal leading-[1.45] placeholder:text-gray-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-300 border border-gray-400 hover:border-gray-700 transition-all duration-150"
              ></textarea>
              <div className="flex items-center gap-1">
                <div className="space-y-1">
                  <div className="leading-[1.45] font-medium text-sm sm:text-base text-gray-700">
                    Date
                  </div>
                  <input
                    type="date"
                    className="w-full rounded-xl px-3 py-2.5 text-sm sm:text-base font-normal leading-[1.45] placeholder:text-gray-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-300 border border-gray-400 hover:border-gray-700 transition-all duration-150"
                  />
                </div>
                <div className="space-y-1 flex-1">
                  <div className="leading-[1.45] font-medium text-sm sm:text-base text-gray-700">
                    Place
                  </div>
                  <input
                    type="text"
                    className="w-full rounded-xl px-3 py-2.5 text-sm sm:text-base font-normal leading-[1.45] placeholder:text-gray-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-300 border border-gray-400 hover:border-gray-700 transition-all duration-150"
                  />
                </div>
              </div>
              <div className="space-y-1 pt-1">
                <div className="leading-[1.45] font-medium text-sm sm:text-base text-gray-700">
                  Signature
                </div>
                <input
                  type="text"
                  className="w-full rounded-xl px-3 py-2.5 text-sm sm:text-base font-normal leading-[1.45] placeholder:text-gray-400 focus:outline-none focus-visible:ring-2 focus-visible:ring-gray-300 border border-gray-400 hover:border-gray-700 transition-all duration-150"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-5 my-7 pt-7">
        <div className="text-3xl font-bold text-[#231F20] text-center basis-1/2">
          {/* ORIGINAL 3 (FOR SHIPPER) */}
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
            //  disabled={isPending}
          >
            {/* {isPending ? "Submitting..." : "Submit the Form"} */}
            Submit the Form
          </button>
        </div>
      </div>
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
          onSelect={handleAirlineFinder}
        />
      )}

      {isAddChargeOpen && (
        <AddOtherChargeModal
          onClose={() => setIsAddChargeOpen(false)}
          onAdd={handleAddCharge}
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
