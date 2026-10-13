const router = require('express').Router();
const c = require('../controllers/bookController');

router.get('/', c.getAllBooks);
router.get('/:id', c.getBookById);
router.post('/', c.createBook);
router.put('/:id', c.updateBook);
router.delete('/:id', c.deleteBook);
module.exports = router;
