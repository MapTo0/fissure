import mongoose, {Schema} from 'mongoose'
import timestamps from 'mongoose-timestamp'

const ActivitySchema = new Schema({
})

ActivitySchema.plugin(timestamps)

export default mongoose.model('Activity', ActivitySchema)
