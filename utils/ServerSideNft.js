import api from "./axiosconfiguration"
import axios from "axios"
export default async function getServerSideProps(context) {

    console.log("serversidelogin")
    console.log(process.env.ipfsURL)
    const { req} = context
    const { id } = context.query;
    console.log("🚀 ~ file: ServerSideNft.js:8 ~ getServerSideProps ~ id", id)


    let session = req.headers?.cookie ? req.headers?.cookie : ""

    try {
        var result;
        result = await api.get(`/individualnft/${id}`, {
            headers: {
                'Access-Control-Allow-Credentials': true,
                Cookie: session
            }
        }
        );

            if(result?.data?.status=="success")
            {

                let ipfsdata = await axios.get(`${process.env.ipfsURL}${id}`, {
                    headers: {
                        'Access-Control-Allow-Credentials': true,
                    }
                }
                );

                console.log("🚀 ~ file: ServerSideNft.js:29 ~ getServerSideProps ~ ipfsdata", ipfsdata?.data)

                return {
                    props: {
                        userinfo: result?.data?.user ? result?.data?.user:"",
                        nftSellingData:result?.data?.nft,
                        nftData: ipfsdata?.data,
                    }
                }

            }
    }
    catch (error) {
    console.log("🚀 ~ file: ServerSideNft.js:45 ~ getServerSideProps ~ error", error)
    }

    return {
        notFound: true,
    }

}

