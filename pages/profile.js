import Image from "next/image";
import Navbar from "../components/navbar";
import { useState, useEffect } from "react";
import { MdFilterList } from "react-icons/md";
import Filter from "../components/profile/filter";
import Pagination from "../components/nft/pagination";
import Footer from "../components/footer/footer";
import IndividualNFT from "../components/mainpage/individualnft";
import axios from "../utils/axiosconfiguration";
import { selectAddress,addAddress } from "../slice/metamask";
import { useSelector,useDispatch} from "react-redux";
import { useRouter } from "next/router";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {ethers} from "ethers"
import { selectUser,addUser } from "../slice/user";

const Profile = () => {
  const [showItems, show] = useState(false);
  const[loading,setLoading] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  let temp = [
    {
      nftname: "NFT name",
      creator: "arbazkhangul123@gmail.com",
      owner: "owner@gmail.com",
      creationdate: "10/9/22 24:33:12",
      nfttext: "If you continue to work hard, success will follow you",
      price: "0.1BNB",
    },
    {
      nftname: "NFT name",
      creator: "creator@gmail.com",
      owner: "owner@gmail.com",
      creationdate: "10 /9/2002",
      nfttext: "If you continue to work hard, success will follow you",
      price: "0.1BNB",
    },
    {
      nftname: "NFT name",
      creator: "creator@gmail.com",
      owner: "owner@gmail.com",
      creationdate: "10 /9/2002",
      nfttext: "If you continue to work hard, success will follow you",
      price: "0.1BNB",
    },
    {
      nftname: "NFT name",
      creator: "creator@gmail.com",
      owner: "owner@gmail.com",
      creationdate: "10 /9/2002",
      nfttext: "If you continue to work hard, success will follow you",
      price: "0.1BNB",
    },
    {
      nftname: "NFT name",
      creator: "creator@gmail.com",
      owner: "owner@gmail.com",
      creationdate: "10 /9/2002",
      nfttext: "If you continue to work hard, success will follow you",
      price: "0.1BNB",
    },
    {
      nftname: "NFT name",
      creator: "creator@gmail.com",
      owner: "owner@gmail.com",
      creationdate: "10 /9/2002",
      nfttext: "If you continue to work hard, success will follow you",
      price: "0.1BNB",
    },
    {
      nftname: "NFT name",
      creator: "creator@gmail.com",
      owner: "owner@gmail.com",
      creationdate: "10 /9/2002",
      nfttext: "If you continue to work hard, success will follow you",
      price: "0.1BNB",
    },
    {
      nftname: "NFT name",
      creator: "creator@gmail.com",
      owner: "owner@gmail.com",
      creationdate: "10/9/2002",
      nfttext: "If you continue to work hard, success will follow you",
      price: "0.1BNB",
    },
    {
      nftname: "NFT name",
      creator: "creator@gmail.com",
      owner: "owner@gmail.com",
      creationdate: "10/9/20",
      nfttext: "If you continue to work hard, success will follow you",
      price: "0.1BNB",
    },
  ];
  const address = useSelector(selectAddress);

  const user=useSelector(selectUser);

  useEffect(() => {
    async function load() {
      const access_token = localStorage.getItem("token");
      const login_address = localStorage.getItem("address");


      if (window?.ethereum) {
        try {
          if(address==undefined)
          {
          const provider = new ethers.providers.Web3Provider(window.ethereum);
          const signer = provider.getSigner();
          const SignerAddress = await signer.getAddress();
          const chainId =await provider.getNetwork();
          console.log("🚀 ~ file: index.js ~ line 40 ~ load ~ chainId", chainId.chainId)
          console.log(
            "🚀 ~ file: index.js ~ line 42 ~ load ~ Signer Address",
            SignerAddress
          );
            if(chainId.chainId==56)
            {
          let checkSumAddress = ethers.utils.getAddress(SignerAddress);
              dispatch(addAddress(checkSumAddress));
              return;
            }
        }
      } 
        catch (error) {
          console.log("🚀 ~ file: index.js ~ line 47 ~ load ~ inside error");
        }
      }


      if (login_address != address || !access_token) {
        dispatch(addUser(undefined));
        router.push("/");
        return;
      }

      try {
        const response = await axios.get("/profile", {
          headers: {
            Authorization: `${access_token}`,
          },
        });
        dispatch(addUser(response?.data?.user));
        // toast.success("SLogin", {
        //   position: "top-center",
        // });
        setLoading(true);
      } catch (error) {

        if (error?.response?.data == undefined) {
          toast.error("Server Error Please Try Later", {
            position: "top-center",
          });
        } else {
          toast.error(error?.response?.data.message, {
            position: "top-center",
          });
        }
        dispatch(addUser(undefined));
        router.push("/");
        return;
      }
    }
    load();
  }, [address]);

  return (
    <>
    {!loading?"":(<div>
        <Navbar></Navbar>
        <div>
          <div>
            <div className=" w-[26rem] h-[4.2rem] sm:w-[30rem] sm:h-[5rem]  md:w-[100%] md:h-[26rem]  relative">
              <Image src={`${process.env.SERVER}/${user?.cover}`} layout="fill" objectFit="cover" />
            </div>
          </div>
          <div className="ml-[5rem] -mt-[7.5rem]  border-white z-50 relative border-[0.4rem] inline-block rounded-xl">
            <div className=" w-[26rem] h-[4.2rem] sm:w-[30rem] sm:h-[5rem]  md:w-[15rem] md:h-[15rem]  relative">
              <Image
                src={`${process.env.SERVER}/${user?.profile}`}
                layout="fill"
                objectFit="cover"
                className="rounded-xl"
              />
            </div>
          </div>
        </div>

        <div className="mx-[5rem]">
          <h2 className="text-[2.8rem] font-['DynaPuff']">{user?.collectionName}</h2>
          <h3 className="text-[2.3rem] font-['Inconsolata'] font-bold">
            <span className="text-[#7D7C7CCF]">By</span>  {user?.authorName}
          </h3>
          <p className="text-[1.4rem] font-['Inconsolata'] w-[70%]">
               {user?.description}
          </p>
          <div className="flex items-center space-x-[7.6rem] mt-[1.5rem]">
            <h4 className="text-[2.2rem] font-['Inconsolata'] font-bold">
              Email
            </h4>
            <p className="text-[1.8rem] font-['Inconsolata'] text-[#7D7C7CCF] font-medium">
              {user?.email}
            </p>
          </div>

          <div className="flex items-center space-x-[5.3rem] mt-[1.5rem]">
            <h4 className="text-[2.2rem] font-['Inconsolata'] font-bold">
              Address
            </h4>
            <p className="text-[1.8rem] font-['Inconsolata'] text-[#7D7C7CCF] font-medium">
              {user?.address}
            </p>
          </div>

          <div className="mt-[2rem]">
            <div className="bord_grad w-fit text-[2.1rem]">
              <span className="block px-[2.5rem] py-[0.4rem] buttonnft font-['Inconsolata']">
                Update Profile
              </span>
            </div>
          </div>

          <div className="flex space-x-[4rem] my-[2rem] ">
            <div className="shadow inline-block p-[3rem] w-[190px]">
              <h2 className="text-[2.1rem] font-['Inconsolata'] text-center text-[#7D7C7CCF] font-medium">
                Volume
              </h2>
              <p className="text-[2rem] font-['Inconsolata'] font-bold text-center">
                1234.22 USD
              </p>
              <h4 className="text-[1.8rem] font-['Inconsolata'] text-center text-[#7D7C7CCF] font-medium">
                Total
              </h4>
            </div>

            <div className="shadow inline-block p-[3rem] w-[190px]">
              <h2 className="text-[2.1rem] font-['Inconsolata'] text-center text-[#7D7C7CCF] font-medium">
                Floor Price
              </h2>
              <p className="text-[2rem] text-center font-['Inconsolata'] font-bold">
                1234.22 USD
              </p>
              <h4 className="text-[1.8rem] font-['Inconsolata'] text-center text-[#7D7C7CCF] font-medium">
                Total
              </h4>
            </div>

            <div className="shadow inline-block p-[3rem] w-[190px]">
              <h2 className="text-[2.1rem] font-['Inconsolata'] text-center text-[#7D7C7CCF] font-medium">
                Items
              </h2>
              <p className="text-[2rem] font-['Inconsolata'] font-bold text-center">
                1234
              </p>
              <h4 className="text-[1.8rem] font-['Inconsolata'] text-center text-[#7D7C7CCF] font-medium">
                Total
              </h4>
            </div>

            <div className="shadow inline-block p-[3rem] w-[190px]">
              <h2 className="text-[2.1rem] font-['Inconsolata'] text-center text-[#7D7C7CCF] font-medium">
                For Selling
              </h2>
              <p className="text-[2rem] font-['Inconsolata'] font-bold text-center">
                300
              </p>
              <h4 className="text-[1.8rem] font-['Inconsolata'] text-center text-[#7D7C7CCF] font-medium">
                Total
              </h4>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-between items-center mt-[0.5rem] flex-wrap">
            <div className="nft text-[2.7rem] sm:text-[3rem] md:text-[3.7rem] w-fit font-['DynaPuff'] mt-[0.5rem]">
              All NFTs
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

          <Filter showItems={showItems}></Filter>

          <div className="flex items-center mt-[1rem] space-x-[1.5rem]">
            <div className="input_bord_grad w-[100%] md:w-[60%] lg:w-[60%] xl:w-[60%] ">
              <input
                type="text"
                className="outline-none text-[1.6rem] md:text-[1.7rem] border-none w-[100%] rounded-[1.2rem] p-[0.8rem] px-[1.3rem] font-['Inconsolata']"
                placeholder="Search NFT By Name...."
              />
            </div>
            <button className="bg-blue-500 inline-block hover:bg-blue-700  text-white font-normal text-[1.8rem] sm:font-semibold py-2 px-12  sm:py-3 sm:px-14 rounded-full font-['Inconsolata'] tracking-wider">
              <a>Search</a>
            </button>
          </div>
        </div>

        <div>
          <div className="pl-[1.2rem]">
            <span className="colgrad text-[1.6rem] font-semibold text-center sm:text-left mt-[1.2rem] mx-[2.8rem] md:mx-[4.3rem] block font-['Inconsolata'] ">
              (Click on any NFT to see his full detail and buying option)
            </span>

            <div className="flex flex-wrap jt mx-[4rem] mg">
              {temp.map((value, index) => {
                return (
                  <IndividualNFT
                    key={index}
                    index={index}
                    nftname={value.nftname}
                    owner={value.owner}
                    creator={value.creator}
                    price={value.price}
                    creationdate={value.creationdate}
                    nfttext={value.nfttext}
                  ></IndividualNFT>
                );
              })}
            </div>
          </div>

          <Pagination></Pagination>
        </div>

        <Footer></Footer>

      </div>
      )}
    </>
  );
};

export default Profile;
