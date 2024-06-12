const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

exports.register = async (req, res) => {
  const { username, password, initialBalance } = req.body;

  console.log("Received data:", { username, password, initialBalance });

  const usernameValid = username.match(/^[_\-\.0-9a-z]{1,127}$/);
  const passwordValid = password.match(/^[_\-\.0-9a-z]{1,127}$/);
  const balanceValid = /^(0|[1-9][0-9]*)(\.[0-9]{2})?$/.test(initialBalance);

  console.log("Validation results:", {
    usernameValid,
    passwordValid,
    balanceValid,
  });

  if (!usernameValid || !passwordValid || !balanceValid) {
    return res.status(400).json({ message: "invalid_input" });
  }

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      password: hashedPassword,
      balance: parseFloat(initialBalance),
    });
    res
      .status(201)
      .json({ message: "Account created successfully", userId: user.id });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(400).json({ message: "invalid_input" });
  }
};

exports.login = async (req, res) => {
  const { username, password } = req.body;

  console.log("Login request:", { username, password });

  try {
    const user = await User.findOne({ where: { username } });
    if (!user) {
      return res.status(400).json({ message: "invalid_input" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "invalid_input" });
    }

    const token = jwt.sign({ userId: user.id }, "your_jwt_secret", {
      expiresIn: "1h",
    });
    res.status(200).json({ message: "Login successful", token, userId: user.id });
  } catch (error) {
    console.error("Login error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.deposit = async (req, res) => {
  const { amount } = req.body;
  const userId = req.user.userId;

  console.log("Deposit request:", { userId, amount });

  if (!/^\d+(\.\d{1,2})?$/.test(amount)) {
    return res.status(400).json({ message: "invalid_input" });
  }

  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    console.log("User before deposit:", user.toJSON());
    const depositAmount = parseFloat(amount).toFixed(2);
    user.balance = (
      parseFloat(user.balance) + parseFloat(depositAmount)
    ).toFixed(2);
    await user.save();
    console.log("User after deposit:", user.toJSON());
    res
      .status(200)
      .json({ message: "Deposit successful", balance: user.balance });
  } catch (error) {
    console.error("Error during deposit:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.withdraw = async (req, res) => {
  const { amount } = req.body;
  const userId = req.user.userId;

  console.log("Withdraw request:", { userId, amount });

  if (!/^\d+(\.\d{1,2})?$/.test(amount)) {
    return res.status(400).json({ message: "invalid_input" });
  }

  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    console.log("User before withdraw:", user.toJSON());
    const withdrawAmount = parseFloat(amount).toFixed(2);
    if (parseFloat(user.balance) < parseFloat(withdrawAmount)) {
      return res.status(400).json({ message: "Insufficient balance" });
    }

    user.balance = (
      parseFloat(user.balance) - parseFloat(withdrawAmount)
    ).toFixed(2);
    await user.save();
    console.log("User after withdraw:", user.toJSON());
    res
      .status(200)
      .json({ message: "Withdrawal successful", balance: user.balance });
  } catch (error) {
    console.error("Error during withdraw:", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.balance = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ balance: user.balance });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
