import Item from "../Item/Item";
import { all_products } from "../data";
import "./Popular.css";

export default function Popular() {
  return (
    <div className="Popular">
      <h1>Popular Animations</h1>
      <hr />
      <div className="popular-item">
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
