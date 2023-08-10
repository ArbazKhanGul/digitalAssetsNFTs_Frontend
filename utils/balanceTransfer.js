import { ethers } from "ethers";
import { toast } from "react-toastify";

export const nftBalanceTransfer = async (setBalance,setLoader) => {
    try {
        const NftAbi = [
            // Get the creator of token
            "function getFee() public onlyOwner"
        ];
 
        setLoader(true)
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner()

        
        const nftContract = new ethers.Contract(process.env.Address, NftAbi, signer);

        await nftContract.getFee();

        setLoader(false);
        setBalance('0');
        toast.success("Money Transfer successfully", {
            position: "top-center",
          });

    }
    catch (err) {
        setLoader(false)
        if (err.message.startsWith("user rejected"))
        {
            toast.error("User reject sign message request", {
                position: "top-center",
              });
        }
        else{
    toast.error(err.message, {
        position: "top-center",
      });
    }
    }
}


export const marketBalanceTransfer = async (setBalance,setLoader) => {
    try {
        const MarketAbi = [
            // Get the creator of token
            "function transferFee() public onlyOwner"
        ];

        setLoader(true);
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner()

        

        const marketContract = new ethers.Contract(process.env.marketAddress, MarketAbi, signer);

        await marketContract.transferFee();

        toast.success("Money Transfer successfully", {
            position: "top-center",
          });
          setLoader(false);
          setBalance('0');

    }
    catch (err) {
        setLoader(false)
        if (err.message.startsWith("user rejected"))
        {
            toast.error("User reject sign message request", {
                position: "top-center",
              });
        }
        else{
    toast.error(err.message, {
        position: "top-center",
      });
    }
    }
}


