import express from 'express'
import helmet from 'helmet'
import {urlencoded, json} from 'body-parser'
import cors from 'cors'
import validator from 'express-validator'
import passport from 'passport'
import morgan from 'morgan'
import {serve, setup} from 'swagger-ui-express'
import swaggerDocument from './../docs/api/v1.json'
import router from './routers/'
import db from './db'
import logger from './utils/logger'

const app = express()
app.use(helmet())
app.use(cors())
db({username: '', passpowor: ''})

app.use(passport.initialize())
app.use(passport.session())

// uploadDir: '/tmp/uploads'
app.use(urlencoded({extended: true}))
app.use(json())
app.use(
  validator({
    customValidators: {
      inArray: (value, options) => {
        return options.filter(item => item === value).length > 0
      },
      notEmpty: array => {
        return array && array.length > 0
      }
    }
  })
)

// use morgan to log requests to the console
app.use(morgan('combined', {stream: logger.stream}))

app.use('/api/documentation', serve, setup(swaggerDocument))

// Attach routers
router(app)

app.use((req, res, next) => {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

app.use((err, req, res, next) => {
  res.status(err.status || 500)
  res.json({
    status: '',
    code: err.status,
    error: true,
    messages: [err.message],
    result: {}
  })
})

export default app
