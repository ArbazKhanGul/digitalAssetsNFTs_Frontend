import { toast } from "react-toastify";
import { addAddress } from "../slice/metamask";
import { addUser } from "../slice/user";
import axios from "../utils/axiosconfiguration";
import {ethers} from "ethers";

export const connectWalletLogin = async (dispatch, address) => {
  try {

    if (!window?.ethereum && !window?.ethereum?.isMetaMask)
      return toast.error("Please install MetaMask.", {
        position: "top-center",
      });

    if (window.ethereum.chainId != 56) {
      return toast.error("Please connect to binance smart chain", {
        position: "top-center",
      });
    }

    const accountsFirst = await ethereum.request({
      method: "eth_requestAccounts",
    });

    if(accountsFirst.length > 0 && address==undefined)
    {
      let checkSumAddress=ethers.utils.getAddress(accountsFirst[0])
      dispatch(addAddress(checkSumAddress));

    }

    try {
      const response = await axios.get(`/nonce/${accountsFirst[0]}`);

      if (response?.data?.message == "success") {

       


      const provider=new ethers.providers.Web3Provider(window.ethereum);
      const signer=provider.getSigner();
      const signature=await signer.signMessage(response.data.nonce);
      const SignerAddress=await signer.getAddress();
     
      const result=await  axios.post("/login",{
        signature: signature,
        address: SignerAddress
       })

       const data=result?.data;
     if (data?.message == "success") {

      localStorage.setItem("token",data?.token);
      localStorage.setItem("address",data.loginAddress);
      
      dispatch(addUser(data?.user));
      console.log("🚀 ~ file: login.js ~ line 57 ~ connectWalletLogin ~ response?.data?.user", response?.data?.user)

        toast.success("Successfully Login", {
       position: "top-center",
       });


      }

      }
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
    }


  } catch (error) {
    console.log("inside Error", error);
    toast.error(error.message, {
      position: "top-center",
    });
  }
};
