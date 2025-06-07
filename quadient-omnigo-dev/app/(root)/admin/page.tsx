"use client";
import React, { useState } from "react";
import CommonInput from "../../components/common/CommonInput"; // Adjust path based on your folder setup
import Button from "@/app/components/common/Button";
import Image from "next/image";
const Page = () => {
  const [formData, setFormData] = useState({
    email: "",
    number: "",
    organisenumber: "",
    telefon: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
  };

  return (
      <div className="pt-9 md:pt-12 lg:pt-[67px] px-0 sm:px-4">
          <Image src="/quad-tree.png" width={273} height={321} alt="tree" className="absolute max-lg:w-[200px] max-lg:h-[250px] max-sm:w-[120px] max-sm:h-[170px] right-0 bottom-10"/>
      <h1 className="text-2xl sm:text-3xl lg:text-[52px] leading-[100%] font-montserrat text-center font-semibold text-black mb-2">
        Profilinställningar
      </h1>
      <p className="text-[#949494] text-center text-base sm:text-lg lg:text-[22px] mb-6 sm:mb-8 lg:mb-12">
        Här uppdaterar du dina användaruppgifter
      </p>
      <div className="max-w-md mx-auto md:px-16 sm:px-10 px-4 lg:px-[90px] rounded-[35px] lg:pb-10 md:py-7 py-5 sm:py-6 lg:pt-8 border-2 sm:border-4 md:border-8 lg:border-[10px] border-[#FBFBFB] bg-white">
        <div className="flex gap-3 sm:gap-6 items-center mb-9">
          <Image
            src="/profile-image.png"
            height={100}
            width={100}
                      alt="image"
                      className="max-lg:w-20 max-lg:h-20 max-sm:w-14 max-sm:h-14 max-md:w-16 max-md:h-16"
          />
          <div className="flex flex-col gap-1.5">
            <p className="font-poppins text-base sm:text-lg lg:text-xl font-medium whitespace-nowrap leading-[100%]">
              Förnamn Efternamn
            </p>
            <p className="text-sm sm:text-base font-normal opacity-50 text-black font-quicksand leading-[100%]">
              Företagsnamn
            </p>
          </div>
        </div>
        <form onSubmit={handleSubmit}>
          <CommonInput
            label="Kundnummer"
            type="number"
            name="number"
            placeholder="458 799"
            value={formData.number}
            onChange={handleChange}
          />
          <CommonInput
            label="Organisationsnummer"
            type="number"
            name="organisenumber"
            placeholder="123456-0000"
            value={formData.organisenumber}
            onChange={handleChange}
          />
          <CommonInput
            label="Email"
            type="email"
            name="email"
            placeholder="demo@gmail.com"
            value={formData.email}
            onChange={handleChange}
          />
          <CommonInput
            label="Telefon"
            type="number"
            name="telefon"
            placeholder="070 - 000 00 00"
            value={formData.telefon}
            onChange={handleChange}
          />
          <CommonInput
            label="Lösenord"
            type="password"
            name="password"
            placeholder="***********"
            value={formData.password}
            onChange={handleChange}
          />
          <div className="flex mt-4 sm:mt-6 lg:mt-9">
              <Button variant="primary">Spara</Button>
              <Button
                variant="outline"
                className="ml-[22px] !text-secondary !border-secondary hover:!bg-secondary hover:!text-white hover:!border-white"
              >
                Redigera
              </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Page;
