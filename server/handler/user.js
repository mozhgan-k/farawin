"use strict";
const jwt = require("jsonwebtoken");
const { ObjectId } = require("mongodb");
const { getInstance } = require("../db");
const {findone, insertUser, get, update, remove, userToken} = require("../models/users")

const login = async (req, res) => {
    if (!req.body.username) {
      res.status(400).json({ success: false, error: "Missing username" });
      return;
    }
    if (req.body.username.length < 3) {
      res.status(400).json({ success: false, error: "Invalid username" });
      return;
    }
    if (!req.body.pass || req.body.pass.length < 8) {
      res.status(400).json({ success: false, error: "Invalid pass" });
      return;
    }
    const ress = await findone(req.body)
    if (ress.success===false) {
      res.status(400).json({success: false, error: 'User not found'})
    } else {
      const ok = await generateToken(ress._id);
      res.status(200).json({ member: ress, access_token: ok.access_token, refresh_token: ok.refresh_token });
    }
}
const register = async (req, res) => {
  const ress = await insertUser(req.body)
  if (ress.success === false) {
    res.status(400).json( {success:false, error: ress.error} )
  }else{
    res.json(ress)
  }
};

const users = async (req, res) => {
  const ress = await get({})
  if (ress.success === false) {
    res.status(403).json( {success: false, error: 'Users not found'})
  } else {
    res.json(ress)
  }
}

const edit = async (req, res) => {
  const ress = await update(req.body)
  if (ress.success === false) {
    res.status(400).json( {success: false, error: 'Invalid user'} )
  } else {
    res.json(ress)
  }
}

const hazf = async (req, res) => {
  const ress = await remove({_id: ObjectId(req.body._id)})
  if (ress.success === false) {
    res.status(400).json( {success: false, error: 'Password was wrong!'} )
  } else {
    res.json(ress)
  }
}

const refreshToken = async (req, res) => {
  try {
    const token = req.cookies.refresh_token;
    if (!token) {
      console.error("token not found");
      res.status(401).json({ success: false });
      return;
    }
    const decoded = jwt.verify(token, "mozhganToken");
    const ok = await generateToken(res, decoded.id);
    res.json(ok);
  } catch (err) {
    console.log(err);
    res.status(500).json({ success: false });
  }
};

const generateToken = async (userID) => {
  const accessToken = jwt.sign({ id: userID }, "mozhgan", { expiresIn: "1d" });
  const rToken = jwt.sign({ id: userID }, "mozhganToken", { expiresIn: "10d" });

  const db = await getInstance();
  const users = db.collection("users");
  const ok = await users.updateOne(
    { _id: userID },
    { $set: { refreshToken: rToken } }
  );
  if (!ok) {
    return { success: false };
  }
  return { success: true, access_token: accessToken, refresh_token: rToken };
};

const getPerson = async (req,res) => {
  const token = JSON.parse(req.headers.access_token)
  const ress = await userToken(token)
  if (ress.success == false) {
    res.status(400).json({error: "User not found"})
  } else {
    res.json(ress)
  }
}

module.exports = { login, register, refreshToken, users, edit, hazf, getPerson };
