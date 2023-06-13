const collegeModel = require('../model/collegeModel')
const internModel = require('../model/internModel')
const validUrl = require('valid-url')
const axios = require('axios')
// creating college 
const createCollege = async function (req, res) {
    try {
        const data = req.body
        const { name, fullName, logoLink } = data
        if(!logoLink){
           return  res.status(400).send({status:false, message:"Please provide the logoLink"})
        }
        // validating the syntax of long url
        if (!validUrl.isWebUri(logoLink.trim())) {
            return res.status(400).send({ status: false, message: "Please enter a valid  URL." });
        }
        try {
            const checkLink = await axios.get(logoLink);
            const sts = checkLink.status;

            if (sts < 200 || sts > 299) {
                return res.status(400).send({ status: false, message: "Link is not accessible" });
            }
        } catch (err) {
            return res.status(400).send({ status: false, message: "Please enter a valid link" });
        }
//creating college data 
        const college = await collegeModel.create(data)
        const collegeData = await collegeModel.findOne(college).select({ _id: 0, name: 1, fullName: 1, logoLink: 1, isDeleted: 1 })
        res.status(201).send({ status: true, data: collegeData })
    } catch (error) {
        if (error.message.includes("validation")) {
            return res.status(400).send({ status: false, message: error.message })
        }
        else if (error.message.includes("duplicate")) {
            return res.status(400).send({ status: false, message: error.message })
        }
        else {
            return res.status(500).send({ status: false, message: error.message })
        }
    }
}
//getting details for the college with interns 
const collegeDetails = async function (req, res) {
    try {
        const collegeName = req.query.collegeName
        const college = await collegeModel.findOne({ name: collegeName }).select({ _id: 0, name: 1, fullName: 1, logoLink: 1 })
        //if college data not found 
        if (!college) {
            return res.status(404).send({ status: false, message: "college is not found" })
        }
        //fidning the college id for getting the data of the intern
        const collegeId = await collegeModel.findOne({ name: collegeName }).select({ _id: 1 })
// getting intern details for adding in college response
        const intern = await internModel.find({ collegeId: collegeId._id }).select({ _id: 1, name: 1, email: 1, mobile: 1 })
        //converting intern data into object because we can not easily add new data into the json form data 
        const collegeObject = college.toObject();
        // if interns are not found in the database
        if (intern.length == 0) {
            collegeObject.interns = "interns are not available"
        } else {
            console.log(typeof college)
            collegeObject.interns = intern
        }
        // if college data not found then server error 404
        if (!college) {
            res.status(404).send({ status: false, message: "404 page not found" })
        }
        res.status(200).send({ status: true, data: collegeObject })
    }
    catch (err) {
        res.status(500).send({ status: false, message: err.message })
    }
}
module.exports = { createCollege, collegeDetails }