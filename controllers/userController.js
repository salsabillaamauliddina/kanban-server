const { User } = require('../models')
const { comparePassword, hashPassword } = require('../helpers/bcrypt');
const { generateToken } = require('../helpers/jwt')


class UserController {
  static register (req,res, next) {
    const { name, email, password} = req.body;
    const newUser = { name, email, password };

    User.create(newUser)
      .then((user) => {
        const registerUser = {
          id: user.id,
          email: user.email
        }

        return res.status(201).json(registerUser);
      })

      .catch((err) => {
        next(err);
      })
  }

  static login (req, res, next) {
    const { email, password } = req.body;

    User.findOne({
      where: {email}
    })

    .then((user) => {
      if (!user) {
        next({ name: 'InvalidPassOrEmail' })
      } else {
        const isMatch = hashPassword(password, user.password);
        if (!isMatch) {
          next({ name: 'InvalidPassOrEmail' })
        } else {
          const payload = { id: user.id, email: user.email }
          const access_token  = generateToken(payload);
          res.status(200).json({access_token})
        }
      }
    })

    .catch((err) => {
      next(err)
    })
  }

  // static googleLogin (req, res, next) {

  // }
}

module.exports = UserController;