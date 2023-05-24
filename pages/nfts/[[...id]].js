import {MdFilterList} from "react-icons/md"
import getDataRoute from "../../utils/getDataRoute";
import useValidate from "../../utils/useValidate";
import {fetcherNft} from "../../utils/fetcher"
import {
  Navbar, Pagination, Footer,NftFilter as Filter, useState,useRouter,  getServerSideProps, ToastContainer,IndividualNFT,useSWR,PuffLoader
} from "../../components"


const NFT =({userinfo})=>{


    const router = useRouter();
    let {route,paramid}=getDataRoute(router,"getnfts");
    const { data, error,isLoading } = useSWR(route, fetcherNft);

    const [showItems, show]=useState(false);


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
        <div className="nft text-[2.7rem] sm:text-[3rem] md:text-[3.7rem] w-fit font-['DynaPuff'] mt-[0.5rem]">All NFTs</div>
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



        {
            isLoading ?
             ( <div className="flex w-[100%] h-[100%] justify-center ">

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


                  {error ? (<div className="text-[red] font-bold text-[1.7rem] sm:text-[2rem] md:text-[2.3rem] w-fit font-['Inconsolata'] mt-[0.5rem]">
                                Error in getting NFTs Please try later!</div>) : ""
                            }

                            {
                                (!error && data) ?

                                    data?.nft?.map((data, index) => {
                                      return <IndividualNFT data={data} key={index} index={index} nftname={data?.nftName} owner={data?.owner_email} creator={data?.creator_email} price={data?.price} creationdate={data?.createdAt} type={data?.contentType} contentURI={data?.contentURI} tokenURI={data?.tokenURI} id={data?.tokenURI} ></IndividualNFT>
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