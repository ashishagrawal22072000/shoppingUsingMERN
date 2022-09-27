const express = require("express");
const router = express.Router();
const cartModel = require("../Model/Cart");
// const productModel = require("../Model/Product");
const bodyParser = require("body-parser");
const auth = require("../middleware/Auth");
const cookieParser = require("cookie-parser");

router.use(bodyParser());
router.use(cookieParser());
router.post("/", auth, async (req, res) => {
  console.log(req.cookies, "cookies in /cart page");
  try {
    const user = await cartModel.findOne({ userID: req.userID });
    if (user) {
      let a = false;
      const prod = user.items.find((ele) => {
        if (ele.itemID == req.body.itemID) {
          user.totalPrice += ele.itemPrice * ele.itemQty;
          ele.itemQty += 1;
          a = true;
        }
      });
      if (!a) {
        user.items.push({
          itemID: req.body.itemID,
          itemQty: 1,
          itemImg: req.body.itemImg,
          itemPrice: req.body.itemPrice,
          itemTitle: req.body.itemTitle,
          itemStock: req.body.itemStock,
          itemCharge: req.body.itemCharge,
        });
        user.totalPrice += +req.body.itemPrice * 1;

        user.totalCharge += +req.body.itemCharge;

        await user.save();
      }
      //  else {
      //   await user.save();
      // }
    } else {
      const cart = new cartModel({
        userID: req.userID,
        items: {
          itemID: req.body.itemID,
          itemImg: req.body.itemImg,
          itemPrice: req.body.itemPrice,
          itemTitle: req.body.itemTitle,
          itemStock: req.body.itemStock,
          itemQty: 1,
          itemCharge: req.body.itemCharge,
        },
        totalPrice: req.body.itemPrice,
        totalCharge: req.body.itemCharge,
      });
      await cart.save();
    }

    res.status(200).json({ message: "Item is added" });
  } catch (err) {
    res.status(400).json({ error: error });
  }
});

router.get("/", auth, async (req, res) => {
  try {
    const cart = await cartModel.find({ userID: req.userID });
    console.log(cart);
    res.status(200).json(cart);
  } catch (err) {
    console.log(err);
  }
});

router.delete("/", auth,  async (req, res) => {
  try {
    const user = await cartModel.findOne({ userID: req.userID });
    if (user) {
      const restItems = user.items.filter((ele) => {
        return ele._id != req.body.itemId;
      });
      const deletedItem = user.items.find((ele) => {
        return ele._id == req.body.itemId;
      });

      user.items = restItems;
      user.totalPrice -= deletedItem.itemPrice * deletedItem.itemQty;
      user.totalCharge -= deletedItem.itemCharge;
      await user.save();
      res.status(200).json({ message: "item delete successfully" });
    } else {
      res.status(400).json({ error: "User Not Found" });
    }
  } catch (err) {
    console.log(err);
  }
});

router.patch("/increase",auth,  async (req, res) => {
  try {
    const user = await cartModel.findOne({ userID: req.userID });
    if (user) {
      console.log(req.body.itemID);
      user.items.filter((ele) => {
        if (ele._id == req.body.itemID) {
          if (ele.itemQty < ele.itemStock) {
            user.totalPrice += ele.itemPrice;
            return ++ele.itemQty;
          } else {
            res
              .status(400)
              .json({ error: "Sorry, Now Product is out of stock." });
          }
        }
      });

      await user.save();
      res.status(200).json(user);
      console.log(user);
    }
  } catch (err) {
    console.log(err);
  }
});

router.patch("/decrease", auth,  async (req, res) => {
  try {
    const user = await cartModel.findOne({ userID: req.userID });
    let flag = false;
    let a = [];
    if (user) {
      user.items.filter((ele) => {
        if (ele._id == req.body.itemID) {
          if (+ele.itemQty <= 1) {
            flag = true;
            a = user.items.filter((ele) => {
              return ele._id != req.body.itemID;
            });
            b = user.items.find((ele) => {
              return ele._id === req.body.itemID;
            });

            user.totalPrice -= ele.itemPrice * ele.itemQty;
          } else {
            user.totalPrice -= ele.itemPrice;
            return --ele.itemQty;
          }
        }
      });
      if (flag) {
        user.items = a;
        await user.save();
      }
      await user.save();
      res.status(200).json(user);
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
