// Discount Fireworks Outlet — V5 Fireworks Tent / Demo Theater
// Quick edits:
// 1) Replace demo-card data-video URLs in index.html with real YouTube embed links.
// 2) Replace the mailto address in index.html with the correct DFO email.
// 3) Countdown target is in index.html: data-countdown="2026-07-04T00:00:00".

const header = document.querySelector('[data-header]');
const navToggle = document.querySelector('[data-nav-toggle]');
const nav = document.querySelector('[data-nav]');
const demoCards = document.querySelectorAll('.demo-card');
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

demoCards.forEach((card) => {
  card.addEventListener('click', () => {
    demoCards.forEach((item) => item.classList.remove('active'));
    card.classList.add('active');
    if (featuredVideo && card.dataset.video) featuredVideo.src = card.dataset.video;
    if (featuredTitle && card.dataset.title) featuredTitle.textContent = card.dataset.title;
    if (featuredDescription && card.dataset.description) featuredDescription.textContent = card.dataset.description;
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

// Horizontal header countdown timer.
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

// Fireworks canvas — restrained, not chaotic. No outside libraries.
const canvas = document.getElementById('fireworksCanvas');
const ctx = canvas?.getContext('2d');
let width = 0;
let height = 0;
let fireworks = [];
let particles = [];
let stars = [];
let tick = 0;
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const colors = ['#fff8ee', '#ff3b25', '#f5d47b', '#5ee8ff', '#ffffff', '#2b46ff'];

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
  stars = Array.from({ length: Math.min(78, Math.floor(width / 18)) }, () => ({
    x: random(0, width),
    y: random(0, height * .86),
    r: random(.35, 1.15),
    a: random(.12, .58),
  }));
}

class Firework {
  constructor() {
    this.x = random(width * .12, width * .88);
    this.y = height + 18;
    this.targetY = random(height * .1, height * .36);
    this.speed = random(6.8, 9.2);
    this.color = colors[Math.floor(Math.random() * colors.length)];
    this.trail = [];
    this.sway = random(-.55, .55);
  }
  update() {
    this.trail.push({ x: this.x, y: this.y });
    if (this.trail.length > 10) this.trail.shift();
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
    ctx.lineWidth = 1.8;
    ctx.stroke();
    ctx.globalAlpha = 1;
    ctx.beginPath();
    ctx.arc(this.x, this.y, 2.4, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.shadowColor = this.color;
    ctx.shadowBlur = 18;
    ctx.fill();
    ctx.restore();
  }
}

class Particle {
  constructor(x, y, color, ring = false) {
    const angle = random(0, Math.PI * 2);
    const speed = ring ? random(2.5, 6.4) : random(1.1, 5.2);
    this.x = x;
    this.y = y;
    this.vx = Math.cos(angle) * speed;
    this.vy = Math.sin(angle) * speed;
    this.life = random(34, 72);
    this.age = 0;
    this.color = color;
    this.size = random(.9, 2.4);
  }
  update() {
    this.vx *= .985;
    this.vy *= .985;
    this.vy += .034;
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
    ctx.shadowBlur = 13;
    ctx.fill();
    ctx.restore();
  }
}

function explode(x, y, color) {
  const ring = Math.random() > .58;
  const amount = ring ? 62 : 42;
  for (let i = 0; i < amount; i++) particles.push(new Particle(x, y, color, ring));
  if (Math.random() > .78) {
    for (let i = 0; i < 22; i++) particles.push(new Particle(x, y, colors[Math.floor(Math.random() * colors.length)], false));
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
  if (tick % 72 === 0 || Math.random() < .0045) fireworks.push(new Firework());
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
