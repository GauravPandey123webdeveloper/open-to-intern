const collegeModel = require('../model/collegeModel')
const validUrl = require('valid-url')
const valid = require('../validator')
const axios = require('axios')
const createCollege = async function (req, res) {
    try {
        const data = req.body
        const { name, fullName, logoLink } = data
        if (!name || !fullName || !logoLink) {
            return res.status(400).send({ status: false, message: "Please fill the required details" })
        }
        //Validation for longUrl
        if (!valid.isValidData(logoLink)) {
            return res.status(400).send({ status: false, message: "Please provide the long URL." });
        }
        // validating the syntax of long url
        if (!validUrl.isWebUri(longUrl.trim())) {
            return res.status(400).send({ status: false, message: "Please enter a valid long URL." });
        }
        try {
            const checkLink = axios.get(logoLink)
            const sts = checkLink.status
            if (sts < 200 && sts > 299) {
                return res.status(400).send({ status: false, message: "link is not accessible" })
            }
        } catch (err) {
            return res.status(400).send({ status: false, message: "please Enter a valid link" })
        }
        const college = await collegeModel.create(data)
        const collegeData = await findOne(college).select({ _id: 0, name: 1, fullName: 1, logoLink: 1, isDeleted: 1 })
        res.status(201).send({ status: false, data: collegeData })
    } catch (err) {
        res.status(500).send({ status: false, message: err.message })
    }
}
const collegeDetails = async function (req, res) {
    try {
        const collegeName = req.query.collegeName
        const college = await collegeModel.find({ name: collegeName }).select({ _id: 0, name: 1, fullName: 1, logoLink: 1 }).populate('collegeId')
        res.status(200).send({ status: false, data: college })
    }
    catch (err) {
        res.status(500).log({ status: false, message: err.message })
    }
}
module.exports = { createCollege, collegeDetails }