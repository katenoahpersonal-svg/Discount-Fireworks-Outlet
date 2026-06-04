const target = new Date('2026-07-04T00:00:00');
const ids = ['days','hours','minutes','seconds'];
function tick(){
  const now = new Date();
  let diff = Math.max(0, target - now);
  const d = Math.floor(diff / 86400000); diff -= d * 86400000;
  const h = Math.floor(diff / 3600000); diff -= h * 3600000;
  const m = Math.floor(diff / 60000); diff -= m * 60000;
  const s = Math.floor(diff / 1000);
  [d,h,m,s].forEach((v,i)=>{ const el=document.getElementById(ids[i]); if(el) el.textContent=String(v).padStart(2,'0'); });
}
tick(); setInterval(tick,1000);

const canvas = document.getElementById('sparkCanvas');
const ctx = canvas.getContext('2d');
let sparks = [];
function resize(){ canvas.width = innerWidth; canvas.height = innerHeight; }
addEventListener('resize', resize); resize();
function spawn(){
  const x = Math.random()*canvas.width;
  const y = Math.random()*canvas.height*.72;
  for(let i=0;i<26;i++) sparks.push({x,y,a:Math.random()*Math.PI*2,v:1+Math.random()*3,l:22+Math.random()*32,life:1,color:Math.random()>.45?'255,216,108':(Math.random()>.5?'255,63,38':'255,255,255')});
}
setInterval(spawn, 1450); spawn();
function draw(){
  ctx.clearRect(0,0,canvas.width,canvas.height);
  sparks = sparks.filter(p=>p.life>0);
  sparks.forEach(p=>{
    const nx=p.x+Math.cos(p.a)*p.l*p.life, ny=p.y+Math.sin(p.a)*p.l*p.life;
    ctx.strokeStyle=`rgba(${p.color},${p.life})`; ctx.lineWidth=1.5; ctx.beginPath(); ctx.moveTo(p.x,p.y); ctx.lineTo(nx,ny); ctx.stroke();
    p.x += Math.cos(p.a)*p.v; p.y += Math.sin(p.a)*p.v + .16; p.life -= .018;
  });
  requestAnimationFrame(draw);
}
draw();
