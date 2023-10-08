import ClipLoader from "react-spinners/PuffLoader";
import {memo} from "react";
import IndividualTranaction from "./individualtransaction"
import Image from "next/image";

const Transaction=({error,data,isLoading}) => {
    console.log("🚀 ~ file: index.js:8 ~ Transaction ~ data:", data)


    return (
        <div className="mt-[1rem]">
     <div className="text-[3rem]  flex font-['Inconsolata'] font-bold sm:text-[3rem] md:text-[3.3rem]  my-[1.2rem] ">
      <div className=" w-fit bord-bottom  flex justify-center"> 

      <div className="text-[#121212] w-fit "> Latest Transactions:</div>

         
        </div>
      
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
<div className="text-[#b9bbbd]  text-[1.7rem] sm:text-[2rem] md:text-[3rem] w-fit font-['Inconsolata'] mt-[0.5rem]">
                            OOPS!   Nothing to show...</div>) : ""
                            }

    </div>

    </div>
    )
}

export default memo(Transaction);