import {Router} from 'express'
import billHandler from './../handlers/BillsHandler'

const billRouter = Router()

billRouter
  .get('/', billHandler.getBills)
  .post('/', billHandler.createBill)

billRouter.get('/:billId', billHandler.getBill)
billRouter.put('/:billId', billHandler.updateBill)
billRouter.delete('/:billId', billHandler.deleteBill)

export default billRouter
