import Select from 'react-select';
import { filterTransactionSchema } from "../../../schema/index"
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




const Filter = ({ showItems}) => {
   let router=useRouter();
console.log("🚀 ~ file: transactionFilter.js:34 ~ Filter ~ router:", router)


   const [isInitialized, setIsInitialized] = useState(false);


   let initialValues = {
      nftName: "",
      buyerName: "",
      ownerName: "",
      tokenId: "",
      minimumPrice: "",
      maximumPrice:"",
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
                  route = route + key + '=' + parameter[key].toString().trim().toLowerCase()
               }
               else {
                  route = route + '&' + key + '=' + parameter[key].toString().trim().toLowerCase()
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



useEffect(() => {
   if (Object.keys(router.query).length !== 0 && !isInitialized) {
      console.log("running " ,router.query)
      setIsInitialized(true);
      setFieldValue("nftName", router.query.nftName || "");
      setFieldValue("buyerName", router.query.buyerName || "");
      setFieldValue("ownerName", router.query.ownerName || "");
      setFieldValue("tokenId", router.query.tokenId || "");
      setFieldValue("minimumPrice", router.query.minimumPrice || "");
      setFieldValue("maximumPrice", router.query.maximumPrice || "");
      setFieldValue("nftType", router.query.nftType ? options.find(option => option.value === router.query.nftType) : "");
      setFieldValue("transactionType", router.query.transactionType ? optionsTransaction.find(option => option.value === router.query.transactionType) : "");
   }
}, [router.query, isInitialized,setFieldValue]);




   return (<div className={"bg-[#EDF2F7] rounded-[1.1rem] mt-[0.4rem]  overflow-hidden transition-all duration-700 " + (!showItems ? "max-h-0" : "max-h-[60rem]")}>
      <form onSubmit={handleSubmit} >
         <div className="transition-all duration-500 font-bold text-[#f31111db] text-center text-[1.3rem] md:text-[1.5rem] pt-[1rem] px-[1rem] font-['Inconsolata']">If you don’t want to use any filter from below simply leave it empty</div>
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
                     placeholder="Enter buyer name"
                     name="buyerName"
                     value={values.buyerName}
                     onChange={handleChange}
                     onBlur={handleBlur}
                     autoComplete="off"
                  />
               </div>
               {errors.buyerName && touched.buyerName ? (
                  <p className="text-red-500 text-[1.4rem] errors block">
                     {errors.buyerName}
                  </p>
               ) : null}
            </div>



            <div className="md:ml-[1.5rem] lg:ml-[1rem] xl:ml-[1.8rem] mt-[1.5rem] w-[100%] md:w-[35rem] lg:w-[34rem] xl:w-[34rem]">
               <div className="input_bord_grad w-[100%] md:w-[35rem] lg:w-[34rem] xl:w-[34rem] mb-[0.2rem]">
                  <input type="text"
                     className="outline-none text-[1.6rem] md:text-[1.7rem] border-none w-[100%] rounded-[1.2rem] p-[0.8rem] font-['Inconsolata']"
                     placeholder="Enter owner Name"
                     name="ownerName"
                     value={values.ownerName}
                     onChange={handleChange}
                     onBlur={handleBlur}
                     autoComplete="off"
                  />
               </div>
               {errors.ownerName && touched.ownerName ? (
                  <p className="text-red-500 text-[1.4rem] errors block">
                     {errors.ownerName}
                  </p>
               ) : null}
            </div>



            <div className="md:ml-[1.5rem] lg:ml-[1rem] xl:ml-[1.8rem] mt-[1.5rem] w-[100%] md:w-[35rem] lg:w-[34rem] xl:w-[34rem]">
               <div className="input_bord_grad w-[100%] md:w-[35rem] lg:w-[34rem] xl:w-[34rem] mb-[0.2rem]">
                  <input type="number"
                     min={"0"}
                     step="1"
                     className="outline-none text-[1.6rem] md:text-[1.7rem] border-none w-[100%] rounded-[1.2rem] p-[0.8rem] font-['Inconsolata']"
                     placeholder="Enter token id"
                     name="tokenId"
                     value={values.tokenId}
                     onChange={handleChange}
                     onBlur={handleBlur}
                     autoComplete="off"
                  />
               </div>
               {errors.tokenId && touched.tokenId ? (
                  <p className="text-red-500 text-[1.4rem] errors block">
                     {errors.tokenId}
                  </p>
               ) : null}
            </div>



            <div className="md:ml-[1.5rem] lg:ml-[1rem] xl:ml-[1.8rem] mt-[1.5rem] w-[100%] md:w-[35rem] lg:w-[34rem] xl:w-[34rem]">
               <div className="input_bord_grad w-[100%] md:w-[35rem] lg:w-[34rem] xl:w-[34rem] mb-[0.2rem]">
                  <input type="number"
                      min={"0"}
                     className="outline-none text-[1.6rem] md:text-[1.7rem] border-none w-[100%] rounded-[1.2rem] p-[0.8rem] font-['Inconsolata']"
                     placeholder="Enter minimum price"
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
                  <input type="number"
                      min={"0"}
                     className="outline-none text-[1.6rem] md:text-[1.7rem] border-none w-[100%] rounded-[1.2rem] p-[0.8rem] font-['Inconsolata']"
                     placeholder="Enter maximum price"
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
            <button type="submit" className="bg-[#1E40AF]  hover:bg-[#4042aa]  text-white font-normal text-[18px] font-['Inconsolata'] sm:font-semibold  px-12  py-[0.7rem] sm:px-14 rounded-full">
               Search
            </button>
  
            <button type="button" onClick={()=>{
               setFieldValue("transactionType","");
               setFieldValue("nftType","");
               router.push("/adminpanel/transactions")
               }
               } className="bg-[#1E40AF]  hover:bg-[#4042aa]  text-white font-normal text-[18px] font-['Inconsolata'] sm:font-semibold  px-12  py-[0.7rem] sm:px-14 rounded-full">
               Clear All
            </button>
         </div>
      </form>
   </div>)
}

export default Filter;