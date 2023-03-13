import React from "react";
import "../styles/Home.css";
import { NavLink } from "react-router-dom";

function Home() {
  return (
    <div className="home-page">
      <div className="content">
        <h3>Wear the best.</h3>
        <p>Shopping is a bit of a relaxing hobby for me,</p>
        <p>which is sometimes troubling for the bank balance.</p>
        <button>
          <NavLink to="/products" className="nav-link">
            Shop Now
          </NavLink>
        </button>
      </div>
    </div>
  );
}

export default Home;
