const mongoose = require('mongoose')

const UserSchema =new  mongoose.Schema({
    firstname:{
        type: String,
        required :[ true,"Name is required"]
    },
    lastname:{
        type: String,
        required :[ true,"Name is required"]
    },
    handle:{
        type:String,
        required:[ true,"Social media Handle is required"]
    },
    followers:{
        type:Number,
        required:[ true,"Number of followers is required"]
    }
})

module.exports = new mongoose.model('User',UserSchema)