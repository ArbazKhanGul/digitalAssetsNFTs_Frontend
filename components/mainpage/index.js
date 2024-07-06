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

    <h2 className="text-[2.8rem] sm:text-[3.2rem] md:text-[3.7rem] mt-[4rem] md:mt-[0rem] text-center text-[rgb(217,217,217)] mb-10 font-['Inter'] font-semibold ">Discover And sell your Digital Assets</h2>
    <p className="text-[#DAD7D7] text-[1.7rem] sm:text-[1.8rem] md:text-[1.8rem] font-['Inter']  font-medium text-center mb-10 tracking-wider line">DigialAssets is world first NFT platform in which you can create NFTs of any of your digital asset</p>
    <div className="mb-[1rem] text-[2rem] text-center">
    

    {address?(<button className="bg-[#1b31c4] hover:bg-blue-800 text-[#ebe7e7] font-normal text-[1.6rem] sm:font-semibold py-[0.9rem] px-[3.3rem] rounded-full  tracking-wider  max-w-[100%] overflow-hidden">
    {address.substr(0, 8) + "..." + address.substr(37, 5)}
</button>):(<>
     <button className="bg-[#1b31c4] hover:bg-blue-800 mt-[1rem]  ml-[1rem] text-[#ebe7e7] font-normal text-[1.7rem] sm:font-semibold py-[0.7rem] px-[4rem] rounded-full  tracking-wider"
      onClick={() => connectWalletLogin(user,dispatch, address,router,setShowLoginButton)}
      disabled={showLoginButton}
     >
  Login
</button>

  
    <Link href="/registration">
    <a><button className="bg-[#1b31c4]  hover:bg-blue-800 mt-[1rem] ml-[1rem]  text-[#ebe7e7] font-normal text-[1.7rem] sm:font-semibold py-[0.7rem] px-[3.2rem] rounded-full  tracking-wider">Register</button> 
    </a>
                </Link>

</>)}



    </div>



</motion.div>
<motion.div className="w-full mb-[3rem] mt-[3rem] md:mt-[0rem] md:mb-[0rem] md:w-1/2 flex justify-center" variants={right} initial="hidden" whileInView="visible">
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