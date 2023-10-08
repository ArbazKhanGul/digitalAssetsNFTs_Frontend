import approval from "../../utils/approval";
import PulseLoader from "react-spinners/PulseLoader";
import { useState, useRouter } from "../"
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
// import {ethers} from 'ethers'
import { AiOutlineClose } from "react-icons/ai";

function Approval({ tokenId }) {

  const [showModal, setShowModal] = useState(false);
  const [loader, setLoader] = useState(false);
  let router = useRouter();

  return (
    <>
      <button
        className="bg-[#1b31c4] hover:bg-[#182ba8] xs:mr-[2rem] w-[100%] xs:w-fit py-4 xs:py-3 rounded-[1.3rem] xs:rounded-full   text-white font-normal text-[1.8rem] sm:font-semibold  px-[4rem]  font-['Inconsolata'] tracking-wider"
        type="button"
        onClick={() => { setShowModal(true) }}
        disabled={loader}
      >
        Selling Approval
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
              // colors="#d63031"
              // trailColor="#d63031"
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

              <div className="border-0 rounded-[1rem] shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                <div className="bg-[#1E2346] rounded-t-[1rem] flex items-start justify-between py-5 px-[2rem] border-b border-solid border-slate-200 ">
                  <h3 className="text-[2rem] text-[white] font-semibold">

                    Buy NFT

                  </h3>
                  <button
                    className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                    onClick={() => {
                      setShowModal(false)
                      setLoader(false)
                    }
                    }
                  >
                                        <AiOutlineClose className="text-[red] text-[2.2rem]"></AiOutlineClose>

      
                  </button>
                </div>
                {/*body*/}

                <div className={"relative pb-6 flex-auto"}>



                  <div>
                    <div className="mx-[1.5rem] lg:ml-[1rem] xl:mx-[1.8rem] mt-[0.5rem] ">
                      <h2 className="font-['Inconsolata'] text-[#0D1344E5'] text-justify  text-[1.8rem] font-medium ml-[0.3rem] mb-[0.4rem] tracking-wider">
                        For selling this nft first you have to approved that marketplace can transfer the ownership of this nft from your account address to marketplace contract address
                        but if you cancel the selling in future at any time then ownership transfer back to you
                      </h2>
                    </div>


                  </div>



                </div>
                <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                  <button
                    className=" bg-[#1b31c4] hover:bg-[#182ba8]  text-white font-normal text-[1.8rem] sm:font-semibold py-3 px-[3rem] rounded-full font-['Inconsolata'] tracking-wider"
                    type="button"
                    onClick={() => approval(tokenId, setShowModal, setLoader)}
                  >
                    Confirm
                  </button>

                  {/* <button
                    className="bg-red-500 mr-[2rem]  hover:bg-red-700  text-white font-normal text-[1.8rem] sm:font-semibold py-3 px-[3rem] rounded-full font-['Inconsolata'] tracking-wider"
                    type="button"
                    onClick={() => {
                      setShowModal(false)
                      setLoader(false)
                    }
                    }
                  >
                    Close
                  </button> */}

                </div>
              </div>

            </div>
          </div>
          <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
        </>
      ) : null}


    </>
  )
}

export default Approval;
