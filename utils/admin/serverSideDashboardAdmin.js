import api from "../axiosconfiguration"

export default async function getServerSideProps(context) {

    const { req} = context

    let session = req.headers?.cookie ? req.headers?.cookie : ""

    try {
       if(session)
       {
        var result = await api.get("/dashboarddata", {
            headers: {
                'Access-Control-Allow-Credentials': true,
                Cookie: session
            }
        },);

        if (result?.data?.status === "success") {

            return {
                props: {
                    userinfo: result?.data?.user,
                    creationFee:result?.data?.creationFee
                }
            }

        }
    }
    }
    catch (error) {
    }


    return {
        redirect: {
            permanent: false,
            destination: "/",
        },
    }
}