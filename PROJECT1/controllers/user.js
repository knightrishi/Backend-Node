const User=require('../models/user')

async function handelGetAllUser(req,res){
    let allDbUsers=await User.find()

 return res.json(allDbUsers);
}

async function handelGetUserById(req,res) {
    const user=await User.findById(req.params.id)
///-----------------------STATUS CODES----------------------------------------
if(!user) return res.status(400).json({msg:"No such user exist"})

 return res.json(user);
}
async function handelUpdates(req,res) {
   await User.findByIdAndUpdate(req.params.id, {lastName:"CHANGED"})

    return res.json({status :"Success"});
}
async function handelDeleteUserById(req,res) {
   await User.findByIdAndDelete(req.params.id);
    return res.json({ststus:"DELETED"})
}

async function handelCreateNewUser(req,res) {
    const body=req.body;
//console.log(body);

//STATUS 
//----------------------------------------------------------------------------------------------------

if(!body || ! body.first_name || !body.last_name || !body.email || !body.gender || !body.job_title){
return res.status(400).json({msg:"All teh fields are required"});
}

const result=await User.create({
    firstName:body.first_name,
    lastName:body.last_name,
    email:body.email,
    gender:body.gender,
    jobTitle:body.job_title,

});
    console.log("result",result);

    return res.status(201).json({msg:"success" , id:result._id})
}

module.exports={
    handelGetAllUser,
    handelGetUserById,
    handelUpdates,
    handelDeleteUserById,
    handelCreateNewUser,

    
}