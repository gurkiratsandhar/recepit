const User = require("../models/user");
const Receipt = require("../models/receipt");
const { hashPassword, comparePassword } = require("../helpers/auth");
const jwt = require("jsonwebtoken");
const url = require("url");
const { request } = require("express");

//test
const test = (req, res) => {
  res.json("test is printed");
};

// Adding items to back-end
const addItems = async () => {
  const receipt = Receipt.create({
    name: "64b9b07b1fdc15d0f8d392e1",
    storeName: "123 Store",
    storeAddress: "Just around Corner",
    storeWebsite: "www.store.com",
    orderNumber: "dfkm2dfs876cge",
    date: new Date(),
    products: [
      { quantity: 2, product: "Nfc Reader", total: 110 },
      { quantity: 1, product: "Old Spice Deodarant", total: 15 },
      { quantity: 2, product: "Miss Vickies Chips", total: 5 },
    ],
    gst: 13,
    totalNogst: 130,
    totalWithgst: 143,
    amountReceived: 150,
    amountReturned: 7,
  });
  console.log(receipt);
};

// Register Endpoint
const registerUser = async (req, res) => {
  try {
    const { name, email, password, confirmpassword } = req.body;
    //Check if name was Entered
    if (!name) {
      return res.json({
        error: "Name is required",
      });
    }
    //Check if password is good
    if (!password || password.length < 6) {
      return res.json({
        error: "Password is Required and should be at least 6 characters long.",
      });
    }
    //Check Email
    const exist = await User.findOne({ email });
    if (exist) {
      return res.json({
        error: "User is already registered with same E-mail.",
      });
    }
    if (password != confirmpassword) {
      return res.json({
        error: "Password field and Confirm Password field should match.",
      });
    }

    const hashedPassword = await hashPassword(password);
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });
    return res.json(user);
  } catch (error) {
    console.log(error);
  }
};

// LogIn Endpoint
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({
        error: "No user found.",
      });
    }
    // Check if password
    const match = await comparePassword(password, user.password);
    if (match) {
      //res.json("Password match.");
      jwt.sign(
        {
          email: user.email,
          id: user._id,
          name: user.name,
        },
        process.env.JWT_SECRET,
        {},
        (err, token) => {
          if (err) throw err;
          res.cookie("token", token).json(user);
        }
      );
    } else {
      return res.json({
        error: "Password didn't match.",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

//
const getProfile = (req, res) => {
  const { token } = req.cookies;
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, {}, (err, user) => {
      if (err) throw err;
      res.json(user);
    });
  } else {
    res.json(null);
  }
};

const logoutUser = (req, res) => {
  try {
    res.status(202).clearCookie("token").send("cookie cleared");
  } catch (error) {
    console.log(error);
  }
};

const getReceipts = (req, res) => {
  try {
    const { token } = req.cookies;
    if (token) {
      jwt.verify(token, process.env.JWT_SECRET, {}, async (err, user) => {
        if (err) throw err;
        const receipts = await Receipt.find({ name: user.id });
        res.json(receipts);
      });
    } else {
      res.json(null);
    }
  } catch (error) {
    console.log(error);
  }
};

const saveReceipt = (req, res) => {
  try {
    const item = req.body;
    const { token } = req.cookies;
    if (token) {
      jwt.verify(token, process.env.JWT_SECRET, {}, async (err, user) => {
        if (err) throw err;
        const newReceipt = await Receipt.create({
          name: user.id,
          storeName: item.storeName,
          storeAddress: item.storeAddress,
          storeWebsite: item.storeWebsite,
          orderNumber: item.orderNumber,
          date: `${new Date().getDate()}-${
            new Date().getMonth() + 1
          }-${new Date().getFullYear()}`,
          products: item.products.map((product) => ({
            quantity: product[3],
            product: product[1],
            total: product[2],
          })),
          gst: ((10 / 100) * item.subtotal).toFixed(2),
          totalNogst: item.subtotal.toFixed(2),
          totalWithgst: (0.1 * item.subtotal + item.subtotal).toFixed(2),
          amountReceived: (0.1 * item.subtotal + item.subtotal).toFixed(2),
          amountReturned: 0,
        });
        res.json(newReceipt);
      });
    } else {
      return res.json({
        error: "No token available.",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const deleteReceipt = async (req, res) => {
  try {
    const { _id } = req.body;
    const deletedReceipt = await Receipt.findByIdAndRemove(_id);
    return res.json(deletedReceipt);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  test,
  registerUser,
  loginUser,
  getProfile,
  logoutUser,
  getReceipts,
  saveReceipt,
  deleteReceipt,
};
