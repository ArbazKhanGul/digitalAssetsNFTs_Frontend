import Navbar from "../../components/navbar"
import Notification from "../../components/notification/notificationPage";
import getServerSideProps from "../../utils/serverSideNotification"
import { ethers } from 'ethers'
import { useRouter } from "next/router";
import deleteNotification from "../../utils/deleteNotification";
import useValidate from "../../utils/useValidate";
import Footer from "../../components/footer";

function IndividualNotification({ userinfo, notificationData }) {


  let router=useRouter();
  let date = new Date(notificationData?.createdAt).toLocaleString();
  const [loading, user, address] = useValidate(userinfo);

  return (


    <div>

      <Navbar></Navbar>
      <div className="px-[2.5rem] lg:px-[5rem] sm:px-[3.5rem] md:px-[4.5rem] flex flex-col lg:flex-row">
        <div className="grow pt-[1.6rem] sm:pt-[2rem] pb-[1.5rem] lg:mr-[2rem] lg:border-b-[1px] border-[#b3bcbd] h-fit">
          <div className="text-[#95a5a6] font-['Inconsolata'] text-[1.8rem] sm:text-[2rem]">
            {date}
          </div>
          <h2 className="text-[#0f1111] font-['Inconsolata'] text-[2.7rem] sm:text-[3rem] font-medium">
            {notificationData?.type == "seller_profit" ? "NFT sold" : null}
            {notificationData?.type == "creator_profit" ? "Profit Transfer" : null}
          </h2>
          <div>
            <h2 className="text-[#9da9aa] font-medium font-['Inconsolata'] text-[2.2rem] mb-[1rem]">Hey,</h2>
            <p className="text-[#95a5a6] font-['Inconsolata'] text-[1.8rem] sm:text-[2rem] mb-[1rem] text-justify">

              {notificationData?.type == "creator_profit" ? <>Your created nft <span   onClick={()=>router.push(`/individualnft/${notificationData?.nftId}`)} className='text-[1.8rem] sm:text-[2rem] text-blue-600 cursor-pointer underline decoration-1 font-bold'> {notificationData?.nftName}</span> owner has been changed and now the new owner is <span onClick={()=>router.push(`/profile/${notificationData?.ownerId}`)} className='text-[2rem] text-blue-600 cursor-pointer underline decoration-1 font-bold'> {notificationData?.transfer_to}</span> and after selling 10 percent from profit i.e <span className="font-bold text-black">{ethers.utils.formatUnits(notificationData?.price.toLocaleString('fullwide', { useGrouping: false }), 18)} BNB  </span> is successfully transferred to your wallet</> : null}

              {notificationData?.type == "seller_profit" ? (<>Your owned nft <span   onClick={()=>router.push(`/individualnft/${notificationData?.nftId}`)} className='text-[1.8rem] sm:text-[2rem] text-blue-600 cursor-pointer underline decoration-1 font-bold'> {notificationData?.nftName}</span> that you upload for selling has been sell and <span className="font-bold text-black">{ethers.utils.formatUnits(notificationData?.price.toLocaleString('fullwide', { useGrouping: false }), 18)} BNB  </span> is transferred to your wallet now the new owner is <span onClick={()=>router.push(`/profile/${notificationData?.ownerId}`)} className='text-[2rem] text-blue-600 cursor-pointer underline decoration-1 font-bold'> {notificationData?.transfer_to}</span> and in case you get profit from selling this nft means you sell at higher price from the price you buy it then from profit  10 percent creator profit and 10 percent platform charges is deducted from profit but if you don't get any profit  by selling this  then no money is deducted and all money  is successfully transferred to your wallet </>) : null}

              {notificationData?.type == "first_sell" ? (<>Your created nft <span   onClick={()=>router.push(`/individualnft/${notificationData?.nftId}`)} className='text-[1.8rem] sm:text-[2rem] text-blue-600 cursor-pointer underline decoration-1 font-bold'> {notificationData?.nftName}</span> that you upload for selling has been sell and 10 percent platform charges is deducted from selling price  and remaining amount (90 percent of selling price) i.e<span className="font-bold text-black">{ethers.utils.formatUnits(notificationData?.price.toLocaleString('fullwide', { useGrouping: false }), 18)} BNB  </span> is successfully transferred to your wallet and  now the new owner of your created nft is <span onClick={()=>router.push(`/profile/${notificationData?.ownerId}`)} className='text-[2rem] text-blue-600 cursor-pointer underline decoration-1 font-bold'> {notificationData?.transfer_to}</span>  </>) : null}

              {notificationData?.type == "request_copyright" ? (<>There is a copyright request for your owned nft <span   onClick={()=>router.push(`/individualnft/${notificationData?.nftId}`)} className='text-[1.8rem] sm:text-[2rem] text-blue-600 cursor-pointer underline decoration-1 font-bold'> {notificationData?.nftName}</span>  send by <span onClick={()=>router.push(`/profile/${notificationData?.ownerId}`)} className='text-[2rem] text-blue-600 cursor-pointer underline decoration-1 font-bold'> {notificationData?.transfer_to}</span> and offered money is <span className="font-bold text-black">{ethers.utils.formatUnits(notificationData?.price.toLocaleString('fullwide', { useGrouping: false }), 18)} BNB  </span>    </>) : null}

              {notificationData?.type == "action_copyright_reject" ? (<>Copyright request that you submitted for nft  <span   onClick={()=>router.push(`/individualnft/${notificationData?.nftId}`)} className='text-[1.8rem] sm:text-[2rem] text-blue-600 cursor-pointer underline decoration-1 font-bold'> {notificationData?.nftName}</span> is rejected by the owner <span onClick={()=>router.push(`/profile/${notificationData?.ownerId}`)} className='text-[2rem] text-blue-600 cursor-pointer underline decoration-1 font-bold'> {notificationData?.transfer_to}</span>. </>) : null}

              {notificationData?.type == "action_copyright_accept" ? (<>Copyright request that you submitted for nft  <span   onClick={()=>router.push(`/individualnft/${notificationData?.nftId}`)} className='text-[1.8rem] sm:text-[2rem] text-blue-600 cursor-pointer underline decoration-1 font-bold'> {notificationData?.nftName}</span> is accepted by the owner <span onClick={()=>router.push(`/profile/${notificationData?.ownerId}`)} className='text-[2rem] text-blue-600 cursor-pointer underline decoration-1 font-bold'> {notificationData?.transfer_to}</span>. </>) : null}

              {notificationData?.type == "copyright_money" ? (<>Copyright request for nft <span   onClick={()=>router.push(`/individualnft/${notificationData?.nftId}`)} className='text-[1.8rem] sm:text-[2rem] text-blue-600 cursor-pointer underline decoration-1 font-bold'> {notificationData?.nftName}</span> submitted by <span onClick={()=>router.push(`/profile/${notificationData?.ownerId}`)} className='text-[2rem] text-blue-600 cursor-pointer underline decoration-1 font-bold'> {notificationData?.transfer_to}</span> accepted by you has been completed and  <span onClick={()=>router.push(`/profile/${notificationData?.ownerId}`)} className='text-[2rem] text-blue-600 cursor-pointer underline decoration-1 font-bold'> {notificationData?.transfer_to}</span> successfully created a copy <span   onClick={()=>router.push(`/individualnft/${notificationData?.copyNftId}`)} className='text-[1.8rem] sm:text-[2rem] text-blue-600 cursor-pointer underline decoration-1 font-semibold'>{`(view Copy)`}</span> and copyright money <span className="font-bold text-black"> {ethers.utils.formatUnits(notificationData?.price.toLocaleString('fullwide', { useGrouping: false }), 18)} BNB  </span> successfully tranfer to your wallet
              </>) : null}

              {notificationData?.type == "delete_copyright" ? (<>Copyright request for nft <span   onClick={()=>router.push(`/individualnft/${notificationData?.nftId}`)} className='text-[1.8rem] sm:text-[2rem] text-blue-600 cursor-pointer underline decoration-1 font-bold'> {notificationData?.nftName}</span> submitted by <span onClick={()=>router.push(`/profile/${notificationData?.ownerId}`)} className='text-[2rem] text-blue-600 cursor-pointer underline decoration-1 font-bold'> {notificationData?.transfer_to}</span> and you accept copyright permission has been deleted by the requester  <span onClick={()=>router.push(`/profile/${notificationData?.ownerId}`)} className='text-[2rem] text-blue-600 cursor-pointer underline decoration-1 font-bold'> {notificationData?.transfer_to}</span>.</>) : null}


            </p>
            <h2 className="text-[#0f1111] font-medium font-['Inconsolata'] text-[2.2rem]">Regards</h2>
            <h2 className="text-[#0f1111] font-medium font-['Inconsolata'] text-[2.2rem]">Golden Words NFTs</h2>
          </div>
          <div className="flex justify-end mt-[1rem]">

          <button onClick={()=>router.push(`/copyright/${notificationData?.copyrightId}`)} className="mt-[2rem] mr-[1rem] sm:mt-[0rem] bg-blue-500 w-fit inline-block hover:bg-blue-700  text-white font-normal text-[1.8rem] sm:font-semibold py-2 px-12  sm:py-3 sm:px-14 rounded-full font-['Inconsolata'] tracking-wider">
              <a>View Request</a>
            </button>

            <button onClick={()=>deleteNotification(notificationData?._id,router)} className="mt-[2rem] sm:mt-[0rem] bg-blue-500 w-fit inline-block hover:bg-blue-700  text-white font-normal text-[1.8rem] sm:font-semibold py-2 px-12  sm:py-3 sm:px-14 rounded-full font-['Inconsolata'] tracking-wider">
              <a>Delete</a>
            </button>



          </div>
        </div>
        <div className="mb-[2rem] w-[100%] lg:w-[40rem]">

          <div id="scrollable" className={` font-['Inconsolata'] lg:w-[39rem] bg-[#FFFFFF] rounded-[1rem] lg:right-[3rem] lg:top-[6.4rem] lg:px-[1.5rem] overflow-y-auto !min-h-fit lg:!min-height-screen max-h-screen   box-border transition-all duration-500  scrollbar-thin scrollbar-thumb-blue-500 scrollbar-track-[#FFF] scrollbar-thumb-rounded-xl scrollbar-track-rounded-full hp`}>

            <Notification page="notification"/>

          </div>

        </div>
      </div>
      <Footer></Footer>
    </div>
  )
}

export default IndividualNotification;

export { getServerSideProps };
