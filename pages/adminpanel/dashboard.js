import Image from "next/image";
import Navbar from "../../components/navbar";
import { useState, useEffect, useRef } from "react";
import Footer from "../../components/footer";
import "react-toastify/dist/ReactToastify.css";
import getServerSideProps from "../../utils/admin/serverSideDashboardAdmin"
import Sidebar from "../../components/adminpanel/sidenav";
import { CreatorInformation, OwnerInformation, CopyInformation, ProfileInformation } from "../../components/";
import useValidate from '../../utils/useValidate';
import { ethers } from "ethers";
import { nftBalanceTransfer, marketBalanceTransfer } from "../../utils/balanceTransfer";
import ClipLoader from "react-spinners/ClipLoader";
import CreationFeeUpdate from "../../components/adminpanel/creationFeeModal";

const adminDashboard = ({ userinfo, creationFee }) => {


    const [loading, user, address] = useValidate(userinfo);


    const [totalSupply, setTotalSupply] = useState(false);
    const [nftCreationFee, setNftCreationFee] = useState(creationFee);

    const [nftContractBalance, setNftContractBalance] = useState(0);
    const [marketContractBalance, setMarketContractBalance] = useState(0);

    const [nftBalanceLoader, setNftBalanceLoader] = useState(false);
    const [marketBalanceLoader, setMarketBalanceLoader] = useState(false);


    useEffect(() => {

        const fetchData = async () => {

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

        fetchData();

        // Set up an interval to call fetchData every 1 minute (60,000 milliseconds)
        const intervalId = setInterval(fetchData, 60000);

        // Clean up the interval when the component unmounts
        return () => clearInterval(intervalId)
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

                                <div className="w-[90%] xs:w-[80%] md:w-[30%] xl:w-[21%] boxback rounded-[2rem] h-[15rem] space-y-[0.5rem] !text-white text-[2.2rem]  flex flex-col justify-center items-center">
                                    <div>
                                        Total NFTs
                                    </div>
                                    <div>
                                        {
                                            totalSupply ? totalSupply : "..."
                                        }
                                    </div>
                                </div>
                                <div className="w-[90%] xs:w-[80%] md:w-[30%] xl:w-[21%] boxback rounded-[2rem] h-[15rem] space-y-[0.5rem] !text-white text-[2.2rem]  flex flex-col justify-center items-center">
                                    <div>
                                        Marketplace
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
                                        <div className="text-[2rem]">
                                            {
                                                marketContractBalance && marketContractBalance > 0 ? `${parseFloat(ethers.utils.formatUnits(marketContractBalance.toLocaleString('fullwide', { useGrouping: false }), 18)).toFixed(8)} BNB ` : nftContractBalance == 0 ? `0 BNB` : "..."
                                            }
                                        </div>
                                        <button className={` text-[#ffffffff] font-normal text-[1.5rem] sm:font-semibold py-2 px-[2.5rem] cur rounded-[1.8rem] font-['Inconsolata'] tracking-wider bg-[#1E40AF]  hover:bg-[#4042aa]}`}
                                            disabled={marketContractBalance && marketContractBalance > 0 ? false : true}
                                            onClick={() => { marketBalanceTransfer(setMarketContractBalance, setMarketBalanceLoader) }}

                                        >
                                            Transfer
                                        </button></>}
                                </div>

                                <div className="w-[90%] xs:w-[80%] md:w-[30%] xl:w-[21%] boxback rounded-[2rem] h-[15rem] space-y-[0.5rem] !text-white text-[2.2rem]  flex flex-col justify-center items-center">
                                    <div>
                                        NFT Balance
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
                                        <div className="text-[2rem]">
                                            {
                                                nftContractBalance && nftContractBalance > 0 ? `${parseFloat(ethers.utils.formatUnits(nftContractBalance.toLocaleString('fullwide', { useGrouping: false }), 18)).toFixed(8)} BNB ` : nftContractBalance == 0 ? `0 BNB` : "..."
                                            }
                                        </div>
                                        <button className={` text-[#ffffffff] font-normal text-[1.5rem] sm:font-semibold py-2 px-[2.5rem] cur rounded-[1.8rem] font-['Inconsolata'] tracking-wider bg-[#1E40AF]  hover:bg-[#4042aa]}`}
                                            disabled={nftContractBalance && nftContractBalance > 0 ? false : true}
                                            onClick={() => { nftBalanceTransfer(setNftContractBalance, setNftBalanceLoader) }}
                                        >

                                            Transfer
                                        </button>
                                    </>}
                                </div>


                                <div className="w-[90%] xs:w-[80%] md:w-[30%] xl:w-[21%] boxback rounded-[2rem] h-[15rem] space-y-[0.5rem] !text-white text-[2.2rem]  flex flex-col justify-center items-center">
                                    <div>
                                        Creation Fee
                                    </div>

                                    <>
                                        <div className="text-[2rem]">
                                            {
                                                nftCreationFee && `${nftCreationFee} BNB `
                                            }
                                        </div>
                                        <CreationFeeUpdate setFee={setNftCreationFee} />

                                    </>
                                </div>
                            </div>


                            <div className="flex justify-around flex-wrap w-[100%] mb-[2rem]">
                                <CreatorInformation/>
                                <OwnerInformation />
                                <CopyInformation />
                                <ProfileInformation />
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