import { motion } from "framer-motion";
import Image from "next/image";

function workComp({title,text,icon,dir}){
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
            duration:0.5
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
              duration:0.5
            }
          }
          }
    return <>
    <motion.div  className="bg-[white]  text-[#f5f6fae1] shad w-[100%] xs:w-[90%] sm:w-[45%] md:w-[31%] lg:w-[23%] rounded-[0.5rem] mt-[2.5rem] md:mt-[5rem]" variants={dir=="left"?contVar:right} initial="hidden" whileInView="visible">
<div className="flex font-medium items-center  col space-x-[1rem] border-b-[0.1rem] border-[#d1d5d6] px-[2.2rem] py-[1.5rem]">

 <div  className="relative">
          <div className=" absolute  md-top-[0.5rem]  inline-block w-[4.5rem] h-[4.5rem]  md:w-[5.5rem]  md:h-[5.5rem] rounded-full ">
            <Image
              className="rounded-full"
              src={`/${icon}`}
              layout="fill"
            //   objectFit="cover"
            /></div>
        </div>
<h2 className="w-fit  text-[2rem] h-[2.2rem]"></h2>

    </div>
    <h2 className="w-fit  px-[2.2rem] pt-[2rem] md:pt-[3rem] font-semibold text-[1.9rem] md:text-[2.1rem] text-[black]">{title}</h2>

    <div className="w-fit mx-[2.2rem] mb-[2rem] text-[#2f3640]  text-[1.4rem] md:text-[1.5rem] text-justify">{text}</div>


    </motion.div>
    </>
}

export default workComp;