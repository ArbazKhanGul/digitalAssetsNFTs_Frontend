import { memo } from "react";
import { useRouter } from "../index";
import { ethers } from 'ethers'
import { useEffect, useState } from "react";
import PuffLoader from "react-spinners/PuffLoader";
import axios from "axios";
import Image from "next/image";
import ReactPlayer from "react-player";
import {MdCopyright} from "react-icons/md"
import { motion } from "framer-motion"

const IndividualNFT = ({ nftname, owner, creator, creationdate,original, price, index, id,  type, contentURI,tokenURI }) => {
console.log("🚀 ~ file: individualnft.js:13 ~ IndividualNFT ~ tokenURI:", tokenURI)
console.log("🚀 ~ file: individualnft.js:13 ~ IndividualNFT ~ contentURI:", contentURI)

const contVar={
  // hidden:{
  //   x:"-100%",
  //   opacity: 0
  // },
  // visible:{
  //   x:0,
  //   opacity: 1,
  //   transition:{
  //     // delay: 0.1,
  //     duration:0.4
  //   }
  // }
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

  
  let router = useRouter()
  let date = new Date(creationdate);
  const [textData, setTextData] = useState("");
  const [Loading, setLoading] = useState(true);

  const [playing, setPlaying] = useState(false)
  const handleReady = () => {
    setPlaying(true)
  }




  useEffect(() => {
    async function fetchData() {
      try {

        const response = await axios.get(`${process.env.ipfsURL}${tokenURI}`);
        setTextData(response.data?.title);
        setLoading(false)
      } catch (err) {
        console.log("🚀 ~ file: individualnft.js:29 ~ fetchData ~ err:", err)
      }

    }
    if (type == "text") {
      fetchData();
    }
  }, [])





  return (
    <motion.div  onClick={() => { router.push(`/individualnft/${id}`) }} className={" cursor-pointer bord_grad_nft nftwdith mt-[2.5rem] lg:mt-[3rem] transition-all duration-500 hover:-translate-y-2 h-fit" + (index == 8 ? "hid" : "")}>



      {type == "text" ?
        <div className=" h-[20.5rem] break-words  flex items-center text-[2.4rem] text-center px-[1.8rem] mt-[0.7rem] font-semibold  ">

          {Loading ? (<div className="flex justify-center items-center w-[100%]  mt-[4px]">

            <PuffLoader
              color={"#30DCBA"}
              cssOverride={{ marginBottom: "10px" }}
              size={110}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>) : <h2 className="text-[black] !text-[2.3rem] font-bold  break-words overflow-y-hidden   w-[100%] font-['Inconsolata']  text-center max-h-[100%] ">
            {textData}
          </h2>
          }

        </div>
        : null}



      {type == "image" ?
        <div className="rounded-tr-[3rem] rounded-tl-[3rem] pt-[0%] relative listitem h-[20.5rem] break-words flex justify-center items-center scrollbar-thin scroll ">

          {Loading ? (<div className="flex justify-center items-center w-[100%]  mt-[4px]">
<PuffLoader
  color={"#30DCBA"}
  cssOverride={{ marginBottom: "10px" }}
  size={110}
  aria-label="Loading Spinner"
  data-testid="loader"
/>
</div>) : null   }      

 <div className=" inline-block w-[100%] h-[100%]  relative">
            <Image
              src={`${process.env.ipfsURL}${contentURI}`}
              layout="fill"
              onLoad={()=>{console.log("wfs");setLoading(false)}}
            /></div>


        </div> : null}

      {type == "video" ?
        <div className="heightAdjust w-[100%] pt-[56.25%] rounded-tr-[3rem] rounded-tl-[3rem] relative listitem h-[20.5rem]  flex justify-center items-center ">
          <ReactPlayer
            url={`${process.env.ipfsURL}${contentURI}`}
            // controls={true}
            loop={true}
            muted={true}
            config={{
              file: {
                attributes: {
                  controlsList: 'nodownload'
                }
              }
            }}
            playing={playing}
            onReady={() => { setPlaying(true) }}
            key={playing}
            width="100%"
            height="100%"
            style={{ position:"absolute" ,left:0,top:0,objectFit: "cover"}}
          />
        </div> : null}

      {type == "audio" ?
        <div className="w-[100%] px-[1rem] bg-[black] rounded-tr-[3rem] rounded-tl-[3rem] pt-[0%] relative listitem h-[20.5rem] break-words flex justify-center items-center scrollbar-thin scroll ">
          <ReactPlayer
            url={`${process.env.ipfsURL}${contentURI}`}
            controls={true}
            config={{
              file: {
                attributes: {
                  controlsList: 'nodownload'
                }
              }
            }}
            width="100%"
            height="48px"
            style={{ height: "100px" }}
          />
        </div> : null}





      <div className="px-[2rem] pb-[1.5rem] pt-[0.8rem] flex flex-col bg-[#233283] nft_round">
        <div className="w-full flex justify-center">
        {original?<div className="colgradnft text-[2rem] text-center font-semibold tracking-widest overflow-hidden text-ellipsis whitespace-nowrap">
          {nftname}
        </div>:<div className="colgradnft relative text-[2rem]  text-center px-[2rem] font-semibold tracking-widest overflow-hidden text-ellipsis whitespace-nowrap">
          {nftname} <span className="absolute -top-[0rem] right-[1rem] overflow-visible z-10 text-red-600">
            <MdCopyright className="w-[1.3rem] h-[1.3rem] text-[white]"/>
          </span>
        </div>}
        </div>

        <div className="flex justify-between space-x-[1.5rem]">
          <div className="flex flex-col">
            <span className="colgradnft text-[1.7rem]  font-medium">Creator </span>
            <span className="colgradnft text-[1.7rem]  font-medium">Owner </span>
            <span className="colgradnft text-[1.7rem]  font-medium mt-[0.3rem]">Price </span>
        </div>

        <div className="flex flex-col space-y-[0.3rem] overflow-hidden">
            <span className="text-[#e7e5e5] text-[1.6rem] w-[100%]   overflow-hidden text-ellipsis">{creator}</span>
            <span className="text-[#e7e5e5] text-[1.6rem] w-[100%]   overflow-hidden text-ellipsis">{owner}</span>
            <span className="text-[#e7e5e5] text-[1.6rem] w-[100%]   overflow-hidden text-ellipsis whitespace-nowrap">{price > 0 ? ethers.utils.formatUnits(price.toLocaleString('fullwide', { useGrouping: false }), 18) : "..."} BNB</span>
        </div>

        </div>


      </div>
    </motion.div>
  )
}

export default memo(IndividualNFT);