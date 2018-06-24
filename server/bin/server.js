import app from './../src/api'
var env = process.env.NODE_ENV || 'development'
// var config = require('./../config/app')[env];

app.listen(3000)
console.log('Server running on port: ' + 3000)
