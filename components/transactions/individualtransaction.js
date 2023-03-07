import { memo } from "react";
import Image from "next/image";
import { useRouter } from "../index"
import { ethers } from 'ethers'

const IndividualCollections = ({ num, sellerProfile,sellerName,sellerId,ownerProfile,ownerName,ownerId,price}) => {

  let router = useRouter();

  return (<>

    <div 
    
    className={"hidden sm:border-b-0 sm:flex border-[#b1b1b1]   justify-start space-y-[1rem] pl-[2.3rem] sm:pl-[0rem]  sm:pb-[0rem] sm:space-y-[0.5rem] sm:justify-around items-start sm:items-center  flex-col sm:flex-row font-['Inconsolata']" + (num != 3 ? "border-b-[1px] pb-[1rem]" : "") }>

      <div className="flex gap-[1.5rem] items-center w-[28%] overflow-hidden text-ellipsis cursor-pointer"  onClick={() => { router.push(`/profile/${sellerId}`) }} >
        <div className="text-[#0B0A0A8A] text-[2rem] sm:text-[2rem] md:text-[2rem] font-bold font-['Inconsolata']" >{num}. </div>
        <div >
          <div className=" inline-block w-[3.5rem] h-[3.5rem] sm:w-[3.7rem] md:w-[4.3rem] sm:h-[3.7rem] md:h-[4.3rem] rounded-full relative">
            <Image
              className="rounded-full"
              src={`${process.env.SERVER_URL}/images/${sellerProfile}`}
              layout="fill"
            //   objectFit="cover"
            /></div>
        </div>
        <div className=" text-[2rem] sm:text-[2rem] md:text-[2.2rem] text-[#5F5454CF] font-['Inconsolata'] text-ellipsis overflow-hidden whitespace-nowrap">{sellerName} </div>
      </div>


      <div className="flex gap-[1.5rem] items-center w-[28%] overflow-hidden text-ellipsis cursor-pointer"  onClick={() => { router.push(`/profile/${ownerId}`) }} >
        <div >
          <div className=" inline-block w-[3.5rem] h-[3.5rem] sm:w-[3.7rem] md:w-[4.3rem] sm:h-[3.7rem] md:h-[4.3rem] rounded-full relative">
            <Image
              className="rounded-full"
              src={`${process.env.SERVER_URL}/images/${ownerProfile}`}
              layout="fill"
            //   objectFit="cover"
            /></div>
        </div>
        <div className=" text-[2rem] sm:text-[2rem] md:text-[2.2rem] text-[#5F5454CF] font-['Inconsolata'] text-ellipsis overflow-hidden whitespace-nowrap">{ownerName} </div>
      </div>

      <div className="text-[#5F5454CF] w-[20%] text-center ml-[3.4rem] sm:ml-[0rem] text-[1.8rem] sm:text-[1.8rem] md:text-[2.2rem] font-['Inconsolata'] whitespace-nowrap overflow-hidden text-ellipsis">  {ethers.utils.formatUnits(price.toLocaleString('fullwide', {useGrouping:false}), 18)} BNB</div>
      
    </div>



    {/* //mobile */}

    <div  className={" cursor-pointer flex sm:hidden   overflow-hidden border-[#b1b1b1]  font-['Inconsolata'] justify-start space-y-[1.2rem] pl-[1.3rem] sm:pl-[0rem]  sm:pb-[0rem]  items-start   flex-col sm:flex-row w-screen" + (num != 3 ? "border-b-[1px] pb-[1rem]" : "")}>

      <div className="flex gap-[2rem] items-center w-[100%]">
       


   <div className=" font-['Inconsolata'] overflow-hidden break-words text-[2rem] sm:text-[2rem] md:text-[2.2rem] text-[#5F5454CF] ">
          <div className="text-black font-bold overflow-x-auto break-words  ">
          <span className="text-black text-[2rem] break-words  overflow-hidden bold font-['Inconsolata']" >{num}.&nbsp;
        </span>
            Seller
            </div>

     </div>


     <div className="flex flex-1 gap-[1.5rem] items-center  overflow-hidden text-ellipsis cursor-pointer"  onClick={() => { router.push(`/profile/${ownerId}`) }} >
        <div >
          <div className=" inline-block w-[4.8rem] h-[4.8rem] sm:w-[3.2rem] md:w-[3.8rem] sm:h-[3.2rem] md:h-[3.8rem] rounded-full relative">
            <Image
              className="rounded-full"
              src={`${process.env.SERVER_URL}/images/${sellerProfile}`}
              layout="fill"
            //   objectFit="cover"
            /></div>
        </div>
        <div className=" text-[2rem] sm:text-[2rem] md:text-[2.2rem] text-[#5F5454CF] font-['Inconsolata'] text-ellipsis overflow-hidden whitespace-nowrap">{sellerName} </div>
      </div>


       </div>
       <div className="flex gap-[2.3rem] items-center w-[100%] pl-[3.1rem]">
      


   <div className=" font-['Inconsolata'] overflow-hidden break-words text-[2rem] sm:text-[2rem] md:text-[2.2rem] text-[#5F5454CF] ">
          <div className="text-black font-bold overflow-x-auto break-words  pr-[0.3rem]">
            Buyer 
            </div>

     </div>


     <div className="flex flex-1 gap-[1.5rem] items-center  overflow-hidden text-ellipsis cursor-pointer"  onClick={() => { router.push(`/profile/${ownerId}`) }} >
        <div >
          <div className=" inline-block w-[4.8rem] h-[4.8rem] sm:w-[3.7rem] md:w-[4.3rem] sm:h-[3.7rem] md:h-[4.3rem] rounded-full relative">
            <Image
              className="rounded-full"
              src={`${process.env.SERVER_URL}/images/${ownerProfile}`}
              layout="fill"
            /></div>
        </div>
        <div className=" text-[2rem] sm:text-[2rem] md:text-[2.2rem] text-[#5F5454CF] font-['Inconsolata'] text-ellipsis overflow-hidden whitespace-nowrap">{ownerName} </div>
      </div>



       </div>



<div className="flex">
<div className="ml-[3.2rem] font-['Inconsolata'] overflow-hidden break-words text-[2rem] sm:text-[2rem] md:text-[2.2rem] text-[#5F5454CF] ">
          <div className="text-black font-bold overflow-x-auto break-words  ">
           Price
            </div>

     </div>
<div className="text-[#5F5454CF] text-center ml-[3.4rem] sm:ml-[0rem] text-[2rem] sm:text-[1.8rem] md:text-[2.2rem] font-['Inconsolata'] whitespace-nowrap overflow-hidden text-ellipsis">  {ethers.utils.formatUnits(price.toLocaleString('fullwide', {useGrouping:false}), 18)} BNB</div>
      
</div>
     </div> 


  </>)
}

export default memo(IndividualCollections);