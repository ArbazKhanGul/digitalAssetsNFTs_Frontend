import Navbar from "../components/navbar"
import Image from "next/image"; 
import {BsPerson} from "react-icons/bs"
import {HiOutlineMail} from "react-icons/hi"
import { Icon } from '@iconify/react';
import Footer from "../components/footer/footer"
const Registeration =()=>{
return(
    <>
    <Navbar></Navbar>
    <div className="flex reg flex-col lg:flex-row  px-[4%] xl:px-[6%] py-[3%] heig items-center">
        <div className="formwid">

            <div className="flex flex-col justify-center items-center py-[2rem] sm:py-[3rem] space-y-[2.5rem] bg-white bordd">

                <h2 className="text-[2.4rem] sm:text-[2.9rem] -ml-[2rem] sm:--ml-[0rem] md:text-[3.2rem] block">Registeration</h2>

                <div className="reginp">

                <BsPerson className="text-[2.5rem]"></BsPerson>
                <input type="text" placeholder="Collection Name..." className="reginput" />
                </div>


                <div className="reginp">

                <BsPerson className="text-[2.5rem]"></BsPerson>
                <input type="text" placeholder="Author Name..." className="reginput"/>
                </div>

                <div className="reginp">

                {/* <BsPerson ></BsPerson> */}
                <HiOutlineMail className="text-[2.5rem]"></HiOutlineMail>
                <input type="text" placeholder="Author Name..." className="reginput"/>
                </div>


                <div className="reginp">

                <Icon icon="logos:metamask-icon" className="text-[2.1rem]" />
                <input type="text" placeholder="Author Name..." className="reginput"/>
                </div>


                <textarea name=""  placeholder="Description..." id=""   className="rounded-2xl resize-none outline-none h-[13rem]  border-[1px] w-[85%] sm:w-[80%] border-[#534c4c] block placeholder:text-[#746e6e] p-[0.8rem] text-black text-[1.7rem] sm:text-[1.8rem] bg-transparent"></textarea>

                <div className="mb-[1rem] text-[2rem] sm:w-[80%]  flex  space-x-[0rem] sm:space-x-[1rem] space-y-[2rem] sm:space-y-[0rem] flex-col sm:flex-row">
    <button className="bg-blue-500 hover:bg-blue-700  text-white font-normal text-[1.7rem] sm:text-[1.7rem] sm:font-semibold py-3 px-8  sm:py-3 sm:px-[1.7rem] rounded-full">
  Connect Metamask
</button>
<button className="bg-blue-500  hover:bg-blue-700  text-white font-normal text-[1.7rem] sm:text-[1.7rem] sm:font-semibold py-3  px-8  sm:py-3 sm:px-[5rem] rounded-full">
  Register
</button>
    </div>
            </div>
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
    </>
)
}

export default Registeration;