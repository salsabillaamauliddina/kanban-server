const router = require('express').Router();
const taskRouter = require('./authRouter');
const authRouter = require('./authRouter');
const { authentication} = require('../middlewares/auth');


router.use('/', authRouter);
router.use(authentication);
router.use('/task', taskRouter);

module.exports = router;