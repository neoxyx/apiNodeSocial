// middlewares/authMiddleware.js
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.header('x-auth-token');

    if (!token) {
        return res.status(401).json({ error: 'Acceso no autorizado, falta el token' });
    }

    try {
        const decoded = jwt.verify(token, 'tu-secreto-super-seguro'); // Asegúrate de cambiar esto
        req.user = decoded.user;
        next();
    } catch (error) {
        console.error(error);
        res.status(401).json({ error: 'Token no válido' });
    }
};
