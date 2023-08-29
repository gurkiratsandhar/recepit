const express = require("express");
const dotenv = require("dotenv").config();
const cors = require("cors");
const routes = require("./routes/authRoutes");
const { mongoose } = require("mongoose");
const cookieParser = require("cookie-parser");
const app = express();
// app.use(cors());

// database connection
mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Database Connected"))
  .catch((err) => console.log("Database not connected", err));

// middleware
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use("/", routes);

const port = 8000;

app.get("/", (req, res) => {
  res.send("Hello World");
});
app.listen(port, () => console.log(`Server is running on port ${port}`));
