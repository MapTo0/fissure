import app from './../src/api'
var env = process.env.NODE_ENV || 'development'
// var config = require('./../config/app')[env];

app.listen(8080)
console.log('Server running on port: ' + 8080)
