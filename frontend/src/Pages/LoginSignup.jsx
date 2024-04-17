import { useState } from "react";
import "../styles/LoginSignup.css";
import { Link } from "react-router-dom";

export default function LoginSignup() {
  const [state, setState] = useState("Login");
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    username: "",
    password: "",
  });

  const login = async () => {
    console.log("login function executed", formData);
    let responseData;
    await fetch("http://localhost:4000/login",{
      method: "POST",
      headers: {
        Accept: "application/form-data",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    }).then((response)=> response.json()).then((data)=>responseData=data)

    if(responseData.success){
      localStorage.setItem("auth-token",responseData.token);
      window.location.replace("/")
    }
    else {
      alert(responseData.errors)
    }
  };

  const signup = async () => {
    console.log("signup function executed", formData);
    let responseData;
    await fetch("http://localhost:4000/signup",{
      method: "POST",
      headers: {
        Accept: "application/form-data",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    }).then((response)=> response.json()).then((data)=>responseData=data)

    if(responseData.success){
      localStorage.setItem("auth-token",responseData.token);
      window.location.replace("/")
    }
    else {
      alert(responseData.errors)
    }
  };

  const changeHandler = (e) => {
    event.preventDefault();
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="loginSignup">
      <div
        className="loginSignup-container" style={{height: state==="Login"? 400: 600} }>
        <h1>{state}</h1>
        <div className="loginSignup-fields">
          {state === "Sign Up" ? (
            <input
              name="firstname"
              value={formData.firstname}
              onChange={changeHandler}
              type="text"
              placeholder="First Name"
            />
          ) : (
            <></>
          )}
          {state === "Sign Up" ? (
            <input
              name="lastname"
              value={formData.lastname}
              onChange={changeHandler}
              type="text"
              placeholder="Last Name"
            />
          ) : (
            <></>
          )}
          {state === "Sign Up" ? (
            <input
              name="email"
              value={formData.email}
              onChange={changeHandler}
              type="text"
              placeholder="Email Address"
            />
          ) : (
            <></>
          )}
          <input
            name="username"
            value={formData.username}
            onChange={changeHandler}
            type="text"
            placeholder="Username"
          />
          <input
            name="password"
            value={formData.password}
            onChange={changeHandler}
            type="password"
            placeholder="Password"
          />
        </div>
        <button
          onClick={() => {
            state === "Login" ? login() : signup();
          }}>
          Continue
        </button>
        {state === "Sign Up" ? (
          <p className="loginSignup-login">
            Already have an account?{" "}
            <span
              onClick={() => {
                setState("Login");
              }}>
              Login Here
            </span>
          </p>
        ) : (
          <p className="loginSignup-login">
            New User?{" "}
            <span
              onClick={() => {
                setState("Sign Up");
              }}>
              Create Account
            </span>
          </p>
        )}
        {state === "Sign Up" ? (
          <div className="loginSignup-agree">
            <input type="checkbox" name="" id="" />
            <p>
              By continuing, I agree to the terms of the use & privacy policy.
            </p>
          </div>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
