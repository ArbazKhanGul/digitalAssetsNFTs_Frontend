import { ethers } from "ethers";
import { toast } from "react-toastify";
import axios from "../utils/axiosconfigurationServerSide";

const cancelSelling =async (itemId,setShowModal,setLoader) => {
console.log("🚀 ~ file: cancelSelling.js:5 ~ cancelSelling ~ itemId", itemId)

    try{
        const provider = new ethers.providers.Web3Provider(window?.ethereum);
        const signer = provider.getSigner()

        const Abi = [
            // Cancel the market item
            " function cancelMarketItem(uint256 itemId) public",
                 "event MarketItemCancel(uint indexed itemId, string status)"
        ];

        const marketContract = new ethers.Contract(process.env.marketAddress,Abi,signer);

        toast.success("Please check your metamask" , {
            position: "top-center",
          });

          setShowModal(false);
          setLoader("transaction waiting");


        const res = await marketContract.cancelMarketItem(itemId);


        let tx = await res.wait(); // Wait for the transaction to be mined
        console.log("🚀 ~ cancelSelling ~ tx:", tx)

        setLoader("transaction confirmation");

        // Parse the event log
        let abi = ["event MarketItemCancel(uint indexed itemId, string status)"];
        console.log("successffuuluu execute upto this...........................")
        let iface = new ethers.utils.Interface(abi);
     
          // Find the correct log entry that corresponds to the MarketItemCancel event
          let log = tx.logs.find(log => log.topics[0] === iface.getEventTopic("MarketItemCancel"));
          if (log) {
              let parsedLog = iface.parseLog(log);
              const { itemId: cancelledItemId, status } = parsedLog?.args;
  
              // Send event data to the backend
              await axios.post('/updateMarketItemCancelEvent', {
                  itemId: cancelledItemId.toString(),
                  status
              });
          } else {
              throw new Error("MarketItemCancel event not found in transaction logs");
          }

        }
        catch (err) {
        console.log("🚀 ~ cancelSelling ~ err:", err)

            setLoader(false);

            if (err.message.startsWith("user rejected"))
            {
                toast.error("User reject sign message request", {
                    position: "top-center",
                  });
            } 
            else{
        toast.error(err.message, {
            position: "top-center",
          });}

        }
}
export default cancelSelling;
