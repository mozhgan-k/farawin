"use strict"
const { ObjectID } = require("mongodb");
const { insertOne, updateOne, findAll, deleteOne } = require ("../db");
const { findone } = require('./users') 
const insert = async (body) => {
    if (!body.desc) {
    return { success: false, error: "Missing description"};
    }
    if (body.desc.length <= 6) {
        return { success: false, error: "Description must be more tham 6 letters"};
    }
    const user = await findone({username: body.user})
    if (!user) {
        return { success: false, error: "User not found"};
    }else {
    const res = await insertOne("task", {desc: body.desc, listId:body.listId, user: body.user, boardId: body.boardId });
    return res
    }
};

const update = async (body) => {
    if (!body._id || !isNaN(body._id)) {
        return {success: false, error: "Invalid task"};
    }
    if (!body.desc) {
        return {success: false, error: "Missing description"};
    }
    if (body.desc.length <= 6) {
        return {success: false, error: "Description must be more tham 6 letters"};
    }
    const res = await updateOne(
        "task",
        {desc: body.desc},
        {_id: ObjectID(body._id) }
        );
        return {success: true, nModified: res.nModified};
};

const get = async (body) => {
    const res = await findAll("task", body);
    if (!res) {
        return {success: false, error: "Task not found"};
    }
    return res
};

const remove = async (body) => {
    if (!body._id || body._id.length != 24) {
        return {success: false, error: "Invalid task"};
    }
    const res = await deleteOne("task", {_id: ObjectID(body._id)});
    return {success: true, task: res};
};

module.exports = {insert, update, get, remove};