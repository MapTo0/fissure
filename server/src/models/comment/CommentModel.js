import mongoose, {Schema} from 'mongoose'
import timestamps from 'mongoose-timestamp'

const CommentSchema = new Schema({
  userId: {
    type: Schema.ObjectId,
    ref: 'User'
  },
  message: {
    type: String,
    required: 'Enter comment'
  }
})

CommentSchema.plugin(timestamps)

const Comment = mongoose.model('Comment', CommentSchema)

export default Comment
