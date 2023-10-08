import { ethers } from "ethers";
import { toast } from "react-toastify";

export async function nftTokenCreate(price,ipfspath, setLoader,setPath,copyrightStatus=false,tokenIdCopyrights=0,nonce=0,signature='0x',copyrightPrice=0) {

    try{

        const num1 = ethers.BigNumber.from(price);
        const num2 = ethers.BigNumber.from(copyrightPrice)
        const totalfee=num1.add(num2);

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner()
    // const address = await signer.getAddress()

    const Abi = [
        // Create the token
       "function createToken(string tokenURI,bool copyrightStatus,uint tokenIdCopyrights,uint nonce,uint copyrightPrice,bytes signature) public payable returns(uint)",
        // Get the creator of token
        "function creatorOf(uint tokenId) public view returns(address)",
        //Event
        "event Creation(address indexed owner_address,uint indexed tokenId,string tokenURI,bool copyright,uint copyrightprice,address copyrightOwner);"

    ];


    const nftContract = new ethers.Contract(process.env.Address,Abi,signer);
    //send trasaction through metamask

    var options = {value: totalfee};

    toast.success("Please check your metamask", {
        position: "top-center",
      });

      let tokenipfs=`${process.env.ipfsURL}${ipfspath}`;

    const res = await nftContract.createToken(tokenipfs,copyrightStatus,tokenIdCopyrights,nonce,copyrightPrice,signature,options);
    let tx = await res.wait() // it return when transaction is mined

     let abi = [ "  event Creation(address indexed owner_address,uint indexed tokenId,string tokenURI,bool copyright,uint copyrightprice,address copyrightOwner);" ];
     let iface = new ethers.utils.Interface(abi);
     let log = iface.parseLog(tx?.logs[2]);
     const {owner_address,tokenId ,tokenURI,copyright,copyrightprice,copyrightOwner} = log?.args;

     if(tokenURI==tokenipfs){
        setPath(ipfspath);
        setLoader("Token transaction verification...")
     }
     else{
        throw new Error("Something went wrong in sending transaction")
     }

    }
    catch (err) {
        setLoader(false)
        
            if (err.message.startsWith("user rejected"))
            {
                toast.error("User reject sign message request present", {
                    position: "top-center",
                  });
            }
            else{
        toast.error(err.message, {
            position: "top-center",
          });
        }
    }
}