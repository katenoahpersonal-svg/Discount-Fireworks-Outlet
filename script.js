// Discount Fireworks Outlet — Fireworks Tent V4
// Quick edits:
// 1) Replace demo-chip data-video URLs in index.html with real YouTube embed links.
// 2) Replace the mailto address in index.html with the correct DFO email.
// 3) The horizontal timeclock target is in index.html: data-countdown="2026-07-04T00:00:00".

const header = document.querySelector('[data-header]');
const navToggle = document.querySelector('[data-nav-toggle]');
const nav = document.querySelector('[data-nav]');
const demoChips = document.querySelectorAll('.demo-chip');
const featuredVideo = document.getElementById('featuredVideo');
const featuredTitle = document.getElementById('featuredTitle');
const featuredDescription = document.getElementById('featuredDescription');

window.addEventListener('scroll', () => {
  header?.classList.toggle('scrolled', window.scrollY > 18);
});

navToggle?.addEventListener('click', () => {
  const expanded = navToggle.getAttribute('aria-expanded') === 'true';
  navToggle.setAttribute('aria-expanded', String(!expanded));
  nav?.classList.toggle('open');
});

nav?.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    navToggle?.setAttribute('aria-expanded', 'false');
  });
});

demoChips.forEach((chip) => {
  chip.addEventListener('click', () => {
    demoChips.forEach((item) => item.classList.remove('active'));
    chip.classList.add('active');
    if (featuredVideo && chip.dataset.video) featuredVideo.src = chip.dataset.video;
    if (featuredTitle && chip.dataset.title) featuredTitle.textContent = chip.dataset.title;
    if (featuredDescription && chip.dataset.description) featuredDescription.textContent = chip.dataset.description;
  });
});

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

// Glare follows the mouse slightly on the tent cards.
document.querySelectorAll('.room-wall, .center-aisle').forEach((panel) => {
  panel.addEventListener('pointermove', (event) => {
    const rect = panel.getBoundingClientRect();
    panel.style.setProperty('--mouse-x', `${event.clientX - rect.left}px`);
    panel.style.setProperty('--mouse-y', `${event.clientY - rect.top}px`);
  });
});

// Horizontal countdown timer.
const countdown = document.querySelector('[data-countdown]');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');

function pad(value, length = 2) {
  return String(value).padStart(length, '0');
}

function updateCountdown() {
  if (!countdown || !daysEl || !hoursEl || !minutesEl || !secondsEl) return;

  const target = new Date(countdown.dataset.countdown).getTime();
  const distance = target - Date.now();
  if (Number.isNaN(target)) return;

  if (distance <= 0) {
    daysEl.textContent = '000';
    hoursEl.textContent = '00';
    minutesEl.textContent = '00';
    secondsEl.textContent = '00';
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((distance / (1000 * 60)) % 60);
  const seconds = Math.floor((distance / 1000) % 60);

  daysEl.textContent = pad(days, 3);
  hoursEl.textContent = pad(hours);
  minutesEl.textContent = pad(minutes);
  secondsEl.textContent = pad(seconds);
}

updateCountdown();
setInterval(updateCountdown, 1000);

// Fireworks canvas — lightweight, no outside libraries.
const canvas = document.getElementById('fireworksCanvas');
const ctx = canvas?.getContext('2d');
let width = 0;
let height = 0;
let fireworks = [];
let particles = [];
let stars = [];
let tick = 0;
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const colors = ['#fff8ee', '#ff3b25', '#f3d27c', '#5ee8ff', '#ffffff', '#2b46ff'];

function random(min, max) {
  return Math.random() * (max - min) + min;
}

function resizeCanvas() {
  if (!canvas || !ctx) return;
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width * dpr;
  canvas.height = height * dpr;
  canvas.style.width = width + 'px';
  canvas.style.height = height + 'px';
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  stars = Array.from({ length: Math.min(95, Math.floor(width / 15)) }, () => ({
    x: random(0, width),
    y: random(0, height * .9),
    r: random(.45, 1.4),
    a: random(.16, .72),
  }));
}

class Firework {
  constructor() {
    this.x = random(width * .07, width * .93);
    this.y = height + 20;
    this.targetY = random(height * .1, height * .46);
    this.speed = random(7.2, 10.4);
    this.color = colors[Math.floor(Math.random() * colors.length)];
    this.trail = [];
    this.sway = random(-.9, .9);
  }
  update() {
    this.trail.push({ x: this.x, y: this.y });
    if (this.trail.length > 12) this.trail.shift();
    this.x += Math.sin(this.y * .012) * this.sway;
    this.y -= this.speed;
    if (this.y <= this.targetY) {
      explode(this.x, this.y, this.color);
      return false;
    }
    return true;
  }
  draw() {
    if (!ctx) return;
    ctx.save();
    ctx.beginPath();
    this.trail.forEach((point, index) => {
      ctx.globalAlpha = index / this.trail.length;
      if (index === 0) ctx.moveTo(point.x, point.y);
      else ctx.lineTo(point.x, point.y);
    });
    ctx.strokeStyle = this.color;
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.globalAlpha = 1;
    ctx.beginPath();
    ctx.arc(this.x, this.y, 2.8, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.shadowColor = this.color;
    ctx.shadowBlur = 22;
    ctx.fill();
    ctx.restore();
  }
}

class Particle {
  constructor(x, y, color, ring = false) {
    const angle = random(0, Math.PI * 2);
    const speed = ring ? random(3, 7.2) : random(1.3, 6.2);
    this.x = x;
    this.y = y;
    this.vx = Math.cos(angle) * speed;
    this.vy = Math.sin(angle) * speed;
    this.life = random(42, 88);
    this.age = 0;
    this.color = color;
    this.size = random(1, 2.8);
  }
  update() {
    this.vx *= .985;
    this.vy *= .985;
    this.vy += .036;
    this.x += this.vx;
    this.y += this.vy;
    this.age++;
    return this.age < this.life;
  }
  draw() {
    if (!ctx) return;
    const alpha = 1 - this.age / this.life;
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.shadowColor = this.color;
    ctx.shadowBlur = 16;
    ctx.fill();
    ctx.restore();
  }
}

function explode(x, y, color) {
  const ring = Math.random() > .52;
  const amount = ring ? 80 : 54;
  for (let i = 0; i < amount; i++) particles.push(new Particle(x, y, color, ring));
  if (Math.random() > .7) {
    for (let i = 0; i < 34; i++) particles.push(new Particle(x, y, colors[Math.floor(Math.random() * colors.length)], false));
  }
}

function drawStars() {
  if (!ctx) return;
  stars.forEach((star) => {
    ctx.globalAlpha = star.a;
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
    ctx.fillStyle = '#fff8ee';
    ctx.fill();
  });
  ctx.globalAlpha = 1;
}

function animate() {
  if (!ctx || reduceMotion) return;
  ctx.clearRect(0, 0, width, height);
  drawStars();
  tick++;
  if (tick % 48 === 0 || Math.random() < .007) fireworks.push(new Firework());
  fireworks = fireworks.filter((firework) => {
    const alive = firework.update();
    firework.draw();
    return alive;
  });
  particles = particles.filter((particle) => {
    const alive = particle.update();
    particle.draw();
    return alive;
  });
  requestAnimationFrame(animate);
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);
if (!reduceMotion) animate();
