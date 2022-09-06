const router = require('express').Router();
const taskRouter = require('./authRouter');
const authRouter = require('./authRouter');

router.use('/', authRouter);

router.use('/task', taskRouter);


module.exports = router;