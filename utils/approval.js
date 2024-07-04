import { ethers } from "ethers";
import { toast } from "react-toastify";
import axios from "../utils/axiosconfigurationServerSide";

const approveNFT = async (tokenId, setShowModal, setLoader) => {
    try {
        const provider = new ethers.providers.Web3Provider(window?.ethereum);
        const signer = provider.getSigner();

        const Abi = [
            // Approve the marketplace
            "function approveMarketplace(uint tokenId) public",
            // Event
            "event ApprovalMarketplace(uint indexed tokenId)"
        ];

        const nftContract = new ethers.Contract(process.env.Address, Abi, signer);

        toast.success("Please check your metamask", {
            position: "top-center",
        });

        setShowModal(false);
        setLoader("transaction waiting");

        const res = await nftContract.approveMarketplace(tokenId);
        let tx = await res.wait(); // Wait for the transaction to be mined

        // Parse the event log
        let abi = ["event ApprovalMarketplace(uint indexed tokenId)"];
        let iface = new ethers.utils.Interface(abi);

        // Find the correct log entry that corresponds to the ApprovalMarketplace event
        let log = tx.logs.find(log => log.topics[0] === iface.getEventTopic("ApprovalMarketplace"));
        if (log) {
            let parsedLog = iface.parseLog(log);
            const { tokenId: approvedTokenId } = parsedLog?.args;

            setLoader("Transaction confirmation");

            // Send event data to the backend
            await axios.post('/updateApprovalMarketplaceEvent', {
                tokenId: approvedTokenId.toString()
            });
        } else {
            throw new Error("ApprovalMarketplace event not found in transaction logs");
        }

    } catch (err) {
        setLoader(false);

        if (err.message.startsWith("user rejected")) {
            toast.error("User reject sign message request", {
                position: "top-center",
            });
        } else {
            toast.error(err.message, {
                position: "top-center",
            });
        }
    }
}
export default approveNFT;
