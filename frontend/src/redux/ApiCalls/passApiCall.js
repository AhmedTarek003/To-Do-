import { toast } from "react-toastify";
import request from "../../utils/reques";

// send reset password link
export function sendResetPassLink(email) {
  return async (dispatch) => {
    try {
      const { data } = await request.post(
        `api/password/reset-password-link`,
        email
      );
      toast.success(data.msg);
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.msg);
    }
  };
}
// send reset password link
export function getResetPassLink(userId, tokenId) {
  return async (dispatch) => {
    try {
      const { data } = await request.get(
        `api/password/reset-password-link/${userId}/${tokenId}`
      );
      toast.success(data.msg);
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.msg);
    }
  };
}
//  reset password
export function resetPass(userId, tokenId, newPass) {
  return async (dispatch) => {
    try {
      const { data } = await request.post(
        `api/password/reset-password-link/${userId}/${tokenId}`,
        newPass
      );
      toast.success(data.msg);
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.msg);
    }
  };
}
