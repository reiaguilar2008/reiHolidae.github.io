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

if(document.querySelector(".about")){
    window.addEventListener("scroll", slideStripOnScroll);
    slideStripOnScroll();
}
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

//dark mode button
const themeToggle = document.getElementById("themeToggle");
const themeIcon = document.getElementById("themeIcon");
const heroVideo = document.getElementById("heroVideo");
if(localStorage.getItem("theme") === "dark"){
    document.body.classList.add("dark-mode");
    themeIcon.src = "moond.png";
    if(heroVideo){
        heroVideo.src = "night-sky.mp4";
    }
}

themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");

    if(document.body.classList.contains("dark-mode")){
        themeIcon.src = "moond.png";
        if(heroVideo){
        heroVideo.src = "night-sky.mp4";
    }
        localStorage.setItem("theme", "dark");
    }else{
        themeIcon.src = "sund.png";
        if(heroVideo){
            heroVideo.src ="sky.mp4";
        }
        localStorage.setItem("theme", "light");
    }
}); 

//contact carrd
const contactButton = document.getElementById("contactButton");
const contactPopup = document.getElementById("contactPopup");
const closeContact = document.getElementById("closeContact");

if(contactButton && contactPopup && closeContact){

    contactButton.addEventListener("click", (e) => {
        e.preventDefault();
        contactPopup.classList.add("active");
    });

    closeContact.addEventListener("click", () => {
        contactPopup.classList.remove("active");
    });

    window.addEventListener("scroll", () => {
        contactPopup.classList.remove("active");
    });

    document.addEventListener("click", (e) => {

        if(
            !contactPopup.contains(e.target) &&
            !contactButton.contains(e.target)
        ){
            contactPopup.classList.remove("active");
        }

    });

}

//all the language stuff
// language dropdown
const languageButton = document.getElementById("languageButton");
const languageDropdown = document.getElementById("languageDropdown");

if(languageButton && languageDropdown){

    languageButton.addEventListener("click", (e) => {
        e.stopPropagation();
        languageDropdown.classList.toggle("active");
    });

    languageDropdown.querySelectorAll("button").forEach(button => {

        button.addEventListener("click", () => {

            const languageName = button.textContent.trim();
            const languageCode = button.dataset.lang;

            languageButton.textContent = languageName + " ▾";

            const googleCombo =
                document.querySelector(".goog-te-combo");

            if(googleCombo){

                googleCombo.value = languageCode;
                googleCombo.dispatchEvent(
                    new Event("change")
                );

            }

            languageDropdown.classList.remove("active");

        });

    });

    document.addEventListener("click", () => {
        languageDropdown.classList.remove("active");
    });

}

//menu slidein and buttons
const menuButton = document.getElementById("menuButton");
const sideMenu = document.getElementById("sideMenu");
const menuOverlay = document.getElementById("menuOverlay");

if(menuButton && sideMenu && menuOverlay){

    menuButton.addEventListener("click", () => {
        sideMenu.classList.add("active");
        menuOverlay.classList.add("active");
    });

    menuOverlay.addEventListener("click", () => {
        sideMenu.classList.remove("active");
        menuOverlay.classList.remove("active");
    });

    sideMenu.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            sideMenu.classList.remove("active");
            menuOverlay.classList.remove("active");
        });
    });

}