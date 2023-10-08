import api from "../axiosconfiguration"


export default async function getServerSideProps(context) {


    const { req} = context

    let session = req.headers?.cookie ? req.headers?.cookie : ""

    try {
        
        var result;
        result = await api.get(`/buycryptodata`, {
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
                        data:result?.data?.data
                    }
                }

            }
    }
    catch (error) {
    console.log("🚀 ~ file: ServerSideNft.js:45 ~ getServerSideProps ~ error", error)
    }

    return {
        redirect: {
            destination: "/",
            permanent: false
        }
    };

}

