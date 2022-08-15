import Image from "next/image";
import Link from 'next/link'
import { useState } from "react";
import   {AiOutlineMenu} from "react-icons/ai"
import { useRouter } from "next/router";
const Navbar=()=>{
  const router = useRouter();
  const [showItems, show]=useState(false);
    return(
        <>
        <div className="navbar flex items-center pt-[1rem] pb-[1rem] pl-[0.8rem] pr-[2rem]  sm:pl-[2rem] sm:pr-[3rem] md:pl-[4rem] md:pr-[5rem] md:pt-[0rem] md:pb-[0rem]" >

        <div className=" w-[26rem] h-[4.2rem] sm:w-[30rem] sm:h-[5rem]  md:w-[35rem] md:h-[6rem]  relative">
  <Image 
  src="/logo.png"
  layout="fill"
//   objectFit="cover"
  />
</div>
  
  <div className="flex-1 items-center flex">

  <AiOutlineMenu className="w-[2.7rem] ml-auto h-[2.7rem]  inline-block lg:hidden text-white" onClick={()=>{show((prevState)=>{
    return prevState?false:true;
  })}}></AiOutlineMenu>






    <ul className=" ml-auto hidden lg:inline-block">
      <li className="inline-block links">
        <Link href="/">
          <a className={(router.pathname == "/" ? "text-blue-600" : "")}>Home</a>
        </Link>
      </li>
      <li className="inline-block links">
        <Link href="/nft">
          <a className={(router.pathname == "/nft" ? "text-blue-600" : "")}>NFTs</a>
        </Link>
      </li>
      <li className="inline-block links ">
        <Link href="/blog/hello-world">
          <a className={(router.pathname == "/collection" ? "text-blue-600" : "")}>Collections</a>
        </Link>
      </li>
      <li className="inline-block links ">
        <button className="bg-blue-500  hover:bg-blue-700  text-white font-normal text-[1.8rem] sm:font-semibold py-2 px-12  sm:py-2 sm:px-11 rounded-full font-['Inconsolata'] tracking-wider">
        <Link href="/blog/hello-world">
          <a>Login</a>
        </Link>
        </button>
      </li>
      <li className="inline-block links">
      <button className="bg-blue-500  hover:bg-blue-700  text-white font-normal text-[1.8rem] sm:font-semibold py-2 px-12  sm:py-2 sm:px-11 rounded-full font-['Inconsolata'] tracking-wider">
        <Link href="/blog/hello-world">
          <a>Register</a>
        </Link>
        </button>
      </li>
    </ul>

  </div> 
</div>

<div className={"onclicklist transition-all duration-500 overflow-hidden lg:hidden linear "+(!showItems ? "h-0 ":"h-[212px]")}>
    
  <ul className={" ml-auto divide-y-[1px] divide-[#454f5a]"}>
  <Link href="/" passHref >
    <a>
      <li className={"onlinks py-[0.8rem] pl-[2.5rem] sm:pl-[3.7rem] md:pl-[6rem] "+(router.pathname == "/" ? "text-blue-600" : "text-[#EAE1E1]")}>
          Home
      </li>
      </a>
      </Link>
      <Link href="/nft">
      <a>
      <li className={" onlinks py-[0.7rem] px-[2.5rem] sm:pl-[3.7rem] md:pl-[6rem] "+(router.pathname == "/nft" ? "text-blue-600" : "text-[#EAE1E1]")}>
         NFTs
        
      </li>
      </a>
      </Link>

      <Link href="/blog/hello-world">
      <a>
      <li className={" onlinks py-[0.7rem] px-[2.5rem] sm:pl-[3.7rem] md:pl-[6rem] "+(router.pathname == "/collection" ? "text-blue-600" : "text-[#EAE1E1]")}>
          Collections
      </li>
      </a>
      </Link>
     
      <Link href="/blog/hello-world">
          <a>
      <li className={"onlinks py-[0.7rem] px-[2.5rem] sm:pl-[3.7rem] md:pl-[6rem] "+(router.pathname == "/login" ? "text-blue-600" : "text-[#EAE1E1]")}>
        Login            </li>
        </a>

  </Link>


  <Link href="/registration">
  <a>
      <li className={"onlinks py-[0.7rem] px-[2.5rem] sm:pl-[3.7rem] md:pl-[6rem] "+(router.pathname == "/registration" ? "text-blue-600" : "text-[#EAE1E1]")}>
          Register
      </li>
      </a>
      </Link>

    </ul>
</div>
        </>
    )
}

export default Navbar;