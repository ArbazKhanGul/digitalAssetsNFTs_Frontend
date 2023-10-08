import ClipLoader from "react-spinners/ClipLoader"
import { useState, axios, useEffect } from "../"
import { toast } from "react-toastify";
import { AiOutlineClose } from "react-icons/ai";
import { ethers } from "ethers";
import { useRouter } from "next/router";
import { CountdownCircleTimer } from 'react-countdown-circle-timer'
import ipfsUpload from '../../utils/copyIPFSsameContent';
import ipfsUploadDifferent from "../../utils/copyIPFSdifferentContent";

function FeeUpdate({ creationFee, contentFee, values, userinfo, setLoader ,loader,copyrightPrice,tokenId,tokenURI}) {

    let router=useRouter();
    const [path, setPath] = useState("");

    return (
        <>
            <div className="px-[13px]  justify-center text-black items-center flex overflow-x-hidden h-fit fixed inset-0 z-50 outline-none focus:outline-none top-[1.5rem]">
                <div className="relative  my-6 w-[90%] sm:w-[70%] md:w-[60%] lg:w-[50%] ">

                    <div className="border-0 rounded-[1rem] shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        <div className="bg-[#1E2346] flex items-start justify-between py-5 px-[2rem] border-b border-solid border-slate-200 rounded-t-[1rem]">
                            <h3 className="text-[2rem]  tracking-wider font-semibold text-[white]">
                                NFT Creation Fee
                            </h3>
                            <button
                                className="p-1 ml-auto bg-transparent border-0 text-black  float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                onClick={() => {
                                    setLoader(false);
                                }}                  >
                                <AiOutlineClose className="text-[white] text-[2.2rem]"></AiOutlineClose>


                            </button>
                        </div>
                        {/*body*/}

                        {loader == "confirm" ? <>
                            <div className="text-[1.8rem] mt-[1rem] py-[0.2rem] font-normal px-[2rem] text-[#3E3B3B] font-['Inconsolata']">
                                Before proceeding, please note the following fees associated with using our NFT platform:
                                <br />
                                <span className="font-bold text-[2rem]">Creation Fee:</span> To create an NFT, there is a charge of {ethers.utils.formatUnits(creationFee, 'ether')} BNB.
                                <br />
                                <span className="font-bold text-[2rem]">Content Usage Fee:</span> Based on your content usage, a fee of {ethers.utils.formatUnits(contentFee, 'ether')} BNB will be applied
                                <br />

                         {copyrightPrice > 0  && <><span className="font-bold text-[2rem]">Copyright Fee:</span> When taking copyright from the owner of an NFT, there is an additional fee of {ethers.utils.formatUnits(copyrightPrice, 'ether')} BNB.
                                 <br /></> 
                          }

                                Please confirm that you accept these charges before continuing.

                            </div>

                            <div className="flex px-[2rem] space-x-[1rem] mb-[1rem] mt-[0.5rem]">
                                <div className="pb-[1rem]">

                                    <button className="bg-[#1E40AF]  hover:bg-[#38398b]  text-white font-normal text-[1.7rem] sm:font-semibold py-[0.7rem] px-14 rounded-full font-['Inconsolata'] tracking-wider"
                                        type="submit"
                                        onClick={async () => {
                                            setLoader("Uploading nft content on ipfs 0%");
                                            const num1 = ethers.BigNumber.from(creationFee);
                                             const num2 = ethers.BigNumber.from(contentFee);

                                            if (values.nftContentUse == "yes") {
                                                setLoader("Uploading nft content metadata...")
                                                await ipfsUpload(tokenURI, tokenId, setLoader, setPath, userinfo,num1.add(num2))
                                            }
                                            else {
                                                await ipfsUploadDifferent(values, tokenURI, tokenId, setLoader, setPath,userinfo,num1.add(num2))
                                            }

                                        }}
                                    >
                                        Confirm
                                    </button>
                                </div>
                                <div className="pb-[1rem]">

                                    <button className="bg-[#1E40AF]  hover:bg-[#38398b]  text-white font-normal text-[1.7rem] sm:font-semibold py-[0.7rem] px-14 rounded-full font-['Inconsolata'] tracking-wider"
                                        type="submit"
                                        onClick={() => {
                                            setLoader(false);
                                        }}
                                    >
                                        Cancel
                                    </button>
                                </div>
                            </div>
                        </> : null}

                        {loader!="confirm" ?
                            (<>
                                <div className="p-[2rem]">

                                    <h2 className="font-['Inconsolata']font-semibold text-[1.8rem] ">
                                        {loader}
                                    </h2>
                                </div>

                                {loader != "Token transaction verification..." ?
                                    <div className="flex justify-center  -mt-[4px]">

                                        <ClipLoader
                                            color={"#09a4ad"}
                                            loading={loader}
                                            cssOverride={{ marginBottom: "20px" }}
                                            size={110}
                                            aria-label="Loading Spinner"
                                            data-testid="loader"
                                        />
                                    </div> : ""}
                            </>) : ""}

                            {loader == "Token transaction verification..." ? (<div className="flex justify-center pb-[2rem]">
                <CountdownCircleTimer
                  isPlaying={loader == "Token transaction verification..."}
                  duration={8}
                  size={95}
                  strokeWidth={5}
                  colors={['#7f8c8d', '#95a5a6']}
                  colorsTime={[5, 2]}
                  onComplete={() => {
                    router.push(`/individualnft/${path}`);
                  }}
                >
                  {({ remainingTime }) => <h2 className="font-['Inconsolata'] text-[2rem] ">{remainingTime}</h2>}
                </CountdownCircleTimer></div>) : ""
              }


                    </div>

                </div>
            </div >
            <div className="opacity-25 fixed inset-0 z-40 bg-black -top-[3rem]"></div>
        </>


    )
}

export default FeeUpdate
