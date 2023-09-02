import React from "react";
import Posts from "../post/Posts";

const Home = () => (
  <div>
    
    <div className="jumbotron">
      <h2 className="font-weight-bold">
        FRIEND'S SPY
      </h2>
      <p className="lead">
      Let's connect to the world together
      </p>
    </div>
    <div className="container">
      <Posts />
    </div>
  </div>
);

export default Home;
