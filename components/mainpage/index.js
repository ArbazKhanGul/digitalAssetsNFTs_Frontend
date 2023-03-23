import Image from "next/image";
import { motion } from "framer-motion"
import { useSelector,useDispatch} from "react-redux";
import { selectAddress } from "../../slice/metamask";
import { connectWalletLogin } from "../../metamask/login";
import {memo,useState} from "react";
import { selectUser } from "../../slice/user";
import { useRouter } from "next/router";
import Link from "next/link";
const Main=()=>{
  const user = useSelector(selectUser);
  const router= useRouter();
  const address = useSelector(selectAddress);
  const dispatch = useDispatch();
  const [showLoginButton, setShowLoginButton] = useState(false);

  const contVar={
hidden:{
  x:"-100%",
  opacity: 0
},
visible:{
  x:0,
  opacity: 1,
  transition:{
    // delay: 0.2,
    duration:0.6
  }
}
}

const right={
  hidden:{
    x:"100%",
    opacity: 0
  },
  visible:{
    x:0,
    opacity: 1,
    transition:{
      // delay: 0.2,
      duration:0.6
    }
  }
  }

    return (
        <div className="main py-[1.5rem] overflow-x-hidden flex justify-evenly flex-col md:flex-row items-center px-[5rem] ">

<motion.div className="text-white w-full md:w-1/2" variants={contVar} initial="hidden" whileInView="visible">

    <h2 className="text-[2.8rem] sm:text-[3.2rem] md:text-[3.6rem] text-center text-[rgb(217,217,217)] mb-10 font-['DynaPuff'] ">Discover And sell your Digital Assets</h2>
    <p className="text-[#DAD7D7] text-[1.7rem] sm:text-[1.8rem] md:text-[1.9rem] font-['Inconsolata'] font-semibold text-center mb-10 tracking-widest">DigialAssets is world first NFT platform in which you can create NFTs of any of your digital asset</p>
    <div className="mb-[1rem] text-[2rem] text-center">
    

    {address?(<button className="bg-blue-500 hover:bg-blue-700  text-white font-normal text-[1.8rem] sm:font-semibold py-3 px-12  sm:py-3 sm:px-14 rounded-full font-['Inconsolata'] tracking-wider  max-w-[100%] overflow-hidden">
    {address.substr(0, 8) + "..." + address.substr(37, 5)}
</button>):(<>
     <button className="bg-blue-500  hover:bg-blue-700  text-white font-normal text-[1.8rem] sm:font-semibold py-2 px-12  sm:py-2 sm:px-14 rounded-full font-['Inconsolata'] tracking-wider"
      onClick={() => connectWalletLogin(user,dispatch, address,router,setShowLoginButton)}
      disabled={showLoginButton}
     >
  Login
</button>

  
    <Link href="/registration">
    <a><button className="bg-blue-500 buttons hover:bg-blue-700  text-white font-normal text-[1.8rem] sm:font-semibold py-2 px-8  sm:py-2 sm:px-10 rounded-full font-['Inconsolata'] tracking-wider">Register</button> 
    </a>
                </Link>

</>)}



    </div>



</motion.div>
<motion.div className="w-full md:w-1/2 flex justify-center" variants={right} initial="hidden" whileInView="visible">
<div className=" w-[38rem] h-[16.8rem] sm:w-[40rem] sm:h-[20rem] md:ml-[9rem] md:w-[38rem] md:h-[20rem] lg:w-[55rem] lg:h-[28.5rem]  relative">
  <Image 
  src="/nft.jpg"
  layout="fill"
//   objectFit="cover"
  />
</div>
</motion.div>



    </div>)

}
export default memo(Main);