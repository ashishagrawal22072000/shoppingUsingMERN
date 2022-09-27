const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    // required: true,
  },
  email: {
    type: String,
    // required: true,
  },
  phone: {
    type: String,
    // required: true,
  },
  password: {
    type: String,
    // required: true,
  },
  gender: {
    type: String,
    // required: true,
  },
  isVerified: {
    type: Boolean,
    default: false,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
});

userSchema.pre("save", async function (next) {
  // console.log("hi from user");
  if (this.isModified("password")) {
    this.password = await bcrypt.hashSync(this.password, 10);
  }
  next();
});

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;
