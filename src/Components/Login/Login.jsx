import React, { useState } from "react";
import "./Login.css";
import User_Email from "../Assets/email.png";
import User_Password from "../Assets/password.png";

const Login = () => {
  const [action, setAction] = useState("submit"); //to show that the button was clicked
  return (
    <div className="container">
      <div className="header">
        <div className="text">Login</div>
        <div className="underline"></div>
      </div>
      <div className="inputs">
        <div className="input">
          <img src={User_Email} alt="" />
          <input type="email" placeholder="Email ID" />
        </div>
        <div className="input">
          <img src={User_Password} alt="" />
          <input type="password" placeholder="Password " />
        </div>
      </div>
      <div className="forgot-password">
        Forgot Password?{" "}
        <a
          href="https://www.facebook.com/help/213395615347144/"
          target="_blank"
        >
          <span>Click here</span>
        </a>
      </div>
      <div className="submit-container">
        <div
          className={action}
          onClick={() => {
            setAction("submit gray");
          }}
        >
          Login
        </div>
      </div>
    </div>
  );
};

export default Login;
