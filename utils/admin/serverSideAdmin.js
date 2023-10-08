import api from "../axiosconfiguration"

export default async function getServerSideProps(context) {

    const { req} = context

    let session = req.headers?.cookie ? req.headers?.cookie : ""

    try {
       if(session)
       {
        var result = await api.get("/adminverify", {
            headers: {
                'Access-Control-Allow-Credentials': true,
                Cookie: session
            }
        },);

        if (result?.data?.status === "success") {

            return {
                props: {
                    userinfo: result?.data?.user
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