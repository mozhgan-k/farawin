"use strict";
const jwt = require("jsonwebtoken");
const check = (req, res, next) => {
  try {
    const token = JSON.parse(req.headers.access_token);
    console.log(token)
    if (!token) {
      console.error("token not found");
      res.status(401).json({ success: false });
      return;
    }
    const decoded = jwt.verify(token, "mozhgan");
    console.log("jwt verify", decoded);
    next();
  } catch (err) {
    console.log(err)
    res.status(403).json({ success: false, error: "invalid token" });
    return;
  }
};

module.exports = { isAuth: check };
