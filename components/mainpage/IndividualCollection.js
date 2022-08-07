import Image from "next/image";
import Link from 'next/link'
const IndividualCollections=({num,collectionname,volume,price,image}) =>{

    return (
        <div className="flex justify-around items-center">
    {/* <div className="color w-fit text-[3.7rem] font-semibold">
    Top Collections
    </div> */}
    
    <div className="flex gap-[1.5rem] items-center"><div className="text-[#0B0A0A8A] text-[2.2rem] font-bold font-['Inter']" >{num}</div>     <div className=" inline-block w-[3.5rem] h-[3.5rem] rounded-full relative">
  <Image 
  className="rounded-full"
  src={image}
  layout="fill"
//   objectFit="cover"
  />
  <div className="ml-[5rem] font-['Inter'] text-[2.2rem] text-[#5F5454CF]">{collectionname} </div>
</div></div>
    <div className="text-[#5F5454CF] text-[2rem] font-['Inter']">$ {volume}</div>
    <div className="text-[#5F5454CF] text-[2rem] font-['Inter']">${price}</div>
    </div>
    )
}

export default IndividualCollections;