import React, { useState, useEffect } from "react";
import { useContext } from "react";
import "./ProductDisplay.css";
import "../ProductDisplay/ProductDisplay.css";
import { ShopContext } from "../../Context/ShopContext";

export default function ProductDisplay(props) {
  const { addToCart } = useContext(ShopContext);
  const { product } = props;
  const [rating, setRating] = useState(0);

  const handleStarClick = (starValue) => {
    setRating(starValue);
  };
  return (
    <div className="ProductDisplay">
      <div className="productdisplay-left">
        <div className="productdisplay-img">
          <img
            className="productdisplay-main-img"
            src={product?.image}
            width={290}
            alt=""
          />
        </div>
        <h2>{product?.name}</h2>
        <div className="productdisplay-price">
          <h4>
            from <span>{product?.new_price}</span>
          </h4>
        </div>
        <div className="rating-stars">
      {[1, 2, 3, 4, 5].map((starValue) => (
        <span
          key={starValue}
          className={starValue <= rating ? "star-filled" : "star-empty"}
          onClick={() => handleStarClick(starValue)}
        >
          &#9733;
        </span>
      ))}
      <p>Current Rating: {rating}</p>
    </div>
  
      </div>
      <div className="productdisplay-right">
        <h1>{product?.name}</h1>
        <input type="text" placeholder="preferred @username" />

        <div className="productdisplay-buttons-container">
          <button
            className="productdisplay-addtocart-button"
            onClick={() => {
              addToCart(product?.id);
            }}>
            Add to Cart
          </button>
          <button className="productdisplay-buynow-button">Buy Now</button>
        </div>

        <div className="productdisplay-privacypolicy">
          <p>
            Product Info: A 7 second animation to promote your Instagram
            Channel! Add it to your streams Add it to your editing software
            You'll get a: MOV File (Transparent) MP4 File (Green Screen) Webm
            File (To add to streams) One Free Revision Sound Effects Included as
            well no need to add more! Simple as in dragging the files in your
            preferred software. Once Purchased READ BELOW PLEASE! PLEASE USE THE
            SAME EMAIL YOU USED TO PURCHASE BEFORE CONTACTING ME! Send me your
            Channel and Any Logo you wanna use CONTACT ME SECTION DOWN BELOW
          </p>
        </div>
      </div>
    </div>
  );
}
