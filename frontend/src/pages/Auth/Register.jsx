import { useState } from "react";
import "./auth.css";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { registerUser } from "../../redux/ApiCalls/authApiCall";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();

  // form submit handler
  const formSubmitHandler = (e) => {
    e.preventDefault();
    if (name.trim() === "") return toast.error("please enter your name");
    if (email.trim() === "") return toast.error("please enter your email");
    if (password.trim() === "")
      return toast.error("please enter your password");
    dispatch(registerUser({ name, email, password }));
  };
  return (
    <section className="auth-page">
      <div className="auth-container">
        <h1 className="auth-page-title">Register</h1>
        <form onSubmit={formSubmitHandler} className="form-auth-page">
          <div className="auth-group-form">
            <label className="auth-label">name</label>
            <input
              type="text"
              placeholder="enter your name"
              className="auth-input"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
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
            Register
          </button>
        </form>
        <div className="ask-account">
          if you have an account ?{" "}
          <Link to={"/login"} className="go-auth">
            Login
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Register;
