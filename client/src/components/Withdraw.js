import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";

const Withdraw = () => {
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
            `${process.env.REACT_APP_API_URL}/api/users/balance`,
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
        (parseFloat(initialBalance) - parseFloat(value)).toFixed(2),
      );
      setError("");
    } else {
      setNewBalance(null);
      setError("Invalid input, please enter a positive number");
    }
  };

  const handleWithdraw = async () => {
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/api/users/withdraw`,
        { amount },
        {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
        },
      );
      message.success("Account withdraw successfully");
      setError("");
      navigate("/dashboard");
    } catch (error) {
      setError("Invalid input or insufficient balance");
    }
  };

  return (
    <div className="withdraw-container">
      <div className="back-button">
        <p onClick={() => navigate(-1)}>
          <ArrowLeftOutlined /> Go Back
        </p>
      </div>
      <h2>Withdraw</h2>
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
        <button className="withdraw-button" onClick={handleWithdraw}>
          Withdraw
        </button>
      </div>
    </div>
  );
};

export default Withdraw;
