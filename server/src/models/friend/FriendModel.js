import mongoose, {Schema} from 'mongoose'
import timestamps from 'mongoose-timestamp'

const FriendSchema = new Schema({
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  friends: [
    {
      type: Schema.ObjectId,
      ref: 'User'
    }
  ]
})

FriendSchema.plugin(timestamps)

const Friend = mongoose.model('Friend', FriendSchema)

export default Friend
