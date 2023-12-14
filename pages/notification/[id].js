import Navbar from "../../components/navbar"
import Notification from "../../components/notification/notificationPage";
import getServerSideProps from "../../utils/serverSideNotification"
import { ethers } from 'ethers'
import { useRouter } from "next/router";
import deleteNotification from "../../utils/deleteNotification";
import useValidate from "../../utils/useValidate";
import Footer from "../../components/footer";
import typeTemplates from "../../components/notification/notificationObject";
import ConfirmDelete from "../../components/notification/confirmDelete"

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
          <div className="text-[#2b2e2e] font-medium  text-[1.8rem] sm:text-[2rem]">
            {date}
          </div>
          <h2 className="text-[#0f1111]  text-[2.7rem]  font-semibold">
               {notificationData ?  notificationTitle[notificationData.type]:null}
                </h2>
          <div>
            <h2 className="text-[#4c5455] font-semibold  text-[2.2rem] mb-[1rem]">Hey,</h2>
            <p className="text-[#4c5455]  text-[1.8rem] sm:text-[1.9rem] tracking-[1.2px] leading-[3rem] mb-[1rem] text-justify font-medium">
              {template ? template(notificationData) : null}
            </p>
            <h2 className="text-[#0f1111] font-semibold  text-[2.2rem]">Regards</h2>
            <h2 className="text-[#0f1111] font-semibold  text-[2.2rem]">Golden Words NFTs</h2>
          </div>
          <div className="flex justify-end mt-[1rem]">

            {notificationData.type && notificationData.type.includes("copyright") &&
            <button onClick={() => router.push(`/copyright/${notificationData?.copyrightId}`)} className="mt-[2rem] mr-[1rem] sm:mt-[0rem] bg-[#1b31c4] hover:bg-[#182ba8] w-fit inline-block   text-white font-normal text-[1.8rem] sm:font-semibold py-2 px-12  sm:py-3 sm:px-14 rounded-full  tracking-wider">
              <a>View Request</a>
            </button>
}
            {/* <button onClick={() => deleteNotification(notificationData?._id, router)} className="mt-[2rem] sm:mt-[0rem] bg-[#1b31c4] hover:bg-[#182ba8] w-fit inline-block   text-white font-normal text-[1.8rem] sm:font-semibold py-2 px-12  sm:py-3 sm:px-14 rounded-full  tracking-wider">
              <a>Delete</a>
            </button> */}
            <ConfirmDelete id={notificationData?._id}/>


          </div>
        </div>
        <div className="mb-[2rem] w-[100%] lg:w-[40rem]">

          <div id="scrollable" className={`  lg:w-[39rem] bg-[#FFFFFF] rounded-[1rem] lg:right-[3rem] lg:top-[6.4rem] lg:px-[1.5rem] overflow-y-auto !min-h-fit lg:!min-height-screen max-h-screen   box-border transition-all duration-500  scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-[#FFF] scrollbar-thumb-rounded-xl scrollbar-track-rounded-full hp`}>

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
