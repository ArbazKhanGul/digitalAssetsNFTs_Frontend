
import Select from 'react-select';
import { useFormik } from "formik";
import { FeeUpdateSchema} from "../../schema/index"
import Binance from 'binance-api-node'
import ClipLoader from "react-spinners/ClipLoader"
import { useState, axios, useEffect } from "../"
import { toast } from "react-toastify";
import { AiOutlineClose } from "react-icons/ai";

const style = {
    control: (provided, state) => ({
        ...provided,
        boxShadow: "none",
        border: "none"
    }),
}



function FeeUpdate({setFee}) {

    const [showModal, setShowModal] = useState(false);
    const [checker, setChecker] = useState("detail");


    let initialValues = {
        currency: "",
        amount: "",
    };

    const [dollar, setDollar] = useState(0);
    const [amountInBnb, setamountInBnb] = useState(0);



    const BNBPrice = async () => {
        try {
            const client = Binance()
            let ticker = await client.prices({ symbol: 'BNBUSDT' });
                        setDollar(parseFloat(ticker?.BNBUSDT));
        }
        catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        BNBPrice();
    
        // Call the function every 1 minute (60,000 milliseconds)
        const interval = setInterval(() => {
            BNBPrice();
        }, 60000);
    
        // Clean up the interval when the component unmounts
        return () => clearInterval(interval);
    }, []);

    const {
        values,
        errors,
        touched,
        handleSubmit,
        handleChange,
        handleBlur,
        setTouched,
        setFieldValue, resetForm
    } = useFormik({

        initialValues,
        validationSchema: FeeUpdateSchema,

        onSubmit: async (values, action) => {

            setChecker('confirm');
            if (values.currency == "bnb") {
                setamountInBnb(values.amount);
            }
            else if (values.currency == "dollar") {
                setamountInBnb(((1 / dollar) * values.amount).toFixed(4));
            }

        }
    })


    async function updateFee() {

        try {
            setChecker("loader");

            const response = await axios.post("/dashboardfeeupdate", { newCreationFee:amountInBnb });

            if (response?.data?.status == "success") {
                setChecker("detail");
                setShowModal(false);
                setFee(amountInBnb)
                toast.success("NFT creation Fee Updated Successfully", {
                    position: "top-center",
                });
            }

        } catch (error) {
            setChecker("detail");
            setShowModal(false);
            if (error?.response?.data == undefined) {
                toast.error("Server Error Please Try Later", {
                    position: "top-center",
                });
            } else {
                toast.error(error?.response?.data.message, {
                    position: "top-center",
                });
            }
        }

    }


    return (
        <>


            <button className={` text-[#ffffffff] font-normal text-[1.5rem] sm:font-semibold py-2 px-[3.5rem]  rounded-[1.8rem] font-['Inconsolata'] tracking-wider  cursor-pointer bg-[#1E40AF]  hover:bg-[#4042aa]`}
                onClick={() => setShowModal(true)}
                >
                    Update
                                    </button>

            {showModal ? (
                <>
                    <div className="px-[13px]  justify-center text-black items-center flex overflow-x-hidden h-fit absolute inset-0 z-50 outline-none focus:outline-none top-[1rem]">
                        <div className="relative  my-6 w-[90%] sm:w-[70%] md:w-[60%] lg:w-[50%] xl:w-[40%]">

                            <div className="border-0 rounded-[1rem] shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                                <div className="bg-[#1E2346] flex items-start justify-between py-5 px-[2rem] border-b border-solid border-slate-200 rounded-t-[1rem]">
                                    <h3 className="text-[2rem]  tracking-wider font-semibold text-[white]">
                                     NFT Creation Fee
                                    </h3>
                                    <button
                                        className="p-1 ml-auto bg-transparent border-0 text-black  float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                        onClick={() => {
                                            setShowModal(false)
                                            setChecker("detail")
                                            setFieldValue("currency", "")
                                            setFieldValue("amount", "")
                                            setTouched({}, false)
                                        }}                  >
                                        <AiOutlineClose className="text-[white] text-[2.2rem]"></AiOutlineClose>


                                    </button>
                                </div>
                                {/*body*/}
                                {checker == "detail" ? <>

                                    <div className="text-[#1E40AF] font-bold font-['Inconsolata'] text-[2rem] px-[1.8rem] py-[0.5rem]">Current Price:</div>

                                    <div className="text-[1.8rem] text-[#0f0e0e] font-semibold font-['Inconsolata'] flex space-x-[1.5rem] px-[2rem]">
                                        <span>1 BNB</span>
                                        <span>&asymp;</span>
                                        <span>${dollar && dollar} </span>
                                    </div>


                                    <form className='w-[100%]' onSubmit={handleSubmit}>

                                        <div className="w-[100%] px-[2rem]">
                                            <div className="text-[#1E40AF] font-bold font-['Inconsolata'] text-[2rem]  pt-[1rem]">Select Currency:</div>

                                            <div className="mt-[0.4rem] w-[100%] relative ">
                                                <div className="input_bord_grad mb-[0.2rem]!w-[100%]">
                                                    <Select className=" p-[0.2rem] text-[1.6rem] md:text-[1.7rem] font-['Inconsolata']  tracking-wider outline-none"
                                                        defaultValue={{ "label": "Select Currency", "value": "currenct" }}
                                                        name="currency"
                                                        onChange={(e) => {
                                                            setFieldValue("currency", e.value)
                                                        }}
                                                        options={[
                                                            { "label": "BNB", "value": "bnb" },
                                                            { "label": "dollar", "value": "dollar" },
                                                        ]}
                                                        styles={style}
                                                        id="long-value-select"
                                                        instanceId="long-value-select"
                                                    />
                                                </div>
                                                {errors.currency && touched.currency ? (
                                                    <p className="text-[#ff4d4d] font-semibold text-[1.4rem] errors block">
                                                        {errors.currency}
                                                    </p>
                                                ) : null}

                                                <p className="text-[#1b1c1f] text-[1.3rem] font-medium pt-[0.3rem]  w-[100%]">
                                                    if you select dollar then you have to enter amount in dollar i.e for how many dollars you want to buy BNB
                                                    but if your select BNB then you have to enter amount in BNB i.e how many BNB you needed
                                                </p>

                                            </div>
                                        </div>



                                        <div className="w-[100%] px-[2rem] pb-[1.3rem]">
                                            <div className="text-[#1E40AF] font-bold font-['Inconsolata'] text-[2rem]  pt-[1rem]">Enter Amount:</div>

                                            <div className="mt-[0.5rem] w-[100%] relative ">
                                                <div className="input_bord_grad mb-[0.2rem]!w-[100%]">
                                                    <input type="text"
                                                        className="outline-none !text-black text-[1.6rem] md:text-[1.7rem] border-none w-[100%] rounded-[1.2rem] p-[0.8rem] font-['Inconsolata']"
                                                        placeholder="Amount.."
                                                        name="amount"
                                                        value={values.amount}
                                                        onChange={handleChange}
                                                        onBlur={handleBlur}
                                                        autoComplete="off"
                                                    />
                                                </div>
                                                {errors.amount && touched.amount ? (
                                                    <p className="text-[#ff4d4d] font-semibold text-[1.4rem] errors block">
                                                        {errors.amount}
                                                    </p>
                                                ) : null}


                                            </div>
                                        </div>

                                        <div className="w-[100%] px-[2rem] pb-[2rem]">

                                            <button className="bg-[#1E40AF]  hover:bg-[#38398b]  text-white font-normal text-[1.7rem] sm:font-semibold py-[0.8rem] sm:px-14 rounded-[2rem] font-['Inconsolata'] tracking-wider"
                                                type="submit"

                                            >

                                                Fee Update

                                            </button>
                                        </div>
                                    </form>


                                </> : null}


                                {checker == "confirm" ? <>
                    <div className="text-[1.8rem] mt-[1rem] py-[1rem] font-normal px-[2rem] text-[#3E3B3B] font-['Inconsolata']">
                        Are you sure to set nft creation fee {amountInBnb} BNB ?
                    </div>

                    <div className="flex px-[2rem] space-x-[1rem] mb-[1rem]">
                        <div className="pb-[1rem]">

                            <button className="bg-[#1E40AF]  hover:bg-[#38398b]  text-white font-normal text-[1.8rem] sm:font-semibold py-[0.8rem] px-14 rounded-full font-['Inconsolata'] tracking-wider"
                                type="submit"
                                onClick={updateFee}
                            >
                                Confirm Buy
                            </button>
                        </div>
                        <div className="pb-[1rem]">

                            <button className="bg-[#1E40AF]  hover:bg-[#38398b]  text-white font-normal text-[1.8rem] sm:font-semibold py-[0.8rem] px-14 rounded-full font-['Inconsolata'] tracking-wider"
                                type="submit"
                                onClick={() => {
                                    resetForm()
                                    setChecker("detail")

                                }}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </> : null}

                                {checker == "loader" ? (
                                    <div className="flex justify-center  mt-[2rem]">

                                        <ClipLoader
                                            color={"#09a4ad"}
                                            cssOverride={{ marginBottom: "20px" }}
                                            size={140}
                                            aria-label="Loading Spinner"
                                            data-testid="loader"
                                        />
                                    </div>

                                ) : null}


                            </div>

                </div>
        </div >
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null
}
    </>

  )
}

export default FeeUpdate
