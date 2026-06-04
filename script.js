// Discount Fireworks Outlet — Grand Finale Control Deck V2
// Quick edits:
// 1) Replace demo-card data-video URLs in index.html with your real YouTube embed links.
// 2) Replace the mailto address in index.html with the best DFO contact email.
// 3) Drop the real logo into /assets and replace the text brand if desired.
// 4) Countdown target is set in index.html: data-countdown="2026-07-04T00:00:00".

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
}, { threshold: 0.14 });

document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

// Countdown timer for America's 250th Independence Day.
const countdown = document.querySelector('[data-countdown]');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');

function pad(value) {
  return String(value).padStart(2, '0');
}

function updateCountdown() {
  if (!countdown || !daysEl || !hoursEl || !minutesEl || !secondsEl) return;

  const target = new Date(countdown.dataset.countdown).getTime();
  const now = Date.now();
  const distance = target - now;

  if (Number.isNaN(target)) return;

  if (distance <= 0) {
    daysEl.textContent = '00';
    hoursEl.textContent = '00';
    minutesEl.textContent = '00';
    secondsEl.textContent = '00';
    const note = countdown.parentElement?.querySelector('.countdown-note');
    if (note) note.textContent = 'America’s 250th celebration is here';
    return;
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((distance / (1000 * 60)) % 60);
  const seconds = Math.floor((distance / 1000) % 60);

  daysEl.textContent = pad(days);
  hoursEl.textContent = pad(hours);
  minutesEl.textContent = pad(minutes);
  secondsEl.textContent = pad(seconds);
}

updateCountdown();
setInterval(updateCountdown, 1000);

// Lightweight fireworks canvas. No external library needed.
const canvas = document.getElementById('fireworksCanvas');
const ctx = canvas?.getContext('2d');
let width = 0;
let height = 0;
let fireworks = [];
let particles = [];
let stars = [];
let tick = 0;

const colors = ['#fff8e8', '#f2362a', '#eacb7a', '#7be2ff', '#ffffff', '#1235ff'];
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

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
  stars = Array.from({ length: Math.min(120, Math.floor(width / 12)) }, () => ({
    x: random(0, width),
    y: random(0, height * 0.88),
    r: random(0.45, 1.6),
    a: random(0.22, 0.86),
    pulse: random(0.006, 0.018),
  }));
}

class Firework {
  constructor() {
    this.x = random(width * 0.08, width * 0.92);
    this.y = height + 24;
    this.targetY = random(height * 0.12, height * 0.52);
    this.speed = random(7.4, 10.8);
    this.color = colors[Math.floor(Math.random() * colors.length)];
    this.trail = [];
    this.sway = random(-0.85, 0.85);
  }

  update() {
    this.trail.push({ x: this.x, y: this.y });
    if (this.trail.length > 12) this.trail.shift();
    this.x += Math.sin(this.y * 0.012) * this.sway;
    this.y -= this.speed;
    if (this.y <= this.targetY) {
      explode(this.x, this.y, this.color);
      return false;
    }
    return true;
  }

  draw() {
    if (!ctx) return;
    ctx.beginPath();
    this.trail.forEach((point, index) => {
      ctx.globalAlpha = index / this.trail.length;
      ctx.lineTo(point.x, point.y);
    });
    ctx.strokeStyle = this.color;
    ctx.lineWidth = 2;
    ctx.stroke();
    ctx.globalAlpha = 1;

    ctx.beginPath();
    ctx.arc(this.x, this.y, 2.7, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.shadowColor = this.color;
    ctx.shadowBlur = 20;
    ctx.fill();
    ctx.shadowBlur = 0;
  }
}

class Particle {
  constructor(x, y, color, ring = false) {
    const angle = random(0, Math.PI * 2);
    const speed = ring ? random(3.2, 7.8) : random(1.4, 6.4);
    this.x = x;
    this.y = y;
    this.vx = Math.cos(angle) * speed;
    this.vy = Math.sin(angle) * speed;
    this.life = random(46, 92);
    this.age = 0;
    this.color = color;
    this.size = random(1, 2.9);
  }

  update() {
    this.vx *= 0.985;
    this.vy *= 0.985;
    this.vy += 0.036;
    this.x += this.vx;
    this.y += this.vy;
    this.age++;
    return this.age < this.life;
  }

  draw() {
    if (!ctx) return;
    const alpha = 1 - this.age / this.life;
    ctx.globalAlpha = alpha;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.shadowColor = this.color;
    ctx.shadowBlur = 14;
    ctx.fill();
    ctx.shadowBlur = 0;
    ctx.globalAlpha = 1;
  }
}

function explode(x, y, color) {
  const ring = Math.random() > 0.58;
  const count = Math.floor(random(ring ? 62 : 38, ring ? 96 : 72));
  for (let i = 0; i < count; i++) particles.push(new Particle(x, y, color, ring));
}

function drawStars() {
  if (!ctx) return;
  stars.forEach((star) => {
    star.a += star.pulse;
    if (star.a > 0.95 || star.a < 0.18) star.pulse *= -1;
    ctx.globalAlpha = star.a;
    ctx.beginPath();
    ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
    ctx.fillStyle = '#fff8e8';
    ctx.fill();
  });
  ctx.globalAlpha = 1;
}

function animate() {
  if (!ctx) return;
  ctx.globalCompositeOperation = 'source-over';
  ctx.fillStyle = 'rgba(3, 4, 11, 0.2)';
  ctx.fillRect(0, 0, width, height);
  drawStars();
  ctx.globalCompositeOperation = 'lighter';

  tick++;
  if (!reduceMotion && tick % 42 === 0 && fireworks.length < 5) fireworks.push(new Firework());
  if (!reduceMotion && tick % 155 === 0) explode(random(width * 0.1, width * 0.9), random(height * 0.11, height * 0.43), colors[Math.floor(Math.random() * colors.length)]);

  fireworks = fireworks.filter((firework) => {
    firework.draw();
    return firework.update();
  });

  particles = particles.filter((particle) => {
    particle.draw();
    return particle.update();
  });

  requestAnimationFrame(animate);
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);
animate();
