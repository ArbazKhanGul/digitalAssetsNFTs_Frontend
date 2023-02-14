import {memo} from "react";
const Filter=({showItems,nftType,setNftType})=>{

    return (<div className={"bg-[#EDF2F7] rounded-[1.1rem] mt-[0.4rem]  overflow-hidden transition-all duration-700 "+(!showItems ? "max-h-0":"max-h-[60rem]")}>
    <div className="flex flex-wrap md:space-x-[1.5rem] justify-center px-[1.5rem] md:px-[2rem] pb-[3rem]  ">
    <div onClick={()=>{if(nftType!=="Owned"){setNftType("Owned")}}} className="bord_grad cursor-pointer w-fit text-[1.9rem] sm:text-[2.1rem] mt-[2.5rem] mr-[2rem] ml-[2rem]"><span className={`block px-[2.5rem] py-[0.4rem] buttonnft font-['Inconsolata'] ${nftType=="Owned"?" button_grad":""}`}>Owned Nfts</span></div>
    <div onClick={()=>{if(nftType!=="Created"){setNftType("Created")}}} className="bord_grad cursor-pointer w-fit text-[1.9rem] sm:text-[2.1rem] mt-[2.5rem] mr-[2rem] ml-[2rem]"><span className={`block px-[2.5rem] py-[0.4rem] buttonnft font-['Inconsolata'] ${nftType=="Created"?" button_grad":""}`}>Created Nfts</span></div>
    <div onClick={()=>{if(nftType!=="both"){setNftType("both")}}} className="bord_grad cursor-pointer w-fit  text-[1.9rem] sm:text-[2.1rem] mt-[2.5rem] mr-[2rem] ml-[2rem]"><span className={`block px-[2.5rem] py-[0.4rem] buttonnft font-['Inconsolata']  whitespace-nowrap overflow-hidden text-ellipsis ${nftType=="both"?" button_grad":""}`}>Owned + Created Nfts</span></div>
    </div>

    </div>)
}

export default memo(Filter);