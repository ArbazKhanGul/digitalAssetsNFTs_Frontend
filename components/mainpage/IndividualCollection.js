import { memo } from "react";
import Image from "next/image";
import { useRouter } from "../index"
import { ethers } from 'ethers'
import { motion } from "framer-motion"

const IndividualCollections = ({ num,authorname,volume,itemsSell,itemsBuy,itemsCreated,image, id }) => {

  const right={
    hidden:{
      x:"100%",
      opacity: 0
    },
    visible:{
      x:0,
      opacity: 1,
      transition:{
        // delay: 0.2,
        duration:0.6
      }
    }
    }
    const contVar={
      // hidden:{
      //   x:"-100%",
      //   opacity: 0
      // },
      // visible:{
      //   x:0,
      //   opacity: 1,
      //   transition:{
      //     // delay: 0.1,
      //     duration:0.4
      //   }
      // }
      }

  let router = useRouter();

  return (<>

    <motion.div  onClick={() => { router.push(`/profile/${id}`) }} className={"!px-[2rem] md:px-[4rem] bg-[#f5f5f7] my-[1rem] hover:bg-gray-200 bottom-shadow cursor-pointer sm:border-b-0 flex border-[#b1b1b1]     pl-[0rem]  pb-[0.5rem] pt-[1rem] space-y-[0.5rem] justify-around  items-center   flex-row font-['Inconsolata']" + (num != 9 ? "border-b-[1px]" : "")}>

      <div className="flex gap-[1.5rem] items-center w-[28%] sm:w-[26%] lg:w-[20%] overflow-hidden text-ellipsis">
        <div className="text-[#0B0A0A8A] text-[1.6rem] sm:text-[1.8rem] font-bold " >{num}. </div>
        <div >
          <div className=" inline-block w-[3.5rem] h-[3.5rem] sm:w-[3.2rem] md:w-[3.5rem] sm:h-[3.2rem] md:h-[3.5rem] rounded-full relative">
            <Image
              className="rounded-full"
              src={`${image}`}
              layout="fill"
            //   objectFit="cover"
            /></div>
        </div>
        <div className="text-[1.5rem] sm:text-[1.7rem] text-[#5F5454CF]  text-ellipsis overflow-hidden whitespace-nowrap">{authorname}</div>
      </div>

      <div className="text-[#5F5454CF] w-[18%] lg:w-[20%] text-center ml-[3.4rem] sm:ml-[0rem] text-[1.5rem] sm:text-[1.7rem]   whitespace-nowrap overflow-hidden text-ellipsis">  {parseFloat(ethers.utils.formatUnits(volume.toLocaleString('fullwide', {useGrouping:false}), 18))?.toFixed(2)} BNB</div>
      <div className="text-[#5F5454CF] w-[18%] lg:w-[20%] text-center ml-[3.4rem] sm:ml-[0rem] text-[1.5rem] sm:text-[1.7rem]   whitespace-nowrap overflow-hidden text-ellipsis">{itemsCreated}</div>
      <div className="text-[#5F5454CF] w-[18%] lg:w-[20%] text-center ml-[3.4rem] sm:ml-[0rem] text-[1.5rem] sm:text-[1.7rem]   whitespace-nowrap overflow-hidden text-ellipsis">{itemsSell}</div>
      <div className="text-[#5F5454CF] w-[18%] lg:w-[20%] text-center ml-[3.4rem] sm:ml-[0rem] text-[1.5rem] sm:text-[1.7rem]   whitespace-nowrap overflow-hidden text-ellipsis">{itemsBuy}</div>
    </motion.div>
</>)
}

    // {/* //mobile */}

    // <div onClick={() => { router.push(`/individualprofile/${id}`) }} className={" bottom-shadow cursor-pointer flex sm:hidden gap-[3rem]  overflow-hidden border-[#b1b1b1]  font-['Inconsolata'] justify-start space-y-[2rem] pl-[2.3rem]  items-start   flex-col sm:flex-row w-screen py-[1.5rem]"}>
    //   <div className="flex  gap-[2rem] items-center w-[100%]">
    //     <div className="text-[#0B0A0A8A] text-[1.8rem] break-words  overflow-hidden bold font-['Inconsolata']" >{num}.
    //     </div>
    //     <div className=" inline-block w-[5.2rem] h-[5.2rem]  rounded-full relative">
    //       <Image
    //         className="rounded-full"
    //         src={`${process.env.SERVER_URL}/images/${image}`}
    //         layout="fill"
    //       /></div>
    //     <div className="flex-1 font-['Inconsolata'] overflow-hidden break-words text-[1.8rem] sm:text-[2rem] md:text-[2rem] text-[#5F5454CF] ">
    //       <div className="text-black font-bold overflow-x-auto break-words  pr-[0.3rem]">
    //         {authorname}
    //         </div>


    //       <div className="flex justify-between">
    //         <div className="text-[#5F5454CF] text-[1.7rem] font-['Inconsolata'] whitespace-nowrap overflow-hidden text-ellipsis mr-[0.3rem]"><span className="inline-block sm:hidden text-[1.7rem] colgrad ">Revenue     </span><span className="whitespace-nowrap"> {ethers.utils.formatUnits(volume.toLocaleString('fullwide', {useGrouping:false}), 18)} BNB </span></div>
    //         {/* <div className="text-[#5F5454CF] ml-[3.4rem] sm:ml-[0rem] text-[1.8rem] sm:text-[1.8rem] md:text-[2rem] font-['Inter']">  ${volume}</div> */}

    //       </div>


    //     </div>
    //   </div>
    // </div>




export default memo(IndividualCollections);