const canvas = document.createElement('canvas');
canvas.style.position = 'fixed';
canvas.style.top = '0';
canvas.style.left = '0';
canvas.style.width = '100%';
canvas.style.height = '100%';
canvas.style.zIndex = '0';
canvas.style.pointerEvents = 'none';
document.body.appendChild(canvas);

const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth
canvas.height = window.innerHeight;

const stars = [];
for (let i = 0; i < 150; i++) {
    stars.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        radius: Math.random() * 1.5,
        speed: Math.random() * 0.3 + 0.1
    });
}

function animateStars(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    stars.forEach(star => {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();
        star.y += star.speed;
        if (star.y > canvas.height) {
            star.y = 0;
            star.x = Math.random() * canvas.width;
        }
    });
    requestAnimationFrame(animateStars);
}

animateStars();

//Nav scroll hightlight
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');
window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`){
            link.classList.add('active');
        }
    });
});

// Typing animation
const typingText = document.querySelector('#hero p');
if (typingText) {
    const text = typingText.textContent;
    typingText.textContent = '';
    let i = 0;
    setTimeout(() => {
        const interval = setInterval(() => {
            typingText.textContent += text[i];
            i++;
            if (i >= text.length) clearInterval(interval);
        }, 50);
    }, 800);
}

// ── Theme Toggle ──
const themeBtn = document.getElementById('theme-toggle');
const saved = localStorage.getItem('theme');

if (saved === 'light') {
  document.body.classList.add('light-mode');
  if (themeBtn) themeBtn.textContent = '☀️';
}

if (themeBtn) {
  themeBtn.addEventListener('click', () => {
    document.body.classList.toggle('light-mode');
    const isLight = document.body.classList.contains('light-mode');
    themeBtn.textContent = isLight ? '☀️' : '🌙';
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
  });
}