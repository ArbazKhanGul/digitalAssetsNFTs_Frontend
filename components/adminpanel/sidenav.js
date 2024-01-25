import React from 'react'
import { useRouter } from 'next/router'

function Index() {
  let router =useRouter();
  console.log("🚀 ~ file: sidenav.js:6 ~ Index ~ router:", router.pathname.startsWith("/adminpanel/transactions"))

  return (
      <div className="xl:w-[20%] xl:h-[100vh]  backNavside xl:sticky xl:top-[0rem] xl:left-[0rem] ">
            <div className='flex justify-center xl:flex-col items-center py-[2rem] xl:py-[0rem] flex-wrap'>
                            <div className={`${router.pathname.startsWith("/adminpanel/dashboard") ? "bg-[#7f48c2] text-white ":"text-[white]"} cursor-pointer rounded-[18px] w-fit px-[30px] xl:mt-[40px] py-[8px] text-[1.6rem]`} >Dashboard</div>
                            {/* <div className={`${router.pathname.startsWith("/adminpanel/transactions") ?"bg-[#7f48c2] text-white ":"text-[white]"} cursor-pointer  font-medium rounded-[18px] w-fit px-[30px] xl:mt-[12px] py-[8px] whitespace-nowrap text-[1.6rem]`}>Transactions</div> */}
                            {/* <div className={`${router.pathname.startsWith("/adminpanel/buyoptions") ?"bg-[#7f48c2] text-white ":"text-[white]"} cursor-pointer font-medium rounded-[18px] w-fit px-[30px] xl:mt-[5px] py-[8px] text-[1.6rem]`}>Buy Options</div> */}
                        </div>
      </div>

  )
}

export default Index
