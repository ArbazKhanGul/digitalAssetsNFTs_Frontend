import { useState } from "react";
import allowRequest from "../../utils/allowRequest"
import { AiOutlineClose } from "react-icons/ai";
import Select from 'react-select';
import { ethers } from "ethers";
import { useFormik } from "formik";
import { NFTCopyRightAllowSchema } from "../../schema/index"

const style = {
    control: (provided, state) => ({
        ...provided,
        boxShadow: "none",
        border: "none"
    }),
}

let options = [
    { "label": "BNB", "value": "bnb" },
    { "label": "Jagar (1Jagar = 10^-8 BNB)", "value": "jagar" }
]

function allowCopyrightModal({ setShowModal,nftid,setLoader,setCopyrightStatus,setCopyrightPrice }) {
console.log("🚀 ~ file: allowCopyrightModal.js:23 ~ allowCopyrightModal ~ nftid:", nftid)

    const [checker, setChecker] = useState("price");
    const [currency, setCurrency] = useState("");


    let initialValues = {
        nftCurrency: "bnb",
        CopyRightPrice: "",
    };

    const handleSelect = (e) => {
        setFieldValue("nftCurrency", e.value)
    }
    
    const {
        values,
        errors,
        touched,
        handleSubmit,
        handleChange,
        handleBlur,
        setFieldValue,
        setTouched
    } = useFormik({

        initialValues,
        validationSchema: NFTCopyRightAllowSchema,

        onSubmit: async (values, action) => {
        console.log("🚀 ~ file: allowCopyrightModal.js:53 ~ onSubmit: ~ values:", values)
            setChecker("confirm")

        }
    })

    return (
        <>
            <div className="px-[13px] justify-center items-center flex overflow-x-hidden h-fit fixed inset-0 z-50 outline-none focus:outline-none top-[4rem]">
                <div className="relative  my-6 w-[90%] sm:w-[70%] md:w-[60%] lg:w-[50%] xl:w-[40%]">

                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        <div className="flex items-start justify-between py-5 px-[2rem] border-b border-solid border-slate-200 rounded-t">
                            <h3 className="text-3xl font-semibold">

                                CopyRight Requests:

                            </h3>
                            <button
                                className="p-1 ml-auto bg-transparent border-0 text-black  float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                onClick={() => {
                                    setShowModal(false)
                                    setChecker("price")
                                    setFieldValue("nftCurrency", "")
                                    setFieldValue("CopyRightPrice", "")
                                    setTouched({}, false)

                                }}                  >
                                <AiOutlineClose className="text-[red] text-[2.2rem]"></AiOutlineClose>


                            </button>
                        </div>
                        {/*body*/}
                        <form
        onSubmit={handleSubmit} >
                            <div className={"relative pb-6 flex-auto"}>


                                {checker == "price" ? (<div>

                                    <div>
                                        <div className="mx-[1.5rem] lg:ml-[1rem] xl:mx-[1.8rem] mt-[1rem] w-[90%]  ">
                                            <h2 className="font-['Inconsolata'] text-[#0D1344E5'] text-[2.1rem] tracking-wider">Choose the currency</h2>

                                            <div className="mt-[1rem] w-[100%] relative ">
                                                <div className="input_bord_grad  mb-[0.2rem] !w-[100%]">

                                                    <Select className=" p-[0.2rem] text-[1.6rem] md:text-[1.7rem] font-['Inconsolata']  tracking-wider outline-none"

                                                        name="nftLanguage"
                                                        onChange={handleSelect}
                                                        options={options}
                                                        defaultValue={options[0]}
                                                        styles={style}
                                                        id="long-value-select"
                                                        instanceId="long-value-select"
                                                   
                                                   />

                                                </div>
                                           
                                            </div>
                                        </div>

                                        <div className="mx-[1.5rem] lg:ml-[1rem] xl:mx-[1.8rem] mt-[1rem] w-[90%]  ">

                                        <h2 className="font-['Inconsolata'] text-[red] text-[1.5rem]  mt-[0.5rem] ml-[0.3rem] text-justify font-medium tracking-wider ">
                                               If you don't want to set price for copyright leave price field empty.
                                            </h2>
                                            <h2 className="font-['Inconsolata'] text-[#0D1344E5'] text-[2rem] ml-[0.3rem] mb-[0.3rem] font-medium tracking-wider">Enter the Offered Money For CopyRights: </h2>
                                            <h2 className="font-['Inconsolata'] text-[black] text-[1.3rem] ml-[0.3rem] text-justify font-medium tracking-wider mb-[0.7rem]">

                                                (You are not allow to enter BNB in decimals like 0.1 if you want to enter 0.1 BNB then select jagar from
                                                currency and enter 10000000 because 1 jagar = 10^-8 BNB)
                                            </h2>

                                            <div className="input_bord_grad w-[100%]  mb-[0.2rem] ">
                                                <input type="number"
                                                    className=" outline-none text-[1.6rem] md:text-[1.7rem] border-none w-[100%] rounded-[1.2rem] p-[0.8rem] font-['Inconsolata']"
                                                    placeholder="Price..."
                                                    name="CopyRightPrice"
                                                    value={values.CopyRightPrice}
                                                    onChange={handleChange}
                                                    onBlur={handleBlur}
                                                    autoComplete="off"
                                                    min="0"
                                                />
                                            </div>

                                            {errors.CopyRightPrice && touched.CopyRightPrice ? (
                                                        <p className="text-red-500 text-[1.4rem] errors block">
                                                            {errors.CopyRightPrice}
                                                        </p>
                                                    ) : null}


                                        </div>



                                    </div>




                                </div>
                                ) : null}

                                {checker == "confirm" ? (
                                    <div>
                                        <div className="mx-[1.5rem] lg:ml-[1rem] xl:mx-[1.8rem] mt-[0.5rem] ">
                                            <h2 className="font-['Inconsolata'] text-[#0D1344E5']  text-[1.8rem] font-medium ml-[0.3rem] mb-[0.4rem] tracking-wider">
                                                Offered Money that is set by you is<span className="font-semibold"> {values.nftCurrency == "jagar" ?  values.CopyRightPrice ? values.CopyRightPrice: 0 : values.CopyRightPrice ? ethers.utils.parseUnits(values.CopyRightPrice.toString(), 8).toString() : 0}  Jagar </span>
                                                which is approximately   <span className="font-semibold">  {values.nftCurrency == "bnb" ? values.CopyRightPrice ? values.CopyRightPrice: 0 : values.CopyRightPrice ? ethers.utils.formatUnits(values.CopyRightPrice.toString(), 8).toString():0}  BNB </span> So please
                                                confirms it if it is right ...
                                            </h2>
                                        </div>


                                    </div>
                                ) : null}



                            </div>
                            <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">

                                {checker == "price" ?
                                    <button
                                        className="bg-blue-500 mr-[2rem]  hover:bg-blue-700  text-white font-normal text-[1.8rem] sm:font-semibold py-3 px-[3rem] rounded-full font-['Inconsolata'] tracking-wider"
                                    type="submit">
                                        Allow
                                    </button>
                                    : null
                                }

                                {checker == "confirm" ?
                                    <button
                                        className="bg-blue-500 mr-[2rem]  hover:bg-blue-700  text-white font-normal text-[1.8rem] sm:font-semibold py-3 px-[3rem] rounded-full font-['Inconsolata'] tracking-wider"
                                        type="button"
                                        onClick={() => allowRequest(nftid, values.CopyRightPrice ? values.nftCurrency == "bnb" ? ethers.utils.parseUnits(values.CopyRightPrice.toString(), 8).toString() : ethers.utils.parseUnits(values.CopyRightPrice.toString(), 8).toString():0,setLoader,setShowModal,setCopyrightStatus,setCopyrightPrice)}
                                    >
                                        Confirm
                                    </button>
                                    : null
                                }

                            </div>
                        </form>
                    </div>


                </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
    )
}

export default allowCopyrightModal
