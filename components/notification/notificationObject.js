import { ethers } from 'ethers'
import { useRouter } from 'next/router';

const typeTemplates = {

    creator_profit: (notificationData) => {
        let router = useRouter();
        return (
        <>Your created nft <span onClick={() => router.push(`/individualnft/${notificationData?.nftId}`)} className='text-[1.8rem] sm:text-[2rem] text-blue-600 cursor-pointer underline decoration-1 font-bold'> {notificationData?.nftName}</span> owner has been changed and now the new owner is <span onClick={() => router.push(`/profile/${notificationData?.ownerId}`)} className='text-[2rem] text-blue-600 cursor-pointer underline decoration-1 font-bold'> {notificationData?.transfer_to}</span> and after selling your percentage from profit i.e <span className="font-bold text-black">{ethers.utils.formatUnits(notificationData?.price.toLocaleString('fullwide', { useGrouping: false }), 18)} BNB  </span> is successfully transferred to your wallet</>)
    },

    seller_profit: (notificationData) => {
        let router = useRouter();
        return (
            <>Your owned nft <span onClick={() => router.push(`/individualnft/${notificationData?.nftId}`)} className='text-[1.8rem] sm:text-[2rem] text-blue-600 cursor-pointer underline decoration-1 font-bold'> {notificationData?.nftName}</span> that you upload for selling has been sell and <span className="font-bold text-black">{ethers.utils.formatUnits(notificationData?.price.toLocaleString('fullwide', { useGrouping: false }), 18)} BNB  </span> is transferred to your wallet now the new owner is <span onClick={() => router.push(`/profile/${notificationData?.ownerId}`)} className='text-[2rem] text-blue-600 cursor-pointer underline decoration-1 font-bold'> {notificationData?.transfer_to}</span> and in case you get profit from selling this nft means you sell at higher price from the price you buy it then from profit  10 percent creator profit and 10 percent platform charges is deducted from profit but if you don't get any profit  by selling this  then no money is deducted and all money  is successfully transferred to your wallet </>
        )
    },

    copy_original_creator_profit: (notificationData) => {
        let router = useRouter();
        return (
            <>Your created nft copy <span onClick={() => router.push(`/individualnft/${notificationData?.nftId}`)} className='text-[1.8rem] sm:text-[2rem] text-blue-600 cursor-pointer underline decoration-1 font-bold'> {notificationData?.nftName}</span> owner has been changed and now the new owner is <span onClick={() => router.push(`/profile/${notificationData?.ownerId}`)} className='text-[2rem] text-blue-600 cursor-pointer underline decoration-1 font-bold'> {notificationData?.transfer_to}</span> and after selling your percentage from profit i.e <span className="font-bold text-black">{ethers.utils.formatUnits(notificationData?.price.toLocaleString('fullwide', { useGrouping: false }), 18)} BNB  </span> is successfully transferred to your wallet</>)
       },

    first_sell: (notificationData) => {let router=useRouter();
        return(
            <>Your created nft <span   onClick={()=>router.push(`/individualnft/${notificationData?.nftId}`)} className='text-[1.8rem] sm:text-[2rem] text-blue-600 cursor-pointer underline decoration-1 font-bold'> {notificationData?.nftName}</span> that you upload for selling has been sell and 10 percent platform charges is deducted from selling price and if you created copy of some other nft then 5 percent orignal creator fee is also deducted and remaining amount  i.e <span className="font-bold text-black">{ethers.utils.formatUnits(notificationData?.price.toLocaleString('fullwide', { useGrouping: false }), 18)} BNB  </span> is successfully transferred to your wallet and  now the new owner of your created nft is <span onClick={()=>router.push(`/profile/${notificationData?.ownerId}`)} className='text-[2rem] text-blue-600 cursor-pointer underline decoration-1 font-bold'> {notificationData?.transfer_to}</span>  </>
    )},

    request_copyright: (notificationData) => {let router=useRouter();
        return(
            <>There is a copyright request for your owned nft <span   onClick={()=>router.push(`/individualnft/${notificationData?.nftId}`)} className='text-[1.8rem] sm:text-[2rem] text-blue-600 cursor-pointer underline decoration-1 font-bold'> {notificationData?.nftName}</span>  send by <span onClick={()=>router.push(`/profile/${notificationData?.ownerId}`)} className='text-[2rem] text-blue-600 cursor-pointer underline decoration-1 font-bold'> {notificationData?.transfer_to}</span> and offered money is <span className="font-bold text-black">{ethers.utils.formatUnits(notificationData?.price.toLocaleString('fullwide', { useGrouping: false }), 18)} BNB  </span>    </>
    )},

    action_copyright_reject: (notificationData) => {let router=useRouter();
        return(
            <>Copyright request that you submitted for nft  <span   onClick={()=>router.push(`/individualnft/${notificationData?.nftId}`)} className='text-[1.8rem] sm:text-[2rem] text-blue-600 cursor-pointer underline decoration-1 font-bold'> {notificationData?.nftName}</span> is rejected by the owner <span onClick={()=>router.push(`/profile/${notificationData?.ownerId}`)} className='text-[2rem] text-blue-600 cursor-pointer underline decoration-1 font-bold'> {notificationData?.transfer_to}</span>. </>
    )},

    action_copyright_accept: (notificationData) => {let router=useRouter();
        return(
            <>Copyright request that you submitted for nft  <span   onClick={()=>router.push(`/individualnft/${notificationData?.nftId}`)} className='text-[1.8rem] sm:text-[2rem] text-blue-600 cursor-pointer underline decoration-1 font-bold'> {notificationData?.nftName}</span> is accepted by the owner <span onClick={()=>router.push(`/profile/${notificationData?.ownerId}`)} className='text-[2rem] text-blue-600 cursor-pointer underline decoration-1 font-bold'> {notificationData?.transfer_to}</span>. </>
    )},

    copyright_money: (notificationData) =>{let router=useRouter();
        return (
            <>Copyright request for nft <span   onClick={()=>router.push(`/individualnft/${notificationData?.nftId}`)} className='text-[1.8rem] sm:text-[2rem] text-blue-600 cursor-pointer underline decoration-1 font-bold'> {notificationData?.nftName}</span> submitted by <span onClick={()=>router.push(`/profile/${notificationData?.ownerId}`)} className='text-[2rem] text-blue-600 cursor-pointer underline decoration-1 font-bold'> {notificationData?.transfer_to}</span> accepted by you has been completed and  <span onClick={()=>router.push(`/profile/${notificationData?.ownerId}`)} className='text-[2rem] text-blue-600 cursor-pointer underline decoration-1 font-bold'> {notificationData?.transfer_to}</span> successfully created a copy <span   onClick={()=>router.push(`/individualnft/${notificationData?.copyNftId}`)} className='text-[1.8rem] sm:text-[2rem] text-blue-600 cursor-pointer underline decoration-1 font-semibold'>{`(view Copy)`}</span> and copyright money <span className="font-bold text-black"> {ethers.utils.formatUnits(notificationData?.price.toLocaleString('fullwide', { useGrouping: false }), 18)} BNB  </span> successfully tranfer to your wallet
            </>)},

    delete_copyright: (notificationData) =>{let router=useRouter();
        return (
            <>Copyright request for nft <span   onClick={()=>router.push(`/individualnft/${notificationData?.nftId}`)} className='text-[1.8rem] sm:text-[2rem] text-blue-600 cursor-pointer underline decoration-1 font-bold'> {notificationData?.nftName}</span> submitted by <span onClick={()=>router.push(`/profile/${notificationData?.ownerId}`)} className='text-[2rem] text-blue-600 cursor-pointer underline decoration-1 font-bold'> {notificationData?.transfer_to}</span> and you accept copyright permission has been deleted by the requester  <span onClick={()=>router.push(`/profile/${notificationData?.ownerId}`)} className='text-[2rem] text-blue-600 cursor-pointer underline decoration-1 font-bold'> {notificationData?.transfer_to}</span>.</>)
        },
    bnb_transfer: (notificationData) =>{
        return (
        <>Successfully <span className="font-bold text-black">{parseFloat(ethers.utils.formatUnits(notificationData?.price.toLocaleString('fullwide', { useGrouping: false }), 18)).toFixed(4)} BNB  </span> has been transferred to your wallet. Please note that gas fees  have been deducted by Binance Smart Chain for the transaction, so the received amount might be less than the requested amount.</>
    )},

    bnb_refund_failure: (notificationData) => {let router=useRouter();
        return(
        <>There is a problem in refunding ${notificationData?.price}   to <span   onClick={()=>router.push(`/individualnft/${notificationData?.userId}`)} className='text-[1.8rem] sm:text-[2rem] text-blue-600 cursor-pointer underline decoration-1 font-bold'> {notificationData?.userName}</span>. Please handle the situation.</>
    )},

    bnb_refund_request: (notificationData) => 
    {return (
        <>There is a problem in transferring bnb to your wallet so the amount you pay for buying i.e ${notificationData.price} is refunded to your account
            it will reached into your account after some time (The refund process may take some time, so please wait for a while) And after reaching payment in your account you can again request for buying bnb
        </>
    )},
    bnb_refund_success: (notificationData) => (
        <>Refunded amount of {notificationData.price} successfully refunded to your account</>
    ),
};

export default typeTemplates;