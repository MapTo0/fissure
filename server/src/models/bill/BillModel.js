import mongoose, {Schema} from 'mongoose'
import timestamps from 'mongoose-timestamp'

const BillSchema = new Schema({
  description: {
    type: String,
    required: true,
    trim: true
  },
  cost: {
    type: Schema.Types.Decimal128,
    required: true
  },
  userId: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  categoryId: {
    type: Schema.ObjectId,
    ref: 'Category',
    index: true
  },
  memberId: {
    type: Schema.ObjectId,
    ref: 'Friend',
    index: true
  },
  groupId: {
    type: Schema.ObjectId,
    ref: 'Group',
    index: true
  },
  paidBy: {
    type: Schema.ObjectId,
    ref: 'User',
    index: true
  },
  paymentDate: {
    type: Date,
    default: Date.now,
    index: true
  },
  note: {
    type: String,
    trim: true
  },
  expenses: [
    {
      type: Schema.ObjectId,
      ref: 'Expense',
      index: true
    }
  ],
  reciept: {
    type: String,
    default: ''
  }
})

BillSchema.plugin(timestamps)

export default mongoose.model('Bill', BillSchema)
