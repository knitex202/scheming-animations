import React from 'react'
import { Icon } from "@iconify/react";


import "./Navbar.css"

function Navbar() {
  return (
    <div className="navbar">
      <div className="navbar-left-container">
      <h2>Scheming <span>Animations</span></h2>
      <h3>Admin Panel</h3>
      </div>
      <div className="navbar-right-container">
      <Icon icon="mdi-light:account" style={{ fontSize: "30px", marginRight: "80px" }}/>
      </div>
    </div>
  )
}

export default Navbar