import api from "./axiosconfiguration"

export default async function getServerSideProps(context) {
    const { req} = context

    let session = req.headers?.cookie ? req.headers?.cookie : ""


    try {
        var result;

       if(session){
        result = await api.get("/verify", {
            headers: {
                'Access-Control-Allow-Credentials': true,
                Cookie: session
            }
        },);
        }
    }
    catch (error) {
    }

    return {
        props: {
            userinfo: result?.data?.user ? result?.data?.user:""
        }
    }
}