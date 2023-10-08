import {memo} from "react";
const Filter=({showItems,nftType,setNftType})=>{

    return (<div className={"filterbg rounded-[1.1rem] mt-[0.4rem]  overflow-hidden transition-all duration-700 "+(!showItems ? "max-h-0":"max-h-[60rem]")}>
    <div className="flex flex-wrap md:space-x-[1.5rem] justify-center px-[1.5rem] md:px-[2rem] pb-[3rem]  ">
    <div onClick={()=>{if(nftType!=="Owned"){setNftType("Owned")}}} className=" cursor-pointer w-fit text-white text-[1.9rem] sm:text-[2.1rem] mt-[2.5rem] mr-[2rem] ml-[2rem]"><span className={`block px-[2.5rem] py-[0.4rem]  font-['Inconsolata'] ${nftType=="Owned"?" bg-blue-500 text-white rounded-[2rem]":""}` }>Owned Nfts</span></div>
    <div onClick={()=>{if(nftType!=="Created"){setNftType("Created")}}} className="border-blue-500  text-white cursor-pointer w-fit text-[1.9rem] sm:text-[2.1rem] mt-[2.5rem] mr-[2rem] ml-[2rem]"><span className={`block px-[2.5rem] py-[0.4rem]  font-['Inconsolata'] ${nftType=="Created"?" bg-blue-500 text-white rounded-[2rem]":""}`}>Created Nfts</span></div>
    <div onClick={()=>{if(nftType!=="both"){setNftType("both")}}} className="cursor-pointer w-fit text-white text-[1.9rem] sm:text-[2.1rem] mt-[2.5rem] mr-[2rem] ml-[2rem]"><span className={`block px-[2.5rem] py-[0.4rem]  font-['Inconsolata']  whitespace-nowrap overflow-hidden text-ellipsis border-blue-500 ${nftType=="both"?" bg-blue-500 text-white rounded-[2rem]":""}`}>Owned + Created Nfts</span></div>
    </div>

    </div>)
}

export default memo(Filter);