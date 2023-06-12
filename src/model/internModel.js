const mongoose = require('mongoose')
const internSchema = new mongoose.Schema({
    name: {
        type: String,
        trim:true,
        require: true
        
    },
    email: {
        type: String,
        require: true,
        trim:true,
        unique: true
    },
    mobile: {
        type: String,
        require: true,
        trim:true,
        unique: true
    },
    collegeId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'CollegeCollection'
    },
    isDeleted: {
        type: Boolean,
        default: false
    }

}, { timestamps: true })
module.exports = mongoose.model("InternCollection", internSchema)