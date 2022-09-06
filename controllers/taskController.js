const { Task, User } = require('../models/index');

class TaskController {
  static showTasks (req, res, next) {
    Task.findAll({
      order: [['id', 'ASC']],
      include: User
    })

    .then ((task) => {
      return res.status(200).json(task);
    })

    .catch((err) => {
      next(err);
    })
  }

  static createTask (req, res, next) {
    const UserId = +req.user.id;
    const { title, category, importance } = req.body;
    const newTask = { title, category, importance, UserId };

    Task.create(newTask)
      .then((task) => {
        return res.status(201).json(task);
      })
      .catch((err) => {
        next(err);
      })
  }

  static getTaskById (req, res, next) {
    const id = +req.params.id;

    Task.findByPk(id)
      .then((task) => {
        return res.status(200).json(task);
      })

      .catch((err) => {
        next(err);
      })
  }

  static updateTask (req, res, next) {
    const id = +req.params.id;
    const { title, category, importance } = req.body;
    const updatedTask = { title, category, importance };

    Task.update(updatedTask, {
      where: {id},
      returning: true,
      plain: true
    })

    .then((task) => {
      if (!task) {
        next({ name: ' accessDenied'})
      }
      return res.status(200).json(task[1]);
    })

    .catch((err) => {
      next(err);
    });
  }

  static updateCategory (req, res, next) {
    const id = +req.params.id;
    const category = { category: req.body.category };

    Task.update(category, {
      where: {id},
      returning: true,
      plain: true
    })

    .then((task) => {
      if (!task) {
        next({ name: 'resourceNotFound'});
      }
      return res.status(200).json(task[1]);
    })
    
    .catch((err) => {
      next(err);
    });
  }

  static destroyTask (req, res, next) {
    const id = +req.params.id;

    Task.destroy({
      where: {id}
    })

    .then((task) => {
      if (!task) {
        next({ name: 'resourceNotFound'});
      }
      return res.status(200).json({ msg: 'Task successfully deleted!'});
    })

    .catch((err) => {
      next(err);
    })
  }
}

module.exports = TaskController;