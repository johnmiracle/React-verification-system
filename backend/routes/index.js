import express from "express";
import expressAsyncHandler from "express-async-handler";
import passport from "passport";
import bcrypt from "bcryptjs";
import User from "../models/User";
import { getToken } from "../config";

const router = express.Router();

router.post("/login", expressAsyncHandler(function (req, res, next) {
  passport.authenticate("local", function (err, user, info) {
    if (err) {
      return next(err);
    }
    if (!user.password) {
      return res.status(404).send({ message: "Invalided User ID or Password!!!" });
    }
    if (!user) {
      return res.status(404).send({
        message:
          "User ID & Password combination doesn't match any of our records, Kindly register!!!",
      });
    }
    req.logIn(user, function (err) {
      if (err) {
        return next(err);
      } else {
        return res.send({
          _id: user.id,
          phone: user.phone,
          firstName: user.firstName,
          lastName: user.lastName,
          account: user.account,
          points: user.points,
          token: getToken(user),
        });
      }
    });
  })(req, res, next);
}));

router.post("/register", expressAsyncHandler(async function (req, res, next) {
  const firstName = req.body.firstName;
  const lastName = req.body.lastName;
  const phone = req.body.phone;
  const password = req.body.password;

  console.log(firstName);

  let user = await User.findOne({ phone: req.body.phone });
  if (user) {
    res.status(404).send({
      message: "Phone Number is already registered, Please login",
    });
  } else {
    const user = new User({
      firstName,
      lastName,
      phone,
      password,
    });
    bcrypt.hash(user.password, 10, (err, hash) => {
      user.password = hash;
      user.save(function (err) {
        if (err) {
          console.log(err);
        } else {
          res
            .status(200)
            .send({ message: "Registration is successfull, Please Login" });
        }
      });
    });
  }
}));

router.get("/logout", expressAsyncHandler(function (req, res, next) {
  req.logout();
  req.flash("alert alert-success", "You've successfully logged out");
  res.redirect("/");
}));


// router.post("/code-generate", isAuthenticated, isAdmin, async function (
//   req,
//   res,
//   next
// ) {
//   const product = req.body.productName;
//   const serial = req.body.serial;
//   const batch_no = req.body.batch;
//   const pin_code = req.body.code;

//   const points = req.body.point;

//   let temp = [];

//   temp.push(product, serial, batch_no, pin_code);

//   const url = await qrcode.toDataURL(temp, { errorCorrectionLevel: "H" });

//   const productCode = new Product({
//     product,
//     serial,
//     batch_no,
//     pin_code,
//     QRcode: url,
//     points,
//   });
//   productCode
//     .save()
//     .then(() => {
//       req.flash("alert alert-success", "Product Added Successfully!!!");
//       res.redirect("serial_code_generator");
//     })
//     .catch((err) => {
//       req.flash("alert alert-danger", "Error Adding Product!!!");
//       console.log(err);
//       res.render("serial_code_generator");
//     });
// });


module.exports = router;
