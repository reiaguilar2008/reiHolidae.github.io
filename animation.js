//plane button
const plane=document.querySelector(".plane-boop");
const map=document.querySelector(".map")
if(plane){
    //hover bigger thing
    plane.addEventListener("mouseenter",()=>{
        plane.classList.add("plane-hover");
    })
    plane.addEventListener("mouseleave",()=>{
        plane.classList.remove("plane-hover");
    });
    //plane fly weeeeee
    plane.addEventListener("click",()=>{
        console.log("clicked")
        plane.classList.add("fly");
        //cartoon map pops after plane zooms
        setTimeout(()=>{
            map.classList.add("show");
        },700);
    })

}

function resetAnimation(){
    if(plane){
        plane.classList.remove("fly");
        plane.classList.remove("plane-hover");
    }
    if(map){
        map.classList.remove("show");
    }
}