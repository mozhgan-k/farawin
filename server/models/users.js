const { insertOne, updateOne, findAll, deleteOne, findOne } = require ("../db");
const { ObjectId } = require("mongodb");
const user = require("../handler/user");
const jwt = require("jsonwebtoken");

const insertUser = async (body) =>{
  try{
  if (!body.username) {
    return { success: false, error: "Missing username" };
  }
  if (body.username.length < 3) {
    return { success: false, error: "Username must be more than 3 letters" };
  }
  if (!body.pass || body.pass.length < 8) {
    return { success: false, error: "Password must be more than 8 letters" };
  }
  if (!body.email) {
    return { success: false, error: "Invalid email" };
  }
  const findUser = await findone({username: body.username})
  if (findUser.success === false) {
    const ress = await insertOne("users", {username: body.username, email: body.email, pass: body.pass, role: 'user' })
    return ress 
  } else {
    return { success:false,status:400,error:'User already exist'} 
  }
 } catch (err) {
    return { success:false,status:500,error:err}
  }

}

const findone = async (Data) => {
    try {
        const user = await findOne('users',Data)
      if (!user) {
        return { success: false , status:403, error: 'User not found'}
      }
      return user
     } catch (err) {
     return { success: false,status:500 }
    }
}
const update = async (Data) => {
  try {
    const id = { _id: ObjectId(Data._id) }
    const DataToUpdate = {_id: ObjectId(Data._id), username: Data.username, email: Data.email, pass: Data.pass}
    const user = await updateOne('users', DataToUpdate, id)
    if (!user) {
      return { success: false, error: 'User not found' }
    }
    return user
  } catch (err) {
    console.log(err)
    return { success: false, error: 'User not found'}
  }
}

const get = async (Data) => {
  try {
    const user = await findAll('users', Data)
    if (!user) {
      return { success: false, error: 'User not found' }
  }
  return user
} catch (err) {
  return { success: false, error: 'User not found'}
  }
}


const remove = async (Data) => {
try {
  await deleteOne('users', Data)
  if(!user) {
  return { success: false, error: 'User not found'}
  }
  return user
} catch (err) {
  return { success: false, error: 'User not found'}
  }
}
const userToken = async (token) => {
  const decoded = jwt.verify(token, "mozhgan");
  const user = await findOne('users',{_id: ObjectId(decoded.id)})
  return user
}

module.exports = {findone, insertUser, update, get, remove, userToken}