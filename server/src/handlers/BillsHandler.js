import Bill from './../models/bill/BillModel'
import Expense from './../models/payment/ExpenseModel'
import Friend from './../models/friend/FriendModel'
import Activity from './../models/activity/ActivityModel'
import Group from './../models/group/GroupModel'
import helper from './../utils/helpers'
import {Decimal} from 'decimal.js'

const fields = [
  'description',
  'cost',
  'categoryId',
  'paymentDate',
  'paidBy',
  'note',
  'groupId',
  'memberId',
  'expenses'
]

const getBills = async (req, res, next) => {
  try {
    let bills = await Bill.find({userId: req.user._id})
      .populate('userId', '-password')
      .populate('expenses')
      .populate({
        path: 'expenses',
        populate: {
          path: 'userId',
          select: {
            _id: 1,
            firstname: 1,
            lastname: 1,
            username: 1,
            avatar: 1
          }
        }
      })
      .populate('categoryId')
      .populate('groupId')
      .populate('memberId', '-password')
      .populate('paidBy', '-password')

    res
      .status(200)
      .send(helper.response(helper.serialize('bills', fields, bills)))
  } catch (e) {
    next(e)
  }
}

const getBill = async (req, res, next) => {
  try {
    if (!req.params.billId) {
      throw new Error('Missing billId')
    }

    let bill = await Bill.findById({
      _id: req.params.billId,
      userId: req.user._id
    })
      .populate('userId', '-password')
      .populate('expenses')
      .populate({
        path: 'expenses',
        populate: {
          path: 'userId',
          select: {
            _id: 1,
            firstname: 1,
            lastname: 1,
            username: 1,
            avatar: 1
          }
        }
      })
      .populate('categoryId')
      .populate('groupId')
      .populate('memberId', '-password')
      .populate('paidBy', '-password')

    res
      .status(200)
      .send(helper.response(helper.serialize('bills', fields, bill)))
  } catch (e) {
    next(e)
  }
}

const createBill = async (req, res, next) => {
  try {
    req.check('description', 'description is required').notEmpty()
    req.check('cost', 'cost is required').notEmpty()
    req.check('categoryId', 'category is required').notEmpty()
    req.check('paidBy', 'paied field is required').notEmpty()

    let userId = req.user._id

    let errors = req.validationErrors()
    if (errors) {
      errors = errors.map(item => item.msg) || []

      return res.status(422).send(helper.response('', 422, true, errors))
    }

    let {
      description,
      cost,
      categoryId,
      memberId,
      groupId,
      paidBy,
      note,
      paymenDate,
      expenses
    } = req.body

    let data = {
      description: description,
      cost: Decimal(cost).toFixed(2),
      userId: userId,
      categoryId: categoryId,
      paidBy: paidBy,
      paymentDate: paymenDate || Date.now(),
      note: note,
      group: {},
      expenses: []
    }

    if (!groupId && !memberId) {
      return res
        .status(400)
        .send(helper.response([], 400, true, ['Missing group or friend']))
    }

    if (memberId) {
      let friendlist = await Friend.find({
        userId: userId,
        friends: {$in: [memberId]}
      })
      if (!friendlist || !friendlist.length > 0) {
        return res
          .status(200)
          .send(
            helper.response([], 200, true, [
              'Missing friend from your friend list'
            ])
          )
      }
      data.memberId = memberId
    }

    if (groupId) {
      let group = await Group.find({_id: groupId, userId: userId})
        .populate('userId', '-password')
        .populate('friends', '-password')

      if (!group || !group.length > 0) {
        return res
          .status(200)
          .send(
            helper.response([], 200, true, [
              'Missing group from your group list'
            ])
          )
      }
    }

    let bill = new Bill(data)
    bill = await bill.save()
    // Add log
    let act = new Activity({
      userId: req.user._id,
      target: 'bill',
      action: 'created'
    })
    act.save()

    let total = new Decimal(0)
    if (bill && expenses) {
      if (groupId) {
        let expMap = new Map(Object.entries(expenses))
        const expEntities = []
        const storeExt = async (billId, friendId, amount) => {
          let e = new Expense({
            billId: bill._id,
            userId: friendId,
            amount: Decimal(amount).toFixed(2)
          })
          e = await e.save()

          return e._id
        }

        const store = async (billId, exps) => {
          for (const [friendId, amount] of exps) {
            let extId = await storeExt(billId, friendId, amount)
            expEntities.push(extId)
          }
        }

        await store(bill._id, expMap)

        if (expMap.size !== expEntities.length) {
          throw new Error('Incorrect number of friends')
        }
        data.expenses = expEntities
        total = parseFloat(total.toFixed(2))
      }

      if (memberId) {
        let expense = new Expense({
          billId: bill._id,
          userId: memberId,
          amount: Decimal(cost).toFixed(2)
        })
        expense = await expense.save()
        data.expenses.push(expense._id)
      }
    }

    if (data.expenses.length > 0) {
      if (Decimal(total).value !== Decimal(cost).value) {
        res
          .status(400)
          .send(helper.response([], 400, true, ['Incorrect amounts']))
      }

      bill.expenses = data.expenses
      bill = await bill.save()
    }

    res
      .status(200)
      .send(helper.response(helper.serialize('bills', fields, bill)))
  } catch (e) {
    next(e)
  }
}

const updateBill = async (req, res, next) => {
  try {
    let {billId} = req.params

    if (!billId) {
      throw new Error('Missing billId')
    }

    let errors = req.validationErrors()
    if (errors) {
      errors = errors.map(item => item.msg) || []

      return res.status(422).send(helper.response('', 422, true, errors))
    }

    let {
      description,
      cost,
      categoryId,
      paidBy,
      note,
      paymenDate,
      expenses
    } = req.body

    await Bill.find({_id: billId, userId: req.user._id}, async (err, bill) => {
      if (err) {
        return res.status(400).send(helper.response([], 400, true, [err]))
      }

      if (bill) {
        const updateExpense = (billId, userId, amount) => {
          Expense.findOne(
            {billId: billId, userId: userId},
            async (err, exp) => {
              if (err) {
                return res.status(400).send(helper.response(err))
              }

              if (exp) {
                exp.amount = amount || exp.amount
                await exp.save()
              }
            }
          )
        }

        const changeExpenses = async (billId, expenses, data) => {
          for (const {userId} of expenses) {
            if (data[userId]) {
              let amount = data[userId]

              await updateExpense(billId, userId, amount)
            }
          }
        }

        if (cost && cost !== bill.cost && !expenses) {
          res
            .status(200)
            .send(helper.response([], 200, false, ['Exponses are required']))
        }

        bill.cost = cost ? Decimal(cost) : bill.cost
        bill.categoryId = categoryId || bill.categoryId
        bill.note = note || bill.note
        bill.paidBy = paidBy || bill.paidBy
        bill.paymenDate = paymenDate || bill.paymenDate
        bill.description = description || bill.description
        bill = await bill.save()

        // Add log
        let act = new Activity({
          userId: req.user._id,
          target: 'bill',
          action: 'updated'
        })
        act.save()
        if (expenses) {
          changeExpenses(bill._id, bill.expenses, expenses)
        }

        res.status(200).send(helper.response(['Updated']))
      }

      if (!bill) {
        res
          .status(200)
          .send(helper.response([], 200, false, ['Bill does not exist']))
      }
    }).populate('expenses')
  } catch (e) {
    next(e)
  }
}

const deleteBill = async (req, res, next) => {
  try {
    let {billId} = req.params

    if (!billId) {
      throw new Error('Missing billId')
    }

    await Bill.findById(billId, (err, bill) => {
      if (err) {
        return res.status(400).send(helper.response([], 400, true, [err]))
      }

      if (bill) {
        const detEx = async () => {
          await Expense.find({billId: billId}).remove()
        }

        bill.remove()
        detEx()

        // Add log
        let act = new Activity({
          userId: req.user._id,
          target: 'bill',
          action: 'deleted'
        })
        act.save()
        res.status(200).send(helper.response(['Deleted']))
      }

      if (!bill) {
        res
          .status(200)
          .send(helper.response([], 200, false, ['Bill does not exist']))
      }
    })
  } catch (e) {
    next(e)
  }
}

export default {
  getBills,
  getBill,
  createBill,
  updateBill,
  deleteBill
}
