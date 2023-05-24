import { ethers } from "ethers";
import { toast } from "react-toastify";
import { create } from 'ipfs-http-client'
import axios from "axios";
import api from "./axiosconfiguration";
import { nftTokenCreate } from "./nftCreate";

const ipfsUpload = async (id,tokenId, setLoader, setPath) => {
console.log("🚀 ~ file: copyIPFSsameContent.js:9 ~ ipfsUpload ~ tokenId:", tokenId)
console.log("🚀 ~ file: copyIPFSsameContent.js:8 ~ ipfsUpload ~ id:", id)


    try {
        const projectId = process.env.PROJECT_KEY_INFLURA;
        const projectSecret = process.env.INFLURA_KEY;
        // let size;

        const auth =
            'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');

        const client = create({
            host: 'ipfs.infura.io',
            port: 5001,
            protocol: 'https',
            headers: {
                authorization: auth,
            },
        });



        let ipfsdata = await axios.get(`${process.env.ipfsURL}${id}`, {
            headers: {
                'Access-Control-Allow-Credentials': true,
            }
        }
        );

        ipfsdata=ipfsdata?.data;

        if(!ipfsdata){
            throw new Error("Data not found");
        }

        const nonce=await api.get(`/copynonce/${id}`);
        let creationDate=new Date();
        ipfsdata.creationDate=creationDate;
        ipfsdata.original=false;
        ipfsdata.nonce=nonce.data.nonce;


      let  result_content = JSON.stringify(ipfsdata);
        console.log("🚀 ~ file: copyIPFSsameContent.js:51 ~ ipfsUpload ~ result_content:", result_content)

   
    let metadataURL = await client.add(result_content)
        
    const back_res = await api.post("/copycreation", {
            nftName: ipfsdata?.name,
            contentURL: ipfsdata?.content,
            metadataURL: metadataURL.path,
            contentType: ipfsdata?.type,
            creationDate,
            creatorEmail:ipfsdata?.creatorEmail,
            creatorAddress:ipfsdata?.creatorAddress,
            tokenId,
            originalTokenURI:id
        });
    console.log("🚀 ~ file: copyIPFSsameContent.js:67 ~ ipfsUpload ~ back_res:", back_res)
        // let op = ethers.utils.formatUnits(back_res.data.price, "ether");

        setLoader("Waiting for transaction confirmation and mined transaction...");
   await nftTokenCreate(back_res?.data?.price, metadataURL.path, setLoader, setPath, true , tokenId,  back_res?.data?.nonce, back_res?.data?.signature);
    }





    catch (err) {
        // setLoader(false);
        toast.error("Error occurred in uploading nft data  please try later", {
            position: "top-center",
        });
    }
}
export default ipfsUpload;
