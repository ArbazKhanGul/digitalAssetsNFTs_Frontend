import Image from "next/image";
import Navbar from "../components/navbar";
import { useState, useEffect } from "react";
import Footer from "../components/footer/footer";
const profileUpdate = () => {
  return (
    <>
      <Navbar></Navbar>
      <div>
        <div>
          <div className=" w-[100%] h-[26rem]  relative">
            <Image src={`/cover.jpg`} layout="fill" objectFit="cover" />
          </div>
        </div>

        <div className="ml-[5rem] -mt-[4.7rem] md:-mt-[5.7rem]  z-50 absolute right-[1rem]  inline-block ">
          <div className="w-[4rem] h-[4rem] md:w-[5rem] md:h-[5rem]  relative">
            <Image
              src={`/updation.png`}
              layout="fill"
              objectFit="contain"
              className="rounded-xl"
            />
          </div>
        </div>

<div className="flex justify-center md:block">
        <div className="  md:ml-[5rem] -mt-[7.5rem]  border-white z-50 relative border-[0.4rem] inline-block rounded-xl">
          <div className="w-[15rem] h-[15rem]  relative">
            <Image
              src={`/profile.jpg`}
              layout="fill"
              objectFit="cover"
              className="rounded-xl"
            />
          </div>
        </div>
        </div>
        
      </div>

      <div className="flex justify-center md:block md:ml-[5rem] mt-[0.3rem]">
        <div className="bord_grad w-fit text-[1.85rem] !rounded-2xl">
          <span className="block px-[1.7rem] font-medium py-[0.4rem] buttonnft  !rounded-xl">
            Change Photo
          </span>
        </div>
      </div>

      <div className="ml-[2.5rem] md:ml-[5rem] mr-[2.5rem]">


        <div className="mt-[1.5rem]">
            <h2 className="font-['Inconsolata'] text-[2.4rem] font-medium">Collection Name</h2>
        <div className="input_bord_grad w-[100%] md:w-[50rem]  mt-[0.8rem] ">
          <input
            type="text"
            className="outline-none text-[1.6rem] md:text-[1.7rem] border-none w-[100%] rounded-[1.2rem] p-[0.8rem] font-['Inconsolata']"
            placeholder="Enter owner email address"
          />
        </div>
        </div>

        <div className="mt-[1.5rem]">
            <h2 className="font-['Inconsolata'] text-[2.4rem] font-medium">Author Name</h2>
        <div className="input_bord_grad w-[100%] md:w-[50rem] mt-[0.8rem]">
          <input
            type="text"
            className="outline-none text-[1.6rem] md:text-[1.7rem] border-none w-[100%] rounded-[1.2rem] p-[0.8rem] font-['Inconsolata']"
            placeholder="Enter creator email address"
          />
        </div></div>


        <div className="mt-[1.5rem]   ">

            <h2 className="font-['Inconsolata'] text-[2.4rem] font-medium">Description</h2>
        <div className="w-[100%] md:w-[50rem] input_bord_grad flex justify-center  space-y-[0.5rem] mt-[0.8rem]">
                <textarea
                  name="description"
                //   value={values.description}
                //   onChange={handleChange}
                //   onBlur={handleBlur}
                  autoComplete="off"
                  placeholder="Description..."
                  id=""
                  className="rounded-2xl resize-none outline-none h-[13rem]  w-[100%]  block placeholder:text-[#746e6e] p-[0.8rem] text-black text-[1.7rem] sm:text-[1.8rem] bg-transparent font-['Inconsolata']"
                ></textarea>
                {/* {errors.description && touched.description ? (
                  <p className="text-red-500 text-[1.4rem] errors block">
                    {errors.description}
                  </p>
                ) : null} */}
              </div>
              </div>

              <button className="bg-blue-500  hover:bg-blue-700  text-white font-normal text-[1.8rem] sm:font-semibold py-2 px-12  mt-[1.2rem] mb-[4rem] sm:py-2 sm:px-14 rounded-xl font-['Inconsolata'] tracking-wider"     >
  Update
</button>
      </div>
      <Footer></Footer>
    </>
  );
};

export default profileUpdate;
