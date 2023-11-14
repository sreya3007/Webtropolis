const name=document.querySelector(".name");
const password=document.querySelector(".email");
const email=document.querySelector(".password");
const submitBtn=document.querySelector(".submit");

submitBtn.addEventListener("click",()=>{
    fetch('/register')
});
