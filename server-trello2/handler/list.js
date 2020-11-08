"use strict"
const { ObjectID } = require("mongodb");
const { findOne } = require("../db");
const { getBoard } = require("../models/boards");
const list = require("../models/lists");
const create = async ( req, res) => {
    try {
        const resp = await list.insert(req.body);
        res.json(resp);
    } catch (err) {
        res.status(500).json({success: false, error: 'Invalid name'});
    }
};
const update = async (req, res) => {
    try {
        const resp = await list.update(req.body);
        res.json(resp);
    } catch (err) {
        res.status(500).json({success: false, error: 'Invalid list'});
    }
};

const listslist = async (req, res) => {
    try {
        const board = await getBoard({ _id: ObjectID(req.params.id)})
        const id = { boardId:req.params.id};
        const resp = await list.get(id);
        res.json({board:board, list:resp});
    } catch (err) {
        res.status(500).json({success: false, error: 'Lists not found'});
    }
};

const remove = async (req, res) => {
    try {
        const resp = await list.remove(req.body);
        res.json(resp);
    } catch (err) {
        res.status(500).json({success: false, error: 'Invalid list'});
    }
}
module.exports = { create, update, listslist, remove};