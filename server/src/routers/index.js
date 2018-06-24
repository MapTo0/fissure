import {Router} from 'express'
import apiRouter from './api.router'
import authRouter from './auth.router'
import catRouter from './category.router'
import userRouter from './user.router'
import groupRouter from './group.router'
import friendRouter from './friend.router'
import billRouter from './bill.router'

const globalRouter = Router()

export default app => {
  globalRouter.use('/', apiRouter)
  globalRouter.use('/users', userRouter)
  globalRouter.use('/auth', authRouter)
  globalRouter.use('/categories', catRouter)
  globalRouter.use('/groups', groupRouter)
  globalRouter.use('/friends', friendRouter)
  globalRouter.use('/bills', billRouter)

  app.use('/api/v1', globalRouter)
}
