// import api from "./axiosconfiguration"
// import axios from "axios"
// export default async function getServerSideProps(context) {

//     console.log("serversidelogin")
//     console.log(process.env.ipfsURL)
//     const { req} = context
//     const { id } = context.query;
//     console.log("🚀 ~ file: ServerSideNft.js:8 ~ getServerSideProps ~ id", id)


//     let session = req.headers?.cookie ? req.headers?.cookie : ""

//     try {
//         var result;
//         result = await api.get(`/individualnft/${id}`, {
//             headers: {
//                 'Access-Control-Allow-Credentials': true,
//                 Cookie: session
//             }
//         }
//         );

//             if(result?.data?.status=="success")
//             {

//                 let ipfsdata = await axios.get(`${process.env.ipfsURL}${id}`, {
//                     headers: {
//                         'Access-Control-Allow-Credentials': true,
//                     }
//                 }
//                 );

//                 console.log("🚀 ~ file: ServerSideNft.js:29 ~ getServerSideProps ~ ipfsdata", ipfsdata?.data)

//                 return {
//                     props: {
//                         userinfo: result?.data?.user ? result?.data?.user:"",
//                         nftSellingData:result?.data?.nft,
//                         nftData: ipfsdata?.data,
//                     }
//                 }

//             }
//     }
//     catch (error) {
//     console.log("🚀 ~ file: ServerSideNft.js:45 ~ getServerSideProps ~ error", error)
//     }

//     return {
//         notFound: true,
//     }

// }

import api from "./axiosconfiguration";
import axios from "axios";

export default async function getServerSideProps(context) {
  const { req } = context;
  const { id } = context.query;
  console.log("🚀 ~ file: ServerSideNft.js:8 ~ getServerSideProps ~ id", id);

  // Extract the token from cookies
  const cookies = req.headers?.cookie || "";
  let token = "";
  if (cookies) {
    const cookiesArray = cookies.split(';');
    const tokenCookie = cookiesArray.find(cookie => cookie.trim().startsWith('token='));
    if (tokenCookie) {
      token = tokenCookie.split('=')[1];
    }
  }

  try {
    // Make the primary API request to fetch individual NFT data
    const result = await api.get(`/individualnft/${id}`, {
      headers: {
        'Access-Control-Allow-Credentials': true,
        Authorization: `Bearer ${token}` // Include the token for authorization
      }
    });

    if (result?.data?.status === "success") {
      // Fetch additional data from IPFS
      const ipfsdata = await axios.get(`${process.env.ipfsURL}${id}`, {
        headers: {
          'Access-Control-Allow-Credentials': true,
         }
      });

      console.log("🚀 ~ file: ServerSideNft.js:29 ~ getServerSideProps ~ ipfsdata", ipfsdata?.data);

      // Return props with retrieved data
      return {
        props: {
          userinfo: result?.data?.user || "", // Ensure userinfo is defined even if null
          nftSellingData: result?.data?.nft || null, // Ensure nftSellingData is defined even if null
          nftData: ipfsdata?.data || null // Ensure nftData is defined even if null
        }
      };
    }
  } catch (error) {
    console.error("Error fetching data:", error);
  }

  // Return notFound if the request fails or status is not success
  return {
    notFound: true
  };
}
