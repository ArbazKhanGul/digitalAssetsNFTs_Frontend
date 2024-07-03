import api from "./axiosconfiguration";

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
    var result;

    if (token) {
      // Make a request to verify the session
      result = await api.get("/verify", {
        headers: {
          'Access-Control-Allow-Credentials': true,
          'Authorization': `Bearer ${token}`
        }
      });
    }
  } catch (error) {
    console.error("Error verifying session:", error);
  }

  return {
    props: {
      userinfo: result?.data?.user ? result?.data?.user : ""
    }
  }
}
