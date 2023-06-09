const collegeModel = require('../model/collegeModel')
const internModel = require('../model/internModel')
const valid = require('../validator')
const createIntern = async function (req, res) {
    try {
        const data = res.body
        const { name, email, mobile } = data
        if (!valid.isValidData(name)) {
            return res.status(400).send({ status: false, message: "name shold only contain letters " })
        }
        if (!valid.validEmail(email)) {
            return res.status(400).send({ status: false, message: "Please Enter a valid email address" })
        }
        if (!valid.validMobile(mobile)) {
            return res.status(400).send({ status: false, message: "please Enter a valid mobile number" })
        }
        const collegeName = data.collegeName
        if (!collegeName) {
            return res.status(400).send({ status: false, message: "please enter the college name" })
        } else {
            const collegeId = await collegeModel.findOne({ name: collegeName }).select({ _id: 1 })
            const intern = await internModel.create({ name: name, email: email, mobile: mobile, collegeId: collegeId })
            res.status(201).send({ status: true, data: intern })
        }
    } catch (err) {
        res.status(500).send({ status: false, message: err.message })
    }
}
module.exports.createIntern = createIntern