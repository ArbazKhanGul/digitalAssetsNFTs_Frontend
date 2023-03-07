import IndividualNFT from "./individualnft"
import {memo} from "react";
import ClipLoader from "react-spinners/PuffLoader";
import { useRouter } from "next/router";
import Binance from 'binance-api-node'
import {useState,useEffect} from "react";
import { ethers } from 'ethers'



const NFTPortion =({error,data,isLoading})=>{
    let router=useRouter();
    const[dollar,setDollar]=useState(0)

    const BNBPrice = async () => {
        try {
    
          const client = Binance()
          let ticker = await client.prices({ symbol: 'BNBUSDT' });
          setDollar(ticker?.BNBUSDT)
        }
        catch (error) {
          console.log(error)
        }
      }
    
      useEffect(() => {
          BNBPrice();
      }, [])
    
    return (<div>
        <div className="nft w-fit text-[2.7rem] ml-[2rem] sm:text-[3rem] md:text-[3.7rem] font-['DynaPuff'] mt-[1.2rem] sm:ml-[3.5rem] md:ml-[4rem]">
    Trending NFTs: 
    </div>
    <span className="colgrad text-[1.7rem] font-semibold  mt-[1.2rem] mx-[2.5rem] sm:mx-[4rem] md:mx-[4rem] block font-['Inconsolata']">(Click on any NFT to see his full detail and buying option)</span>

<div className={`mx-[3rem]  sm:mx-[4rem] ${data ?"flex flex-wrap mg jt":""}`}>


{/* {temp.map((value,index)=>{
            return(<IndividualNFT key={index} index={index} nftname={value.nftname} owner={value.owner} creator={value.creator} price={value.price} creationdate={value.creationdate} nfttext={value.nfttext}></IndividualNFT>)
        })
    } */}

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

{error ? (<div className=" text-[red] font-bold text-[1.7rem] sm:text-[2rem] md:text-[2.3rem] w-fit font-['Inconsolata'] mt-[0.5rem]">
                                Error in getting NFTs Please try later!</div>) : ""
                            }

                            {
                                (!error && data) ?
                                   data?.map((data, index) => {
                                        return <IndividualNFT key={index} index={index} nftname={data?.nftName} owner={data?.owner_email} creator={data?.creator_email} price={data?.price} creationdate={data?.createdAt} nfttext={data?.title} id={data?.tokenURI} priceDollar={(ethers.utils.formatUnits(data?.price.toLocaleString('fullwide', {useGrouping:false}), 18) * dollar).toFixed(2)}></IndividualNFT>
                                    }) : ""
                            }


{data?.length==0 && !error ? (<div className="text-[#cbcdcf]  text-[1.7rem] sm:text-[2rem] md:text-[3.3rem] w-fit font-['Inconsolata'] mt-[1.5rem]">
                            OOPS!   Nothing to show...</div>) : ""
                            }

</div>

<div className="mg flex justify-end my-[1.5rem] font-['Inconsolata']">
{/* <Button ></Button> */}
<button className="bg-blue-500  hover:bg-blue-700  text-white font-normal text-[1.8rem] sm:font-semibold  px-12  py-[1rem] sm:px-14 rounded-full font-['Inconsolata'] tracking-wider"
      onClick={() =>{router.push("/nfts/1")} }
     >
  More...
</button>

</div>
    </div>)
}

export default memo(NFTPortion);