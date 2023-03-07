import { toast } from "react-toastify";
import { addAddress } from "../slice/metamask";
import { addUser } from "../slice/user";
import axios from "../utils/axiosconfiguration";
import {ethers} from "ethers";

function openMetamask(){
  const a = document.createElement("a");
  a.href = "https://metamask.app.link/dapp/textnft.vercel.app";
  a.target = "_self";
  document.body.appendChild(a);
  a.click();
  a.remove();  
}

export const connectWalletLogin = async (user,dispatch, address,router,setShowLogin) => {
  console.log("🚀 ~ file: login.js ~ line 17 ~ connectWalletLogin ~ address", address)
  try {
    
    if (!window?.ethereum || !window?.ethereum?.isMetaMask)
    {


      if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){

        const a = document.createElement("a");
        a.href = "dapp://textnft.vercel.app";
        a.target = "_self";
        document.body.appendChild(a);
        a.click();
        a.remove();

        toast.info("Connecting Metamask...", {
          position: "top-center",
        });

        setTimeout(openMetamask,3000);
        // window.open("https://metamask.app.link/dapp/https://textnft.vercel.app");
      return;  
      } 

      
  window.open("https://metamask.app.link/dapp/https://textnft.vercel.app"); 
    return toast.error("Please install MetaMask or if you just install metamask then refresh the page", {
      position: "top-center",
    });
  }

    if (window.ethereum.chainId != process.env.chainId) {
      toast.error("Please connect to binance smart chain", {
        position: "top-center",
      });
      return;
    }
  



    const accountsFirst = await ethereum.request({
      method: "eth_requestAccounts",
    });




    if(accountsFirst.length > 0 && address==undefined)
    {
      let checkSumAddress=ethers.utils.getAddress(accountsFirst[0])
      dispatch(addAddress(checkSumAddress));
    }

    

    let checkSumAddress = ethers.utils.getAddress(accountsFirst[0]);
    console.log("before",user)

    if(user?.address === checkSumAddress)
    {
      return;
    }



    try {
      setShowLogin(true);
      const response = await axios.get(`/nonce/${accountsFirst[0]}`);

      if (response?.data?.message == "success") {

        let signature;
        let SignerAddress;
        try{
          toast.success("Check metamask for signing message", {
            position: "top-center",
          })
      const provider=new ethers.providers.Web3Provider(window.ethereum);
      const signer=provider.getSigner();
       signature=await signer.signMessage(response.data.nonce);
       SignerAddress=await signer.getAddress();
        }
        catch(error)
        {  setShowLogin(false);
          toast.error("User reject sign message request", {
            position: "top-center",
          });
          return;
        }

       const result=await  axios.post("/login",{
        signature: signature,
        address: SignerAddress
       })

       const data=result?.data;
     if (data?.message == "success") {


      dispatch(addUser(data?.user));
      setShowLogin(false);
      console.log("🚀 ~ file: login.js ~ line 57 ~ connectWalletLogin ~ response?.data?.user", response?.data?.user)

      }

      }
    } catch (error) {

      setShowLogin(false);
    console.log("🚀 ~ file: login.js ~ line 103 ~ connectWalletLogin ~ error", error)

        if (error?.response?.data == undefined) {
            toast.error("Server Error Please Try Later", {
              position: "top-center",
            });
          } else {

            console.log("checking value ",error?.response?.data?.message);

             if(error?.response?.data?.message === "Email not verified") {
               router.push("/emailVerification");
               return;
             }
            
             toast.error(error?.response?.data.message, {
              position: "top-center",
            });
          
          }
    }


  } catch (error) {
    setShowLogin(false);
    toast.error(error.message, {
      position: "top-center",
    });
  }
};
