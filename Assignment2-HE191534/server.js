require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const bookRoutes = require('./routes/bookRoutes');
const memberRoutes = require('./routes/memberRoutes');
const loanRoutes = require('./routes/loanRoutes');

const app = express();
app.use(express.json());

app.get('/', (req, res) => res.json({ message: 'Lab2 Library API is running' }));
app.use('/api/books', bookRoutes);
app.use('/api/members', memberRoutes);
app.use('/api/loans', loanRoutes);

const PORT = process.env.PORT || 9999;
connectDB().then(() => app.listen(PORT, () => console.log(`Server running at http://localhost:${PORT}`)));
