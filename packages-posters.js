const packageCards=document.querySelectorAll(".package-card");
packageCards.forEach(card=>{
    const video=card.querySelector(".package-video");
    if(video){
        card.addEventListener("mouseenter",()=>{
            video.play();
        });
        card.addEventListener("mouseleave",()=>{
            video.pause();
            video.currentTime=0;
        });
    }
});

//extended info going "hi! i'm clickable":D
const detailBoxes=document.querySelectorAll(".package-card details");
detailBoxes.forEach(box=>{
    const card=box.closest(".package-card");
    card.addEventListener("mousemove",(e)=>{
        if(box.hasAttribute("open")){
            box.style.transform="translateY(0)";
            return;
        }
        const rect=card.getBoundingClientRect();
        const mouseY=e.clientY-rect.top;
        const distance=Math.abs(mouseY-rect.height);
        let closeness=1-(distance/450);
        closeness=Math.max(0,Math.min(1,closeness));
        box.style.transform=`translateY(${-closeness*30}px)`;
    });
    card.addEventListener("mouseleave",()=>{
        box.style.transform="translateY(0)";
    });
});