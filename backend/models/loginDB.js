const mongoose =require("mongoose");
mongoose.connect("mongodb://127.0.0:2701/test");

// const loginSchema=new mongoose.Schema({
//     email:{
//         type:String,
//         required:true
//     },
//     password:{
//         type:String,
//         required:true
//     },
//     student:{
//         type:Boolean,
//         required:true
//     }   
    
    
// })

const signUpSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    confPassword:{
        type:String,
    },
student:{
        type:Boolean,
        required:true
    }
})


// const Login = mongoose.model("Login",loginSchema);
// module.exports=Login;

const SignUp = mongoose.model("SignUp",signUpSchema);
module.exports=SignUp;