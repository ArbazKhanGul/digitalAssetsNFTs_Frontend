import { addUser } from "../slice/user"
import Cookies from 'js-cookie';

const logout = async (dispatch, router) => {
    try {
        // Optional: Call your API to handle server-side logout logic
        // await api.get("/logout");
        console.log("success request");

        // Clear token from localStorage
        localStorage.removeItem('token');
        
        // Clear token cookie
        Cookies.remove('token', { path: '/' });

        // Dispatch user logout action
        dispatch(addUser(undefined));

        // Redirect to home page
        router.push("/");
    } catch (error) {
        console.log(error);
    }
};

export default logout;
