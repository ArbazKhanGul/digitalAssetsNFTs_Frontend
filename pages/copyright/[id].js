
import getServerSideProps from "../../utils/serverSideCopyright"
import useValidate from "../../utils/useValidate";
import { toast } from "react-toastify";
import {
    Navbar, Footer, IndividualNFT as Individualnft, Sell, Head, Transactions, Approval, CancelSelling, Buy, Share, Meta, useState, useEffect, useRouter, ethers, Image, ToastContainer, useSWR, PuffLoader
    , axios, ConfirmDeleteModal,ConfirmStatusUpdateModal
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
            const response = await axios.post("/copyrightaction", { id: data._id, comment,status: stat });

            console.log("🚀 ~ file: [id].js:27 ~ action ~ response:", response)

            toast.success( "Copyright status update successfully" , {
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
            setLoader(false);
            console.log("🚀 ~ file: [id].js:29 ~ action ~ err:", err)

        }
    };

    //   const { data, error, isLoading } = useSWR(`/nftdata/${nftSellingData?.owner_email}?nftName=${nftData?.name}&nftId=${nftSellingData?._id}`, fetcherOwnerNft);

    return (
        <>

            {!loading ? (
                <div className="text-[1.6rem] font-['Inconsolata']">
                    <ToastContainer pauseOnHover autoClose={5000} />
                </div>
            ) : (
                <>
                    <Navbar></Navbar>
                    <div className="email flex-1 flex justify-center items-center py-[6rem] sm:p-[6rem] rounded-lg">
                        <div className="bg-white w-[57%] rounded-[2rem] ">

                            <div className="color px-[3rem] py-[1.5rem] tracking-wide w-fit text-[2.4rem] font-medium font-['Inconsolata'] sm:text-[3rem] md:text-[3rem] ]">
                                Copyrights Request:
                            </div>
                            <div className="border-b-[0.2rem]  w-[100%]"></div>
                            <div className='px-[3rem] py-[2rem] space-y-[2.7rem]'>





                                {userinfo._id != data?.ownerId ? <div className="flex items-center space-x-[7rem]">
                                    <h3 className="text-[#545151] font-semibold text-[1.9rem] sm:text-[2rem] font-['Inconsolata'] tracking-wider">
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
                                        <div className="grow text-ellipsis overflow-x-hidden px-[1.4rem]">
                                            <h3 className="text-[#069EBF] decoration-[#069EBF] decoration-1 underline underline-offset-1 text-[1.9rem] sm:text-[2.1rem] font-['Inconsolata'] font-medium">
                                                {data?.ownerName}
                                            </h3>
                                        </div>
                                    </div>
                                </div> : null
                                }





                                {userinfo._id == data?.ownerId ?
                                    <div className="flex items-center space-x-[2.5rem]">
                                        <h3 className="text-[#545151] font-semibold text-[1.9rem] sm:text-[2rem] font-['Inconsolata'] tracking-wider">
                                            Requester Profile:
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
                                            <div className="grow text-ellipsis overflow-x-hidden px-[1.4rem]">
                                                <h3 className="text-[#069EBF] decoration-[#069EBF] decoration-1 underline underline-offset-1 text-[1.9rem] sm:text-[2.1rem] font-['Inconsolata'] font-medium">
                                                    {data?.requestorName}
                                                </h3>
                                            </div>
                                        </div>
                                    </div> : null}

                                <div className="flex items-center space-x-[8rem] ">
                                    <h3 className="text-[#545151] font-semibold text-[1.9rem] sm:text-[2.1rem] font-['Inconsolata'] tracking-wider">
                                        Offered Money:
                                    </h3>
                                    <h3 className="text-[#545151] text-[1.9rem] sm:text-[2.1rem] font-['Inconsolata'] font-medium">
                                        {ethers.utils.formatUnits(data?.offeredMoney.toLocaleString('fullwide', { useGrouping: false }), 18)} BNB
                                    </h3>
                                </div>



                                <div className="flex space-x-[8rem] ">
                                    <h3 className="text-[#545151] font-semibold text-[1.9rem] sm:text-[2.1rem] font-['Inconsolata'] tracking-wider">
                                        Requested NFT:
                                    </h3>
                                    <h3 onClick={() => { router.push(`/individualnft/${data?.nftId}`) }} className="w-fit text-[#069EBF] cursor-pointer decoration-[#069EBF] decoration-1 underline underline-offset-1 text-[1.9rem] sm:text-[2.1rem] font-['Inconsolata'] font-medium">
                                        {data?.nftName}
                                    </h3>
                                </div>


                                <div className="flex space-x-[7rem] ">
                                    <h3 className="text-[#545151] font-semibold text-[1.9rem] sm:text-[2.1rem] font-['Inconsolata'] tracking-wider">
                                        Request Status:
                                    </h3>
                                    <h3 className="text-[#545151] text-[1.9rem] sm:text-[2.1rem] font-['Inconsolata'] font-medium">
                                        {status}
                                    </h3>
                                </div>

                                {userinfo._id == data?.ownerId && (status=="accept" || status=="reject" || status=="completed")?
                                    <div className="flex items-center space-x-[9rem]">
                                        <h3 className="text-[#545151] font-semibold text-[1.9rem] sm:text-[2rem] font-['Inconsolata'] tracking-wider">

                                {status=="accept" || status=="completed" ?"Accepted By:":"Rejected By:"}

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
                                                <h3 className="text-[#069EBF] decoration-[#069EBF] decoration-1 underline underline-offset-1 text-[1.9rem] sm:text-[2.1rem] font-['Inconsolata'] font-medium">
                                                     {data?.actionUserName ?? data?.ownerName}
                                                </h3>
                                            </div>
                                        </div>
                                    </div> : null}


                                <div className="flex flex-col">
                                    <h3 className="text-[#545151] font-semibold text-[1.9rem] sm:text-[2.1rem] font-['Inconsolata'] tracking-wider">
                                        Comments:
                                    </h3>

                                    {user._id != data?.ownerId || (user._id == data?.ownerId && status!="pending")?
                                        <div className="text-[rgb(203,205,207)]  text-[1.7rem] sm:text-[2rem] md:text-[2.2rem] w-fit font-['Inconsolata']">

                                            {dataComment? <div className="text-[#545151]">{dataComment}</div> : "No comment added Yet..."}

                                        </div> : null}


                                    {user._id == data?.ownerId && status=="pending"?
                                        <div className=" ">
                                            <div className="w-[100%] input_bord_grad flex justify-center  space-y-[0.5rem] mt-[0.8rem]">
                                                <textarea
                                                    name="nftDescription"
                                                    // value={values?.nftDescription}
                                                    onChange={(e) => { setComment(e.target.value) }}
                                                    // onBlur={handleBlur}
                                                    autoComplete="off"
                                                    placeholder="Enter comment..."
                                                    className="rounded-2xl resize-none outline-none h-[14rem]  w-[100%]  block placeholder:text-[#746e6e] p-[0.8rem] text-black text-[1.7rem] sm:text-[1.8rem] bg-transparent font-['Inconsolata']"
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
                                            className="bg-blue-500 mr-[2rem]  hover:bg-blue-700  text-white font-normal text-[1.8rem] sm:font-semibold py-3 px-[3rem] mb-[0.7rem] mt-[0.4rem] rounded-[1.3rem] font-['Inconsolata'] tracking-wider"
                                            type="button"
                                        onClick={() => {
                                              router.push(`/copynft/${data.nftId}`)
                                              }}
                                        >
                                            Create Copy
                                        </button> : null}

                                    {user._id != data?.ownerId && status!="completed" ?
                                        <button
                                            className="bg-blue-500 mr-[2rem]  hover:bg-blue-700  text-white font-normal text-[1.8rem] sm:font-semibold py-3 px-[3rem] mb-[0.7rem] rounded-[1.3rem] font-['Inconsolata'] tracking-wider"
                                            type="button"
                                            disabled={loader}
                                            onClick={() => {
                                                setConfirm(true)
                                            }}
                                        >
                                            {loader ? "Deleting..." : "Delete Request"}
                                        </button> : null}

                            {user._id != data?.ownerId && (status=="reject" || status=="pending")?<p className="text-red-500 text-[1.4rem] errors block">
                                                    Delete this request in order to create new request for this nft
                                                </p>:null}


                                    {confirm ? <ConfirmDeleteModal id={data._id} setLoader={setLoader} setShowModal={setConfirm} nftid={data.nftId} /> : null}
                                    {statusUpdate ? <ConfirmStatusUpdateModal action={action} setShowModal={setStatusUpdate} status={statusUpdate} /> : null}


                                    {user._id == data?.ownerId && status=="pending"?
                                        <><button
                                            className="bg-blue-500 mr-[2rem]  hover:bg-blue-700  text-white font-normal text-[1.8rem] sm:font-semibold py-3 px-[3rem] mb-[0.7rem] mt-[0.4rem] rounded-[1.3rem] font-['Inconsolata'] tracking-wider"
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
                                            {loader && statusUpdate=="accept" ?"Accepting...":"Accept"}
                                        </button> <button
                                            className="bg-blue-500 mr-[2rem]  hover:bg-blue-700  text-white font-normal text-[1.8rem] sm:font-semibold py-3 px-[3rem] mb-[0.7rem] mt-[0.4rem] rounded-[1.3rem] font-['Inconsolata'] tracking-wider"
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
                                                {loader && statusUpdate=="reject"?"Rejecting...":"Reject"}
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