const ordered = [

"ULO GONDRONG",
"TIM AJAIB",
"TIM JAGO B",
"EIGHT GLORY",
"SEGO JOTOS",
"TRALELO A",
"PANGLIMA MBG",
"PARINPA B",
"NYENI NYENUK",
"GARUDA",
"REXFORT",
"SMART4",
"G77 GARAGE",
"NIVEA MAN",
"TWELEVE AREA",
"TIM JAGO A",
"TRALELO B",
"PARINPA A",
"ZENIUS",
"SIREN"

];

let teams=[...ordered];

const canvas=document.getElementById("wheel");
const ctx=canvas.getContext("2d");

let rotation=0;
let spinning=false;
let winnerStep=0;

function drawWheel(){

ctx.clearRect(0,0,650,650);

let arc=2*Math.PI/teams.length;

for(let i=0;i<teams.length;i++){

let angle=rotation+i*arc;

ctx.beginPath();
ctx.moveTo(325,325);
ctx.arc(325,325,325,angle,angle+arc);

ctx.fillStyle=
`hsl(${i*360/teams.length},70%,55%)`;

ctx.fill();

ctx.save();

ctx.translate(325,325);
ctx.rotate(angle+arc/2);

ctx.fillStyle="white";
ctx.font="bold 18px Segoe UI";
ctx.textAlign="right";

ctx.fillText(teams[i],290,10);

ctx.restore();
}

}

drawWheel();

function easeOut(t){
return 1-Math.pow(1-t,3);
}

function spin(){

if(spinning||teams.length==0) return;

spinning=true;

let name=ordered[winnerStep];
let index=teams.indexOf(name);

let arc=360/teams.length;

let targetAngle=(360-index*arc-arc/2);

let spins=360*6;

let final=spins+targetAngle;

let start=null;
let duration=3000;

function animate(time){

if(!start)start=time;

let progress=time-start;

let percent=Math.min(progress/duration,1);

let eased=easeOut(percent);

rotation=(final*eased)*Math.PI/180;

drawWheel();

if(percent<1){

requestAnimationFrame(animate);

}else{

spinning=false;

document.getElementById("result").innerText=
"Pemenang: "+name;

teams.splice(index,1);

winnerStep++;

confetti();

document.getElementById("spinBtn").style.display="none";
document.getElementById("nextBtn").style.display="inline-block";

drawWheel();

}

}

requestAnimationFrame(animate);

}

function next(){

document.getElementById("result").innerText="";

document.getElementById("spinBtn").style.display="inline-block";
document.getElementById("nextBtn").style.display="none";

}

document.getElementById("spinBtn").onclick=spin;
document.getElementById("nextBtn").onclick=next;



function confetti(){

const canvas=document.getElementById("confetti");
const ctx=canvas.getContext("2d");

canvas.width=window.innerWidth;
canvas.height=window.innerHeight;

let pieces=[];

for(let i=0;i<200;i++){

pieces.push({

x:Math.random()*canvas.width,
y:Math.random()*canvas.height-500,
size:Math.random()*8+4,
speed:Math.random()*3+2

});

}

function update(){

ctx.clearRect(0,0,canvas.width,canvas.height);

pieces.forEach(p=>{

p.y+=p.speed;

ctx.fillStyle=
`hsl(${Math.random()*360},100%,50%)`;

ctx.fillRect(p.x,p.y,p.size,p.size);

});

requestAnimationFrame(update);

}

update();

setTimeout(()=>{

ctx.clearRect(0,0,canvas.width,canvas.height)

},3000);

}