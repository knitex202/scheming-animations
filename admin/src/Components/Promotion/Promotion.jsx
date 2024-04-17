import React, { useState } from "react";
import "./Promotion.css";

function Promotion() {
  const [promotion, setPromotion] = useState({
    name: "",
    code: "",
    discount: 0,
  });

  const changeHandler = (e) => {
    setPromotion({ ...promotion, [e.target.name]: e.target.value });
  };

  const addPromotion = async (promotion) => {
    console.log(promotion);
    let responseData;
    let promo = promotion;

    let formData = new FormData();
    formData.append("promotion");

    await fetch("http://localhost:4000/upload", {
      method: "POST",
      headers: {
        Accept: "application/json",
      },
      body: formData,
    })
      .then((resp) => resp.json())
      .then((data) => {
        responseData = data;
      });

    if (responseData.success) {
      promo.image = responseData.image_url;
      console.log(promo);
      await fetch("http://localhost:4000/addpromotion", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(promo),
      })
        .then((resp) => resp.json())
        .then((data) => {
          data.success ? alert("Promotion Added") : alert("Failed");
        });
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
        <p> Create Promotion Code</p>
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
          type="text"
          name="discount"
          placeholder="Type here"
        />
      </div>
      <button
        onClick={() => {
          addPromotion();
        }}>
        Create
      </button>
    </div>
  );
}

export default Promotion;
