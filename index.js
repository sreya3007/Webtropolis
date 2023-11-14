
const express=require("express");
const app=express();
const port=8080;
const path= require("path");
//const Login = require("./backend/models/loginDB");

const SignUp = require("./backend/models/loginDB");


app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.engine('ejs', require('ejs').renderFile);
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.set(express.static(path.join(__dirname,"public")));


// app.get("/login",(req,res)=>{
//     res.render("new1.ejs");
//     });
    
app.get("/register",(req,res)=>{
    res.render("signUp.ejs");
    });

    app.post("/register", async (req,res)=>{
        // console.log(req.body);
        let {name,email,password}=req.body;
        const details=req.body;
        //res.send("post request working");
        // const check=SignUp.findOne({email:details.email});

		if (details.password == details.passwordConf) {

			SignUp.findOne({email:details.email})
            .then((data)=>
            {
                console.log(data);
            })
            .catch((err)=>
            {
                const newPerson = new User({
							
                    email:details.email,
                    username: details.username,
                    password: details.password,
                    passwordConf: details.passwordConf
                });

                newPerson.save()
                .then((res)=>{
                     console.log(res);
                })
                .catch((err)=>{
                    console.log(err);
                });
                
            });
					res.send("Registration complete you can login now");
				}
                else{
					res.send("password does not match");
				}

});
app.get("/login",(req,res)=>{
    res.render("new1.ejs");
    });

app.post('/login',  (req, res) => {
	//console.log(req.body);
    let {name,email,password}=req.body;
        const details=req.body; 
	User.findOne({email:details.email},(data) => {

		if(data){
			
			if(data.password==details.password){
				
				res.send("you are logged in");
                res.redirect("./#");
                //add this after dashboard is made
				
			}else{
				res.send("Login failed!!!Password incorrect");
			}
		}else{
			res.send("The email you entered does not exist!!!Please register first.");
            res.redirect("/home");
		}
	});
});

//////////////////////////////////////////////////////////////////////////////////////////



// app.get("#",  (req, res) => {
// 	res.render("home.ejs");
// 	User.findOne({email:req.body.email},(data)=>{
		
// 		console.log(data);
// 		if(data){
// 			res.render('data.ejs', {"name":data.username,"email":data.email});
// 		}
// 		else{
// 			res.send("data not found please login first");
// 		}
// 	});
// });

app.listen(port,()=>{
    console.log("listening to port: 8080");
});

module.exports = app;