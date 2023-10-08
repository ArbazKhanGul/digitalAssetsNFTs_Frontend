import { useState,useEffect } from "react";
import PuffLoader from "react-spinners/PuffLoader";
import { useRouter } from "next/router";
import AllRequests from "./allRequests";

import AllowCopyrightModal from "./allowCopyrightModal";
import CancelCopyrightModal from "./cancelCopyrightModal";
import RequestCopyrightModal from "./requestCopyrightModal";
import { ethers } from "ethers";


function CopyRight({ nftName,ownerAddress, ownercopyrightStatus,ownercopyrightPrice,nftid, copyrightStatus, isLoading, dataError, user, address, mutate, ownerId }) {

    const [showModal, setShowModal] = useState(false);
    const [requestModal, setRequestModal] = useState(false);
    const [cancelCopyRight, setCancelCopyRight] = useState(false);
    const [loader, setLoader] = useState(false);
    const [allowCopyright, setAllowCopyright] = useState(false);
    const [copyrightPermission, setCopyrightPermission] = useState(ownercopyrightStatus);
    console.log("🚀 ~ file: index.js:19 ~ CopyRight ~ copyrightPermission:", copyrightPermission)
    console.log("🚀 ~ file: index.js:20 ~ CopyRight ~ ownercopyrightStatus:", ownercopyrightStatus)
    const [copyrightPrice, setCopyrightPrice] = useState(ownercopyrightPrice);

    let router = useRouter();

    useEffect(() => {
        setCopyrightPermission(ownercopyrightStatus);
        setCopyrightPrice(ownercopyrightPrice);
      }, [ownercopyrightPrice,ownercopyrightStatus]);

      return (
        <>

<div className="text-[3rem]  flex font-['Inconsolata'] font-bold sm:text-[3rem] md:text-[3.3rem]  my-[1.2rem] ">
      <div className=" w-fit bord-bottom  flex justify-center"> 

      <div className="text-[#121212] w-fit "> Copyright:</div>

         
        </div>
      
         </div>

            {
                isLoading || loader ? (<div className="flex justify-center  mt-[4px]">

                    <PuffLoader
                        color={"#30DCBA"}
                        cssOverride={{ marginBottom: "20px" }}
                        size={110}
                        aria-label="Loading Spinner"
                        data-testid="loader"
                    />
                </div>) : null
            }


            {!isLoading && !loader ? <div className="flex spacing mb-[0.5rem] space-x-[9rem] sm:space-x-[18rem] lg:space-x-[9rem] xl:space-x-[16rem] w-[89.5vw] sm:w-auto">
                <div className="flex space-x-[2rem]">
                    <h3 className="text-[#545151]  text-[1.9rem] sm:text-[2.2rem] font-['Inconsolata'] font-bold">
                        Allowed:
                    </h3>
                    <p className="text-[#665f5fcf] pt-[0.1rem] font-['Inconsolata'] text-[2rem] font-bold tracking-wider overflow-x-scroll scrollbar-none">
                        {copyrightPermission=="allowed"?"Yes":"No"}
                    </p>
                </div>

                <div className="  flex space-x-[2rem] space-y-[0.2rem] sm:space-y-[0.2rem] grow overflow-hidden sm:grow-0 sm:overflow-visible">

                    <h3 className="text-[#545151] text-[1.9rem] sm:text-[2.2rem] font-['Inconsolata'] font-bold">
                        Owner Price:
                    </h3>

                    <p className="text-[#524f4fcf] pt-[0.1rem] font-['Inconsolata'] text-[2rem] font-bold tracking-wider overflow-x-scroll scrollbar-none ">
                        {copyrightPrice > 0 ? `${ethers.utils.formatUnits(copyrightPrice.toLocaleString('fullwide', { useGrouping: false }), 18)} BNB`:"Not Set"}
                    </p>
                </div>
            </div> : null}




            {!isLoading && !loader && !dataError && ownerAddress!=user?.address && !copyrightStatus && copyrightPermission=="allowed" && user && user?.address == address  ?
                <button
                    className="bg-[#1b31c4] hover:bg-[#182ba8] mr-[2rem] w-[100%] xs:w-fit    text-white font-normal text-[1.8rem] sm:font-semibold py-4 xs:py-3 px-[3rem] mb-[0.7rem] mt-[0.4rem] rounded-[1.3rem] font-['Inconsolata'] tracking-wider"
                    type="button"
                    disabled={loader}
                    onClick={() => {
                        setShowModal(true)
                    }}
                >
                    Request Copyrights
                </button> : null
            }

           {!isLoading && !loader && !dataError  && copyrightStatus?.status && user  && user?.address == address?
                <button
                    className="bg-[#1b31c4] hover:bg-[#182ba8] mr-[2rem] w-[100%] xs:w-fit    text-white font-normal text-[1.8rem] sm:font-semibold py-4 xs:py-3 px-[3rem] mb-[0.7rem] mt-[0.4rem] rounded-[1.3rem] font-['Inconsolata'] tracking-wider"
                    type="button"
                    disabled={loader}
                    onClick={() => {
                        router.push(`/copyright/${copyrightStatus?._id}`)
                    }}
                >
                    View Request Status
                </button> : null
            }


            {!isLoading && !loader && !dataError && ownerAddress==user?.address &&  copyrightPermission=="allowed" && user && user?.address == address ?
                <button
                    className="bg-[#1b31c4] hover:bg-[#182ba8] mr-[2rem] w-[100%] xs:w-fit py-4 xs:py-3 px-[3rem]   text-white font-normal text-[1.8rem] sm:font-semibold  mb-[0.7rem] mt-[0.4rem] rounded-[1.3rem] font-['Inconsolata'] tracking-wider"
                    type="button"
                    disabled={loader}
                    onClick={() => {
                        setCancelCopyRight(true)
                    }}
                >
                    Stop Copyrights
                </button> : null
            }


            {!isLoading && !loader && !dataError && ownerAddress==user?.address && copyrightPermission=="notallowed" && user && user?.address == address ?
                <button
                    className="bg-[#1b31c4] hover:bg-[#182ba8] mr-[2rem] w-[100%] xs:w-fit   text-white font-normal text-[1.8rem] sm:font-semibold py-4 xs:py-3 px-[3rem] mb-[0.7rem] mt-[0.4rem] rounded-[1.3rem] font-['Inconsolata'] tracking-wider"
                    type="button"
                    disabled={loader}
                    onClick={() => {
                        setAllowCopyright(true)
                    }}
                >
                    Allow Copyrights
                </button> : null
            }


            {!isLoading && !loader && !dataError &&  ownerAddress==user?.address && user?.address == address ?
                <button
                    className="bg-[#1b31c4] hover:bg-[#182ba8] mr-[2rem] w-[100%] xs:w-fit    text-white font-normal text-[1.8rem] sm:font-semibold py-4 xs:py-3 px-[3rem] mb-[0.7rem] mt-[0.4rem] rounded-[1.3rem] font-['Inconsolata'] tracking-wider"
                    type="button"
                    // disabled={loader}
                    onClick={() => {
                        setRequestModal(true)
                    }}
                >
                    View Requests
                </button>
                : null
            }


            {!isLoading && !loader && !dataError && user?.address == address && user && ownerAddress==user?.address?
                <button
                    className="bg-[#1b31c4] hover:bg-[#182ba8] mr-[2rem] w-[100%] xs:w-fit    text-white font-normal text-[1.8rem] sm:font-semibold py-4 xs:py-3 px-[3rem] mb-[0.7rem] mt-[0.4rem] rounded-[1.3rem] font-['Inconsolata'] tracking-wider"
                    type="button"
                    // disabled={loader}
                    onClick={() => {
                        router.push(`/copynft/${nftid}`)
                    }}
                >
                    Create Copy
                </button>
                : null
            }

            {requestModal ? <AllRequests setShowModal={setRequestModal} nftName={nftName} /> : null}

            {showModal ? <RequestCopyrightModal setShowModal={setShowModal} nftName={nftName} ownerId={ownerId} mutate={mutate} setLoader={setLoader}/>:null}

            { allowCopyright ? <AllowCopyrightModal setShowModal={setAllowCopyright} setCopyrightStatus={setCopyrightPermission} setCopyrightPrice={setCopyrightPrice} nftid={nftid} setLoader={setLoader}/>:""}

            {cancelCopyRight ? <CancelCopyrightModal setShowModal={setCancelCopyRight} nftid={nftid} setCopyrightStatus={setCopyrightPermission} setCopyrightPrice={setCopyrightPrice} setLoader={setLoader}/> : null}

        </>
    )
}

export default CopyRight
