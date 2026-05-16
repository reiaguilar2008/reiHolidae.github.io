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
    let reveals=document.querySelectorAll(".about-fadein");
    for (let i=0;i<reveals.length; i++) {
        let windowHeight=window.innerHeight;
        let revealTop=reveals[i].getBoundingClientRect().top;
        let revealPoint=150;
        if(revealTop<windowHeight-revealPoint&&revealTop>-5000) {
            reveals[i].classList.add("active");
        }else{
            reveals[i].classList.remove("active");
            resetAnimation();
        }
    }
}
window.addEventListener("scroll", revealOnScroll);
revealOnScroll();

//video and strip words slide in
function slideStripOnScroll(){
    let about=document.querySelector(".about");
    let slideItems=document.querySelectorAll(".slidein");
    let headerHeight=document.querySelector(".main-header").offsetHeight;

    let aboutTop=about.getBoundingClientRect().top;

    if(aboutTop<=headerHeight){
        slideItems.forEach(item => {
            item.classList.add("active");
        });
    }else{
        slideItems.forEach(item => {
            item.classList.remove("active");
        });
    }
}

window.addEventListener("scroll", slideStripOnScroll);
slideStripOnScroll();

//video auto plays once then click to reload
window.addEventListener("load",()=>{
    const aboutVideo=document.querySelector(".about-video");
    const videoBox=document.querySelector(".video-box");
    if(!aboutVideo||!videoBox)return;
    let hasPlayedOnce=false;
    function playVideoOnce(){
        const boxRect=videoBox.getBoundingClientRect();
        if(boxRect.top<window.innerHeight&&boxRect.bottom>0&&!hasPlayedOnce){
            hasPlayedOnce=true;
            aboutVideo.currentTime=0;
            aboutVideo.play();
        }
    }
    window.addEventListener("scroll",playVideoOnce);
    playVideoOnce();
    aboutVideo.addEventListener("click",()=>{
        aboutVideo.currentTime=0;
        aboutVideo.play();
    });
    aboutVideo.addEventListener("pointerdown",()=>{
        aboutVideo.currentTime=0;
        aboutVideo.play();
    });
    aboutVideo.addEventListener("ended",()=>{
        aboutVideo.pause();
    });
});