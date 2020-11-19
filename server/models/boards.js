"use strict";
const { ObjectID } = require("mongodb");
const { insertOne, updateOne, findAll, deleteOne, findOne } = require("../db");
const { userToken } = require("./users");
const insert = async (body, token ) => {
  if (!body.name) {
    return { success: false, error: "Missing name" };
  }
  if (body.name.length <= 3) {
    return { success: false, error: "Name must be more than 3 letters" };
  }
  if (!body.desc || body.desc.length < 8) {
    return { success: false, error: "Description must be more than 8 letters" };
  }
  const user = await userToken(token)
  const res = await insertOne("board", { name: body.name, desc: body.desc, userID: user._id });
  return { success: true, boardID: res.insertedId };
};

const update = async (body) => {
  if (!body._id || !isNaN(body._id)) {
    return { success: false, error: "Invalid board" };
  }
  if (!body.name) {
    return { success: false, error: "Missing name" };
  }
  if (body.name.length < 3) {
    return { success: false, error: "Name must be more than 3 letters" };
  }
  if (!body.desc || body.desc.length < 8) {
    return { success: false, error: "Description must be more than 8 letters" };
  }
  const res = await updateOne(
    "board",
    { name: body.name, desc: body.desc },
    { _id: ObjectID(body._id) }
  );
  return { success: true, nModified: res.nModified };
};

const getBoard = async (id) => {
  const res = await findOne("board", id);
  if (!res) {
    return { success: false, error: "Board not found" };
  }
  return res
};

const get = async (token) => {
  const user = await userToken(token)
  if (user.role == 'admin') {
    console.log('i am admin')
    const res = await findAll("board",{});
    return { success: true, board: res };
  }
  console.log('i am not admin :(')
  const res = await findAll("board",{userID: user._id});
    return { success: true, board: res };
};

const remove = async (body) => {
  if (!body._id || body._id.length != 24) {
    return { success: false, error: "Invalid board" };
  }
  const res = await deleteOne("board", { _id: ObjectID(body._id) });
  return { success: true, board: res };
};

module.exports = { insert, update, get, remove, getBoard };
