"use strict";
const board = require("../models/boards");
const create = async (req, res) => {
  try {
    const resp = await board.insert(req.body);
    res.json(resp);
  } catch (err) {
    res.status(500).json({ success: false, error: 'Board not created' });
  }
};
const update = async (req, res) => {
  try {
    const resp = await board.update(req.body);
    res.json(resp);
  } catch (err) {
    res.status(500).json({ success: false, error: 'Invalid name or description' });
  }
};
const boardList = async (req, res) => {
  try {
    const resp = await board.get(req.body);
    res.json(resp);
  } catch (err) {
    res.status(500).json({ success: false, error: 'Boards not found' });
  }
};

const remove = async (req, res) => {
  try {
    const resp = await board.remove(req.body);
    res.json(resp);
  } catch (err) {
    console.log(err);
    res.status(500).json({success: false});
  }

}
module.exports = { create, update, boardList, remove };
