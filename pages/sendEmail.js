import Navbar from "../components/navbar" 
import Footer from "../components/footer"
import Image from "next/image";
import {SendEmailSchema} from "../schema"
// import Link from 'next/link'
import 'react-toastify/dist/ReactToastify.css';
import { useState } from "react";
import { ToastContainer,toast} from 'react-toastify';
import { motion } from "framer-motion"
import {HiOutlineMail} from "react-icons/hi"
import { useFormik } from "formik";
import axios from "../utils/axiosconfiguration"
import { useRouter } from "next/router";
import NProgress from "nprogress"
import { useEffect} from "react";
const SendEmail=()=>{
  
  useEffect(() => {
    NProgress.done();
},[])
  const router = useRouter();
    const contVar={
        hidden:{
          y:5,
        },
        visible:{
          y:-6,
          transition:{
            duration:0.6,
            yoyo:Infinity,
          }
        }
        }


        const [checker,setChecker]= useState(false);

        let initialValues={
           email:"",
          }



          const {values,errors,touched,handleSubmit,handleChange,handleBlur,setFieldValue} =useFormik({
            initialValues,
            validationSchema:SendEmailSchema,
            onSubmit:async (values,action)=>{
                console.log("🚀 ~ file: sendEmail.js ~ line 41 ~ onSubmit: ~ values", values)
                setChecker(true);
             try{   
             const response=await axios.post("/email", values);

             if(response?.data?.message=="success")
             {
                router.push("/emailVerification");   
            }

            }
            catch(error)
            {
              console.log("🚀 ~ file: registration.js ~ line 85 ~ onSubmit: ~ error", error)
              setChecker(false);
              if(error?.response?.data==undefined)
              {  
                console.log("Imside serever error")
                  toast.error("Server Error Please Try Later", {
                          position: "top-center",
                        }); 
              }
              else{
              console.log(error?.response?.data)
              toast.error(error?.response?.data.message, {
                  position: "top-center",
                });
              }
          };
            setChecker(false);
    
            }
    
        })










    return (
        <>
        <div className="flex flex-col min-h-screen">

            <Navbar></Navbar>
            <div className="email flex-1 flex justify-center items-center py-[7rem] sm:p-[8rem] rounded-lg">


<div className="size sm:w-[40rem] bg-white rounded-2xl px-[2.5rem] py-[2.3rem] space-y-[3.3rem]">
<div>

<div className="w-[6rem] h-[6rem]   md:w-[4rem] md:h-[4rem]  relative">
  <Image 
  src="/rocket.png"
  layout="fill"
//   objectFit="cover"
  />
</div>
                  </div>
                  
                  <div className="flex flex-col space-y-[2rem]">

                  <h2 className="textSize font-['Inconsolata'] text-[2.5rem] font-medium ">Enter Email Address</h2>
     <form onSubmit={handleSubmit}>
<div className="w-[100%] flex justify-center flex-col items-center space-y-[0.5rem] -mt-[1rem]">
                <div className="reginpemail w-[100%]">

                <HiOutlineMail className="text-[2.5rem] "></HiOutlineMail>
                <input type="text" 
                placeholder="arbaz123@gmail.com" 
                className="reginput"
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                autoComplete="off"
                />
                </div>
                {errors.email && touched.email ? (<p className="text-red-500 text-[1.4rem] w-[100%] block">{errors.email}</p>):null}
            </div>


<div className="flex justify-center">
<button type="submit" className="bg-blue-500 block mt-[2rem] hover:bg-blue-700  text-white font-normal text-[1.8rem] sm:font-semibold py-3 px-8  sm:py-3 sm:px-10 rounded-full font-['Inconsolata'] tracking-wider">
  Send Email
</button>
</div>               
</form>                  {/* <p className="font-['Inconsolata'] text-[1.4rem] ">Account Acitvation Link has been sent to the email you provided</p> */}
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


                  
                  <ToastContainer pauseOnHover autoClose={5000} className="text-[1.6rem]"/>                  
                  </div>
            </div>
            <Footer></Footer>

        </div>
        </>
    )
}

export default SendEmail;