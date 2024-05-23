import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";

const Deposit = () => {
  const [amount, setAmount] = useState("");
  const [initialBalance, setInitialBalance] = useState(0);
  const [newBalance, setNewBalance] = useState(null);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBalance = async () => {
      try {
        const userId = localStorage.getItem("userId");
        if (!userId) {
          console.error("User ID not found in localStorage");
          return;
        }
        const response = await axios.get(
            `${process.env.REACT_APP_API_URL}/api/users/balance/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          },
        );
        const balance = parseFloat(response.data.balance);
        setInitialBalance(balance);
      } catch (error) {
        console.error("Error fetching balance:", error);
      }
    };
    fetchBalance();
  }, []);

  const handleAmountChange = (e) => {
    const value = e.target.value;
    setAmount(value);
    if (value === "") {
      setNewBalance(null);
      setError("");
    } else if (!isNaN(value) && parseFloat(value) >= 0) {
      setNewBalance(
        (parseFloat(initialBalance) + parseFloat(value)).toFixed(2),
      );
      setError("");
    } else {
      setNewBalance(null);
      setError("Invalid input, please enter a positive number");
    }
  };

  const handleDeposit = async () => {
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/api/users/deposit`,
        { amount },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        },
      );
      message.success(
        `Account deposit successfully. Your new balance is $${newBalance}`,
      );
      setError("");
      navigate("/dashboard");
    } catch (error) {
      setError("Invalid input");
    }
  };

  return (
    <div className="deposit-container">
      <div className="back-button">
        <p onClick={() => navigate(-1)}>
          <ArrowLeftOutlined /> Go Back
        </p>
      </div>
      <h2>Deposit</h2>
      {error && <p className="error">{error}</p>}
      <div className="message-row">
        <p>
          Current Balance:{" "}
          <span className="balance-amount">${initialBalance.toFixed(2)}</span>
        </p>
        {newBalance !== null && (
          <p className="new-balance">
            New Balance: <span className="balance-amount">${newBalance}</span>
          </p>
        )}
      </div>
      <div className="input-row">
        <input
          type="text"
          value={amount}
          onChange={handleAmountChange}
          placeholder="Amount"
          required
        />
        <button className="deposit-button" onClick={handleDeposit}>
          Deposit
        </button>
      </div>
    </div>
  );
};

export default Deposit;
