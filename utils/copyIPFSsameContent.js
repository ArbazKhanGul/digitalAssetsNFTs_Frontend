import { ethers } from "ethers";
import { toast } from "react-toastify";
import { create } from 'ipfs-http-client'
import axios from "axios";
import api from "./axiosconfiguration";
import { nftTokenCreate } from "./nftCreate";

const ipfsUpload = async (id,tokenId, setLoader, setPath,user,price) => {


    try {
        const projectId = process.env.PROJECT_KEY_INFLURA;
        const projectSecret = process.env.INFLURA_KEY;


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
        ipfsdata.creatorEmail=user.email;
        ipfsdata.address=user.address;
        ipfsdata.original=false;
        ipfsdata.nonce=nonce.data.nonce;


      let  result_content = JSON.stringify(ipfsdata);

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

        let resultData=back_res?.data;


        setLoader("Waiting for transaction confirmation and mined transaction...");



    await nftTokenCreate(price, metadataURL.path, setLoader, setPath, true , tokenId,  resultData?.nonce, resultData?.signature,resultData?.copyrightPrice);

}

    catch (err) {
        // setLoader(false);
        toast.error("Error occurred in uploading nft data  please try later", {
            position: "top-center",
        });
    }
}
export default ipfsUpload;
