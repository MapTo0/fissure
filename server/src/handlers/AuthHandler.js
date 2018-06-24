import User from './../models/user/UserModel'
import helper from './../utils/helpers'
import passport from 'passport'
import jwt from 'jsonwebtoken'
import './../middlewares/auth'
import {APPSECRET} from './../../config/auth'

const AuthException = (code, message) => {
  return {
    code: code,
    message: message
  }
}

const login = async (req, res, next) => {
  try {
    if (!req.body.email || !req.body.password) {
      return res.status(400).json({
        message: 'Something is not right with your input'
      })
    }
    passport.authenticate('local', {session: false}, (err, user, info) => {
      if (err && !user) {
        res.status(401).send({success: false, msg: 'Login Failed'})
      } else {
        req.login(user, {session: false}, (err) => {
          if (err) {
            res.status(401).send({success: false, msg: err})
          } else {
            var token = jwt.sign(
              {
                id: user.id,
                email: user.email
              },
              APPSECRET,
              {
                expiresIn: 86400 // expires in 24 hours
              }
            )
            return res.json({success: true, token: token})
          }
        })
      }
    })(req, res, next)

    // res.status(200).send(helper.response([]))
  } catch (e) {
    next(e)
  }
}

const logout = async (req, res, next) => {
  try {
    req.session = null
    req.logout()
    res.status(200).send(helper.response([]))
  } catch (e) {
    next(e)
  }
}

export default {
  login,
  logout
}
