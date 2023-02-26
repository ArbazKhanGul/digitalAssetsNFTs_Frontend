import Navbar from "../../components/navbar";
import { useEffect, useState } from "react";
import Binance from 'binance-api-node'
import { ethers } from 'ethers'
import Head from 'next/head'
import Meta from "../../components/meta"
import getServerSideProps from "../../utils/ServerSideNft"
import useValidate from "../../utils/useValidate"
import { toast, ToastContainer } from "react-toastify";
import Language from "../../utils/languageShow.json"
import Share from "../../components/share"
import Sell from "../../components/sellBuy/sell"
import parse from 'html-react-parser';
import CancelSelling from "../../components/sellBuy/cancelSelling";
import Buy from "../../components/sellBuy/buy";
import Approval from "../../components/sellBuy/approval";
import Individualnft from "../../components/mainpage/individualnft";
import useSWR from "swr";
import { fetcherOwnerNft } from "../../utils/fetcher";
import Footer from "../../components/footer";
import PuffLoader from "react-spinners/PuffLoader";
import { useRouter } from "next/router";

const IndividualNFT = ({ userinfo, nftData, nftSellingData }) => {


  let router=useRouter();

  const { data, error, isLoading } = useSWR(`/ownernfts/${nftSellingData?.owner_email}?nftName=${nftData?.name}`, fetcherOwnerNft);

  const [dollar, setDollar] = useState(0);

  const BNBPrice = async () => {
    try {

      const client = Binance()
      let ticker = await client.prices({ symbol: 'BNBUSDT' });
      setDollar(ticker?.BNBUSDT); 
    }
    catch (error) {
      console.log(error)
    }
  }


  useEffect(() => {
    if (nftSellingData?.status == "selling" || data?.nft?.length != 0) {
      BNBPrice();
    }
  }, [nftSellingData,data])


  let date = new Date(nftData?.creationDate);


  const [loading, user, address] = useValidate(userinfo, "main");


  return (
    <>
      <Head>
        <title>Golden Words NFts</title>
  
        <Meta  nftData={nftSellingData}/>
      </Head>
      <link itemProp="thumbnailUrl" href="https://textnft.vercel.app/new.png" />
      <span itemProp="thumbnail" itemScope itemType="http://schema.org/ImageObject">
        <link itemProp="url" href="https://textnft.vercel.app/demo.png" />
      </span>


      {!loading ? (
        <div className="text-[1.6rem] font-['Inconsolata']">
          <ToastContainer pauseOnHover autoClose={5000} />
        </div>
      ) : (
        <>
          <Navbar></Navbar>

          <div className="px-[1.7rem] sm:px-[3.5rem] md:px-[6rem] ">
            <div className="pt-[0.8rem] sm:pt-[1.5rem] md:pt-[3rem] lg:pt-[3rem] grid lg:grid-cols-2 lg:gap-x-[2rem]">

              <h2 className="color row-start-2 row-end-3  w-fit h-fit block lg:hidden mt-[1rem] mb-[1rem] text-[2.7rem] sm:text-[3.1rem]  font-['Inconsolata'] font-semibold  md:text-[3.2rem] tracking-wide ">
                NFT Text:
              </h2>

              <div className="w-[98.5%] overflow-hidden sm:w-[100%] nft_bord row-start-3 max-h-[43rem] lg:max-h-[60rem]  row-end-4 lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-3">

                <div className="w-[100%] listitem h-[100%] lg:h-[47rem] break-words flex justify-center items-center  overflow-auto relative p-[1.5rem] sm:p-[3rem] scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-[#FFF] scrollbar-thumb-rounded-xl scrollbar-track-rounded-full ">

                  <h2 className="!text-[2.3rem]  text-['#2d3436'] break-words overflow-y-hidden font-['Inconsolata'] font-normal w-[100%]  text-center max-h-[100%] ">
                    {parse(nftData?.text?nftData.text:"")}

                </h2>
                </div>
              </div>
              <div className="w-[53.5%] mt-[2rem] lg:mt-0 row-start-1 row-end-2 lg:col-start-2 lg:col-end-3">
                <h2 className="whitespace-nowrap color w-fit h-fit -mt-[1rem] text-[2.7rem] sm:text-[3.1rem]  font-['Inconsolata'] font-semibold  md:text-[3.2rem] tracking-wide ">
                  NFT Detail
                </h2>

                <div className="flex spdeatil space-x-[6rem] sm:space-x-[13rem] lg:space-x-[4rem] xl:space-x-[10rem] w-[89.5vw] sm:w-auto">
                  <div className="flex flex-col space-y-2">
                    <h2 className="text-[#545151] text-[1.9rem]  font-['Inconsolata'] font-medium block heightDetail">
                      Name
                    </h2>
                    {nftSellingData?.status == "selling" ?
                      <>
                        <h2 className="text-[#545151] text-[1.9rem] sm:text-[2rem] font-['Inconsolata'] font-medium">
                          Price
                        </h2>
                        <h2 className="text-transparent text-[#545151] text-[1.9rem] sm:text-[1.6rem] font-['Inconsolata'] font-medium">
                          j
                        </h2>
                      </> : null}

                    <h3 className="text-[#545151] text-[1.9rem]  font-['Inconsolata'] font-medium  whitespace-nowrap block heightDetail">
                      Creation Date
                    </h3>
                    <h3 className="text-[#545151] text-[1.9rem]  font-['Inconsolata'] font-medium  whitespace-nowrap block heightDetail">
                      NFT Language
                    </h3>
                    {/* <h3 className="text-[#545151] text-[1.9rem] sm:text-[2rem] font-['Inconsolata'] font-medium whitespace-nowrap">
                  Sales Ends In
                </h3> */}
                  </div>

                  <div className="flex flex-col space-y-[0.75rem] grow overflow-x-scroll sm:grow-0 sm:overflow-visible">
                    <p className="text-[#686767cf] font-['Inconsolata'] text-[1.6rem] pt-[0.3rem] sm:pt-[0rem] font-medium block heightDetail whitespace-nowrap  overflow-y-hidden hd scrollbar-none">
                      {nftData?.name}
                    </p>


                    {nftSellingData?.status == "selling" ?
                      <> <p className="text-[#686767cf] font-['Inconsolata']  text-[1.6rem] font-medium whitespace-nowrap overflow-x-scroll scrollbar-none pt-[0.2rem]">
                        {ethers.utils.formatUnits(nftSellingData?.price.toLocaleString('fullwide', {useGrouping:false}), 18)} BNB
                     
                      </p>
                        <div className="text-[#686767cf] whitespace-nowrap font-['Inconsolata'] text-[1.6rem] sm:text-[1.6rem] font-medium overflow-x-scroll scrollbar-none">
        {(ethers.utils.formatUnits(nftSellingData?.price.toLocaleString('fullwide', {useGrouping:false}), 18) * dollar).toFixed(2)} USD
                        </div>
                      </> : null}


                    <p className="text-[#00000] font-semibold font-['Inconsolata'] text-[1.6rem]  sm:text-[1.6rem] whitespace-nowrap h-[2.4rem] overflow-x-scroll scrollbar-none block heightDetail">
                      {date.toLocaleString()}
                    </p>

                    <p className="text-[#686767cf] font-['Inconsolata'] text-[1.6rem] font-medium block heightDetail overflow-x-scroll scrollbar-none">
                      {Language[nftData?.language]}
                    </p>
                    {/* <p className="text-[#00000] font-semibold font-['Inconsolata']  w-[100%] overflow-hidden text-ellipsis text-[1.5rem] sm:text-[1.6rem] pt-[0.2rem] sm:pt-[0rem] whitespace-nowrap">
                  5 <span className="text-[#686767cf] font-medium">Days</span> 8{" "}
                  <span className="text-[#686767cf] font-medium">Hours</span> 52{" "}
                  <span className="text-[#686767cf] font-medium">Mins</span> 32
                  <span className="text-[#686767cf] font-medium"> Secs</span>
                </p> */}
                  </div>
                </div>

                <h2 className="color w-fit mt-[1rem] lg:mt-[0.3rem] whitespace-nowrap text-[2.7rem] sm:text-[3.1rem]  font-['Inconsolata'] font-semibold tracking-wide">
                  Owner Detail
                </h2>

                <div className="flex spacing space-x-[9rem] sm:space-x-[18rem] lg:space-x-[9rem] xl:space-x-[15rem] w-[89.5vw] sm:w-auto">
                  <div className="flex flex-col">
                    <h3 className="text-[#545151] text-[1.9rem] sm:text-[2.2rem] font-['Inconsolata'] font-medium">
                      Email
                    </h3>
                    <h3 className="text-[#545151] text-[1.9rem] sm:text-[2.2rem] font-['Inconsolata'] font-medium">
                      Address
                    </h3>
                  </div>

                  <div className="flex flex-col space-y-[0.4rem] sm:space-y-[1.2rem] grow overflow-hidden sm:grow-0 sm:overflow-visible">
                    <p className="text-[#686767cf] font-['Inconsolata'] text-[1.6rem] font-medium pt-[0.4rem] overflow-x-scroll scrollbar-none ">
                      {nftSellingData?.owner_email}
                    </p>
                    <p className="text-[#686767cf] font-['Inconsolata'] text-[1.6rem] font-medium overflow-x-scroll scrollbar-none ">
                      {nftSellingData?.owner_address}
                    </p>
                  </div>
                </div>

                <h2 className="color w-fit h-fit mt-[1rem] whitespace-nowrap lg:mt-[0.3rem] text-[2.7rem] sm:text-[3.1rem]  font-['Inconsolata'] font-semibold tracking-wide ">
                  Creator Detail
                </h2>

                <div className="flex spacing space-x-[9rem] sm:space-x-[18rem] lg:space-x-[9rem] xl:space-x-[15rem] w-[89.5vw] sm:w-auto">
                  <div className="flex flex-col">
                    <h3 className="text-[#545151] text-[1.9rem] sm:text-[2.2rem] font-['Inconsolata'] font-medium">
                      Email
                    </h3>
                    <h3 className="text-[#545151] text-[1.9rem] sm:text-[2.2rem] font-['Inconsolata'] font-medium">
                      Address
                    </h3>
                  </div>

                  <div className="flex flex-col space-y-[0.4rem] sm:space-y-[1.2rem] grow overflow-hidden sm:grow-0 sm:overflow-visible">
                    <p className="text-[#686767cf] font-['Inconsolata'] text-[1.6rem] font-medium pt-[0.4rem] overflow-x-scroll scrollbar-none">
                      {nftData?.creatorEmail}
                    </p>
                    <p className="text-[#686767cf] font-['Inconsolata'] text-[1.6rem] font-medium overflow-x-scroll scrollbar-none">
                      {nftData?.creatorAddress}
                    </p>
                  </div>
                </div>


              </div>

              <div className="mt-[1.3rem] h-fit lg:mt-[0.5rem] flex items-center flex-wrap lg:col-start-2 lg:col-end-3 space-y-2 sm:space-y-0">


                <Share />

                {address == nftSellingData?.owner_address && user?.address == address && nftSellingData.status == "verified" && nftSellingData?.approved ?
                  <Sell nftHash={nftData?.hash} tokenId={nftSellingData?.tokenId} /> : null
                }
                {address == nftSellingData?.owner_address && user?.address == address && nftSellingData?.status == "verified" && !nftSellingData?.approved ?
                  <Approval tokenId={nftSellingData?.tokenId} /> : null
                }

                {address == nftSellingData?.owner_address && user?.address == address && nftSellingData?.status == "selling" ?
                  <CancelSelling itemId={nftSellingData?.currentSellingId} /> : null
                }

                {address != nftSellingData?.owner_address && user?.address == address && nftSellingData?.status == "selling" ?
                  <Buy itemId={nftSellingData?.currentSellingId} price={nftSellingData?.price} /> : null
                }

                {
                  user?.address != address ?
                    <div className="flex ">
                      <p className="text-red-600 popular font-['Inconsolata'] text-[1.6rem] font-medium">
                        Login to see buying option
                      </p>
                    </div> : null
                }



              </div>

            </div>
            <div>

              <div className="mt-[2rem]">
                <h2 className="whitespace-nowrap text-[#34495e] w-fit h-fit -mt-[1rem] text-[2.7rem] sm:text-[3.1rem]  font-['Inconsolata'] font-med md:text-[3.2rem] tracking-wide ">
                  NFT Text Hash:
                </h2>
                <p className="text-[#686767cf] font-['Inconsolata'] text-[1.6rem] font-medium pt-[0.1rem] w-[100%]  break-words">
                  {nftData?.hash}
                </p>
              </div>

              <div className="mt-[2rem]">
                <h2 className="whitespace-nowrap text-[#34495e] w-fit h-fit -mt-[1rem] text-[2.7rem] sm:text-[3.1rem]  font-['Inconsolata'] font-medium  md:text-[3.2rem] tracking-wide ">
                  Description:
                </h2>
                <p className="text-[#686767cf] font-['Inconsolata'] text-[1.6rem] font-medium pt-[0.1rem] w-[100%]  text-justify overflow-y-auto h-fit pr-[1rem] text-ellipsis">
                  {nftData?.description}
                </p>
              </div>
            </div>



            <div className="mt-[3rem]">
              <h2 className="color w-fit h-fit -mt-[1rem] text-[2.7rem] sm:text-[3.1rem]  font-['Inconsolata'] font-semibold  md:text-[3.2rem] tracking-wide ">
                More Nfts Of Owner:
              </h2>
            </div>
          </div>
          <div className="md:mx-[2rem]">


          {
            isLoading ?
             ( <div className="flex justify-center  mt-[4px]">

            <PuffLoader
              color={"#30DCBA"}
              cssOverride={{ marginBottom: "20px" }}
              size={110}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
          </div>)
          :null
        }

            <div className="flex flex-wrap jt mg">

              {error ? (<div className="text-red-400 text-[1.7rem] sm:text-[2rem] md:text-[2.3rem] w-fit font-['Inconsolata'] mt-[0.5rem]">
                Error in getting NFTs Please try later</div>) : ""
              }

              {
                (!error && data) ?

                  data?.nft?.map((data, index) => {
                    return <Individualnft key={index} index={index} nftname={data?.nftName} owner={data?.owner_email} creator={data?.creator_email} price={data?.price} creationdate={data?.createdAt} nfttext={data?.title}  id={data?.tokenURI} priceDollar={(ethers.utils.formatUnits(data?.price.toLocaleString('fullwide', {useGrouping:false}), 18) * dollar).toFixed(2)}></Individualnft>


                  }) : ""
              }


              {data?.nft?.length == 0 && !error ? (<div className="text-[#cbcdcf]  text-[1.7rem] sm:text-[2rem] md:text-[3.3rem] w-fit font-['Inconsolata'] mt-[1.5rem]">
                OOPS!   Nothing to show...</div>) : ""
              }
            </div>


{ !isLoading && !error?
            <div className="mg flex justify-end my-[1.5rem]  font-['Inconsolata']">

<button className="bg-blue-500 mr-[1.5rem]  hover:bg-blue-700  text-white font-normal text-[1.8rem] sm:font-semibold  px-12  py-[1rem] sm:px-14 rounded-full font-['Inconsolata'] tracking-wider"
      onClick={() =>{router.push(`/profile/${data?.ownerId}`)} }
     >
  View Profile
</button>

</div>:null
       }       </div>

<Footer />
        </>)}
    </>
  );
};

export default IndividualNFT;

export { getServerSideProps };