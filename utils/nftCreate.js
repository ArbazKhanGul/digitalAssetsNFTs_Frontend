import { ethers } from "ethers";
import { toast } from "react-toastify";

export async function nftTokenCreate(price,ipfspath, setLoader,setPath) {
console.log("🚀 ~ file: nftCreate.js:5 ~ nftTokenCreate ~ ipfspath:", ipfspath)


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
    
    toast.success("Please check your metamask", {
        position: "top-center",
      });
    
      let tokenipfs=`${process.env.ipfsURL}${ipfspath}`;

    const res = await nftContract.createToken(tokenipfs,options);
    let tx = await res.wait() // it return when transaction is mined

     let abi = [ "event Creation(address indexed owner_address,uint indexed tokenId,string tokenURI)" ];
     let iface = new ethers.utils.Interface(abi);
     console.log("🚀 ~ file: nftCreate.js:42 ~ nftTokenCreate ~ iface:", iface)
     let log = iface.parseLog(tx?.logs[2]);
     console.log("🚀 ~ file: nftCreate.js:43 ~ nftTokenCreate ~ log:", log)
     const {owner_address,tokenId ,tokenURI} = log?.args;

     console.log("🚀 ~ file: nftCreate.js:36 ~ nftTokenCreate ~ tokenId", tokenId)

     if(tokenURI==tokenipfs){
        setPath(ipfspath);
        setLoader("Token transaction verification...")
     }
     else{
        throw new Error("Something went wrong in sending transaction")
     }

    }
    catch (err) {
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