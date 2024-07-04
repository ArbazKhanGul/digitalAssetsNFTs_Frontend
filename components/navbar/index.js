import Image from "next/image";
import Link from "next/link";
import { useState, useEffect, memo } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { IoNotificationsOutline } from "react-icons/io5"
import { useRouter } from "next/router";
import { connectWalletLogin } from "../../metamask/login";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useSelector, useDispatch } from "react-redux";
import { selectAddress, addAddress } from "../../slice/metamask";
import { ethers } from "ethers";
import { shortText } from "limit-text-js";
import { selectUser } from "../../slice/user";
import Logout from "../../utils/logout";
import Notification from "../notification"
import useSWR from "swr";
import { fetcherCount } from "../../utils/fetcher";
import PulseLoader from "react-spinners/PulseLoader";


const binanceNetwork = {
  chainId: '0x38',  // Binance Smart Chain's chainId in hexadecimal
  chainName: 'Binance Smart Chain',
  nativeCurrency: {
    name: 'BNB',
    symbol: 'bnb',
    decimals: 18,
  },
  rpcUrls: ['https://bsc-dataseed.binance.org/'],
  blockExplorerUrls: ['https://bscscan.com/'],
};

const localNetwork = {
  chainId: '0x7A69',  // 31337 in hexadecimal
  chainName: 'Local Ethereum Network',
  nativeCurrency: {
    name: 'ETH',
    symbol: 'eth',
    decimals: 18,
  },
  rpcUrls: ['http://localhost:8545'],  // Your local RPC URL
  // blockExplorerUrls: [],  // Add a block explorer URL if available
};

// const addBinanceSmartChain = async (setChainMessage) => {
//   try {
//     // Request MetaMask to add Binance Smart Chain
//     await window.ethereum.request({
//       method: 'wallet_addEthereumChain',
//       params: [localNetwork],
//     });
//     setChainMessage(false);
//   } catch (error) {
//     if(error.message=="User rejected the request."){
//       toast.error('User reject switch chain request', {
//         position: 'top-center',
//       });  
//       return;
//     }
//     toast.error('There is some issue in changing network please check your metamask', {
//       position: 'top-center',
//     });
//   }
// };

const connectToBinanceSmartChain = async (setChainMessage) => {
  try {
    // Requesting MetaMask to switch to Binance Smart Chain Testnet
    await window.ethereum.request({
      method: 'wallet_switchEthereumChain',
      params: [{ chainId: '0x61' }], // Binance Smart Chain Testnet's chainId is 97 in hexadecimal (0x61)
    });
    setChainMessage(false);
  } catch (error) {
    console.log("🚀 ~ file: index.js:78 ~ connectToBinanceSmartChainTestnet ~ error:", error);

    if (error.message === "User rejected the request.") {
      toast.error('User rejected the switch chain request', {
        position: 'top-center',
      });
      return;
    } else if (error.message.includes('Unrecognized chain ID')) {
      addBinanceSmartChainTestnet(setChainMessage);
      return;
    }

    toast.error('Could not switch to Binance Smart Chain Testnet', {
      position: 'top-center',
    });
  }
};

const addBinanceSmartChainTestnet = async (setChainMessage) => {
  try {
    await window.ethereum.request({
      method: 'wallet_addEthereumChain',
      params: [
        {
          chainId: '0x61',
          chainName: 'Binance Smart Chain Testnet',
          nativeCurrency: {
            name: 'Binance Coin',
            symbol: 'BNB',
            decimals: 18,
          },
          rpcUrls: ['https://data-seed-prebsc-1-s1.binance.org:8545'],
          blockExplorerUrls: ['https://testnet.bscscan.com'],
        },
      ],
    });
    setChainMessage(false);
  } catch (error) {
    console.error("🚀 ~ file: index.js:105 ~ addBinanceSmartChainTestnet ~ error:", error);
    toast.error('Could not add Binance Smart Chain Testnet', {
      position: 'top-center',
    });
  }
};

const Navbar = () => {

  const user = useSelector(selectUser);
  const address = useSelector(selectAddress);

  const router = useRouter();
  const [showItems, show] = useState(false);
  
  const [chainMessage, setChainMessage] = useState(false);

  const [showLogin, setShowLogin] = useState(false);
  const [notificationControl, setNotificationControl] = useState(false);
  const dispatch = useDispatch();



  const { data, error,isLoading  } = useSWR(user && router.pathname != "/notification/[id]"?`/unreadnotification`:null, fetcherCount);



  useEffect(() => {
    function handleAccountChanged(accounts) {
      if (address) {
        toast.warn("Account Changed or Disconnect", {
          position: "top-center",
        });

        if (!accounts[0]) {
          dispatch(addAddress(accounts[0]));
          return;
        }
        let checkSumAddress = ethers.utils.getAddress(accounts[0]);
        dispatch(addAddress(checkSumAddress));
      }
    }

    async function handleChainChanged(chainId) {
      if (chainId == process.env.chainId) {
        try {
          const provider = new ethers.providers.Web3Provider(window?.ethereum);
          const signer = provider.getSigner();
          const SignerAddress = await signer.getAddress();
          let checkSumAddress = ethers.utils.getAddress(SignerAddress);
          dispatch(addAddress(checkSumAddress));
        } catch (err) { }
      } else {
        dispatch(addAddress(undefined));
      
        toast.error("Please connect to  binance smart chain testnet", {
          position: "top-center",
        });
      }
    }

    window?.ethereum?.on("accountsChanged", handleAccountChanged);

    window?.ethereum?.on("chainChanged", handleChainChanged);

    return () => {
      window?.ethereum?.removeListener("accountsChanged", handleAccountChanged);
      window?.ethereum?.removeListener("chainChanged", handleChainChanged);
    };
  }, [address]);




  return (
    <>
<div className={`overflow-hidden transition-all ease-in-out duration-800 ${!chainMessage || window.ethereum.chainId == process.env.chainId ? 'h-0': 'h-[5.5rem]'}`}>
  <div className={ `w-full z-[100] bg-red-500 text-sm py-[2.2rem] text-white shadow-lg pl-[1rem] pr-[2rem]  sm:pl-[2rem] sm:pr-[3rem] md:pl-[3rem] md:pr-[4.5rem]`} role="alert">
    <div className="flex  text-[2.2rem]">
      Please connect to or binance smart chain testnet or
      <button class="text-[#3838af] text-[2rem] underline pl-[0.7rem] decoration-skip-ink-none break-underline" onClick={()=>{connectToBinanceSmartChain(setChainMessage)}}>
       Automatically connect
      </button>


      <div className="ml-auto flex">

        <button type="button" onClick={()=>{setChainMessage(false)}} className="inline-flex flex-shrink-0 justify-center items-center h-4 w-4 rounded-md text-white/[.5] hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-red-800 focus:ring-red-500 transition-all text-sm dark:focus:ring-offset-red-500 dark:focus:ring-red-700">
          <span className="sr-only">Close</span>
          <svg className="w-[2.5rem] h-[2.5rem] text-white" width="25" height="25" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0.92524 0.687069C1.126 0.486219 1.39823 0.373377 1.68209 0.373377C1.96597 0.373377 2.2382 0.486219 2.43894 0.687069L8.10514 6.35813L13.7714 0.687069C13.8701 0.584748 13.9882 0.503105 14.1188 0.446962C14.2494 0.39082 14.3899 0.361248 14.5321 0.360026C14.6742 0.358783 14.8151 0.38589 14.9468 0.439762C15.0782 0.493633 15.1977 0.573197 15.2983 0.673783C15.3987 0.774389 15.4784 0.894026 15.5321 1.02568C15.5859 1.15736 15.6131 1.29845 15.6118 1.44071C15.6105 1.58297 15.5809 1.72357 15.5248 1.85428C15.4688 1.98499 15.3872 2.10324 15.2851 2.20206L9.61883 7.87312L15.2851 13.5441C15.4801 13.7462 15.588 14.0168 15.5854 14.2977C15.5831 14.5787 15.4705 14.8474 15.272 15.046C15.0735 15.2449 14.805 15.3574 14.5244 15.3599C14.2437 15.3623 13.9733 15.2543 13.7714 15.0591L8.10514 9.38812L2.43894 15.0591C2.23704 15.2543 1.96663 15.3623 1.68594 15.3599C1.40526 15.3574 1.13677 15.2449 0.938279 15.046C0.739807 14.8474 0.627232 14.5787 0.624791 14.2977C0.62235 14.0168 0.730236 13.7462 0.92524 13.5441L6.59144 7.87312L0.92524 2.20206C0.724562 2.00115 0.611816 1.72867 0.611816 1.44457C0.611816 1.16047 0.724562 0.887983 0.92524 0.687069Z" fill="currentColor"/>
          </svg>
        </button>
      </div>
    </div>
  </div>
</div>

      <div className="navbar flex items-center pt-[1.5rem] !pb-[1.2rem] pl-[1rem] pr-[2rem]  sm:pl-[2rem] sm:pr-[3rem] md:pl-[3rem] md:pr-[4.5rem] md:!pt-[1.2rem] md:!pb-[1.2rem]">
        <div onClick={()=>{router.push("/")}} className=" w-[28em] h-[3.1rem] sm:w-[30rem] sm:h-[4rem]  md:w-[35rem] md:h-[3.7rem] xl:w-[40rem] xl:h-[4rem]  relative">
          <Image src="/po.png" layout="fill" />
        </div>

        <div className="flex-1 items-center flex ml-[1rem]">

        {router.pathname != "/notification/[id]" && user && user.address == address ?  

                    <div className="ml-auto mr-[1rem] sm:mr-[2rem] lg:hidden bell-notification" current-count={data && data > 0?data:""} onClick={() => { setNotificationControl(!notificationControl) }} >
                      <IoNotificationsOutline
                        className="w-[2.5rem] h-[2.5rem] sm:w-[2.7rem]  sm:h-[2.7rem]  ml-auto  inline-block   text-white"
                      />
                    </div>
                   : null
                }

          <AiOutlineMenu
            className={`w-[2.4rem] h-[2.4rem] sm:w-[2.7rem]  sm:h-[2.7rem]  inline-block lg:hidden text-white ${router.pathname != "/notification/[id]" && user && user.address == address?"":"ml-auto"}`}
            onClick={() => {
              show((prevState) => {
                return prevState ? false : true;
              });
            }}
          ></AiOutlineMenu>



          <ul className=" ml-auto hidden lg:inline-flex items-center">
            <li className="inline-block links">
              <Link href="/">
                <a className={router.pathname == "/" ? "text-blue-600" : ""}>
                  Home
                </a>
              </Link>
            </li>
            <li className="inline-block links">
              <Link href="/nfts">
                <a className={router.pathname.startsWith("/nfts") ? "text-blue-600" : ""}>
                  NFTs
                </a>
              </Link>
            </li>
            <li className="inline-block links ">
              <Link href="/collection">
                <a
                  className={
                    router.pathname.startsWith("/collection") ? "text-blue-600" : ""
                  }
                >
                  Profiles
                </a>
              </Link>
            </li>

            {!user || user.address != address ? (
              <>
                <li className="inline-block links ">
                  <button
                    onClick={() => connectWalletLogin(user, dispatch, address, router, setShowLogin,setChainMessage)}
                    className="bg-[#1b31c4] hover:bg-blue-800  text-[#f7f2f2] font-normal text-[1.7rem] sm:font-semibold py-2 px-12  sm:py-2 sm:px-11 rounded-full  tracking-wider"
                    disabled={showLogin}
                  >

                    <a className="flex justify-center items-center gap-[0.5rem]">
                    Login {
            showLogin ?
             (

            <PulseLoader
              color={"#ffffff"}
              // cssOverride={{ }}
              size={5}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
        )
          :null
        }</a>
                  </button>
                </li>
                <li className="inline-block links">
                  <Link href="/registration">
                    <a>

                      <button className="bg-[#1b31c4] hover:bg-blue-800  text-[#f7f2f2] font-normal text-[1.7rem] sm:font-semibold py-2 px-12  sm:py-2 sm:px-11 rounded-full  tracking-wider">
                        Register
                      </button>
                    </a>
                  </Link>
                </li>
              </>
            ) : (
              <>
                <li className="inline-block links">
                  <Link href="/createnft">
                    <a
                      className={
                        router.pathname == "/createnft" ? "text-blue-600" : ""
                      }
                    >
                      Create NFT
                    </a>
                  </Link>
                </li>

                <li className="inline-block links">
                  <Link href="/buycrypto">
                    <a
                      className={
                        router.pathname == "/buycrypto" ? "text-blue-600" : ""
                      }
                    >
                      Buy BNB
                    </a>
                  </Link>
                </li>
                <li className="inline-block links " onClick={() => {
                  Logout(dispatch, router)
                }} >
                  <a>
                    Logout
                  </a>

                </li>

                {router.pathname != "/notification/[id]" ? <li className="inline-block links "  >
                  <a>
                    <div className="bell-notification" current-count={data && data > 0?data:""} onClick={() => { setNotificationControl(!notificationControl) }} >
                      <IoNotificationsOutline
                        className="w-[2.7rem] ml-auto h-[2.7rem]  inline-block   text-white"
                      />
                    </div>
                  </a>

                </li> : null
                }
                <li className="inline-block links">
                  <Link href={`/profile/${user._id}`}>
                    <a
                      className={
                        router.pathname.startsWith("/profile") && router.query.id == `${user._id}` ? "text-blue-600" : ""
                      }
                    >
                      <div className="flex items-center space-x-[0.4rem]">
                        <div className=" w-[4.2rem] h-[4.2rem] rounded-full relative">
                          <Image
                            src={`${user?.profile}`}
                            layout="fill"
                            className="rounded-full"
                          />


                        </div>
                        <h2  className="font-['Inter'] font-semibold">{shortText(user.authorName, 10, "...")}</h2>
                      </div>
                    </a>
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
        <div id="scrollableDiv" className={`absolute z-[100] font-['Inconsolata'] w-[90%] xs:w-[65%] sm:w-[39rem] bg-[#FFFFFF] rounded-[1rem] right-[2%] sm:right-[3rem] top-[6.18rem] sm:top-[6.4rem]  overflow-y-auto  box-border transition-all duration-500  scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-[#FFF] scrollbar-thumb-rounded-xl scrollbar-track-rounded-full shadow-md ${!notificationControl ? "h-0" : "h-[440px] sm:h-[510px] border-[0.18rem]"}`}>
          {!user || user.address != address ? null : <Notification notificationControl={setNotificationControl} />}
        </div>
      </div>

      <div
        className={
          "onclicklist transition-all duration-500 overflow-hidden lg:hidden linear " +
          (!showItems ? "h-0 " : (!user || user.address != address ? "h-[212px]" : "h-[355px]"))
        }
      >
        <ul className={"divide-y-[1px] divide-[#454f5a]"}>
          <Link href="/" passHref>
            <a>
              <li
                className={
                  "onlinks py-[0.6em]  " +
                  (router.pathname == "/" ? "text-blue-600" : "text-[#EAE1E1]")
                }
              >
                Home
              </li>
            </a>
          </Link>
          <Link href="/nft">
            <a>
              <li
                className={
                  " onlinks py-[0.6rem] " +
                  (router.pathname == "/nft"
                    ? "text-blue-600"
                    : "text-[#EAE1E1]")
                }
              >
                NFTs
              </li>
            </a>
          </Link>

          <Link href="/collection">
            <a>
              <li
                className={
                  " onlinks py-[0.6rem] " +
                  (router.pathname == "/collection"
                    ? "text-blue-600"
                    : "text-[#EAE1E1]")
                }
              >
                Profiles
              </li>
            </a>
          </Link>

          {!user || user.address != address ? (
            <>
              <a>
                <li
                  className="onlinks py-[0.6rem] x-[2.5rem]  text-[#EAE1E1]"
                  onClick={() => {!showLogin?connectWalletLogin(user, dispatch, address, router, setShowLogin):""}}
                  // disabled={showLogin}
                >
                       <span className="flex  items-center gap-[0.5rem] cursor-pointer">
                    Login {
            showLogin ?
             (

            <PulseLoader
              color={"#ffffff"}
              // cssOverride={{ }}
              size={5}
              aria-label="Loading Spinner"
              data-testid="loader"
            />
        )
          :null
        }</span>
                </li>
              </a>

              <Link href="/registration">
                <a>
                  <li
                    className={
                      "onlinks py-[0.6rem] x-[2.5rem]  " +
                      (router.pathname == "/registration"
                        ? "text-blue-600"
                        : "text-[#EAE1E1]")
                    }
                  >
                    Register
                  </li>
                </a>
              </Link>
            </>
          ) : (
            <>

              <Link href="/createnft">
                <a>
                  <li
                    className={
                      " onlinks py-[0.6rem] x-[2.5rem]  " +
                      (router.pathname == "/createnft"
                        ? "text-blue-600"
                        : "text-[#EAE1E1]")
                    }
                  >
                    Create NFT
                  </li>
                </a>
              </Link>

              <Link href="/buycrypto">
                <a>
                  <li
                    className={
                      " onlinks py-[0.6rem] x-[2.5rem]  " +
                      (router.pathname == "/buycrypto"
                        ? "text-blue-600"
                        : "text-[#EAE1E1]")
                    }
                  >
                    Buy BNB
                  </li>
                </a>
              </Link>

              <a>
                <li
                  className="onlinks py-[0.6rem] x-[2.5rem]  text-[#EAE1E1] cursor-pointer"
                  onClick={() => { Logout(dispatch, router) }}

                >
                  Logout
                </li>
              </a>


              <Link href={`/profile/${user._id}`}>
                <a>
                  <li
                    className={
                      " onlinks py-[0.6rem] x-[2.5rem] " +
                      (router.pathname.startsWith("/profile") && router.query.id == `${user._id}`
                        ? "text-blue-600"
                        : "text-[#EAE1E1]")
                    }
                  >
                    <div className="flex items-center space-x-[0.8rem]">
                      <div className=" w-[4.2rem] h-[4.2rem] rounded-full relative">
                        <Image
                          src={`${user.profile}`}
                          layout="fill"
                          className="rounded-full"
                        />
                      </div>
                      <h2>{shortText(user?.authorName, 10, "...")}</h2>
                    </div>
                  </li>
                </a>
              </Link>
            </>
          )}
        </ul>
      </div>
      {/* <div className="text-[1.6rem] font-['Inconsolata']">
        <ToastContainer pauseOnHover autoClose={5000} />
      </div> */}
    </>
  );
};

export default memo(Navbar);
