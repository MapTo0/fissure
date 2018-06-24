import {Router} from 'express'
import UserHandler from './../handlers/UsersHandler'

const userRouter = Router()

userRouter.get('/profile', UserHandler.getUser)
userRouter.get('/:uuid', UserHandler.getUser)
userRouter.put('/:uuid', UserHandler.updateUser)
userRouter.get('/:uuid/deactivate', UserHandler.deactivateProfile)

export default userRouter
