const mongoose = require('mongoose')
const collegeSchema = new mongoose.Schema({
   name: {
      type: String,
      unique: true,
      require: true
   },
   fullName: {
      type: String,
      unique: true,
      require: true
   },
   logoLink: {
      type: String,
      require: true
   },
   isDeleted: {
      type: Boolean,
      default: false
   }
}, { timestamps: true })
module.exports = mongoose.model("CollegeCollection", collegeSchema)