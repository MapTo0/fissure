import User from './../models/user/UserModel'
import helper from './../utils/helpers'

const UserException = (code, message) => {
  return {
    code: code,
    message: message
  }
}

const fields = [
  'firstname',
  'lastname',
  'email',
  'username',
  'address',
  'mobile',
  'avatar',
  'active',
  'admin'
]

const getUser = async (req, res, next) => {
  try {
    let user = await User.findById(req.params.uuid)

    if (!user) {
      throw new UserException(300, 'User does not exit')
    }

    res
      .status(200)
      .send(helper.response(helper.serialize('users', fields, user)))
  } catch (e) {
    next(e)
  }
}

/**
 * @param  {} req
 * @param  {} res
 * @param  {} next
 */
const createUser = async (req, res, next) => {
  try {
    req.check('firstname', 'firstname is required').notEmpty()
    req.check('lastname', 'lastname is required').notEmpty()
    req.check('email', 'email is required').notEmpty()
    req.check('email', 'email is not valid').isEmail()
    req.check('password', 'password is required').notEmpty()
    req.check('password', 'password min 4 symbol').isLength({min: 4})
    // req.check('password', 'password is not equal').equals(req.body.confirmPassword)
    // req.check('username', 'username is required').notEmpty()

    let errors = req.validationErrors()
    if (errors) {
      errors = errors.map(item => item.msg) || []

      return res.status(422).send(helper.response('', 422, true, errors))
    }

    let {firstname, lastname, email, password, username} = req.body

    let data = {
      firstname: firstname,
      lastname: lastname,
      email: email,
      password: password,
      username: username
    }

    let user = new User(data)
    user = await user.save()

    res
      .status(200)
      .send(helper.response(helper.serialize('users', fields, user)))
  } catch (e) {
    next(e)
  }
}

const updateUser = async (req, res, next) => {
  try {
    let user = await User.findById(req.params.uuid)
    if (!user) {
      throw new UserException(300, 'User does not exit')
    }

    let {
      firstname,
      lastname,
      address,
      country,
      mobile,
      email,
      password,
      avatar
    } = req.body

    user.firstname = firstname || user.firstname
    user.lastname = lastname || user.lastname
    user.address = address || user.address
    user.country = country || user.country
    user.mobile = mobile || user.mobile
    user.email = email || user.email
    user.password = password || user.password
    user.avatar = avatar || user.avatar

    user = await user.save()

    res
      .status(200)
      .send(helper.response(helper.serialize('users', fields, user)))
  } catch (e) {
    next(e)
  }
}

const deactivateProfile = async (req, res, next) => {
  try {
    let {userId} = req.params

    let user = User.findById(userId)

    if (!user) {
      throw new UserException(300, 'User does not exit')
    }
    user.active = false
    user = await user.save()

    res.status(200).send(helper.response({data: true}))
  } catch (e) {
    next(e)
  }
}

const uploadAvatar = async (req, res, next) => {
  try {
    res.status(200).send(helper.response([]))
  } catch (e) {
    next(e)
  }
}

export default {
  getUser,
  createUser,
  updateUser,
  uploadAvatar,
  deactivateProfile
}
