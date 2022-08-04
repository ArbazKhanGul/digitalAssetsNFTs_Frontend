import Image from "next/image";
import Link from 'next/link'
import   {AiOutlineMenu} from "react-icons/ai"
const Navbar=()=>{

    return(
        <>
        <div className="navbar flex items-center  pad" >

        <div className="w-[35rem] h-[6rem] relative">
  <Image 
  src="/logo.png"
  layout="fill"
//   objectFit="cover"
  />
</div>
  
  <div className="flex-1 items-center flex">

  <AiOutlineMenu className="w-[3rem] ml-auto h-[3rem] iconvisibility text-white"></AiOutlineMenu>

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
        </>
    )
}

export default Navbar;