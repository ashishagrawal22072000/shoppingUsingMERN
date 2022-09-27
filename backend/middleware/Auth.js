// const jwt = require("jsonwebtoken");
// const { secretKey } = require("../config");
// const userModel = require("../Model/User");
// const express = require("express");
// const app = express();

// const cookies = require("cookie-parser");
// app.use(cookies());

// const auth = async (req, res, next) => {
//   console.log(req.cookies, "request cookies");
//   try {
//     // console.log("This is middleware");
//     console.log(req.cookies.owner);
//     const token = req.cookies.owner;
//     console.log("kcbrbrc brir4fh", token);
//     const verifyToken = jwt.verify(token, secretKey);
//     // console.log("This is our token", verifyToken._id);
//     const rootUser = await userModel.findOne({ _id: verifyToken._id });
//     // console.log("User found in database", rootUser);
//     if (!rootUser) {
//       throw new Error("User Not Found");
//     } else {
//       console.log("hello from middle jbf54 jnf4n");
//       req.token = token;
//       req.rootUser = rootUser;
//       req.userID = rootUser._id;
//       // console.log("vbtvb bfbtub fb5uifb5f5f bfuttt ",req.userID);
//       next();
//     }
//   } catch (err) {
//     res.status(400).json({ error: "Unauthorized : No Token Provided" });
//     console.log(err);
//   }
// };

// module.exports = auth;

const jwt = require("jsonwebtoken");

const { secretKey } = require("../config");
const generateToken = (user) => {
  return jwt.sign(
    {
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin : user.isAdmin
    },
    secretKey,
    {
      expiresIn: "30d",
    }
  );
};

const isAuth = (req, res, next) => {
  const authorization = req.headers.authorization;
  if (authorization) {
    const token = authorization.slice(7, authorization.length);
    jwt.verify(token, secretKey, (err, decode) => {
      if (err) {
        res.status(401).send({ message: "Invalid Token" });
      } else {
        req.user = decode;
        console.log(req.user)
        next();
      }
    });
  } else {
    res.status(401).send({ message: "No Token" });
  }
};

const isAdmin = (req, res, next) => {
  console.log(req.user);
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    res.status(401).send({ message: "Invalid Admin Token" });
  }
};

module.exports = { isAuth, isAdmin, generateToken };
