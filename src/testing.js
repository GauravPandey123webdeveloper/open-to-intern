const createIntern= async function(req,res){
    try{
    const body= req.body
    if(!req.body.name){
       return  res.status(400).send({status:false, message:"please enter the name"})
    }
    if(!req.body.email){
         return res.status(400).send({status:false,message:"please enter the email"})
    }
    if(!req.body.mobile){
        return res.status(400).send({status:false,message:"please enter the mobile number"})
    }

    const data= await internModel.create(body)
    
    const {name, email, mobile, collegeId}=data
    res.status(201).send({staus:false, data:{name,email,mobile,collegeId}})
    }catch(err){

        return res.status(500).send({status:false, message:err.message})
    }
}