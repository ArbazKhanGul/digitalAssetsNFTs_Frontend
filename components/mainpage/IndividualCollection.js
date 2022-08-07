import Image from "next/image";
import Link from 'next/link'
const IndividualCollections=({num,collectionname,volume,price,image}) =>{

    return (
        <div className="flex border-b-[1px] sm:border-b-0 border-[#666b70]   justify-start space-y-[1rem] pl-[2.3rem] sm:pl-[0rem] pb-[1rem] sm:pb-[0rem] sm:space-y-[0.5rem] sm:justify-around items-start sm:items-center  flex-col sm:flex-row">
    {/* <div className="color w-fit text-[3.7rem] font-semibold">
    Top Collections
    </div> */}
    
    <div className="flex gap-[1.5rem] items-center"><div className="text-[#0B0A0A8A] text-[2rem] sm:text-[2rem] md:text-[2.2rem] font-bold font-['Inter']" >{num} . </div>     <div className=" inline-block w-[3.5rem] h-[3.5rem] sm:w-[3.2rem] md:w-[3.5rem] sm:h-[3.2rem] md:h-[3.5rem] rounded-full relative">
  <Image 
  className="rounded-full"
  src={image}
  layout="fill"
//   objectFit="cover"
  /></div>
  <div className="font-['Inter'] text-[2.2rem] sm:text-[2rem] md:text-[2.2rem] text-[#5F5454CF] ">{collectionname} </div>
</div>
    <div className="text-[#5F5454CF] ml-[3.4rem] sm:ml-[0rem] text-[2rem] sm:text-[1.8rem] md:text-[2rem] font-['Inter']">  <span className="inline-block sm:hidden text-[2rem] colgrad">Volume (USD) : </span> $ {volume}</div>
    <div className="text-[#5F5454CF] ml-[3.4rem] sm:ml-[0rem] text-[2rem] sm:text-[1.8rem] md:text-[2rem] font-['Inter']"><span className="inline-block sm:hidden text-[2rem] colgrad">Floor Price (USD) : </span>${price}</div>
    </div>
    )
}

export default IndividualCollections;