const { verifyToken } = require('../helpers/jwt');
const { User, Task } = require('../models');

async function authentication (req, res, next) {
  try {
    const decoded = verifyToken(req.headers.access_token);
    const user = await User.findOne({
      where: { email: decoded.email}
    })

    if (!user) {
      next({name: 'accessDenied'})
    }

    req.user = {
      id: user.id,
      email: user.email
    }

    next()

  } catch (err) {
    next(err)
  }
}

async function authorization (req, res, next) {
  try {
    const task = await Task.findOne({
      where: {
        id: +req.params.id
      }
    })

    if (!task) {
      next({ name: 'resourceNotFound'})
    } else if (task.UserId !== req.user.id) {
      next({ name: 'accessDenied'})
    } else {
      next()
    }
  } catch (err) {
    next()
  }
}


module.exports = {
  authentication,
  authorization
}