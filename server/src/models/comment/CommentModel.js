import mongoose, {Schema} from 'mongoose'
import timestamps from 'mongoose-timestamp'

const CommentSchema = new Schema({
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
})

CommentSchema.plugin(timestamps)

const Comment = mongoose.model('Comment', CommentSchema)

export default Comment
