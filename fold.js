//Hide the top header when scroll down
window.addEventListener("scroll",function(){
    let topHeader=document.getElementById("topHeader");
    if(window.scrollY>50){
        topHeader.classList.add("hide");
    }else{
        topHeader.classList.remove("hide");
    }
});
//scroll down pop up
function revealOnScroll(){
    let reveals=document.querySelectorAll(".reveal");
    for(let i=0; i<reveals.length; i++){
        let windowHeight=window.innerHeight;
        let revealTop=reveals[i].getBoundingClientRect().top;
        let revealPoint=150;
        if(revealTop<windowHeight-revealPoint&&revealTop>-200){
            reveals[i].classList.add("active");
        }else{
            reveals[i].classList.remove("active");
        }
    }
}

window.addEventListener("scroll",revealOnScroll);
revealOnScroll();