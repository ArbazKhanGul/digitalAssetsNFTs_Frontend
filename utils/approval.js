import { ethers } from "ethers";
import { toast } from "react-toastify";

const buyNft =async (tokenId,setShowModal,setLoader) => {

    try{
        const provider = new ethers.providers.Web3Provider(window?.ethereum);
        const signer = provider.getSigner()

        const Abi = [
            // Cancel the market item
            "function approveMarketplace(uint tokenId) public",
        ];

        const nftContract = new ethers.Contract(process.env.Address,Abi,signer);

        toast.success("Please check your metamask" , {
            position: "top-center",
          });

          setShowModal(false);
          setLoader("transaction waiting");


        const res = await nftContract.approveMarketplace(tokenId);


        let tx = await res.wait() // it return when transaction is mined


        setLoader("transaction confirmation");



        }
        catch (err) {

            setLoader(false);
                toast.error( err.message , {
                    position: "top-center",
                  });
        }
}
export default buyNft;
