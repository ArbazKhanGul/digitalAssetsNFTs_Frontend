import { useState } from "react";
import { BsFacebook,BsTwitter, BsWhatsapp } from "react-icons/bs";
import { ImEmbed } from "react-icons/im";
import QRCode from 'qrcode.react';
import { MdQrCode } from "react-icons/md";
import { useRouter } from 'next/router'
import {FacebookShareButton, TwitterShareButton, WhatsappShareButton} from "react-share"

function index({path,page}) {
  
    const [showModal, setShowModal] = useState(false);
  const [clickCheck,setclickCheck] = useState("Share");


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
      <button
      className="xs:mr-[2rem] w-[100%] xs:w-fit bg-[#1b31c4] hover:bg-[#182ba8] text-white font-normal text-[1.8rem] sm:font-semibold py-4 xs:py-3 px-[5rem] rounded-[1.3rem] xs:rounded-full font-['Inconsolata'] tracking-wider"
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
                        <div className={"relative pb-6 flex-auto"+(clickCheck=="Share"?" pl-6 ":"")}>
                          <div>
                            <div>
                              {clickCheck=="Share"?(
                              <div className="flex  w-auto px-[2rem] sm:px-0 sm:w-[350px] flex-wrap  items-center justify-center">
                                <div className='flex justify-center flex-col items-center space-y-[0.4rem]  mr-[2rem] mt-[1rem]'>
                                  <FacebookShareButton
                                  url={`${path}` }
                                  hashtag="#GoldenWordsNFTs"
                                  quote={"Vist link to buy this Nfts"}
                                  >
                                  <BsFacebook className="text-[blue] share bg-[white] rounded-full "></BsFacebook>
                                  <p className="text-[#A1A1A1] text-[1.1rem]">Facebook</p>
                                  
                                  </FacebookShareButton>
                                </div>
                                {/* <div className='flex justify-center flex-col items-center space-y-[0.4rem] mr-[2rem] mt-[1rem]'>
                                  <BsInstagram className="insta  text-[white] share !p-[0.4rem] !rounded-[22px]"></BsInstagram>
                                  <p className="text-[#A1A1A1] text-[1.1rem]">Instagram</p>
                                </div> */}
                                <div className='flex justify-center flex-col items-center space-y-[0.4rem] mr-[2rem] mt-[1rem]'>
                                 
                                 <TwitterShareButton
                                  url={`${path}` }
                                  hashtags={["GoldenWordsNFTs"]}
                                 >
                                  <BsTwitter className="text-[white] bg-[#00ACEE] p-[8.9px] rounded-[25px] share"></BsTwitter>
                                  <p className="text-[#A1A1A1] text-[1.1rem]">Twitter</p>
                                  </TwitterShareButton>
                                </div>
                                <div className='flex justify-center flex-col items-center space-y-[0.4rem] mr-[2rem] mt-[1rem]'>
                                
                                
                                
                                <WhatsappShareButton
                                // title="Golden Words NFTs"
                                hashtag="#GoldenWordsNFTs"
                                url={`${path}` }
                                >
                                  <BsWhatsapp className="share bg-[#25D366] text-[white] rounded-[25px] p-[1rem]"></BsWhatsapp>
                                  <p className="text-[#A1A1A1] text-[1.1rem]">Whatsapp</p>
                                  </WhatsappShareButton>
                                </div>


                                {/* <div className='flex justify-center flex-col items-center space-y-[0.4rem] mr-[2rem] mt-[1rem]' onClick={() =>setclickCheck("Embed Video")}>
                                  <ImEmbed className="share bg-[#f1f1f1] text-[#888787] rounded-[25px] p-[0.7rem]"></ImEmbed>
                                  <p className="text-[#A1A1A1] text-[1.1rem]">Embed</p>
                                </div> */}

                                <div className='flex justify-center flex-col items-center space-y-[0.4rem] mr-[2rem] mt-[1rem] ' onClick={() =>setclickCheck("Qr code")}>
                            
                                  <MdQrCode className="share bg-[#f1f1f1] text-[black] rounded-[25px] p-[1rem]"></MdQrCode>
                                  <p className="text-[#A1A1A1] text-[1.1rem]">Qr Code</p>
                                </div>
                              </div>):""}


                              {/* <div className="flex space-x-[2rem] mt-[2rem]">
                                
                              </div> */}

                              {clickCheck=="Qr code"?(
    <div className="flex w-[28.5rem] sm:w-[35rem] justify-center flex-col items-center">
  <QRCode
    id={path}
    value={path}
    size={200}
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
                        <div className="flex items-center justify-end p-6 py-[1rem] border-t border-solid border-slate-200 rounded-b">
                          <button
                            className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-[1.3rem] outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
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
    </>
  )
}

export default index
