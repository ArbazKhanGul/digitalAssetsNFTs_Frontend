import ClipLoader from "react-spinners/PuffLoader";
import {memo} from "react";
import IndividualTranaction from "./individualtransaction"

const Transaction=({error,data,isLoading}) => {
    console.log("🚀 ~ file: index.js:8 ~ Transaction ~ data:", data)


    return (
        <div className="mt-[1rem]">
    <div className="color w-fit text-[2.6rem] font-semibold font-['Inconsolata'] sm:text-[3rem] md:text-[3.2rem] ]">
    Latest Transactions About This NFT:
    </div>

    <div className="space-y-[2.5rem] flex-col justify-center">
       
{  (!error && data && data.length > 0) ?
        <div className="  hidden sm:flex sm:justify-around items-start sm:items-center overflow-hidden">
        

            <div className="ml-[3rem] text-[2.3rem] sm:text-[2rem]  md:text-[2.5rem] w-[20%] pl-[2rem] box-border font-medium colgrad">Seller</div>
            <div className=" text-[2.3rem] sm:text-[2rem]  md:text-[2.5rem] text-center  colgrad flex flex-col font-medium w-[28%] mr-[5%]"> Buyer
             </div>
             <div className=" text-[2.3rem] sm:text-[2rem]  md:text-[2.5rem] text-center colgrad flex flex-col font-medium ml-[4%] w-[22%]">Price
             </div>
        </div>:""}
        {
            isLoading ? ( <div className="flex justify-center  mt-[4px]">

            <ClipLoader
              color={"#30DCBA"}
              cssOverride={{ marginBottom: "20px" }}
              size={110}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>):null
        }


{error ? (<div className="text-[red] text-[1.7rem] sm:text-[2rem]  md:text-[2.3rem] w-fit font-['Inconsolata'] mt-[0.5rem]">
                                Error in getting Transactions Please try later! </div>) : ""
                            }

                            {
                                (!error && data && !isLoading) ?

                                    data?.map((data, index) => {
                                        return <IndividualTranaction key={index} num={index+1} sellerName={data?.sellerName} sellerProfile={data?.sellerProfile} sellerId={data?.sellerId} ownerId={data?.ownerId} ownerName={data?.ownerName} ownerProfile={data?.ownerProfile} price={data?.price}></IndividualTranaction> 

                                    }) : ""
                            }

{data?.length==0 && !error && !isLoading? (
<div className="text-[#cbcdcf]  text-[1.7rem] sm:text-[2rem] md:text-[3rem] w-fit font-['Inconsolata'] mt-[1.5rem]">
                            OOPS!   Nothing to show...</div>) : ""
                            }

    </div>

    </div>
    )
}

export default memo(Transaction);