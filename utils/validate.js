import { addUser } from "../slice/user";
import { addAddress } from "../slice/metamask";
import { ethers } from "ethers";
import axios from "./axiosconfiguration";
import { toast } from "react-toastify";
import NProgress from "nprogress"

export default async function load(address, dispatch, router, setLoading,page) {


  const access_token = localStorage.getItem("token");
  const login_address = localStorage.getItem("address");

  if (window?.ethereum) {
    try {
      if (address == undefined) {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner();
        const SignerAddress = await signer.getAddress();
        const chainId = await provider.getNetwork();

        if (chainId.chainId == 56) {
          let checkSumAddress = ethers.utils.getAddress(SignerAddress);
          dispatch(addAddress(checkSumAddress));
          return;
        }
      }
    } catch (error) {
      console.log("🚀 ~ file: index.js ~ line 47 ~ load ~ inside error");
    }
  }

  //check page
  if (page == "main") {
    if (login_address != address || !access_token) {
      dispatch(addUser(undefined));
      setLoading(true);
      NProgress.done();
      return;
    }
  } else {
    if (login_address != address || !access_token) {
      dispatch(addUser(undefined));
      router.push("/");
      return;
    }
  }

  try {
    const response = await axios.get("/profile", {
      headers: {
        Authorization: `${access_token}`,
      },
    });
    console.log("before calling loading");
    dispatch(addUser(response?.data?.user));
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

    if(page != "main") {
      dispatch(addUser(undefined));
      router.push("/");
      return;
    }

  }

  if (page == "main") {
    setLoading(true);
  }
  NProgress.done();
}
