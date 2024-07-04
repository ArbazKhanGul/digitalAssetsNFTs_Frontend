// import api from "./axiosconfiguration";

// export default async function getServerSideProps(context) {
//   const { req } = context;

//   // Extract the token cookie from the request headers
//   const cookies = req.headers?.cookie || "";
//   let token = "";
//   if (cookies) {
//     const cookiesArray = cookies.split(';');
//     const tokenCookie = cookiesArray.find(cookie => cookie.trim().startsWith('token='));
//     if (tokenCookie) {
//       token = tokenCookie.split('=')[1];
//     }
//   }

//   try {
//     if (token) {
//       // Make a request to verify the session
//       const result = await api.get("/verify", {
//         headers: {
//           'Access-Control-Allow-Credentials': true,
//           'Authorization': `Bearer ${token}`
//         },
//       });

//       if (result?.data?.status === "success") {
//         console.log("printing result ", result?.data);

//         return {
//           props: {
//             userinfo: result?.data?.user,
//           },
//         };
//       }
//     }
//   } catch (error) {
//     console.error("Error verifying session:", error);
//   }

//   // If verification fails, redirect to the home page
//   return {
//     redirect: {
//       permanent: false,
//       destination: "/",
//     },
//   };
// }

import api from "./axiosconfigurationServerSide";

export default async function getServerSideProps(context) {
  const { req } = context;

  // Extract the token cookie from the request headers
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
    if (token) {
      // Make a request to verify the session
      const result = await api.get("/verify", {
        headers: {
          'Access-Control-Allow-Credentials': true,
          'Authorization': `Bearer ${token}`
        }
      });

      if (result?.data?.status === "success") {
        // Session verified successfully, return props
        return {
          props: {
            userinfo: result?.data?.user || {} // Ensure userinfo is defined even if null
          }
        };
      } else {
        // If verification fails, redirect to the home page
        return {
          redirect: {
            permanent: false,
            destination: "/"
          }
        };
      }
    } else {
      // If token is not present, redirect to the home page
      return {
        redirect: {
          permanent: false,
          destination: "/"
        }
      };
    }
  } catch (error) {
    console.error("Error verifying session:", error);
    // Handle error gracefully, redirect to home page
    return {
      redirect: {
        permanent: false,
        destination: "/"
      }
    };
  }
}

