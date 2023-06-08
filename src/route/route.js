const express= require('express')
const router= express.Router()
router.get('/test', function(req,res){
    res.send('everything is ok')
})
module.exports= router