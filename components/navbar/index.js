import Image from "next/image";
import Link from 'next/link'

const Navbar=()=>{

    return(
        <>
        <div className="navbar flex items-center pl-[4rem] pr-[5rem]" >

            
        <div className="w-[35rem] h-[6rem] relative">
  <Image 
  src="/logo.png"
  layout="fill"
//   objectFit="cover"
  />
</div>
  
  <div className="flex-1 items-center flex">
  

    <ul className="inline-block ml-auto">
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