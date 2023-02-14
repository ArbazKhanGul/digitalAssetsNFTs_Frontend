import { ethers } from "ethers";
import { toast } from "react-toastify";

const sell =async (tokenIdArg,priceArg,router,setLoader,setShowModal,setChecker) => {

    try{

        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const signer = provider.getSigner()

        const Abi = [
            // Create the market item
            "function createMarketItem(uint256 tokenId,uint256 price) public ",
        ];

        const marketContract = new ethers.Contract(process.env.marketAddress,Abi,signer);

        toast.success("Please check your metamask" , {
            position: "top-center",
          });
          setChecker("price")
          setShowModal(false);
          setLoader("transaction waiting");


        const res = await marketContract.createMarketItem(tokenIdArg,priceArg);


        let tx = await res.wait() // it return when transaction is mined

        console.log("🚀 ~ file: sell.js:24 ~ sell ~ tx", tx)

        setLoader("transaction confirmation");

        //  let abi = [  "event MarketItemCreated (uint indexed itemId,uint256 indexed tokenId,address seller,address creator,address owner,uint256 price,string status)"];
 
        //  let iface = new ethers.utils.Interface(abi);
        //  let log = iface.parseLog(tx?.logs[1]);
        //  const {itemId,tokenId ,seller,creator,owner,price,status} = log?.args;

        //  router.replace(router.asPath)

        //  console.log("🚀 ~ file: sell.js:27 ~ sell ~ sold", status)
        //  console.log("🚀 ~ file: sell.js:27 ~ sell ~ price", price.toString())
        //  console.log("🚀 ~ file: sell.js:27 ~ sell ~ owner", owner)
        //  console.log("🚀 ~ file: sell.js:27 ~ sell ~ creator", creator)
        //  console.log("🚀 ~ file: sell.js:27 ~ sell ~ seller", seller)
        //  console.log("🚀 ~ file: sell.js:27 ~ sell ~ tokenId", tokenId.toString())
        //  console.log("🚀 ~ file: sell.js:27 ~ sell ~ itemId", itemId.toString())


        }
        catch (err) {
            setLoader(false);

            console.log("printing error",err.message);
            if(err.message.startsWith("Cannot estimate gas"))
            { toast.error( "Cannot estimate gas Please try later" , {
                position: "top-center",
              });
                router.replace(router.asPath)
                //   router.reload(window.location.pathname)
            }
            else{
                toast.error( err.message , {
                    position: "top-center",
                  });
            }
        }
}
export default sell;
