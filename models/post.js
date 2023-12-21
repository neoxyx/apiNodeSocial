const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    date: { type: Date, default: Date.now },
    isDeleted: { type: Boolean, default: false }
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
