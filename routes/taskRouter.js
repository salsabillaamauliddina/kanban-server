const router = require('express').Router();
const TaskController = require('../controllers/taskController');
const { authorization } = require('../middlewares/auth');

// ! authenticate
router.get('/', TaskController.showTasks);
router.post('/', TaskController.createTask);

// ! authorization
router.get('/:id', authorization, TaskController.getTaskById);
router.patch('/:id',authorization, TaskController.updateCategory);
router.put('/:id',authorization, TaskController.updateTask);
router.delete('/:id', authorization, TaskController.destroyTask);

module.exports = router;