import { ethers } from "ethers";
import { toast } from "react-toastify";
import { create } from 'ipfs-http-client'
import api from "./axiosconfiguration";
import { nftTokenCreate } from "./nftCreate";
import axios from "axios";

const ipfsUpload = async (data, id, tokenId, setLoader, setPath) => {

    console.log("NFt text length or origoinal text", data?.nftText);

    try {
        const projectId = process.env.PROJECT_KEY_INFLURA;
        const projectSecret = process.env.INFLURA_KEY;
        let size;

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



        let originalipfsdata = await axios.get(`${process.env.ipfsURL}${id}`, {
            headers: {
                'Access-Control-Allow-Credentials': true,
            }
        }
        );

        originalipfsdata = originalipfsdata?.data;
        console.log("🚀 ~ file: copyIPFSdifferentContent.js:39 ~ ipfsUpload ~ originalipfsdata:", originalipfsdata)

        if (!originalipfsdata) {
            throw new Error("Data not found");
        }


        let contentURL;

        if (data.nftContentType == "text") {
            let title;
            if (data?.nftText.length < 87) {
                title = data?.nftText
            }
            else {
                title = data.nftText.substring(0, 87) + "..."
            }
            let convertText = data.nftTextHTML.replaceAll("<p><br></p>", "<br>")
            contentURL = await client.add(convertText, {
                progress: (bytes) => {
                    console.log("🚀 ~ file: ipfsUpload.js:27 ~ ipfsUpload ~ bytes:", bytes)
                    const percent = Math.floor(bytes / convertText.length * 100);
                    setLoader(`Uploading nft content  ${percent}%`);
                },
            })
            let lang = data?.nftLanguage;
            size = data?.nftText.length;

            originalipfsdata.language = lang;
            originalipfsdata.title = title
        }



        //if content type is Video       
        if (data.nftContentType == "video") {
            contentURL = await client.add(data.nftVideo, {
                progress: (bytes) => {
                    const percent = Math.floor(bytes / data.nftVideo?.size * 100);
                    setLoader(`Uploading nft content  ${percent}%`);
                },
            })
            size = (data.nftVideo?.size / 1024 ** 2).toFixed(2);

        }

        //if content type is audio       
        if (data.nftContentType == "audio") {
            contentURL = await client.add(data.nftAudio, {
                progress: (bytes) => {
                    const percent = Math.floor(bytes / data.nftAudio?.size * 100);
                    setLoader(`Uploading nft content  ${percent}%`);
                },
            })
            size = (data.nftAudio?.size / 1024 ** 2).toFixed(2);

        }

        //if content type is image       
        if (data.nftContentType == "image") {
            contentURL = await client.add(data.nftImage, {
                progress: (bytes) => {
                    const percent = Math.floor(bytes / data.nftImage?.size * 100);
                    setLoader(`Uploading nft content  ${percent}%`);
                },
            })
            size = (data.nftImage?.size / 1024 ** 2).toFixed(2);

        }


        //uploading metadata
        setLoader("Uploading nft content metadata...")

        const nonce=await api.get(`/copynonce/${id}`);

        let creationDate = new Date();
        originalipfsdata.creationDate = creationDate;
        originalipfsdata.original = false;
        originalipfsdata.content = contentURL.path;
        originalipfsdata.description=data.nftDescription;
        originalipfsdata.nonce=nonce.data.nonce;


        let result_content = JSON.stringify(originalipfsdata);


        let metadataURL = await client.add(result_content,)

        const back_res = await api.post("/copycreationdifferent", {
            nftName: originalipfsdata?.name, 
            contentURL: contentURL.path,
            metadataURL: metadataURL.path,
            contentType: originalipfsdata.type,
            creatorEmail:originalipfsdata?.creatorEmail,
            creatorAddress:originalipfsdata?.creatorAddress,
            tokenId,
            originalTokenURI:id,
            size,
            creationDate
        });

        console.log("🚀 ~ file: copyIPFSdifferentContent.js:138 ~ ipfsUpload ~ back_res?.data?.price:", back_res?.data?.price)

        // let op = ethers.utils.formatUnits(back_res.data.price, "ether");
        let resultData=back_res?.data;
        setLoader("Waiting for transaction confirmation and mined transaction...");

        await nftTokenCreate(resultData?.price, metadataURL.path, setLoader, setPath, true , tokenId,  resultData?.nonce, resultData?.signature,resultData?.copyrightPrice,resultData?.copyrightOwner);
    }

    catch (err) {
        setLoader(false);
        toast.error("Error occurred in uploading nft data  please try later", {
            position: "top-center",
        });
        console.log("🚀 ~ file: ipfsUpload.js:37 ~ ipfsUpload ~ err:", err)
    }
}
export default ipfsUpload;
