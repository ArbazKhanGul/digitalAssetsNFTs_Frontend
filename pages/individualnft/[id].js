import Navbar from "../../components/navbar";
import { useEffect ,useState} from "react";
import Binance from 'binance-api-node'
import {ethers} from 'ethers'
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

const IndividualNFT = ({ userinfo, nftData }) => {
  const  [dollar,setDollar]=useState("...");

  const BNBPrice=async ()=>{
    try{

      const client = Binance()
      let ticker = await client.prices({ symbol: 'BNBUSDT' });
      setDollar((ethers.utils.formatUnits(nftData?.price.toString(), 18) * ticker.BNBUSDT).toFixed(8))
      console.log
      console.log(`Price of BNB:,`, ticker);
    }
    catch(error){
console.log(error)
    }
  }


  useEffect(()=>{
    if(nftData?.status=="selling"){
         BNBPrice();
    }
  },[nftData])


  let date = new Date(nftData?.createdAt);


  const [loading, user, address] = useValidate(userinfo, "main");


  return (
    <>
      <Head>
        <title>Golden Words NFts</title>
        <Meta />
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

              <div className="w-[98.5%] sm:w-[100%] nft_bord row-start-3 max-h-[43rem] lg:max-h-[60rem]  row-end-4 lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-3">

                <div className="w-[100%] h-[100%] lg:h-[47rem] flex justify-content items-center  overflow-y-auto relative p-[1.5rem] sm:p-[3rem] ">

                  <h2 className="text-[2rem] sm:text-[2.5rem]  text-['#2d3436'] font-['Inconsolata'] font-normal w-[100%] text-center max-h-[100%]">
                    {parse(nftData?.nftText)}
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
                    {nftData?.status=="selling"?
                      <>
                    <h2 className="text-[#545151] text-[1.9rem] sm:text-[2rem] font-['Inconsolata'] font-medium">
                  Price
                </h2>
                <h2 className="text-transparent text-[#545151] text-[1.9rem] sm:text-[1.6rem] font-['Inconsolata'] font-medium">
                  j
                </h2>
                </>:null}
                   
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

                  <div className="flex flex-col space-y-[0.75rem] grow overflow-hidden sm:grow-0 sm:overflow-visible">
                    <p className="text-[#686767cf] font-['Inconsolata'] text-[1.6rem] font-medium block heightDetail whitespace-nowrap overflow-hidden text-ellipsis">
                      {nftData?.nftName}
                    </p>


                    {nftData?.status=="selling"?
                <> <p className="text-[#686767cf] font-['Inconsolata'] text-[1.6rem] font-medium sm:pt-[0.2rem]">
                  {ethers.utils.formatUnits(nftData?.price.toString(), 18).toString() } BNB
                </p>
                <div className="text-[#686767cf] whitespace-nowrap font-['Inconsolata'] text-[1.5rem] sm:text-[1.6rem] font-medium">
                  {dollar} $
                </div>
                </>:null}


                    <p className="text-[#00000] font-semibold font-['Inconsolata'] text-[1.5rem] sm:text-[1.6rem] whitespace-nowrap h-[2.4rem] overflow-hidden text-ellipsis block heightDetail">
                      {date.toLocaleString()}
                    </p>

                    <p className="text-[#686767cf] font-['Inconsolata'] text-[1.6rem] font-medium block heightDetail">
                      {Language[nftData?.nftLanguage]}
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
                    <p className="text-[#686767cf] font-['Inconsolata'] text-[1.6rem] font-medium pt-[0.4rem] overflow-hidden text-ellipsis">
                      {nftData?.owner_email}
                    </p>
                    <p className="text-[#686767cf] font-['Inconsolata'] text-[1.6rem] font-medium overflow-hidden text-ellipsis">
                      {nftData?.owner_address}
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
                    <p className="text-[#686767cf] font-['Inconsolata'] text-[1.6rem] font-medium pt-[0.4rem] w-[100%] overflow-hidden text-ellipsis">
                      arbazkhangul123@gmail.com
                    </p>
                    <p className="text-[#686767cf] font-['Inconsolata'] text-[1.6rem] font-medium overflow-hidden text-ellipsis">
                      0x80255fE07007c663B29c3C0B82673AD0d1802437
                    </p>
                  </div>
                </div>


              </div>

              <div className="mt-[1.3rem] h-fit lg:mt-[0.5rem] flex items-center flex-wrap lg:col-start-2 lg:col-end-3 space-y-2 sm:space-y-0">


                <Share />

                {address == nftData?.owner_address && user?.address == address && nftData?.status =="verified"?
                 <Sell nftHash={nftData?.hash} tokenId={nftData?.tokenId}/> : null
                }

                {address == nftData?.owner_address && user?.address == address && nftData?.status =="selling"?
                     <CancelSelling itemId={nftData?.currentSellingId}/> : null
                }

                {address != nftData?.owner_address && user?.address == address && nftData?.status =="selling"?
                     <Buy itemId={nftData?.currentSellingId} price={nftData?.price} />:null
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

              <div className="mt-[1rem]">
                <h2 className="whitespace-nowrap color w-fit h-fit -mt-[1rem] text-[2.7rem] sm:text-[3.1rem]  font-['Inconsolata'] font-semibold  md:text-[3.2rem] tracking-wide ">
                  NFT Text Hash:
                </h2>
                <p className="text-[#686767cf] font-['Inconsolata'] text-[1.6rem] font-medium pt-[0.1rem] w-[100%]  break-all">
                  {nftData?.hash}
                </p>
              </div>

              <div className="mt-[1rem]">
                <h2 className="whitespace-nowrap color w-fit h-fit -mt-[1rem] text-[2.7rem] sm:text-[3.1rem]  font-['Inconsolata'] font-semibold  md:text-[3.2rem] tracking-wide ">
                  Description:
                </h2>
                <p className="text-[#686767cf] font-['Inconsolata'] text-[1.6rem] font-medium pt-[0.1rem] w-[100%]  text-justify overflow-y-auto h-[18rem] pr-[1rem] text-ellipsis">
                  {nftData?.nftDescription}
                </p>
              </div>
            </div>
          </div>

        </>)}
    </>
  );
};

export default IndividualNFT;

export { getServerSideProps};