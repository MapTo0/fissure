import mongoose, {Schema} from 'mongoose'
import timestamps from 'mongoose-timestamp'

const ExpenseSchema = new Schema({
  userId: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true
  },
  billId: {
    type: Schema.ObjectId,
    ref: 'Bill',
    required: true
  },
  amount: {
    type: Schema.Types.Decimal128,
    required: true
  },
  active: {
    type: Boolean,
    default: true
  }
})

ExpenseSchema.index({billId: 1, userId: 1}, {unique: true})
ExpenseSchema.plugin(timestamps)

export default mongoose.model('Expense', ExpenseSchema)
