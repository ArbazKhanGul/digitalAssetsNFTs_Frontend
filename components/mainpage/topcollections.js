import ClipLoader from "react-spinners/PuffLoader";
import {memo} from "react";
import IndividualCollections from "./IndividualCollection"
import useSWR from 'swr'
import { fetcherCollection } from "../../utils/fetcher";
import Image from "next/image";

const TopCollections=({error,data,isLoading})=>{

    // const { data, error,isLoading  } = useSWR("/getcollection/1", fetcherCollection);

// let temp=[{collectionname:"Collection1",volume:100,price:123,image:"/col.jpeg"},{collectionname:"Collection2",volume:100,price:123,image:"/col.jpeg"},{collectionname:"Collection3",volume:100,price:123,image:"/col.jpeg"},{collectionname:"Collection4",volume:100,price:123,image:"/col.jpeg"},{collectionname:"Collection5",volume:100,price:123,image:"/col.jpeg"},{collectionname:"Collection6",volume:100,price:123,image:"/col.jpeg"},{collectionname:"Collection7",volume:100,price:123,image:"/col.jpeg"},{collectionname:"Collection8",volume:100,price:123,image:"/col.jpeg"},{collectionname:"Collection9",volume:100,price:123,image:"/col.jpeg"}]



    return (
        <div className="mx-[2rem] md:mx-[3rem] lg:mx-[5rem] mb-[5rem]">
    <div className="text-[2.5rem] pb-[wrem] flex justify-center items-center  font-['Inconsolata'] font-bold sm:text-[3rem] md:text-[3.4rem] mb-[3.5rem] m-[1.2rem] ">
    <div className=" w-fit bord-bottom mx-[5rem] flex  mt-[2rem]"> 


<div className="text-[#121212] w-fit whitespace-nowrap"> Top Profiles</div>


    <div className=" inline-block w-[3.2rem] h-[3.3rem] sm:w-[3.2rem] md:w-[4rem] mt-[0.6rem] ml-[0.5rem] sm:h-[3.2rem] md:h-[4rem] rounded-full relative">
      <Image
        className="rounded-full"
        src={`/profilepic.png`}
        layout="fill"
      //   objectFit="cover"
      /></div>
  </div>

    </div>

    <div className="w-[100%]  overflow-x-auto rounded-tl-[1rem] font-['Inter'] ">    <div className="flex-col justify-center min-w-[700px] overflow-x-auto">

    {  (!error && data) ?
        <div className=" back_grad_row rounded-tr-[1rem] rounded-tl-[1rem]  font-medium flex sm:justify-around items-start sm:items-center overflow-hidden py-[1.2rem] sm:py-[0.8rem] ">
        

            <div className="ml-[4rem]   md:text-[2.3rem] w-[21%] sm:w-[23%] md:w-[25%] lg:w-[19%]  pl-[2rem] box-border colgradhead">Profile</div>
           
            <div className="whitespace-nowrap   text-center  colgradhead flex flex-col w-[18%] lg:w-[20%] "><span>Revenue</span>
             </div>

             <div className="hidden md:flex whitespace-nowrap   text-center colgradhead  flex-col w-[18%] lg:w-[20%] "><span>NFTs create</span>
             </div>

             <div className="hidden md:flex whitespace-nowrap   text-center colgradhead  flex-col w-[18%] lg:w-[20%] "><span>NFTs Sell</span>
             </div>

             <div className="hidden md:flex whitespace-nowrap    text-center colgradhead mr-[3rem]  flex-col w-[18%] lg:w-[20%] "><span>NFTs Buy</span>
             </div>

             <div className="md:hidden whitespace-nowrap    text-center colgradhead flex flex-col w-[18%] lg:w-[20%] "><span>create</span>
             </div>

             <div className="md:hidden whitespace-nowrap    text-center colgradhead flex flex-col w-[18%] lg:w-[20%] "><span> Sell</span>
             </div>

             <div className="md:hidden whitespace-nowrap    text-center colgradhead mr-[3rem] flex flex-col w-[18%] lg:w-[20%] "><span> Buy</span>
             </div>
        </div>:""}
        {
            isLoading ? ( <div className="flex justify-center w-[100%] mt-[4px]">

            <ClipLoader
              color={"#30DCBA"}
              cssOverride={{ marginBottom: "20px" }}
              size={110}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>):null
        }
{/* 
        {temp.map((value,index)=>{
            return(<IndividualCollections key={index} num={index+1} collectionname={value.collectionname} volume={value.volume} price={value.price} image={value.image}></IndividualCollections>)
        })} */}


{error ? (<div className="text-[red] text-[1.7rem] sm:text-[2rem] font-bold md:text-[2.3rem] w-fit font-['Inconsolata'] mt-[0.5rem] ml-[2rem] sm:ml-[3.5rem] md:ml-[5rem]">
                                Error in getting Collections Please try later! </div>) : ""
                            }

                            {
                                (!error && data) ?

                                    data?.map((data, index) => {
                                        return <IndividualCollections key={index} num={index+1} authorname={data?.authorName} volume={data?.volume} itemsSell={data?.itemsSell} itemsBuy={data?.itemsBuy} itemsCreated={data?.itemsCreated} image={data?.profile} id={data?._id}></IndividualCollections> 
                               }) : ""
                            }

{data?.length==0 && !error? (<div className="text-[#cbcdcf]  text-[1.7rem] sm:text-[2rem] md:text-[3.3rem] w-fit font-['Inconsolata'] mt-[1.5rem] ml-[2rem] sm:ml-[3.5rem] md:ml-[5rem]">
                            OOPS!   Nothing to show...</div>) : ""
                            }

    </div>
    </div>

    </div>
    )
}

export default memo(TopCollections);