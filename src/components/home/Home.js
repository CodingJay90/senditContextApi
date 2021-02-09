import React from "react";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  return (
    <div>
      <div className="conatiner">
        <div className="jumbotron">
          <div className="landing-inner">
            <h1>SendIt .</h1>
            <h5>
              The best delivery website on the internet, with over 5k users and
              over 100k deliveries since 2016
            </h5>
            <Link to="/userDashboard" className="btn btn-default">
              Get Started
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
