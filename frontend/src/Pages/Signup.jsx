import "../styles/LoginSignup.css"
import { Link } from "react-router-dom";

export default function LoginSignup() {
  return (
    <div className="loginSignup">
      <div className="loginSignup-container">
        <h1>Sign Up</h1>
        <div className="loginSignup-fields">
          <input type="text" placeholder="First Name" />
          <input type="text" placeholder="Last Name" />
          <input type="text" placeholder="Username" />
          <input type="text" placeholder="Email Address" />
          <input type="password" placeholder="Password" />
        </div>
        <button>Continue</button>
        <p className="loginSignup-login">
          Already have an account? <Link to="/login"><span>Login here</span></Link>
        </p>
        <div className="loginSignup-agree">
          <input type="checkbox" name="" id="" />
          <p>By continuing, I agree to the terms of the use & privacy policy.</p>
        </div>
      </div>
    </div>
  );
}
