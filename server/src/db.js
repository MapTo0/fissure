import mongoose from 'mongoose'
import {DBUSER, DBPASS, DBHOST} from './../config/db'

// config
export default () => {
  mongoose.Promise = global.Promise
  mongoose.connect(DBHOST, {
    auth: {
      user: DBUSER,
      password: DBPASS
    }
  })

  mongoose.connection.on('error', err => {
    console.log(err)
    process.exit()
  })
}
