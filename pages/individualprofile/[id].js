import Image from "next/image";
import Navbar from "../../components/navbar";
import { useState } from "react";
import { MdFilterList } from "react-icons/md";
import Filter from "../../components/profile/filter";
import Pagination from "../../components/pagination/paginationProfile";
import Footer from "../../components/footer";
import IndividualNFT from "../../components/mainpage/individualnft";
import { useRouter } from "next/router";
import { toast,ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import getServerSideProps from "../../utils/serverSideProfile"
import useValidate from "../../utils/useValidate"
import { shortText } from "limit-text-js";
import useSWR from "swr";
import { fetcherNft } from "../../utils/fetcher";
import PuffLoader from "react-spinners/PuffLoader";




const Profile = ({userinfo,profileData}) => {

    // const { data, error, isLoading, isReachedEnd, mutate, size, setSize } = useProfilePaginate(profileData?.email);
 
  const [showItems, show] = useState(false);
  const [searchName, setSearchName] = useState("");
  const [nftName, setnftName] = useState("");
  const [nftType,setNftType]=useState("Owned")
  const [pageIndex, setPageIndex] = useState(0);
  const [loading,user,address]=useValidate(userinfo,"main");


  const { data, error,isLoading  } = useSWR(`/profilenft/${profileData?.email}?skip=${pageIndex}&type=${nftType}&nftName=${nftName}`, fetcherNft);



  return (
    <>
      {!loading ? (
              <div className="text-[1.6rem] font-['Inconsolata']">
              <ToastContainer pauseOnHover autoClose={5000} />
            </div>
      ) : (
        <div>
          <Navbar></Navbar>
          <div>
            <div>
            <div className=" w-[100%] h-[26rem]  relative">
                <Image
                  src={`${process.env.SERVER_URL}/images/${profileData?.cover}`}
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            </div>


            <div className="flex justify-center md:block">
        <div className="  md:ml-[5rem] -mt-[7.5rem]  border-white z-50 relative border-[0.4rem] inline-block rounded-xl">
          <div className="w-[15rem] h-[15rem]  relative">
            <Image
              src={`${process.env.SERVER_URL}/images/${profileData?.profile}`}
              layout="fill"
              objectFit="cover"
              className="rounded-xl"
            />
          </div>
        </div>
        </div>




            {/* <div className="ml-[5rem] -mt-[7.5rem]  border-white z-50 relative border-[0.4rem] inline-block rounded-xl">
              <div className=" w-[26rem] h-[4.2rem] sm:w-[30rem] sm:h-[5rem]  md:w-[15rem] md:h-[15rem]  relative">
                <Image
                  layout="fill"
                  objectFit="cover"
                  className="rounded-xl"
                />
              </div>
            </div> */}
          </div>

          <div className="mx-[2.3rem] sm:mx-[3.5rem] md:mx-[5rem]">
            <h2 className="text-[2.8rem] font-['DynaPuff'] overflow-hidden text-ellipsis">
              {profileData?.collectionName}
            </h2>
            <h3 className="text-[2.3rem] font-['Inconsolata'] font-bold overflow-hidden text-ellipsis">
              <span className="text-[#7D7C7CCF]">By</span> {profileData?.authorName}
            </h3>
            <p className="text-[1.7rem] font-['Inconsolata'] w-[100%] md:w-[80%] lg:w-[70%]">
              {profileData?.description}
            
            </p>
            <div className="flex items-center  space-x-[5.3rem]  sm:space-x-[7.6rem] mt-[1.5rem]">
              <h4 className="text-[2.2rem] font-['Inconsolata'] font-bold">
                Email
              </h4>
              <p className="text-[1.8rem] font-['Inconsolata'] text-[#7D7C7CCF] font-medium overflow-hidden text-ellipsis">
               
              {/* <span className="text-[#615f5fcf] text-[1.6rem] w-[100%] font-['Inconsolata'] font-medium overflow-hidden text-ellipsis">{creator}</span> */}
                {profileData?.email}
              </p>
            </div>

            <div className="flex items-center space-x-[3rem] sm:space-x-[5.3rem] mt-[1.5rem]">
              <h4 className="text-[2.2rem] font-['Inconsolata'] font-bold">
                Address
              </h4>
              <p className="text-[1.8rem] font-['Inconsolata'] text-[#7D7C7CCF] font-medium overflow-hidden text-ellipsis">
                {profileData?.address}
              </p>
            </div>

            {address == profileData?.address && user?.address == address ?
                             <div className="mt-[2rem]">
                             <div className="bord_grad w-fit text-[2.1rem]">
                               <span className="block px-[2.5rem] py-[0.4rem]  cursor-pointer buttonnft font-['Inconsolata']">
                                 Update Profile
                               </span>
                             </div>
                           </div> : null
                }


            <div className="flex flex-wrap justify-center md:justify-start -ml-[2rem] -mr-[2rem]  mb-[2rem] ">
              <div className="shadow inline-block p-[3rem] w-[190px]  ml-[2rem] mr-[2rem] mt-[2rem]">
                <h2 className="text-[2.1rem] font-['Inconsolata'] text-center text-[#7D7C7CCF] font-medium">
                  Revenue
                </h2>
                <p className="text-[2rem] font-['Inconsolata'] font-bold text-center">
                   {shortText(profileData?.volume, 7, "..")} BNB
                </p>
                <h4 className="text-[1.7rem] font-['Inconsolata'] text-center text-[#7D7C7CCF] font-medium">
                  (Buy + Sold)
                </h4>
              </div>

              <div className="shadow inline-block p-[3rem] w-[190px] ml-[2rem] mr-[2rem] mt-[2rem]">
                <h2 className="text-[2.1rem] font-['Inconsolata'] text-center text-[#7D7C7CCF] font-medium">
                  NFTs Created
                </h2>
                <p className="text-[2rem] text-center font-['Inconsolata'] font-bold">
                  {shortText(profileData?.itemsCreated, 7, "..")}
                </p>
                <h4 className="text-[1.7rem] font-['Inconsolata'] text-center text-[#7D7C7CCF] font-medium">
                  Total
                </h4>
              </div>

              <div className="shadow inline-block p-[3rem] w-[190px] ml-[2rem] mr-[2rem] mt-[2rem]">
                <h2 className="text-[2.1rem] font-['Inconsolata'] text-center text-[#7D7C7CCF] font-medium">
                NFTs Buy
                </h2>
                <p className="text-[2rem] font-['Inconsolata'] font-bold text-center">

          {shortText(profileData?.itemsBuy, 7, "..")}
                </p>
                <h4 className="text-[1.7rem] font-['Inconsolata'] text-center text-[#7D7C7CCF] font-medium">
                  Total
                </h4>
              </div>

              <div className="shadow inline-block p-[3rem] w-[190px] ml-[2rem] mr-[2rem] mt-[2rem]">
                <h2 className="text-[2.1rem] font-['Inconsolata'] text-center text-[#7D7C7CCF] font-medium">
                  Total
                </h2>
                <p className="text-[2rem] font-['Inconsolata'] font-bold text-center">
                {shortText(profileData?.itemsBuy + profileData?.itemsCreated, 7, "..")}
                </p>
                <h4 className="text-[1.7rem] font-['Inconsolata'] text-center text-[#7D7C7CCF] font-medium">
                  (Buy + Create)
                </h4>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-center mt-[0.5rem] flex-wrap">
              <div className="nft text-[2.5rem] sm:text-[3rem] md:text-[3.7rem] w-fit font-['DynaPuff'] mt-[0.5rem]">
                {nftType=="both"?"Owned + Created":nftType} NFTs
              </div>
              <div
                className="cursor-pointer text-[1.6rem] sm:text-[1.9rem] md:text-[2rem] mt-[0.5rem] font-semibold text-[#353846C7] flex items-center font-['Inconsolata']"
                onClick={() => {
                  show((prevState) => {
                    return prevState ? false : true;
                  });
                }}
              >
                Search NFTs By filters{" "}
                <MdFilterList className="text-[2.5rem] pl-[0.3rem]"></MdFilterList>
              </div>
            </div>

            <Filter showItems={showItems} nftType={nftType} setNftType={setNftType}></Filter>

            <div className="flex flex-col sm:flex-row sm:items-center mt-[1rem] sm:space-x-[1.5rem]">
              <div className="input_bord_grad w-[100%] md:w-[60%] lg:w-[60%] xl:w-[60%] ">
                <input
                  type="text"
                  className="outline-none text-[1.6rem] md:text-[1.7rem] border-none w-[100%] rounded-[1.2rem] p-[0.8rem] px-[1.3rem] font-['Inconsolata']"
                  placeholder="Search NFT By Name...."
                  onChange={(e)=>{setSearchName(e.target.value);}}
                  value={searchName}
                />
              </div>
              <button onClick={()=>{
                if(nftName!==searchName){
                    setnftName(searchName);
                }
              }} className="mt-[1rem] sm:mt-[0rem] bg-blue-500 w-fit inline-block hover:bg-blue-700  text-white font-normal text-[1.8rem] sm:font-semibold py-2 px-12  sm:py-3 sm:px-14 rounded-full font-['Inconsolata'] tracking-wider">
                <a>Search</a>
              </button>
            </div>
          </div>

          <div>
            <div className="pl-[1.2rem] mb-[2rem]">
              <span className="colgrad text-[1.6rem] font-semibold text-center sm:text-left mt-[1.2rem] mx-[2.8rem] md:mx-[4.3rem] block font-['Inconsolata'] ">
                (Click on any NFT to see his full detail and buying option)
              </span>

              <span className="colgrad text-[2.1rem] break-all sm:text-[2.7rem] font-semibold text-center sm:text-left mt-[1.2rem] mx-[2.8rem] md:mx-[4.3rem] block font-['Inconsolata'] ">
                {nftName ? `Search Results For ${nftName}` :null}
                
              </span>

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
              <div className="flex flex-wrap jt mx-[4rem] mg">




{error ? (<div className="nft  text-[1.7rem] sm:text-[2rem] md:text-[2.3rem] w-fit font-['DynaPuff'] mt-[0.5rem]">
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
            {
                        data?.count > 8 && pageIndex+1 * 8 < data?.count + 8 ?<Pagination  count={data?.count?data?.count:0} setPageIndex={setPageIndex} pageShow={pageIndex+1}></Pagination>:null}
          </div>

          <Footer></Footer>
        </div>
      )}
    </>
  );
};


export default Profile;


export {getServerSideProps}