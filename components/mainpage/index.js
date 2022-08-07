import Image from "next/image";

const Main=()=>{

    return (
        <div className="main py-[3rem] overflow-x-hidden flex justify-evenly flex-col md:flex-row items-center px-[5rem] ">

<div className="text-white w-full md:w-1/2">

    <h2 className="text-[2.8rem] sm:text-[3.2rem] md:text-[3.6rem] text-center text-[rgb(217,217,217)] mb-10">Discover And sell your golden words and thoughts</h2>
    <p className="text-[#DAD7D7] text-[1.7rem] sm:text-[1.8rem] md:text-[1.9rem] text-center mb-10">Goldernwords is world first NFT platform in which you can create NFTs of your golden words</p>
    <div className="mb-[2rem] text-[2rem] text-center">
    <button className="bg-blue-500  hover:bg-blue-700  text-white font-normal text-[18px] sm:font-semibold py-2 px-8  sm:py-2 sm:px-10 rounded-full">
  Login
</button>
<button className="bg-blue-500 buttons hover:bg-blue-700  text-white font-normal text-[18px] sm:font-semibold py-2 px-8  sm:py-2 sm:px-10 rounded-full">
  Register
</button>
    </div>
</div>
<div className="w-full md:w-1/2 flex justify-center">
<div className=" w-[34rem] h-[16.2rem] sm:w-[40rem] sm:h-[20rem] md:ml-[9rem] md:w-[38rem] md:h-[20rem] lg:w-[55rem] lg:h-[28.5rem]  relative">
  <Image 
  src="/nft.jpg"
  layout="fill"
//   objectFit="cover"
  />
</div>
</div>



    </div>)

}
export default Main;