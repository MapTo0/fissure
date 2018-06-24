import mongoose, {Schema} from 'mongoose'
import timestamps from 'mongoose-timestamp'

const PaymentSchema = new Schema({
  userId: {
    type: Schema.ObjectId,
    ref: 'User',
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

PaymentSchema.plugin(timestamps)

export default mongoose.model('Payment', PaymentSchema)
