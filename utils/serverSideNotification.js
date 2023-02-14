import api from "./axiosconfiguration"

export default async function getServerSideProps(context) {

    console.log("serversidelogin")
    const { req} = context
    const { id,status } = context.query;
    console.log("🚀 ~ file: serverSideNotification.js:8 ~ getServerSideProps ~ context.query", context.query)


    let session = req.headers?.cookie ? req.headers?.cookie : ""

    try {
        var result;
        result = await api.get(`/individualnotification/${id}?status=${status}`, {
            headers: {
                'Access-Control-Allow-Credentials': true,
                Cookie: session
            }
        }
        );

        console.log("🚀 ~ file: serverSideNotification.js:17 ~ getServerSideProps ~ result", result?.data)

            if(result?.data?.status=="success")
            {

                return {
                    props: {
                        userinfo: result?.data?.user ? result?.data?.user:"",
                        notificationData: result?.data?.notification
                    }
                }

            }
    }
    catch (error) {
    }

    return {
        notFound: true,
    }

}

