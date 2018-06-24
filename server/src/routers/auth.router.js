import {Router} from 'express'
import userHandler from './../handlers/UsersHandler'
import authHandler from './../handlers/AuthHandler'
const authRouter = Router()

authRouter.post('/login', authHandler.login)
authRouter.get('/logout', authHandler.logout)
authRouter.post('/register', userHandler.createUser)

export default authRouter
