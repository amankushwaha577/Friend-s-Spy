import React from "react";
import Posts from "../post/Posts";
import "./Home.css"; // Importing the SCSS file

const Home = () => (
  <div className="home-container">
    <div className="jumbotron jumbotron-custom">
      <h1 className="font-weight-bold jumbotron-title">FRIEND'S SPY</h1>
      <p className="lead jumbotron-lead">Let's connect to the world together</p>
    </div>

    <div className="container container-custom">
      <Posts />
    </div>
  </div>
);

export default Home;
