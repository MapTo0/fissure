import {Router} from 'express'
import categoryHandler from './../handlers/CategoriesHandler'

const categoryRouter = Router()

categoryRouter
  .get(
    '/',
    categoryHandler.getAllCategories
  )
  .post(
    '/',
    categoryHandler.createNewCategories
  )

categoryRouter.get('/:uuid', categoryHandler.getCategoryById)

export default categoryRouter
