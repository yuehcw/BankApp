import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const Dashboard = () => {
  const [balance, setBalance] = useState(0);

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const response = await axios.get(
            `${process.env.REACT_APP_API_URL}/api/users/balance`,
            {
              headers: {
                Authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            },
        );
        setBalance(parseFloat(response.data.balance));
      } catch (error) {
        console.error(
            "Error fetching balance:",
            error.response ? error.response.data : error.message,
        );
      }
    };

    fetchBalance();
  }, []);

  return (
      <div className="container">
        <h2>Your balance is ${balance.toFixed(2)}</h2>
        <div className="button-row">
          <Link to="/deposit">
            <button className="nav-button">Deposit</button>
          </Link>
          <Link to="/withdraw">
            <button className="nav-button">Withdraw</button>
          </Link>
        </div>
      </div>
  );
};

export default Dashboard;
