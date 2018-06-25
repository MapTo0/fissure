import {Router} from 'express'
import UserHandler from './../handlers/UsersHandler'

const userRouter = Router()

userRouter.get('/profile', UserHandler.getUser)
userRouter.get('/dashboard', UserHandler.getStats)
userRouter.get('/deactivate', UserHandler.deactivateProfile)
// userRouter.get('/:uuid', UserHandler.getUser)
userRouter.put('/', UserHandler.updateUser)

export default userRouter
