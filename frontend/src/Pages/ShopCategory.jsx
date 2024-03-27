import { useContext } from "react";
import "../styles/ShopCategory.css";
import { ShopContext } from "../Context/ShopContext";
import Item from "../Item/Item"

export default function ShopCategory(props) {
  const { all_products } = useContext(ShopContext);
  return (
    <div className="shop-category">
      <div className="shopcategory-indexSort">
        <p>
          <span>Showing 1-12</span> out of 36 products
        </p>
        <div className="shopcategory-sort">
          Sort by{" "}
          <span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 24 24">
              <path fill="currentColor" d="m7 10l5 5l5-5z" />
            </svg>
          </span>
        </div>
      </div>
      <div className="shopcategory-products">
        {all_products.map((item)=> {
            if (props.category=== item.category) {
                return <Item
                key={item.id}
              id={item.id}
              name={item.name}
              image={item.image}
              new_price={item.new_price}
              old_price={item.old_price}
                />
            }
            else {
              return null;
            }
        })}
      </div>
      <div className="shopcategory-loadMore">
        Explore More
      </div>
    </div>
  );
}
