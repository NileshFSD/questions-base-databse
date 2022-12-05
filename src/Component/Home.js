import React from "react";
import { Link } from "react-router-dom";
import { FaArrowRight } from "react-icons/fa";

const Home = () => {
  return (
    <div className="home-container">
      <div className="home">
        <div>
          <h2> Ask any question & thoughts </h2>
        </div>
        <div>
          <Link className="link" to="/register">
            <div className="register">
              {" "}
              Get started <FaArrowRight />
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home;
