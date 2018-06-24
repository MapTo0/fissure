import Category from './../models/category/CategoryModel'
import helper from './../utils/helpers'

const createTransactionList = async (req, res, next) => {
  try {
    res.status(200).send(helper.response([]))
  } catch (e) {
    next(e)
  }
}

const updateTransaction = async (req, res, next) => {
  try {
    res.status(200).send(helper.response([]))
  } catch (e) {
    next(e)
  }
}

export default {
  createTransactionList,
  updateTransaction
}
