
const express = require('express');
const app = express();
const port = 3000;

const articleRouter = require('./routes/articleRouter');
const commentRouter = require('./routes/commentRouter');

app.use('/articles', articleRouter);
app.use('/comments', commentRouter);

app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});