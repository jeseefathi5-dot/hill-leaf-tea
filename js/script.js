// Falling leaves
const hero = document.getElementById('hero');
for (let i = 0; i < 14; i++) {
  const l = document.createElement('span');
  l.className = 'leaf'; l.textContent = '🍃';
  l.style.left = Math.random() * 100 + '%';
  l.style.fontSize = 14 + Math.random() * 22 + 'px';
  l.style.animationDuration = 7 + Math.random() * 8 + 's';
  l.style.animationDelay = -Math.random() * 12 + 's';
  hero.appendChild(l);
}
// Typewriter
const words = 'Small-batch Ceylon tea, picked by hand and packed within days of the harvest.';
let i = 0; const tw = document.getElementById('type');
(function t(){ tw.textContent = words.slice(0, i++); if (i <= words.length) setTimeout(t, 40); })();
// Scroll progress
addEventListener('scroll', () => {
  const h = document.documentElement;
  document.getElementById('prog').style.width = (h.scrollTop / (h.scrollHeight - h.clientHeight) * 100) + '%';
});
// Reveal + counters
const io = new IntersectionObserver(es => es.forEach(e => {
  if (!e.isIntersecting) return;
  e.target.classList.add('show'); io.unobserve(e.target);
  e.target.querySelectorAll('[data-n]').forEach(c => {
    const n = +c.dataset.n; let v = 0;
    const s = setInterval(() => { v += Math.ceil(n / 60); if (v >= n) { v = n; clearInterval(s); } c.textContent = v; }, 25);
  });
}), {threshold: .2});
document.querySelectorAll('.reveal').forEach(el => io.observe(el));
// 3D tilt on cards
document.querySelectorAll('.card').forEach(c => {
  c.addEventListener('mousemove', e => {
    const r = c.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
    c.style.transform = `rotateY(${x * 14}deg) rotateX(${-y * 14}deg) translateY(-6px)`;
  });
  c.addEventListener('mouseleave', () => c.style.transform = '');
});
// Brew timer
let timer;
document.getElementById('go').addEventListener('click', () => {
  clearInterval(timer);
  const total = +document.getElementById('kind').value, fill = document.getElementById('fill'), msg = document.getElementById('msg');
  let left = total;
  fill.style.height = '0';
  msg.textContent = 'Brewing... ' + left + 's left';
  timer = setInterval(() => {
    left--;
    fill.style.height = ((total - left) / total * 100) + '%';
    msg.textContent = left > 0 ? 'Brewing... ' + left + 's left' : 'Your tea is ready. Enjoy! ☕';
    if (left <= 0) clearInterval(timer);
  }, 1000);
});
