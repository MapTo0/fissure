import mongoose, {Schema} from 'mongoose'
import timestamps from 'mongoose-timestamp'
import uniqueValidator from 'mongoose-unique-validator'

const CategorySchema = new Schema({
  name: {
    type: String,
    required: 'Enter category',
    unique: true,
    index: true
  },
  icon: {
    type: String,
    default: 'http://www.myshopkey.com/uploads/category_image/category_26.png'
  },
  category_group: {
    type: String,
    enum: [
      'entertaiment',
      'food and drink',
      'home',
      'life',
      'transpoert',
      'other'
    ],
    default: 'entertaiment'
  }
})

CategorySchema.plugin(timestamps)
// CategorySchema.plugin(uniqueValidator)

export default mongoose.model('Category', CategorySchema)
