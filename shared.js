// Theme toggle
function initTheme() {
  const saved = localStorage.getItem('theme') || 'light';
  document.body.setAttribute('data-theme', saved);
  updateToggleIcon(saved);
}
function toggleTheme() {
  const current = document.body.getAttribute('data-theme');
  const next = current === 'dark' ? 'light' : 'dark';
  document.body.setAttribute('data-theme', next);
  localStorage.setItem('theme', next);
  updateToggleIcon(next);
}
function updateToggleIcon(theme) {
  const btn = document.getElementById('themeToggle');
  if (btn) btn.textContent = theme === 'dark' ? '☀️' : '🌙';
}

// Chat widget
function toggleChat() {
  const panel = document.getElementById('chatPanel');
  if (panel) panel.classList.toggle('open');
}
const chatReplies = [
  "Hi! I'm Crystal, a 4th-year Computer Engineering student at NU Laguna. 😊",
  "I specialize in IoT, embedded systems, and AI. Arduino and ESP32 are my go-to tools! 🔧",
  "I'm actively looking for OJT opportunities in software or hardware development.",
  "I built an IoT Vertical Farming system using Arduino, ESP32, and Firebase! 🌱",
  "I also developed a CNN model for fruit classification using TensorFlow/Keras. 🍎",
  "As President of NUL-ACES, I led engineering events and workshops for our chapter. 👩‍💼",
  "I'm also a student-athlete on the NU Laguna Women's Volleyball Team! 🏐",
  "Feel free to reach me at pullancu@gmail.com or check my GitHub! 📩"
];
let chatIdx = 0;
function sendChat() {
  const inp = document.getElementById('chatInput');
  const msgs = document.getElementById('chatMessages');
  if (!inp || !msgs) return;
  const txt = inp.value.trim();
  if (!txt) return;
  const ub = document.createElement('div');
  ub.className = 'bubble user'; ub.textContent = txt;
  msgs.appendChild(ub); inp.value = ''; msgs.scrollTop = msgs.scrollHeight;
  const tp = document.createElement('div');
  tp.className = 'bubble typing'; tp.textContent = 'typing...';
  msgs.appendChild(tp); msgs.scrollTop = msgs.scrollHeight;
  setTimeout(() => {
    msgs.removeChild(tp);
    const rb = document.createElement('div');
    rb.className = 'bubble';
    rb.textContent = chatReplies[chatIdx++ % chatReplies.length];
    msgs.appendChild(rb); msgs.scrollTop = msgs.scrollHeight;
  }, 800);
}
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  const inp = document.getElementById('chatInput');
  if (inp) inp.addEventListener('keydown', e => { if (e.key === 'Enter') sendChat(); });
});
