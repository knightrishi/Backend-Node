const mongoose=require('mongoose');

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

module.exports=User;