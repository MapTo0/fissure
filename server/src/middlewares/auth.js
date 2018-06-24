// /**
//  * @param  {Passport.Passport} passport
//  */
// export default (passport) => {
//   return (req, res, next) => {
//     return passport.authenticate('jwt', {session: false})(req, res, next)
//   }
// }

// import {use} from 'passport'
// import {ExtractJwt, Strategy} from 'passport-jwt'
// import {Strategy as LocalStrategy} from 'passport-local'
// import User from './../models/user/UserModel'
// import {APPSECRET} from './../../config/auth'
// const ExtractJWT = ExtractJwt

// const JWTStrategy = Strategy

import User from './../models/user/UserModel'
import passport from 'passport'
import {Strategy as LocalStrategy} from 'passport-local'
import {ExtractJwt, Strategy} from 'passport-jwt'
import {APPSECRET} from './../../config/auth'
import jwt from 'jsonwebtoken'

const ExtractJWT = ExtractJwt
const JWTStrategy = Strategy

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
            if (valid) {
              return callback(null, false, {message: 'Logged In Successfully'})
            } else {
              return callback(null, false, {message: 'Invalid'})
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
      return User.findOne(jwtPayload.id, '-password')
        .then(user => {
          return callback(null, user)
        })
        .catch(err => {
          return callback(err)
        })
    }
  )
)
