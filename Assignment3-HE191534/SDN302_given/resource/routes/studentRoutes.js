const router = require('express').Router();
const verifyToken = require('../middlewares/verifyToken');

router.get('/:studentId/attendances', verifyToken, async (req, res) => {
    res.status(200).json({ message: `Successfully retrieved attendances by studentId: ${req.params.studentId}` });
});
  
module.exports = router;
