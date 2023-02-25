import ClipLoader from "react-spinners/PuffLoader";
import {memo} from "react";
import IndividualCollections from "./IndividualCollection"
import useSWR from 'swr'
import { fetcherCollection } from "../../utils/fetcher";

const TopCollections=({error,data,isLoading})=>{

    // const { data, error,isLoading  } = useSWR("/getcollection/1", fetcherCollection);

// let temp=[{collectionname:"Collection1",volume:100,price:123,image:"/col.jpeg"},{collectionname:"Collection2",volume:100,price:123,image:"/col.jpeg"},{collectionname:"Collection3",volume:100,price:123,image:"/col.jpeg"},{collectionname:"Collection4",volume:100,price:123,image:"/col.jpeg"},{collectionname:"Collection5",volume:100,price:123,image:"/col.jpeg"},{collectionname:"Collection6",volume:100,price:123,image:"/col.jpeg"},{collectionname:"Collection7",volume:100,price:123,image:"/col.jpeg"},{collectionname:"Collection8",volume:100,price:123,image:"/col.jpeg"},{collectionname:"Collection9",volume:100,price:123,image:"/col.jpeg"}]



    return (
        <div>
    <div className="color w-fit text-[2.7rem] ml-[2rem] font-['DynaPuff'] sm:text-[3rem] md:text-[3.7rem]  m-[1.2rem] sm:ml-[3.5rem] md:ml-[5rem]">
    Top Profiles :
    </div>

    <div className="space-y-[2rem] flex-col justify-center">
        <div className="  hidden sm:flex sm:justify-around items-start sm:items-center overflow-hidden">
        

            <div className="ml-[4rem] text-[2.3rem] sm:text-[2rem]  md:text-[2.5rem] w-[26%] pl-[2rem] box-border colgrad">Profile</div>
            <div className=" text-[2.3rem] sm:text-[2rem]  md:text-[2.5rem] text-center  colgrad flex flex-col w-[22%]"><span>Total Revenue</span>
            <span className="text-[1.7rem] sm:text-[1.4rem]  md:text-[1.7rem] text-center text-[#5F5454CF] -mt-[5px]"></span>
             </div>
             <div className=" text-[2.3rem] sm:text-[2rem]  md:text-[2.5rem] text-center colgrad flex flex-col w-[22%]"><span>Total Items</span>
            <span className="text-[1.7rem] sm:text-[1.4rem]  md:text-[1.7rem] text-center text-[#5F5454CF] -mt-[5px]">(Sell + Buy)</span>
             </div>
        </div>
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
                                        return <IndividualCollections key={index} num={index+1} authorname={data?.authorName} volume={data?.volume} items={data?.itemsSell + data?.itemsBuy} image={data?.profile} id={data?._id}></IndividualCollections> 

                                    }) : ""
                            }

{data?.length==0 && !error? (<div className="text-[#cbcdcf]  text-[1.7rem] sm:text-[2rem] md:text-[3.3rem] w-fit font-['Inconsolata'] mt-[1.5rem] ml-[2rem] sm:ml-[3.5rem] md:ml-[5rem]">
                            OOPS!   Nothing to show...</div>) : ""
                            }

    </div>

    </div>
    )
}

export default memo(TopCollections);