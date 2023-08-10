import Image from "next/image";
import Navbar from "../../components/navbar";
import { useState, useEffect, useRef } from "react";
import Footer from "../../components/footer";
import "react-toastify/dist/ReactToastify.css";
import getServerSideProps from "../../utils/serverSideAdmin"
import Sidebar from "../../components/adminpanel/sidenav";
import {CreatorInformation,OwnerInformation,CopyInformation,ProfileInformation} from "../../components/";
import useValidate from '../../utils/useValidate';
import { ethers } from "ethers";
import { nftBalanceTransfer, marketBalanceTransfer } from "../../utils/balanceTransfer";
import ClipLoader from "react-spinners/ClipLoader";

const adminDashboard = ({ userinfo }) => {


    const [loading, user, address] = useValidate(userinfo);
    //   const [dataLoading,setDataLoading]=useState(false);

    const [totalSupply, setTotalSupply] = useState(false);

    const [nftContractBalance, setNftContractBalance] = useState(false);
    console.log("🚀 ~ file: dashboard.js:23 ~ adminDashboard ~ nftContractBalance:", nftContractBalance)
    const [marketContractBalance, setMarketContractBalance] = useState(false);

    const [nftBalanceLoader, setNftBalanceLoader] = useState(false);
    const [marketBalanceLoader, setMarketBalanceLoader] = useState(false);

  
    useEffect(() => {

        const Data = async () => {

            try {
                const NftAbi = [
                    // Get the creator of token
                    "function creatorOf(uint tokenId) public view returns(address)",
                    //Get total Supply
                    "function totalSupply() public view returns(uint)",

                    "function checkFeeAmount() public view returns(uint)"
                ];

                const MarketAbi = [
                    // Get the creator of token
                    "function adminBalance() public view returns(uint)"
                ];

                const provider = new ethers.providers.Web3Provider(window.ethereum);
                const nftContract = new ethers.Contract(process.env.Address, NftAbi, provider);

                const marketContract = new ethers.Contract(process.env.marketAddress, MarketAbi, provider);

                const supply = await nftContract.totalSupply();
                setTotalSupply(supply.toString());

                const nftbalance = await nftContract.checkFeeAmount();
                setNftContractBalance(nftbalance.toString());


                const marketbalance = await marketContract.adminBalance();
                setMarketContractBalance(marketbalance.toString());


            }
            catch (error) {
                console.log("🚀 ~ file: dashboard.js:44 ~ Data ~ error:", error)
            }
        }
        Data();

    }, [])
    return (
        <>
            {loading &&
                <>
                    <Navbar></Navbar>
                    <div className="flex relative flex-col xl:flex-row">

                        <Sidebar className="xl:w-[16%]" />

                        <div className="backside xl:w-[84%] min-h-[90vh]">
                            <div className="flex flex-wrap space-y-[2rem] md:space-y-0 mt-[3rem] justify-evenly font-['Inconsolata'] ">

                                <div className="w-[90%] xs:w-[80%] md:w-[30%] xl:w-[26%] backCreationDetail h-[17rem] space-y-[0.5rem] !text-white text-[2.2rem]  flex flex-col justify-center items-center">
                                    <div>
                                        Total NFTs Created
                                    </div>
                                    <div>
                                        {
                                            totalSupply ? totalSupply : "..."
                                        }
                                    </div>
                                </div>
                                <div className="w-[90%] xs:w-[80%] md:w-[30%] xl:w-[26%] backCreationDetail h-[17rem] space-y-[0.5rem] !text-white text-[2.2rem]  flex flex-col justify-center items-center">
                                    <div>
                                        NFTs Creation Balance
                                    </div>

                                    {nftBalanceLoader ? <div className="flex justify-center  mt-[4px]">

                                        <ClipLoader
                                            color={"#30DCBA"}
                                            loading={nftBalanceLoader}
                                            cssOverride={{ marginBottom: "0px" }}
                                            size={75}
                                            aria-label="Loading Spinner"
                                            data-testid="loader"
                                        />
                                    </div> : <>
                                    <div>
                                        {
                                            nftContractBalance && nftContractBalance > 0? `${parseFloat(ethers.utils.formatUnits(nftContractBalance.toLocaleString('fullwide', { useGrouping: false }), 18)).toFixed(8)} BNB ` : nftContractBalance==0 ? 0 : "..."
                                        }
                                    </div>
                                    <button className={` text-[#f1eeee] font-normal text-[1.7rem] sm:font-semibold py-3 px-10  sm:py-2 sm:px-10 cur rounded-full font-['Inconsolata'] tracking-wider ${nftContractBalance && nftContractBalance > 0 ? 'bg-blue-500  hover:bg-blue-700 cursor-pointer' : 'bg-blue-500'}`}
                                        disabled={nftContractBalance && nftContractBalance > 0 ? false : true}
                                        onClick={() => { nftBalanceTransfer(setNftContractBalance, setNftBalanceLoader) }}
                                    >

                                        Transfer Fund
                                    </button>
                               </>}
                                </div>
                                <div className="w-[90%] xs:w-[80%] md:w-[30%] xl:w-[26%] backCreationDetail h-[17rem] space-y-[0.5rem] !text-white text-[2.2rem]  flex flex-col justify-center items-center">
                                    <div>
                                        Marketplace Balance
                                    </div>

                                    {marketBalanceLoader ? <div className="flex justify-center  mt-[4px]">

                                        <ClipLoader
                                            color={"#30DCBA"}
                                            loading={marketBalanceLoader}
                                            cssOverride={{ marginBottom: "0px" }}
                                            size={75}
                                            aria-label="Loading Spinner"
                                            data-testid="loader"
                                        />
                                    </div> : <>
                                        <div>
                                            {
                                                marketContractBalance && marketContractBalance > 0? `${parseFloat(ethers.utils.formatUnits(marketContractBalance.toLocaleString('fullwide', { useGrouping: false }), 18)).toFixed(8)} BNB ` : nftContractBalance==0 ? 0 : "..."
                                            }
                                        </div>
                                        <button className={`text-[#f1eeee] font-normal text-[1.7rem] sm:font-semibold py-3 px-10  sm:py-2 sm:px-10 rounded-full font-['Inconsolata'] tracking-wider ${marketContractBalance && marketContractBalance > 0 ? 'bg-blue-400  hover:bg-blue-700 cursor-pointer' : 'bg-blue-500'}`}
                                            disabled={marketContractBalance && marketContractBalance > 0 ? false : true}
                                            onClick={()=>{marketBalanceTransfer(setMarketContractBalance,setMarketBalanceLoader)}}

                                        >
                                            Transfer Fund
                                        </button></>}
                                </div>
                            </div>


                            <div className="flex justify-around flex-wrap w-[100%] mb-[2rem]">
                                <CreatorInformation type="creator"/> 
                                <OwnerInformation type="owner"/>
                                <CopyInformation type="copy"/> 
                                <ProfileInformation type="profile"/> 
                            </div>
                        </div>



                    </div>

                    <Footer></Footer>
                </>
            }
        </>
    );
};

export default adminDashboard;

export { getServerSideProps }