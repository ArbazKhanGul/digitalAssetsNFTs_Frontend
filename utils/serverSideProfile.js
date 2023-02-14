import api from "./axiosconfiguration"

export default async function getServerSideProps(context) {

    console.log("serversidelogin")
    const { req} = context
    const { id } = context.query;
    console.log("🚀 ~ file: serverSideProfile.js:8 ~ getServerSideProps ~ id", id)


    let session = req.headers?.cookie ? req.headers?.cookie : ""

    try {
        var result;
        result = await api.get(`/individualprofile/${id}`, {
            headers: {
                'Access-Control-Allow-Credentials': true,
                Cookie: session
            }
        }
        );

            if(result?.data?.status=="success")
            {

                return {
                    props: {
                        userinfo: result?.data?.user ? result?.data?.user:"",
                        profileData: result?.data?.profile
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

