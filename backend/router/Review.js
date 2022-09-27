const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const reviewModel = require("../Model/Review");
const productModel = require("../Model/Product");
router.use(bodyParser());

router.post("/", async (req, res) => {
  console.log("review", req.body.itemId);
  try {
    const review = await reviewModel.findOne({ itemID: req.body.itemId });
    if (review) {
      review.reviews.push({
        rate: req.body.rate,
        message: req.body.message,
        userID: "12344321",
      });
      await productModel.findByIdAndUpdate(
        { _id: req.body.itemId },
        { $inc: { review: 1 } }
      );
      await review.save();
      res.status(200).json(review);
    } else {
      const review = new reviewModel({
        itemID: req.body.itemId,
        reviews: [
          {
            rate: req.body.rate,
            message: req.body.message,
            userID: "12344321",
          },
        ],
      });
      await productModel.findByIdAndUpdate(
        { _id: req.body.itemId },
        { review: 1 }
      );
      await review.save();
      res.status(200).json(review);
    }
  } catch (err) {
    console.log(err);
  }
});

router.get("/review", async (req, res) => {
  try {
    const review = await reviewModel.find();
    res.status(200).json(review);
  } catch (err) {
    console.log(err);
  }
});

router.get("/:itemId", async (req, res) => {
  try {
    const review = await reviewModel.find({ itemID: req.params.itemId });
    res.status(200).json(review);
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
