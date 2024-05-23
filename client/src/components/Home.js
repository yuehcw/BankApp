import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const username = localStorage.getItem("username");
  const navigate = useNavigate();

  return (
    <div className="container">
      {username ? (
        <>
          <h2>Welcome to BankApp, {username}!</h2>
          <div className="nav-button-success">
            <Link to="/dashboard">
              <button className="nav-button">Go to Dashboard</button>
            </Link>
          </div>
        </>
      ) : (
        <>
          <h2>Welcome to BankApp</h2>
          <div className="home-container">
            <p>
              <button
                className="sign-in-button"
                onClick={() => navigate("/login")}
              >
                Sign in
              </button>
            </p>
            <p>
              or{" "}
              <Link to="/register" className="nav-link">
                create an account
              </Link>{" "}
              if you haven't registered yet.
            </p>
          </div>
        </>
      )}
    </div>
  );
};

export default Home;
