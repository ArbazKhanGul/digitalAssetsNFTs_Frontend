import { useState } from "react";
import { useRouter } from 'next/router'
import Link from 'next/link'
import useCopyrightPagination from '../../utils/useCopyrightPagination';

import IndividualRequest from "./individualRequest";
import { AiOutlineClose } from "react-icons/ai";
import InfiniteScroll from 'react-infinite-scroll-component';
import PuffLoader from "react-spinners/PuffLoader";

function AllRequests({ setShowModal, nftName }) {

    const [state,setState]=useState("pending");


    // const { data, error,mutate ,isValidating} = useSWR(`/copyrightrequests/${nftName}`
    // // ?nftName=${nftData?.name}&nftId=${nftSellingData?._id}`
    // , fetcherCopyrightRequests);

    let router=useRouter();
    const [requester,setRequester]=useState("");

    const { data, error, isLoading, isReachedEnd, mutate, size, setSize } = useCopyrightPagination(nftName,requester,state);


    console.log("🚀 ~ file: allRequests.js:9 ~ AllRequests ~ data:", data)

    return (
        <>
            <div className="px-[13px] justify-center items-center flex overflow-x-hidden fixed inset-0 h-fit text-black   z-50 outline-none focus:outline-none  top-[3rem]  ">
                <div className="relative h-[90%]  my-6 w-[90%] sm:w-[85%] md:w-[68%] lg:w-[50%] ">

                    <div className="border-0  shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none rounded-[1rem]">
                        <div className="py-[2rem] bg-[#1E2346] text-white border-b-[0.1rem] border-[#c9c1c1] flex items-center justify-between  px-[2rem] border-solid rounded-t-[1rem]">
                            <h3 className="w-[30%] text-[2.3rem] tracking-wider font-semibold whitespace-nowrap">

                                Requests

                            </h3>


                            <div className="w-[70%] flex justify-center flex-col items-center ">
                <div className="reginp w-[70%]">
                  <input
                    type="text"

                    placeholder="Enter Requester Name..."
                    className="reginput !text-white"
                    name="requester"
                    value={requester}
                    onChange={(e)=>{setRequester(e.target.value)}}
                    autoComplete="off"
                  />
                </div>
              </div>



                            <button
                                className="p-1 ml-auto bg-transparent border-0 text-black  float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                onClick={() => {
                                    setShowModal(false)
                                }}                  >
                                <AiOutlineClose className="text-[red] text-[2.2rem]"></AiOutlineClose>


                            </button>
                        </div>
                        {/*body*/}

<div className="border-b-[0.1rem]  border-[#c9c1c1]  py-[1rem]">
<div className="flex sm:space-x-[1rem] mt-[1rem]  items-center mb-[0.5rem] flex-wrap ml-[1.5rem]">
        <h2 onClick={()=>setState("pending")} className={` text-[1.9rem] font-medium cursor-pointer  sm:ml-0 py-[0.5rem] px-[2.2rem] w-fit ${state=="pending"?"bg-[#1E40AF] text-[white] rounded-[2rem]":""}`}>Pending</h2>
        <h2 onClick={()=>setState("reapproval")} className={`text-[1.9rem] font-medium cursor-pointer  sm:ml-0 py-[0.5rem] px-[2.2rem] w-fit ${state=="reapproval"?"bg-[#1E40AF] text-[white] rounded-[2rem]":""}`}>Reapproval</h2>
        <h2 onClick={()=>setState("accept")} className={` text-[1.9rem] font-medium cursor-pointer py-[0.5rem] px-[2.2rem] w-fit ${state=="accept"?"bg-[#1E40AF] text-[white]  rounded-[2rem]":""}`}>Accepted</h2>
        <h2 onClick={()=>setState("completed")} className={` text-[1.9rem] font-medium cursor-pointer py-[0.5rem] px-[2.2rem] w-fit ${state=="completed"?"bg-[#1E40AF] text-[white] rounded-[2rem]":""}`}>Completed</h2>
        <h2 onClick={()=>setState("all")} className={` text-[1.9rem] font-medium cursor-pointer py-[0.5rem] px-[2.2rem] w-fit ${state=="all"?"bg-[#1E40AF] text-[white]  rounded-[2rem]":""}`}>All</h2>
  </div>
</div>
                        <div className="h-[40rem] overflow-x-auto" id="scrollableCopyright" >

                 {state=="reapproval" && <h2 className="text-[#f33333] text-[1.5rem] text-justify mx-[2.5rem]">Note: For reapproval, include requests where the owner initially accepted the user's copyright 
                    request. However, if the owner changes before the user fulfills the request, the new owner must reapprove it for the user
                     to proceed with the copyright request
                    </h2>}
                            <InfiniteScroll
                                next={() => {
                                    console.log("NExt scrolling")
                                    setSize(size + 1)
                                }}
                                hasMore={!isReachedEnd}

                                loader={<PuffLoader
                                    color={"#30DCBA"}
                                    loading={true}
                                    cssOverride={{ marginBottom: "20px", marginLeft: "25rem", marginTop: "4rem" }}
                                    size={90}
                                    aria-label="Loading Spinner"
                                    data-testid="loader"
                                />}

                                scrollableTarget="scrollableCopyright"

                                endMessage={<p className="text-[2.2rem] text-center py-[0.5rem] font-[Inconsolata] font-medium text-[#5f6668]">
                                    {error ? "Something went wrong" : data?.length ? "Reached to the end" : "Nothing to show"}</p>}
                                dataLength={data?.length ?? 0}
                            >

                                {data?.map((data, index) => {

                                    return (
                                        <Link href={`/copyright/${data?._id}`} key={index}>
                                            <a>
                                                <IndividualRequest key={index} num={index} data={data} /></a></Link>)
                                })}

                            </InfiniteScroll>


                        </div>
                    </div>


                </div>
            </div>
            <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>


        </>
    )
}

export default AllRequests;
