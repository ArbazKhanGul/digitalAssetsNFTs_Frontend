import { ethers } from "ethers";
import { toast } from "react-toastify";
import axios from "../utils/axiosconfigurationServerSide";

const buyNft = async (itemId, price, setShowModal, setLoader) => {
    try {
        const provider = new ethers.providers.Web3Provider(window?.ethereum);
        const signer = provider.getSigner();

        const Abi = [
            // Create market sale
            "function createMarketSale(uint256 itemId) public payable",
            // Event
            "event MarketItemSold(uint256 indexed tokenId, address seller, address creator, address copyowner, address owner, uint256 creatorProfit, uint256 sellerProfit, uint256 copyOwnerProfit, uint256 sellingPrice)"
        ];

        const marketContract = new ethers.Contract(process.env.marketAddress, Abi, signer);

        toast.success("Please check your metamask", {
            position: "top-center",
        });

        setShowModal(false);
        setLoader("transaction waiting");

        const res = await marketContract.createMarketSale(itemId, { value: price.toString() });

        let tx = await res.wait(); // Wait for the transaction to be mined

        setLoader("transaction confirmation");

        // Parse the event log
        let abi = ["event MarketItemSold(uint256 indexed tokenId, address seller, address creator, address copyowner, address owner, uint256 creatorProfit, uint256 sellerProfit, uint256 copyOwnerProfit, uint256 sellingPrice)"];
        let iface = new ethers.utils.Interface(abi);

        // Find the correct log entry that corresponds to the MarketItemSold event
        let log = tx.logs.find(log => log.topics[0] === iface.getEventTopic("MarketItemSold"));
        if (log) {
            let parsedLog = iface.parseLog(log);
            const { tokenId, seller, creator, copyowner, owner, creatorProfit, sellerProfit, copyOwnerProfit, sellingPrice } = parsedLog?.args;

            // Send event data to the backend
            await axios.post('/updateMarketItemSoldEvent', {
                tokenId: tokenId.toString(),
                seller,
                creator,
                copyowner,
                owner,
                creatorProfit: creatorProfit.toString(),
                sellerProfit: sellerProfit.toString(),
                copyOwnerProfit: copyOwnerProfit.toString(),
                sellingPrice: sellingPrice.toString()
            });
        } else {
            throw new Error("MarketItemSold event not found in transaction logs");
        }

    } catch (err) {
        setLoader(false);

        if (err.message.startsWith("user rejected")) {
            toast.error("User rejected sign message request", {
                position: "top-center",
            });
        } else {
            toast.error(err.message, {
                position: "top-center",
            });
        }
    }
}
export default buyNft;
