import { useEffect, useState } from "react";
import "./password.css";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { getResetPassLink, resetPass } from "../../redux/ApiCalls/passApiCall";
import { useParams } from "react-router-dom";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { userId, tokenId } = useParams();

  useEffect(() => {
    dispatch(getResetPassLink(userId, tokenId));
  }, [dispatch, userId, tokenId]);

  // form submit handler
  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (password.trim() === "") return toast.error("password is required");
    dispatch(resetPass(userId, tokenId, { password }));
  };
  return (
    <section className="forgetPassword">
      <h1 className="password-ask-title">Reset password</h1>
      <form onSubmit={formSubmitHandler} className="form-password">
        <div className="form-password-group">
          <label className="forget-label-email">password</label>
          <input
            type="password"
            className="forget-input-email"
            placeholder="enter your email"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="forget-btn">
          send
        </button>
      </form>
    </section>
  );
};

export default ResetPassword;
