import mongoose, {Schema} from 'mongoose'
import timestamps from 'mongoose-timestamp'

const ActivitySchema = new Schema({
  userId: {
    type: Schema.ObjectId,
    ref: 'User',
    required: true
  },
  target: {
    type: String,
    enum: [
      'bill',
      'friend',
      'group',
      'expense',
      'user',
      'comment'
    ],
    default: 'bill'
  },
  action: {
    type: String,
    enum: [
      'create',
      'update',
      'delete',
      'add'
    ],
    default: 'create'
  }
})

ActivitySchema.plugin(timestamps)

export default mongoose.model('Activity', ActivitySchema)
