import React from "react";
import "./Admin.css";
import Sidebar from "../../Components/Sidebar/Sidebar";
import { Routes,Route } from "react-router-dom";
import AddProduct from "../../Components/AddProduct/AddProduct";
import ListProduct from "../../Components/ListProduct/ListProduct";
import Promotion from "../../Components/Promotion/Promotion";

function Admin() {
  return <div className="admin">
    <Sidebar/>
    <Routes>
      <Route path="/addproduct" element={<AddProduct/>}/>
      <Route path="/listproduct" element={<ListProduct/>}/>
      <Route path="/promotion" element={<Promotion/>}/>
    </Routes>
  </div>;
}

export default Admin;
