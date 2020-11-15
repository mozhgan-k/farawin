"use strict"
const { ObjectID } = require("mongodb");
const { insertOne, updateOne, findAll, deleteOne } = require("../db");

const insert = async (body) => {
    if (!body.name) {
        return {success: false, error: "Missing list name"};
    }
    if (body.name.length <= 3) {
        return {success: false, error: "Name must be more than 3 letters"};
    }
    const data = { name: body.name, boardId: body.boardId }
    console.log(data)
    await insertOne("list", data);
    return {success: true};
};

const update = async (body) => {
    if (!body._id || !isNaN(body._id)) {
        return {success: false, error: "Invalid list"};
    }
    if (!body.name || body.name.length < 3) {
        return {success: false, error: "Name must be more than 3 letters"};
    }
    const res = await updateOne("list", {name: body.name}, {_id: ObjectID(body._id)});
    return {success: true, nModified: res.nModified};
};

const get = async (param) => {
    const res = await findAll("list", param );
    console.log(res)
    if (!res) {
        return {success: false, error: "List not found"};
    }
    return res
};

const remove = async (body) => {
    if (!body._id || body._id.length != 24) {
        return {success: false, error: "Invalid list"};
    }
    const res = await deleteOne("list", {_id: ObjectID(body._id)});
    return {success: true, list: res};
};

module.exports = { insert, update, get, remove };