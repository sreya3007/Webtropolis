const mongoose=require("mongoose");

main()
.then(()=>{
    console.log("Connection sucessful");
})
.catch(err => console.log(err));

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/whatsapp');
  } 


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
    name:{
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
    }
// student:{
//         type:Boolean,
//         required:true
//     }
});


// const Login = mongoose.model("Login",loginSchema);
// module.exports=Login;

const SignUp = mongoose.model("SignUp",signUpSchema);
module.exports=SignUp;