import { memo } from "react";
import Image from "next/image";
import { useRouter } from "../index"
import { ethers } from 'ethers'

const IndividualCollections = ({ num, authorname, volume, items, image, id }) => {

  let router = useRouter();

  return (<>

    <div onClick={() => { router.push(`/profile/${id}`) }} className={"hidden cursor-pointer sm:border-b-0 sm:flex border-[#b1b1b1]   justify-start space-y-[1rem] pl-[2.3rem] sm:pl-[0rem]  sm:pb-[0rem] sm:space-y-[0.5rem] sm:justify-around items-start sm:items-center  flex-col sm:flex-row font-['Inconsolata']" + (num != 9 ? "border-b-[1px] pb-[1rem]" : "")}>

      <div className="flex gap-[1.5rem] items-center w-[28%] overflow-hidden text-ellipsis">
        <div className="text-[#0B0A0A8A] text-[2rem] sm:text-[2rem] md:text-[2rem] font-bold font-['Inconsolata']" >{num}. </div>
        <div >
          <div className=" inline-block w-[3.5rem] h-[3.5rem] sm:w-[3.2rem] md:w-[3.5rem] sm:h-[3.2rem] md:h-[3.5rem] rounded-full relative">
            <Image
              className="rounded-full"
              src={`${process.env.SERVER_URL}/images/${image}`}
              layout="fill"
            //   objectFit="cover"
            /></div>
        </div>
        <div className=" text-[2rem] sm:text-[2rem] md:text-[2.2rem] text-[#5F5454CF] font-['Inconsolata'] text-ellipsis overflow-hidden whitespace-nowrap">{authorname} </div>
      </div>

      <div className="text-[#5F5454CF] w-[20%] text-center ml-[3.4rem] sm:ml-[0rem] text-[1.8rem] sm:text-[1.8rem] md:text-[2.2rem] font-['Inconsolata'] whitespace-nowrap overflow-hidden text-ellipsis">  {ethers.utils.formatUnits(volume.toLocaleString('fullwide', {useGrouping:false}), 18)} BNB</div>
      <div className="text-[#5F5454CF] w-[20%] text-center ml-[3.4rem] sm:ml-[0rem] text-[1.8rem] sm:text-[1.8rem] md:text-[2.2rem] font-['Inconsolata'] whitespace-nowrap overflow-hidden text-ellipsis">{items}</div>
    </div>



    {/* //mobile */}

    <div onClick={() => { router.push(`/individualprofile/${id}`) }} className={" cursor-pointer flex sm:hidden gap-[3rem]  overflow-hidden border-[#b1b1b1]  font-['Inconsolata'] justify-start space-y-[2rem] pl-[2.3rem] sm:pl-[0rem]  sm:pb-[0rem]  items-start   flex-col sm:flex-row w-screen" + (num != 9 ? "border-b-[1px] pb-[1rem]" : "")}>

      <div className="flex  gap-[2rem] items-center w-[100%]">
        <div className="text-[#0B0A0A8A] text-[1.8rem] break-words  overflow-hidden bold font-['Inconsolata']" >{num}.
        </div>
        <div className=" inline-block w-[5.2rem] h-[5.2rem]  rounded-full relative">
          <Image
            className="rounded-full"
            src={`${process.env.SERVER_URL}/images/${image}`}
            layout="fill"
          /></div>
        <div className="flex-1 font-['Inconsolata'] overflow-hidden break-words text-[1.8rem] sm:text-[2rem] md:text-[2.2rem] text-[#5F5454CF] ">
          <div className="text-black font-bold overflow-x-auto break-words  pr-[0.3rem]">
            {authorname}
            </div>


          <div className="flex justify-between">
            <div className="text-[#5F5454CF] text-[1.7rem] font-['Inconsolata'] whitespace-nowrap overflow-hidden text-ellipsis mr-[0.3rem]"><span className="inline-block sm:hidden text-[1.7rem] colgrad ">Revenue     </span><span className="whitespace-nowrap"> {ethers.utils.formatUnits(volume.toLocaleString('fullwide', {useGrouping:false}), 18)} BNB </span></div>
            {/* <div className="text-[#5F5454CF] ml-[3.4rem] sm:ml-[0rem] text-[1.8rem] sm:text-[1.8rem] md:text-[2rem] font-['Inter']">  ${volume}</div> */}

          </div>


        </div>
      </div>
    </div>


  </>)
}

export default memo(IndividualCollections);