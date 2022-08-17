import { useEffect, useRef } from "react";
import Navbar from "../components/navbar"
import Image from "next/image"; 
import {BsPerson} from "react-icons/bs"
import {HiOutlineMail} from "react-icons/hi"
import { Icon } from '@iconify/react';
import Footer from "../components/footer/footer"
import { useFormik } from "formik";
import {SignUpSchema} from "../schema"
import { connectWallet } from "../metamask";
import { ToastContainer} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector, useDispatch } from 'react-redux'
import {selectAddress} from '../slice/metamask'
import { useState } from "react";
import {CgProfile} from "react-icons/cg"

const Registeration =()=>{
     
    const address = useSelector(selectAddress);
    const dispatch = useDispatch()
    const inputElement = useRef(null);
    const fileRef=useRef(null);
    // const [wallet,setwallet]= useState("");

    

useEffect(()=>{

    if(address==undefined)
    {
        inputElement.current.value="";

    }
    else

    {

       
        setFieldValue("walletAddress", address)
       
        inputElement.current.value=address;
    }

},[address])


let initialValues={

collectionName:"",
authorName:"",
email:"",
walletAddress:"",
description:"",
createdOn:"",
file:""

}



    const {values,errors,touched,handleSubmit,handleChange,handleBlur,setFieldValue} =useFormik({
        initialValues,
        validationSchema:SignUpSchema,

        onSubmit:(values,action)=>{
            values.createdOn=new Date().toLocaleString();

            const formdata=new FormData();
         for ( var key in values ) 
         {
        formdata.append(key, values[key]);
         }

            
            console.log("PRinitng values",values);
            fileRef.current.value=""

            action.resetForm();
        }

    })


return(
    <>
    <Navbar></Navbar>
    <div className="flex reg flex-col lg:flex-row  px-[4%] xl:px-[6%] py-[5%] xl:py-[3%] heig items-center">
   
        <div className="formwid">
        <form onSubmit={handleSubmit}>
            <div className="flex flex-col justify-center items-center py-[2rem] sm:py-[3rem] space-y-[2rem] lg:space-y-[2.6rem] bg-white bordd">

                <h2 className="text-[2.4rem] sm:text-[2.9rem]  md:text-[3.2rem] block font-['DynaPuff']">Registration</h2>

            <div className="w-[100%] flex justify-center flex-col items-center space-y-[0.5rem] font-['Inconsolata']">
                <div className="reginp w-[100%]">

                <BsPerson className="text-[2.5rem]"></BsPerson>
                <input type="text" 
                placeholder="Collection Name..."
                 className="reginput"
                 name="collectionName"
                 value={values.collectionName}
                 onChange={handleChange}
                 onBlur={handleBlur}
                 autoComplete="off"
                 />
                </div>
           {errors.collectionName && touched.collectionName ? (<p className="text-red-500 text-[1.4rem] errors block">{errors.collectionName}</p>):null}
            </div>

                <div className="w-[100%] flex justify-center flex-col items-center space-y-[0.5rem]">
                <div className="reginp w-[100%]">

                <BsPerson className="text-[2.5rem]"></BsPerson>
                <input type="text" 
                placeholder="Author Name..."
                 className="reginput"
                 name="authorName"
                 value={values.authorName}
                 onChange={handleChange}
                 onBlur={handleBlur}
                 autoComplete="off"
                 />
                </div>
                {errors.authorName && touched.authorName ? (<p className="text-red-500 text-[1.4rem] errors block">{errors.authorName}</p>):null}
            </div>


                <div className="w-[100%] flex justify-center flex-col items-center space-y-[0.5rem]">
                <div className="reginp w-[100%]">

                <HiOutlineMail className="text-[2.5rem] "></HiOutlineMail>
                <input type="text" 
                placeholder="Email Address..." 
                className="reginput"
                name="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                autoComplete="off"
                />
                </div>
                {errors.email && touched.email ? (<p className="text-red-500 text-[1.4rem] errors block">{errors.email}</p>):null}
            </div>



            <div className="w-[100%] flex justify-center flex-col items-center space-y-[0.5rem] ">

            <div className="reginpfile w-[100%] mb-[0.3rem] ">

            <CgProfile className="text-[2.5rem]"></CgProfile>
            <span className="text-start block w-[84%] ml-[1rem] text-[1.7rem]">Choose profile photo</span>

            </div>   
                <div className="reginpfile w-[100%] ">

                
                <input className="form-control
    block
    w-full
    text-[1.5rem]
    placeholder:text-[#746e6e]
    font-normal
    text-gray-700
    bg-white bg-clip-padding
    border border-solid border-gray-400
    rounded-lg
    
    transition
    ease-in-out
    file:border-none
    file:p-[0.6rem]
    m-0
     outline-none" type="file" id="formFile"
     name="file"
     ref={fileRef}
     accept="image/*"
     onChange={(e)=>{

        setFieldValue("file",e.target?.files[0] ? e.target?.files[0] : "")
    }
        
    }
     />

     
                </div>
                {errors.file && touched.file  ? (<p className="text-red-500 text-[1.4rem] errors block">{errors.file}</p>):null}

            </div>



                <div className="w-[100%] flex justify-center flex-col items-center space-y-[0.5rem]">
                <div className="reginp w-[100%]">

                <Icon icon="logos:metamask-icon" className="text-[2.1rem]" />
                <input type="text" 
                placeholder="Wallet Address..." 
                className="reginput"
                name="walletAddress"
                ref={inputElement}
                inputMode="text"
                disabled={true}
                />
                </div>
                {errors.walletAddress && touched.walletAddress  ? (<p className="text-red-500 text-[1.4rem] errors block">{errors.walletAddress}</p>):null}
            </div>


            <div className="w-[100%] flex justify-center flex-col items-center space-y-[0.5rem]">
                <textarea name="description"
                 value={values.description}
                 onChange={handleChange}
                 onBlur={handleBlur}
                 autoComplete="off"
                  placeholder="Description..." id=""   className="rounded-2xl resize-none outline-none h-[13rem]  border-[1px] w-[85%] sm:w-[83%]  border-gray-400 block placeholder:text-[#746e6e] p-[0.8rem] text-black text-[1.7rem] sm:text-[1.8rem] bg-transparent font-['Inconsolata']"></textarea>
                    {errors.description && touched.description  ? (<p className="text-red-500 text-[1.4rem] errors block">{errors.description}</p>):null}
           </div>
                <div className="mb-[1rem] text-[2rem] sm:w-[80%]  flex  space-x-[0rem] sm:space-x-[1rem] space-y-[2rem] sm:space-y-[0rem] flex-col sm:flex-row">
    <button type="button" className="font-['Inconsolata'] tracking-wider bg-blue-500 hover:bg-blue-700  text-white font-normal text-[1.7rem] sm:text-[1.7rem] sm:font-medium py-3 px-8  sm:py-3 sm:px-[1.7rem] rounded-full" onClick={()=>connectWallet(dispatch,address)}>
  Connect Metamask
</button>
<button type="submit" className="font-['Inconsolata'] tracking-wider bg-blue-500  hover:bg-blue-700  text-white font-normal text-[1.7rem] sm:text-[1.7rem] sm:font-medium py-3  px-8  sm:py-3 sm:px-[5rem] rounded-full">
  Register
</button>
    </div>

   
            </div>
            </form>
        </div>
      
        <div className="">
<div className=" md:ml-[9rem]   lg:w-[42rem] lg:h-[45rem] xl:w-[57rem] xl:h-[58rem]  relative">
  <Image 
  src="/registeration.png"
  layout="fill"
//   objectFit="cover"
  />
</div>
        </div>
    </div>

    <Footer></Footer>
    <div className="text-[1.5rem] font-['Inconsolata']">
    <ToastContainer pauseOnHover autoClose={5000}/>
    </div>
    </>
)
}

export default Registeration;