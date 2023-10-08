import Navbar from "../../components/navbar"
import Notification from "../../components/notification/notificationPage";
import getServerSideProps from "../../utils/serverSideNotification"
import { ethers } from 'ethers'
import { useRouter } from "next/router";
import deleteNotification from "../../utils/deleteNotification";
import useValidate from "../../utils/useValidate";
import Footer from "../../components/footer";
import typeTemplates from "../../components/notification/notificationObject";


const notificationTitle = {
  seller_profit: "NFT sold",
  creator_profit: "Profit Transfer",
  first_sell: "NFT sold",
  request_copyright: "Copyright Status",
  action_copyright_reject: "Copyright Status",
  action_copyright_accept: "Copyright Status",
  copyright_money: "Copyright Status",
  delete_copyright: "Copyright Status",
  bnb_transfer: "Buy BNB",
  bnb_refund_failure: "Buy BNB",
  bnb_refund_request: "Buy BNB",
  bnb_refund_success: "Buy BNB",


}


function IndividualNotification({ userinfo, notificationData }) {

  let router = useRouter();
  let date = new Date(notificationData?.createdAt).toLocaleString();

  const [loading, user, address] = useValidate(userinfo);
  const template = typeTemplates[notificationData.type];


  return (


    <div>

      <Navbar></Navbar>
      <div className="px-[2.5rem] lg:px-[5rem] sm:px-[3.5rem] md:px-[4.5rem] flex flex-col lg:flex-row">
        <div className="grow pt-[1.6rem] sm:pt-[2rem] pb-[1.5rem] lg:mr-[2rem] lg:border-b-[1px] border-[#b3bcbd] h-fit">
          <div className="text-[#95a5a6] font-['Inconsolata'] text-[1.8rem] sm:text-[2rem]">
            {date}
          </div>
          <h2 className="text-[#0f1111] font-['Inconsolata'] text-[2.7rem] sm:text-[3rem] font-medium">
               {notificationData ?  notificationTitle[notificationData.type]:null}
                </h2>
          <div>
            <h2 className="text-[#9da9aa] font-medium font-['Inconsolata'] text-[2.2rem] mb-[1rem]">Hey,</h2>
            <p className="text-[#95a5a6] font-['Inconsolata'] text-[1.8rem] sm:text-[2rem] mb-[1rem] text-justify">
              {template ? template(notificationData) : null}
            </p>
            <h2 className="text-[#0f1111] font-medium font-['Inconsolata'] text-[2.2rem]">Regards</h2>
            <h2 className="text-[#0f1111] font-medium font-['Inconsolata'] text-[2.2rem]">Golden Words NFTs</h2>
          </div>
          <div className="flex justify-end mt-[1rem]">


            <button onClick={() => router.push(`/copyright/${notificationData?.copyrightId}`)} className="mt-[2rem] mr-[1rem] sm:mt-[0rem] bg-blue-500 w-fit inline-block hover:bg-blue-700  text-white font-normal text-[1.8rem] sm:font-semibold py-2 px-12  sm:py-3 sm:px-14 rounded-full font-['Inconsolata'] tracking-wider">
              <a>View Request</a>
            </button>

            <button onClick={() => deleteNotification(notificationData?._id, router)} className="mt-[2rem] sm:mt-[0rem] bg-blue-500 w-fit inline-block hover:bg-blue-700  text-white font-normal text-[1.8rem] sm:font-semibold py-2 px-12  sm:py-3 sm:px-14 rounded-full font-['Inconsolata'] tracking-wider">
              <a>Delete</a>
            </button>



          </div>
        </div>
        <div className="mb-[2rem] w-[100%] lg:w-[40rem]">

          <div id="scrollable" className={` font-['Inconsolata'] lg:w-[39rem] bg-[#FFFFFF] rounded-[1rem] lg:right-[3rem] lg:top-[6.4rem] lg:px-[1.5rem] overflow-y-auto !min-h-fit lg:!min-height-screen max-h-screen   box-border transition-all duration-500  scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-[#FFF] scrollbar-thumb-rounded-xl scrollbar-track-rounded-full hp`}>

            <Notification page="notification" />

          </div>

        </div>
      </div>
      <Footer></Footer>
    </div>
  )
}

export default IndividualNotification;

export { getServerSideProps };
