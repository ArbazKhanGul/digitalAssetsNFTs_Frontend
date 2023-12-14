import Binance from 'binance-api-node'
import getServerSideProps from "../../utils/ServerSideNft"
import useValidate from "../../utils/useValidate"
import Language from "../../utils/languageShow.json"
import parse from 'html-react-parser';
import { fetcherOwnerNft } from "../../utils/fetcher";
import ReactPlayer from "react-player";
import axios from "axios";
import {
  Navbar, Footer, IndividualNFT as Individualnft, Sell, Head, Transactions, Approval, CancelSelling, Buy, Share, Meta, useState, useEffect, useRouter, ethers, Image, ToastContainer, useSWR, PuffLoader
  , CopyRight
} from "../../components"




const IndividualNFT = ({ userinfo, nftData, nftSellingData }) => {
console.log("🚀 ~ file: [id].js:18 ~ IndividualNFT ~ nftSellingData:", nftSellingData.tokenId
)

  const [loading, user, address] = useValidate(userinfo, "main");
  const [playing, setPlaying] = useState(false)

  let router = useRouter();

  const { data, error, mutate, isValidating } = useSWR(`/nftdata/${nftSellingData?.owner_email}?nftName=${nftData?.name}&nftId=${nftSellingData?.tokenURI}&original=${nftSellingData?.original}`, fetcherOwnerNft);
  const [dollar, setDollar] = useState(0);


  useEffect(() => {
    if (user) {
      mutate();
    }
  }, [user])




  const [textData, setTextData] = useState("");
  const [textLoading, setTextLoading] = useState(true);

  
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get(`${process.env.ipfsURL}${nftData?.content}`);
        setTextData(response.data);
        console.log("🚀 ~ file: [id].js:50 ~ fetchData ~ response.data:", response.data)
        setTextLoading(false)
      } catch (err) {
      }
    }
    if (nftData?.type == "text") {
      fetchData();
    }
  }, [])


  const BNBPrice = async () => {
    try {
        const client = Binance()
        let ticker = await client.prices({ symbol: 'BNBUSDT' });
        setDollar(parseFloat(ticker?.BNBUSDT));
    }
    catch (error) {
        console.log(error)
    }
}

  useEffect(() => {
    if (nftSellingData?.status == "selling" || data?.nft?.length != 0) {
        BNBPrice();

        // Call the function every 1 minute (60,000 milliseconds)
        const interval = setInterval(() => {
            BNBPrice();
        }, 60000);

        // Clean up the interval when the component unmounts
        return () => clearInterval(interval);
    }
  }, [nftSellingData, data])






  let date = new Date(nftData?.creationDate);



  return (
    <>
      <Head>
        <title>Golden Words NFts</title>
        <Meta nftData={nftSellingData} contentData={nftData}/>
      </Head>

      {/* <link itemProp="thumbnailUrl" href="https://textnft.vercel.app/new.png" /> */}
      {/* <span itemProp="thumbnail" itemScope itemType="http://schema.org/ImageObject"> */}
        {/* <link itemProp="url" href="https://textnft.vercel.app/demo.png" /> */}
      {/* </span> */}


      {!loading ? (
        <div className="text-[1.4rem] sm:text-[1.6rem] ">
          <ToastContainer pauseOnHover autoClose={5000} />
        </div>
      ) : (
        <>
          <Navbar></Navbar>

          <div className="px-[1.7rem] sm:px-[3.5rem] md:px-[6rem] ">
            <div className="pt-[0.8rem] sm:pt-[1.5rem] md:pt-[3rem] lg:pt-[3rem] lg:grid lg:grid-cols-2 lg:gap-x-[2rem]">



          <div className="w-[90vw] h-[75vw] xs:w-[80vw] xs:h-[65vw] sm:w-[65vw] sm:h-[55vw] md:w-[52rem] md:h-[42rem] mx-auto overflow-hidden lg:w-[100%] border-[0.2rem] border-[#1E2245] rounded-[0.5rem]   relative lg:h-[100%] lg:max-h-[60rem]  lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-3">


                {nftData?.type == "text" ?
                  <div className="w-[100%] listitem h-[100%] lg:h-[47rem] break-words flex justify-center items-center  overflow-scroll relative p-[1.5rem] sm:p-[3rem] scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-[#FFF] scrollbar-thumb-rounded-xl scrollbar-track-rounded-full ">

                    {
                      textLoading ? (<div className="flex justify-center  mt-[4px]">

                        <PuffLoader
                          color={"#30DCBA"}
                          cssOverride={{ marginBottom: "20px" }}
                          size={110}
                          aria-label="Loading Spinner"
                          data-testid="loader"
                        />
                      </div>) : <h2 className="!text-[2.2rem] text-['#2d3436'] break-words   font-normal w-[100%]   max-h-[100%] ">
                        {parse(`<pre className="whitespace-pre-wrap break-underline">${textData}</pre>`)}

                      </h2>
                    }


                  </div> : null}

                {nftData?.type == "image" ?
                  <div className="w-[100%] pt-[0%] relative listitem h-[100%] lg:h-[47rem] break-words flex justify-center items-center scrollbar-thin scroll ">
                    <div className=" inline-block w-[100%] h-[100%]  relative">
                      <Image
                        src={`${process.env.ipfsURL}${nftData?.content}`}
                        layout="fill"
                      /></div>
                  </div> : null}

                {nftData?.type == "video" ?
                  <div className="w-[100%] pt-[0%] relative listitem h-[100%] lg:h-[47rem] break-words flex justify-center items-center scrollbar-thin scroll ">
                    <ReactPlayer
                      url={`${process.env.ipfsURL}${nftData?.content}`}
                      controls={true}
                      loop={true}
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
                      style={{ position: 'absolute', top: 0, left: 0 }}
                    />
                  </div> : null}

                {nftData?.type == "audio" ?
                  <div className="w-[100%] pt-[0%] relative listitem h-[100%] lg:h-[47rem] break-words flex justify-center items-center scrollbar-thin scroll ">
                    <ReactPlayer
                      url={`${process.env.ipfsURL}${nftData?.content}`}
                      controls={true}
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
                      width="90%"
                      height="60px"
                      style={{ height: "100px" }}
                    />
                  </div> : null}

              </div>
              <div className="w-[53.5%] mt-[2rem] lg:mt-0  lg:col-start-2 lg:col-end-3">
              <div className="  flex     font-bold text-[2.2rem] sm:text-[2.45rem] ">
      <div className=" w-fit bord-bottom  flex justify-center mb-[1rem]"> 

      <div className="text-[#121212] w-fit whitespace-nowrap font-semibold"> NFT Detail:</div>

        </div>
      
         </div>

                <div className="flex spdeatil space-x-[6rem] sm:space-x-[13rem] lg:space-x-[4rem] xl:space-x-[10rem] w-[89.5vw] sm:w-auto">
                  <div className="flex flex-col space-y-2">
                    {nftSellingData?.original ?
                      <h2 className="text-[#221f1f] font-semibold text-[1.62rem] sm:text-[1.73rem]    block heightDetail">
                        Name
                      </h2> : null
                    }

                    {!nftSellingData?.original ?
                      <h2 className="text-[#221f1f] font-semibold text-[1.62rem] sm:text-[1.73rem]   block heightDetail">
                        Copy of
                      </h2> : null
                    }

                    {nftSellingData?.status == "selling" ?
                      <>
                        <h2 className="text-[#221f1f] font-semibold text-[1.62rem] sm:text-[1.73rem] ">
                          Price
                        </h2>
                        <h2 className="text-transparent text-[#545151] text-[1.9rem]  sm:text-[1.85rem]  font-medium">
                          j
                        </h2>
                      </> : null}

                    <h3 className="text-[#221f1f] font-semibold text-[1.62rem] sm:text-[1.73rem]     whitespace-nowrap block heightDetail">
                      Creation Date
                    </h3>

                    {nftData?.type == "text" ?
                      <h3 className="text-[#221f1f] font-semibold text-[1.62rem] sm:text-[1.73rem]    whitespace-nowrap block heightDetail">
                        NFT Language
                      </h3> : null}

                  </div>

                  <div className="flex flex-col space-y-[0.75rem] grow overflow-x-scroll sm:grow-0 sm:overflow-visible">

                    {nftSellingData?.original ?
                      <p className="text-red-600 w-fit font-medium text-[1.62rem] sm:text-[1.8rem] pt-[0.3rem] sm:pt-[0rem]  block heightDetail whitespace-nowrap  overflow-y-hidden hd scrollbar-none">
                        {nftData?.name}
                      </p> : null
                    }

                    {!nftSellingData?.original ?
                      <p onClick={() => { router.push(`/individualnft/${nftSellingData?.originalTokenURI}`) }} className="w-fit font-bold text-[#e80748] cursor-pointer decoration-[#e80748] decoration-1 underline underline-offset-1  sm:text-[2rem]    text-[1.4rem] sm:text-[1.6rem] pt-[0.3rem] sm:pt-[0rem]  block heightDetail whitespace-nowrap  overflow-y-hidden hd scrollbar-none">
                        {nftData?.name}
                      </p> : null}


                    {nftSellingData?.status == "selling" ?
                      <> <p className="text-[#293949] font-medium text-[1.4rem] sm:text-[1.6rem] whitespace-nowrap overflow-x-scroll scrollbar-none pt-[0.2rem]">
                        {ethers.utils.formatUnits(nftSellingData?.price.toLocaleString('fullwide', { useGrouping: false }), 18)} BNB

                      </p>
                        <div className="text-[black] font-medium whitespace-nowrap-nowrap  text-[1.4rem] sm:text-[1.6rem]    overflow-x-scroll scrollbar-none">
                        &asymp; {(ethers.utils.formatUnits(nftSellingData?.price.toLocaleString('fullwide', { useGrouping: false }), 18) * dollar).toFixed(2)} USD
                        </div>
                      </> : null}


                    <p className="text-[#293949] font-medium  text-[1.4rem] sm:text-[1.6rem] whitespace-nowrap h-[2.4rem] overflow-x-scroll scrollbar-none block heightDetail">
                      {date.toLocaleString()}
                    </p>

                    {nftData?.type == "text" ?
                      <p className="text-[#293949]  font-medium text-[1.4rem] sm:text-[1.6rem] block heightDetail overflow-x-scroll scrollbar-none">
                        {Language[nftData?.language]}
                      </p> : null}

                  </div>
                </div>
                <div className="  flex  font-bold text-[2.2rem] sm:text-[2.45rem] ">
      <div className=" w-fit bord-bottom  flex justify-center my-[1rem] mt-[1.5rem]"> 

      <div className="text-[#121212] w-fit whitespace-nowrap font-semibold"> Owner Detail:</div>

        </div>
      
         </div>
                <div className="flex spacing space-x-[9rem] sm:space-x-[18rem] lg:space-x-[9rem] xl:space-x-[15rem] w-[89.5vw] sm:w-auto">
                  <div className="flex flex-col">
                    <h3 className="text-[#221f1f] font-semibold text-[1.62rem] sm:text-[1.73rem]   ">
                      Email
                    </h3>
                    <h3 className="text-[#221f1f] font-semibold text-[1.62rem] sm:text-[1.73rem]  ">
                      Address
                    </h3>
                  </div>

                  <div className="flex flex-col space-y-[0.4rem] sm:space-y-[0.3rem] grow overflow-hidden sm:grow-0 sm:overflow-visible">
                    <p className="text-[#293949] font-medium text-[1.4rem] sm:text-[1.52rem]  pt-[0.4rem] overflow-x-scroll scrollbar-none ">
                      {nftSellingData?.owner_email}
                    </p>
                    <p className="text-[#293949] font-medium text-[1.4rem] sm:text-[1.52rem]  overflow-x-scroll scrollbar-none ">
                      {nftSellingData?.owner_address}
                    </p>
                  </div>
                </div>


                <div className="  flex  font-bold text-[2.2rem] sm:text-[2.45rem] ">
      <div className=" w-fit bord-bottom  flex justify-center my-[1rem] mt-[1.5rem]"> 

      <div className="text-[#121212] w-fit whitespace-nowrap font-semibold"> Creator Detail:</div>

        </div>

         </div>
                <div className="flex spacing space-x-[9rem] sm:space-x-[18rem] lg:space-x-[9rem] xl:space-x-[15rem] w-[89.5vw] sm:w-auto">
                <div className="flex flex-col">
                    <h3 className="text-[#221f1f] font-semibold text-[1.62rem] sm:text-[1.73rem]   ">
                      Email
                    </h3>
                    <h3 className="text-[#221f1f] font-semibold text-[1.62rem] sm:text-[1.73rem]  ">
                      Address
                    </h3>
                  </div>

                  <div className="flex flex-col space-y-[0.2rem] sm:space-y-[0.2rem] grow overflow-hidden sm:grow-0 sm:overflow-visible">
                    <p className="text-[#293949] font-medium text-[1.4rem] sm:text-[1.52rem]  pt-[0.4rem] overflow-x-scroll scrollbar-none">
                      {nftData?.creatorEmail}
                    </p>
                    <p className="text-[#293949] font-medium  text-[1.4rem] sm:text-[1.52rem]  overflow-x-scroll scrollbar-none">
                      {nftData?.creatorAddress}
                    </p>
                  </div>
                </div>


              </div>

              <div className="mt-[1rem] h-fit lg:mt-[1rem] flex items-center flex-wrap lg:col-start-2 lg:col-end-3 space-y-2 sm:space-y-0">


                <Share path={`${process.env.URL}/individualnft/${nftSellingData?.tokenURI}`} />

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
                      <p className="text-red-600 popular  text-[1.4rem] sm:text-[1.55rem] font-semibold">
                        Login to see buying option
                      </p>
                    </div> : null
                }



              </div>

            </div>
            <div>


              <div >
              <div className="  flex   font-bold text-[2.2rem] sm:text-[2.65rem]  ">
      <div className=" w-fit   flex justify-center mt-[2rem]"> 

      <div className="text-[#121212] w-fit "> Description:</div>

        </div>

         </div>
                <p className="text-[#363434cf] mt-[0.8rem]  text-[1.7rem] font-medium pt-[0.1rem] w-[100%]  text-justify overflow-y-auto h-fit pr-[1rem] text-ellipsis">
                  {nftData?.description}
                </p>
              </div>
            </div>

            {nftSellingData?.original ? <CopyRight ownerAddress={nftSellingData?.owner_address} ownercopyrightStatus={nftSellingData?.copyrightStatus} ownercopyrightPrice={nftSellingData?.copyrightPrice} nftName={nftData?.name} nftid={nftSellingData?.tokenURI} copyrightStatus={data?.copyright_status} user={user} address={address} isLoading={isValidating} dataError={error} mutate={mutate} ownerId={data?.ownerId} /> : null
            }


            <Transactions data={data?.transactions} error={error} isLoading={isValidating} />

            </div>




            {/* //Copies of current nft */}
         {nftSellingData?.original==true ? <>
          <div className="  flex    font-bold text-[2.2rem] sm:text-[2.65rem]  mx-[1rem]  -mb-[0.5rem] mt-[1.5rem]">
      <div className=" w-fit mx-[0.7rem] sm:mx-[2.5rem] md:mx-[5rem] flex justify-center"> 

      <div className="text-[#121212] w-fit "> Copies Nfts:</div>

        </div>
      
         </div>
          
          <div className="md:mx-[2rem]">


            {
              isValidating ?
                (<div className="flex justify-center  mt-[4px]">

                  <PuffLoader
                    color={"#30DCBA"}
                    cssOverride={{ marginBottom: "20px" }}
                    size={110}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                  />
                </div>)
                :             
            <div className={`mg ${data?.copiesCount != 0 ? "flex flex-wrap jt" : "!ml-[2rem] sm:!ml-[4rem]"}`}>

              {error ? (<div className="text-[red] text-[1.8rem] font-medium sm:text-[2.1rem] md:text-[2.3rem] w-fit  mt-[0.5rem]">
                Error in getting NFTs Please try later</div>) : ""
              }

              {
                (!error && data && !isValidating) ?

                  data?.copies?.map((data, index) => {
                    return <Individualnft key={index} original={data?.original} index={index} nftname={data?.nftName} owner={data?.owner_email} creator={data?.creator_email} price={data?.price} creationdate={data?.createdAt} type={data?.contentType} contentURI={data?.contentURI} tokenURI={data?.tokenURI} id={data?.tokenURI}></Individualnft>
                  }) : ""
              }


              {data?.copiesCount == 0 && !error && !isValidating  ? (<div className="text-[#b9bbbd]  text-[1.8rem] sm:text-[2.1rem] md:text-[2.3rem] w-fit  mt-[0.5rem]">
                OOPS!  No copy created yet...</div>) : ""
              }
            </div>}
            {!isValidating && !error && data?.copiesCount > 4?
              <div className="mg flex justify-end -my-[2.5rem]  ">

                <button className="bg-blue-500 mr-[1.5rem]  hover:bg-blue-700  text-white font-normal text-[1.8rem] sm:font-semibold  px-12  py-[1rem] sm:px-14 rounded-full  tracking-wider"
                  onClick={() => { router.push(`/nfts?nftName=${nftData?.name}&nftType=copy`) }}
                >
                  View All...
                </button>

              </div> : null
            } 
          </div> 
          </> : 
          null}















      <div className="  flex font-bold text-[2.2rem] sm:text-[2.65rem]  mx-[1.2rem] mt-[2rem] -mb-[1.5rem]">
      <div className=" w-fit   flex justify-center mx-[0.7rem] sm:mx-[2.5rem] md:mx-[5rem] "> 

      <div className="text-[#121212] w-fit "> Owner Nfts:</div>

        </div>
         </div>

          <div className="">


            {
              isValidating ?
                (<div className="flex justify-center  mt-[4px]">

                  <PuffLoader
                    color={"#30DCBA"}
                    cssOverride={{ marginBottom: "20px" }}
                    size={110}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                  />
                </div>)
                  :
            <div className={`mg mb-[2rem] ${data?.nft?.length != 0 ? "flex flex-wrap jt " : "!ml-[2rem] sm:!ml-[4rem]"}`}>

              {error? (<div className="text-[red] text-[1.8rem] font-medium sm:text-[2.1rem] md:text-[2.3rem] w-fit  mt-[1.5rem]  sm:mx-[0rem] md:mx-[2rem]">
                Error in getting NFTs Please try later</div>) : ""
              }

              {
                (!error && data) ?

                  data?.nft?.map((data, index) => {
                    return <Individualnft key={index} index={index} nftname={data?.nftName} owner={data?.owner_email} creator={data?.creator_email} price={data?.price} creationdate={data?.createdAt} type={data?.contentType} contentURI={data?.contentURI} tokenURI={data?.tokenURI} id={data?.tokenURI}></Individualnft>
                  }) : ""
              }


              {data?.nft?.length == 0 && !isValidating  && !error ? (<div className="text-[#b9bbbd]  text-[1.8rem] sm:text-[2.1rem] md:text-[2.3rem] w-fit  mt-[1.5rem]  sm:mx-[0rem] md:mx-[2rem]">
                OOPS!   Nothing to show...</div>) : ""
              }
            </div>}


            {!isValidating && !error ?
              <div className="mg flex justify-end my-[1.5rem]  ">

                <button className="bg-[#1b31c4] hover:bg-[#182ba8] mr-[1.5rem]    text-white font-normal text-[1.4rem] sm:text-[1.6rem] sm:font-semibold  px-12  py-[1rem] sm:px-14 rounded-full  tracking-wider"
                  onClick={() => { router.push(`/profile/${data?.ownerId}`) }}
                >
                  View Profile
                </button>

              </div> : null
            }       </div>
          <Footer />
        </>)}
    </>
  );
};

export default IndividualNFT;

export { getServerSideProps };