import React, { useEffect, useState } from 'react'
import "./ListPromo.css"

import trashIcon from"../../assets/trash-icon.png"

function ListPromo() {
    const [promotion, setPromotion] = useState([]);


    const fetchInfo = async () => {
        await fetch("http://localhost:4000/allpromos")
          .then((res) => res.json())
          .then((data) => {
            setPromotion(data);
          });
      };
    
      useEffect(()=>{
        fetchInfo();
      },[])

    const remove_product = async (id) => {
        await fetch("http://localhost:4000/removepromo", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            id: id
          })
        })
        await fetchInfo();
      }

  return (
    <div className="ListPromo">
        <h1>All Promotion list</h1>
        <div className="ListPromo-format-main">
            <p>Name</p>
            <p>Code</p>
            <p>Discount</p>
            <p>Remove</p>
        </div>
        
        <div className="listAll-promo">
        {promotion.map((promotion,index)=> {
                return <>
                    <div key={index} className="ListPromo-format-main ListPromo-format">
                    <p>{promotion.name}</p>
                    <p>{promotion.code}</p>
                    <p>{promotion.discount}%</p>
                    <img src={trashIcon} onClick={() =>{remove_product(promotion.id)}}  className="listproduct-remove-icon" />
                    </div>
                </>
            })}
        </div>
            
            
        
    </div>
  )
}

export default ListPromo