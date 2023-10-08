import { ethers } from "ethers";
import { toast } from "react-toastify";
import { create } from 'ipfs-http-client'
import axios from "./axiosconfiguration";
import { nftTokenCreate } from "./nftCreate";

const ipfsUpload = async (data, user, setLoader, setPath,fee,hash) => {

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

        let contentURL;
        let result_content;

        //if content type is text
        let creationDate=new Date();
        let lang="";

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
            lang = data?.nftLanguage;

            result_content = JSON.stringify({
                name: data.nftName, description: data.nftDescription, language: lang, content: contentURL.path, creationDate: creationDate, creatorEmail: user.email, creatorAddress: user.address, title: title, type: "text"
            });
        }



        //if content type is Video       
        if (data.nftContentType == "video") {
            contentURL = await client.add(data.nftVideo, {
                progress: (bytes) => {
                    const percent = Math.floor(bytes / data.nftVideo?.size * 100);
                    setLoader(`Uploading nft content  ${percent}%`);
                },
            })
           
            result_content = JSON.stringify({
                name: data.nftName, description: data.nftDescription, content: contentURL.path, creationDate: creationDate, creatorEmail: user.email, creatorAddress: user.address, type: "video"
            });
        }

        //if content type is audio       
        if (data.nftContentType == "audio") {
            contentURL = await client.add(data.nftAudio, {
                progress: (bytes) => {
                    const percent = Math.floor(bytes / data.nftAudio?.size * 100);
                    setLoader(`Uploading nft content  ${percent}%`);
                },
            })
          
            result_content = JSON.stringify({
                name: data.nftName, description: data.nftDescription, content: contentURL.path, creationDate: creationDate, creatorEmail: user.email, creatorAddress: user.address, type: "audio"
            });
        }

        //if content type is image       
        if (data.nftContentType == "image") {
            contentURL = await client.add(data.nftImage, {
                progress: (bytes) => {
                    const percent = Math.floor(bytes / data.nftImage?.size * 100);
                    setLoader(`Uploading nft content  ${percent}%`);
                },
            })
            result_content = JSON.stringify({
                name: data.nftName, description: data.nftDescription, content: contentURL.path, creationDate: creationDate, creatorEmail: user.email, creatorAddress: user.address, type: "image",original:true
            });
        }


        //uploading metadata
        setLoader("Uploading nft content metadata...")


        let metadataURL = await client.add(result_content,)

        const back_res = await axios.post("/nftcreation", {
            nftName: data?.nftName, contentURL: contentURL.path,
            metadataURL: metadataURL.path,
            contentType: data.nftContentType,
            creationDate,
            language:lang,
            hash
        });


        setLoader("Waiting for transaction confirmation and mined transaction...");
        await nftTokenCreate(fee, metadataURL.path, setLoader, setPath);
    }

    catch (err) {
        setLoader(false);
        toast.error("Error occurred in uploading nft data  please try later", {
            position: "top-center",
        });
    }
}
export default ipfsUpload;
