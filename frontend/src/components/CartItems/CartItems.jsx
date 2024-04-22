import React, { useContext, useEffect, useState } from "react";
import { Icon } from "@iconify/react";
import removeIcon from "@iconify-icons/icons8/trash";
import { ShopContext } from "../../Context/ShopContext";
import "../CartItems/CartItems.css";

export default function CartItems() {
  const {
    all_products,
    cartItems,
    addToCart,
    removeFromCart,
    removeAllCart,
    getPromoDiscount,
    getTotalCartAmount,
    getTotalTaxAmount,
    getSubtotal,
  } = useContext(ShopContext);

  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);

  // Function to recalculate discount whenever cart items change
  const updateDiscount = () => {
    const promoDiscount = getPromoDiscount(promoCode);
    setDiscount(promoDiscount);
  };

  useEffect(()=>{
    updateDiscount();
  },[cartItems])


  const handleApplyPromo = () => {
    const promoDiscount = getPromoDiscount(promoCode);
    setDiscount(promoDiscount);
  };

  const handleRemoveFromCart = (productId) => {
    removeAllCart(productId);
    updateDiscount();
  };

  const handleTotal = ()=>{
    const subtotal = getSubtotal() - discount
    return parseFloat(subtotal.toFixed(2));
  }

  return (
    <div className="cartItems">
      <div className="cartItem-format-main title-section">
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
                  <button
                    className="cartItems-button-addRemove"
                    onClick={() => {
                      addToCart(e.id);
                      updateDiscount();
                    }}>
                    +
                  </button>
                  <button className="cartItems-quantity">
                    {cartItems[e.id]}
                  </button>
                  <button
                    className="cartItems-button-addRemove"
                    onClick={() => {
                      removeFromCart(e.id);
                      updateDiscount();
                    }}>
                    -
                  </button>
                </div>
                <p>${(e.new_price * cartItems[e.id]).toFixed(2)}</p>
                <Icon
                  className="cartItems-remove-icon"
                  icon={removeIcon}
                  style={{ fontSize: "30px", margin: "0 30px", color: "red" }}
                  onClick={() => {
                    handleRemoveFromCart(e.id);
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
            <p>Discount</p>
            <p>${discount}</p>
          </div>
          <div className="cartItems-total-item">
            <h3>Total</h3>
            <h3>${handleTotal()}</h3>
          </div>
          <button>Checkout</button>
        </div>
        <div className="cartItems-promocode">
          <h1>Promo Code</h1>
          <div className="cartItems-promobox">
            <input
              type="text"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              placeholder="Enter Promo Code"
            />
            <button onClick={handleApplyPromo}>Apply</button>
          </div>
        </div>
      </div>
    </div>
  );
}
