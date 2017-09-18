var mongoose = require('mongoose')
var url = 'mongodb://localhost:27017/userDB'

var Schema = mongoose.Schema
mongoose.Promise = global.Promise
mongoose.connect(url)
var db = mongoose.connection

var userSchema = new Schema({
    name: String,
    user_id: String,
    password: String,
    sessionID: String,
    messages: [String],
} , {collection: 'User'})


var User = db.model('User', userSchema)

module.exports = User
