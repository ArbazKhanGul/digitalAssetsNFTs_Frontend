
import {useState} from 'react'
import { AiOutlineClose } from "react-icons/ai";
import Select from 'react-select';
import { useFormik } from "formik";
import { NFTPriceSchema } from "../../schema/index"
import { ethers } from "ethers";
import copyright from "../../utils/copyrights";



function RequestCopyrightModal({setShowModal,nftName,ownerId,mutate,setLoader}) {
    const [checker, setChecker] = useState("price");

    let initialValues = {
        // nftCurrency: "",
        price: "",
    };

    // const handleSelect = (e) => {
    //     setFieldValue("nftCurrency", e.value)
    // }
    
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
        validationSchema: NFTPriceSchema,

        onSubmit: async (values, action) => {

            setChecker("confirm")

        }
    })



  return (
    <>
    <div className="px-[13px] justify-center items-center flex overflow-x-hidden h-fit fixed inset-0 z-50 outline-none focus:outline-none top-[7rem]">
        <div className="relative  my-6 w-[90%] sm:w-[70%] md:w-[60%] lg:w-[50%] xl:w-[40%]">

            <div className="border-0 rounded-[1rem] shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="bg-[#1E2346] text-[white] rounded-t-[1rem] flex items-start justify-between py-[1.5rem] px-[2rem] border-b border-solid border-slate-200 ">
                    <h3 className="text-3xl font-semibold">

                        Request CopyRights:

                    </h3>
                    <button
                        className="p-1 ml-auto bg-transparent border-0 text-black  float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                        onClick={() => {
                            setShowModal(false)
                            setChecker("price")
                            setFieldValue("nftCurrency", "")
                            setFieldValue("price", "")
                            setTouched({}, false)
                        }}                  >
                        <AiOutlineClose className="text-[red] text-[2.2rem]"></AiOutlineClose>


                    </button>
                </div>
                {/*body*/}
                <form
                    onSubmit={handleSubmit}
                >
                    <div className={"relative pb-6 flex-auto"}>


                        {checker == "price" ? (<div>

                            <div>
                                {/* <div className="mx-[1.5rem] lg:ml-[1rem] xl:mx-[1.8rem] mt-[1rem] w-[90%]  ">
                                    <h2 className=" text-[#0D1344E5'] text-[2rem] tracking-wider">Choose the currency</h2>

                                    <div className="mt-[1rem] w-[100%] relative ">
                                        <div className="input_bord_grad  mb-[0.2rem] !w-[100%]">

                                            <Select className=" p-[0.2rem] text-[1.6rem] md:text-[1.7rem]   tracking-wider outline-none"
                                                defaultValue={"Select Currency"}
                                                name="nftLanguage"
                                                onChange={handleSelect}
                                                options={options}
                                                styles={style}
                                                id="long-value-select"
                                                instanceId="long-value-select"
                                            />

                                        </div>
                                        {errors.nftCurrency && touched.nftCurrency ? (
                                            <p className="text-red-500 text-[1.4rem] block">
                                                {errors.nftCurrency}
                                            </p>
                                        ) : null}

                                    </div>
                                </div> */}

                                <div className="mx-[1.5rem] lg:ml-[1rem] xl:mx-[1.8rem] mt-[1rem] w-[90%]  ">

                                    <h2 className=" text-[#0D1344E5'] text-[1.9rem] ml-[0.3rem] mb-[0.3rem] font-medium tracking-wider">Enter the Offered Money For CopyRights: </h2>
                                    {/* <h2 className=" text-[black] text-[1.2rem] ml-[0.3rem] text-justify font-medium tracking-wider mb-[0.7rem]">

                                        (You are not allow to enter BNB in decimals like 0.1 if you want to enter 0.1 BNB then select jagar from
                                        currency and enter 10000000 because 1 jagar = 10^-8 BNB)
                                    </h2> */}

                                    <div className="input_bord_grad w-[100%]  mb-[0.2rem] ">
                                        <input type="text"
                                            className=" outline-none text-[1.6rem] md:text-[1.5rem] border-none w-[100%] rounded-[1.2rem] p-[1rem] "
                                            placeholder="Price..."
                                            name="price"
                                            value={values.price}
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            autoComplete="off"
                                         
                                        />
                                    </div>
                                    {errors.price && touched.price ? (
                                        <p className="text-red-500 text-[1.4rem] errors block">
                                            {errors.price}
                                        </p>
                                    ) : null}
                                </div>



                            </div>




                        </div>
                        ) : null}

                        {checker == "confirm" ? (
                            <div>
                                <div className="mx-[1.5rem] lg:ml-[1rem] xl:mx-[1.8rem] mt-[0.5rem] ">
                                    <h2 className=" text-[#0D1344E5']  text-[1.8rem] font-medium ml-[0.3rem] mb-[0.4rem] tracking-wider">
                                    Offered Money that is set by you is
                                                   <span className="font-semibold">  {values.price }
                                                   {/* ? values.CopyRightPrice: 0 : values.CopyRightPrice ? ethers.utils.formatUnits(values.CopyRightPrice.toString(), 8).toString():0}  */}
                                                    BNB </span> So please 
                                                confirms it if it is right ...
                                    </h2>
                                </div>


                            </div>
                        ) : null}

                    </div>
                    <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">

                        {checker == "price" ?
                            <button
                                className="mr-[2rem] bg-[#1b31c4] hover:bg-[#182ba8]  text-white font-normal text-[1.7rem] sm:font-semibold py-3 px-[3rem] rounded-full  tracking-wider"
                                type="submit">
                                Request
                            </button>
                            : null
                        }
                        {checker == "confirm" ?
                            <button
                                className="bg-[#1b31c4] hover:bg-[#182ba8] mr-[2rem]   text-white font-normal text-[1.7rem] sm:font-semibold py-3 px-[3rem] rounded-full  tracking-wider"
                                type="button"
                                onClick={() => copyright(nftName, ethers.utils.parseUnits(values.price.toString(), 18).toString(), setLoader, setShowModal, setChecker, mutate, ownerId,values.price)}
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

export default RequestCopyrightModal
