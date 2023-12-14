import api from "./axiosconfiguration"
import { toast } from "react-toastify";

export default async function deleteNotification(id,router,setLoader,setShowModal) {


    try {
        setLoader("waiting");
       let result = await api.get(`/deletenotification/${id}`);

        if(result?.data?.notifications?.length > 0)
        {
            router.push(`/notification/${result.data.notifications[0]?._id}?status=${result.data.notifications[0]?.status}`)
        }
        else{
            router.push("/")
        }

        setLoader(false);
        setShowModal(false);
    }

    catch(err){
        setLoader(false);
        setShowModal(false);
        toast.error(`Error in deleting notification please try later `, {
            position: "top-center",
          });
        console.log("🚀 ~ file: serverside.js:10 ~ getServerSideProps ~ err", err)
    }
}