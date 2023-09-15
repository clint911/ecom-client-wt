import React from "react";
import { Route, Routes, NavLink } from "react-router-dom";

export default function NavBar() {
  return (
    <div className="NavBar">
      <span className="pre-nav">Summer Sale For All Swim Suits And Free Express Delivery - OFF 50%! Shop Now</span>
      <span className="nav-logo">Exclusive</span>

<nav>      
     <div className="nav-items">
      <NavLink className="nav-link" to="/">Home</NavLink>
      <NavLink className="nav-link" to="/Contact">Contact</NavLink>
      <NavLink className="nav-link" to="/About">About</NavLink>
      <NavLink className="nav-link" to="/Sign Up">Sign Up</NavLink>
          < input className="search-box" type="text" placeholder="what are you looking for" />
        </div>
      </nav>

    </div>
  )
}
