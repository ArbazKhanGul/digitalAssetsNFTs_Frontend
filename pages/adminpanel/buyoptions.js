import Image from "next/image";
import Navbar from "../../components/navbar";
import { useState, useEffect, useRef } from "react";
import Binance from 'binance-api-node'
import Footer from "../../components/footer";
import "react-toastify/dist/ReactToastify.css";
import getServerSideProps from "../../utils/admin/serverSideBuyAdmin"
import Sidebar from "../../components/adminpanel/sidenav";
import {Platformbnb,MaximumTransfer,CopyInformation,ProfileInformation} from "../../components/";
import useValidate from '../../utils/useValidate';
import { ethers } from "ethers";
import { nftBalanceTransfer, marketBalanceTransfer } from "../../utils/balanceTransfer";
import ClipLoader from "react-spinners/ClipLoader";

const adminDashboard = ({ userinfo ,data}) => {
console.log("🚀 ~ file: buyoptions.js:15 ~ adminDashboard ~ data:", data.platformBnbIncrement)


    const [loading, user, address] = useValidate(userinfo);
    console.log("🚀 ~ file: buyoptions.js:20 ~ adminDashboard ~ address:", address)


    const [dollar, setDollar] = useState(0);
    const [Balance, setBalance] = useState(null);
    const [platformBnbIncrement,setPlatfomrBnbIncrement] = useState(data?.platformBnbIncrement);
    const [maximumTransfer, setMaximumTransfer] = useState(data?.maximumTransfer);


    const getBalance = async () => {
        try {
            const provider = new ethers.providers.JsonRpcProvider();
            const balanceWei = await provider.getBalance(userinfo.address);
            const balanceEther = ethers.utils.formatEther(balanceWei);
            setBalance(parseFloat(balanceEther));
        } catch (error) {
            console.error("Error getting ETH balance:", error);
        }
    };


    const BNBPrice = async () => {
        try {
            const client = Binance()
            let ticker = await client.prices({ symbol: 'BNBUSDT' });
            console.log("🚀 ~ file: buyoptions.js:27 ~ BNBPrice ~ ticker:", ticker)
            
            setDollar(parseFloat(ticker?.BNBUSDT));
        }
        catch (error) {
            console.log(error)
        }
    }

useEffect(() => {
    BNBPrice();
    getBalance();

    // Call the function every 1 minute (60,000 milliseconds)
    const interval = setInterval(() => {
        BNBPrice();
        getBalance();
    }, 60000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(interval);
}, []);


    return (
        <>
            {loading &&
                <>
                    <Navbar></Navbar>
                    <div className="flex relative flex-col xl:flex-row">

                        <Sidebar className="xl:w-[16%]" />

                        <div className="backside xl:w-[90%] min-h-[90vh]">
                            <div className="flex flex-wrap space-y-[2rem] md:space-y-0 mt-[3rem] justify-evenly font-['Inconsolata'] ">

                                <div className="w-[90%] xs:w-[80%] md:w-[30%] xl:w-[21%] boxback rounded-[2rem] h-[15rem] space-y-[0.5rem] !text-white text-[2.2rem]  flex flex-col justify-center items-center">
                                    <div>
                                Actual BNB
                                    </div>
                                    <div>
                                        {
                                            dollar > 0 ? `$${dollar}` : "..."
                                        }
                                    </div>
                                </div>

                                <div className="w-[90%] xs:w-[80%] md:w-[30%] xl:w-[21%] boxback rounded-[2rem] h-[15rem] space-y-[0.5rem] !text-white text-[2.2rem]  flex flex-col justify-center items-center">
                                    <div>
                                        Platform BNB
                                    </div>
                                    <div>
                                       {
                                            dollar > 0 && platformBnbIncrement!=undefined? `$${dollar + platformBnbIncrement}` : "..."
                                        }
                                    </div>
                                </div>

                               
                                <div className="w-[90%] xs:w-[80%] md:w-[30%] xl:w-[21%] boxback rounded-[2rem] h-[15rem] space-y-[0.5rem] !text-white text-[2.2rem]  flex flex-col justify-center items-center">
                                    <div>
                                        Available BNB
                                    </div>
                                    <div>
                                        
                                          {Balance !== null ? Balance.toFixed(3) : "..."}
                                        
                                    </div>
                                </div>
                                <div className="w-[90%] xs:w-[80%] md:w-[30%] xl:w-[21%] boxback rounded-[2rem] h-[15rem] space-y-[0.5rem] !text-white text-[2.2rem]  flex flex-col justify-center items-center">
                                    <div>
                                        Maximum Transfer
                                    </div>
                                    <div>
                                        {
                                         maximumTransfer!=undefined ? maximumTransfer : "..."
                                        }
                                    </div>
                                </div>
                            </div>


                            <div className="flex justify-around flex-wrap w-[100%] mb-[2rem]">
                                <Platformbnb setPlatfomrBnbIncrement={setPlatfomrBnbIncrement}/>
                                <MaximumTransfer setMaximumTransfer={setMaximumTransfer}/>

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