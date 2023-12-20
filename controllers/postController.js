// controllers/postController.js
const Post = require('../models/post');

exports.createPost = async (req, res) => {
    try {
        const { content } = req.body;
        const userId = req.user.id; // Suponiendo que has agregado el usuario al objeto req en tu middleware de autenticación

        const newPost = new Post({
            user: userId,
            content,
            createdAt: new Date()
        });

        await newPost.save();

        res.status(201).json({ message: 'Post creado exitosamente' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al crear el post' });
    }
};

exports.getPosts = async (req, res) => {
    try {
        const posts = await Post.find().populate('user', 'username'); // Popula el usuario para obtener el nombre de usuario
        res.json(posts);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener las publicaciones' });
    }
};

// Función para editar un post
exports.editPost = async (req, res) => {
    try {
        const postId = req.params.postId;
        const updatedPostData = req.body; // Datos actualizados del post

        // Aquí deberías realizar la lógica para actualizar el post en tu base de datos
        // Utiliza el modelo de Post y el ID del post para realizar la actualización

        const updatedPost = await Post.findByIdAndUpdate(postId, updatedPostData, { new: true });

        if (!updatedPost) {
            return res.status(404).json({ error: 'Post no encontrado' });
        }

        res.status(200).json(updatedPost);
    } catch (error) {
        console.error('Error al editar el post:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
};

// Método para borrar un post por ID
exports.borrarPost = async (req, res) => {
    try {
        const postId = req.params.id;

        // Verifica si el post existe
        const post = await Post.findById(postId);

        if (!post) {
            return res.status(404).json({ mensaje: 'Post no encontrado' });
        }

        // Verifica si el usuario actual tiene permisos para borrar el post (puedes implementar tu lógica aquí)
        // E.g., if (req.user.id !== post.userId) { return res.status(403).json({ mensaje: 'No tienes permisos' }); }

        // Borrar el post
        await Post.deleteOne({ _id: postId });

        return res.status(200).json({ mensaje: 'Post borrado exitosamente' });
    } catch (error) {
        console.error('Error al borrar el post:', error);
        return res.status(500).json({ mensaje: 'Error interno del servidor' });
    }
};
