import mongoose, {Schema} from 'mongoose'
import timestamps from 'mongoose-timestamp'

const GroupSchema = new Schema({
  name: {
    type: String,
    required: 'Enter group',
    unique: true
  },
  type: {
    type: String,
    enum: ['Apartment', 'House', 'Trip', 'Other'],
    default: 'Apartment'
  },
  userId: {
    type: Schema.ObjectId,
    ref: 'User',
    index: true
  },
  friends: [
    {
      type: Schema.ObjectId,
      ref: 'User',
      index: true
    }
  ]
})

GroupSchema.plugin(timestamps)

const Group = mongoose.model('Group', GroupSchema)

export default Group
