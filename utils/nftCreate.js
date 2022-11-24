import { ethers } from "ethers";

async function nftCreate(textHash) {

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner()
    const address = await signer.getAddress()

    const Abi = [
        // Create the token
        "function createToken(string tokenURI) public returns(uint)",
        // Get the creator of token
        "function creatorOf(uint tokenId) public view returns(address)",
    ];

    const nftContract = new ethers.Contract(process.env.Address, signer);
    //send trasaction through metamask
    var options = { value: 1000 };
    const res = await nftContract.createItem(textHash,options);
    let tx = await res.wait() // it return when transaction is mined
}