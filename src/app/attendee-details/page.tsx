"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

const AttendeeDetails = () => {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [specialRequest, setSpecialRequest] = useState("");
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [errors, setErrors] = useState<{
    name?: string;
    email?: string;
    image?: string;
  }>({});

  useEffect(() => {
    const savedData = localStorage.getItem("attendeeDetails");
    if (savedData) {
      const { name, email, specialRequest, imagePreview } =
        JSON.parse(savedData);
      setName(name);
      setEmail(email);
      setSpecialRequest(specialRequest);
      setImagePreview(imagePreview);
    }
  }, []);

  const validateForm = () => {
    const newErrors: { name?: string; email?: string; image?: string } = {};

    if (!name.trim()) newErrors.name = "Name is required";
    if (!email.trim() || !/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      newErrors.email = "Enter a valid email";
    }
    if (!imagePreview) newErrors.image = "Profile image is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64String = reader.result as string;
        setImagePreview(base64String);
        const attendeeDetails = {
          name,
          email,
          specialRequest,
          imagePreview: base64String,
        };
        localStorage.setItem(
          "attendeeDetails",
          JSON.stringify(attendeeDetails)
        );
      };
      reader.readAsDataURL(file);
    }
  };

  const handleNext = () => {
    if (!validateForm()) return;
    const attendeeData = {
      name,
      email,
      specialRequest,
      image: imagePreview,
      imagePreview,
    };
    localStorage.setItem("attendeeDetails", JSON.stringify(attendeeData));
    router.push("/ticket-ready");
  };

  const handleBack = () => {
    router.push("/select-ticket");
  };

  return (
    <div className=" w-full h-full  flex flex-col mx-auto">
      <div className="flex flex-col justify-center items-center border-[#0E464F] border-2 border-solid h-auto w-auto lg:w-full lg:max-w-[700px] p-10 gap-8 rounded-[48px] bg-[#041E23] m-6 lg:mx-auto lg:my-10 ">
        <div className="flex justify-between items-start w-full flex-row">
          <div className="border-b-4 border-[#24A0B5] w-4/5 lg:w-1/2">
            <h1 className="text-white text-[32px]">Attendee Details</h1>
          </div>
          <div className="border-b-4 border-[#0E464F] pb-6 w-1/5 lg:w-1/2 ">
            <p className="text-gray-100 text-end">Step 2/3</p>
          </div>
        </div>

        <div className="bg-[#08252B] border-[#0E464F] border-2 rounded-3xl p-6 w-full">
          <div className="bg-[#052228] border-[#07373F] p-6 pb-10 flex flex-col gap-6 border rounded-3xl w-auto h-auto">
            <p className="text-white text-start mb-4">Upload Profile Photo</p>
            <div className="bg-[#000000] w-full max-h-[200px] h-auto relative flex">
              <div
                className={`max-w-[240px] max-h-[240px] w-full h-full  flex justify-center items-center rounded-3xl mx-auto relative bottom-5 transition-all duration-300 
                 ${
                   imagePreview
                     ? "bg-transparent"
                     : "bg-[#0E464F] border-[#24A0B5] border"
                 }hover:bg-transparent`}
              >
                {imagePreview ? (
                  <Image
                    src={imagePreview}
                    alt="Uploaded Preview"
                    width={240}
                    height={240}
                    className="rounded-3xl flex items-center justify-center object-cover w-[240px] h-[240px] 
                         hover:bg-transparent transition-all duration-300"
                  />
                ) : (
                  <div className="p-6 rounded-3xl w-[240px] h-[240px] flex justify-center items-center flex-col">
                    <Image
                      src="/images/cloud-download.png"
                      alt="Upload Icon"
                      width={32}
                      height={32}
                      className="rounded-md"
                      priority
                    />
                    <p className="text-white text-center text-sm mt-2">
                      Drag & drop or click to upload
                    </p>
                  </div>
                )}

                <input
                  type="file"
                  accept="image/*"
                  id="profilePhoto"
                  aria-describedby={errors.image ? "image-error" : undefined}
                  onChange={handleImageChange}
                  title="Upload profile photo"
                  aria-label="Upload your profile photo"
                  className="absolute inset-0 opacity-0 cursor-pointer hover:bg-transparent"
                />
              </div>
              {errors.image && (
                <p id="image-error" className="text-red-500 text-sm mt-1">
                  {errors.image}
                </p>
              )}
            </div>
          </div>
          <div className="border-b-4 border-[#07373F] py-4"></div>

          <div className="w-full flex flex-col">
            <form className="flex flex-col gap-2 my-6 w-full">
              <label className="text-white" htmlFor="name">
                Enter Your Name
              </label>
              <input
                id="name"
                type="text"
                placeholder="Name"
                aria-describedby={errors.name ? "name-error" : undefined}
                className="border-[#07373F] rounded-xl p-3 flex w-full justify-between text-white border-2 items-center bg-transparent outline-none focus:border-blue-300"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              {errors.name && (
                <p id="name-error" className="text-red-500 text-sm mt-1">
                  {errors.name}
                </p>
              )}
            </form>

            <form className="flex flex-col gap-2 my-6 w-full">
              <label className="text-white" htmlFor="name">
                Enter your email *
              </label>

              <input
                id="email"
                type="email"
                placeholder="hello@avioflagos.io"
                aria-describedby={errors.email ? "email-error" : undefined}
                className="border-[#07373F] rounded-xl p-3 flex w-full justify-between text-white border-2 items-center bg-transparent outline-none focus:border-blue-300"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              {errors.email && (
                <p id="email-error" className="text-red-500 text-sm mt-1">
                  {errors.email}
                </p>
              )}
            </form>

            <form className="flex flex-col gap-2 my-6 w-full">
              <label className="text-white" htmlFor="name">
                Special request?
              </label>
              <textarea
                id="specialRequest"
                placeholder="Type your special request here..."
                className="border-[#07373F] rounded-xl p-3 flex w-full justify-between text-white border-2 items-center bg-transparent outline-none focus:border-blue-300"
                value={specialRequest}
                onChange={(e) => setSpecialRequest(e.target.value)}
              ></textarea>
            </form>
          </div>

          <div className="flex flex-col justify-between w-full gap-6 lg:flex-row">
            <button
              type="button"
              className="border-[#24A0B5] py-3 px-6 text-[#24A0B5] rounded-lg border w-full lg:w-1/2"
              onClick={handleBack}
            >
              Back
            </button>
            <button
              type="button"
              className="bg-[#24A0B5] py-3 px-6 text-white rounded-lg w-full lg:w-1/2"
              onClick={handleNext}
            >
              Get My Free Ticket
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendeeDetails;
