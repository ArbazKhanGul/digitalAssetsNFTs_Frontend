import {memo} from "react";

const IndividualNFT=({nftname,nfttext,owner,creator,creationdate,price,index})=>{
    return (

    <div className={"bord_grad nftwdith mt-[2.5rem] lg:mt-[3rem] transition-all duration-500 hover:-translate-y-2 "+(index==8?"hid":"")}>
        <div className="text_color h-[130px]  text-[2.3rem] text-center px-[2rem] py-[1.7rem] font-semibold bord-bottom font-['Inconsolata']">
             {nfttext}
        </div>
        <div className="px-[2rem] pb-[1.5rem] pt-[0.8rem] flex flex-col bg-[#F2F2F278] nft_round">
           <div className="colgrad text-[2rem] text-center font-semibold tracking-widest overflow-hidden text-ellipsis whitespace-nowrap">
            {nftname}
           </div>
<div className="flex justify-between space-x-[1.5rem]">
        <div className="flex flex-col">
            <span className="colgrad text-[1.7rem] font-['Inconsolata'] font-semibold">Creator </span>
            <span className="colgrad text-[1.7rem] font-['Inconsolata'] font-semibold">Owner </span>
            <span className="colgrad text-[1.7rem] whitespace-nowrap font-['Inconsolata'] font-semibold">Create </span>
            <span className="colgrad text-[1.7rem] font-['Inconsolata'] font-semibold">Price </span>
        </div>            

    <div className="flex flex-col space-y-[0.3rem] overflow-hidden">
            <span className="text-[#615f5fcf] text-[1.6rem] w-[100%] font-['Inconsolata'] font-medium overflow-hidden text-ellipsis">{creator}</span>
            <span className="text-[#7D7C7CCF] text-[1.6rem] w-[100%] font-['Inconsolata'] font-medium overflow-hidden text-ellipsis">{owner}</span>
            <span className="text-[#7D7C7CCF] text-[1.6rem] w-[100%] font-['Inconsolata'] font-medium overflow-hidden text-ellipsis whitespace-nowrap">{creationdate}</span>
            <span className="text-[#7D7C7CCF] text-[1.6rem] w-[100%] font-['Inconsolata'] font-medium overflow-hidden text-ellipsis whitespace-nowrap">{price} BNB</span>
            <span className="text-[#7D7C7CCF] text-[1.6rem] font-['Inconsolata'] font-medium">
            = $1
           </span>
        </div>

        </div>
           {/* </div> */}

           {/* <div className="flex justify-between"> */}
           {/* </div> */}

           {/* <div className="flex justify-between"> */}
           {/* </div> */}
           

           {/* <div className="flex justify-between"> */}
           {/* </div> */}

           
        </div>
    </div>
    )
}

export default memo(IndividualNFT);