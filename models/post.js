// models/post.js
const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Asegúrate de tener un modelo de usuario
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    // Otros campos que puedas necesitar
}, { timestamps: true });

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
