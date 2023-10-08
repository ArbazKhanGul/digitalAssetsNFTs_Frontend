import { motion } from "framer-motion";
import Image from "next/image";

function workComp({title,text,icon}){
    const contVar={
        hidden:{
          x:"-100%",
          opacity: 0
        },
        visible:{
          x:0,
          opacity: 1,
          transition:{
            // delay: 0.1,
            duration:0.6
          }
        }
        }
        
        const right={
        //   hidden:{
        //     x:"100%",
        //     opacity: 0
        //   },
        //   visible:{
        //     x:0,
        //     opacity: 1,
        //     transition:{
        //       // delay: 0.2,
        //       duration:0.6
        //     }
        //   }
          }
    return <>
    <motion.div  className="bg-[white]  text-[#f5f6fae1] shad w-[90%] xs:w-[47%] md:w-[30%] lg:w-[23%] rounded-[0.5rem] mt-[2.5rem] md:mt-[5rem]">
<div className="flex font-medium items-center  col space-x-[1rem] border-b-[0.1rem] border-[#d1d5d6] px-[2.2rem] py-[1.5rem]">
  {/* <div className="p-[0.8rem] w-fit shad ">
    {Icon}
</div> */}
 <div  className="relative">
          <div className=" absolute -top-[0.5rem]  inline-block w-[3.5rem] h-[3.5rem] sm:w-[3.2rem] md:w-[5.5rem] sm:h-[3.2rem] md:h-[5.5rem] rounded-full ">
            <Image
              className="rounded-full"
              src={`/${icon}`}
              layout="fill"
            //   objectFit="cover"
            /></div>
        </div>
<h2 className="w-fit font-['Inconsolata'] text-[2rem] h-[2.2rem]"></h2>

    </div>
    <h2 className="w-fit font-['Inconsolata'] px-[2.2rem] pt-[2.4rem] font-[600] text-[2.2rem] text-[black]">{title}</h2>

    <div className="w-fit mx-[2.2rem] mb-[2rem] text-[#2f3640] font-['Inconsolata'] text-[1.5rem] text-justify">{text}</div>


    </motion.div>
    </>
}

export default workComp;