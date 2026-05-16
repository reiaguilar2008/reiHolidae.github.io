import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

let closeness=0;
let clicked=0;
let phonedot=0;

const container=document.getElementById("THEWORLD");
const countryCard=document.getElementById("countryCard");

//country card stuff
const raycaster=new THREE.Raycaster();
const mouse=new THREE.Vector2();
let CountryDots=[];
let activeDot=null;

const scene=new THREE.Scene();
console.log("THEWORLD.js is working");

const camera=new THREE.PerspectiveCamera(
    45,
    container.clientWidth/container.clientHeight,
    0.1,
    1000
);

camera.position.set(0,0,4);

const renderer=new THREE.WebGLRenderer({
    antialias:true,
    alpha:true
});

renderer.setSize(container.clientWidth, container.clientHeight);
renderer.setPixelRatio(window.devicePixelRatio);
container.appendChild(renderer.domElement);

const light=new THREE.DirectionalLight(0xffffff, 1.5);
light.position.set(2, 2, 5);
scene.add(light);

const ambientLight=new THREE.AmbientLight(0xffffff, 2.5);
scene.add(ambientLight);

let earth;

let isHovering=false;

//hover card stays open if anywhere else card goes
let cardOpen=false;
function openCard(){
    cardOpen=true;
    countryCard.classList.add("active");
    positionCountryCard();
}
function closeCard(){
    cardOpen=false;
    countryCard.classList.remove("active");
}

//hover bigger thing, tried it in the stylesheet and the bg got bigger too
container.addEventListener("mouseenter",()=>{
    isHovering=true;
});

container.addEventListener("mouseleave",()=>{
    isHovering=false;
});

//can't hover on a phone so im making the size change when someone tapity taps
//white background tap
const globeSection=document.querySelector(".globe-section");
if(globeSection){
    globeSection.addEventListener("pointerdown",(event)=>{
        if(event.pointerType !=="touch")return;
        isHovering=true;
    })
    globeSection.addEventListener("pointerup",(event)=>{
        if(event.pointerType !=="touch")return;
        if(!cardOpen&&phonedot<=0){
            isHovering=false
        }
    });
}
//globe tap
container.addEventListener("pointerdown",(event)=>{
    if(event.pointerType !=="touch")return;
    isHovering=true
    phonedot=180;
});
container.addEventListener("pointerup",(event)=>{
    if(event.pointerType !=="touch")return;
    phonedot=180;
    setTimeout(()=>{
        if(!cardOpen){
            isHovering=false;
        }
    },3000);

});
container.addEventListener("pointercancel",(event)=>{
    phonedot=0;
    isHovering=false;
});

//mouse thing for the dots visibility
container.addEventListener("mousemove",function(event){
    const rect=container.getBoundingClientRect();
    mouse.x=((event.clientX-rect.left)/rect.width)*2-1;
    mouse.y=-((event.clientY-rect.top)/rect.height)*2+1;
})

const loader=new GLTFLoader();
//im lost
loader.load(
    "theworld.glb", 
    function(gltf){
        earth=gltf.scene;
        earth.scale.set(1.4, 1.4, 1.4);
        scene.add(earth);
        //white country dots
        const dotGeometry=new THREE.SphereGeometry(0.02,16,16);
        function makeCountryDot(name,x,y,z){
            const dotMaterial=new THREE.MeshBasicMaterial({
                color:0xffffff,transparent:true,opacity:0});
            const dot=new THREE.Mesh(dotGeometry,dotMaterial);
            dot.position.set(x,y,z);
            dot.userData.countryName=name;
            earth.add(dot);
            CountryDots.push(dot);
            return dot;
}
//Japan mini nuke
makeCountryDot("Japan",-0.62,0.6,-0.53);
//uk dot
//WHERE THE FUCK IS THE UK
makeCountryDot("UK",0.58,0.8,0.02);
//z isnt in and ot and left isnt left

},
undefined,
function(error){
    console.error("Error loading model:",error);
}
);

const controls=new OrbitControls(camera,renderer.domElement);
controls.enableZoom=false;
controls.enablePan=false;


//tryna make the dots invisible until the mouse is near it
function updateDotVisibility(){
    closeness=0;
    CountryDots.forEach(dot=>{
        const dotWorldPosition=new THREE.Vector3();
        dot.getWorldPosition(dotWorldPosition);
        dotWorldPosition.project(camera);
        const rect=container.getBoundingClientRect();
        const dotX=(dotWorldPosition.x*0.5+0.5)*rect.width;
        const dotY=(-dotWorldPosition.y*0.5+0.5)*rect.height;
        const mouseX=mouse.x*0.5*rect.width+rect.width/2;
        const mouseY=-mouse.y*0.5*rect.height+rect.height/2;
        const dx=dotX-mouseX;
        const dy=dotY-mouseY;
        const distance=Math.sqrt(dx*dx+dy*dy);
        let dotcloseness=1-distance/100;
        dotcloseness=Math.max(0,Math.min(1,dotcloseness));
        closeness=Math.max(closeness,dotcloseness);
        if(phonedot>0){
            dotcloseness=Math.max(dotcloseness,1);
        }
        if(clicked>0&&dot===activeDot){
            dot.material.opacity=0.3;
        }else if(cardOpen&&dot===activeDot){
            dot.material.opacity=1;
        }else{
            dot.material.opacity=dotcloseness;
        }
        if(cardOpen&&dot===activeDot){
            dot.scale.set(1,1,1);
        }else{
            const dotScale=0.4+dotcloseness*0.6;
            const clickbig=dotcloseness>0.8?1.2:1;
            dot.scale.set(
                dotScale*clickbig,
                dotScale*clickbig,
                dotScale*clickbig
            );
        }

    });
}

function animate(){
    requestAnimationFrame(animate);

    if(earth&&!cardOpen){
        const baseSpeed=0.005;
        const slowSpeed=0.0015;
        const rotationSpeed=baseSpeed-closeness*(baseSpeed-slowSpeed);
        earth.rotation.y+=rotationSpeed;
        const targetScale=isHovering?1.5:1.35;
        earth.scale.lerp(new THREE.Vector3(targetScale,targetScale,targetScale),0.2)
    }

    controls.update();
    if(cardOpen){
        positionCountryCard()
    }
    if(phonedot>0){
        phonedot--;
    }
    updateDotVisibility();
    renderer.render(scene, camera);
    if(clicked>0){
        clicked--;
    }
}
//card position
function positionCountryCard(){
    if(!activeDot)return;
    const dotWorldPosition=new THREE.Vector3();
    activeDot.getWorldPosition(dotWorldPosition);
    dotWorldPosition.project(camera);
    const globeRect=container.getBoundingClientRect();
    const sectionRect=document.querySelector(".globe-section").getBoundingClientRect();
    const dotX=(dotWorldPosition.x*0.5+0.5)*globeRect.width+globeRect.left;
    const dotY=(-dotWorldPosition.y*0.5+0.5)*globeRect.height+globeRect.top;
    const cardLeft=dotX-sectionRect.left+30;
    const cardTop=dotY-sectionRect.top-25;
    countryCard.style.left=cardLeft+"px";
    countryCard.style.top=cardTop+"px";
    countryCard.style.setProperty("--arrow-top","25px");
    //card position for the phone ver
    if(window.innerWidth<=768){
        countryCard.style.left="";
        countryCard.style.top="";
        countryCard.style.bottom="";
        const cardRect=countryCard.getBoundingClientRect();
        const arrowLeft=dotX-cardRect.left;
        countryCard.style.setProperty("--mobile-arrow-left",arrowLeft+"px");
        return;
    }
}

//country card click
//japan
//tap tap tap and click
container.addEventListener("pointerdown",function(event){
    const rect=container.getBoundingClientRect();
    mouse.x=((event.clientX-rect.left)/rect.width)*2-1;
    mouse.y=-((event.clientY-rect.top)/rect.height)*2+1;
    raycaster.setFromCamera(mouse,camera);
    const hits=raycaster.intersectObjects(CountryDots, true);
    if(hits.length>0){
        activeDot=hits[0].object;
        const countryName=activeDot.userData.countryName;
        if(countryName==="Japan"){
            countryCard.innerHTML=`<h2>Japan</h2><p>country info</p>`;
        }
        if(countryName==="UK"){
            countryCard.innerHTML=`<h2>United Kingdom</h2><p>country info</p>`;
        }
        clicked=20
        openCard();
    }
})
container.addEventListener("click",function(event){
    //i am deeply regretting the way i type i have no idea where i am
    const rect=container.getBoundingClientRect();
    mouse.x=((event.clientX-rect.left)/rect.width)*2-1;
    mouse.y=-((event.clientY-rect.top)/rect.height)*2+1;
    raycaster.setFromCamera(mouse,camera);
    const hits=raycaster.intersectObjects(CountryDots,true);
    if(hits.length>0){
        activeDot=hits[0].object;
        countryCard.classList.toggle("active");
        clicked=20;
        openCard();
    }
})

//the hover thing for the card
countryCard.addEventListener("mouseenter",()=>{
    cardOpen=true;
});
countryCard.addEventListener("mouseleave",()=>{
    setTimeout(() => {
        if(!container.matches(":hover")){
            closeCard();
        }
    }, 100);
});
container.addEventListener("mouseleave",()=>{
    setTimeout(()=>{
        if(!countryCard.matches(":hover")){
            closeCard();
        }
    },100);
});

//country card goes away when scroll on phone
window.addEventListener("scroll",()=>{
    if(window.innerWidth<=768){
        closeCard();
        phonedot=0;
        isHovering=false;
    }
})

//3d model phone fix
window.addEventListener("resize",()=>{
    const width=container.clientWidth;
    const height=container.clientHeight;
    renderer.setSize(width,height);
    camera.aspect=width/height;
    camera.updateProjectionMatrix();
})

animate();