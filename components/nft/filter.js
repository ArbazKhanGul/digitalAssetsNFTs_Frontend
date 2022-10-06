import {memo} from "react";
const Filter=({showItems})=>{
    return (<div className={"bg-[#EDF2F7] rounded-[1.1rem] mt-[0.4rem]  overflow-hidden transition-all duration-700 "+(!showItems ? "max-h-0":"max-h-[60rem]")}>
        <div className="transition-all duration-500 text-[#FD2121DB] text-center text-[1.3rem] md:text-[1.5rem] pt-[1rem] px-[1rem] font-['Inconsolata']">If you don’t want to use any filter from below simply leave it empty</div>
    <div className="flex flex-wrap md:space-x-[1.5rem]  lg:mr-[0.6rem] xl:mr-[0rem] md:justify-center lg:justify-between xl:justify-start lg:space-x-[1rem] xl:space-x-[1.8rem] px-[1.5rem] md:px-[1rem] pb-[1.5rem]">
         <div className="input_bord_grad w-[100%] md:w-[31rem] lg:w-[30rem] xl:w-[27rem] md:ml-[1.5rem] lg:ml-[1rem] xl:ml-[1.8rem] mt-[1.5rem]">
            <input type="text" className="outline-none text-[1.6rem] md:text-[1.7rem] border-none w-[100%] rounded-[1.2rem] p-[0.8rem] font-['Inconsolata']" placeholder="Enter NFT Name"/>
         </div>
         <div className="input_bord_grad w-[100%] md:w-[31rem] lg:w-[30rem] xl:w-[27rem] mt-[1.5rem]">
            <input type="text" className="outline-none text-[1.6rem] md:text-[1.7rem] border-none w-[100%] rounded-[1.2rem] p-[0.8rem] font-['Inconsolata']" placeholder="Enter owner email address"/>
         </div>
   <div className="input_bord_grad w-[100%] md:w-[31rem] lg:w-[30rem] xl:w-[27rem] mt-[1.5rem]">
            <input type="text" className="outline-none text-[1.6rem] md:text-[1.7rem] border-none w-[100%] rounded-[1.2rem] p-[0.8rem] font-['Inconsolata']" placeholder="Enter creator email address"/>
         </div>
         <div className="input_bord_grad w-[100%] md:w-[31rem] lg:w-[30rem] xl:w-[27rem] mt-[1.5rem]">
            <input type="text" className="outline-none text-[1.6rem] md:text-[1.7rem] border-none w-[100%] rounded-[1.2rem] p-[0.8rem] font-['Inconsolata']" placeholder="Enter owner wallet address"/>
         </div>
         <div className="input_bord_grad w-[100%] md:w-[31rem] lg:w-[30rem] xl:w-[27rem] mt-[1.5rem]">
            <input type="text" className="outline-none text-[1.6rem] md:text-[1.7rem] border-none w-[100%] rounded-[1.2rem] p-[0.8rem] font-['Inconsolata']" placeholder="Enter creator wallet address"/>
         </div>
         <div className="input_bord_grad w-[100%] md:w-[31rem] lg:w-[30rem] xl:w-[27rem] mt-[1.5rem]">
            <input type="text" className="outline-none text-[1.6rem] md:text-[1.7rem] border-none w-[100%] rounded-[1.2rem] p-[0.8rem] font-['Inconsolata']" placeholder="Enter lowest price in BNB"/>
         </div>
         <div className="input_bord_grad w-[100%] md:w-[31rem] lg:w-[30rem] xl:w-[27rem] mt-[1.5rem]">
            <input type="text" className="outline-none text-[1.6rem] md:text-[1.7rem] border-none w-[100%] rounded-[1.2rem] p-[0.8rem] font-['Inconsolata']" placeholder="Enter highest price in BNB"/>
         </div>
    </div>
<div className="flex justify-center mb-[1.2rem]">
    <button className="bg-blue-500  hover:bg-blue-700  text-white font-normal text-[18px] font-['Inconsolata'] sm:font-semibold  px-12  py-[0.7rem] sm:px-14 rounded-full">
  Search
</button>
</div>
    </div>)
}

export default memo(Filter);