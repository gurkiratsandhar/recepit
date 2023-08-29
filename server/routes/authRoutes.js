const express = require("express");
const router = express.Router();
const cors = require("cors");
const {
  test,
  registerUser,
  loginUser,
  getProfile,
  logoutUser,
  getReceipts,
  saveReceipt,
  deleteReceipt,
} = require("../controllers/authControllers");

router.use(
  cors({
    credentials: true,
    origin: "https://recepit.goki1313.com",
    methods: ["GET", "POST", "DELETE", "UPDATE", "PUT", "PATCH"],
  })
);

router.get("/", test);
router.post("/deletereceipt", deleteReceipt);
router.post("/register", registerUser);
router.post("/savereceipt", saveReceipt);
router.post("/login", loginUser);
router.get("/profile", getProfile);
router.get("/logout", logoutUser);
router.get("/receipts", getReceipts);

module.exports = router;
