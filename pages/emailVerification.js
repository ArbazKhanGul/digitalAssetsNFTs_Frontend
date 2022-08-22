import Navbar from "../components/navbar" 
import Footer from "../components/footer/footer"
import Image from "next/image";
import Link from 'next/link'
import { motion } from "framer-motion"

const EmailVerification=()=>{
    const contVar={
        hidden:{
          y:5,
        },
        visible:{
          y:-10,
          transition:{
            duration:0.6,
            yoyo:Infinity,
          }
        }
        }
    return (
        <>
        <div className="flex flex-col min-h-screen">

            <Navbar></Navbar>
            <div className="email flex-1 flex justify-center items-center py-[4rem] sm:p-[8rem] rounded-lg">


                  <div className="size sm:w-[40rem] bg-white rounded-2xl px-[2.5rem] py-[3.5rem] space-y-[3.3rem]">
                  <div>

                  <div className="w-[6rem] h-[6rem]   md:w-[4rem] md:h-[4rem]  relative">
  <Image 
  src="/rocket.png"
  layout="fill"
//   objectFit="cover"
  />
</div>
                  </div>
                  
                  <div>


                    <h2 className="textSize font-['Inconsolata'] text-[3rem] font-medium">Verify Your Account</h2>
                    <p className="font-['Inconsolata'] text-[1.4rem] ">Account Acitvation Link has been sent to the email you provided</p>
                  </div>


                  <div className="flex justify-center">

<motion.div variants={contVar} initial="hidden" animate="visible">
                  <div className="w-[6rem] h-[6rem]  md:w-[6rem] md:h-[6rem]  relative">
  <Image 
  src="/email.png"
  layout="fill"
//   objectFit="cover"
  />
</div>
</motion.div>

                  </div>


                  <div className="flex justify-center">

                   <h2 className="font-['Inconsolata'] text-[1.4rem] ">Didn't get email? <span className="text-blue-700"><Link href="/login">
          <a>Send it again</a>
        </Link></span></h2>

                  </div>

                  
                  </div>
            </div>
            <Footer></Footer>
        </div>
        </>
    )
}

export default EmailVerification;