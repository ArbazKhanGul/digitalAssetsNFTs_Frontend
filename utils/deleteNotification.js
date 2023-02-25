import api from "./axiosconfiguration"

export default async function deleteNotification(id,router) {


    try {
       let result = await api.get(`/deletenotification/${id}`);

        if(result?.data?.notifications?.length > 0)
        {
            router.push(`/notification/${result.data.notifications[0]?._id}?status=${result.data.notifications[0]?.status}`)
        }
        else{
            router.push("/")
        }
    }

    catch(err){
        console.log("🚀 ~ file: serverside.js:10 ~ getServerSideProps ~ err", err)
    }
}