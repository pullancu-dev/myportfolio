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
const chatKeywords = [
  {
    keys: ['hi', 'hello', 'hey', 'kumusta', 'kamusta', 'sup', 'yo'],
    reply: "Hi there! 👋 I'm Crystal, a 4th-year Computer Engineering student at NU Laguna. What would you like to know about me?"
  },
  {
    keys: ['project', 'projects', 'built', 'made', 'iot', 'farming', 'fruit', 'cnn', 'robot', 'robotics', 'arduino', 'esp32'],
    reply: "I've worked on some cool projects! 🚀 My favorites are an IoT Vertical Farming system using Arduino, ESP32 & Firebase, a CNN Fruit Classifier using TensorFlow/Keras, and Arduino robotics (line-tracing & obstacle-avoidance). Check my Projects section for more!"
  },
  {
    keys: ['skill', 'skills', 'tech', 'stack', 'language', 'programming', 'code', 'coding', 'python', 'java', 'c++'],
    reply: "My tech stack includes C++, Java, Python, and Assembly for programming. On the hardware side, I work with Arduino, ESP32, and Raspberry Pi. I also use TensorFlow, Keras, and Firebase for AI and cloud projects! ⚙️"
  },
  {
    keys: ['volleyball', 'sports', 'athlete', 'athletic', 'basketball', 'sport', 'game', 'team'],
    reply: "I'm a student-athlete on the NU Laguna Women's Volleyball Team! 🏐 I also won Champion in SEA Women's Basketball and Best Libero in the 2023 intramurals. Sports taught me teamwork, discipline, and resilience!"
  },
  {
    keys: ['mountain', 'mountaineering', 'hiking', 'trail', 'outdoor', 'run', 'running', 'adventure'],
    reply: "Beyond the screen, I love running, mountaineering, and outdoor adventures! 🏔️ Pushing limits on the trail keeps me balanced and energized."
  },
  {
    keys: ['leader', 'leadership', 'president', 'org', 'organization', 'aces', 'mrsp', 'council'],
    reply: "I currently serve as President of NUL-ACES and VP for Robotics at NUL-MRSP. 👩‍💼 I also sit as Board of Trustee at JMRSP and Board Member at SEA Student Council. Leadership is something I'm really passionate about!"
  },
  {
    keys: ['ojt', 'internship', 'hire', 'hiring', 'job', 'work', 'opportunity', 'available', 'intern'],
    reply: "Yes, I'm actively looking for OJT opportunities in software or hardware development! 💼 I'm eager to apply my skills in embedded systems, IoT, and AI in a real-world setting."
  },
  {
    keys: ['contact', 'email', 'reach', 'message', 'call', 'phone', 'connect', 'linkedin', 'github'],
    reply: "You can reach me at pullancu@gmail.com 📩 or call/text 0954-458-3999. You can also connect with me on LinkedIn or check out my GitHub at github.com/pullancu-dev!"
  },
  {
    keys: ['education', 'school', 'university', 'nu', 'laguna', 'course', 'degree', 'study', 'studying'],
    reply: "I'm currently a 4th-year BS Computer Engineering student at National University – Laguna (2022–2026). 🎓 Before that, I took Senior High TVL-ICT (CSS) at Upland Integrated National High School."
  },
  {
    keys: ['award', 'awards', 'achievement', 'honor', 'honors', 'scholarship', 'recognition', 'dean'],
    reply: "I'm a Dean's Second Honors Lister for AY 2024–2025! 🏅 I'm also a scholar under Iskolar ng Nagcarlan and Iskolar ng Laguna. On the athletic side, I've won champion and runner-up titles in volleyball and basketball competitions."
  },
  {
    keys: ['certification', 'cert', 'tesda', 'bosh', 'css', 'certified'],
    reply: "I hold two certifications: BOSH (Certified OSH Officer SO2) from January 2026, and Computer System Servicing NC II from TESDA (May 2022). 🏆"
  },
  {
    keys: ['about', 'who', 'yourself', 'introduce', 'tell me', 'background'],
    reply: "I'm Crystal Pullan — a Computer Engineering student, student-leader, and student-athlete from Calamba, Laguna! 💻 I'm passionate about embedded systems, AI, and making an impact through technology and leadership."
  }
];

function getChatReply(input) {
  const lower = input.toLowerCase();
  for (const item of chatKeywords) {
    if (item.keys.some(k => lower.includes(k))) {
      return item.reply;
    }
  }
  return "Hmm, I'm not sure about that one! 😅 Try asking about my projects, skills, experience, or how to contact me!";
}

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
    rb.textContent = getChatReply(txt);
    msgs.appendChild(rb); msgs.scrollTop = msgs.scrollHeight;
  }, 800);
}
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  const inp = document.getElementById('chatInput');
  if (inp) inp.addEventListener('keydown', e => { if (e.key === 'Enter') sendChat(); });
});
