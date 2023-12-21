// routes/api.js
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const postController = require('../controllers/postController');
const authMiddleware = require('../middlewares/authMiddleware');
// Rutas protegidas
router.get('/user', authMiddleware, userController.getUserInfo);
router.put('/user', authMiddleware, userController.updateUserInfo);
// Ruta para obtener todas las publicaciones
router.get('/posts', authMiddleware, postController.getPosts);
// Ruta para crear un nuevo post
router.post('/posts', authMiddleware, postController.createPost);
// Ruta para editar un post
router.put('/posts/:id', authMiddleware, postController.editPost);
// Ruta para borrar un post por ID
router.delete('/posts/:id', authMiddleware, postController.deletePost);
router.post('/posts/:postId/like', authMiddleware, postController.likePost);
module.exports = router;
