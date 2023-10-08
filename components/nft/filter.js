import { memo } from "react";
import Select from 'react-select';
import { filterNftSchema } from "../../schema/index"
import { useRouter, useState } from "../"
import { useFormik } from "formik";


const style = {
   control: (provided, state) => ({
       ...provided,
       boxShadow: "none",
       border: "none"
   }),
}
let options=[
   { "label": "original nfts", "value": "original" },
   { "label": "copies nfts", "value": "copy" },
   { "label": "both", "value": "both" },
]

const Filter = ({ showItems }) => {

   const router = useRouter();

   let initialValues = {
      nftName: router.query?.nftName?router.query?.nftName:"",
      ownerEmail: router.query?.ownerEmail?router.query?.ownerEmail:"",
      creatorEmail: router.query?.creatorEmail?router.query?.creatorEmail:"",
      ownerWalletAddress: router.query?.ownerWalletAddress?router.query?.ownerWalletAddress:"",
      creatorWalletAddress: router.query?.creatorWalletAddress?router.query?.creatorWalletAddress:"",
      minimumPrice: router.query?.minimumPrice?router.query?.minimumPrice:"",
      maximumPrice: router.query?.maximumPrice?router.query?.maximumPrice:"",
      nftType: router.query.nftType ? options.find(option => option.value === router.query.nftType):""
   };


   const {
      values,
      errors,
      touched,
      handleSubmit,
      handleChange,
      handleBlur,
      setFieldValue,resetForm
   } = useFormik({
      initialValues,
      validationSchema: filterNftSchema,
      onSubmit: async (values, action) => {
      console.log("🚀 ~ file: filter.js:45 ~ onSubmit: ~ values:", values)

         let parameter={...values};
          parameter.nftType=parameter.nftType?.value?parameter.nftType.value:"";

         let route = '?'

         for (let key in parameter) {
            if (parameter[key] !== '') {

               if (route.charAt(route.length - 1) === '?') {
                  route = route + key + '=' + parameter[key].trim().toLowerCase()
               }
               else {
                  route = route + '&' + key + '=' + parameter[key].trim().toLowerCase()
               }
            }
         }


         console.log("🚀 ~ file: filter.js ~ line 49 ~ onSubmit: ~ route", route)
         router.push(route);
      }
   })
      console.log("🚀 ~ file: filter.js:78 ~ Filter ~ parameter:", values)


   const handleSelect = (e) => {
      setFieldValue("nftType", e)
  }

   return (<div className={"bg-[#EDF2F7] rounded-[1.1rem] mt-[0.4rem]  overflow-hidden transition-all duration-700 " + (!showItems ? "max-h-0" : "max-h-[60rem]")}>
      <form onSubmit={handleSubmit} >
         <div className="transition-all duration-500 font-bold text-[#fd0a0adb] text-center text-[1.3rem] md:text-[1.5rem] pt-[1rem] px-[1rem] font-['Inconsolata']">If you don’t want to use any filter from below simply leave it empty</div>
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
               <Select className=" p-[0.2rem] text-[1.6rem] md:text-[1.7rem] font-['Inconsolata']  tracking-wider outline-none"
                                                    placeholder={"Select type of nft"}
                                                    name="nftType"
                                                    value={values.nftType}
                                                    onChange={handleSelect}
                                                    options={options}
                                                    styles={style}
                                                    id="long-value-select"
                                                    instanceId="long-value-select"
                                                />
               </div>
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
         <div className="flex justify-center space-x-4 mb-[1.2rem]">
            <button type="submit" className="bg-[#1b31c4] hover:bg-blue-800  text-white font-normal text-[18px] font-['Inconsolata'] sm:font-semibold  px-12  py-[0.7rem] sm:px-14 rounded-full">
               Search
            </button>
  
            <button type="button" onClick={()=>{
               setFieldValue("nftType","");
               router.push("/nfts")
               }
               } className="bg-[#1b31c4] hover:bg-blue-800  text-white font-normal text-[18px] font-['Inconsolata'] sm:font-semibold  px-12  py-[0.7rem] sm:px-14 rounded-full">
               Clear All
            </button>
         </div>
      </form>
   </div>)
}

export default Filter;