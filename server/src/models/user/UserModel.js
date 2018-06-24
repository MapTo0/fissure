import mongoose, {Schema} from 'mongoose'
import timestamps from 'mongoose-timestamp'
import bcrypt from 'mongoose-bcrypt'
import bcryptAlg from 'bcrypt'

const COUNTRIES = ['BG', 'UK']
const UserSchema = new Schema({
  username: {
    type: String,
    required: true,
    max: [50, 'Username cannot be more than 50 characters long.'],
    unique: true,
    lowercase: true,
    trim: true,
    index: true
  },
  firstname: {
    type: String,
    max: [50, 'User firstname cannot be more than 50 characters long.'],
    required: true
  },
  lastname: {
    type: String,
    max: [50, 'User lastname cannot be more than 50 characters long.'],
    required: true
  },
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
    trim: true,
    index: true
  },
  password: {
    required: true,
    type: String,
    bcrypt: true
  },
  country: {type: String, enum: COUNTRIES, default: 'BG'},
  address: {
    type: String,
    max: [250, 'User address cannot be more than 250 characters long.']
  },
  mobile: {
    type: String
  },
  avatar: {
    type: String,
    default: 'https://www.haikudeck.com/static/img/hd-avatar.png'
  },
  active: {
    type: Boolean,
    default: true
  },
  admin: {
    type: Boolean,
    default: false
  }
})

UserSchema.plugin(timestamps)
UserSchema.plugin(bcrypt)

const User = mongoose.model('User', UserSchema)

export default User
