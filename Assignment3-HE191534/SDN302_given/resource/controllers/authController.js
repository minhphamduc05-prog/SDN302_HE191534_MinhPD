const jwt = require('jsonwebtoken');

const login = (req, res) => {
    const { email, password } = req.body || {};

    if (email !== 'HE191534@fpt.edu.vn' || password !== 'HE191534@123') {
        return res.status(401).json({ message: 'Email or password incorrect' });
    }

    const token = jwt.sign(
        { studentId: 'HE191534' },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );

    return res.json({ message: 'Login successful', token });
};

module.exports = { login };
