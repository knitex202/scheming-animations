import React, { useContext } from "react";
import { Icon } from "@iconify/react";
import removeIcon from "@iconify-icons/icons8/trash";
import { ShopContext } from "../../Context/ShopContext";
import "../CartItems/CartItems.css";

export default function CartItems() {
  const { all_products, cartItems, addToCart, removeFromCart, removeAllCart, getTotalCartAmount, getTotalTaxAmount, getSubtotal } = useContext(ShopContext);
  return (
    <div className="cartItems">
      <div className="cartItem-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />
      {all_products.map((e) => {
        if (cartItems[e.id] > 0) {
          return (
            <div key={e.id}>
              <div className="cartItems-format cartItem-format-main">
                <div className="cartItems-format-image-container">
                  <img src={e.image} alt="" className="cartIcon-product-icon" />
                </div>
                <p>{e.name}</p>
                <p>${e.new_price}</p>
                <div className="cartItems-button-container">
                  <button className="cartItems-button-addRemove"
                  onClick={()=>{addToCart(e.id)}}>+</button>
                <button className="cartItems-quantity">
                  {cartItems[e.id]}
                </button>
                <button className="cartItems-button-addRemove"
                onClick={()=>{removeFromCart(e.id)}}>-</button>
                </div>
                <p>${e.new_price * cartItems[e.id]}</p>
                <Icon
                  className="cartItems-remove-icon"
                  icon={removeIcon}
                  style={{ fontSize: "30px", margin: "0 30px", color: "red" }}
                  onClick={() => {
                    removeAllCart(e.id);
                  }}
                />
              </div>
              <hr />
            </div>
          );
        }
        return null;
      })}
      <div className="cartItems-down">
        <div className="cartItems-total">
          <h1>Cart Total</h1>
          <div className="cartItems-total-item">
            <p>Subtotal</p>
            <p>${getTotalCartAmount()}</p>
          </div>
          <div className="cartItems-total-item">
            <p>Taxes</p>
            <p>${getTotalTaxAmount()}</p>
          </div>
          <div className="cartItems-total-item">
            <h3>Total</h3>
            <h3>${getSubtotal()}</h3>
          </div>
          <button>Checkout</button>
        </div>
        <div className="cartItems-promocode">
          <h1>Promo Code</h1>
          <div className="cartItems-promobox">
            <input type="text" placeholder="Enter Promo Code" />
            <button>Apply</button>
          </div>
        </div>
      </div>
    </div>
  );
}
