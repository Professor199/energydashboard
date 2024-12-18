import React, { useState } from "react";
import "./SignUp.css";
import User_Email from "../Assets/email.png";
import User_Password from "../Assets/password.png";
import User_Person from "../Assets/person.png";
import User_meter from "../Assets/favicon-16x16.png";

const SignUp = () => {
  const [btnColor, setBtnColor] = useState("submit");
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [meter, setMeter] = useState();
  const [password, setPassword] = useState();
  const [userData, setUserData] = useState(false);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handleMeterChange = (e) => {
    setMeter(e.target.value);
  };
  const handleOnclick = () => {
    setBtnColor("submit gray");
    setUserData(true);
  };
  return (
    <div>
      {userData ? (
        <div className="userdata-container">
          <div className="userdata">{`Name: ${name}`}</div>
          <div className="userdata">{`Email: ${email}`}</div>
          <div className="userdata">{`Password: ${password}`}</div>
          <div className="userdata">{`Meter Reading: ${meter}`}</div>
        </div>
      ) : (
        <div className="container">
          <div className="header">
            <div className="text">Energy Dashboard Sign up</div>
            <div className="underline"></div>
          </div>
          <div className="inputs">
            <div className="input">
              <img src={User_Person} alt="" />
              <input
                type="text"
                placeholder="Name"
                value={name}
                onChange={handleNameChange}
              />
            </div>
            <div className="input">
              <img src={User_Email} alt="" />
              <input
                type="email"
                placeholder="Email ID"
                value={email}
                onChange={handleEmailChange}
              />
            </div>
            <div className="input">
              <img src={User_Password} alt="" />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={handlePasswordChange}
              />
            </div>
            <div className="input">
              <img src={User_meter} alt="" />
              <input
                type="number"
                placeholder="Meter units"
                value={meter}
                onChange={handleMeterChange}
              />
            </div>
          </div>
          <div className="submit-container">
            <div className={btnColor} onClick={handleOnclick}>
              Sign up
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SignUp;
