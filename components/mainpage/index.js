import Image from "next/image";

const Main=()=>{

    return (
        <div className="main  overflow-x-hidden flex justify-evenly flex-col-reverse  md:flex-row items-center px-[5rem] ">

<div className="text-white w-full md:w-1/2">

    <h2 className="text-[3rem] md:text-[3.6rem] text-center text-[rgb(217,217,217)] mb-10">Discover And sell your golden words and thoughts</h2>
    <p className="text-[#DAD7D7] text-[1.7rem] md:text-[1.9rem] text-center mb-10">Goldernwords is world first NFT platform in which you can create NFTs of your golden words</p>
    <div className="text-[2rem] ml-8 text-center">
        <button>Login</button>
        <button>Register</button>
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