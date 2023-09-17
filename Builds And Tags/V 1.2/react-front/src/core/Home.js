import React from "react";
import Posts from "../post/Posts";

import "../css/homepageJumbotron.css"; // Import the CSS file

const Home = () => (
  <div style={{ marginTop: "60px" }}>
    <div className="jumbotron">
      <h1
        className="font-weight-bold"
        style={{ fontFamily: "Lucida Handwriting" }}
      >
        FRIEND'S SPY
      </h1>

      <p className="lead">Let's connect to the world together</p>

      <button className="btn">Get Started</button>
    </div>

    <div className="container">
      <Posts />
    </div>
  </div>
);

export default Home;
