// importing express model to creating router and middlewares
const express = require('express');
const router = express.Router();

// Importing controller functions
const { createCollege, collegeDetails } = require('../controller/collegeController');
const { createIntern } = require('../controller/internController');

// Route for creating a college (POST /functionup/colleges)
router.post('/functionup/colleges', createCollege);

// Route for creating an intern (POST /functionup/interns)
router.post('/functionup/interns', createIntern);

// Route for fetching college details (GET /functionup/collegeDetails)
router.get('/functionup/collegeDetails', collegeDetails);

module.exports = router;
