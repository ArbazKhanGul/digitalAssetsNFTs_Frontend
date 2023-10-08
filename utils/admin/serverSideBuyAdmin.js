import api from "../axiosconfiguration"

export default async function getServerSideProps(context) {
    const { req} = context
console.log("Servers sdie buy");
    let session = req.headers?.cookie ? req.headers?.cookie : ""

    try {
       if(session)
       {
        var result = await api.get("/adminbuydata", {
            headers: {
                'Access-Control-Allow-Credentials': true,
                Cookie: session
            }
        },);
        console.log("🚀 ~ file: serverSideBuyAdmin.js:17 ~ getServerSideProps ~ result:", result)


        if (result?.data?.status === "success") {

            return {
                props: {
                    userinfo: result?.data?.user,
                    data:result.data.data
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




