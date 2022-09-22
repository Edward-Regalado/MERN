const mongoose = require('mongoose');

// Schema describes the structure of a document that we save to the database
const Schema = mongoose.Schema;

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        unique: false
    },
}, { timestamps: true });

// export the schema to a model named 'Post' which gets pluralized in the database - this creates a new collection
module.exports = mongoose.model('User', userSchema);
