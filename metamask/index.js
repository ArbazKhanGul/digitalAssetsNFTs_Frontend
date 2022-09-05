import { toast } from "react-toastify";
import { addAddress } from '../slice/metamask'
import {ethers} from "ethers";

function openMetamask(){
  window.open("https://metamask.app.link/dapp/textnft.vercel.app");  
}

export const connectWallet = async (dispatch,address) => {

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

          setTimeout(openMetamask,5000);
          // window.open("https://metamask.app.link/dapp/https://textnft.vercel.app");
        return;  
        } 

        // if(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)){
          // window.open("https://metamask.app.link/dapp/https://textnft.vercel.app");
        // return;  
        // } 
      return toast.error("Please install MetaMask.", {
        position: "top-center",
      });
    }

        const accountsFirst = await ethereum?.request({
          method: "eth_requestAccounts",
        });


      if(accountsFirst.length > 0 && address==undefined)
        {
 
          let checkSumAddress=ethers.utils.getAddress(accountsFirst[0])
          dispatch(addAddress(checkSumAddress));

        toast.success("Account Connected", {
            position: "top-center",
          });
        }


        // window.ethereum.on('accountsChanged', function (accounts) {
        //   dispatch(addAddress(accounts[0]));
        // })

    } catch (error) {
      console.log(error);
      toast.error(error.message, {
        position: "top-center",
      });
    }
  };