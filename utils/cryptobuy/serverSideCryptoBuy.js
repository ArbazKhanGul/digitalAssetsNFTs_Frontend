import api from "../axiosconfigurationServerSide"

export default async function getServerSideProps(context) {
  const { req } = context;

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
    // Make the API request to fetch data using authorization
    const result = await api.get(`/buycryptodata`, {
      headers: {
        'Access-Control-Allow-Credentials': true,
        'Authorization': `Bearer ${token}` // Include the token for authorization
      }
    });

    // Check if the API request was successful
    if (result?.data?.status === "success") {
      return {
        props: {
          userinfo: result?.data?.user || "", // Ensure userinfo is defined even if null
          data: result?.data?.data // Ensure data is defined even if null
        }
      };
    }
  } catch (error) {
    console.log("🚀 ~ file: ServerSideNft.js:45 ~ getServerSideProps ~ error", error);
  }

  // Redirect to the homepage if the request fails or status is not success
  return {
    redirect: {
      destination: "/",
      permanent: false
    }
  };
}
