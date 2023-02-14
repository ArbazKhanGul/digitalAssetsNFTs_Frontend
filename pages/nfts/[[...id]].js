import {MdFilterList} from "react-icons/md"
import Filter from "../..//components/nft/filter";
import "react-toastify/dist/ReactToastify.css";

import {
    useEffect, Navbar, Pagination, Footer, useState,
    useRouter, validateUser, getServerSideProps, toast, ToastContainer, useSelector,fetcher,
    useDispatch, selectAddress, addAddress,NFTPortion,Work,TopCollections,Main,selectUser,addUser,IndividualNFT
} from "../../components"

import useSWR from 'swr'
import getDataRoute from "../../utils/getDataRoute";
import useValidate from "../../utils/useValidate";
import {fetcherNft} from "../../utils/fetcher"


const NFT =({userinfo})=>{

    const router = useRouter();
    let {route,paramid}=getDataRoute(router,"getnfts");
    const { data, error } = useSWR(route, fetcherNft);
    console.log("🚀 ~ file: [[...id]].js:20 ~ NFT ~ data", data)

    const [showItems, show]=useState(false);

    let temp=[{nftname:"NFT name",creator:"arbazkhangul123@gmail.com",owner:"owner@gmail.com",creationdate:"10/9/22-24:33:12",nfttext:"If you continue to work hard, success will follow you",price:"0.1BNB"},{nftname:"NFT name",creator:"creator@gmail.com",owner:"owner@gmail.com",creationdate:"10 /9/2002",nfttext:"If you continue to work hard, success will follow you",price:"0.1BNB"},{nftname:"NFT name",creator:"creator@gmail.com",owner:"owner@gmail.com",creationdate:"10 /9/2002",nfttext:"If you continue to work hard, success will follow you",price:"0.1BNB"},{nftname:"NFT name",creator:"creator@gmail.com",owner:"owner@gmail.com",creationdate:"10 /9/2002",nfttext:"If you continue to work hard, success will follow you",price:"0.1BNB"},{nftname:"NFT name",creator:"creator@gmail.com",owner:"owner@gmail.com",creationdate:"10 /9/2002",nfttext:"If you continue to work hard, success will follow you",price:"0.1BNB"},{nftname:"NFT name",creator:"creator@gmail.com",owner:"owner@gmail.com",creationdate:"10 /9/2002",nfttext:"If you continue to work hard, success will follow you",price:"0.1BNB"},{nftname:"NFT name",creator:"creator@gmail.com",owner:"owner@gmail.com",creationdate:"10 /9/2002",nfttext:"If you continue to work hard, success will follow you",price:"0.1BNB"},{nftname:"NFT name",creator:"creator@gmail.com",owner:"owner@gmail.com",creationdate:"10/9/2002",nfttext:"If you continue to work hard, success will follow you",price:"0.1BNB"},{nftname:"NFT name",creator:"creator@gmail.com",owner:"owner@gmail.com",creationdate:"10/9/2002",nfttext:"If you continue to work hard, success will follow you",price:"0.1BNB"}
]

const [loading, user, address] = useValidate(userinfo, "main");



    return (<>
{!loading ? (
              <div className="text-[1.6rem] font-['Inconsolata']">
              <ToastContainer pauseOnHover autoClose={5000} />
            </div>
      ) : (
        <>
    
    <Navbar></Navbar>
    <div className="px-[2rem] sm:px-[4rem] md:px-[4.9rem]">
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

<div className="flex flex-wrap jt mx-[4rem] mg minheight">





{/* {temp.map((value,index)=>{
            return(<IndividualNFT key={index} index={index} nftname={value.nftname} owner={value.owner} creator={value.creator} price={value.price} creationdate={value.creationdate} nfttext={value.nfttext}></IndividualNFT>)
        })
    } */}


                  {error ? (<div className="nft text-[1.7rem] sm:text-[2rem] md:text-[2.3rem] w-fit font-['DynaPuff'] mt-[0.5rem]">
                                Error in getting NFTs Please try later</div>) : ""
                            }

                            {
                                (!error && data) ?

                                    data?.nft?.map((data, index) => {
                                        return <IndividualNFT key={index} index={index} nftname={data?.nftName} owner={data?.owner_email} creator={data?.creator_email} price={data?.price} creationdate={data?.createdAt} nfttext={data?.title}  id={data?.tokenURI}></IndividualNFT>


                                    }) : ""
                            }


{data?.nft?.length==0 && !error ? (<div className="text-[#cbcdcf]  text-[1.7rem] sm:text-[2rem] md:text-[3.3rem] w-fit font-['Inconsolata'] mt-[1.5rem]">
                            OOPS!   Nothing to show...</div>) : ""
                            }

</div>

    </div>

    <div>

    {
                        data?.count > 8 && paramid * 8 < data?.count + 8 ? <Pagination url={"nfts"} count={data?.count} pageShow={paramid} div={8}/> : ""
                    }
    </div>

    <Footer></Footer>
    </>
      )}

    </>)
}

export default NFT;


export {getServerSideProps}