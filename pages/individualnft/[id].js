import Navbar from "../../components/navbar";
import { useState } from "react";
import { useRouter } from 'next/router'
import Head from 'next/head'
import Meta from "../../components/meta"
import getServerSideProps from "../../utils/ServerSideNft"
import useValidate from "../../utils/useValidate"
import { toast,ToastContainer } from "react-toastify";
import Language from "../../utils/languageShow.json"
import Share from "../../components/share"
import Sell from "../../components/sellBuy/sell"

const IndividualNFT = ({ userinfo,nftData}) => {


  let date=new Date(nftData?.createdAt);


  const [loading,user,address]=useValidate(userinfo,"main");


  return (
    <>
    <Head>
        <title>Golden Words NFts</title>
         <Meta/>
    </Head>
      <link itemProp="thumbnailUrl" href="https://textnft.vercel.app/new.png"/> 
      <span itemProp="thumbnail" itemScope itemType="http://schema.org/ImageObject"> 
     <link itemProp="url" href="https://textnft.vercel.app/demo.png"/> 
     </span>


     {!loading ? (
              <div className="text-[1.6rem] font-['Inconsolata']">
              <ToastContainer pauseOnHover autoClose={5000} />
            </div>
      ) : (
        <>
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
                <h2 className="text-[#545151] text-[1.9rem]  font-['Inconsolata'] font-medium block heightDetail">
                  Name
                </h2>
                {/* <h2 className="text-[#545151] text-[1.9rem] sm:text-[2rem] font-['Inconsolata'] font-medium">
                  Price
                </h2> */}
                {/* <div className="text-transparent">jj</div> */}
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
                <p className="text-[#686767cf] font-['Inconsolata'] text-[1.6rem] font-medium block heightDetail">
                  {nftData?.nftName}
                </p>
                {/* <p className="text-[#686767cf] font-['Inconsolata'] text-[1.6rem] font-medium sm:pt-[0.2rem]">
                  0.1 BNB
                </p>
                <div className="text-[#686767cf] font-['Inconsolata'] text-[1.5rem] sm:text-[1.6rem] font-medium">
                  1 $
                </div> */}
                <p className="text-[#00000] font-semibold font-['Inconsolata'] text-[1.5rem] sm:text-[1.6rem] whitespace-nowrap h-[2.4rem] block heightDetail">
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
              {/* <button className="bg-blue-500  hover:bg-blue-700  text-white font-normal text-[1.8rem] sm:font-semibold py-2 px-8  sm:py-3 sm:px-[4rem] rounded-full font-['Inconsolata'] tracking-wider">
  Share
</button> */}



<Share/>

              <div className="flex ">
                <p className="text-red-600 font-['Inconsolata'] text-[1.6rem] font-medium">
                  Login to see buying option
                </p>
              </div>

             <Sell/>

            </div>

        </div>
      </div></> )}
    </>
  );
};

export default IndividualNFT;




export {getServerSideProps};