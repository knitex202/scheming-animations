import { useEffect, useState } from "react";
import Item from "../Item/Item";
import "../styles/Shop.css";

export default function Shop() {
  const[all_products,setAll_products] = useState([])
  useEffect(()=>{
    fetch("http://localhost:4000/allproducts")
    .then((response)=> response.json())
    .then((data)=>{
      setAll_products(data)
    })
  },[])
  return (
    <div className="Shop">
      <h1>Store</h1>
      <hr />
      <div className="shop-item">
        {all_products.map((item) => {
          return (
            <Item
              key={item.id}
              id={item.id}
              name={item.name}
              image={item.image}
              new_price={item.new_price}
              old_price={item.old_price}
            />
          );
        })}
      </div>
    </div>
  );
}
