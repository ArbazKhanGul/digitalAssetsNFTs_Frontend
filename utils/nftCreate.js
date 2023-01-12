import { ethers } from "ethers";
import { toast } from "react-toastify";

export async function nftTokenCreate(price,textHash,router, setLoader,setHash) {
console.log("🚀 ~ file: nftCreate.js ~ line 5 ~ nftTokenCreate ~ textHash", textHash)


    try{
console.log("🚀 ~ file: nftCreate.js ~ line 4 ~ nftTokenCreate ~ price", price)

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner()
    // const address = await signer.getAddress()

    const Abi = [
        // Create the token
        "function createToken(string tokenURI) public payable returns(uint)",
        // Get the creator of token
        "function creatorOf(uint tokenId) public view returns(address)",
        //Event
        "event Creation(address indexed owner_address,string indexed tokenURI,uint indexed tokenId)",
       
    ];

    const nftContract = new ethers.Contract(process.env.Address,Abi,signer);
    //send trasaction through metamask
    var options = {value: price};

    const res = await nftContract.createToken(textHash,options);
    let tx = await res.wait() // it return when transaction is mined

     let abi = [ "event Creation(address indexed owner_address,uint indexed tokenId,string tokenURI)" ];
     let iface = new ethers.utils.Interface(abi);
     let log = iface.parseLog(tx?.logs[2]);
     const {owner_address,tokenId ,tokenURI} = log?.args;
     console.log("🚀 ~ file: nftCreate.js:36 ~ nftTokenCreate ~ tokenId", tokenId)

     if(tokenURI==textHash){
        
        setHash(tokenURI);
        setLoader("Token transaction verification...")
     }
     else{
        throw new Error("Something went wrong in sending transaction")
     }

    }
    catch (err) {
        setLoader(false);
        console.log(err)
        toast.error(err.message, {
            position: "top-center",
          });
    }
}