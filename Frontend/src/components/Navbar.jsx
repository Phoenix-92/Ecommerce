import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { BsCart2 } from "react-icons/bs";
import "../styles/Navbar.css";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "react-bootstrap";
import { removeUserId } from "../redux/actions/userActions";

function Navbar() {
  const navigate = useNavigate();
  const user = useSelector((state) => state.user);
  const { firstName } = user;

  const dispatch = useDispatch();

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
        <div className="fname">
          <li>{firstName}</li>
        </div>
        <Button
          className="logout"
          onClick={() => {
            dispatch(removeUserId());
            navigate("/");
          }}
        >
          <li>Log Out</li>
        </Button>
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
