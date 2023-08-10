import { memo } from "react";
import { useRouter } from "../index";
import { ethers } from 'ethers'
import { useEffect, useState } from "react";
import PuffLoader from "react-spinners/PuffLoader";
import axios from "axios";
import Image from "next/image";
import ReactPlayer from "react-player";
import {MdCopyright} from "react-icons/md"


const IndividualNFT = ({ nftname, owner, creator, creationdate,original, price, index, id,  type, contentURI,tokenURI }) => {
console.log("🚀 ~ file: individualnft.js:13 ~ IndividualNFT ~ original:", original)

  let router = useRouter()
  let date = new Date(creationdate);
  const [textData, setTextData] = useState("");
  const [Loading, setLoading] = useState(true);

  const [playing, setPlaying] = useState(false)
  const handleReady = () => {
    setPlaying(true)
  }


f

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
    <div onClick={() => { router.push(`/individualnft/${id}`) }} className={" cursor-pointer bord_grad nftwdith mt-[2.5rem] lg:mt-[3rem] transition-all duration-500 hover:-translate-y-2 h-fit" + (index == 8 ? "hid" : "")}>





      {type == "text" ?
        <div className="text_color h-[20.5rem] break-words  flex items-center text-[2.4rem] text-center px-[1.8rem] mt-[0.7rem] font-semibold bord-bottom font-['Inconsolata']">

          {Loading ? (<div className="flex justify-center items-center w-[100%]  mt-[4px]">

            <PuffLoader
              color={"#30DCBA"}
              cssOverride={{ marginBottom: "10px" }}
              size={110}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>) : <h2 className="!text-[2.3rem] font-bold text-['#2d3436'] break-words overflow-y-hidden font-['Inconsolata']  w-[100%]  text-center max-h-[100%] ">
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





      <div className="px-[2rem] pb-[1.5rem] pt-[0.8rem] flex flex-col bg-[#F2F2F278] nft_round">
        
        <div className="w-full flex justify-center">
        {original?<div className="colgrad text-[2rem] text-center font-semibold tracking-widest overflow-hidden text-ellipsis whitespace-nowrap">
          {nftname}
        </div>:<div className="colgrad relative text-[2rem]  text-center px-[2rem] font-semibold tracking-widest overflow-hidden text-ellipsis whitespace-nowrap">
          {nftname} <span className="absolute -top-[0rem] right-[1rem] overflow-visible z-10 text-red-600">
            <MdCopyright className="w-[1.3rem] h-[1.3rem] text-[#7D7C7CCF]"/>
            
          </span>
        </div>}
        </div>
  
        <div className="flex justify-between space-x-[1.5rem]">
          <div className="flex flex-col">
            <span className="colgrad text-[1.7rem] font-['Inconsolata'] font-semibold">Creator </span>
            <span className="colgrad text-[1.7rem] font-['Inconsolata'] font-semibold">Owner </span>
            <span className="colgrad text-[1.7rem] whitespace-nowrap font-['Inconsolata'] font-semibold">Create </span>
            <span className="colgrad text-[1.7rem] font-['Inconsolata'] font-semibold mt-[0.3rem]">Price </span>
          </div>

          <div className="flex flex-col space-y-[0.3rem] overflow-hidden">
            <span className="text-[#7D7C7CCF] text-[1.6rem] w-[100%] font-['Inconsolata'] font-medium overflow-hidden text-ellipsis">{creator}</span>
            <span className="text-[#7D7C7CCF] text-[1.6rem] w-[100%] font-['Inconsolata'] font-medium overflow-hidden text-ellipsis">{owner}</span>
            <span className="text-[#7D7C7CCF] text-[1.6rem] w-[100%] font-['Inconsolata'] font-medium overflow-hidden text-ellipsis whitespace-nowrap">{date.toLocaleString()}</span>
            <span className="text-[#7D7C7CCF] text-[1.6rem] w-[100%] font-['Inconsolata'] font-medium overflow-hidden text-ellipsis whitespace-nowrap">{price > 0 ? ethers.utils.formatUnits(price.toLocaleString('fullwide', { useGrouping: false }), 18) : "..."} BNB</span>
            {/* <span className="text-[#7D7C7CCF] text-[1.6rem] font-['Inconsolata'] font-medium">
              &asymp; ${price > 0 ? priceDollar : "..."}
            </span> */}
          </div>

        </div>


      </div>
    </div>
  )
}

export default memo(IndividualNFT);