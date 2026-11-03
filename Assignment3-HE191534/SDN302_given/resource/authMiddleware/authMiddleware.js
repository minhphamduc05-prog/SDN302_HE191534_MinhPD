const jwt = require('jsonwebtoken');

const verifyToken = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({
            message: 'Chưa cung cấp token'
        });
    }

    const parts = authHeader.split(' ');

    if (parts.length !== 2 || parts[0] !== 'Bearer') {
        return res.status(401).json({
            message: 'Token không đúng định dạng'
        });
    }

    const token = parts[1];

    try {
        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET,
            { algorithms: ['HS256'] }
        );

        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({
            message: 'Token không hợp lệ hoặc đã hết hạn'
        });
    }
};

module.exports = verifyToken;