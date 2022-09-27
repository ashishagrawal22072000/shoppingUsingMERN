// const express = require("express");
// const userModel = require("../Model/User");
// const router = express.Router();
// const cookieParser = require("cookie-parser");
// const bodyParser = require("body-parser");
// const verifyEmail = require("../middleware/EmailAuth");
// const auth = require("../middleware/Auth");
// // const crypto = require("crypto");
// const { secretKey, mail, pass, service, email_port } = require("../config");
// const nodemailer = require("nodemailer");
// const bcrypt = require("bcrypt");
// const jwt = require("jsonwebtoken");
// const transporter = nodemailer.createTransport({
//   service: service,
//   port: email_port,
//   secure: true,
//   auth: {
//     user: mail,
//     pass: pass,
//   },
// });

// router.use(cookieParser());
// router.use(bodyParser());

// router.post("/register", async (req, res) => {
//   // try {
//   //   const { email, name, password, phone, gender } = req.body;

//   //   // const user = await userModel.findOne({ email: email });
//   //     // console.log("user", user)
//   //   // if (!user) {
//   //     const registerUser = new userModel({
//   //       ...req.body,
//   //       isVerified: false,
//   //     });

//   //     await registerUser.save();

//   //     // console.log("token", jwt.sign({ _id: registerUser._id }));
//   //     console.log(registerUser._id, "Registration");

//   //     const token = jwt.sign({ _id: registerUser._id }, secretKey);

//   //     console.log("Registration Token", token);

//   //     const mailOptions = {
//   //       from: mail,
//   //       to: registerUser.email,
//   //       subject: `e-Shop.com Verify Your Email`,
//   //       html: `
//   //       <h2>Thank You ${registerUser.name} for registering on e-Shop.com</h2>
//   //     <h4>Please Verify Your Email To Continue...</h4>
//   //     <button><a href="http://${req.headers.host}/user/verify_email?token=${token}" style='text-decoration: none; font-weight : bold;'>Verify Your Email</a></button>

//   //     `,
//   //     };

//   //     transporter.sendMail(mailOptions, (err, info) => {
//   //       if (err) {
//   //         res.status(400).json({ error: err });
//   //       } else {
//   //         res.status(200).json({ message: "Email Sent Successfully" });
//   //       }
//   //     });
//   //   // } else {
//   //   //   res.status(200).json({ message: "User Already Exist" });
//   //   // }
//   // } catch (err) {
//   //   res.status(400).json({ error: err });
//   // }

//   try {
//     const user = await userModel.findOne({ email: req.body.email });
//     if (user) {
//       res.status(400).json({ message: "User already exists" });
//     } else {
//       const user = new userModel({ ...req.body});
//       console.log("User Data: ", user);
//       const token = jwt.sign({ _id: user._id }, secretKey, { expiresIn: "1h" });
//       console.log("hello gugu", user._id);
//       await user.save();
//       // res.status(200).json({ user: user });
//       console.log("hello gugu", user.email);
//       console.log("usertoken: ", token);
//       let mailOptions = {
//         from: mail,
//         to: user.email,
//         subject: "Verify your email,please!",
//         html: `<h1>Thank you ${user.name},for registering with us !</h1>
//         <a href="http://${req.headers.host}/user/verify_email?token=${token}" target="_blank">Click Here</a>`,
//       };
//       transporter.sendMail(mailOptions, (err, info) => {
//         if (err) {
//           res.status(400).json({
//             success: false,
//             error: error,
//           });
//         } else {
//           res.status(200).json({
//             success: true,
//             message: "Email Sent Successfully",
//             data: {
//               user: user,
//             },
//           });
//         }
//       });
//     }
//   } catch (error) {
//     // console.log(error);
//     res.status(400).json({
//       success: false,
//       message: "Signup Failed",
//       error: error,
//     });
//   }
// });

// router.get("/verify_email", async (req, res) => {
//   try {
//     const token = req.query.token;
//     const verifyToken = jwt.verify(token, secretKey);
//     const user = await userModel.findOne({ _id: verifyToken._id });
//     console.log("hbfbr hcbrif", user);
//     if (user) {
//       user.isVerified = true;
//       await user.save();
//       res.status(200)
//         .send(`<h1 style='text-align : center; color : green'>Email Verified Successfully</h1>
//       <h3 style='text-align : center';>Go To Login Page To Login</h3>
//       `);
//     } else {
//       res.status(400).send(
//         `<h1 style='text-align : center; color : red'>Email Is Not Verified Or Verified</h1>
//       <h3 style='text-align : center'>Try To Login Or Go To Email</h3>
//       `
//       );
//     }
//   } catch (err) {
//     res.status(400).json({ error: err });
//   }
// });

// router.post("/login", verifyEmail, async (req, res) => {
//   try {
//     const { email, password } = req.body;
//     const userLogin = await userModel.findOne({ email: email });
//     if (userLogin) {
//       const isMatch = await bcrypt.compare(password, userLogin.password);
//       const token = jwt.sign({ _id: userLogin._id }, secretKey);
//       res.cookie("owner", token, {
//         expires: new Date(Date.now() + 100000000),
//         httpOnly: true,
//       });

//       if (!isMatch) {
//         res.status(400).json({ error: "Invalid Credentials" });
//       } else {
//         res.status(200).json({ message: "Login successful" });
//       }
//     } else {
//       res.status(400).json({ error: "Invalid Credentials" });
//     }
//   } catch (err) {
//     res.status(400).json({ error: err });
//   }
// });

// router.get("/logout", (req, res) => {
//   res.clearCookie("owner", { path: "/" });
//   res.status(200).send({ message: "Logout" });
// });

// router.get("/", auth, (req, res) => {
//   res.status(200).send(req.rootUser);
// });

// module.exports = router;

const express = require("express");
const bodyParser = require("body-parser");
const router = express.Router();
const bcrypt = require("bcryptjs");
const userModel = require("../Model/User");
const { isAuth, isAdmin, generateToken } = require("../middleware/Auth");
const verifyEmail = require("../middleware/EmailAuth");
const { mail, pass, service, email_port, secretKey } = require("../config");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");
const transporter = nodemailer.createTransport({
  service: service,
  port: email_port,
  secure: true,
  auth: {
    user: mail,
    pass: pass,
  },
});

router.use(bodyParser());

router.get("/", isAuth, isAdmin, async (req, res) => {
  try {
    const user = await userModel.find({});
    res.send(user);
  } catch (err) {
    console.log(err);
  }
});

router.get("/:id", isAuth, isAdmin, async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id);
    if (user) {
      res.send(user);
    } else {
      res.status(404).send({ message: "user not found" });
    }
  } catch (err) {
    console.log(err);
  }
});

router.put("/:id", isAuth, isAdmin, async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id);
    if (user) {
      user.name = req.body.name || user.name;
      user.email = req.body.email || user.email;
      user.isAdmin = Boolean(req.body.isAdmin);
      const updateUser = await user.save();
      res.send({ message: "User Update", user: updateUser });
    } else {
      res.status(404).send({ message: "user not found" });
    }
  } catch (err) {
    console.log(err);
  }
});

router.delete("/:id", isAdmin, isAuth, async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id);
    if (user) {
      if (user.email === "admin@example.com") {
        res.status(400).send({ message: "cannot delete admin" });
        return;
      }
      await user.remove();
      res.send({ message: "User delete" });
    } else {
      res.status(404).send({ message: "User not found" });
    }
  } catch (err) {
    console.log(err);
  }
});

router.post("/register", async (req, res) => {
  try {
    const { email, name, password, phone, gender } = req.body;
    console.log(req.body.email);
    const user = await userModel.findOne({ email: email });
    if (user) {
      res.status(404).send({ message: "User already registered" });
    } else {
      // console.log(bcrypt.hash(password))
      const newUser = new userModel({
        name: name,
        email: email,
        phone: phone,
        gender: gender,
        password: password,
      });
      const user = await newUser.save();
      console.log(user);
      //    const token = jwt.sign({ _id: user._id }, secretKey, { expiresIn: "1h" });

      //    console.log("Registration Token", token);

      //    const mailOptions = {
      //      from: mail,
      //      to: user.email,
      //      subject: `e-Shop.com Verify Your Email`,
      //      html: `
      //    <h2>Thank You ${user.name} for registering on e-Shop.com</h2>
      //  <h4>Please Verify Your Email To Continue...</h4>
      //  <button><a href="http:${req.headers.host}/user/verify_email?token=${token}" style='text-decoration: none; font-weight : bold;'>Verify Your Email</a></button>

      //  `,
      //    };

      //    transporter.sendMail(mailOptions, (err, info) => {
      //      if (err) {
      //        res.status(400).json({ error: err });
      //      } else {
      //        res.status(200).json({ message: "Email Sent Successfully" });
      //      }
      //    });

      res.send({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user),
      });
    }
  } catch (err) {
    console.log(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const user = await userModel.findOne({ email: req.body.email });
    console.log(user);
    if (user) {
      if (bcrypt.compareSync(req.body.password, user.password)) {
        res.send({
          _id: user._id,
          name: user.name,
          email: user.email,
          token: generateToken(user),
        });
        return;
      }
    } else {
      res.status(401).send({ message: "invalid Credentials" });
    }
  } catch (err) {
    console.log(err);
  }
});

router.post("/logout", async (req, res) => {
  try {
    
  }catch(err){

  }
})

module.exports = router;

// const router = express.Router();
// const userModel = require("../Model/User");
// const bodyParser = require("body-parser");
// const { secretKey, mail, pass, service, email_port } = require("../config");
// const nodemailer = require("nodemailer");
// const transporter = nodemailer.createTransport({
//   service: service,
//   port: email_port,
//   secure: true,
//   auth: {
//     user: mail,
//     pass: pass,
//   },
// });

// router.use(bodyParser());

// router.post("/register", async (req, res) => {
//   try {
//     const user = await userModel.findOne({ email: req.body.email });
//     console.log("user", user);
//     if (!user) {
//       console.log("user is not here");
//       const registerUser = new userModel({
//         ...req.body,
//       });
//     //   console.log("new user", registerUser);

//       const newUser = await registerUser.save();
//       console.log("user saved", registerUser);
//       console.log("token", jwt.sign({ _id: registerUser._id }));
//       console.log(registerUser._id, "Registration");

//       const token = jwt.sign({ _id: registerUser._id }, secretKey);

//       console.log("Registration Token", token);

//       const mailOptions = {
//         from: mail,
//         to: registerUser.email,
//         subject: `e-Shop.com Verify Your Email`,
//         html: `
//               <h2>Thank You ${registerUser.name} for registering on e-Shop.com</h2>
//             <h4>Please Verify Your Email To Continue...</h4>
//             <button><a href="http://${req.headers.host}/user/verify_email?token=${token}" style='text-decoration: none; font-weight : bold;'>Verify Your Email</a></button>

//             `,
//       };

//       transporter.sendMail(mailOptions, (err, info) => {
//         if (err) {
//           res.status(400).json({ error: err });
//         } else {
//           res.status(200).json({ message: "Email Sent Successfully" });
//         }
//       });
//     } else {
//       res.status(200).json({ message: "User Already Exist" });
//     }
//   } catch (err) {
//     res.status(400).json({ error: err });
//   }
// });

// router.get("/verify_email", async (req, res) => {
//   try {
//     console.log("hbekve");
//     const token = req.query.token;
//     console.log("token ", token);
//     const verifyToken = jwt.verify(token, secretKey);
//     console.log(verifyToken);
//     const user = await userModel.findOne({ _id: verifyToken._id });
//     console.log("hbfbr hcbrif", user);
//     if (user) {
//       user.isVerified = true;
//       await user.save();
//       res.status(200)
//         .send(`<h1 style='text-align : center; color : green'>Email Verified Successfully</h1>
//             <h3 style='text-align : center';>Go To Login Page To Login</h3>
//             `);
//     } else {
//       res.status(400).send(
//         `<h1 style='text-align : center; color : red'>Email Is Not Verified Or Verified</h1>
//             <h3 style='text-align : center'>Try To Login Or Go To Email</h3>
//             `
//       );
//     }
//   } catch (err) {
//     res.status(400).json({ error: err });
//   }
// });

// module.exports = router;
