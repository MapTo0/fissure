import User from './../models/user/UserModel'
import passport from 'passport'
import {Strategy as LocalStrategy} from 'passport-local'
import {APPSECRET} from './../../config/auth'

import {Strategy as _Strategy, ExtractJwt as _ExtractJwt} from 'passport-jwt'
const JWTStrategy = _Strategy
const ExtractJWT = _ExtractJwt

passport.use(
  'local',
  new LocalStrategy(
    {
      usernameField: 'email',
      passwordField: 'password'
    },
    (email, password, callback) => {
      return User.findOne({email: email}).then(user => {
        if (!user) {
          return callback(null, false, {message: 'Incorrect email'})
        }
        user
          .verifyPassword(password)
          .then(valid => {
            console.log(valid)
            if (valid) {
              return callback(null, user, {message: 'Logged In Successfully'})
            } else {
              return callback(null, false, {message: 'Wrong email or password'})
            }
          })
          .catch(err => {
            console.log(err)
          })
      })
    }
  )
)

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: APPSECRET
    },
    (jwtPayload, callback) => {
      return User.findById(jwtPayload.id, '-password')
        .then(user => {

          return callback(null, user)
        })
        .catch(err => {
          return callback(err)
        })
    }
  )
)
