import { Link } from "react-router-dom";
import "./Item.css";
import { useContext, useState } from "react";
import { ShopContext } from "../Context/ShopContext";

export default function Item(props) {
  const { addToCart } = useContext(ShopContext);
  const [inCart, setInCart] = useState(false);

  const addToCartHandler = () => {
    setInCart(true);
    setTimeout(() => {
      setInCart(false);
    }, 1000);
  };

  return (
    <div className="Item">
      <div className="item-container" key={props.id}>
        <div className="image-container">
          <Link to={`/product/${props.id}`}>
            <img src={props.image} width={290} height={180} alt="Product" />
          </Link>
        </div>
        <h3>{props.name}</h3>
        <div className="item-prices">
          <h4>
            From <span className="productPrice">${props.new_price}</span>{" "}
          </h4>
          <h5>
            was <span className="oldPrice">${props.old_price}</span>
          </h5>
        </div>
        <button
          onClick={() => {
            addToCart(props?.id);
            addToCartHandler();
          }}
          disabled={inCart}>
          {inCart? 'Added to Cart' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
}
