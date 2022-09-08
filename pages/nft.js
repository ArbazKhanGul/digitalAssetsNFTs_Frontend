import { useState,useEffect } from "react";
import {MdFilterList} from "react-icons/md"
import Navbar  from '../components/navbar'
import Filter from "../components/nft/filter";
import IndividualNFT  from "../components/mainpage/individualnft"
import Pagination from "../components/nft/pagination";
import Footer from "../components/footer/footer";
import NProgress from "nprogress"
const NFT =()=>{

    useEffect(() => {
        NProgress.done();
    },[])
    
    const [showItems, show]=useState(false);

    let temp=[{nftname:"NFT name",creator:"arbazkhangul123@gmail.com",owner:"owner@gmail.com",creationdate:"10/9/22-24:33:12",nfttext:"If you continue to work hard, success will follow you",price:"0.1BNB"},{nftname:"NFT name",creator:"creator@gmail.com",owner:"owner@gmail.com",creationdate:"10 /9/2002",nfttext:"If you continue to work hard, success will follow you",price:"0.1BNB"},{nftname:"NFT name",creator:"creator@gmail.com",owner:"owner@gmail.com",creationdate:"10 /9/2002",nfttext:"If you continue to work hard, success will follow you",price:"0.1BNB"},{nftname:"NFT name",creator:"creator@gmail.com",owner:"owner@gmail.com",creationdate:"10 /9/2002",nfttext:"If you continue to work hard, success will follow you",price:"0.1BNB"},{nftname:"NFT name",creator:"creator@gmail.com",owner:"owner@gmail.com",creationdate:"10 /9/2002",nfttext:"If you continue to work hard, success will follow you",price:"0.1BNB"},{nftname:"NFT name",creator:"creator@gmail.com",owner:"owner@gmail.com",creationdate:"10 /9/2002",nfttext:"If you continue to work hard, success will follow you",price:"0.1BNB"},{nftname:"NFT name",creator:"creator@gmail.com",owner:"owner@gmail.com",creationdate:"10 /9/2002",nfttext:"If you continue to work hard, success will follow you",price:"0.1BNB"},{nftname:"NFT name",creator:"creator@gmail.com",owner:"owner@gmail.com",creationdate:"10/9/2002",nfttext:"If you continue to work hard, success will follow you",price:"0.1BNB"},{nftname:"NFT name",creator:"creator@gmail.com",owner:"owner@gmail.com",creationdate:"10/9/2002",nfttext:"If you continue to work hard, success will follow you",price:"0.1BNB"}
]
    return (<>
    
    <Navbar></Navbar>
    <div className="px-[2rem] sm:px-[4rem] md:px-[5.9rem]">
    <div className="flex flex-col sm:flex-row justify-between items-center mt-[0.5rem] flex-wrap">
        <div className="nft text-[2.7rem] sm:text-[3rem] md:text-[3.7rem] w-fit font-['DynaPuff'] mt-[0.5rem]">All Selling NFTs</div>
        <div className="cursor-pointer text-[1.6rem] sm:text-[1.9rem] md:text-[2rem] mt-[0.5rem] font-semibold text-[#353846C7] flex items-center font-['Inconsolata']" onClick={()=>{show((prevState)=>{
    return prevState?false:true;
  })}}>Search NFTs By filters <MdFilterList className="text-[2.5rem] pl-[0.3rem]"></MdFilterList>
        </div>
    </div>
    <Filter showItems={showItems}></Filter>
    
    </div>
    
    <div className="pl-[1.2rem]">
        
    <span className="colgrad text-[1.6rem] font-semibold text-center sm:text-left mt-[1.2rem] mx-[2.8rem] md:mx-[4.3rem] block font-['Inconsolata'] ">(Click on any NFT to see his full detail and buying option)</span>

<div className="flex flex-wrap jt mx-[4rem] mg">


{temp.map((value,index)=>{
            return(<IndividualNFT key={index} index={index} nftname={value.nftname} owner={value.owner} creator={value.creator} price={value.price} creationdate={value.creationdate} nfttext={value.nfttext}></IndividualNFT>)
        })
    }

</div>

    </div>

    <div>

        <Pagination></Pagination>
    </div>

    <Footer></Footer>
    </>)
}

export default NFT;