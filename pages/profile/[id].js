import { MdFilterList } from "react-icons/md";
import getServerSideProps from "../../utils/serverSideProfile"
import useValidate from "../../utils/useValidate"
import { fetcherNft } from "../../utils/fetcher";
import {
  Navbar, Filter, PaginationProfile as Pagination,Head, Footer, IndividualNFT, Share, MetaProfile as Meta, useState, useRouter, ethers,Image,ToastContainer,useSWR,PuffLoader
} from "../../components"




const Profile = ({ userinfo, profileData }) => {

  let router = useRouter();
  const [showItems, show] = useState(false);
  const [searchName, setSearchName] = useState("");
  const [nftName, setnftName] = useState("");
  const [nftType, setNftType] = useState("Owned")
  const [pageIndex, setPageIndex] = useState(0);
  const [loading, user, address] = useValidate(userinfo, "main");


  const { data, error, isValidating } = useSWR(`/profilenft/${profileData?.email}?skip=${pageIndex}&type=${nftType}&nftName=${nftName}`, fetcherNft);



  return (
    <>
      <Head>
        <title>Digital Assets NFts</title>

        <Meta data={profileData} />
      </Head>
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




          </div>

          <div className="mx-[2.3rem] sm:mx-[3.5rem] md:mx-[5rem]">
            <h2 className="text-[2.8rem] font-semibold overflow-hidden text-ellipsis">
              {profileData?.authorName}
            </h2>
            <p className="text-[1.7rem] font-['Inconsolata'] w-[100%] md:w-[80%] lg:w-[70%]">
              {profileData?.description}

            </p>
            <div className="flex items-center  space-x-[5.3rem]  sm:space-x-[7.6rem] mt-[1.5rem]">
              <h4 className="text-[2.2rem] font-['Inconsolata'] text-[#141835] font-bold">
                Email
              </h4>
              <p className="text-[1.8rem] font-['Inconsolata'] text-[#2a2f5e] font-medium overflow-hidden text-ellipsis">

                {profileData?.email}
              </p>
            </div>

            <div className="flex items-center space-x-[3rem] sm:space-x-[5.3rem] my-[1.5rem]">
              <h4 className="text-[2.2rem] font-['Inconsolata'] font-bold text-[#141835]">
                Address
              </h4>
              <p className="text-[1.8rem] font-['Inconsolata'] font-medium text-[#22264d]  overflow-hidden text-ellipsis">
                {profileData?.address}
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-[1.5rem]">
              {address == profileData?.address && user?.address == address ?
                         <button onClick={() => { router.push("/profileUpdate") }} className="bg-[#1b31c4] hover:bg-[#182ba8]  text-[#ffffff] font-normal text-[1.8rem] sm:font-semibold py-2 px-20  sm:py-2 sm:px-11 rounded-full font-['Inconsolata'] tracking-wider">
                                      Update Profile
                                    </button>
                
                 : null 
               } 

            {address == profileData?.address && user?.address == address && profileData?.role=="admin"?
                <div className="" onClick={() => { router.push("/adminpanel/dashboard") }}>
                  <button onClick={() => { router.push("/profileUpdate") }} className="bg-[#1b31c4] hover:bg-[#182ba8]  text-[#ffffff] font-normal text-[1.8rem] sm:font-semibold py-[0.7rem] px-16 rounded-full font-['Inconsolata'] tracking-wider">
                                      Admin Panel
                                    </button>
                </div> : null
              }

              {/* <Share path={`${process.env.URL}/profile/${profileData?._id}`} page="profile" /> */}

            </div>

            <div className="flex flex-wrap justify-center lg:justify-start -ml-[2rem] -mr-[2rem]  mb-[2rem] ">

              <div className="win shadow inline-block p-[3rem] profileitems ml-[2rem] mr-[2rem] mt-[2rem]">
                <h2 className="text-[2.1rem] font-['Inconsolata'] text-center text-[white] font-medium">
                  Revenue
                </h2>
                <p className="text-[2rem] text-[white] font-['Inconsolata'] font-bold text-center overflow-x-auto whitespace-nowrap scrollbar-none ">
                  {ethers.utils.formatUnits(profileData?.volume.toLocaleString('fullwide', { useGrouping: false }), 18)} BNB
                </p>
                <h4 className="text-[1.7rem] font-['Inconsolata'] text-center text-[white] font-medium">
                  Total
                </h4>
              </div>

              <div className="shadow inline-block p-[3rem] profileitems ml-[2rem] mr-[2rem] mt-[2rem] win">
                <h2 className="text-[2.1rem] font-['Inconsolata'] text-center text-[white] font-medium ">
                  NFTs Created
                </h2>
                <p className="text-[2rem] text-center text-[white] font-['Inconsolata'] font-bold overflow-x-auto whitespace-nowrap scrollbar-none ">
                  {profileData?.itemsCreated}
                </p>
                <h4 className="text-[1.7rem] font-['Inconsolata'] text-center text-[white] font-medium">
                  Total
                </h4>
              </div>

              <div className="shadow win inline-block p-[3rem] profileitems ml-[2rem] mr-[2rem] mt-[2rem]">
                <h2 className="text-[2.1rem] font-['Inconsolata'] text-center text-[white] font-medium">
                  NFTs Buy
                </h2>
                <p className="text-[2rem] font-['Inconsolata'] text-[white] font-bold text-center overflow-x-auto whitespace-nowrap scrollbar-none ">

                  {profileData?.itemsBuy}
                </p>
                <h4 className="text-[1.7rem] font-['Inconsolata'] text-center text-[white] font-medium">
                  Total
                </h4>
              </div>

              <div className="shadow win inline-block p-[3rem] profileitems ml-[2rem] mr-[2rem] mt-[2rem]">
                <h2 className="text-[2.1rem] font-['Inconsolata'] text-center text-[white] font-medium ">
                  NFTs Sell
                </h2>
                <p className="text-[2rem] font-['Inconsolata'] font-bold text-[white] text-center overflow-x-auto whitespace-nowrap scrollbar-none">
                  {profileData?.itemsSell}
                </p>
                <h4 className="text-[1.7rem] font-['Inconsolata'] text-center text-[white] font-medium">
                  Total
                </h4>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row justify-between items-center mt-[0.5rem] flex-wrap">
              <div className=" text-[#fa5151] font-bold text-[2.5rem] sm:text-[3rem] md:text-[3.7rem] w-fit  mt-[0.5rem] font-['Inconsolata']">
                {nftType == "both" ? "Owned + Created" : nftType} NFTs
              </div>
              <div
                className="cursor-pointer text-[1.6rem] sm:text-[1.9rem] md:text-[2rem] mt-[0.5rem] font-semibold text-[#252f5fc7] flex items-center font-['Inconsolata']"
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
                  onChange={(e) => { setSearchName(e.target.value); }}
                  value={searchName}
                />
              </div>
              <button onClick={() => {
                if (nftName !== searchName) {
                  setnftName(searchName);
                }
              }} className="mt-[1rem] win sm:mt-[0rem] bg-[#1b31c4] hover:bg-[#182ba8]  w-fit inline-block  text-white font-normal text-[1.8rem] sm:font-semibold py-2 px-12  sm:py-3 sm:px-14 rounded-full font-['Inconsolata'] tracking-wider">
                <a>Search</a>
              </button>
            </div>
          </div>

          <div>
            <div className="pl-[1.2rem] mb-[2rem]">
              <span className="text-[black] text-[1.6rem] font-semibold text-center sm:text-left mt-[1.2rem] mx-[2.8rem] md:mx-[4.3rem] block font-['Inconsolata'] ">
                (Click on any NFT to see his full detail and buying option)
              </span>

              <span className="colgrad text-[2.1rem] break-all sm:text-[2.7rem] font-semibold text-center sm:text-left mt-[1.2rem] mx-[2.8rem] md:mx-[4.3rem] block font-['Inconsolata'] ">
                {nftName ? `Search Results For ${nftName}` : null}
              </span>

              {
                isValidating ?
                  (<div className="flex justify mt-[5rem]-center  mt-[4px]">

                    <PuffLoader
                      color={"#30DCBA"}
                      cssOverride={{ marginBottom: "20px" }}
                      size={110}
                      aria-label="Loading Spinner"
                      data-testid="loader"
                    />
                  </div>)
                  : null
              }
              <div className={`mx-[3rem] sm:mx-[4rem] ${data ? "flex flex-wrap mg jt" : ""}`}>




                {error ? (<div className="nft  text-[1.7rem] sm:text-[2rem] md:text-[2.3rem] w-fit font-['DynaPuff'] mt-[0.5rem]">
                  Error in getting NFTs Please try later</div>) : ""
                }

                {
                  (!error && data) ?
                    data?.nft?.map((data, index) => {
                      return <IndividualNFT data={data} key={index} index={index} nftname={data?.nftName} owner={data?.owner_email} creator={data?.creator_email} price={data?.price} creationdate={data?.createdAt} type={data?.contentType} contentURI={data?.contentURI} tokenURI={data?.tokenURI} id={data?.tokenURI} ></IndividualNFT>
                    }) : ""
                }


                {data?.nft?.length == 0 && !error ? (<div className="text-[#cbcdcf]  text-[1.7rem] sm:text-[2rem] md:text-[3.3rem] w-fit font-['Inconsolata'] mt-[1.5rem]">
                  OOPS!   Nothing to show...</div>) : ""
                }

              </div>
            </div>
            {
              data?.count > 8 && pageIndex + 1 * 8 < data?.count + 8 ? <Pagination count={data?.count ? data?.count : 0} setPageIndex={setPageIndex} pageShow={pageIndex + 1}></Pagination> : null}
          </div>

          <Footer></Footer>
        </div>
      )}
    </>
  );
};


export default Profile;


export { getServerSideProps }