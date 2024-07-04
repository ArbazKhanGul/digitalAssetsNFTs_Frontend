import IndividualNFT from "./individualnft"
import {memo} from "react";
import ClipLoader from "react-spinners/PuffLoader";
import { useRouter } from "next/router";
import { ethers } from 'ethers'
import Image from "next/image";


const NFTPortion =({error,data,isLoading})=>{
    let router=useRouter();
 
    return (<div>
      <div className="text-[3rem]  flex  ml-[2rem] justify-center   font-['Inconsolata'] font-bold sm:text-[3rem] md:text-[3.6rem]  m-[1.2rem] ">
      <div className=" w-fit bord-bottom mx-[5rem] flex justify-center mt-[2rem]"> 

      <div className="text-[#121212] w-fit "> Top NFTs</div>

          <div className=" inline-block w-[3.5rem] h-[3.5rem]  md:w-[4rem] mt-[0.6rem] ml-[0.5rem]  md:h-[4rem] rounded-full relative">
            <Image
              className="rounded-full"
              src={`/topnft.png`}
              layout="fill"
            //   objectFit="cover"
            /></div>
        </div>
      
         </div>
    {/* <span className="text-[#0d133b] text-[1.7rem]  font-semibold  mt-[1.2rem] mx-[6rem] mb-[1rem]  block font-['Inconsolata']">(Click on any NFT to see his full detail and buying option)</span> */}

<div className={`mx-[3rem]  sm:mx-[4rem] ${data ?"flex flex-wrap mg jt":""}`}>



{
            isLoading  ? ( <div className="flex justify-center w-[100%]  mt-[4px]">

            <ClipLoader
              color={"#30DCBA"}
              cssOverride={{ marginBottom: "20px" }}
              size={110}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>):null
        }

{error ? (<div className=" text-[red] font-bold text-[1.7rem] sm:text-[2rem] md:text-[2.3rem] w-[100%] flex justify-center font-['Inconsolata'] mt-[0.5rem]">
                                Error in getting NFTs Please try later!</div>) : ""
                            }

                            {
                                (!error && data) ?
                                   data?.map((data, index) => {
                                        return <IndividualNFT data={data} original={data?.original} key={index} index={index} nftname={data?.nftName} owner={data?.owner_email} creator={data?.creator_email} price={data?.price} creationdate={data?.createdAt} type={data?.contentType} contentURI={data?.contentURI} tokenURI={data?.tokenURI} id={data?.tokenURI}></IndividualNFT>
                                    }) : ""
                            }


{data?.length==0 && !error ? (<div className="text-[#cbcdcf] text-center  text-[1.7rem] sm:text-[2rem] md:text-[3.3rem] w-[100%] flex justify-center font-['Inconsolata'] mt-[1.5rem]">
                            OOPS! Nothing to show...</div>) : ""
                            }

</div>

<div className="mg flex justify-end my-[1.5rem] ">
{/* <Button ></Button> */}
<button className="bg-[#032da1]  hover:bg-blue-900  text-white  text-[1.7rem] font-medium  px-12  py-[1rem] sm:px-14 rounded-full tracking-wider"
      onClick={() =>{router.push("/nfts/1")} }
     >
  More...
</button>

</div>
    </div>)
}

export default memo(NFTPortion);