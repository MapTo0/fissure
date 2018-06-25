import helper from './../utils/helpers'
import passport from 'passport'
import jwt from 'jsonwebtoken'
import './../middlewares/auth'
import {APPSECRET} from './../../config/auth'

const login = async (req, res, next) => {
  try {
    if (!req.body.email || !req.body.password) {
      return res.status(400).json({
        message: 'Something is not right with your input'
      })
    }
    passport.authenticate('local', {session: false}, (err, user, info) => {
      if (err) {
        return res.status(401).send({success: false, message: 'Login Failed'})
      }
      if (!user) {
        return res.status(401).send({success: false, message: info.message})
      }
      if (user) {
        req.login(user, {session: false}, (err) => {
          if (err) {
            return res.status(401).send({success: false, message: err})
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
