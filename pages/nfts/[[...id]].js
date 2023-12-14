import {MdFilterList} from "react-icons/md"
import getDataRoute from "../../utils/getDataRoute";
import useValidate from "../../utils/useValidate";
import {fetcherNft} from "../../utils/fetcher"
import Image from "next/image";
import {
  Navbar, Pagination, Footer,NftFilter as Filter, useState,useRouter,  getServerSideProps, ToastContainer,IndividualNFT,useSWR,PuffLoader
} from "../../components"


const NFT =({userinfo})=>{


    const router = useRouter();
    let {route,paramid}=getDataRoute(router,"getnfts");
    const { data, error,isValidating } = useSWR(route, fetcherNft);

    const [showItems, show]=useState(false);


const [loading, user, address] = useValidate(userinfo, "main");



    return (<>
{!loading ? (
              <div className="text-[1.6rem] ">
              <ToastContainer pauseOnHover autoClose={5000} />
            </div>
      ) : (
        <>
    
    <Navbar></Navbar>
    <div className="px-[2rem] sm:px-[4rem] md:px-[4.9rem]">

<div className="flex justify-between w-[100%] items-center flex-wrap flex-col xs:flex-row mb-[1rem]">
    <div className=" w-fit text-[3rem] font-bold  bord-bottom  flex justify-center  mt-[2rem]"> 

<div className="text-[#121212] w-fit "> All NFTs</div>

    <div className=" inline-block w-[3.8rem] h-[4rem] sm:w-[3.2rem] md:w-[4rem] mt-[0.6rem] ml-[0.5rem] sm:h-[3.2rem] md:h-[4rem] rounded-full relative">
      <Image
        className="rounded-full"
        src={`/topnft.png`}
        layout="fill"
      //   objectFit="cover"
      /></div>
  </div>

        <div className="cursor-pointer text-[1.8rem] mt-[2rem] font-semibold text-[#000000c7] flex items-center " onClick={()=>{show((prevState)=>{
    return prevState?false:true;
  })}}>Search NFTs By filters <MdFilterList className="text-[2.3rem] pl-[0.3rem]"></MdFilterList>
        </div>
        </div>
    
    <Filter showItems={showItems}></Filter>

    </div>

    <div className="pl-[1.2rem]">

    {/* <span className="colgrad text-[1.6rem] font-semibold text-center sm:text-left mt-[1.2rem] mx-[2.8rem] md:mx-[4.3rem] block  ">(Click on any NFT to see his full detail and buying option)</span> */}

<div className="flex flex-wrap jt mx-[4rem] mg minheight">



        {
            isValidating ?
             ( <div className="flex w-[100%] h-[100%] mt-[5rem] justify-center ">

            <PuffLoader
              color={"#30DCBA"}
              cssOverride={{ marginBottom: "20px" }}
              size={160}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>)
           :null }
        

{/* {temp.map((value,index)=>{
            return(<IndividualNFT key={index} index={index} nftname={value.nftname} owner={value.owner} creator={value.creator} price={value.price} creationdate={value.creationdate} nfttext={value.nfttext}></IndividualNFT>)
        })
    } */}


                  {error ? (<div className="text-[red] font-bold text-[1.7rem] sm:text-[2rem] md:text-[2.3rem] w-fit  mt-[0.5rem]">
                                Error in getting NFTs Please try later!</div>) : ""
                            }


                            {
                                (!error && data && !isValidating) ?

                                    data?.nft?.map((data, index) => {
                                      return <IndividualNFT data={data} original={data?.original} key={index} index={index} nftname={data?.nftName} owner={data?.owner_email} creator={data?.creator_email} price={data?.price} creationdate={data?.createdAt} type={data?.contentType} contentURI={data?.contentURI} tokenURI={data?.tokenURI} id={data?.tokenURI} ></IndividualNFT>
                                    }) : ""
                            }


                 {data?.nft?.length==0 && !error ? (<div className="text-[#cbcdcf]  text-[1.7rem] sm:text-[2rem] md:text-[3.3rem] w-fit  mt-[1.5rem]">
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