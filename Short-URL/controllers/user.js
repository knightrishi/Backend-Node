const User=require('../models/user')
const { v4:uuidv4 }=require('uuid')

const { setUser }=require('../services/auth')

async function handleUserSignUps(req,res) {
    const {name, email, password}=req.body;
    await User.create({
        name,
        email,
        password,
    });

    //Jaise hi submit  buttyon of signup page pe click karuga to yaha pe redirect kar dega
    return res.render("home");
}

async function handleUserLogin(req,res) {
    const { email, password}=req.body;
    const user=await User.findOne({email, password});

    if(!user) return res.render("login",{
        err:'Invalid Username or Password'
    })

    const sessionID=uuidv4();
    const token=setUser(sessionID);

    res.cookie("uid", token);


    //Jaise hi submit  buttyon of signup page pe click karuga to yaha pe redirect kar dega
    return res.redirect("/");
}

module.exports={
    handleUserSignUps,
    handleUserLogin,
}