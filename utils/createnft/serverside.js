import api from "./axiosconfigurationServerSide";

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
    if (token) {
      // Make the API request to fetch NFT fee data using authorization
      const result = await api.get("/nftfee", {
        headers: {
          'Access-Control-Allow-Credentials': true,
          'Authorization': `Bearer ${token}` // Include the token for authorization
        }
      });

      if (result?.data?.status === "success") {
        console.log("printing result ", result?.data);
        return {
          props: {
            userinfo: result?.data?.user || "", // Ensure userinfo is defined even if null
            nftCreationFee: result?.data?.nftCreationFee // Ensure nftCreationFee is defined even if null
          }
        };
      }
    }
  } catch (error) {
    console.error("Error fetching NFT fee data:", error);
  }

  return {
    redirect: {
      permanent: false,
      destination: "/"
    }
  };
}
