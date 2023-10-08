import { Editor, useEffect, useState, Navbar, Footer, useRouter, axios, IndividualNFT, ToastContainer } from "../components"
import Select from 'react-select';
import { BuyCryptoSchema } from "../schema/index"
import { useFormik } from "formik";
import Binance from 'binance-api-node'
import { toast } from "react-toastify";
import { useStripe } from "@stripe/react-stripe-js"
import ClipLoader from "react-spinners/ClipLoader";
import Image from "next/image";

const style = {
    control: (provided, state) => ({
        ...provided,
        boxShadow: "none",
        border: "none"
    }),
}

const LuckyDraw = () => {

    const [loader, setLoader] = useState("buy");
    let stripe = useStripe()

    let initialValues = {
        currency: "",
        amount: "",
    };
    const [dollar, setDollar] = useState(0);

    const [amountInBnb, setamountInBnb] = useState(0);
    const [amountInDollar, setAmountInDollar] = useState(0);


    const BNBPrice = async () => {
        try {
            const client = Binance()
            let ticker = await client.prices({ symbol: 'BNBUSDT' });
            console.log("🚀 ~ file: buycrypto.js:31 ~ BNBPrice ~ ticker:", ticker)
            setDollar(parseFloat(ticker?.BNBUSDT) + 2);
        }
        catch (error) {
            console.log(error)
        }
    }

    // useEffect(() => {
    //     BNBPrice();
    
    //     // Call the function every 1 minute (60,000 milliseconds)
    //     const interval = setInterval(() => {
    //         BNBPrice();
    //     }, 60000);
    
    //     // Clean up the interval when the component unmounts
    //     return () => clearInterval(interval);
    // }, []);

    // const {
    //     values,
    //     errors,
    //     touched,
    //     handleSubmit,
    //     handleChange,
    //     handleBlur,
    //     setFieldValue, resetForm
    // } = useFormik({

    //     initialValues,
    //     validationSchema: BuyCryptoSchema,

    //     onSubmit: async (values, action) => {

    //         setLoader('confirm');
    //         if (values.currency == "bnb") {
    //             setAmountInDollar(dollar * values.amount);
    //             setamountInBnb(values.amount);
    //         }
    //         else if (values.currency == "dollar") {
    //             setAmountInDollar(values.amount);
    //             setamountInBnb(((1 / dollar) * values.amount).toFixed(4));
    //         }

    //     }
    // })


 
    return (<>
        <Navbar />
        <div className=" flex-1 flex flex-col min-h-[80vh] bg-[white]  py-[5rem] sm:p-[4rem] ">
        {/* #EAF5FF */}
 <div className="flex justify-between">
           <div className="w-[35%] profileback rounded-[0.5rem]">

<div className="border-b-[0.15rem] border-[#b2b8b9]  px-[2rem] py-[1rem]">
    
<div className="text-[2rem]  flex  font-['Inconsolata'] font-bold sm:text-[3rem] md:text-[2.8rem] ">
  <div className="w-fit flex "> 
    <div className="text-[#3c4fb9] w-fit "> Top Profiles</div>
    <div className=""></div>
    <div className="inline-block color-[#f5f6fa] w-[3.5rem] h-[4rem] sm:w-[3.2rem] md:w-[3.4rem] mt-[0.6rem] m sm:h-[3.2rem] md:h-[3.4rem] rounded-full relative">
      <Image
        className="rounded-full"
        src={`/profilepic.png`}
        layout="fill"
      />
    </div>  
  </div>
</div>
<p className="text-[#000000ce] text-[1.4rem] font-semibold ">Last 7 days</p>
</div>

<div >
    <div className="text-[white] justify-center py-[0.5rem] px-[0.5rem] flex bg-[#2a334e] mx-[1rem] mt-[0.5rem] text-[1.8rem] font-semibold"><div className="w-[55%]">Profile</div> <div className="w-[38%]">Sell Profit</div></div>
</div>


           </div>

<div className="w-[60%]">

<div className="text-[2rem]  flex  font-['Inconsolata'] font-bold sm:text-[3rem] md:text-[2.8rem] mb-[1rem] ">
  <div className="w-fit flex "> 
    <div className="text-[#3c4fb9] w-fit "> Latest Lucky Draw</div>
    <div className=""></div>
    <div className="inline-block color-[#f5f6fa] w-[3.5rem] h-[4rem] sm:w-[3.2rem] md:w-[3.4rem] mt-[0.6rem] m sm:h-[3.2rem] md:h-[3.4rem] rounded-full relative">
      {/* <Image
        className="rounded-full"
        src={`/lucky.png`}
        layout="fill"
      /> */}
    </div>  
  </div>
</div>


<div className="flex space-x-[4rem]">

 <div className="boxback px-[6rem] text-white h-[16rem] flex flex-col items-center justify-center w-fit text-[2.2rem] rounded-[2rem]">

<h2>Winning Price</h2>

<h2>0.004BNB</h2>


 </div>

 <div className="boxback  px-[6rem] text-white h-[16rem] flex flex-col items-center justify-center w-fit text-[2.2rem] rounded-[2rem]">

<h2>End Time</h2>

<h2>12 | 32 | 33</h2>


 </div>
</div>


<div className="profileback my-[2rem] rounded-[0.5rem] p-[1.5rem]">
<div className="text-[2rem]  flex  font-['Inconsolata'] font-bold sm:text-[3rem] md:text-[2.8rem] mb-[1rem] ">
  <div className="w-fit flex bord-bottomdark"> 
    <div className="text-[#3c4fb9] w-fit "> Last 3 Lucky Draw Winners:</div>
    <div className=""></div>
    {/* <div className="inline-block color-[#f5f6fa] w-[3.5rem] h-[4rem] sm:w-[3.2rem] md:w-[3.4rem] mt-[0.6rem] m sm:h-[3.2rem] md:h-[3.4rem] rounded-full relative">
      {/* <Image
        className="rounded-full"
        src={`/lucky.png`}
        layout="fill"
      /> */}
    {/* </div>   */} 
  </div>
</div>

<div >
    <div className="text-[white] justify-center py-[0.5rem] px-[0.5rem] flex bg-[#2a334e]  mt-[0.5rem] text-[1.8rem] font-semibold"><div className="w-[24%]">Profile</div> <div className="w-[24%] whitespace-nowrap">Win Amount</div> <div className="w-[24%]">Sell Profit</div> <div className="w-[24%]">Time</div></div>
</div>


</div>

</div>

</div>

<div className="profileback my-[2rem] rounded-[0.5rem] p-[1.5rem]">
<div className="text-[2rem]  flex  font-['Inconsolata'] font-bold sm:text-[3rem] md:text-[2.8rem] mb-[1rem] ">
  <div className="w-fit flex bord-bottomdark"> 
    <div className="text-[#3c4fb9]  w-fit ">Lucky Draw Selection Criteria:</div>
    {/* <div className="inline-block color-[#f5f6fa] w-[3.5rem] h-[4rem] sm:w-[3.2rem] md:w-[3.4rem] mt-[0.6rem] m sm:h-[3.2rem] md:h-[3.4rem] rounded-full relative">
      {/* <Image
        className="rounded-full"
        src={`/lucky.png`}
        layout="fill"
      /> */}
    {/* </div>    */}
  </div>
</div>

<div className="text-[1.6rem] text-[black] font-medium">
    <ul className="list-disc list-inside">
    <li>
    At the conclusion of the lucky draw entry period, which is determined by the designated time frame, we proceed to select the fortunate winner. From the top 10 profiles that have achieved the highest profits through NFT sales in the last 7 days, one user will be chosen randomly to receive the coveted lucky draw prize.
    </li>
    <li>
    This selection is made automatically through our platform's proprietary random code generator, ensuring fairness and transparency. The chosen user will be the beneficiary of the winning prize from the lucky draw.

    </li>

    <li>
    Rest assured, as soon as the winner is selected, they will be promptly notified through our notification system. Keep an eye on your notifications to find out if you're the lucky recipient of this round's lucky draw!
    </li>

    <li>
    We believe in the integrity of our process, and our commitment is to provide an impartial opportunity for all participants. Join us in the anticipation of discovering who the fortunate recipient will be this time!
    </li>
    </ul>
</div>


</div>
           </div>
        <Footer />

    </>
    )
}

export default LuckyDraw;