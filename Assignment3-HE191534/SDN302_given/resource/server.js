const express = require('express');
const app = express();
const connectDB = require('./config/db');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get('/', async (req, res) => {
    try {
        res.send({ message: 'Welcome to Practical Exam!' });
    } catch (error) {
        res.send({ error: error.message });
    }
});
app.get('/api/classes', require('./routes/classRoute'));
app.get('/api/students', require('./routes/studentRoute'));
app.get('/api/auth', require('./routes/authRoute'));

connectDB();
const PORT = process.env.PORT || 9999;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));