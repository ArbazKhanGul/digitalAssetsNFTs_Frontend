import {addUser } from "../slice/user";

const logout=(dispatch,router) => {
    localStorage.clear();
    dispatch(addUser(undefined))
    router.push("/");
}

export default logout;