import Select from 'react-select';
import { filterTransactionSchema } from "../../schema/index"
import { useFormik } from "formik";
import {useRouter} from  "next/router";
import {useState,useEffect} from "react"
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

let optionsTransaction=[
   { "label": "create", "value": "create" },
   { "label": "sell", "value": "sell" },
   { "label": "all", "value": "all" },
]

const Filter = ({ showItems ,router}) => {

   // let router=useRouter()
   const [isInitialized, setIsInitialized] = useState(false);


   useEffect(() => {
      if (router.query && !isInitialized) {
         console.log("running")
         setIsInitialized(true);
         setFieldValue("nftName", router.query.nftName || "");
         setFieldValue("buyerEmail", router.query.buyerEmail || "");
         setFieldValue("sellerEmail", router.query.sellerEmail || "");
         setFieldValue("buyerWalletAddress", router.query.buyerWalletAddress || "");
         setFieldValue("sellerWalletAddress", router.query.sellerWalletAddress || "");
         setFieldValue("nftType", router.query.nftType ? options.find(option => option.value === router.query.nftType) : "");
         setFieldValue("transactionType", router.query.transactionType ? optionsTransaction.find(option => option.value === router.query.transactionType) : "");
      }
   }, [router.query, isInitialized]);



   let initialValues = {
      nftName: "",
      buyerEmail: "",
      sellerEmail: "",
      buyerWalletAddress: "",
      sellerWalletAddress: "",
      nftType: "",
      transactionType: ""
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
      validationSchema: filterTransactionSchema,
      onSubmit: async (values, action) => {
      console.log("🚀 ~ file: filter.js:45 ~ onSubmit: ~ values:", values)

         let parameter={...values};
          parameter.nftType=parameter.nftType?.value?parameter.nftType.value:"";
          parameter.transactionType=parameter.transactionType?.value?parameter.transactionType.value:"";
          

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


   const handleSelectNftType = (e) => {
      setFieldValue("nftType", e)
  }

  const handleSelectTransactionType = (e) => {
   setFieldValue("transactionType", e)
}

   return (<div className={"bg-[#EDF2F7] rounded-[1.1rem] mt-[0.4rem]  overflow-hidden transition-all duration-700 " + (!showItems ? "max-h-0" : "max-h-[60rem]")}>
      <form onSubmit={handleSubmit} >
         <div className="transition-all duration-500 text-[#FD2121DB] text-center text-[1.3rem] md:text-[1.5rem] pt-[1rem] px-[1rem] font-['Inconsolata']">If you don’t want to use any filter from below simply leave it empty</div>
         <div className="flex flex-wrap md:space-x-[1.5rem] md:justify-center lg:justify-center lg:mr-[0.6rem] xl:mr-[0rem] xl:justify-center lg:space-x-[1rem] xl:space-x-[1.8rem] px-[1.5rem] md:px-[1rem] pb-[1.5rem]">


            <div className="md:ml-[1.5rem] lg:ml-[1rem] xl:ml-[1.8rem] mt-[1.5rem] w-[100%] md:w-[35rem] lg:w-[34rem] xl:w-[34rem]">
               <div className="input_bord_grad w-[100%] md:w-[35rem] lg:w-[34rem] xl:w-[34rem] mb-[0.2rem]">
                  <input type="text"
                     className="outline-none text-[1.6rem] md:text-[1.7rem] border-none w-[100%] rounded-[1.2rem] p-[0.8rem] font-['Inconsolata']"
                     placeholder="Enter Nft Name"
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
                                                    onChange={handleSelectNftType}
                                                    options={options}
                                                    styles={style}
                                                    id="long-value-select"
                                                    instanceId="long-value-select"
                                                />
               </div>
            </div>


            <div className="md:ml-[1.5rem] lg:ml-[1rem] xl:ml-[1.8rem] mt-[1.5rem] w-[100%] md:w-[35rem] lg:w-[34rem] xl:w-[34rem]">
               <div className="input_bord_grad w-[100%] md:w-[35rem] lg:w-[34rem] xl:w-[34rem] mb-[0.2rem]">
               <Select className=" p-[0.2rem] text-[1.6rem] md:text-[1.7rem] font-['Inconsolata']  tracking-wider outline-none"
                                                    placeholder={"Select type of Transaction"}
                                                    name="transactionType"
                                                    value={values.transactionType}
                                                    onChange={handleSelectTransactionType}
                                                    options={optionsTransaction}
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
                     placeholder="Enter buyer email address"
                     name="buyerEmail"
                     value={values.buyerEmail}
                     onChange={handleChange}
                     onBlur={handleBlur}
                     autoComplete="off"
                  />
               </div>
               {errors.buyerEmail && touched.buyerEmail ? (
                  <p className="text-red-500 text-[1.4rem] errors block">
                     {errors.buyerEmail}
                  </p>
               ) : null}
            </div>



            <div className="md:ml-[1.5rem] lg:ml-[1rem] xl:ml-[1.8rem] mt-[1.5rem] w-[100%] md:w-[35rem] lg:w-[34rem] xl:w-[34rem]">
               <div className="input_bord_grad w-[100%] md:w-[35rem] lg:w-[34rem] xl:w-[34rem] mb-[0.2rem]">
                  <input type="text"
                     className="outline-none text-[1.6rem] md:text-[1.7rem] border-none w-[100%] rounded-[1.2rem] p-[0.8rem] font-['Inconsolata']"
                     placeholder="Enter seller email address"
                     name="sellerEmail"
                     value={values.sellerEmail}
                     onChange={handleChange}
                     onBlur={handleBlur}
                     autoComplete="off"
                  />
               </div>
               {errors.sellerEmail && touched.sellerEmail ? (
                  <p className="text-red-500 text-[1.4rem] errors block">
                     {errors.sellerEmail}
                  </p>
               ) : null}
            </div>



            <div className="md:ml-[1.5rem] lg:ml-[1rem] xl:ml-[1.8rem] mt-[1.5rem] w-[100%] md:w-[35rem] lg:w-[34rem] xl:w-[34rem]">
               <div className="input_bord_grad w-[100%] md:w-[35rem] lg:w-[34rem] xl:w-[34rem] mb-[0.2rem]">
                  <input type="text"
                     className="outline-none text-[1.6rem] md:text-[1.7rem] border-none w-[100%] rounded-[1.2rem] p-[0.8rem] font-['Inconsolata']"
                     placeholder="Enter buyer wallet address"
                     name="buyerWalletAddress"
                     value={values.buyerWalletAddress}
                     onChange={handleChange}
                     onBlur={handleBlur}
                     autoComplete="off"
                  />
               </div>
               {errors.buyerWalletAddress && touched.buyerWalletAddress ? (
                  <p className="text-red-500 text-[1.4rem] errors block">
                     {errors.buyerWalletAddress}
                  </p>
               ) : null}
            </div>



            <div className="md:ml-[1.5rem] lg:ml-[1rem] xl:ml-[1.8rem] mt-[1.5rem] w-[100%] md:w-[35rem] lg:w-[34rem] xl:w-[34rem]">
               <div className="input_bord_grad w-[100%] md:w-[35rem] lg:w-[34rem] xl:w-[34rem] mb-[0.2rem]">
                  <input type="text"
                     className="outline-none text-[1.6rem] md:text-[1.7rem] border-none w-[100%] rounded-[1.2rem] p-[0.8rem] font-['Inconsolata']"
                     placeholder="Enter seller wallet address"
                     name="sellerWalletAddress"
                     value={values.sellerWalletAddress}
                     onChange={handleChange}
                     onBlur={handleBlur}
                     autoComplete="off"
                  />
               </div>
               {errors.sellerWalletAddress && touched.sellerWalletAddress ? (
                  <p className="text-red-500 text-[1.4rem] errors block">
                     {errors.sellerWalletAddress}
                  </p>
               ) : null}
            </div>








         </div>
         <div className="flex justify-center space-x-4 mb-[1.2rem]">
            <button type="submit" className="bg-blue-500  hover:bg-blue-700  text-white font-normal text-[18px] font-['Inconsolata'] sm:font-semibold  px-12  py-[0.7rem] sm:px-14 rounded-full">
               Search
            </button>
  
            <button type="button" onClick={()=>{
               setFieldValue("nftType","");
               router.push("/nfts")
               }
               } className="bg-blue-500  hover:bg-blue-700  text-white font-normal text-[18px] font-['Inconsolata'] sm:font-semibold  px-12  py-[0.7rem] sm:px-14 rounded-full">
               Clear All
            </button>
         </div>
      </form>
   </div>)
}

export default Filter;