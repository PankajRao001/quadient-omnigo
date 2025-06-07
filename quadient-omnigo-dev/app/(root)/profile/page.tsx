"use client";
import React, { useState } from "react";
import CommonInput from "@/app/components/common/CommonInput";
import Button from "@/app/components/common/Button";
import { onboarding } from "@/app/components/common/Helper";
import Image from "next/image";
const page = () => {
  const [showModal, setShowModal] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    iDataID: "",
    Bolag: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setShowModal(false); // close modal after submission
  };

  return (
    <div className="pt-16 mt-1">
      <h1 className="text-2xl sm:text-3xl lg:text-[52px] leading-[100%] font-montserrat text-center font-semibold text-black mb-2">
        Onboarding
      </h1>
      <p className="text-[#949494] text-center text-base sm:text-lg lg:text-[22px] mb-6 sm:mb-8 lg:mb-12">
        Se befintliga kunder och skapa nya
      </p>
      <div className="mt-14 px-10 py-8 bg-[#FFF9F8] max-w-[1180px] mx-auto rounded-[35px]">
        <div className="flex flex-col sm:flex-row gap-4 justify-between">
          <input
            type="text"
            className="bg-white text-base sm:text-lg lg:text-xl font-medium font-quicksand leading-[100%] py-4 pl-5 shadow-[0px_4px_10px_0px_#00000016] w-full max-w-[835px] rounded-xl"
            placeholder="Sök användare..."
          />
          <Button
            onClick={() => setShowModal(true)}
            className="text-nowrap max-w-[191px]"
            variant="primary"
          >
            Ny användare
          </Button>
        </div>
        <div className="flex justify-between my-6">
          <p className="text-primary text-base sm:text-lg lg:text-xl font-montserrat leading-[100%]">
            Alla användare
          </p>
          <div className="flex gap-[18px]">
            <select
              className="text-sm cursor-pointer hover:text-primary focus:text-primary duration-300 focus:outline-0 font-medium font-montserrat leading-[100%]"
              name="Namn"
              id="Namn"
            >
              <option
                className="bg-primary text-white duration-300"
                value="Namn1"
              >
                Namn
              </option>
              <option
                className="bg-primary text-white duration-300"
                value="Namn2"
              >
                Namn2
              </option>
              <option
                className="bg-primary text-white duration-300"
                value="Namn3"
              >
                Namn3
              </option>
            </select>
            <select
              className="text-sm cursor-pointer hover:text-primary focus:text-primary duration-300 focus:outline-0 font-medium font-montserrat leading-[100%]"
              name="Email"
              id="Email"
            >
              <option
                className="bg-primary text-white duration-300"
                value="Email1"
              >
                Email
              </option>
              <option
                className="bg-primary text-white duration-300"
                value="Email2"
              >
                Email2
              </option>
              <option
                className="bg-primary text-white duration-300"
                value="Email3"
              >
                Email3
              </option>
            </select>
          </div>
        </div>

        <div className="flex flex-col sm:overflow-x-visible overflow-x-auto sm:min-w-0 min-w-[800px] gap-[15px]">
          {onboarding.map((obj, index) => {
            return (
              <div
                key={index}
                className="bg-white border-2 flex items-center justify-between border-[#F8F8F8] rounded-xl py-2 lg:py-2.5 px-3 lg:px-4"
              >
                <div className="flex items-center gap-2.5">
                  <div className="bg-[#FBFBFB] flex items-center justify-center rounded-full size-8 md:size-10 lg:size-12">
                    <Image
                      src="/user-profile.png"
                      alt="profile"
                      width={16}
                      height={16}
                      className="max-sm:size-3"
                    />
                  </div>
                  <div className="flex gap-1 flex-col">
                    <p className="whitespace-nowrap leading-[100%] font-montserrat text-xs md:text-sm">
                      {obj.name}
                    </p>
                    <p className="whitespace-nowrap leading-[100%] text-gray font-quicksand text-xs md:text-sm">
                      {obj.blog}
                    </p>
                  </div>
                </div>
                <p className="whitespace-nowrap leading-[100%] text-gray font-quicksand text-xs md:text-sm">
                  {obj.date}
                </p>
                <p className="whitespace-nowrap leading-[100%] text-secondary font-quicksand text-xs md:text-sm">
                  {obj.type}
                </p>
              </div>
            );
          })}
        </div>
      </div>
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70">
          <div className="bg-white rounded-xl w-full max-w-[657px] pb-7 relative">
            <div className="flex justify-between items-center pt-5 sm:pt-7 lg:pt-9 pb-5 lg:pb-7  border-b-[5px] px-4 sm:px-5 md:px-6 lg:px-8 border-b-[#f8f8f8]">
              <h2 className="text-[29px] font-medium font-montserrat">
                Ny användare
              </h2>
              <button
                onClick={() => setShowModal(false)}
                className="cursor-pointer"
              >
                <Image src="/close.png" height={24} width={24} alt="closebtn" />
              </button>
            </div>
            <form
              className="px-6 sm:px-10 lg:px-20 pt-6 sm:mt-8 md:mt-10 lg:mt-14"
              onSubmit={handleSubmit}
            >
              <CommonInput
                name="name"
                placeholder="Namn"
                value={formData.name}
                onChange={handleChange}
              />

              <CommonInput
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
              />

              <CommonInput
                type="text"
                name="address"
                placeholder="Adress"
                value={formData.address}
                onChange={handleChange}
              />
              <CommonInput
                type="password"
                name="IdataID"
                placeholder="iData ID"
                value={formData.iDataID}
                onChange={handleChange}
              />
              <CommonInput
                type="password"
                name="Bolag"
                placeholder="Bolag"
                value={formData.Bolag}
                onChange={handleChange}
              />
              <div className="flex float-right lg:mr-[-50px] mt-4 gap-4 sm:mt-6 lg:mt-9">
                <Button
                  variant="outline"
                  className=" !text-secondary !border-transparent hover:!bg-secondary hover:!text-white hover:!border-white"
                >
                  Rensa
                </Button>
                <Button variant="primary">Skapa</Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default page;
