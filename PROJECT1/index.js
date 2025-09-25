const express = require("express");

const fs=require('fs');
const { json } = require("stream/consumers");
const app = express();
const mongoose=require('mongoose');


//MiddleWare --(like plugins)
app.use(express.urlencoded({ extended : false}));

app.use((req,res,next)=>{
    fs.appendFile('log.txt', `${Date.now()} :${req.method} :${req.path} \n` ,(err,data) => {

    next();
    })
});

// app.use((req,res,next)=>{
//     // console.log("I am in Middleware 2");
//     // next();
//    // return res.end("Fuck OFF")
// });

const PORT = 7070;

//connection
mongoose.connect("mongodb://127.0.0.1:27017/nodeproject1")
.then(() => console.log("MongoDB connected"))
.catch((err) => console.log("ERROr-------", err))


//SCHEMA 
const userSchema=new mongoose.Schema({
    firstName: {
        type:String,
        required:true,
    },
    
    lastName: {
        type:String,
        required:true,
    },
    

    email: {
        type:String,
        required:true,
        unique:true,
    },

    gender: {
        type:String,
        
    },
    jobTitle: {
        type:String,
       
    },
},
{timestamps:true}
);

const User=mongoose.model("user", userSchema);







app.get("/user", async (req, res) => {
    let allDbUsers=await User.find()
    const html=`
    <ul>
    ${allDbUsers.map((user)=> `<li>${user.firstName} ${user.lastName} </li>`).join("")}
        </ul>

    `
    res.send(html);
});

//RESTFUL part
app.get("/", (req, res) => {
  res.end("This is the Home PAGE");
});
app.get("/api/user", async (req, res) => {
        let allDbUsers=await User.find()

 return res.json(allDbUsers);
});

//Dynamic Path Parameter
app.route("/api/user/:id")
.get(async (req, res) => {
    
 
 const user=await User.findById(req.params.id)
///-----------------------STATUS CODES----------------------------------------
if(!user) return res.status(400).json({msg:"No such user exist"})

 return res.json(user);
})
.patch( async(req, res) => {
 await User.findByIdAndUpdate(req.params.id, {lastName:"CHANGED"})

    return res.json({status :"Success"});
})
.delete(async (req, res) => {
    await User.findByIdAndDelete(req.params.id);
    return res.json({ststus:"DELETED"})
    
});


app.post ("/api/user", async (req, res) => {
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

    return res.status(201).json({msg:"success"})
});


/*app.patch("/api/user/:id", (req, res) => {
 //TODO:Edit the user with id
    return res.json({status :"pending"});
});

app.delete("/api/user/:id", (req, res) => {
 //TODO:Delete the user with id
    return res.json({status :"pending"});
});
*/


//server ko start karna
app.listen(PORT, () => {
  console.log("Server Started on " + PORT);
});
