import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import { BsCart2 } from "react-icons/bs";
import "../styles/Navbar.css";

function Navbar() {
  const [isMobile, setIsMobile] = useState(false);
  return (
    <nav className="navbar">
      <h3 className="logo">
        <NavLink to="/" className="logo-text">
          OtaKu<strong>CLuB</strong>
        </NavLink>
      </h3>
      <ul
        className={isMobile ? "nav-links-mobile" : "nav-links"}
        onClick={() => setIsMobile(false)}
      >
        <NavLink to="/" className="home">
          <li>Home</li>
        </NavLink>

        <NavLink to="/products" className="products">
          <li>Products</li>
        </NavLink>

        <NavLink to="/cart" className="cart">
          <li>
            <BsCart2 />
          </li>
        </NavLink>
      </ul>
      <button
        className="mobile-menu-icon"
        onClick={() => setIsMobile(!isMobile)}
      >
        {isMobile ? (
          <i className="fas fa-times"></i>
        ) : (
          <i className="fas fa-bars"></i>
        )}
      </button>
    </nav>
  );
}

export default Navbar;
