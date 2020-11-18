import User from "../models/User";

module.exports = {
  isAuthenticated: (req, res, next) => {
    if (req.isAuthenticated()) {
      return next();
    } else {
      res.status(401).send({ message: "Please login to view this page" });
    }
  },

  isAdmin: (req, res, next) => {
    let adminCheck = req.user.account === "admin";
    if (req.isAuthenticated() && adminCheck) {
      return next();
    } else {
      res.status(401).send({
        message: "You are not authorized to view this page",
      });
    }
  },

  isUser: (req, res, next) => {
    let userCheck = req.user.account === "user";
    if (req.isAuthenticated() && userCheck) {
      return next();
    } else {
      res.status(401).send({
        message: "You are not authorized to view this page",
      });
    }
  },
};
