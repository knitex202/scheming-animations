import "../styles/LoginSignup.css"
import { Link } from "react-router-dom";

export default function LoginSignup() {
  return (
    <div className="loginSignup">
      <div className="loginSignup-container">
        <h1>Log in</h1>
        <div className="loginSignup-fields">
          <input type="text" placeholder="Username" />
          <input type="password" placeholder="Password" />
        </div>
        <button>Continue</button>
        <p className="loginSignup-login">
          Create an account? <Link to="/signup"><span>Register here</span></Link>
        </p>
      </div>
    </div>
  );
}
