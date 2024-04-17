import "../styles/Nav.css";
import { Icon } from "@iconify/react";
import shopBag from "@iconify-icons/icons8/shopping-cart";
import user_icon from "@iconify-icons/icons8/gender-neutral-user";
import logout_icon from "@iconify-icons/icons8/remove-user";
import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { ShopContext } from "../Context/ShopContext";

export default function Nav() {
  const [showMiniMenu, setShowMiniMenu] = useState(false);
  const [underline, setUnderline] = useState("");
  const { getTotalCartItems } = useContext(ShopContext);

  const cartItem = (
    <span className="cart-counter">
      <p>{getTotalCartItems()}</p>
    </span>
  );

  const showCartItemsHandler = () => {
    if (getTotalCartItems() > 0) {
      return true;
    }
    return false;
  };

  const miniMenu = (
    <div
      className={`shop-menu ${showMiniMenu ? "show" : ""}`}
      onMouseOver={() => setShowMiniMenu(true)}
      onMouseLeave={() => setShowMiniMenu(false)}>
      <ul onMouseLeave={() => setUnderline("")}>
        <li onMouseOver={() => setUnderline("animations")}>
          {" "}
          <Link to="/animations">
            Animations{underline === "animations" ? <hr /> : ""}
          </Link>
        </li>
        <li onMouseOver={() => setUnderline("presets")}>
          <Link to="/presets">
            Presets{underline === "presets" ? <hr /> : ""}
          </Link>
        </li>
        <li onMouseOver={() => setUnderline("overlays")}>
          <Link to="/overlays">
            Overlays{underline === "overlays" ? <hr /> : ""}
          </Link>
        </li>
      </ul>
    </div>
  );

  return (
    <nav>
      <div className="left-container">
        <p>
          <Link to="/">
            Scheming <span>Animations</span>
          </Link>
        </p>
      </div>
      <div className="right-container">
        {miniMenu}
        <ul>
          <li
            onMouseOver={() => setShowMiniMenu(true)}
            onMouseLeave={() => setShowMiniMenu(false)}>
            <Link to="/shop">Shop</Link>
          </li>
          {/* <li>
            <Link to="/contact">Contact</Link>
          </li> */}
        </ul>

        {localStorage.getItem("auth-token") ? (
          <Icon
            icon={logout_icon}
            style={{ fontSize: "30px", margin: "0 5px 0 30px", cursor: "pointer" }}
            onClick={() => {
              localStorage.removeItem("auth-token");
              window.location.replace("/");
            }}
          />
        ) : (
          <Link to="/login">
            <Icon
              icon={user_icon}
              style={{ fontSize: "30px", margin: "0 5px 0 30px" }}
            />
          </Link>
        )}

        {localStorage.getItem("auth-token") ? <p>Logout</p> : <p>Login</p> }

        

        <div className="cart-container">
          <Link to="/cart">
            <Icon
              className="shoppingBag"
              icon={shopBag}
              style={{ fontSize: "30px", margin: "0 30px" }}
            />
          </Link>
          {showCartItemsHandler() ? cartItem : ""}
        </div>
      </div>
    </nav>
  );
}
