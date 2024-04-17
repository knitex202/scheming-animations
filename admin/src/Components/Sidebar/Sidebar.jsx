import React from 'react'
import "./Sidebar.css"
import {Link} from'react-router-dom'
import add_product_icon from '../../assets/addproducticon.png'
import product_list_icon from '../../assets/productlist.png'
import promo_icon from "../../assets/promo-icon.png"

export default function Sidebar() {
  return (
    <div className="Sidebar">
        <Link to={'/addproduct'} style={{textDecoration: 'none'}}>
            <div className="sidebar-item">
                <img src={add_product_icon} alt="add product" />
                <p>Add Product</p>
            </div>
        </Link>
        <Link to={'/listproduct'} style={{textDecoration: 'none'}}>
        <div className="sidebar-item">
                <img src={product_list_icon} alt="list product" />
                <p>Product List</p>
            </div>
        </Link>
        <Link to={'/promotion'} style={{textDecoration: 'none'}}>
            <div className="sidebar-item">
                <img src={promo_icon} alt="Promotions" />
                <p>Promotions</p>
            </div>
        </Link>
    </div>
  )
}
