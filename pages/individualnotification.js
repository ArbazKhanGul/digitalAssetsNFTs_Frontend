import Navbar from "../components/navbar"
import Notification from "../components/notification";

function Individualnotification() {

  return (


    <div>

    <Navbar></Navbar>
    <div className="px-[5rem] flex">
        <div className="grow pt-[2rem] pb-[1.5rem] mr-[2rem] border-b-[1px] border-[#b3bcbd] h-fit">
            <div className="text-[#95a5a6] font-['Inconsolata'] text-[2rem]">
                12/15/2022, 8:29:45 AM
            </div>
            <h2 className="text-[#0f1111] font-['Inconsolata'] text-[3rem] font-medium">Profit transfer </h2>
            <div>
              <h2 className="text-[#9da9aa] font-medium font-['Inconsolata'] text-[2.2rem] mb-[1rem]">Hey jersey</h2>
              <p className="text-[#95a5a6] font-['Inconsolata'] text-[2rem] mb-[1rem] text-justify">Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatibus, alias? Dolorum est 
                inventore esse nemo nostrum nam molestias sint ex!
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                 Eveniet in necessitatibus quaerat odio voluptate, blanditiis repellendus! Est natus cupiditate voluptas.
                </p>
            <h2 className="text-[#9da9aa] font-medium font-['Inconsolata'] text-[2.2rem]">Regards</h2>
            <h2 className="text-[#9da9aa] font-medium font-['Inconsolata'] text-[2.2rem]">Jessica</h2>
            </div>
            <div className="flex justify-end mt-[1rem]">
            <button className="mt-[2rem] sm:mt-[0rem] bg-blue-500 w-fit inline-block hover:bg-blue-700  text-white font-normal text-[1.8rem] sm:font-semibold py-2 px-12  sm:py-3 sm:px-14 rounded-full font-['Inconsolata'] tracking-wider">
                <a>Delete</a>
              </button>
            </div>
        </div>
        <div className="w-[40rem]">

        <div id="scrollableDiv" className={`font-['Inconsolata'] w-[39rem] bg-[#FFFFFF] rounded-[1rem] right-[3rem] top-[6.4rem] px-[1.5rem] overflow-y-auto  box-border transition-all duration-500  scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-[#FFF] scrollbar-thumb-rounded-xl scrollbar-track-rounded-full hp`}>
        <Notification />
        </div>

        </div>
    </div>
    </div>
  )
}

export default Individualnotification