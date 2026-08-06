// =====================================================
// FOR MY CUTIE PIE ❤️
// script.js
// =====================================================

gsap.registerPlugin(ScrollTrigger);

// =====================================================
// DOM
// =====================================================

const loader = document.getElementById("loader");
const musicButton = document.getElementById("musicButton");

const piano = document.getElementById("piano");
const meow = document.getElementById("meow");

const stars = document.getElementById("stars");
const shootingStars = document.getElementById("shootingStars");

const moon = document.getElementById("moon");
const moonGlow = document.getElementById("moonGlow");

const cloudLayerOne = document.getElementById("cloudLayerOne");
const cloudLayerTwo = document.getElementById("cloudLayerTwo");

const cursorGlow = document.getElementById("cursorGlow");
const cursorTrail = document.getElementById("cursorTrail");

const catContainer = document.getElementById("catContainer");
const pawContainer = document.getElementById("pawPrintContainer");
const speechBubble = document.getElementById("speechBubble");

const envelope = document.getElementById("envelope");
const envelopeFlap = document.querySelector(".envelopeFlap");
const envelopeLetter = document.querySelector(".envelopeLetter");

const petals = document.getElementById("petals");

const fireflies = document.getElementById("fireflies");
const lanterns = document.getElementById("lanterns");
const hearts = document.getElementById("hearts");

const secretMessage = document.getElementById("secretMessage");

// =====================================================
// START
// =====================================================

window.addEventListener("load", () => {

    createStars();

    animateMoon();

    createClouds();

    createFireflies();

    createLanterns();

    createHearts();

    createPetals();

    startLoader();

    startCursor();

    startShootingStars();

    startCat();

    setupEnvelope();

    setupStoryReveal();

    setupSecret();

});

// =====================================================
// LOADER
// =====================================================

function startLoader(){

    gsap.to(".loading-progress",{

        width:"100%",

        duration:3,

        ease:"power2.out"

    });

    gsap.to(loader,{

        opacity:0,

        delay:3.2,

        duration:1,

        onComplete(){

            loader.style.display="none";

        }

    });

}

// =====================================================
// MUSIC
// =====================================================

musicButton.addEventListener("click",()=>{

    piano.volume=.35;

    piano.play().catch(()=>{});

    gsap.to(musicButton,{

        opacity:0,

        duration:.8,

        onComplete(){

            musicButton.remove();

        }

    });

});


// =====================================================
// CURSOR
// =====================================================

function startCursor(){

    document.addEventListener("mousemove",(e)=>{

        gsap.to(cursorGlow,{

            x:e.clientX-10,

            y:e.clientY-10,

            duration:.12

        });

        gsap.to(cursorTrail,{

            x:e.clientX-4,

            y:e.clientY-4,

            duration:.28

        });

    });

}

// =====================================================
// STARS (Scene 1)
// =====================================================

function createStars(){

    if(!stars) return;

    const count = 140;

    for(let i=0;i<count;i++){

        const star = document.createElement("div");

        star.className = "star";

        const size = Math.random()*2.5+1;

        star.style.width = size+"px";
        star.style.height = size+"px";
        star.style.top = Math.random()*100+"%";
        star.style.left = Math.random()*100+"%";
        star.style.opacity = Math.random()*.6+.3;

        stars.appendChild(star);

        gsap.to(star,{

            opacity: Math.random()*.4+.2,

            duration: Math.random()*2+1.5,

            repeat:-1,

            yoyo:true,

            delay: Math.random()*3

        });

    }

}

// =====================================================
// MOON
// =====================================================

function animateMoon(){

    if(!moon || !moonGlow) return;

    gsap.to(moonGlow,{

        opacity:.6,

        scale:1.08,

        duration:3.5,

        repeat:-1,

        yoyo:true,

        ease:"sine.inOut",

        transformOrigin:"center center"

    });

    gsap.to(moon,{

        boxShadow:"0 0 80px rgba(255,255,255,.95), 0 0 150px rgba(255,255,255,.6)",

        duration:3.5,

        repeat:-1,

        yoyo:true,

        ease:"sine.inOut"

    });

}

// =====================================================
// CLOUDS
// =====================================================

function createClouds(){

    buildCloudLayer(cloudLayerOne, 4, 60);

    buildCloudLayer(cloudLayerTwo, 3, 40);

}

function buildCloudLayer(layer, count, baseDuration){

    if(!layer) return;

    for(let i=0;i<count;i++){

        const cloud = document.createElement("div");

        cloud.className = "cloud";

        const top = Math.random()*40+5;
        const scale = Math.random()*.6+.6;

        cloud.style.top = top+"%";
        cloud.style.left = "-260px";
        cloud.style.transform = `scale(${scale})`;

        layer.appendChild(cloud);

        gsap.to(cloud,{

            x: window.innerWidth + 400,

            duration: baseDuration + Math.random()*20,

            repeat:-1,

            ease:"none",

            delay: Math.random()*20

        });

    }

}

// =====================================================
// SHOOTING STARS
// =====================================================

function startShootingStars(){

    if(!shootingStars) return;

    function spawn(){

        const s = document.createElement("div");

        s.className = "shooting-star";

        s.style.top = Math.random()*40+"%";
        s.style.left = Math.random()*60+20+"%";

        shootingStars.appendChild(s);

        gsap.fromTo(s,
            { x:0, y:0, opacity:1 },
            {
                x:260,
                y:180,
                opacity:0,
                duration:1.1,
                ease:"power1.in",
                onComplete(){ s.remove(); }
            }
        );

        gsap.delayedCall(Math.random()*4+3, spawn);

    }

    gsap.delayedCall(Math.random()*3+1, spawn);

}

// =====================================================
// CAT (Scene 2)
// =====================================================

function startCat(){

    if(!catContainer) return;

    ScrollTrigger.create({

        trigger:"#scene2",

        start:"top 70%",

        once:true,

        onEnter(){

            walkCat();

        }

    });

}

function walkCat(){

    const endX = window.innerWidth * 0.55;

    gsap.to(catContainer,{

        x: endX,

        duration:2.4,

        ease:"power1.out",

        onUpdate: dropPawPrint,

        onComplete(){

            if(meow){

                meow.currentTime = 0;

                meow.play().catch(()=>{});

            }

            gsap.to(speechBubble,{

                opacity:1,

                y:-10,

                duration:.6,

                ease:"back.out(1.7)"

            });

        }

    });

}

let lastPawTime = 0;

function dropPawPrint(){

    const now = Date.now();

    if(now - lastPawTime < 180) return;

    lastPawTime = now;

    if(!pawContainer || !catContainer) return;

    const rect = catContainer.getBoundingClientRect();
    const parentRect = pawContainer.getBoundingClientRect();

    const paw = document.createElement("div");

    paw.className = "paw";

    paw.style.left = (rect.left - parentRect.left + rect.width/2) + "px";
    paw.style.top = (rect.top - parentRect.top + rect.height*0.85) + "px";

    pawContainer.appendChild(paw);

    gsap.to(paw,{

        opacity:0,

        duration:2,

        delay:.3,

        onComplete(){ paw.remove(); }

    });

}

// =====================================================
// ENVELOPE (Scene 3)
// =====================================================

function setupEnvelope(){

    if(!envelope) return;

    gsap.set(envelopeLetter,{ y:20, opacity:0 });

    ScrollTrigger.create({

        trigger:"#scene3",

        start:"top 60%",

        once:true,

        onEnter(){

            gsap.to(envelopeFlap,{

                rotationX:180,

                duration:1,

                ease:"power2.inOut",

                transformOrigin:"top center"

            });

            gsap.to(envelopeLetter,{

                y:-70,

                opacity:1,

                duration:1,

                delay:.6,

                ease:"back.out(1.4)"

            });

        }

    });

    createMagicParticles();

}

function createMagicParticles(){

    const field = document.getElementById("magicParticles");

    if(!field) return;

    const count = 40;

    for(let i=0;i<count;i++){

        const p = document.createElement("div");

        p.style.position = "absolute";
        p.style.width = "4px";
        p.style.height = "4px";
        p.style.borderRadius = "50%";
        p.style.background = "#ffe1ef";
        p.style.left = Math.random()*100+"%";
        p.style.top = "-10px";
        p.style.opacity = Math.random()*.7+.3;

        field.appendChild(p);

        gsap.to(p,{

            y: window.innerHeight + 40,

            x: "+="+(Math.random()*80-40),

            duration: Math.random()*6+5,

            repeat:-1,

            delay: Math.random()*6,

            ease:"none"

        });

    }

}

// =====================================================
// STORY REVEAL (Scene 4)
// =====================================================

function setupStoryReveal(){

    const paras = document.querySelectorAll("#typewriter p");

    gsap.set(paras,{ opacity:0, y:15 });

    ScrollTrigger.create({

        trigger:"#scene4",

        start:"top 55%",

        once:true,

        onEnter(){

            gsap.to(paras,{

                opacity:1,

                y:0,

                stagger:.35,

                duration:.8,

                ease:"power2.out"

            });

        }

    });

}

// =====================================================
// PETALS (Scene 4)
// =====================================================

function createPetals(){

    if(!petals) return;

    const emojis = ["🌸","🌷","💮"];

    function spawn(){

        const p = document.createElement("div");

        p.textContent = emojis[Math.floor(Math.random()*emojis.length)];
        p.style.position = "absolute";
        p.style.left = Math.random()*100+"%";
        p.style.top = "-30px";
        p.style.fontSize = (Math.random()*14+14)+"px";
        p.style.opacity = Math.random()*.6+.4;

        petals.appendChild(p);

        gsap.to(p,{

            y: window.innerHeight + 60,

            x:"+="+(Math.random()*120-60),

            rotation: Math.random()*360,

            duration: Math.random()*6+6,

            ease:"none",

            onComplete(){ p.remove(); }

        });

        gsap.delayedCall(Math.random()*1.2+.4, spawn);

    }

    spawn();

}

// =====================================================
// FIREFLIES (Scene 5)
// =====================================================

function createFireflies(){

    if(!fireflies) return;

    const count = 25;

    for(let i=0;i<count;i++){

        const f = document.createElement("div");

        f.className = "firefly";

        f.style.left = Math.random()*100+"%";
        f.style.top = Math.random()*100+"%";

        fireflies.appendChild(f);

        gsap.to(f,{

            x:"+="+(Math.random()*100-50),

            y:"+="+(Math.random()*100-50),

            opacity: Math.random()*.6+.3,

            duration: Math.random()*3+2,

            repeat:-1,

            yoyo:true,

            ease:"sine.inOut",

            delay: Math.random()*3

        });

    }

}

// =====================================================
// LANTERNS (Scene 5)
// =====================================================

function createLanterns(){

    if(!lanterns) return;

    const count = 6;

    for(let i=0;i<count;i++){

        const l = document.createElement("div");

        l.className = "lantern";

        l.style.left = (10 + i*15)+"%";
        l.style.bottom = "-100px";

        lanterns.appendChild(l);

        gsap.to(l,{

            y:-(window.innerHeight+200),

            x:"+="+(Math.random()*60-30),

            duration: Math.random()*10+14,

            repeat:-1,

            ease:"none",

            delay: Math.random()*10

        });

    }

}

// =====================================================
// FLOATING HEARTS (Scene 5)
// =====================================================

function createHearts(){

    if(!hearts) return;

    const emojis = ["❤️","💖","💕"];

    const count = 14;

    for(let i=0;i<count;i++){

        const h = document.createElement("div");

        h.className = "heart";

        h.textContent = emojis[Math.floor(Math.random()*emojis.length)];
        h.style.left = Math.random()*100+"%";
        h.style.top = Math.random()*100+"%";

        hearts.appendChild(h);

        gsap.to(h,{

            y:"-=25",

            duration: Math.random()*2+2,

            repeat:-1,

            yoyo:true,

            ease:"sine.inOut",

            delay: Math.random()*2

        });

    }

}

// =====================================================
// SECRET MESSAGE
// =====================================================

function setupSecret(){

    if(!secretMessage) return;

    let clicks = 0;

    document.addEventListener("click",(e)=>{

        if(e.target.closest("#musicButton")) return;

        clicks++;

        if(clicks === 7){

            secretMessage.style.display = "block";

            gsap.fromTo(secretMessage,
                { opacity:0, scale:.85 },
                { opacity:1, scale:1, duration:.6, ease:"back.out(1.6)" }
            );

        }

    });

    secretMessage.addEventListener("click",()=>{

        gsap.to(secretMessage,{

            opacity:0,

            scale:.9,

            duration:.4,

            onComplete(){

                secretMessage.style.display = "none";

            }

        });

    });

}