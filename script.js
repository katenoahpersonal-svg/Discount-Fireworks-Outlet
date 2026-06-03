// Discount Fireworks Outlet — Grand Finale Control Deck
// Quick edits:
// 1) Replace video URLs in each .demo-card data-video attribute in index.html.
// 2) Replace the form email in index.html if you want messages sent somewhere else.
// 3) Drop a real logo into assets and replace the text logo in index.html if desired.

const header = document.querySelector('[data-header]');
const navToggle = document.querySelector('[data-nav-toggle]');
const nav = document.querySelector('[data-nav]');
const demoCards = document.querySelectorAll('.demo-card');
const featuredVideo = document.getElementById('featuredVideo');
const featuredTitle = document.getElementById('featuredTitle');
const featuredDescription = document.getElementById('featuredDescription');

window.addEventListener('scroll', () => {
  header.classList.toggle('scrolled', window.scrollY > 18);
});

navToggle?.addEventListener('click', () => {
  const expanded = navToggle.getAttribute('aria-expanded') === 'true';
  navToggle.setAttribute('aria-expanded', String(!expanded));
  nav.classList.toggle('open');
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

    featuredVideo.src = card.dataset.video;
    featuredTitle.textContent = card.dataset.title;
    featuredDescription.textContent = card.dataset.description;
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

// Lightweight fireworks canvas. No library needed.
const canvas = document.getElementById('fireworksCanvas');
const ctx = canvas.getContext('2d');
let width;
let height;
let fireworks = [];
let particles = [];
let tick = 0;

const colors = ['#fff9f2', '#ff3628', '#ffd46a', '#78ddff', '#ffffff'];
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

function resizeCanvas() {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width * dpr;
  canvas.height = height * dpr;
  canvas.style.width = width + 'px';
  canvas.style.height = height + 'px';
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

function random(min, max) {
  return Math.random() * (max - min) + min;
}

class Firework {
  constructor() {
    this.x = random(width * 0.08, width * 0.92);
    this.y = height + 20;
    this.targetY = random(height * 0.12, height * 0.5);
    this.speed = random(7, 10);
    this.color = colors[Math.floor(Math.random() * colors.length)];
    this.trail = [];
  }

  update() {
    this.trail.push({ x: this.x, y: this.y });
    if (this.trail.length > 10) this.trail.shift();
    this.y -= this.speed;
    if (this.y <= this.targetY) {
      explode(this.x, this.y, this.color);
      return false;
    }
    return true;
  }

  draw() {
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
    ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.shadowColor = this.color;
    ctx.shadowBlur = 18;
    ctx.fill();
    ctx.shadowBlur = 0;
  }
}

class Particle {
  constructor(x, y, color) {
    const angle = random(0, Math.PI * 2);
    const speed = random(1.2, 6.5);
    this.x = x;
    this.y = y;
    this.vx = Math.cos(angle) * speed;
    this.vy = Math.sin(angle) * speed;
    this.life = random(48, 88);
    this.age = 0;
    this.color = color;
    this.size = random(1.1, 2.8);
  }

  update() {
    this.vx *= 0.985;
    this.vy *= 0.985;
    this.vy += 0.035;
    this.x += this.vx;
    this.y += this.vy;
    this.age++;
    return this.age < this.life;
  }

  draw() {
    const alpha = 1 - this.age / this.life;
    ctx.globalAlpha = alpha;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.shadowColor = this.color;
    ctx.shadowBlur = 12;
    ctx.fill();
    ctx.shadowBlur = 0;
    ctx.globalAlpha = 1;
  }
}

function explode(x, y, color) {
  const count = Math.floor(random(38, 72));
  for (let i = 0; i < count; i++) particles.push(new Particle(x, y, color));
}

function animate() {
  ctx.globalCompositeOperation = 'source-over';
  ctx.fillStyle = 'rgba(2, 3, 20, 0.18)';
  ctx.fillRect(0, 0, width, height);
  ctx.globalCompositeOperation = 'lighter';

  tick++;
  if (!reduceMotion && tick % 46 === 0 && fireworks.length < 4) fireworks.push(new Firework());
  if (!reduceMotion && tick % 170 === 0) explode(random(width * 0.1, width * 0.9), random(height * 0.12, height * 0.42), colors[Math.floor(Math.random() * colors.length)]);

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
