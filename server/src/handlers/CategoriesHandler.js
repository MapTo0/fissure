import Category from './../models/category/CategoryModel'
import helper from './../utils/helpers'

const fields = ['name', 'category_group']

const getAllCategories = async (req, res, next) => {
  try {
    let items = await Category.find({})
    let categories = helper.serialize('categories', fields, items)

    res.status(200).send(helper.response(categories))
  } catch (e) {
    next(e)
  }
}

const createNewCategories = async (req, res, next) => {
  try {
    let item = new Category(req.body)
    item = await item.save()
    let category = helper.serialize('categories', fields, item)

    res.status(200).send(helper.response(category))
  } catch (e) {
    next(e)
  }
}

const getCategoryById = async (req, res, next) => {
  try {
    let item = await Category.findById(req.params.uuid)
    res.status(200).send(helper.response(helper.serialize('categories', fields, item)))
  } catch (e) {
    next(e)
  }
}

export default {
  getAllCategories,
  createNewCategories,
  getCategoryById
}
