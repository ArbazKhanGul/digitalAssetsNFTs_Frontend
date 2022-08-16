import Image from "next/image";
import { motion } from "framer-motion"
const Work=()=>{
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
return (<>
<div className=" h-fit  overflow-x-hidden xl:h-fit work mt-[2.5rem] flex flex-col lg:flex-row py-[2.5rem] lg:py-[7rem] px-[2.5rem] lg:px-[5rem] items-center justify-between">

<motion.div variants={contVar} initial="hidden" whileInView="visible" className="w-[100%] lg:w-[50%]"><h2 className="workhead  text-[2.8rem] sm:text-[3rem] xl:text-[3.8rem] font-bold  font-['Inconsolata'] leading-[3.5rem]">How Golden Words Nfts Work:</h2>
<p className="text-[#f5f1f1] text-[1.9rem] xl:text-[1.8rem] text-justify pt-[2.3rem] font-['Inconsolata']">
Golden Words NFTs is a latest method of creating NFTs, in which one can create NFTs of Golden Words 
(text format) instead of pictures. Moreover, no one can create a copy of any other person's Golden Words
 NFTs because we use such alogrithms so that if any one want to create NFT by copying some other person NFT text then this platform does
 not allow them to create NFT of this text that is already use by some other person. And there is also verified email is associated with every collection
 and one email can be used for one collection only
 {/*a strong authentication system and with every 
 NFT collection, a verified email is associated with each NFt which can verify each an 
 every person, so that no one can create NFT on behalf of some other person and use some other person name. */}
 . Last but the not the least,
  all the data about these NFTs is stored on Blockchain and you can check this by simply visiting 
 all contracts and we hope you will like this new way of creating NFTs and appreciate our work. And you can 
 sell your NFT simply by adding it on marketplce and if you create NFT and you sell it then on every 
 selling of this NFT you can 8% from profit and this profit is transferrd automatically to your account. 
</p>
</motion.div>
<motion.div variants={right} initial="hidden" whileInView="visible" className="w-[100%] lg:w-[46%] xl:w-[42.5%] 2xl:w-[43.5%] sm:hidden lg:block relative">
<div className=" w-[100%] resheight mt-[2.5rem] sm:mt-[4rem] object-cover rounded-2xl  lg:w-[47rem] lg:h-[31rem]  xl:w-[50rem] xl:h-[30rem] 2xl:w-[53rem] 2xxl:h-[32rem]    relative">
  <Image 
  className="rounded-2xl"
  src="/workimage.jpg"
  layout="fill"
  objectFit="cover"
  />
</div>

</motion.div>
</div>
</>)

}

export default Work;