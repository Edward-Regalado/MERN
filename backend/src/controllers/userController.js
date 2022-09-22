const User = require('../models/user.js');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

// GET all users
const getUsers = async (req, res) => {
    const allUsers = await User.find({}).sort({createdAt: -1});
    res.status(200).json(allUsers);
};

// GET a single user
const getUser = async (req, res) => {
    // const id  = req.params.id; // optional way to get id
    const { id } = req.params; // deconstruct to get id
    // validate id or else the server will crash
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({ error: 'No such user' });
    }
    const user = await User.findById(id);
    if(!user){
        // need to return here otherwise the rest of the code will run
        return res.status(404).json({ error: 'No post found' });
    } else {
        res.status(200).json(post);
    }
};

// CREATE a new post
const createUser = async (req, res) => {
    // req.body.username & req.body.password
    const { username, password } = req.body;
    try {
        // optional way 1
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);

        // optional way 2
        // this will autogenerate the salt for us
        // const hashedPassword = await bcrypt.hash(hashedPassword, 10);

        if(hashedPassword){
            const user = await User.create({
                username, password: hashedPassword
            });
            res.status(200).json(user);
            console.log(`SALT: ${salt}`);
            console.log(`HASHED PASSWORD ${hashedPassword}`);
        }
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// DELETE a single user
// const deleteUser = async (req, res) => {
//     const id = req.params.id;
//     if(!mongoose.Types.ObjectId.isValid(id)){
//         return res.status(404).json({ error: 'No post found' });
//     }
//     // in mongoose _id is the property name
//     const post = await Post.findOneAndDelete({
//         _id: id,
//     });
//     if(!post){
//         return res.status(404).json({ error: 'No post found' });
//     } else {
//         res.status(200).json(post);
//     }
// }

// UPDATE a single user
// const updateUser = async (req, res) => {
//     const id = req.params.id;
//     if(!mongoose.Types.ObjectId.isValid(id)){
//         return res.status(404).json({ error: 'No post found' });
//     }
//     const post = await Post.findOneAndUpdate({
//         _id: id}, {...req.body});
//     if(!post){
//         return res.status(404).json({ error: 'No post found' });
//     } else {
//         res.status(200).json(post);
//     }
// }

module.exports = {
    getUsers,
    getUser,
    createUser,
    // deletePost,
    // updatePost
}