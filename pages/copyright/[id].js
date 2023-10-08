
import getServerSideProps from "../../utils/serverSideCopyright"
import useValidate from "../../utils/useValidate";
import { ethers } from "ethers";
import { toast } from "react-toastify";
import {
    Navbar, Footer, IndividualNFT as Individualnft, Sell, Head, Transactions, Approval, CancelSelling, Buy, Share, Meta, useState, useEffect, useRouter, Image, ToastContainer, useSWR, PuffLoader
    , axios, ConfirmDeleteModal, ConfirmStatusUpdateModal
} from "../../components"



const CopyRightNFT = ({ userinfo, data }) => {

    console.log("🚀 ~ file: [id].js:14 ~ CopyRightNFT ~ data:", data)


    const [loading, user, address] = useValidate(userinfo, "main");
    const [comment, setComment] = useState("");
    const [dataComment, setDataComment] = useState(data?.comments);
    const [error, setError] = useState("");
    const [loader, setLoader] = useState(false);
    const [confirm, setConfirm] = useState(false);

    const [statusUpdate, setStatusUpdate] = useState(false);


    const [status, setStatus] = useState(data?.status);

    let router = useRouter();



    const action = async (stat) => {
        try {
            setLoader(true);
            let signature = "";
            if (stat == "accept") {
                
                 toast.success("Please check your metamask", {
                    position: "top-center",
                });
                

                const tokenId = data.tokenId.toString();
                const nonce = data.requestNonce.toString();
                const requesterAddress = data.requestorAddress;
                const offeredMoney = data.offeredMoney.toString();
                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const signer = provider.getSigner();
                const message = ethers.utils.solidityKeccak256(
                    ['uint256', 'uint256', 'address', 'uint256'],
                    [tokenId, nonce, requesterAddress, offeredMoney]
                );
                try{
                signature = await signer.signMessage(ethers.utils.arrayify(message));
                }
                catch(error){
                    throw new Error("User rejected sign message")
                }

            }

             await axios.post("/copyrightaction", { id: data._id, comment, status: stat, signature });
            
            toast.success("Copyright status update successfully", {
                position: "top-center",
            });
            setStatusUpdate(false);
            setDataComment(comment)
            setLoader(false);
            setComment("");
            setError("");
            setStatus(stat);
        }
        catch (err) {
            console.log("🚀 ~ file: [id].js:72 ~ action ~ err:", err.message)
            setLoader(false);
            setStatusUpdate(false);
        toast.error(err.message, {
            position: "top-center",
          });
        
        }
    };

    //   const { data, error, isLoading } = useSWR(`/nftdata/${nftSellingData?.owner_email}?nftName=${nftData?.name}&nftId=${nftSellingData?._id}`, fetcherOwnerNft);

    return (
        <>

            {!loading ? (
                <div className="text-[1.6rem] ">
                    <ToastContainer pauseOnHover autoClose={5000} />
                </div>
            ) : (
                <>
                    <Navbar></Navbar>
                    <div className=" flex-1 flex justify-center items-center py-[4rem] sm:py-[6rem] sm:p-[6rem] rounded-lg">
                        <div className="bg-white shad  w-[95%] sm:w-[85%] md:w-[75%] lg:w-[57%] rounded-[2rem] ">

                        <div className="text-[3rem]  flex   font-['Inconsolata'] font-bold sm:text-[3rem] md:text-[3.2rem] mb-[1rem] ">
      <div className=" w-fit  mx-[3rem] flex justify-center mt-[1rem]"> 

      <div className="text-[#121212] w-fit ">Copyright Request:</div>

        </div>
      
         </div>
                            <div className="border-b-[0.2rem]  w-[100%]"></div>
                            <div className='pl-[2rem] pr-[1rem] sm:pl-[3rem] py-[2rem] space-y-[2.7rem]'>





                                {userinfo._id != data?.ownerId ? <div className="flex items-center space-x-[4rem] sm:space-x-[7rem]">
                                    <h3 className="text-[#545151] font-semibold text-[1.9rem] sm:text-[2rem]  tracking-wider">
                                        Owner Profile:
                                    </h3>
                                    <div onClick={() => { router.push(`/profile/${data?.ownerId}`) }} className={`flex  items-center space-x-[0.4rem] hover:text-[blue] py-[0.9rem] border-[#d4dee2] cursor-pointer`}>
                                        <div className=" w-[4.6rem] h-[4.6rem] sm:px-[1.3rem]">
                                            <div className=" w-[4.5rem] h-[4.5rem] rounded-full relative">
                                                <Image
                                                    src={`${process.env.SERVER_URL}/images/${data?.ownerProfile}`}
                                                    // src={'/cover.jpg'}
                                                    layout="fill"
                                                    className="rounded-full"
                                                />
                                            </div>
                                        </div>
                                        <div className="grow text-ellipsis overflow-x-hidden px-[0.7rem]">
                                            <h3 className="text-[#069EBF] decoration-[#069EBF] px-[0.7rem] decoration-1 underline underline-offset-1 text-[1.9rem] sm:text-[2.1rem]  font-medium">
                                                {data?.ownerName}
                                            </h3>
                                        </div>
                                    </div>
                                </div> : null
                                }





                                {userinfo._id == data?.ownerId ?
                                    <div className="flex items-center space-x-[8rem] sm:space-x-[11rem]">
                                        <h3 className="text-[#545151] font-semibold text-[1.9rem] sm:text-[2.1rem]  tracking-wider">
                                            Requester:
                                        </h3>
                                        <div onClick={() => { router.push(`/profile/${data?.ownerId}`) }} className={`flex  items-center space-x-[0.4rem] hover:text-[blue] border-[#d4dee2] cursor-pointer`}>
                                            <div className=" w-[4.6rem] h-[4.6rem] sm:px-[1.3rem]">
                                                <div className=" w-[4.5rem] h-[4.5rem] rounded-full relative">
                                                    <Image
                                                        src={`${process.env.SERVER_URL}/images/${data?.requestorProfile}`}
                                                        // src={'/cover.jpg'}
                                                        layout="fill"
                                                        className="rounded-full"
                                                    />
                                                </div>
                                            </div>
                                            <div className="grow text-ellipsis overflow-x-hidden px-[1rem]">
                                                <h3 className="text-[#069EBF] decoration-[#069EBF] decoration-1 underline underline-offset-1 text-[1.9rem] sm:text-[2.1rem]  font-medium">
                                                    {data?.requestorName}
                                                </h3>
                                            </div>
                                        </div>
                                    </div> : null}

                                <div className="flex items-center space-x-[4rem] sm:space-x-[8rem] ">
                                    <h3 className="text-[#545151] font-semibold text-[1.9rem] sm:text-[2.1rem]  tracking-wider">
                                        Offered Money:
                                    </h3>
                                    <h3 className="text-[#545151] text-[1.9rem] sm:text-[2.1rem]  font-medium">
                                        {ethers.utils.formatUnits(data?.offeredMoney.toLocaleString('fullwide', { useGrouping: false }), 18)} BNB
                                    </h3>
                                </div>



                                <div className="flex space-x-[4rem] sm:space-x-[8rem] ">
                                    <h3 className="text-[#545151] font-semibold text-[1.9rem] sm:text-[2.1rem]  tracking-wider">
                                        Requested NFT:
                                    </h3>
                                    <h3 onClick={() => { router.push(`/individualnft/${data?.nftId}`) }} className="w-fit text-[#069EBF] cursor-pointer decoration-[#069EBF] decoration-1 underline underline-offset-1 text-[1.9rem] sm:text-[2.1rem]  font-medium">
                                        {data?.nftName}
                                    </h3>
                                </div>


                                <div className="flex space-x-[3rem] sm:space-x-[7rem] ">
                                    <h3 className="text-[#545151] whitespace-nowrap font-semibold text-[1.9rem] sm:text-[2.1rem]  tracking-wider">
                                        Request Status:
                                    </h3>
                                    <h3 className="text-[#545151] text-[1.9rem] sm:text-[2.1rem]  font-medium">
                                        {status}

                                        {user._id == data?.requesterId && status=="reapproval" ? <span className="text-red-500 font-bold px-[0.5rem] text-[1.4rem] ">
                                         (Owner of your requested nft has been changed now wait untill new owner accept your request)
                                    </span> : null}

                                    </h3>
                                </div>

                                {userinfo._id == data?.ownerId && (status == "accept" || status == "reject" || status == "completed") ?
                                    <div className="flex items-center space-x-[9rem]">
                                        <h3 className="text-[#545151] font-semibold text-[1.9rem] sm:text-[2rem]  tracking-wider">

                                            {status == "accept" || status == "completed" ? "Accepted By:" : "Rejected By:"}

                                        </h3>
                                        <div onClick={() => { router.push(`/profile/${data?.actionUserId ?? data?.ownerId}`) }} className={`flex  items-center space-x-[0.4rem] hover:text-[blue]  border-[#d4dee2] cursor-pointer`}>
                                            <div className=" w-[4.6rem] h-[4.6rem] sm:px-[1.3rem]">
                                                <div className=" w-[4.5rem] h-[4.5rem] rounded-full relative">
                                                    <Image
                                                        src={`${process.env.SERVER_URL}/images/${data?.actionUserProfile ?? data?.ownerProfile}`}
                                                        // src={'/cover.jpg'}
                                                        layout="fill"
                                                        className="rounded-full"
                                                    />
                                                </div>
                                            </div>
                                            <div className="grow text-ellipsis overflow-x-hidden px-[1.4rem]">
                                                <h3 className="text-[#069EBF] decoration-[#069EBF] decoration-1 underline underline-offset-1 text-[1.9rem] sm:text-[2.1rem]  font-medium">
                                                    {data?.actionUserName ?? data?.ownerName}
                                                </h3>
                                            </div>
                                        </div>
                                    </div> : null}


                                <div className="flex flex-col">
                                    <h3 className="text-[#545151] font-semibold text-[1.9rem] sm:text-[2.1rem]  tracking-wider">
                                        Comments:
                                    </h3>

                                    {user._id != data?.ownerId || (user._id == data?.ownerId && status != "pending" && status != "reapproval" ) ?
                                        <div className="text-[rgb(203,205,207)]  text-[1.7rem] sm:text-[2rem] md:text-[2.2rem] w-fit ">

                                            {dataComment ? <div className="text-[#545151]">{dataComment}</div> : "No comment added Yet..."}

                                        </div> : null}


                                    {user._id == data?.ownerId && (status == "pending" || status=="reapproval")?
                                        <div className=" ">
                                            <div className="w-[100%] input_bord_grad flex justify-center  space-y-[0.5rem] mt-[0.8rem]">
                                                <textarea
                                                    name="nftDescription"
                                                    // value={values?.nftDescription}
                                                    onChange={(e) => { setComment(e.target.value) }}
                                                    // onBlur={handleBlur}
                                                    autoComplete="off"
                                                    placeholder="Enter comment..."
                                                    className="rounded-2xl resize-none outline-none h-[14rem]  w-[100%]  block placeholder:text-[#746e6e] p-[0.8rem] text-black text-[1.7rem] sm:text-[1.8rem] bg-transparent "
                                                ></textarea>

                                            </div>

                                            {error && !comment ? (
                                                <p className="text-red-500 text-[1.4rem] errors block">
                                                    {error}
                                                </p>
                                            ) : null}
                                        </div> : null}




                                </div>


                                <div>

                                    {user._id != data?.ownerId && status == "accept" ?
                                        <button
                                            className=" mr-[2rem]  bg-[#1b31c4] hover:bg-[#182ba8] text-white font-normal text-[1.8rem] sm:font-semibold py-3 px-[3rem] mb-[0.7rem] mt-[0.4rem] rounded-[1.3rem]  tracking-wider"
                                            type="button"
                                            onClick={() => {
                                                router.push(`/copynft/${data.nftId}`)
                                            }}
                                        >
                                            Create Copy
                                        </button> : null}

                                    {user._id != data?.ownerId && status != "completed" ?
                                        <button
                                            className=" mr-[2rem]  bg-[#1b31c4] hover:bg-[#182ba8] text-white font-normal text-[1.8rem] sm:font-semibold py-3 px-[3rem] mb-[0.7rem] rounded-[1.3rem]  tracking-wider"
                                            type="button"
                                            disabled={loader}
                                            onClick={() => {
                                                setConfirm(true)
                                            }}
                                        >
                                            {loader ? "Deleting..." : "Delete Request"}
                                        </button> : null}

                                    {user._id != data?.ownerId && (status == "reject" || status == "pending" || status=="reapproval" || status == "accept") ? <p className="text-red-500 font-bold text-[1.4rem] errors block">
                                        Delete this request in order to create new request for this nft
                                    </p> : null}


                                    {confirm ? <ConfirmDeleteModal id={data._id} setLoader={setLoader} setShowModal={setConfirm} nftid={data.nftId} /> : null}
                                    {statusUpdate ? <ConfirmStatusUpdateModal action={action} setShowModal={setStatusUpdate} status={statusUpdate} loader={loader}/> : null}


                                    {user._id == data?.ownerId && ( status == "pending" || status=='reapproval')   ?
                                        <><button
                                            className="bg-[#1b31c4] hover:bg-[#182ba8] mr-[2rem]    text-white font-normal text-[1.8rem] sm:font-semibold py-3 px-[3rem] mb-[0.7rem] mt-[0.4rem] rounded-[1.3rem]  tracking-wider"
                                            type="button"
                                            disabled={loader}
                                            onClick={() => {
                                                if (!comment) {
                                                    setError("Please add comment")
                                                    return;
                                                }
                                                setStatusUpdate("accept")
                                            }}
                                        >
                                            {loader && statusUpdate == "accept" ? "Accepting..." : "Accept"}
                                        </button> <button
                                            className=" mr-[2rem]  bg-[#1b31c4] hover:bg-[#182ba8]  text-white font-normal text-[1.8rem] sm:font-semibold py-3 px-[3rem] mb-[0.7rem] mt-[0.4rem] rounded-[1.3rem]  tracking-wider"
                                            type="button"
                                            disabled={loader}
                                            onClick={() => {
                                                if (!comment) {
                                                    setError("Please add comment")
                                                    return;
                                                }
                                                setStatusUpdate("reject");
                                            }}
                                        >
                                                {loader && statusUpdate == "reject" ? "Rejecting..." : "Reject"}
                                            </button></> : null}


                                </div>
                            </div>


                        </div>
                    </div>
                    <Footer />
                </>)
            }
        </>
    );
};

export default CopyRightNFT;

export { getServerSideProps };