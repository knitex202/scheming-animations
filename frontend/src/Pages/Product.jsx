import { useContext } from "react";
import {ShopContext} from "../Context/ShopContext";
import { useParams } from "react-router-dom";
import Breadcrumb from "../components/Breadcrumbs/Breadcrumb";
import ProductDisplay from "../components/ProductDisplay/ProductDisplay";


export default function Product() {
  const {all_products} = useContext(ShopContext)
  const {productId} = useParams();
  const product = all_products.find((e) => e.id === Number(productId))
  return (
    <div>
      <Breadcrumb product={product} />
      <ProductDisplay product={product}/>
    </div>
  )
}
