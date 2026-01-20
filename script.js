const envelope = document.getElementById("envelope");
const screen1 = document.getElementById("screen1");
const screen2 = document.getElementById("screen2");
const rain = document.getElementById("rain");
const music = document.getElementById("music");
const btnMore = document.getElementById("btnMore");
const final = document.getElementById("final");

let opened = false;

const photos = [
  "photos/1.jpg",
  "photos/2.jpg",
  "photos/3.jpg",
  "photos/4.jpg",
  "photos/5.jpg",
];

envelope.addEventListener("click", () => {
  if(opened) return;
  opened = true;

  envelope.classList.add("open");

  // Music starts after click (mobile rule)
  music.volume = 0.7;
  music.play().catch(()=>{});

  // BOOM confetti
  startConfetti(220);

  // start photo rain
  startPhotoRain();

  // switch screen after animation
  setTimeout(() => {
    screen1.classList.add("hidden");
    screen2.classList.remove("hidden");
  }, 650);
});

btnMore.addEventListener("click", () => {
  final.classList.remove("hidden");
  startConfetti(120);
});

/* ---------------- PHOTO RAIN ---------------- */
function startPhotoRain(){
  let count = 0;

  const fast = setInterval(() => {
    createDrop();
    count++;
    if(count > 35){
      clearInterval(fast);
      setInterval(createDrop, 650);
    }
  }, 140);
}

function createDrop(){
  const img = document.createElement("img");
  img.className = "rain-img";

  img.src = photos[Math.floor(Math.random()*photos.length)];

  const size = rand(56, 100);
  img.style.width = size + "px";
  img.style.height = size + "px";

  img.style.left = rand(0, window.innerWidth - size) + "px";
  img.style.top = "-140px";

  const duration = rand(4, 8);
  img.style.animationDuration = duration + "s";

  rain.appendChild(img);
  setTimeout(()=>img.remove(), duration*1000 + 200);
}

function rand(min,max){
  return Math.floor(Math.random()*(max-min+1))+min;
}

/* ---------------- CONFETTI CANVAS ---------------- */
const canvas = document.getElementById("confetti");
const ctx = canvas.getContext("2d");

let pieces = [];

function resize(){
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

function startConfetti(amount=120){
  for(let i=0;i<amount;i++){
    pieces.push({
      x: Math.random()*canvas.width,
      y: -20,
      r: rand(4,9),
      vx: (Math.random()-0.5)*7,
      vy: Math.random()*5+2,
      rot: Math.random()*360
    });
  }
}

function animate(){
  ctx.clearRect(0,0,canvas.width,canvas.height);

  for(let i=pieces.length-1;i>=0;i--){
    const p = pieces[i];
    p.x += p.vx;
    p.y += p.vy;
    p.rot += 6;

    ctx.save();
    ctx.translate(p.x, p.y);
    ctx.rotate(p.rot*Math.PI/180);
    ctx.fillStyle = `hsl(${Math.random()*360}, 85%, 70%)`;
    ctx.fillRect(-p.r/2, -p.r/2, p.r, p.r);
    ctx.restore();

    if(p.y > canvas.height + 30) pieces.splice(i,1);
  }

  requestAnimationFrame(animate);
}
animate();
