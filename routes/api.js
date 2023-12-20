// routes/api.js
const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const authMiddleware = require('../middlewares/authMiddleware');
// Ruta para obtener todas las publicaciones
router.get('/posts', authMiddleware, postController.getPosts);
// Ruta para crear un nuevo post
router.post('/posts', authMiddleware, postController.createPost);
// Ruta para editar un post
router.put('/:postId/edit', postController.editPost);
// Ruta para borrar un post por ID
router.delete('/posts/:id', postController.borrarPost);

module.exports = router;
