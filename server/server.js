const express = require("express");
const PORT = process.env.PORT || 5000;
const bodyParser = require("body-parser");
const cors = require("cors");
const sequelize = require("./config/db");
const userRoutes = require("./routes/userRoutes");

const app = express();

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
);

app.use(express.json());
app.use(bodyParser.json());
app.use("/api/users", userRoutes);

sequelize
  .sync()
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => console.error("Unable to connect to the database:", err));
