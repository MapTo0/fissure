import {Router} from 'express'
import categoryHandler from './../handlers/CategoriesHandler'
import passport from 'passport'
import './../middlewares/auth'

const categoryRouter = Router()

categoryRouter
  .get(
    '/',
    passport.authenticate('jwt', {session: false}),
    categoryHandler.getAllCategories
  )
  .post(
    '/',
    passport.authenticate('jwt', {session: false}),
    categoryHandler.createNewCategories
  )

categoryRouter.get('/:uuid', categoryHandler.getCategoryById)

export default categoryRouter
