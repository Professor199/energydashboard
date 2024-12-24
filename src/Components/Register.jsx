import React, { useEffect, useRef, useState } from "react";
import {
  faCheck,
  faTimes,
  faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import axios from './Axios/axios'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const USER_REGEX = /^[A-Za-z][A-Za-z0-9_ ]{3,23}$/;
const PWD_REGEX =
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,24}$/;
const REGISTER_URL='/register'


const Register = () => {
  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState("");
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [pwd, setPwd] = useState("");
  const [validPwd, setValidPwd] = useState(false);
  const [pwdFocus, setPwdFocus] = useState(false);

  const [matchPwd, setMatchPwd] = useState("");
  const [validMatch, setValidMatch] = useState(false);
  const [matchFocus, setMatchFocus] = useState(false);

  const [errMsg, setErrMsg] = useState("");
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, []);

  useEffect(() => {
    const result = USER_REGEX.test(user);
    console.log(result);
    console.log(user);
    setValidName(result);
  }, [user]);

  useEffect(() => {
    const result = PWD_REGEX.test(pwd);
    console.log(result);
    console.log(pwd);
    setValidPwd(result);
    const match = pwd === matchPwd;
    setValidMatch(match);
  }, [pwd, matchPwd]);

  useEffect(() => {
    setErrMsg(" ");
  }, [user, pwd, matchPwd]);

  const handleSubmit=async(e)=>{
    e.preventDefault()
    const v1=USER_REGEX.test(user);
    const v2=PWD_REGEX.test(pwd);
    if(!v1 || !v2){
        setErrMsg("Invalid Entry")
        return;
    }
   console.log(user,pwd);
   try {
    const response =await axios.post(REGISTER_URL,JSON.stringify(user,pwd),{
      headers:{'content-type':'application/json'},
      withCredentials:true
    })
    console.log(response?.data)
    setSuccess(true)
   } catch (err) {
    if(!err?.response){
      setErrMsg('No server response')
    } else if(err?.response?.status===409){
      setErrMsg('Username taken')
    }else{
      setErrMsg('Resgistration failed')
    }
    errRef.current.focus()
   }
  }

  return (
    <>
    {success?(
        <section>
        <h1>Success!</h1>
        <p>
            <a href="#">Sign in</a>
        </p>
        </section>
    ):
    <section>
      <p
        ref={errRef}
        className={errMsg ? "errmsg" : "offscreen"}
        aria-live="assertive"
      >
        {errMsg}
      </p>
      <h1 style={{marginLeft:'80px'}}>Register</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">
          Username:
          <span className={validName ? "valid" : "hide"}>
            <FontAwesomeIcon icon={faCheck} />
          </span>
          <span className={validName || !user ? "hide" : "invalid"}>
            <FontAwesomeIcon icon={faTimes} />
          </span>
        </label>
        <input
          type="text"
          id="username"
          ref={userRef}
          autoComplete="off"
          value={user}
          onChange={(e) => {
            setUser(e.target.value);
          }}
          required
          aria-invalid={validName ? "false" : "true"}
          aria-describedby="uidnote"
          onFocus={() => {
            setUserFocus(true);
          }}
          onBlur={() => {
            setUserFocus(false);
          }}
        />
        <p
          id="uidnote"
          className={
            userFocus && user && !validName ? "instructions" : "offscreen"
          }
        >
          <FontAwesomeIcon icon={faInfoCircle} />
          4 to 24 characters.
          <br />
          Must begin with a letter. <br />
          letter, numbers, underscores, hyphens allowed.
        </p>
        <label htmlFor="password">
          Password:
          <span className={validPwd ? "valid" : "hide"}>
            <FontAwesomeIcon icon={faCheck} />
          </span>
          <span className={validPwd || !pwd ? "hide" : "invalid"}>
            <FontAwesomeIcon icon={faTimes} />
          </span>
        </label>
        <input
          type="password"
          id="password"
          onChange={(e) => {
            setPwd(e.target.value);
          }}
          required
          aria-invalid={validPwd ? "false" : "true"}
          aria-describedby="pwdnote"
          onFocus={() => {
            setPwdFocus(true);
          }}
          onBlur={() => {
            setPwdFocus(false);
          }}
        />
        <p
          id="pwdnote"
          className={pwdFocus && !validPwd ? "instructions" : "offscreen"}
        >
          <FontAwesomeIcon icon={faInfoCircle} />
          8 to 24 characters.
          <br />
          Must include uppercase and lowercase letters, a number and a special
          character <br />
          Allowed special characters:
          <span aria-label="excalamtion mark">!</span>
          <span aria-label="at symbol">@</span>
          <span aria-label="hashtag">#</span>
          <span aria-label="dollar sign">$</span>
          <span aria-label="percent">%</span>
        </p>

        <label htmlFor="confirm_pwd">
          Confirm Password:
          <span className={validMatch && matchPwd ? "valid" : "hide"}>
            <FontAwesomeIcon icon={faCheck} />
          </span>
          <span className={validMatch || !matchPwd ? "hide" : "invalid"}>
            <FontAwesomeIcon icon={faTimes} />
          </span>
        </label>
        <input
          type="password"
          id="confirm_pwd"
          onChange={(e) => {
            setMatchPwd(e.target.value);
          }}
          required
          aria-invalid={validMatch ? "false" : "true"}
          aria-describedby="confirmnote"
          onFocus={() => {
            setMatchFocus(true);
          }}
          onBlur={() => {
            setMatchFocus(false);
          }}
        />
        <p
          id="confirmnote"
          className={matchFocus && !validMatch ? "instructions" : "offscreen"}
        >
          <FontAwesomeIcon icon={faInfoCircle} />
          Must match the first password input field
        </p>

        <button
          disabled={!validName || !validPwd || !validMatch ? true : false}
        >
          Sign up
        </button>
        <p>
            Already registered here?<br/>
            <span className="line">
                <a href="#">Sign in</a>
            </span>
        </p>
      </form>
    </section>
}
    </>
  );
};

export default Register;
