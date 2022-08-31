const Filter=({showItems})=>{
    return (<div className={"bg-[#EDF2F7] rounded-[1.1rem] mt-[0.4rem]  overflow-hidden transition-all duration-700 "+(!showItems ? "max-h-0":"max-h-[60rem]")}>
    <div className="flex flex-wrap md:space-x-[1.5rem] lg:justify-between xl:justify-start lg:space-x-[1rem] xl:space-x-[1.8rem] px-[1.5rem] md:px-[2rem] pb-[3rem] pt-[3rem] ">
    <div className="bord_grad w-fit text-[2.1rem]"><span className="block px-[2.5rem] py-[0.4rem] buttonnft font-['Inconsolata']">Update Profile</span></div>
    <div className="bord_grad w-fit text-[2.1rem]"><span className="block px-[2.5rem] py-[0.4rem] buttonnft font-['Inconsolata']">Update Profile</span></div>
    <div className="bord_grad w-fit text-[2.1rem]"><span className="block px-[2.5rem] py-[0.4rem] buttonnft font-['Inconsolata']">Update Profile</span></div>
    <div className="bord_grad w-fit text-[2.1rem]"><span className="block px-[2.5rem] py-[0.4rem] buttonnft font-['Inconsolata']">Update Profile</span></div>
    </div>

    </div>)
}

export default Filter;