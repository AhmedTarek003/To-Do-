import { useState } from "react";
import "./password.css";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { sendResetPassLink } from "../../redux/ApiCalls/passApiCall";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();

  // form submit handler
  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (email.trim() === "") return toast.error("email is required");
    dispatch(sendResetPassLink({ email }));
  };
  return (
    <section className="forgetPassword">
      <h1 className="password-ask-title">Forget password</h1>
      <form onSubmit={formSubmitHandler} className="form-password">
        <div className="form-password-group">
          <label className="forget-label-email">email</label>
          <input
            type="email"
            className="forget-input-email"
            placeholder="enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <button type="submit" className="forget-btn">
          send
        </button>
      </form>
    </section>
  );
};

export default ForgetPassword;
