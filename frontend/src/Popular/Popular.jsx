import { useEffect, useState } from "react";
import Item from "../Item/Item";
import "./Popular.css";

export default function Popular() {
  const [new_collection,setNew_collection] = useState([])

  useEffect(()=>{
    fetch("http://localhost:4000/newcollections")
    .then((response)=> response.json())
    .then((data)=>{
      setNew_collection(data)
    })
  })

  return (
    <div className="Popular">
      <h1>Just Released</h1>
      <hr />
      <div className="popular-item">
        {new_collection.map((item) => {
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
