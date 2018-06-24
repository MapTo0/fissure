import {Router} from 'express'
import apiRouter from './api.router'
import authRouter from './auth.router'
import catRouter from './category.router'
import userRouter from './user.router'
import groupRouter from './group.router'
import friendRouter from './friend.router'
import billRouter from './bill.router'
import activityRouter from './activity.router'
import passport from 'passport'
import './../middlewares/auth'

const globalRouter = Router()

export default app => {
  globalRouter.use('/', apiRouter)
  globalRouter.use('/auth', authRouter)
  globalRouter.use(
    '/users',
    passport.authenticate('jwt', {session: false}),
    userRouter
  )
  globalRouter.use(
    '/categories',
    passport.authenticate('jwt', {session: false}),
    catRouter
  )
  globalRouter.use(
    '/groups',
    passport.authenticate('jwt', {session: false}),
    groupRouter
  )
  globalRouter.use(
    '/friends',
    passport.authenticate('jwt', {session: false}),
    friendRouter
  )
  globalRouter.use(
    '/bills',
    passport.authenticate('jwt', {session: false}),
    billRouter
  )
  globalRouter.use(
    '/activities',
    passport.authenticate('jwt', {session: false}),
    activityRouter
  )

  app.use('/api/v1', globalRouter)
}
