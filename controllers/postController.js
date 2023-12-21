const Post = require('../models/post');

exports.getPosts = async (req, res) => {
  try {
    const posts = await Post.find({ isDeleted: false }).populate('user', 'username'); // 'username' es el campo que quieres recuperar del usuario
    res.json(posts);
  } catch (error) {
    console.error('Error al obtener los posts:', error);
    res.status(500).json({ error: 'Error al obtener los posts' });
  }
};

exports.createPost = async (req, res) => {
  try {
    const { title, content } = req.body;
    const userId = req.user.id;

    const newPost = new Post({
      title,
      content,
      user: userId,
    });

    await newPost.save();
    res.json(newPost);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error del servidor');
  }
};

exports.editPost = async (req, res) => {
  try {
    const postId = req.params.id;
    const { title, content } = req.body;

    let post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ msg: 'Publicación no encontrada' });
    }

    // Verificar si el usuario es el propietario de la publicación
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'No autorizado para editar esta publicación' });
    }

    post.title = title;
    post.content = content;

    await post.save();
    res.json(post);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Error del servidor');
  }
};

exports.deletePost = async (req, res) => {
  const postId = req.params.id;
  try {
    // Actualiza el campo isDeleted en lugar de eliminar físicamente el post
    const updatedPost = await Post.findById(
      postId,
      { isDeleted: true },
      { new: true } // Devuelve el post actualizado
    );

    if (!updatedPost) {
      return res.status(404).json({ error: 'Post not found' });
    }

    updatedPost.isDeleted = true;
    await updatedPost.save();

    res.json({ message: 'Post marked as deleted', deletedPost: updatedPost });
  } catch (error) {
    console.error('Error marking post as deleted:', error);
    res.status(500).json({ error: 'Error marking post as deleted' });
  }
};

exports.likePost = async (req, res) => {
  const postId = req.params.postId;

  try {
    // Busca el post por ID
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    // Verifica si el usuario ya dio like al post (puedes adaptar esto según tus necesidades)
    const userId = req.user.id; // Suponiendo que tienes el ID del usuario en el objeto de solicitud

    if (post.likedBy.includes(userId)) {
      return res.status(400).json({ error: 'User already liked this post' });
    }

    // Incrementa la cantidad de likes y agrega el ID del usuario al array likedBy
    post.likes += 1;
    post.likedBy.push(userId);

    // Guarda los cambios en la base de datos
    const updatedPost = await post.save();

    res.json({ message: 'Post liked successfully', updatedPost });
  } catch (error) {
    console.error('Error liking post:', error);
    res.status(500).json({ error: 'Error liking post' });
  }
};