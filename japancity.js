const bigMedias=document.querySelectorAll(".big-media");

bigMedias.forEach(box=>{
    const video=box.querySelector("video");

    box.addEventListener("mouseenter",()=>{
        video.play();
    });

    box.addEventListener("mouseleave",()=>{
        video.pause();
        video.currentTime=0;
    });
});