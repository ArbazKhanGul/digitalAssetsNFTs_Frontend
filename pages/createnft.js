import Navbar from "../components/navbar"


const Item=()=>{

return (
    <>
    <Navbar></Navbar>

<div className="flex flex-col justify-center items-center">
        <div className="w-6/12">
<div className="color text-[3.5rem] w-fit font-semibold font-['Inter']">
Create New NFT
</div>
</div>


<div className="w-6/12">
    <h2>Enter the NFT name:</h2>
    <input type="text" name="nftname" id="nftname" />
</div>


<div className="w-6/12">
    <h2>Choose the language for text of NFT:</h2>
    <input type="text" name="nftname" id="nftname" />
</div>

<div className="w-6/12">
    <h2>Enter the text of NFT:</h2>

    <input type="text" name="nftname" id="nftname" />
</div>


<div className="w-6/12">
    <h2>Enter the description of NFT:</h2>
    <input type="text" name="nftname" id="nftname" />
</div>
    </div>
    </>
)
}

export default Item;