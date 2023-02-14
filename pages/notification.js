import NotificaitionSection from "../components/notification"
import {
Navbar
} from "../components"

function Notification() {
  return (
    <div >
      <Navbar/>
      <div className="flex justify-center items-center bg-[#9db8cc]  py-[1.4rem]"> 
      <div  className={` font-['Inconsolata'] w-[52rem] bg-[#FFFFFF] rounded-[1rem]  px-[1.5rem] overflow-y-auto  box-border transition-all duration-500  }`}>
   <NotificaitionSection  page="main" className="min-h-screen"/> 
   </div>
   </div>  
    </div>
  )
}

export default Notification
