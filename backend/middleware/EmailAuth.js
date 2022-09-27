const userModel = require("../Model/User");
const verifyEmail = async (req, res, next) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });
    if (!user.isVerified) {
      res.status(400).json({ error: "Please Verify Email First" });
    } else {
      next();
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = verifyEmail;
