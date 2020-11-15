import express from "express";
import User from "../models/User";
import History from "../models/History";
import Product from "../models/Products";
import { isAdmin, isAuth } from "../config";
import qrcode from "qrcode";
import fs from "fs";
import path from "path";

const router = express.Router();

router.post("/code-generator", async function (req, res, next) {
  const product = req.body.productName;
  const serial = req.body.serialNumber;
  const batch_no = req.body.batchNumber;
  const points = req.body.point;

  console.log(product, serial, batch_no, points);

  let max = 10000;
  let min = 1000;

  const array_length = 2;

  for (let i = 0; i < array_length; i++) {
    // create the unique number
    const uniquePin = Math.floor(Math.random() * (max - min + 1));

    // create the QRcode for each generated code
    let temp = [uniquePin];

    let url = await new qrcode.toDataURL(
      { uniquePin },
      { errorCorrectionLevel: "H" }
    );

    const productCode = new Product({
      product,
      serial,
      batch_no,
      pin_code: uniquePin,
      QRcode: url,
      points,
    });
    // save each iteration to database
    productCode.save();
  }

  try {
    res.status(200).send({ msg: "Product Added Successfully!!!" });
  } catch (err) {
    res.status(300).send({ msg: "Error Adding Product!!!" });
    console.log(err);
  }
});

router.get("/users", isAuth, isAdmin, async function (req, res, next) {
  const users = await User.find({});
  res.status(200).send(users);
});

router.get("/users/:id", isAuth, isAdmin, async function (req, res, next) {
  try {
    let id = req.params.id;
    const histories = await History.find({ user: req.params.id }).populate(
      "user"
    );
    res.status(200).send(histories);
  } catch (error) {
    res.status(300).send({ msg: "Error getting User" });
  }
});

router.get("/export", isAuth, isAdmin, async function (req, res, next) {
  // Get the Data from the Database
  const data = await Product.find({});

  const json2csv = require("json2csv").parse;

  //For unique file name
  const dateTime = new Date()
    .toISOString()
    .slice(-24)
    .replace(/\D/g, "")
    .slice(0, 14);

  const filePath = path.join(
    __dirname,
    "../",
    "public",
    "Products-" + dateTime + ".csv"
  );

  let csv;

  const fields = [
    "product",
    "serial",
    "batch_no",
    "pin_code",
    "QRcode",
    "points",
  ];

  try {
    csv = json2csv(data, { fields });
  } catch (err) {
    return res.status(500).json({ err });
  }

  fs.writeFile(filePath, csv, function (err) {
    if (err) {
      return res.json(err).status(500);
    } else {
      setTimeout(function () {
        fs.unlink(filePath, function (err) {
          // delete this file after 30 seconds
          if (err) {
            console.log(err);
          }
          console.log("File has been Deleted");
        });
      }, 30000);
      res.download(filePath);
    }
  });
});

router.get("/used_product", isAuth, isAdmin, async function (req, res, next) {
  try {
    const histories = await History.find({}).populate("user");
    res.status(200).send(histories);
  } catch (error) {
    console.log(error);
    res.status(300).send({ msg: "Error getting products" });
  }
});

router.get("/admin-dashboard", isAuth, isAdmin, async function (
  req,
  res,
  next
) {
  const registeredUsers = await User.countDocuments({ account: "user" });
  const products = await Product.countDocuments({});
  const usedPin = await History.countDocuments({});
  res.status(200).send({ registeredUsers, products, usedPin });
});

router.get("/products", isAuth, isAdmin, async function (req, res, next) {
  const results = await Product.find({});
  res.status(200).send(results);
});

module.exports = router;
