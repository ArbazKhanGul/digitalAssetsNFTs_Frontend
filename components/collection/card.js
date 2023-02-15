import Image from "next/image";
import { shortText } from "limit-text-js";
import { useRouter } from "../index";
import { usePresence } from "framer-motion";

const Card = ({data}) => {
    let {collectionName,authorName,email,profile,cover,volume,floorPrice,_id} = data;
 let router=useRouter();
 return <>
        <div onClick={()=>{router.push(`/profile/${_id}`)}} className="cursor-pointer border-[#87757587] border-2 widthCard rounded-[4rem] mt-[3rem] h-fit ">

            <div>
                <div>
                    <div className=" w-[100.7%] -ml-[0.5%]  -mt-[0.3%] h-[17rem]  relative">
                        <Image
                             src={`${process.env.SERVER_URL}/images/${cover}`}
                            layout="fill"
                            objectFit="cover"
                            className="rounded-tl-[3.7rem] rounded-tr-[3.7rem]"
                        />
                    </div>
                </div>

                {/* <div className="flex justify-center md:block"> */}
                    <div className="   flex justify-center -mt-[4.8rem] z-50 relative rounded-full">
                        <div className="border-white bg-white relative border-[0.4rem] rounded-full">
                        <div className="w-[8.4rem] h-[8.4rem]  relative ">
                            <Image
                                src={`${process.env.SERVER_URL}/images/${profile}`}
                                layout="fill"
                                objectFit="cover"
                                className="rounded-full"
                            />
                        </div>
                    </div>
                    </div>
                {/* </div> */}

            </div>


            <div className=" pb-[2rem]">

                <div className="text-[#545151] flex mt-[0.5rem] lg:mt-[1rem] justify-center w-[100%] font-['DynaPuff'] text-[2.2rem] font-medium">
                {shortText(collectionName.charAt(0).toUpperCase() + collectionName.slice(1), 20, "...")}
                </div>

                <div className="flex justify-center lg:mt-[0.3rem]">
                    {/* <span className="text-[#6d6363cf] text-[2rem] font-medium"><pre>By </pre></span> */}
                    <span className="text-[#706d6d] font-['Inconsolata'] text-[1.9rem] font-medium overflow-hidden text-ellipsis whitespace-nowrap px-[1rem]"> {email}</span>
                </div>
                {/* <div className="flex justify-between px-[1rem] pt-[1rem] lg:pt-[1.5rem] box-border ">

                    <span>Email </span>
                    <span>{email}</span>
                </div> */}
                <div className="flex px-[2rem] lg:px-[2.3rem] justify-between pt-[1rem] lg:pt-[1.5rem] box-border ">
                   <div className="flex flex-col"> 
                    <span className="text-[#524848cf]  cardText font-bold font-['Inconsolata']">Total Revenue </span>
                    <span className="text-[#524848cf]  cardText font-bold font-['Inconsolata'] -mt-[0.4rem]">(Sold + Buy) </span>
                    {/* <span className="text-[#524848cf] cardText font-medium font-['Inconsolata'] whitespace-nowrap">Floor Price </span> */}
                   </div>

                   <div className="flex flex-col ">

                   <span className="text-[#221f1fcf] cardText font-bold font-['Inconsolata'] whitespace-nowrap mr-[4] overflow-hidden text-ellipsis">

                   {shortText(volume,12 , "..")} BNB
                         </span>
                         <span className="text-[#221f1fcf] cardText font-bold font-['Inconsolata'] whitespace-nowrap -mt-[0.4rem]"> &asymp; {shortText(floorPrice,12 , "..")} $</span> 
                    {/* <span className="text-[#221f1fcf] cardText font-bold font-['Inconsolata'] whitespace-nowrap">  {shortText(floorPrice,12 , "..")} BNB</span> */}
                   </div>
                </div>
            </div>
        </div>
    </>
}

export default Card;