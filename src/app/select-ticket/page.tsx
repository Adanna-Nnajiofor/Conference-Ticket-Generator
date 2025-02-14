"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { MdKeyboardArrowDown } from "react-icons/md";

const SelectTicket = () => {
  const router = useRouter();
  const [selectedTicket, setSelectedTicket] = useState<string | null>(null);
  const [ticketQuantity, setTicketQuantity] = useState<number>(1);
  const [errors, setErrors] = useState<{ ticket?: string; quantity?: string }>(
    {}
  );

  const handleSelect = (type: string) => {
    setSelectedTicket(type);
    setErrors((prev) => ({ ...prev, ticket: "" }));
  };

  const handleQuantityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTicketQuantity(Number(e.target.value));
    setErrors((prev) => ({ ...prev, quantity: "" }));
  };

  const handleNext = () => {
    const validationErrors: { ticket?: string; quantity?: string } = {};

    if (!selectedTicket) {
      validationErrors.ticket = "Please select a ticket type.";
    }

    if (!ticketQuantity || ticketQuantity < 1) {
      validationErrors.quantity = "Please select the number of tickets.";
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    localStorage.setItem("ticketType", selectedTicket!);
    localStorage.setItem("ticketQuantity", ticketQuantity.toString());
    router.push("/attendee-details");
  };

  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center bg-[#041E23]">
      <div
        className="flex flex-col justify-center items-center border-[#0E464F] border-2 border-solid h-auto w-auto lg:max-w-[700px] p-10 gap-8 rounded-[48px] bg-[#041E23] m-6 lg:mx-auto lg:my-10"
        role="form"
        aria-labelledby="form-heading"
      >
        {/* Header Section */}
        <div className="hidden lg:flex flex-col justify-between items-start h-auto lg:items-center w-full lg:flex-row">
          <div className="border-b-4 border-[#24A0B5] lg:w-2/5">
            <h1 className="text-white text-[32px]">Ticket Selection</h1>
          </div>
          <div className="border-b-4 border-[#0E464F] pb-6 lg:w-3/5 ">
            <p className="text-gray-100 text-end">Step 1/3</p>
          </div>
        </div>
        <div className="lg:hidden border-b-4 border-[#24A0B5] justify-start h-auto items-start flex flex-col w-full">
          <h1 className="text-white text-[32px] text-left">Ticket Selection</h1>
          <p className="text-gray-100 text-left mb-4">Step 1/3</p>
        </div>

        {/* Ticket Info */}
        <div className="bg-[#08252B] border-[#0E464F] border-2 rounded-3xl p-6 w-full h-auto">
          <div className="bg-techember-gradient border-[#07373F] p-6 flex flex-col gap-6 justify-center items-center rounded-3xl">
            <h1 className="text-white text-center text-2xl md:text-[42px] font-[jejumyeongjo]">
              Techember Fest ”25
            </h1>
            <p className="text-gray-100 text-center">
              Join us for an unforgettable experience at [Event Name]! Secure
              your spot now.
            </p>
            <div>
              <p className="text-gray-100 mt-2">
                📍 [Event Location] | March 15, 2025 | 7:00 PM
              </p>
            </div>
          </div>
          <div className="border-b-4 border-[#07373F] py-4"></div>

          {/* Ticket Selection */}
          <div className="flex flex-col gap-4 my-8 h-auto">
            <h2 className="text-white">Select Ticket Type:</h2>
            <div className="flex flex-col bg-[#052228] border-[#07373F] border rounded-3xl p-4 gap-6 lg:flex-row">
              {["Free", "$150 (VIP)", "$250 (VVIP)"].map((type, index) => (
                <div
                  key={index}
                  className={`cursor-pointer border-[#197686] border rounded-xl p-3 gap-3 w-full lg:max-w-[200px] ${
                    selectedTicket === type
                      ? "bg-[#12464E] ring-2 ring-[#24A0B5]"
                      : "hover:bg-[#12464E]"
                  }`}
                  tabIndex={0}
                  role="button"
                  onClick={() => handleSelect(type)}
                  onKeyDown={(e) => e.key === "Enter" && handleSelect(type)}
                >
                  <h1 className="text-white font-semibold text-xl mb-3">
                    {type}
                  </h1>
                  <p className="text-white font-light">
                    {type === "Free"
                      ? "REGULAR ACCESS"
                      : type.includes("VIP")
                      ? "VIP ACCESS"
                      : "VVIP ACCESS"}
                  </p>
                  <h4 className="text-white font-light">20 / 52</h4>
                </div>
              ))}
            </div>
            {errors.ticket && (
              <p
                className="text-red-500 text-sm"
                role="alert"
                aria-live="assertive"
              >
                {errors.ticket}
              </p>
            )}
          </div>

          {/* Number of Tickets */}
          <div className="flex flex-col gap-2 my-8 h-auto w-full">
            <label htmlFor="ticketQuantity" className="text-white">
              Number of Tickets
            </label>
            <div className="relative w-full">
              <select
                id="ticketQuantity"
                name="ticketQuantity"
                value={ticketQuantity}
                onChange={handleQuantityChange}
                className="border-[#07373F] rounded-xl p-3 w-full bg-[#052228] text-white border appearance-none cursor-pointer focus:ring hover:border-blue-300 "
                aria-describedby={
                  errors.quantity ? "quantity-error" : undefined
                }
              >
                {[...Array(10).keys()].map((num) => (
                  <option
                    key={num + 1}
                    value={num + 1}
                    className="w-auto flex flex-col "
                  >
                    {num + 1}
                  </option>
                ))}
              </select>
              <MdKeyboardArrowDown className="absolute top-1/2 right-4 transform -translate-y-1/2 text-white pointer-events-none" />
            </div>
            {errors.quantity && (
              <p
                id="quantity-error"
                className="text-red-500 text-sm"
                role="alert"
                aria-live="assertive"
              >
                {errors.quantity}
              </p>
            )}
          </div>

          {/* Buttons */}
          <div className="flex flex-col justify-between w-full gap-6 lg:flex-row">
            <button
              type="button"
              className="border-[#24A0B5] py-3 px-6 text-[#24A0B5] rounded-lg border w-full lg:w-1/2"
              onClick={() => {
                setSelectedTicket(null);
                setTicketQuantity(1);
                localStorage.removeItem("ticketType");
                localStorage.removeItem("ticketQuantity");
              }}
            >
              Cancel
            </button>
            <button
              type="button"
              className="bg-[#24A0B5] py-3 px-6 text-white rounded-lg w-full lg:w-1/2"
              onClick={handleNext}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SelectTicket;
