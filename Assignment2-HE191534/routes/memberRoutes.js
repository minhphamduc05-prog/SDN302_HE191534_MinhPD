const router = require('express').Router();
const c = require('../controllers/memberController');

router.get('/', c.getAllMembers);
router.get('/:id', c.getMemberById);
router.post('/', c.createMember);
router.put('/:id', c.updateMember);
router.delete('/:id', c.deleteMember);
module.exports = router;
