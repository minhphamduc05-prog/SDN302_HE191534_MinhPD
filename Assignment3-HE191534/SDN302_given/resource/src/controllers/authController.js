const User = require('../models/Student');
const jwt = require('jsonwebtoken');

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        if (typeof email !== 'string' ||
            typeof password !== 'string' ||
            !email.includes('@')) {
            return res.status(400).json({
                message: 'Dữ liệu không hợp lệ'
            });
        }

        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({
                message: 'Email hoặc mật khẩu không đúng'
            });
        }

        // Password = mã sinh viên + @123
        const expectedPassword = email.split('@')[0] + '@123';

        if (password !== expectedPassword) {
            return res.status(401).json({
                message: 'Email hoặc mật khẩu không đúng'
            });
        }

        const token = jwt.sign(
            { userId: user._id.toString() },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        return res.status(200).json({
            message: 'Đăng nhập thành công',
            token
        });

    } catch (error) {
        return res.status(500).json({
            message: 'Lỗi server'
        });
    }
};

module.exports = { login };