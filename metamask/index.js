import { toast } from "react-toastify";
import { addAddress } from '../slice/metamask'
import {ethers} from "ethers";

function openMetamask(){
  const a = document.createElement("a");
  a.href = "https://metamask.app.link/dapp/textnft.vercel.app";
  a.target = "_self";
  document.body.appendChild(a);
  a.click();
  a.remove();  
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

          setTimeout(openMetamask,3000);
          // window.open("https://metamask.app.link/dapp/https://textnft.vercel.app");
        return;  
        } 


    window.open("https://metamask.app.link/dapp/https://textnft.vercel.app");
      return toast.error("Please install MetaMask or if you just install metamask then refresh the page", {
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


    } catch (error) {
      console.log(error);
      toast.error(error.message, {
        position: "top-center",
      });
    }
  };