import { toast } from "react-toastify";
import request from "../../utils/reques";
import { authActions } from "../Slices/authSlice";

// Login user
export function loginUser(info) {
  return async (dispatch) => {
    try {
      const { data } = await request.post(`api/auth/login`, info);
      dispatch(authActions.loginUser(data));
      localStorage.setItem("userInfo", JSON.stringify(data));
      toast.success("User logged in successfully");
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.msg);
    }
  };
}
// Register user
export function registerUser(info) {
  return async (dispatch) => {
    try {
      const { data } = await request.post(`api/auth/register`, info);
      dispatch(authActions.loginUser(data));
      localStorage.setItem("userInfo", JSON.stringify(data));
      toast.success("User register in successfully");
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.msg);
    }
  };
}
// logout user
export function logoutUser() {
  return () => {
    try {
      localStorage.removeItem("userInfo");
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };
}
