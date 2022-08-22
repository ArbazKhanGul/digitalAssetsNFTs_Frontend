import Navbar from "../components/navbar" 
import Footer from "../components/footer/footer"
import Image from "next/image";
import Link from 'next/link'
import { motion } from "framer-motion"
import {HiOutlineMail} from "react-icons/hi"
const SendEmail=()=>{
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
            <div className="email flex-1 flex justify-center items-center p-[8rem] rounded-lg">


                  <div className="w-[40rem] bg-white rounded-2xl px-[2.5rem] py-[3.5rem] space-y-[3.3rem]">
                  <div>

                  <div className=" w-[26rem] h-[4.2rem] sm:w-[30rem] sm:h-[5rem]  md:w-[4rem] md:h-[4rem]  relative">
  <Image 
  src="/rocket.png"
  layout="fill"
//   objectFit="cover"
  />
</div>
                  </div>
                  
                  <div className="flex flex-col space-y-[2rem]">

                  <h2 className="font-['Inconsolata'] text-[2.5rem] font-medium ">Enter Email Address</h2>
<form action="">
<div className="w-[100%] flex justify-center flex-col items-center space-y-[0.5rem] -mt-[1rem]">
                <div className="reginpemail w-[100%]">

                <HiOutlineMail className="text-[2.5rem] "></HiOutlineMail>
                <input type="text" 
                placeholder="arbaz123@gmail.com" 
                className="reginput"
                name="email"
                // value={values.email}
                // onChange={handleChange}
                // onBlur={handleBlur}
                // autoComplete="off"
                />
                </div>
                {/* {errors.email && touched.email ? (<p className="text-red-500 text-[1.4rem] errors block">{errors.email}</p>):null} */}
            </div>

</form>
<div className="flex justify-center">
<button className="bg-blue-500 buttons hover:bg-blue-700  text-white font-normal text-[1.8rem] sm:font-semibold py-2 px-8  sm:py-2 sm:px-10 rounded-full font-['Inconsolata'] tracking-wider">
  Send Email
</button>
</div>               
                    {/* <p className="font-['Inconsolata'] text-[1.4rem] ">Account Acitvation Link has been sent to the email you provided</p> */}
                  </div>


                  <div className="flex justify-center">

<motion.div variants={contVar} initial="hidden" animate="visible">
                  <div className=" w-[26rem] h-[4.2rem] sm:w-[30rem] sm:h-[5rem]  md:w-[6rem] md:h-[6rem]  relative">
  <Image 
  src="/email.png"
  layout="fill"
//   objectFit="cover"
  />
</div>
</motion.div>

                  </div>


                  
                  
                  </div>
            </div>
            <Footer></Footer>
        </div>
        </>
    )
}

export default SendEmail;