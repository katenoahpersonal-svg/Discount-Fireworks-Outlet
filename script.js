// Discount Fireworks Outlet — Grand Finale Burst V6
// Quick edits:
// 1) Replace video URLs in the .demo-card data-video attributes in index.html.
// 2) Update the email address in the contact mailto link if needed.
// 3) Drop the real logo into /assets and replace the text logo in index.html when ready.

const header = document.querySelector('[data-header]');
const navToggle = document.querySelector('[data-nav-toggle]');
const nav = document.querySelector('[data-nav]');
const demoCards = document.querySelectorAll('.demo-card');
const featuredVideo = document.getElementById('featuredVideo');
const featuredTitle = document.getElementById('featuredTitle');
const featuredDescription = document.getElementById('featuredDescription');
const daysEl = document.querySelector('[data-days]');
const hoursEl = document.querySelector('[data-hours]');
const minutesEl = document.querySelector('[data-minutes]');
const secondsEl = document.querySelector('[data-seconds]');

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

function updateCountdown() {
  const target = new Date('2026-07-04T00:00:00');
  const now = new Date();
  const remaining = Math.max(0, target - now);

  const days = Math.floor(remaining / (1000 * 60 * 60 * 24));
  const hours = Math.floor((remaining / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((remaining / (1000 * 60)) % 60);
  const seconds = Math.floor((remaining / 1000) % 60);

  daysEl.textContent = String(days).padStart(2, '0');
  hoursEl.textContent = String(hours).padStart(2, '0');
  minutesEl.textContent = String(minutes).padStart(2, '0');
  secondsEl.textContent = String(seconds).padStart(2, '0');
}
updateCountdown();
setInterval(updateCountdown, 1000);

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
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((el) => revealObserver.observe(el));

// Firework canvas: made to feel like the page is radiating from a single firework core.
const canvas = document.getElementById('fireworksCanvas');
const ctx = canvas.getContext('2d');
let width;
let height;
let fireworks = [];
let particles = [];
let fountain = [];
let tick = 0;
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const colors = ['#ffffff', '#fff0b5', '#ffd76a', '#ff3727', '#72d8ff', '#9eb7ff'];

function resizeCanvas() {
  const dpr = Math.min(window.devicePixelRatio || 1, 2);
  width = window.innerWidth;
  height = window.innerHeight;
  canvas.width = width * dpr;
  canvas.height = height * dpr;
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

function random(min, max) {
  return Math.random() * (max - min) + min;
}

class Firework {
  constructor(x = random(width * 0.14, width * 0.86), targetY = random(height * 0.12, height * 0.46)) {
    this.x = x;
    this.y = height + 20;
    this.targetY = targetY;
    this.speed = random(7.4, 10.6);
    this.color = colors[Math.floor(Math.random() * colors.length)];
    this.trail = [];
  }

  update() {
    this.trail.push({ x: this.x, y: this.y });
    if (this.trail.length > 12) this.trail.shift();
    this.y -= this.speed;
    if (this.y <= this.targetY) {
      explode(this.x, this.y, this.color, random(38, 78));
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
    ctx.lineWidth = 2.2;
    ctx.stroke();
    ctx.globalAlpha = 1;

    ctx.beginPath();
    ctx.arc(this.x, this.y, 3.1, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.shadowColor = this.color;
    ctx.shadowBlur = 20;
    ctx.fill();
    ctx.shadowBlur = 0;
  }
}

class Particle {
  constructor(x, y, color, power = 1) {
    const angle = random(0, Math.PI * 2);
    const speed = random(1.2, 6.6) * power;
    this.x = x;
    this.y = y;
    this.vx = Math.cos(angle) * speed;
    this.vy = Math.sin(angle) * speed;
    this.life = random(48, 92);
    this.age = 0;
    this.color = color;
    this.size = random(1, 2.8);
  }

  update() {
    this.vx *= 0.984;
    this.vy *= 0.984;
    this.vy += 0.033;
    this.x += this.vx;
    this.y += this.vy;
    this.age += 1;
    return this.age < this.life;
  }

  draw() {
    const alpha = 1 - this.age / this.life;
    ctx.globalAlpha = alpha;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.shadowColor = this.color;
    ctx.shadowBlur = 13;
    ctx.fill();
    ctx.shadowBlur = 0;
    ctx.globalAlpha = 1;
  }
}

class FountainSpark {
  constructor() {
    this.x = random(width * 0.47, width * 0.53);
    this.y = random(height * 0.67, height * 0.82);
    const angle = random(-Math.PI * 0.88, -Math.PI * 0.12);
    const speed = random(1.5, 4.2);
    this.vx = Math.cos(angle) * speed;
    this.vy = Math.sin(angle) * speed;
    this.life = random(30, 74);
    this.age = 0;
    this.color = colors[Math.floor(Math.random() * colors.length)];
    this.size = random(.8, 2.1);
  }

  update() {
    this.vx *= 0.988;
    this.vy += 0.055;
    this.x += this.vx;
    this.y += this.vy;
    this.age += 1;
    return this.age < this.life;
  }

  draw() {
    const alpha = 1 - this.age / this.life;
    ctx.globalAlpha = alpha * .72;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.shadowColor = this.color;
    ctx.shadowBlur = 10;
    ctx.fill();
    ctx.shadowBlur = 0;
    ctx.globalAlpha = 1;
  }
}

function explode(x, y, color, count = 58) {
  for (let i = 0; i < count; i += 1) {
    particles.push(new Particle(x, y, color, random(.9, 1.25)));
  }
}

function drawRadialBlueWash() {
  const gradient = ctx.createRadialGradient(width * 0.5, height * 0.66, 0, width * 0.5, height * 0.66, Math.max(width, height) * 0.72);
  gradient.addColorStop(0, 'rgba(5, 23, 214, 0.20)');
  gradient.addColorStop(.38, 'rgba(3, 10, 80, 0.08)');
  gradient.addColorStop(1, 'rgba(0, 0, 0, 0)');
  ctx.globalCompositeOperation = 'lighter';
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);
}

function animate() {
  ctx.globalCompositeOperation = 'source-over';
  ctx.fillStyle = 'rgba(2, 4, 18, 0.20)';
  ctx.fillRect(0, 0, width, height);
  drawRadialBlueWash();
  ctx.globalCompositeOperation = 'lighter';

  tick += 1;

  if (!reduceMotion) {
    if (tick % 52 === 0 && fireworks.length < 5) fireworks.push(new Firework());
    if (tick % 210 === 0) explode(width * 0.5, height * 0.64, colors[Math.floor(Math.random() * colors.length)], 92);
    if (tick % 3 === 0 && fountain.length < 120) fountain.push(new FountainSpark());
  }

  fireworks = fireworks.filter((firework) => {
    firework.draw();
    return firework.update();
  });

  particles = particles.filter((particle) => {
    particle.draw();
    return particle.update();
  });

  fountain = fountain.filter((spark) => {
    spark.draw();
    return spark.update();
  });

  requestAnimationFrame(animate);
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);
animate();
