import Navbar from "../components/navbar";
import { useState } from "react";
import { BsFacebook, BsInstagram, BsTwitter, BsWhatsapp } from "react-icons/bs";
import { ImEmbed } from "react-icons/im";
import QRCode from 'qrcode.react';
import { MdQrCode } from "react-icons/md";
import { useRouter } from 'next/router'
import {FacebookShareButton} from "react-share"
import Head from 'next/head'
const IndividualNFT = () => {
  const [showModal, setShowModal] = useState(false);
  const [clickCheck,setclickCheck] = useState("Share");
  const router = useRouter()
  const [path,setpath] = useState(router.pathname);
console.log(router.pathname)

  const downloadQR = () => {
    const canvas = document.getElementById(path);
    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    let downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = "sports.png";
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };

  return (
    <>
    <Head>
        <title>Golden Words NFts</title>
        <meta property="og:type" content="website" />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta property="og:url"  content={`https://text`} />
        <meta property="title" content="The Rock,arbaz" />
        <meta property="og:title" content="The Rock arb arbaz" />
        <meta property="description"  content="How much does culture influence creative thinking?" key="og-desc"/>
        <meta property="og:description"  content="How much does culture influence creative thinking?" key="og-desc"/>
        <meta property="image" content="https://textnft.vercel.app/logo.png" />
        <meta property="og:image" content="https://textnft.vercel.app/logo.png" />
        <meta property="og:image:width" content="467" />
        <meta property="og:image:height" content="88" />
        <meta property="image:width" content="467" />
        <meta property="image:height" content="88" />
        <meta property="og:site_name" content="my_website_name" />
        <meta property="og:site_name" content="my_website_name" />
      </Head>
    <Navbar></Navbar>

      <div className="px-[2.5rem] sm:px-[3.5rem] md:px-[6rem] ">
        <div className="pt-[0.8rem] sm:pt-[1.5rem] md:pt-[3rem] lg:pt-[3rem] grid lg:grid-cols-2 lg:gap-x-[2rem]">
      
        <h2 className="color row-start-2 row-end-3  w-fit h-fit block lg:hidden mt-[1rem] mb-[1rem] text-[2.7rem] sm:text-[3.1rem]  font-['Inconsolata'] font-semibold  md:text-[3.2rem] tracking-wide ">
              NFT Text:
            </h2>

      
          <div className="w-[98.5%] sm:w-[100%] nft_bord row-start-3 max-h-[43rem] lg:max-h-[60rem]  row-end-4 lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-3">
           
            <div className="w-[100%] h-[100%] lg:h-[47rem] flex justify-content items-center  overflow-y-auto relative p-[1.5rem] sm:p-[3rem] ">
           
              <h2 className="text-[2rem] sm:text-[2.5rem]  text-['#2d3436'] font-['Inconsolata'] font-normal text-justify  max-h-[100%]">
                If you continue to work hard success will follow you. Lorem
                ipsum dolor sit amet consectetur, adipisicing elit. Rem in
                voluptate repellendus beatae.
                Blanditiis facere velit aut commodi deserunt, ut dolore incidunt vel voluptates molestiae repudiandae, veniam, ipsam ipsa magni omnis? Consequatur excepturi consequuntur similique explicabo obcaecati, eveniet maxime incidunt ut, eius officiis rem! Numquam harum delectus nostrum ut ex adipisci aliquam quod, dicta nobis veritatis nulla? A, qui deleniti nam et perspiciatis voluptatibus vero dolorum cupiditate nulla enim earum? Consectetur, facere! Nobis pariatur recusandae quas enim quae aut a, aperiam cupiditate provident dolorem eius illo odit dignissimos animi, ipsa nihil harum obcaecati similique numquam maiores aspernatur? Eius, cumque atque?
              </h2>
            </div>
          </div>
          <div className="w-[53.5%] mt-[2rem] lg:mt-0 row-start-1 row-end-2 lg:col-start-2 lg:col-end-3">
            <h2 className="whitespace-nowrap color w-fit h-fit -mt-[1rem] text-[2.7rem] sm:text-[3.1rem]  font-['Inconsolata'] font-semibold  md:text-[3.2rem] tracking-wide ">
              NFT Detail
            </h2>

            <div className="flex spdeatil space-x-[6rem] sm:space-x-[13rem] lg:space-x-[4rem] xl:space-x-[10rem] w-[89.5vw] sm:w-auto">
              <div className="flex flex-col space-y-2">
                <h2 className="text-[#545151] text-[1.9rem] sm:text-[2rem] font-['Inconsolata'] font-medium">
                  Name
                </h2>
                <h2 className="text-[#545151] text-[1.9rem] sm:text-[2rem] font-['Inconsolata'] font-medium">
                  Price
                </h2>
                <div className="text-transparent">jj</div>
                <h3 className="text-[#545151] text-[1.9rem] sm:text-[2rem] font-['Inconsolata'] font-medium pt-[0.4rem] whitespace-nowrap">
                  Creation Date
                </h3>
                <h3 className="text-[#545151] text-[1.9rem] sm:text-[2rem] font-['Inconsolata'] font-medium whitespace-nowrap">
                  Sales Ends In
                </h3>
              </div>

              <div className="flex flex-col space-y-[0.75rem] grow overflow-hidden sm:grow-0 sm:overflow-visible">
                <p className="text-[#686767cf] font-['Inconsolata'] text-[1.6rem] font-medium">
                  sports NFT
                </p>
                <p className="text-[#686767cf] font-['Inconsolata'] text-[1.6rem] font-medium sm:pt-[0.2rem]">
                  0.1 BNB
                </p>
                <div className="text-[#686767cf] font-['Inconsolata'] text-[1.5rem] sm:text-[1.6rem] font-medium">
                  1 $
                </div>
                <p className="text-[#00000] font-semibold font-['Inconsolata'] text-[1.5rem] sm:text-[1.6rem] whitespace-nowrap">
                  5 Sep 2022 8:56:10
                </p>
                <p className="text-[#00000] font-semibold font-['Inconsolata']  w-[100%] overflow-hidden text-ellipsis text-[1.5rem] sm:text-[1.6rem] pt-[0.2rem] sm:pt-[0rem] whitespace-nowrap">
                  5 <span className="text-[#686767cf] font-medium">Days</span> 8{" "}
                  <span className="text-[#686767cf] font-medium">Hours</span> 52{" "}
                  <span className="text-[#686767cf] font-medium">Mins</span> 32
                  <span className="text-[#686767cf] font-medium"> Secs</span>
                </p>
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
                  arbazkhangul123@gmail.com
                </p>
                <p className="text-[#686767cf] font-['Inconsolata'] text-[1.6rem] font-medium overflow-hidden text-ellipsis">
                  0x80255fE07007c663B29c3C0B82673AD0d1802437
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
              {/* <button className="bg-blue-500  hover:bg-blue-700  text-white font-normal text-[1.8rem] sm:font-semibold py-2 px-8  sm:py-3 sm:px-[4rem] rounded-full font-['Inconsolata'] tracking-wider">
  Share
</button> */}




              <button
                className="bg-blue-500 mr-[2rem]  hover:bg-blue-700  text-white font-normal text-[1.8rem] sm:font-semibold py-3 px-[4rem] rounded-full font-['Inconsolata'] tracking-wider"
                type="button"
                onClick={() => setShowModal(true)}

              >
                Share
              </button>
              {showModal ? (
                <>
                  <div className="px-[13px] justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                    <div className="relative w-auto my-6 mx-auto max-w-3xl">
                      {/*content*/}
                      <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                        {/*header*/}
                        <div className="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
                          <h3 className="text-3xl font-semibold">
                            {clickCheck}
                            
                            </h3>
                          <button
                            className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                            onClick={() => setShowModal(false)}
                          >
                            <span className="bg-transparent text-black opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                              ×
                            </span>
                          </button>
                        </div>
                        {/*body*/}
                        <div className="relative pl-6 pb-6 flex-auto">
                          <div>
                            <div>
                              {clickCheck=="Share"?(
                              <div className="flex  w-auto sm:w-[350px] flex-wrap  items-center justify-center">
                                <div className='flex justify-center flex-col items-center space-y-[0.4rem]  mr-[2rem] mt-[1rem]'>
                                  <FacebookShareButton
                                  url={`https://textnft.vercel.app/${path}` }
                                  hashtag="#GoldenWordsNFTs"
                                  quote={"Vist link to buy this Nfts"}
                                  >
                                  <BsFacebook className="text-[blue] share bg-[white] rounded-full "></BsFacebook>
                                  <p className="text-[#A1A1A1] text-[1.1rem]">Facebook</p>
                                  
                                  </FacebookShareButton>
                                </div>
                                <div className='flex justify-center flex-col items-center space-y-[0.4rem] mr-[2rem] mt-[1rem]'>
                                  <BsInstagram className="insta  text-[white] share !p-[0.4rem] !rounded-[22px]"></BsInstagram>
                                  <p className="text-[#A1A1A1] text-[1.1rem]">Instagram</p>
                                </div>
                                <div className='flex justify-center flex-col items-center space-y-[0.4rem] mr-[2rem] mt-[1rem]'>
                                  <BsTwitter className="text-[white] bg-[#00ACEE] p-[8.9px] rounded-[25px] share"></BsTwitter>
                                  <p className="text-[#A1A1A1] text-[1.1rem]">Twitter</p>
                                </div>
                                <div className='flex justify-center flex-col items-center space-y-[0.4rem] mr-[2rem] mt-[1rem]'>
                                  <BsWhatsapp className="share bg-[#25D366] text-[white] rounded-[25px] p-[1rem]"></BsWhatsapp>
                                  <p className="text-[#A1A1A1] text-[1.1rem]">Whatsapp</p>
                                </div>
                                <div className='flex justify-center flex-col items-center space-y-[0.4rem] mr-[2rem] mt-[1rem]' onClick={() =>setclickCheck("Embed Video")}>
                                  <ImEmbed className="share bg-[#f1f1f1] text-[#888787] rounded-[25px] p-[0.7rem]"></ImEmbed>
                                  <p className="text-[#A1A1A1] text-[1.1rem]">Embed</p>
                                </div>
                                <div className='flex justify-center flex-col items-center space-y-[0.4rem] mr-[2rem] mt-[1rem] ' onClick={() =>setclickCheck("Qr code")}>
                            
                                  <MdQrCode className="share bg-[#f1f1f1] text-[black] rounded-[25px] p-[1rem]"></MdQrCode>
                                  <p className="text-[#A1A1A1] text-[1.1rem]">Qr Code</p>
                                </div>
                              </div>):""}


                              {/* <div className="flex space-x-[2rem] mt-[2rem]">
                                
                              </div> */}

                              {clickCheck=="Qr code"?(
    <div className="flex justify-center flex-col items-center">
  <QRCode
    id={path}
    value={process.env.URL+path}
    size={290}
    level={"H"}
    includeMargin={true}
  />
  <a onClick={downloadQR} className="text-[1.6rem] text-blue-600 cursor-pointer"> Download QR Code </a>
</div>):""
}
                            </div>
                          </div>
                        </div>
                        {/*footer*/}
                        <div className="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
                          <button
                            className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                            type="button"
                            onClick={() => {setShowModal(false)
                            setclickCheck("Share")
                            }}
                          >
                            Close
                          </button>
                          {/* <button
                    className="bg-emerald-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                    type="button"
                    onClick={() => setShowModal(false)}
                  >
                    Save Changes
                  </button> */}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
              ) : null}

              <div className="flex ">
                <p className="text-red-600 font-['Inconsolata'] text-[1.6rem] font-medium">
                  Login to see buying option
                </p>
              </div>
            </div>

        </div>
      </div>
    </>
  );
};

export default IndividualNFT;
