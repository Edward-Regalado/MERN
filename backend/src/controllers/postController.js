const Post = require('../models/post.js');
const mongoose = require('mongoose');

// GET all posts
const getPosts = async (req, res) => {
    const allPosts = await Post.find({}).sort({createdAt: -1});
    res.status(200).json(allPosts);
};

// GET a single post
const getPost = async (req, res) => {
    // const { id } = req.params; // destructor to get id
    const id  = req.params.id;
    // validate our id or else the server will crash
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({ error: 'No such post' });
    }
    const post = await Post.findById(id);
    if(!post){
        // need to return here otherwise the rest of the code will run
        return res.status(404).json({ error: 'No post found' });
    } else{
        res.status(200).json(post);
    }
};

// CREATE a new post
const createPost = async (req, res) => {
    const { title, description, author } = req.body;
    // add doc to db
    try {
        const post = await Post.create({
            title, description, author
        })
        res.status(200).json(post);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
};

// DELETE a single post
const deletePost = async (req, res) => {
    const id = req.params.id;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({ error: 'No post found' });
    }
    // in mongoose _id is the property name
    const post = await Post.findOneAndDelete({
        _id: id,
    });
    if(!post){
        return res.status(404).json({ error: 'No post found' });
    } else {
        res.status(200).json(post);
    }
}

// UPDATE a single post
const updatePost = async (req, res) => {
    const id = req.params.id;
    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({ error: 'No post found' });
    }
    const post = await Post.findOneAndUpdate({
        _id: id}, {...req.body});
    if(!post){
        return res.status(404).json({ error: 'No post found' });
    } else {
        res.status(200).json(post);
    }
}

module.exports = {
    getPosts,
    getPost,
    createPost,
    deletePost,
    updatePost
}