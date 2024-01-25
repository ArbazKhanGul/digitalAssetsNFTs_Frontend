import { Editor, useEffect, useState, Navbar, Footer, useRouter, axios, IndividualNFT, ToastContainer } from "../components"
import Select from 'react-select';
import { BuyCryptoSchema } from "../schema/index"
import { useFormik } from "formik";
import Binance from 'binance-api-node'
import { toast } from "react-toastify";
import { useStripe } from "@stripe/react-stripe-js"
import ClipLoader from "react-spinners/ClipLoader";
import getServerSideProps from "../utils/cryptobuy/serverSideCryptoBuy"
import useValidate from '../utils/useValidate';

const style = {
    control: (provided, state) => ({
        ...provided,
        boxShadow: "none",
        border: "none"
    }),
}

const BuyCrypto = ({userinfo,data}) => {

    const [loader, setLoader] = useState("buy");

    const [loading, user] = useValidate(userinfo);

    let stripe = useStripe()

    let initialValues = {
        currency: "",
        amount: "",
    };
    const [dollar, setDollar] = useState(0);

    const [amountInBnb, setamountInBnb] = useState(0);
    const [amountInDollar, setAmountInDollar] = useState(0);
    const [transferError, setTransferError] = useState(false);



    const BNBPrice = async () => {
        try {
            const client = Binance()
            let ticker = await client.prices({ symbol: 'BNBUSDT' });
            console.log("🚀 ~ file: buycrypto.js:31 ~ BNBPrice ~ ticker:", ticker)
            setDollar(parseFloat(ticker?.BNBUSDT) + data.platformBnbIncrement);
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
        setFieldValue, resetForm
    } = useFormik({

        initialValues,
        validationSchema: BuyCryptoSchema,

        onSubmit: async (values, action) => {
        console.log("🚀 ~ file: buycrypto.js:78 ~ onSubmit: ~ values:", values)
               
        let bnbmoney=0;
        let dollarmoney=0;

            if (values.currency == "bnb") {
                bnbmoney=values.amount;
                dollarmoney=(dollar * values.amount).toFixed(2);

                setAmountInDollar(dollarmoney);
                setamountInBnb(bnbmoney);

            }
            else if (values.currency == "dollar") {

                dollarmoney=values.amount;
                bnbmoney=((1 / dollar) * values.amount).toFixed(4)
                setAmountInDollar(dollarmoney);
                setamountInBnb(bnbmoney);
            }

            if(bnbmoney <= data.maximumTransfer){
                setTransferError(false);
                setLoader('confirm');        
            }
            else{
                 setTransferError(true);
            }

        }
    })


    async function createCheckout() {

        try {
            setLoader("creating");

            const response = await axios.post("/create-checkout-session", { amount: amountInDollar, amountBNB: amountInBnb });

            if (response?.data?.status == "success") {
                console.log("🚀 ~ file: buycrypto.js:85 ~ createCheckout ~ response?.data:", response?.data)
                const { error } = stripe.redirectToCheckout({
                    sessionId: response.data.sessionId
                })
                if (error) {
                    toast.error("Error occurred in creating payment please try after some time", {
                        position: "top-center",
                    });
                    setLoader("buy");

                }

            }

        } catch (error) {
            setLoader("buy");
            console.log("🚀 ~ file: createnft.js ~ line 95 ~ onSubmit: ~ error", error)
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
        {loading && (<>
        <Navbar />
        <div className=" flex-1 flex min-h-[80vh] justify-center  py-[5rem] sm:p-[4rem] ">
            <div className="bg-white w-[47%] py-[0rem] rounded-[1.3rem] h-fit  shadow-[0_0_4px_1px_rgb(30,35,70,0.8)]">
                <div className="bg-[#1E2346] text-[2.6rem] rounded-t-[1.3rem] tracking-wider py-[1rem] px-[2rem] border-b-[0.17rem] border-[#D9D9D9]  font-semibold font-['Inconsolata']">
                    <span className="w-fit text-[white]">
                        Buy Binance Coin
                    </span>

                </div>

                {loader == "buy" ? <>

                    <div className="text-[black] font-bold font-['Inconsolata'] text-[2rem]  px-[1.8rem] pb-[0.5rem] pt-[1.5rem]">Current Price:</div>

                    <div className="text-[1.8rem] text-[#3E3B3B] font-semibold font-['Inconsolata'] flex space-x-[1.5rem] px-[2rem]">
                        <span>1 BNB</span>
                        <span>&asymp;</span>
                        <span>${dollar}</span>
                    </div>



                    <div className="text-[1.8rem] text-[#3E3B3B] font-semibold items-center font-['Inconsolata'] flex space-x-[0.6rem] ">
                        <div className="text-[black] font-bold font-['Inconsolata'] whitespace-nowrap text-[2rem]  pl-[1.8rem] pr-[0.7rem] py-[0.5rem]">Maximum Transfer Allow:</div>
                        <span className="whitespace-nowrap">{data.maximumTransfer} BNB &asymp;  ${dollar*data.maximumTransfer}
                        </span>

                    </div>
                    {/* <span className="text-[1.4rem] -mt-[0.5rem] font-normal px-[2rem] text-[#3E3B3B] font-['Inconsolata'] block"> This shows maximum bnb available in digital assets nfts wallet currently that you can transfer</span> */}

                    <form className='w-[100%] mb-[2.3rem]' onSubmit={handleSubmit}>

                        <div className="w-[100%] px-[2rem]">
                            <div className="text-[black] font-bold font-['Inconsolata'] text-[2rem]  pt-[1rem]">Select Currency:</div>

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
                                    <p className="text-red-500 text-[1.4rem] font-medium errors block">
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
                            <div className="text-[black] font-bold font-['Inconsolata'] text-[2rem] pt-[1rem]">Enter Amount:</div>

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
                                    <p className="text-red-500 text-[1.4rem] font-medium errors block">
                                        {errors.amount}
                                    </p>
                                ) : null}


                            </div>
                        </div>




                        <div className="w-[100%] px-[2rem] mb-[0.2rem]">

                            <button className="bg-[#1b31c4] hover:bg-[#182ba8]   text-white font-normal text-[1.8rem] sm:font-semibold py-[0.6rem] px-[3rem] rounded-full font-['Inconsolata'] tracking-wider"
                                type="submit"
                            //   disabled={loader}
                            >

                                Buy Coin

                            </button>
                        </div>

                        {transferError ? <div className="text-[red] font-medium text-[1.6rem] ml-[3rem]">You cannot transfer more than maximum transfer amount in one transaction</div>:null}
                    </form>

                </> : null}
                {loader == "confirm" ? <>
                    <div className="text-[1.8rem] py-[1rem] font-normal px-[2rem] text-[#3E3B3B] font-['Inconsolata']">
                        {/* Are you sure to pay <span className="font-bold"> {values.currency=="bnb"?dollar * values.amount:values.amount} </span> dollars to digitalnft platform for buying <span className="font-bold"> {values.currency=="bnb"?values.amount:((1 / dollar)* values.amount).toFixed(4)} </span> BNB (but it is not exact number of bnb transfer into your account because as BNB price is changes every second and also gas fee is deducted by binance smart chain for transfering coin so number of BNB transfer to your wallet can increase or decrease by small amount) */}
                        Are you sure to pay {amountInDollar} dollars to digitalnft platform for buying {amountInBnb} BNB (but it is not exact number of bnb transfer into your account because as BNB price is changes every second and also gas fee is deducted by binance smart chain for transfering coin so number of BNB transfer to your wallet can increase or decrease by small amount)
                    </div>

                    <div className="flex px-[2rem] space-x-[1rem]">
                        <div className="pb-[1rem]">

                            <button className="bg-[#1b31c4] hover:bg-[#182ba8]   text-white font-normal text-[1.8rem] sm:font-semibold py-[0.6rem] px-[3rem] rounded-full font-['Inconsolata'] tracking-wider"
                                type="submit"
                                //   disabled={loader}
                                onClick={createCheckout}
                            >
                                Confirm Buy
                            </button>
                        </div>
                        <div className="pb-[2rem]">

                            <button className="bg-[#1b31c4] hover:bg-[#182ba8]  text-white font-normal text-[1.8rem] sm:font-semibold py-[0.6rem] px-[4rem] rounded-full font-['Inconsolata'] tracking-wider"
                                type="submit"
                                onClick={() => {
                                    setLoader("buy")
                                    resetForm()
                                }}
                            //   disabled={loader}
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </> : null}

                {loader == "creating" ?
                    <div className="flex justify-center mt-[8px]">
                        <ClipLoader
                            color={"#09a4ad"}
                            // loading={loader}
                            cssOverride={{ marginBottom: "20px" }}
                            size={130}
                            aria-label="Loading Spinner"
                            data-testid="loader"
                        />
                    </div> : ""}

            </div>

        </div>
        <Footer />

    </>)}
    </>

    )
}

export default BuyCrypto;

export { getServerSideProps };