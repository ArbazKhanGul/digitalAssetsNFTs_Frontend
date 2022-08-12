import {MdFilterList} from "react-icons/md"
import Navbar  from '../components/navbar'
import Filter from "../components/nft/filter";
const NFT =()=>{
    return (<>
    
    <Navbar></Navbar>
    <div className="px-[2rem] sm:px-[4rem] md:px-[5.9rem]">
    <div className="flex flex-col sm:flex-row justify-between items-center mt-[0.5rem] flex-wrap">
        <div className="nft text-[2.7rem] sm:text-[3rem] md:text-[3.5rem] w-fit font-semibold mt-[0.3rem]">All Selling NFTs</div>
        <div className="text-[1.6rem] sm:text-[1.8rem] md:text-[2rem] mt-[0.3rem] font-semibold text-[#353846C7] flex items-center">Search NFTs By filters <MdFilterList className="text-[2.5rem] pl-[0.3rem]"></MdFilterList>
        </div>
    </div>
    <Filter></Filter>
    </div>
    </>)
}

export default NFT;