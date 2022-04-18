
const userModel = require('../Model/userModel');

const add = (data) =>{
    const user = new userModel(data);
    return user.save();
};

const getUserDetails = ()=> {
    const projection = {__v:0, __id:0};
    const filter= {};
    return userModel.find(filter, projection);
}

const getUser = (firebaseUID) => {
    const filter = { firebaseUID };
    const projection = {__v: 0, _id:0, creeatedAt: 0};
    return userModel.findOne(filter, projection);
}

module.exports = { add, getUser, getUserDetails };