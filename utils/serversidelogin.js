import api from "./axiosconfiguration"
export default async function getServerSideProps(context) {
    const { req} = context

    let session = req.headers?.cookie ? req.headers?.cookie : ""

    try {
       if(session)
       {
        var result = await api.get("/verify", {
            headers: {
                'Access-Control-Allow-Credentials': true,
                Cookie: session
            }
        },);


        if (result?.data?.status === "success") {
            console.log("printing result ", result?.data)
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