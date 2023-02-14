import { memo } from "react";

import { filterNftSchema } from "../../schema/index"
import { useRouter, useState } from "../"
import { useFormik } from "formik";
import { toast } from "react-toastify";

const Filter = ({ showItems }) => {

   const router = useRouter();

   let initialValues = {
      nftName: "",
      ownerEmail: "",
      creatorEmail: "",
      ownerWalletAddress: "",
      creatorWalletAddress: "",
      minimumPrice: "",
      maximumPrice: "",
   };


   const {
      values,
      errors,
      touched,
      handleSubmit,
      handleChange,
      handleBlur,
   } = useFormik({
      initialValues,
      validationSchema: filterNftSchema,

      onSubmit: async (values, action) => {

         // const isEmpty = Object.values(values).every(x => x === '');
         // if (isEmpty) {
         //    toast.error('Please use at least one filter', {
         //       position: "top-center",
         //    })
         //    return;
         // }

         let route = '?'

         // var route =path.substr(0, path.indexOf('?'))   + '?'
         // console.log("🚀 ~ file: filter.js ~ line 46 ~ onSubmit: ~ route substring", route)

         for (let key in values) {
            if (values[key] !== '') {

               if (route.charAt(route.length - 1) === '?') {
                  route = route + key + '=' + values[key].trim().toLowerCase()
               }
               else {
                  route = route + '&' + key + '=' + values[key].trim().toLowerCase()
               }
            }
         }


         console.log("🚀 ~ file: filter.js ~ line 49 ~ onSubmit: ~ route", route)
         router.push(route);
      }
   })

   return (<div className={"bg-[#EDF2F7] rounded-[1.1rem] mt-[0.4rem]  overflow-hidden transition-all duration-700 " + (!showItems ? "max-h-0" : "max-h-[60rem]")}>
      <form onSubmit={handleSubmit}>
         <div className="transition-all duration-500 text-[#FD2121DB] text-center text-[1.3rem] md:text-[1.5rem] pt-[1rem] px-[1rem] font-['Inconsolata']">If you don’t want to use any filter from below simply leave it empty</div>
         <div className="flex flex-wrap md:space-x-[1.5rem] md:justify-center lg:justify-center lg:mr-[0.6rem] xl:mr-[0rem] xl:justify-center lg:space-x-[1rem] xl:space-x-[1.8rem] px-[1.5rem] md:px-[1rem] pb-[1.5rem]">


            <div className="md:ml-[1.5rem] lg:ml-[1rem] xl:ml-[1.8rem] mt-[1.5rem] w-[100%] md:w-[35rem] lg:w-[34rem] xl:w-[34rem]">
               <div className="input_bord_grad w-[100%] md:w-[35rem] lg:w-[34rem] xl:w-[34rem] mb-[0.2rem]">
                  <input type="text"
                     className="outline-none text-[1.6rem] md:text-[1.7rem] border-none w-[100%] rounded-[1.2rem] p-[0.8rem] font-['Inconsolata']"
                     placeholder="Enter NFT Name"
                     name="nftName"
                     value={values.nftName}
                     onChange={handleChange}
                     onBlur={handleBlur}
                     autoComplete="off"
                  />
               </div>
               {errors.nftName && touched.nftName ? (
                  <p className="text-red-500 text-[1.4rem] errors block">
                     {errors.nftName}
                  </p>
               ) : null}
            </div>





            <div className="md:ml-[1.5rem] lg:ml-[1rem] xl:ml-[1.8rem] mt-[1.5rem] w-[100%] md:w-[35rem] lg:w-[34rem] xl:w-[34rem]">
               <div className="input_bord_grad w-[100%] md:w-[35rem] lg:w-[34rem] xl:w-[34rem] mb-[0.2rem]">
                  <input type="text"
                     className="outline-none text-[1.6rem] md:text-[1.7rem] border-none w-[100%] rounded-[1.2rem] p-[0.8rem] font-['Inconsolata']"
                     placeholder="Enter owner email address"
                     name="ownerEmail"
                     value={values.ownerEmail}
                     onChange={handleChange}
                     onBlur={handleBlur}
                     autoComplete="off"
                  />
               </div>
               {errors.ownerEmail && touched.ownerEmail ? (
                  <p className="text-red-500 text-[1.4rem] errors block">
                     {errors.ownerEmail}
                  </p>
               ) : null}
            </div>



            <div className="md:ml-[1.5rem] lg:ml-[1rem] xl:ml-[1.8rem] mt-[1.5rem] w-[100%] md:w-[35rem] lg:w-[34rem] xl:w-[34rem]">
               <div className="input_bord_grad w-[100%] md:w-[35rem] lg:w-[34rem] xl:w-[34rem] mb-[0.2rem]">
                  <input type="text"
                     className="outline-none text-[1.6rem] md:text-[1.7rem] border-none w-[100%] rounded-[1.2rem] p-[0.8rem] font-['Inconsolata']"
                     placeholder="Enter creator email address"
                     name="creatorEmail"
                     value={values.creatorEmail}
                     onChange={handleChange}
                     onBlur={handleBlur}
                     autoComplete="off"
                  />
               </div>
               {errors.creatorEmail && touched.creatorEmail ? (
                  <p className="text-red-500 text-[1.4rem] errors block">
                     {errors.creatorEmail}
                  </p>
               ) : null}
            </div>



            <div className="md:ml-[1.5rem] lg:ml-[1rem] xl:ml-[1.8rem] mt-[1.5rem] w-[100%] md:w-[35rem] lg:w-[34rem] xl:w-[34rem]">
               <div className="input_bord_grad w-[100%] md:w-[35rem] lg:w-[34rem] xl:w-[34rem] mb-[0.2rem]">
                  <input type="text"
                     className="outline-none text-[1.6rem] md:text-[1.7rem] border-none w-[100%] rounded-[1.2rem] p-[0.8rem] font-['Inconsolata']"
                     placeholder="Enter owner wallet address"
                     name="ownerWalletAddress"
                     value={values.ownerWalletAddress}
                     onChange={handleChange}
                     onBlur={handleBlur}
                     autoComplete="off"
                  />
               </div>
               {errors.ownerWalletAddress && touched.ownerWalletAddress ? (
                  <p className="text-red-500 text-[1.4rem] errors block">
                     {errors.ownerWalletAddress}
                  </p>
               ) : null}
            </div>



            <div className="md:ml-[1.5rem] lg:ml-[1rem] xl:ml-[1.8rem] mt-[1.5rem] w-[100%] md:w-[35rem] lg:w-[34rem] xl:w-[34rem]">
               <div className="input_bord_grad w-[100%] md:w-[35rem] lg:w-[34rem] xl:w-[34rem] mb-[0.2rem]">
                  <input type="text"
                     className="outline-none text-[1.6rem] md:text-[1.7rem] border-none w-[100%] rounded-[1.2rem] p-[0.8rem] font-['Inconsolata']"
                     placeholder="Enter creator wallet address"
                     name="creatorWalletAddress"
                     value={values.creatorWalletAddress}
                     onChange={handleChange}
                     onBlur={handleBlur}
                     autoComplete="off"
                  />
               </div>
               {errors.creatorWalletAddress && touched.creatorWalletAddress ? (
                  <p className="text-red-500 text-[1.4rem] errors block">
                     {errors.creatorWalletAddress}
                  </p>
               ) : null}
            </div>



            <div className="md:ml-[1.5rem] lg:ml-[1rem] xl:ml-[1.8rem] mt-[1.5rem] w-[100%] md:w-[35rem] lg:w-[34rem] xl:w-[34rem]">
               <div className="input_bord_grad w-[100%] md:w-[35rem] lg:w-[34rem] xl:w-[34rem] mb-[0.2rem]">
                  <input type="text"
                     className="outline-none text-[1.6rem] md:text-[1.7rem] border-none w-[100%] rounded-[1.2rem] p-[0.8rem] font-['Inconsolata']"
                     placeholder="Enter lowest price in BNB"
                     name="minimumPrice"
                     value={values.minimumPrice}
                     onChange={handleChange}
                     onBlur={handleBlur}
                     autoComplete="off"
                  />
               </div>
               {errors.minimumPrice && touched.minimumPrice ? (
                  <p className="text-red-500 text-[1.4rem] errors block">
                     {errors.minimumPrice}
                  </p>
               ) : null}
            </div>



            <div className="md:ml-[1.5rem] lg:ml-[1rem] xl:ml-[1.8rem] mt-[1.5rem] w-[100%] md:w-[35rem] lg:w-[34rem] xl:w-[34rem]">
               <div className="input_bord_grad w-[100%] md:w-[35rem] lg:w-[34rem] xl:w-[34rem] mb-[0.2rem]">
                  <input type="text"
                     className="outline-none text-[1.6rem] md:text-[1.7rem] border-none w-[100%] rounded-[1.2rem] p-[0.8rem] font-['Inconsolata']"
                     placeholder="Enter highest price in BNB"
                     name="maximumPrice"
                     value={values.maximumPrice}
                     onChange={handleChange}
                     onBlur={handleBlur}
                     autoComplete="off"
                  />
               </div>
               {errors.maximumPrice && touched.maximumPrice ? (
                  <p className="text-red-500 text-[1.4rem] errors block">
                     {errors.maximumPrice}
                  </p>
               ) : null}
            </div>




         </div>
         <div className="flex justify-center mb-[1.2rem]">
            <button type="submit" className="bg-blue-500  hover:bg-blue-700  text-white font-normal text-[18px] font-['Inconsolata'] sm:font-semibold  px-12  py-[0.7rem] sm:px-14 rounded-full">
               Search
            </button>
         </div>
      </form>
   </div>)
}

export default memo(Filter);