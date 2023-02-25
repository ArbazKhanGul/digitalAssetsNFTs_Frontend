
import Select from 'react-select';
import { useFormik } from "formik";
import { NFTSellSchema } from "../../schema/index"
import PulseLoader from "react-spinners/PulseLoader";
import { ethers } from "ethers";
import { useState, axios, useRouter, useEffect } from "../"
import sell from "../../utils/sell"
import { toast } from "react-toastify";
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import { AiOutlineClose } from "react-icons/ai";
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



function Sell({ nftHash, tokenId }) {
  console.log("🚀 ~ file: sell.js:28 ~ Sell ~ nftHash", nftHash)
  console.log("🚀 ~ file: sell.js:28 ~ Sell ~ tokenId", tokenId)

  const [showModal, setShowModal] = useState(false);
  const [checker, setChecker] = useState("price");
  const [loader, setLoader] = useState(false);

  let router = useRouter();




  let initialValues = {
    nftCurrency: "",
    nftPrice: "",
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
    validationSchema: NFTSellSchema,

    onSubmit: async (values, action) => {

      setChecker("confirm")

    }
  })











  return (
    <>
      <button
        className="bg-blue-500 mr-[2rem]  hover:bg-blue-700  text-white font-normal text-[1.8rem] sm:font-semibold py-3 px-[4rem] rounded-full font-['Inconsolata'] tracking-wider"
        type="button"
        disabled={loader}
        onClick={() => setShowModal(true)}
      >
        Sell Now
      </button>


      {loader == "transaction waiting" ?
        <div className="flex justify-center items-center  !mt-[8px]">
          <h2 className='text-[2rem]'>Waiting For Transaction Verification </h2>
          <div className="w-fit h-fit">
            <PulseLoader
              color={"#30DCBA"}
              loading={loader}
              cssOverride={{ marginTop: "5px", marginLeft: "5px" }}
              size={8}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>      </div>
        : ""}




      {loader == "transaction confirmation" ? (
        <div className="flex justify-center items-center  !mt-[8px]">
          <h2 className='text-[2rem] mr-[1.2rem]'>Confirming Mined Transaction ....  </h2>
          <div className="w-fit h-fit">
            <CountdownCircleTimer
              isPlaying={loader == "transaction confirmation"}
              duration={8}
              size={40}
              strokeWidth={3}
              colors={['#e74c3c', '#d63031', '#d63031']}
              colorsTime={[5, 2, 0]}
              onComplete={() => {
                router.replace(router.asPath)
              }}
            >
              {({ remainingTime }) => <h2 className="font-['Inconsolata'] text-[2rem] ">{remainingTime}</h2>}
            </CountdownCircleTimer></div></div>) : ""
      }














      {showModal ? (
        <>
          <div className="px-[13px] justify-center items-center flex overflow-x-hidden h-fit absolute inset-0 z-50 outline-none focus:outline-none top-[4rem]">
            <div className="relative  my-6 w-[90%] sm:w-[70%] md:w-[60%] lg:w-[50%] xl:w-[40%]">

              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="flex items-start justify-between py-5 px-[2rem] border-b border-solid border-slate-200 rounded-t">
                  <h3 className="text-3xl font-semibold">

                    Sell NFT

                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black  float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => {
                      setShowModal(false)
                      setChecker("price")
                      setFieldValue("nftCurrency", "")
                      setFieldValue("nftPrice", "")
                      setTouched({}, false)
                    }}                  >
                    <AiOutlineClose className="text-[red] text-[2.2rem]"></AiOutlineClose>

                    {/* <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                      ×
                    </span> */}
                  </button>
                </div>
                {/*body*/}
                <form onSubmit={handleSubmit}>
                  <div className={"relative pb-6 flex-auto"}>


                    {checker == "price" ? (<div>

                      <div>
                        <div className="mx-[1.5rem] lg:ml-[1rem] xl:mx-[1.8rem] mt-[1rem] w-[90%]  ">
                          <h2 className="font-['Inconsolata'] text-[#0D1344E5'] text-[2rem] tracking-wider">Choose the currency</h2>

                          <div className="mt-[1rem] w-[100%] relative ">
                            <div className="input_bord_grad  mb-[0.2rem] !w-[100%]">

                              <Select className=" p-[0.2rem] text-[1.6rem] md:text-[1.7rem] font-['Inconsolata']  tracking-wider outline-none"
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
                        </div>

                        <div className="mx-[1.5rem] lg:ml-[1rem] xl:mx-[1.8rem] mt-[1rem] w-[90%]  ">

                          <h2 className="font-['Inconsolata'] text-[#0D1344E5'] text-[2rem] ml-[0.3rem] mb-[0rem] tracking-wider">Enter the NFT price </h2>
                          <h2 className="font-['Inconsolata'] text-[black] text-[1.2rem] ml-[0.3rem] text-justify font-medium tracking-wider mb-[0.7rem]">

                            (You are not allow to enter BNB in decimals like 0.1 if you want to enter 0.1 BNB then select jagar from
                            currency and enter 10000000 because 1 jagar = 10^-8 BNB)
                          </h2>

                          <div className="input_bord_grad w-[100%]  mb-[0.2rem] ">
                            <input type="number"
                              className=" outline-none text-[1.6rem] md:text-[1.7rem] border-none w-[100%] rounded-[1.2rem] p-[0.8rem] font-['Inconsolata']"
                              placeholder="Price..."
                              name="nftPrice"
                              value={values.nftPrice}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              autoComplete="off"
                              min="0"
                            />
                          </div>
                          {errors.nftPrice && touched.nftPrice ? (
                            <p className="text-red-500 text-[1.4rem] errors block">
                              {errors.nftPrice}
                            </p>
                          ) : null}
                        </div>


                        <div className="mx-[1.5rem] lg:ml-[1rem] xl:mx-[1.8rem] mt-[0.5rem] ">
                          <h2 className="font-['Inconsolata'] text-[#0D1344E5'] text-[red] text-[2rem] font-medium ml-[0.3rem] mb-[0.4rem] tracking-wider">Instructions:</h2>
                        </div>

                        <div className="mx-[1.5rem] lg:ml-[1rem] xl:mx-[1.8rem] mt-[0.2rem] ">
                          <h2 className="font-['Inconsolata'] text-[black] font-medium text-[1.6rem] ml-[0.3rem] mb-[0.4rem] tracking-wider">Please first read it carefully</h2>
                        </div>

                        <div className="mx-[1.5rem] lg:ml-[1rem] xl:mx-[1.8rem] mt-[0.5rem] ">
                          <h2 className="font-['Inconsolata'] text-[#0D1344E5'] text-[1.3rem] ml-[0.3rem] mb-[0.4rem] h-[10rem] text-justify overflow-y-auto tracking-wider pr-[0.3rem]">
                            10% from profit after selling nft goes to the creator of nft and 5% goes to goldenWords nft platform and remaining 85%
                            automatically transfer to your metamask account after selling but if you are also creator of this nft then only 5% from profit goes to goldenWords nft platform
                            and remaining all coin transfer to your metamask account but if you don't earn any profit after selling this nft means you sell it at lower price then you buy
                            or at same price then all coin is transfer to your account and no percentange is transfer to creator and platform. This percentange is deducted only in case of
                            you earn profit. For example if you set selling price 2 dollar and you purchase at 1 dollar  then 1 dollar is your profit then out of this 1 dollar 0.1 dollar goes to
                            nft creator account and 0.05 dollar goes to goldenWords nft platform and all remaining coin transfer to your account automatically when someone buy this nft but
                            if you set selling price 1 dollar or less than 1 dollar and you buy at 1 dollar then all coin is transfer to your account after selling and no coin is deducted because
                            you don't earn any profit from this. And one last thing if you just created this nft and not buy this from anyone then after someone buy this nft  5 percent goes to
                            goldenwords nft platform and remaining 95% transfer to your account.
                          </h2>

                        </div>
                      </div>




                    </div>
                    ) : null}

                    {checker == "confirm" ? (
                      <div>
                        <div className="mx-[1.5rem] lg:ml-[1rem] xl:mx-[1.8rem] mt-[0.5rem] ">
                          <h2 className="font-['Inconsolata'] text-[#0D1344E5']  text-[1.8rem] font-medium ml-[0.3rem] mb-[0.4rem] tracking-wider">
                            NFT price that is set by you for selling is<span className="font-semibold"> {values.nftCurrency == "jagar" ? values.nftPrice : ethers.utils.parseUnits(values.nftPrice.toString(), 8).toString()}  Jagar </span>
                            which is approximately   <span className="font-semibold">  {values.nftCurrency == "bnb" ? values.nftPrice : ethers.utils.formatUnits(values.nftPrice.toString(), 8).toString()}  BNB </span> So please
                            confirms it if it is right ...
                          </h2>
                        </div>


                      </div>
                    ) : null}

                    {checker == "loader" ? (
                      <div className="flex justify-center  mt-[2rem]">

                        <ClipLoader
                          color={"#30DCBA"}
                          // loading={loader}
                          cssOverride={{ marginBottom: "20px" }}
                          size={140}
                          aria-label="Loading Spinner"
                          data-testid="loader"
                        />
                      </div>

                    ) : null}


                  </div>
                  <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">

                    {checker == "price" ?
                      <button
                        className="bg-blue-500 mr-[2rem]  hover:bg-blue-700  text-white font-normal text-[1.8rem] sm:font-semibold py-3 px-[3rem] rounded-full font-['Inconsolata'] tracking-wider"
                        type="submit"
                      // onClick={() => setShowModal(true)}
                      >
                        Sell Now
                      </button>
                      : null
                    }
                    {checker == "confirm" ?
                      <button
                        className="bg-blue-500 mr-[2rem]  hover:bg-blue-700  text-white font-normal text-[1.8rem] sm:font-semibold py-3 px-[3rem] rounded-full font-['Inconsolata'] tracking-wider"
                        type="button"
                        onClick={() => sell(parseInt(tokenId), values.nftCurrency == "bnb" ? ethers.utils.parseUnits(values.nftPrice.toString(), 18) : ethers.utils.parseUnits(values.nftPrice.toString(), 8), router, setLoader, setShowModal, setChecker)}
                      >
                        Confirm
                      </button>
                      : null
                    }

                    {/* <button
                    className="bg-red-500 mr-[2rem]  hover:bg-red-700  text-white font-normal text-[1.8rem] sm:font-semibold py-3 px-[3rem] rounded-full font-['Inconsolata'] tracking-wider"
                    type="button"
                    onClick={() =>{ setShowModal(false)
                      setChecker("price")
                        setFieldValue("nftCurrency", "")
                        setFieldValue("nftPrice", "")
                        setTouched({}, false)
                    }
                    }
                  >
                    Close
                  </button> */}
                    {/* <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Save Changes
                  </button> */}
                  </div>
                </form>
              </div>


            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}
    </>

  )
}

export default Sell
