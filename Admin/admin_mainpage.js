let hamIcon = document.querySelector(".hamIcon");
let navBar = document.querySelector(".navBar");
let navClose = document.querySelector(".navClose");

hamIcon.addEventListener("click", function () {
   console.log("Button was clicked");
   navBar.style.left = "0px";
   hamIcon.style.opacity = "0";
});

navClose.addEventListener("click", function () {
   console.log("Close Button was clicked");
   navBar.style.left = "-300px";
   hamIcon.style.opacity = "1";
});
