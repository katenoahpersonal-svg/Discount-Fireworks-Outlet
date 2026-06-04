const target = new Date('2026-07-04T00:00:00');
const pad = n => String(Math.max(0, n)).padStart(2, '0');
function tick(){
  const diff = target - new Date();
  const sec = Math.max(0, Math.floor(diff / 1000));
  const d = Math.floor(sec / 86400);
  const h = Math.floor((sec % 86400) / 3600);
  const m = Math.floor((sec % 3600) / 60);
  const s = sec % 60;
  document.getElementById('days').textContent = pad(d);
  document.getElementById('hours').textContent = pad(h);
  document.getElementById('minutes').textContent = pad(m);
  document.getElementById('seconds').textContent = pad(s);
}
tick(); setInterval(tick, 1000);

const iframe = document.getElementById('featuredVideo');
const title = document.getElementById('featuredTitle');
document.querySelectorAll('.shell').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.shell').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    title.textContent = btn.dataset.title;
    iframe.src = `https://www.youtube.com/embed/${btn.dataset.video}?autoplay=1`;
  });
});

const canvas = document.getElementById('fireworks');
const ctx = canvas.getContext('2d');
let w, h, particles = [];
function resize(){ w = canvas.width = innerWidth; h = canvas.height = innerHeight; }
addEventListener('resize', resize); resize();
function burst(){
  const x = Math.random() * w;
  const y = Math.random() * h * .45 + 60;
  const colors = ['#fff8ea','#ffd56b','#ff3b25','#3f68ff'];
  for(let i=0;i<46;i++){
    const a = Math.PI * 2 * i / 46;
    const speed = 1.6 + Math.random()*3.2;
    particles.push({x,y,vx:Math.cos(a)*speed,vy:Math.sin(a)*speed,life:70+Math.random()*25,color:colors[Math.floor(Math.random()*colors.length)]});
  }
}
setInterval(burst, 1700); burst();
function animate(){
  ctx.clearRect(0,0,w,h);
  ctx.globalCompositeOperation='lighter';
  particles = particles.filter(p => p.life-- > 0);
  particles.forEach(p => {
    p.x += p.vx; p.y += p.vy; p.vy += .025;
    ctx.globalAlpha = Math.max(0, p.life / 90);
    ctx.fillStyle = p.color;
    ctx.beginPath(); ctx.arc(p.x,p.y,1.6,0,Math.PI*2); ctx.fill();
  });
  requestAnimationFrame(animate);
}
animate();
