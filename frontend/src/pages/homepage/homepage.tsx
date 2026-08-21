// import React from "react";
import "./homepage.css";
import { greetUser } from "../../api/api";

function Homepage() {
  return (
    <div className="home-page">
      <nav className="navbar">
        <h2 className="logo">FastAPI Testing Input</h2>

        <div className="nav-links">
          <a href="#home">Home</a>
          <a href="#testing">Testing Inputs</a>
        </div>
      </nav>

      <main id="home" className="hero">
        <div className="hero-content">
          <h1>Welcome to Goa Shingham!</h1>

          <p>
            This is for testing FASTAPI with React for Fun and Learning!
          </p>

          <div>
            <button className="hero-button" onClick={() => greetUser("/user_input")}>
              Get Started
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default Homepage;