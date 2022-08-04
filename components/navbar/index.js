import Image from "next/image";
import Link from 'next/link'
import { useState } from "react";
import   {AiOutlineMenu} from "react-icons/ai"
const Navbar=()=>{
  const [showItems, show]=useState(false);

    return(
        <>
        <div className="navbar flex items-center pt-[1rem] pb-[1rem] pl-[1rem] pr-[2rem]  sm:pl-[2rem] sm:pr-[3rem] md:pl-[4rem] md:pr-[5rem] md:pt-[0rem] md:pb-[0rem]" >

        <div className=" w-[26rem] h-[4.2rem] sm:w-[30rem] sm:h-[5rem]  md:w-[35rem] md:h-[6rem]  relative">
  <Image 
  src="/logo.png"
  layout="fill"
//   objectFit="cover"
  />
</div>
  
  <div className="flex-1 items-center flex">

  <AiOutlineMenu className="w-[2.7rem] ml-auto h-[2.7rem]  inline-block md:hidden text-white"></AiOutlineMenu>






    <ul className="inline-block ml-auto list">
      <li className="inline-block links">
        <Link href="/">
          <a>Home</a>
        </Link>
      </li>
      <li className="inline-block links">
        <Link href="/about">
          <a>NFTs</a>
        </Link>
      </li>
      <li className="inline-block links">
        <Link href="/blog/hello-world">
          <a>Collections</a>
        </Link>
      </li>
      <li className="inline-block links">
        <Link href="/blog/hello-world">
          <a>Login</a>
        </Link>
      </li>
      <li className="inline-block links">
        <Link href="/blog/hello-world">
          <a>Register</a>
        </Link>
      </li>
    </ul>

  </div> 
</div>

<div className="onclicklist">

    
  <ul className=" ml-auto divide-y-[1px] divide-[#454f5a]">
      <li className="links p-[0.7rem] pl-[1.3rem]">
        <Link href="/">
          <a>Home</a>
        </Link>
      </li>
      <li className=" onlinks p-[0.7rem] pl-[1.3rem]">
        <Link href="/about">
          <a>NFTs</a>
        </Link>
      </li>
      <li className=" onlinks p-[0.7rem] pl-[1.3rem]">
        <Link href="/blog/hello-world">
          <a>Collections</a>
        </Link>
      </li>
      <li className="onlinks p-[0.7rem] pl-[1.3rem]">
        <Link href="/blog/hello-world">
          <a>Login</a>
        </Link>
      </li>
      <li className="onlinks p-[0.7rem] pl-[1.3rem]">
        <Link href="/blog/hello-world">
          <a>Register</a>
        </Link>
      </li>
    </ul>
</div>
        </>
    )
}

export default Navbar;