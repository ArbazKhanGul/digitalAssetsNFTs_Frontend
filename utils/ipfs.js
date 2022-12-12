import { create as ipfsHttpClient } from 'ipfs-http-client'
async function Ipfs(reqObject) {
console.log("🚀 ~ file: ipfs.js:3 ~ Ipfs ~ reqObject", reqObject)

    const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0');


    const added = await client.add(reqObject.nftText)
    console.log("🚀 ~ file: ipfs.js:8 ~ Ipfs ~ added", added.path)
    // const url = `https://ipfs.infura.io/ipfs/${added.path}`
    // const data = JSON.stringify({
    //     , description, image: fileUrl
    // });

//   return (
//   )
}

export default Ipfs
