"use client";
import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const TicketReady = () => {
  const router = useRouter();
  const ticketRef = useRef<HTMLDivElement>(null);
  const [attendee, setAttendee] = useState<{
    name: string;
    email: string;
    specialRequest: string;
    image: string | null;
  } | null>(null);
  const [ticketType, setTicketType] = useState<string | null>(null);
  const [ticketQuantity, setTicketQuantity] = useState<string>("");

  useEffect(() => {
    const savedTicket = localStorage.getItem("ticketType");
    const savedAttendee = localStorage.getItem("attendeeDetails");
    const savedTicketQuantity = localStorage.getItem("ticketQuantity");

    if (savedTicket) setTicketType(savedTicket);
    if (savedAttendee) {
      const attendeeData = JSON.parse(savedAttendee);
      setAttendee(attendeeData);
    }
    if (savedTicketQuantity) {
      setTicketQuantity(savedTicketQuantity);
    } else {
      setTicketQuantity(`TC-${Math.floor(100000 + Math.random() * 900000)}`);
    }
  }, []);

  const handleDownload = async () => {
    if (!ticketRef.current) return;

    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      const canvas = await html2canvas(ticketRef.current, { scale: 2 });
      const image = canvas.toDataURL("image/jpeg"); // Convert to JPG

      // Ask the user for download format
      const format = confirm(
        "Download as PDF? Click 'OK' for PDF or 'Cancel' for JPG"
      );

      if (format) {
        // Download as PDF
        const pdf = new jsPDF("p", "mm", "a4");
        const imgWidth = 210;
        const imgHeight = (canvas.height * imgWidth) / canvas.width;

        pdf.addImage(image, "JPEG", 0, 0, imgWidth, imgHeight);
        pdf.save("Techember_Fest_Ticket.pdf");
      } else {
        // Download as JPG
        const link = document.createElement("a");
        link.href = image;
        link.download = "Techember_Fest_Ticket.jpg";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      }
    } catch (error) {
      console.error("Error generating ticket:", error);
    }
  };

  const handleBack = () => {
    router.push("/select-ticket");
  };

  return (
    <div className="bg-[#02191d] w-full h-full  flex flex-col mx-auto lg:absolute lg:top-0 lg:left-0 lg:w-full lg:h-auto">
      <div className="flex flex-col justify-center items-center border-[#0E464F] border-2 border-solid h-full w-auto lg:w-full lg:max-w-[700px] p-10 gap-8 rounded-[48px] bg-[#041E23] mx-6 my-12 lg:mx-auto lg:my-0">
        <div className="flex  flex-row justify-between items-start  w-full ">
          <div className="border-b-4 border-[#24A0B5] w-4/5">
            <h1 className="text-white text-[20px] md:text-[32px]">Ready</h1>
          </div>
          <div className="border-b-4 border-[#0E464F] pb-2 w-1/5 md:pb-6">
            <p className="text-gray-100 text-end">Step 3/3</p>
          </div>
        </div>
        <div className="text-white gap-4 my-4 flex flex-col justify-center items-center">
          <h1 className="text-3xl text-center">Your Ticket is Booked!</h1>
          <p className="hidden lg:flex text-center">
            Check your email for a copy or you can{" "}
            <span className="font-bold">download</span>
          </p>
          <p className="flex lg:hidden text-center">
            You can download or Check your email for a copy
          </p>
        </div>

        <div
          ref={ticketRef}
          className="relative min-h-[840px] min-w-[400px] w-auto h-auto bg-custom flex flex-col items-center justify-center"
        >
          <div className="absolute inset-0 bg-opacity-50"></div>

          <div className="relative z-10 top-6 flex flex-col justify-center items-center h-full  w-auto text-white text-center m-2  bg-[#031e2123] border-[#24A0B5] border-2 rounded-2xl">
            <div className="  p-6 flex flex-col gap-1 justify-center items-center">
              <h1 className="text-white text-center text-2xl ">
                Techember Fest ”25
              </h1>
              <p className="text-gray-100 text-center">
                📍 04 Rumens road, Ikoyi, Lagos
              </p>
              <div>
                <p className="text-gray-100 mt-2">
                  📅 March 15, 2025 | 7:00 PM
                </p>
              </div>
            </div>

            {/* Ticket Section */}
            {attendee?.image && (
              <div className="flex items-center justify-center my-2 w-auto h-full">
                <Image
                  src={attendee.image}
                  alt={`Profile picture of ${attendee?.name || "attendee"}`}
                  width={140}
                  height={140}
                  className="rounded-lg object-cover"
                  priority
                />
              </div>
            )}

            <div className="  h-full w-auto gap-2  flex flex-col m-4 p-4 rounded-xl bg-[#08343C] border-[#133D44] border shadow-lg">
              <div className="w-full flex flex-col p-1 ">
                <div className="flex justify-between items-start w-full">
                  <div className="flex flex-col gap-1 w-1/2 border-b border-r pr-2">
                    <p
                      id="name-label"
                      className="text-gray-100 text-start text-[12px]"
                    >
                      Enter Your Name
                    </p>
                    <p
                      className="text-start font-extrabold text-sm pb-4 "
                      aria-labelledby="name-label"
                    >
                      {attendee?.name}
                    </p>
                  </div>
                  <div className="flex flex-col gap-1 w-1/2 border-b pl-2 text-wrap">
                    <p
                      id="email-label"
                      className="text-gray-100 text-start text-[12px]"
                    >
                      Enter Your Email
                    </p>
                    <p
                      className="text-start font-extrabold pb-6 text-[8px] text-wrap"
                      aria-labelledby="email-label"
                    >
                      {attendee?.email}
                    </p>
                  </div>
                </div>
                <div className="flex justify-between items-start w-full">
                  <div className="flex flex-col gap-1  border-b border-r pr-2 w-1/2 ">
                    <p
                      id="ticket-type-label"
                      className="text-gray-100 text-start pt-4 text-[12px]"
                    >
                      Ticket Type:
                    </p>
                    <p
                      className="text-start font-extrabold text-sm pb-4"
                      aria-labelledby="ticket-type-label"
                    >
                      {ticketType}
                    </p>
                  </div>
                  <div className="flex flex-col gap-1 w-1/2 border-b pl-2">
                    <p
                      id="ticket-quantity-label"
                      className="text-gray-100 text-start pt-4 text-[12px]"
                    >
                      Ticket for :
                    </p>
                    <p
                      className="text-start font-extrabold text-sm pb-4"
                      aria-labelledby="ticket-quantity-label"
                    >
                      {ticketQuantity}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-start justify-start">
                <p
                  id="special-request-label"
                  className="text-gray-200 text-start my-2 text-[12px]"
                >
                  Special request?
                </p>
                <p
                  className="text-white text-start text-sm font-extrabold"
                  aria-labelledby="special-request-label"
                >
                  {attendee?.specialRequest}
                </p>
              </div>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center my-auto">
            <Image
              src="/images/Bar Code.png"
              alt="Logo"
              width={320}
              height={250}
              className="rounded-md mt-8"
              priority
            />
          </div>
        </div>

        {/* Buttons */}
        <div className="flex flex-col justify-between w-full gap-6 mt-6 lg:flex-row">
          <button
            type="button"
            className="border-[#24A0B5] py-3 px-6 text-[#24A0B5] rounded-lg border w-full lg:w-1/2"
            onClick={handleBack}
          >
            Book Another Ticket
          </button>
          <button
            type="button"
            className="bg-[#24A0B5] py-3 px-6 text-white rounded-lg w-full lg:w-1/2"
            onClick={handleDownload}
            aria-label="Download your ticket"
          >
            Download Ticket
          </button>
        </div>
      </div>
    </div>
  );
};

export default TicketReady;
