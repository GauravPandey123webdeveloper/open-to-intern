// importing college model to access the data of colleges 
const collegeModel = require('../model/collegeModel');
// importing intern model to get the data of the registered interns 
const internModel = require('../model/internModel');
// imorting validation module to check validation 
const valid = require('../validator');

// Controller function for creating an intern
const createIntern = async function (req, res) {
    try {
        const data = req.body;
        const { name, email, mobile } = data;
        if(!mobile){
            res.status(400).send({status:false, message:"mobile is missing"})
        }
        // Validate name format
        if (!valid.isValidData(name)) {
            return res.status(400).send({ status: false, message: "Name should only contain letters" });
        }

        // Validate email format
        if (!valid.validEmail(email)) {
            return res.status(400).send({ status: false, message: "Please enter a valid email address" });
        }

        // Validate mobile number format
        if (!valid.validMobile(mobile)) {
            return res.status(400).send({ status: false, message: "Please enter a valid mobile number" });
        }

        const collegeName = data.collegeName;

        // Check if college name is provided
        if (!collegeName) {
            return res.status(400).send({ status: false, message: "Please enter the college name" });
        }

        const collegeCheck = await collegeModel.findOne({ name: collegeName });

        // Check if college exists
        if (!collegeCheck) {
            return res.status(400).send({ status: false, message: "Please enter the correct college name" });
        } else {
            const collegeId = collegeCheck._id;
            const intern = await internModel.create({ name, email, mobile, collegeId });
            const resIntern = await internModel.findOne(intern).select({ _id: 0, isDeleted: 1, name: 1, email: 1, mobile: 1, collegeId: 1 });
            res.status(201).send({ status: true, data: resIntern });
        }
    } catch (error) {
        if (error.message.includes("validation")) {
            return res.status(400).send({ status: false, message: error.message });
        } else if (error.message.includes("duplicate")) {
            return res.status(400).send({ status: false, message: error.message });
        } else {
            return res.status(500).send({ status: false, message: error.message });
        }
    }
};

module.exports.createIntern = createIntern;
