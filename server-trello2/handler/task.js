"use strict"
const task = require("../models/tasks");
const create = async (req, res) => {
    try {
        const resp = await task.insert(req.body);
        res.json(resp);
    } catch (err) {
        console.log(err);
        res.status(500).json({success: false});
    }
};

const update = async (req, res) => {
    try {
        const resp = await task.update(req.body);
        res.json(resp);
    } catch (err) {
        console.log(err);
        res.status(500).json({success: false});
    }
};

const taskslist = async (req, res) => {
    try {
        const id = {boardId: req.params.id};
        const resp = await task.get(id);
        res.json(resp);
    } catch (err) {
        console.log(err);
        res.status(500).json({success:false});
    }
};
const TasksUser = async (req, res) => {
    try {
        const user = {user: req.params.user};
        const resp = await task.get(user);
        res.json(resp);
    } catch (err) {
        console.log(err);
        res.status(500).json({success:false});
    }
};

const remove = async (req, res) => {
    try {
        const resp = await task.remove(req.body);
        res.json(resp);
    } catch(err) {
        console.log(err);
        res.status(500).json({success: false});
    }
}

module.exports = {create, update, taskslist, remove, TasksUser};