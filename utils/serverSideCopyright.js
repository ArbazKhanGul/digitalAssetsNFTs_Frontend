// import api from "./axiosconfiguration"

// export default async function getServerSideProps(context) {

   
//     const { req} = context
//     const { id } = context.query;
//     console.log("🚀 ~ file: ServerSideNft.js:8 ~ getServerSideProps ~ id", id)


//     let session = req.headers?.cookie ? req.headers?.cookie : ""

//     try {
//         var result;
//         result = await api.get(`/individualCopyright/${id}`, {
//             headers: {
//                 'Access-Control-Allow-Credentials': true,
//                 Cookie: session
//             }
//         }
//         );

//             if(result?.data?.status=="success")
//             {

//                 return {
//                     props: {
//                         userinfo: result?.data?.user ? result?.data?.user:"",
//                         data:result?.data?.data
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
    // Make the API request with the token in the Authorization header
    const result = await api.get(`/individualCopyright/${id}`, {
      headers: {
        'Access-Control-Allow-Credentials': true,
        'Authorization': `Bearer ${token}`
      }
    });

    if (result?.data?.status === "success") {
      return {
        props: {
          userinfo: result?.data?.user || "", // Ensure userinfo is defined even if null
          data: result?.data?.data || {}     // Ensure data is defined even if null
        }
      };
    }
  } catch (error) {
    console.log("🚀 ~ file: ServerSideNft.js:45 ~ getServerSideProps ~ error", error);
  }

  // Return notFound if the request fails or status is not success
  return {
    notFound: true,
  };
}

