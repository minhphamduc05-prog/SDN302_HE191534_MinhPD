
const express = require('express');
const router = express.Router();

const loanController = require('../controllers/loanController');

router.get('/', loanController.getAllLoans);
router.get('/member/:memberID', loanController.getLoansByMemberId);
router.get('/:id', loanController.getLoanById);
router.post('/', loanController.createLoan);

module.exports = router;
