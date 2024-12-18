import React from "react";
// import SignUp from './Components/Login-signup/LoginSignUp'
import Navbar from "./Components/Navbar/Navbar";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignUp from "./Components/Signup/SignUp";
import Login from "./Components/Login/Login";

const App = () => {
  return <div>
    <Navbar/>
    <BrowserRouter>      
      <Routes>
        <Route path="/signup" element={<SignUp/>}></Route>
        <Route path="/login" element={<Login/>}></Route>
      </Routes>
    </BrowserRouter>
  </div>;
};

export default App;
