import React from "react";
import { UserOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "antd";

const Header = () => {
  const navigate = useNavigate();
  const username = localStorage.getItem("username");

  const handleSignOut = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/login");
  };

  return (
    <div className="header">
      <Link to="/" className="logo">
        BankApp
      </Link>
      {username && (
        <div className="header-right">
          <p className="username-badge">
            <UserOutlined
              style={{ fontSize: "24px", color: "#08c" }}
              className="username-icon"
            />
            {username}
          </p>
          <Button
            type="primary"
            onClick={handleSignOut}
            style={{ marginLeft: "10px" }}
            className="signout-button"
          >
            Sign Out
          </Button>
        </div>
      )}
    </div>
  );
};

export default Header;
