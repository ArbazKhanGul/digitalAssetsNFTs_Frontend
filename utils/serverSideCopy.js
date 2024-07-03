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
    const result = await api.get(`/copynft/${id}`, {
      headers: {
        'Access-Control-Allow-Credentials': true,
        'Authorization': `Bearer ${token}`
      }
    });

    if (result?.data?.status === "success") {
      return {
        props: {
          userinfo: result?.data?.user,
          nftData: result?.data?.nftData,
          copyrightPrice: result?.data?.copyrightPrice
        }
      };
    }
  } catch (error) {
    console.log("🚀 ~ file: ServerSideNft.js:45 ~ getServerSideProps ~ error", error);
  }

  return {
    notFound: true,
  };
}
