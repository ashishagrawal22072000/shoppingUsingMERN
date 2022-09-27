// const express = require("express");
// const router = express.Router();
// const orderModel = require("../Model/Order");
// const cartModel = require("../Model/Cart");
// const auth = require("../middleware/Auth");
// const cookieParser = require("cookie-parser");
// router.use(cookieParser());
// router.post("/address", auth, async (req, res) => {
//   try {
//     const cart = await cartModel.findOne({ userID: req.userID });
//     if (cart) {
//       const order = new orderModel({ ...req.body, userID: req.userID });
//       await order.save();
//       res.status(200).json(order);
//     }
//   } catch (err) {
//     res.status(400).json({ error: err });
//   }
// });

// router.get("/address", auth, async (req, res) => {
//   try {
//     const cart = await cartModel.findOne({ userID: req.userID });
//     if (cart) {
//       const order = await orderModel.findOne({ ...req.body, userID: req.userID });
//       res.status(200).json(order);
//       console.log(order);
//     } else {
//       res.status(400).json({ error: "add some items" });
//     }
//   } catch (err) {
//     res.status(500).json({ error: err });
//   }
// });

// router.patch("/payment/cash", auth, async (req, res) => {
//   try {
//     const userOrder = await orderModel.findOne({ userID: req.userID });
//     if (userOrder) {
//       console.log(req.body.amount, req.body.mode);
//       userOrder.status = true;
//       userOrder.payment = req.body.amount;
//       userOrder.mode = req.body.mode;

//       await userOrder.save();
//       res.status(200).json(userOrder);
//     }
//   } catch (err) {
//     res.status(500).json({ error: err });
//   }
// });

// module.exports = router;

const express = require("express");
const userModel = require("../Model/User");
const orderModel = require("../Model/Order");
const productModel = require("../Model/Product");
const stripe = require("stripe")(
  "sk_test_51Lcni6SI4R5DjYigKxchl6noYjblsQLF7uhM5zgg26T2qcH67psfJclkHN7ZMOw3nUGwzQOJGfFcofZYGSDhqahj00BSYsTOo7"
);
const {
  isAuth,
  isAdmin,
  mailgun,
  payOrderEmailTemplate,
} = require("../middleware/Auth");

const router = express.Router();

router.get("/", isAuth, isAdmin, async (req, res) => {
  try {
    const orders = await orderModel.find().populate("user", "name");
    res.send(orders);
  } catch (err) {
    console.log(err);
  }
});

router.post("/", isAuth, async (req, res) => {
  try {
    const newOrder = new orderModel({
      orderItems: req.body.orderItems.map((x) => ({ ...x, product: x._id })),
      shippingAddress: req.body.shippingAddress,
      paymentMethod: req.body.paymentMethod,
      itemsPrice: req.body.itemsPrice,
      shippingPrice: req.body.shippingPrice,
      taxPrice: req.body.taxPrice,
      totalPrice: req.body.totalPrice,
      user: req.user._id,
    });

    const order = await newOrder.save();
    
    res.status(201).send({ message: "New Order Created", order });
  } catch (err) {
    console.log(err);
  }
});

router.get("/summary", isAuth, isAdmin, async (req, res) => {
  try {
    const orders = await orderModel.aggregate([
      {
        $group: {
          _id: null,
          numOrders: { $sum: 1 },
          totalSales: { $sum: "$totalPrice" },
        },
      },
    ]);
    const users = await userModel.aggregate([
      {
        $group: {
          _id: null,
          numUsers: { $sum: 1 },
        },
      },
    ]);
    const dailyOrders = await orderModel.aggregate([
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$createdAt" } },
          orders: { $sum: 1 },
          sales: { $sum: "$totalPrice" },
        },
      },
      { $sort: { _id: 1 } },
    ]);
    const productCategories = await productModel.aggregate([
      {
        $group: {
          _id: "$category",
          count: { $sum: 1 },
        },
      },
    ]);
    res.send({ users, orders, dailyOrders, productCategories });
  } catch (err) {
    console.log(err);
  }
});

router.get("/mine", isAuth, async (req, res) => {
  try {
    const orders = await orderModel.find({ user: req.user._id });
    res.send(orders);
  } catch (err) {
    console.log(err);
  }
});

router.get("/:id", isAuth, async (req, res) => {
  try {
    const order = await orderModel.findById(req.params.id);
    if (order) {
      res.send(order);
    } else {
      res.status(404).send({ message: "Order Not Found" });
    }
  } catch (err) {
    console.log(err);
  }
});

router.put("/:id/deliver", isAuth, async (req, res) => {
  try {
    const order = await orderModel.findById(req.params.id);
    if (order) {
      order.isDelivered = true;
      order.deliveredAt = Date.now();
      await order.save();
      res.send({ message: "Order Delivered" });
    } else {
      res.status(404).send({ message: "Order Not Found" });
    }
  } catch (err) {
    console.error(err);
  }
});

router.post("/:id/pay",  async (req, res) => {
  try {
    const order = await orderModel
      .findById(req.params.id)
      .populate("user", "email name");
    if (order) {
      order.isPaid = true;
      order.paidAt = Date.now();
      order.paymentResult = {
        id: req.body.id,
        status: req.body.status,
        update_time: req.body.update_time,
        email_address: req.body.email_address,
      };

      const updatedOrder = await order.save();
      // mailgun()
      //   .messages()
      //   .send(
      //     {
      //       from: 'Amazona <amazona@mg.yourdomain.com>',
      //       to: `${order.user.name} <${order.user.email}>`,
      //       subject: `New order ${order._id}`,
      //       html: payOrderEmailTemplate(order),
      //     },
      //     (error, body) => {
      //       if (error) {
      //         console.log(error);
      //       } else {
      //         console.log(body);
      //       }
      //     }
      //   );

      res.send({ message: "Order Paid", order: updatedOrder });
    } else {
      res.status(404).send({ message: "Order Not Found" });
    }
  } catch (err) {
    console.log(err);
  }
});

router.delete("/:id", isAuth, isAdmin, async (req, res) => {
  try {
    const order = await orderModel.findById(req.params.id);
    if (order) {
      await order.remove();
      res.send({ message: "Order Deleted" });
    } else {
      res.status(404).send({ message: "Order Not Found" });
    }
  } catch (err) {
    console.log(err);
  }
});

// router.post("/checkout", isAuth, (req, res) => {
//   try {
//     const { product, token } = req.body;
//     const customer = await stripe.customers.create({
//       email: token.email,
//       source: token.id,
//     });
//     const idempotency_key = Date.now();

//     const charge = await stripe.charges.create(
//       {
//         amount: product.price * 100,
//         currency: "usd",
//         customer: customer.id,
//         receipt_email: token.email,
//         shipping: {
//           name: token.card.name,
//           address: {
//             line1: token.card.address_line1,
//             line2: token.card.address_line2,
//             city: token.card.city,
//             country: token.card.country,
//             postal_code: token.card.address_zip,
//           },
//         },
//       },

//       { idempotency_key }
//     );
//     console.log(charge);
//   } catch (err) {
//     console.log(err);
//   }
// });

module.exports = router;
