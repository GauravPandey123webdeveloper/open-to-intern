const mongoose = require('mongoose')
const internSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        require: true,
        unique: true
    },
    mobile: {
        type: String,
        require: true,
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