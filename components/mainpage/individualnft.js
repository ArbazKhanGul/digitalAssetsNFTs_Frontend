const IndividualNFT=({nftname,nfttext,owner,creator,creationdate,price,index})=>{
    
    return (

    <div className={"bord_grad nftwdith mt-[2.5rem] lg:mt-[3rem] transition-all duration-500 hover:-translate-y-2 "+(index==8?"hid":"")}>
        <div className="text_color h-fit w-fit text-[2.2rem] text-center px-[2rem] py-[1.7rem] bord-bottom">
             {nfttext}
        </div>
        <div className="px-[2rem] pb-[1.5rem] pt-[0.8rem] flex flex-col bg-[#F2F2F278]">
           <div className="colgrad text-[2.1rem] text-center">
            {nftname}
           </div>
<div className="flex justify-between space-x-[1.5rem]">
        <div className="flex flex-col">
            <span className="colgrad text-[1.7rem]">Creator </span>
            <span className="colgrad text-[1.7rem]">Owner </span>
            <span className="colgrad text-[1.7rem] whitespace-nowrap">Create </span>
            <span className="colgrad text-[1.7rem]">Price </span>
        </div>            

    <div className="flex flex-col space-y-[0.3rem] overflow-hidden">
            <span className="text-[#7D7C7CCF] text-[1.5rem] w-[100%] overflow-hidden text-ellipsis">{creator}</span>
            <span className="text-[#7D7C7CCF] text-[1.5rem] w-[100%] overflow-hidden text-ellipsis">{owner}</span>
            <span className="text-[#7D7C7CCF] text-[1.5rem]">{creationdate}</span>
            <span className="text-[#7D7C7CCF] text-[1.5rem]">{price}</span>
            <span className="colgrad text-[1.5rem] ">
            = $ 1
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

export default IndividualNFT;