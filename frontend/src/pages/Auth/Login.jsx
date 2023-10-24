import { useState } from "react";
import "./auth.css";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { loginUser } from "../../redux/ApiCalls/authApiCall";
import { toast } from "react-toastify";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  // form submit handler
  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (email.trim() === "") return toast.error("please enter your email");
    if (password.trim() === "")
      return toast.error("please enter your password");
    dispatch(loginUser({ email, password }));
  };
  return (
    <section className="auth-page">
      <div className="auth-container">
        <h1 className="auth-page-title">Login</h1>
        <form onSubmit={formSubmitHandler} className="form-auth-page">
          <div className="auth-group-form">
            <label className="auth-label">email</label>
            <input
              type="email"
              placeholder="enter your email"
              className="auth-input"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="auth-group-form">
            <label className="auth-label">passwrod</label>
            <input
              type="password"
              placeholder="enter your password"
              className="auth-input"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" className="auth-form-btn">
            Login
          </button>
        </form>
        <div className="ask-account">
          create account ?{" "}
          <Link to={"/register"} className="go-auth">
            Register
          </Link>
        </div>
        <Link to={"/forget-password"} className="forget-password">
          forget password ?
        </Link>
      </div>
    </section>
  );
};

export default Login;
