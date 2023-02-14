import Navbar from "../../components/navbar"
import Notification from "../../components/notification/notificationPage";
import getServerSideProps from "../../utils/serverSideNotification"

function IndividualNotification({ userinfo, notificationData }) {
console.log("🚀 ~ file: [id].js:5 ~ IndividualNotification ~ notificationData", notificationData)

let date =new Date(notificationData?.createdAt).toLocaleString();

  return (


    <div>

    <Navbar></Navbar>
    <div className="px-[5rem] flex">
        <div className="grow pt-[2rem] pb-[1.5rem] mr-[2rem] border-b-[1px] border-[#b3bcbd] h-fit">
            <div className="text-[#95a5a6] font-['Inconsolata'] text-[2rem]">
                {date}
            </div>
            <h2 className="text-[#0f1111] font-['Inconsolata'] text-[3rem] font-medium">
            {notificationData?.type=="seller_profit"?"NFT sold":null}
            {notificationData?.type=="creator_profit"?"Profit Transfer":null}
               </h2>
            <div>
              <h2 className="text-[#9da9aa] font-medium font-['Inconsolata'] text-[2.2rem] mb-[1rem]">Hey,</h2>
              <p className="text-[#95a5a6] font-['Inconsolata'] text-[2rem] mb-[1rem] text-justify">
              {notificationData?.type=="creator_profit"?`Your created nft with id ${notificationData?.tokenId} owner has been changed and now the new owner is ${notificationData?.transfer_to}
                             and after selling 10 percent from profit i.e ${notificationData?.price} is successfully transferred to your wallet`:null}

                            {notificationData?.type=="seller_profit"?`Your owned nft with id ${notificationData?.tokenId} that you upload for selling has been sell and ${notificationData?.price} is transferred to your wallet now the new owner is ${notificationData?.transfer_to}
                             and in case you get profit from selling this nft (means you sell at higher price from the price you buy it) then from profit  10 percent creator profit and 10 percent platform charges is deducted from profit but if you don't get any profit  by selling this  then no money is deducted and all money  is successfully transferred to your wallet `:null}
              </p>
            <h2 className="text-[#9da9aa] font-medium font-['Inconsolata'] text-[2.2rem]">Regards</h2>
            <h2 className="text-[#9da9aa] font-medium font-['Inconsolata'] text-[2.2rem]">Golden Words NFTs</h2>
            </div>
            <div className="flex justify-end mt-[1rem]">
            <button className="mt-[2rem] sm:mt-[0rem] bg-blue-500 w-fit inline-block hover:bg-blue-700  text-white font-normal text-[1.8rem] sm:font-semibold py-2 px-12  sm:py-3 sm:px-14 rounded-full font-['Inconsolata'] tracking-wider">
                <a>Delete</a>
              </button>
            </div>
        </div>
        <div className="w-[40rem]">

        <div id="scrollable" className={` font-['Inconsolata'] w-[39rem] bg-[#FFFFFF] rounded-[1rem] right-[3rem] top-[6.4rem] px-[1.5rem] overflow-y-auto h-screen  box-border transition-all duration-500  scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-[#FFF] scrollbar-thumb-rounded-xl scrollbar-track-rounded-full hp`}>

      <Notification page="notification"/>

        </div>

        </div>
    </div>
    </div>
  )
}

export default IndividualNotification;

export { getServerSideProps};
