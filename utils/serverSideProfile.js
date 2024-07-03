// import api from "./axiosconfiguration"

// export default async function getServerSideProps(context) {

//     console.log("serversidelogin")
//     const { req} = context
//     const { id } = context.query;
//     console.log("🚀 ~ file: serverSideProfile.js:8 ~ getServerSideProps ~ id", id)


//     let session = req.headers?.cookie ? req.headers?.cookie : ""

//     try {
//         var result;
//         result = await api.get(`/individualprofile/${id}`, {
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
//                         profileData: result?.data?.profile
//                     }
//                 }

//             }
//     }
//     catch (error) {
//     }

//     return {
//         notFound: true,
//     }

// }

import api from "./axiosconfiguration";

export default async function getServerSideProps(context) {
  const { req } = context;
  const { id } = context.query;
  console.log("🚀 ~ file: serverSideProfile.js:8 ~ getServerSideProps ~ id", id);

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
    // Make the API request to fetch individual profile data
    const result = await api.get(`/individualprofile/${id}`, {
      headers: {
        'Access-Control-Allow-Credentials': true,
        Authorization: `Bearer ${token}` // Include the token for authorization
      }
    });

    console.log("🚀 ~ file: serverSideProfile.js:17 ~ getServerSideProps ~ result", result?.data);

    // Check if the API request was successful
    if (result?.data?.status === "success") {
      return {
        props: {
          userinfo: result?.data?.user || "", // Ensure userinfo is defined even if null
          profileData: result?.data?.profile || null // Ensure profileData is defined even if null
        }
      };
    }
  } catch (error) {
    console.error("Error fetching profile data:", error);
  }

  // Return notFound if the request fails or status is not success
  return {
    notFound: true
  };
}

