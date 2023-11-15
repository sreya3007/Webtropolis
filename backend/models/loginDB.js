const mongoose= require("mongoose");


const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    confPassword:{
        type:String,
        required:true
    },
    
    profile:{
        type:String,
        required:true
    }
});


const User = mongoose.model("User",userSchema);
module.exports=User;