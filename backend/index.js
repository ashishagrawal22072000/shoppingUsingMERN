const express = require("express");
const app = express();
const { PORT, RAZORPAY_API_KEY, RAZORPAY_API_SECRET } = require("./config");
require("./db/conn");
const bodyParser = require("body-parser");
app.use(bodyParser());
const { PAYPAL_CLIENT_ID } = require("./config");
const product = require("./router/Products");
// const cart = require("./router/Cart");
// const review = require("./router/Review");
const user = require("./router/User");
const order = require("./router/Order");

const Razorpay = require("razorpay");

const instance = new Razorpay({
  key_id: RAZORPAY_API_KEY,
  key_secret: RAZORPAY_API_SECRET,
});

app.post("/checkout", async (req, res) => {
  try {
    console.log(req.body.amount);
    const options = {
      amount: Math.ceil(req.body.amount * 100),
      currency: "INR",
    };
    const order = await instance.orders.create(options);

    res.status(200).json({ success: true, order });
  } catch (err) {
    console.log(err);
  }
});

app.post("/paymentVerification", async (req, res) => {
  console.log(req.body);
  res.status(200).json({ success: true });
});

app.use("/product", product);
// app.use("/cart", cart);
// app.use("/review", review);
app.use("/user", user);
app.use("/order", order);

app.get("/api/keys/razor", (req, res) => {
  res.status(200).json({ key: RAZORPAY_API_KEY });
});

app.listen(PORT, () => {
  console.log("listening on port" + " " + PORT);
});
