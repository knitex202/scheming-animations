import React, { useState } from "react";
import "../ListPromo/ListPromo.jsx"
import "./Promotion.css";
import ListPromo from "../ListPromo/ListPromo.jsx";

function Promotion() {

  const [promotion, setPromotion] = useState({
    name: "",
    code: "",
    discount: "",
  });

  const changeHandler = (e) => {
    setPromotion({ ...promotion, [e.target.name]: e.target.value });
  };

  const promo = async () => {
    console.log("promotion function executed", promotion);
    try {
      const response = await fetch("http://localhost:4000/addpromotion", {
        // This should be the endpoint for creating a promotion, not adding promotion
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(promotion),
      });
      const responseData = await response.json();
      responseData.success?alert("Promotion Added"):alert("Failed to add Promotion");
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while creating promotion");
    }
  };
  return (
    <div className="Promotion">
      <div className="promotion-itemfield">
        <p>Promotion Name</p>
        <input
          value={promotion.name}
          onChange={changeHandler}
          type="text"
          name="name"
          placeholder="Type here"
        />
      </div>
      <div className="promotion-itemfield">
        <p>Create Promotion Code</p>
        <input
          value={promotion.code}
          onChange={changeHandler}
          type="text"
          name="code"
          placeholder="Type here"
        />
      </div>
      <div className="promotion-itemfield">
        <p>Promotion Discount Percentage</p>
        <input
          value={promotion.discount}
          onChange={changeHandler}
          type="number"
          name="discount"
          placeholder="Type here"
        />
      </div>
      <button className="add-promo" onClick={promo}>Create</button>
      <div className="promotionList">
        <ListPromo/>
      </div>
    </div>
  );
}

export default Promotion;
