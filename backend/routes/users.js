import express from "express";
import expressAsyncHandler from "express-async-handler";
import User from "../models/User";
import History from "../models/History";
import Product from "../models/Products";
import { isUser, isAuth } from "../config";

const router = express.Router();

router.post(
  "/verify-product",
  isAuth,
  isUser,
  expressAsyncHandler(async function (req, res, next) {
    const codeNumber = req.body.code;

    let verifyProduct = await Product.findOne({ pin_code: codeNumber });

    let historyResult = await History.findOne({ code: codeNumber });

    if (!verifyProduct) {
      return res.status(404).send({
        message: "Your Product is Fake, Kindly make a report",
      });
    }
    if (verifyProduct && historyResult) {
      return res.status(404).send({
        message: "Your Product key has been used, Kindly make a report",
      });
    } else {
      const newHistory = new History({
        user: req.user,
        Date: new Date(),
        usedSerial: verifyProduct.serial,
        batch: verifyProduct.batch_no,
        code: verifyProduct.pin_code,
        usedSerial_Prouct_Name: verifyProduct.product,
        point: verifyProduct.points,
      });

      // Point calculator

      // user point
      let userPoint = req.user.points;

      // product point
      let productpoint = verifyProduct.points;

      // sum of prouct point and userpoint
      let updatedPoint = userPoint + productpoint;

      // Update User Point
      await User.updateOne(
        { _id: req.user },
        { $set: { points: updatedPoint } }
      );

      // Save New History
      await newHistory.save();

      res.status(201).send(verifyProduct);
    }
  })
);

router.get(
  "/product-verify",
  expressAsyncHandler(async function (req, res, next) {
    const scanCount = await History.countDocuments({ user: req.user });
    res.status(200).send(scanCount);
  })
);

router.get(
  "/history",
  isAuth,
  isUser,
  expressAsyncHandler(async function (req, res, next) {
    const histories = await History.find({ user: req.user }).populate("user");
    res.status(200).send(histories);
  })
);

module.exports = router;
