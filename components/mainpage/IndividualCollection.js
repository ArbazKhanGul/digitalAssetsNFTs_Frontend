import Image from "next/image";
import Link from 'next/link'
const IndividualCollections=({num,collectionname,volume,price,image}) =>{
    return (<>
        <div className={"hidden sm:border-b-0 sm:flex border-[#b1b1b1]   justify-start space-y-[1rem] pl-[2.3rem] sm:pl-[0rem]  sm:pb-[0rem] sm:space-y-[0.5rem] sm:justify-around items-start sm:items-center  flex-col sm:flex-row font-['Inconsolata']"+(num!=9?"border-b-[1px] pb-[1rem]":"")}>
    
    <div className="flex gap-[1.5rem] items-center"><div className="text-[#0B0A0A8A] text-[2rem] sm:text-[2rem] md:text-[2rem] font-bold font-['Inconsolata']" >{num}. </div>     <div className=" inline-block w-[3.5rem] h-[3.5rem] sm:w-[3.2rem] md:w-[3.5rem] sm:h-[3.2rem] md:h-[3.5rem] rounded-full relative">
  <Image 
  className="rounded-full"
  src={image}
  layout="fill"
//   objectFit="cover"
  /></div>
  <div className=" text-[2rem] sm:text-[2rem] md:text-[2.2rem] text-[#5F5454CF] font-['Inconsolata']">{collectionname} </div>
</div>
    <div className="text-[#5F5454CF] ml-[3.4rem] sm:ml-[0rem] text-[1.8rem] sm:text-[1.8rem] md:text-[2.2rem] font-['Inconsolata']">  <span className="inline-block sm:hidden text-[1.8rem] colgrad">Volume (USD) : </span> $ {volume}</div>
    <div className="text-[#5F5454CF] ml-[3.4rem] sm:ml-[0rem] text-[1.8rem] sm:text-[1.8rem] md:text-[2.2rem] font-['Inconsolata']"><span className="inline-block sm:hidden text-[1.8rem] colgrad">Floor Price (USD) : </span>${price}</div>
    </div>



{/* //mobile */}

    <div className={"flex sm:hidden gap-[3rem]  border-[#b1b1b1]   justify-start space-y-[2rem] pl-[2.3rem] sm:pl-[0rem]  sm:pb-[0rem]  items-start   flex-col sm:flex-row "+(num!=9?"border-b-[1px] pb-[1rem]":"")}>
    
    
    <div className="flex  gap-[2rem] items-center">
  <div className="text-[#0B0A0A8A] text-[1.8rem] bold font-['Inter']" >{num}.
       </div>  
         <div className=" inline-block w-[5.2rem] h-[5.2rem]  rounded-full relative">
  <Image 
  className="rounded-full"
  src={image}
  layout="fill"
 /></div>
  <div className="flex-1 font-['Inter'] text-[1.8rem] sm:text-[2rem] md:text-[2.2rem] text-[#5F5454CF] ">
    <div className="text-black font-semibold">{collectionname}</div>
    
    
    <div className="flex justify-between">
    <div className="text-[#5F5454CF] text-[1.7rem] font-['Inter']"><span className="inline-block sm:hidden text-[1.8rem] colgrad">Floor Price  :   </span> ${price}</div>
    {/* <div className="text-[#5F5454CF] ml-[3.4rem] sm:ml-[0rem] text-[1.8rem] sm:text-[1.8rem] md:text-[2rem] font-['Inter']">  ${volume}</div> */}
    
    </div>
    
    
     </div>
</div>
    </div>


    </>)
}

export default IndividualCollections;