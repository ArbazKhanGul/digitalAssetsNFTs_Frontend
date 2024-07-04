import { ethers } from "ethers";
import { toast } from "react-toastify";
import axios from "../utils/axiosconfigurationServerSide";

const sell =async (tokenIdArg,priceArg,router,setLoader,setShowModal,setChecker) => {

    try{

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner()

        const Abi = [
            // Create the market item
            "function createMarketItem(uint256 tokenId,uint256 price) public ",
              // Event
              "event MarketItemCreated(uint indexed itemId, uint256 indexed tokenId, address seller, address creator, address owner, uint256 price, string status)"
        ];

        const marketContract = new ethers.Contract(process.env.marketAddress,Abi,signer);

        toast.success("Please check your metamask" , {
            position: "top-center",
          });
          setChecker("price")
          setShowModal(false);
          setLoader("transaction waiting");


          const res = await marketContract.createMarketItem(tokenIdArg, priceArg);

          let tx = await res.wait(); // Wait for the transaction to be mined
  
          console.log("🚀 ~ file: sell.js:24 ~ sell ~ tx", tx);
  
          setLoader("transaction confirmation");
  
          // Parse the event log
          let abi = ["event MarketItemCreated(uint indexed itemId, uint256 indexed tokenId, address seller, address creator, address owner, uint256 price, string status)"];
          let iface = new ethers.utils.Interface(abi);
          let log = iface.parseLog(tx?.logs[1]); // Adjust the log index as needed
          const { itemId, tokenId, seller, creator, owner, price, status } = log?.args;
  
          // Send event data to the backend
          await axios.post('/updateMarketItemCreatedEvent', {
              itemId: itemId.toString(),
              tokenId: tokenId.toString(),
              seller,
              creator,
              owner,
              price: price.toString(),
              status
          });
  
        }
        catch (err) {
            setLoader(false);

            console.log("printing error",err.message);
            if(err.message.startsWith("Cannot estimate gas"))
            { toast.error( "Cannot estimate gas Please try later" , {
                position: "top-center",
              });
                router.replace(router.asPath)
            }
            else if (err.message.startsWith("user rejected"))
            {
                toast.error("User reject sign message request", {
                    position: "top-center",
                  });
            } 
            else{
                toast.error( err.message , {
                    position: "top-center",
                  });
            }
        }
}
export default sell;
