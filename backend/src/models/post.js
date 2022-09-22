const mongoose = require('mongoose');

// Schema describes the structure of a document that we save to the database
const Schema = mongoose.Schema;

const postSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    author: {
        type: String,
        required: true,
    }
}, { timestamps: true });

// export the schema to a model named 'Post' which gets pluralized in the database - this creates a new collection
module.exports = mongoose.model('Post', postSchema);
