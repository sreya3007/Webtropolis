
const express= require("express");
const app= express();
const port= 8080;
const path= require("path");
const mongoose=require("mongoose");
//const Login = require("./backend/models/loginDB");

const SignUp = require("./backend/models/loginDB");


app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.engine('ejs', require('ejs').renderFile);
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.set(express.static(path.join(__dirname,"public")));

app.get("/login",(req,res)=>{
    res.render("new1.ejs");
    });

app.post("/login", (req, res)=> {
    const { email, password} = req.body;
    let info=req.body;
    User.findOne({ email: info.email}, (data) => {
        if(!info.email.length || !info.password.length){
res.send("enter the required information")
        }
        else{
        if(data){
            if(data.password === info.password ) {
                res.send("Login Successfull");
            } else {
                res.send("Incorrect Password");
            }
        } else {
            res.send("You are not register!!Please register first");
        }
        }
    });
}) ;

app.get("/register",(req,res)=>{
    res.render("signUp.ejs");
    });

app.post("/register", (req, res)=> {
    const { name, email, password ,confPassword} = req.body;
    let details=req.body;

    if(!details.email.length || !details.password.length ||!details.password.length){
        res.send("enter the required details")
    }
    else{
    if(details.password==details.confPassword){
    User.findOne({email: details.email}, (data) => {
        if(data){
            res.send("User already registered");
        }
            else {
            const user = new SignUp({
                name:details.name,
                email:details.email,
                password:details.password
            })
            user.save()
                .then((res)=>{
                     res.send("User already Registered");
                })
                .catch((err)=>{
                    console.log(err);
                });
        }
    });
}
    
else{
    res.send("You re-entured a different password");
}
}
}) ;

app.listen(port,()=>{
    console.log("listening to port: 8080");
});

module.exports = app;