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

const Navbar = () => {

  const user = useSelector(selectUser);
  const address = useSelector(selectAddress);

  const router = useRouter();
  const [showItems, show] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  console.log("🚀 ~ file: index.js:28 ~ Navbar ~ showLogin", showLogin)
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
        toast.error("Please connect to binance smart chain", {
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
      <div className="navbar flex items-center pt-[1rem] !pb-[1rem] pl-[0.8rem] pr-[2rem]  sm:pl-[2rem] sm:pr-[3rem] md:pl-[3rem] md:pr-[4.5rem] md:!pt-[1.2rem] md:!pb-[1.2rem]">
        <div className=" w-[26rem] h-[4.2rem] sm:w-[30rem] sm:h-[5rem]  md:w-[40rem] md:h-[4rem]  relative">
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
                    onClick={() => connectWalletLogin(user, dispatch, address, router, setShowLogin)}
                    className="bg-blue-500  hover:bg-blue-700  text-white font-normal text-[1.8rem] sm:font-semibold py-2 px-12  sm:py-2 sm:px-11 rounded-full font-['Inconsolata'] tracking-wider"
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

                      <button className="bg-blue-500  hover:bg-blue-700  text-white font-normal text-[1.8rem] sm:font-semibold py-2 px-12  sm:py-2 sm:px-11 rounded-full font-['Inconsolata'] tracking-wider">
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
                            src={`${process.env.SERVER_URL}/images/${user?.profile}`}
                            layout="fill"
                            className="rounded-full"
                          />


                        </div>
                        <h2>{shortText(user.authorName, 10, "...")}</h2>
                      </div>
                    </a>
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
        <div id="scrollableDiv" className={`absolute z-[100] font-['Inconsolata'] w-[96%] sm:w-[39rem] bg-[#FFFFFF] rounded-[1rem] right-[2%] sm:right-[3rem] top-[6.18rem] sm:top-[6.4rem]  overflow-y-auto  box-border transition-all duration-500  scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-[#FFF] scrollbar-thumb-rounded-xl scrollbar-track-rounded-full  ${!notificationControl ? "h-0" : "h-[440px] sm:h-[510px] border-[0.18rem]"}`}>
          {!user || user.address != address ? null : <Notification />}
        </div>
      </div>

      <div
        className={
          "onclicklist transition-all duration-500 overflow-hidden lg:hidden linear " +
          (!showItems ? "h-0 " : (!user || user.address != address ? "h-[212px]" : "h-[268px]"))
        }
      >
        <ul className={" ml-auto divide-y-[1px] divide-[#454f5a]"}>
          <Link href="/" passHref>
            <a>
              <li
                className={
                  "onlinks py-[0.8rem] pl-[2.5rem] sm:pl-[3.7rem] md:pl-[6rem] " +
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
                  " onlinks py-[0.7rem] px-[2.5rem] sm:pl-[3.7rem] md:pl-[6rem] " +
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
                  " onlinks py-[0.7rem] px-[2.5rem] sm:pl-[3.7rem] md:pl-[6rem] " +
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
                  className="onlinks py-[0.7rem] px-[2.5rem] sm:pl-[3.7rem] md:pl-[6rem] text-[#EAE1E1]"
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
                      "onlinks py-[0.7rem] px-[2.5rem] sm:pl-[3.7rem] md:pl-[6rem] " +
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
                      " onlinks py-[0.7rem] px-[2.5rem] sm:pl-[3.7rem] md:pl-[6rem] " +
                      (router.pathname == "/createnft"
                        ? "text-blue-600"
                        : "text-[#EAE1E1]")
                    }
                  >
                    Create NFT
                  </li>
                </a>
              </Link>



              <a>
                <li
                  className="onlinks py-[0.7rem] px-[2.5rem] sm:pl-[3.7rem] md:pl-[6rem] text-[#EAE1E1] cursor-pointer"
                  onClick={() => { Logout(dispatch, router) }}

                >
                  Logout
                </li>
              </a>


              <Link href={`/profile/${user._id}`}>
                <a>
                  <li
                    className={
                      " onlinks py-[0.7rem] px-[2.5rem] sm:pl-[3.7rem] md:pl-[6rem] " +
                      (router.pathname.startsWith("/profile") && router.query.id == `${user._id}`
                        ? "text-blue-600"
                        : "text-[#EAE1E1]")
                    }
                  >
                    <div className="flex items-center space-x-[0.8rem]">
                      <div className=" w-[4.2rem] h-[4.2rem] rounded-full relative">
                        <Image
                          src={`${process.env.SERVER_URL}/images/${user.profile}`}
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
      <div className="text-[1.6rem] font-['Inconsolata']">
        <ToastContainer pauseOnHover autoClose={5000} />
      </div>
    </>
  );
};

export default memo(Navbar);
