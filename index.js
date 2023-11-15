
const express= require("express");
const app= express();
const port= 8080;
const path= require("path");
const mongoose=require("mongoose");
const User = require("./backend/models/loginDB");

const INFODB ="mongodb+srv://maitrasreya18:sreyamaitra@cluster0.n9cfihy.mongodb.net/?retryWrites=true&w=majority";

mongoose.connect(INFODB)
.then(()=>{
    console.log("connection successful");
})
.catch((err)=>{
console.log(err);
});




app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.engine('ejs', require('ejs').renderFile);
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.set(express.static(path.join(__dirname,"public")));



//for the home page 

// app.get("/home",(req,res)=>{
//         res.render("home.ejs");
//         });

//for the signup page

app.get("/signup",(req,res)=>{
        res.render("signUp.ejs");
        });

app.post("/signup", (req,res) => {
// console.log(req.body); // everything in db
// res.json({message:req.body});
const { username, email , password ,confPassword ,profile} = req.body; //object destructuring

if(!username || !email|| !password ||!confPassword || !profile){


    res.json({message:"enter the required details"});
}

else if(password !== confPassword){
res.json({message:"Does not match the password"});
return;
}

else{
    User.findOne({email: email})  //email in db and email entered
.then((data) =>{
                if(data){
                 res.json({message:"This email is already registered"}) ;     
               }
else{
                                const newUser = new User({
                                    username,
                                    email,
                                    password,
                                    confPassword,
                                    profile
                                })
                                newUser.save()
                                    .then((res)=>{
                                          console.log("registration done");
                                        // res.json({message:"registration successful"});
                                        
                                    })
                                    .catch((err)=>{
                            // console.log("here code went wrong");

                                        console.log(err);
                                    });
                                }  
                         })
                        .catch((err)=>{
                            // console.log("here code went wrong");
                            console.log(err);
                        });
                    }       
        });
        


//for the login page

app.get("/login",(req,res)=>{
        res.render("new1.ejs");
        });

        app.post("/login", (req, res)=> {
                const { email, password} = req.body;
                
                
                    if(!email || !password){
                    res.json({message:"enter the required information"});
                            }
                            else{
                                User.findOne({ email:email}) 
                .then((data)=>{
                            if(data){

User.findOne({password:password})
.then((data)=>{
    res.json({message:"Login Successfull"});
})
.catch((err)=>{
    //console.log(err);
    res.json({message:"Incorrect Password"});
})
                            } else {
                                res.json({message:"You are not registered!!Please register first"});
                            }
                            })
                    .catch((err)=>{
res.json({ message:" You are not register!!Please register first"});
                    })
                }
            });
            



 app.listen(port,() => { 
    console.log("listening to port: 8080");
   });














// app.get("/login",(req,res)=>{
//     res.render("new1.ejs");
//     });

// app.post("/login", (req, res)=> {
//     const { email, password} = req.body;
//     let info=req.body;
//     User.findOne({ email: info.email}, (data) => {
//         if(!info.email.length || !info.password.length){
// res.send("enter the required information")
//         }
//         else{
//         if(data){
//             if(data.password === info.password ) {
//                 res.send("Login Successfull");
//             } else {
//                 res.send("Incorrect Password");
//             }
//         } else {
//             res.send("You are not register!!Please register first");
//         }
//         }
//     });
// }) ;

// app.get("/register",(req,res)=>{
//     res.render("signUp.ejs");
//     });

// app.post("/register", (req, res)=> {
//     const { name, email, password ,confPassword} = req.body;
//     let details=req.body;

//     if(!details.email.length || !details.password.length ||!details.password.length){
//         res.send("enter the required details")
//     }
//     else{
//     if(details.password==details.confPassword){
//     User.findOne({email: details.email}, (data) => {
//         if(data){
//             res.send("User already registered");
//         }
//             else {
//             const user = new SignUp({
//                 name:details.name,
//                 email:details.email,
//                 password:details.password
//             })
//             user.save()
//                 .then((res)=>{
//                      res.send("User already Registered");
//                 })
//                 .catch((err)=>{
//                     console.log(err);
//                 });
//         }
//     });
// }
    
// else{
//     res.send("You re-entured a different password");
// }
// }

// }) ;

// app.listen(port,()=>{
//     console.log("listening to port: 8080");
// });

// module.exports = app;