(function() {
  // LOADER
  window.addEventListener('load', ()=>{ setTimeout(()=> document.getElementById('loader').classList.add('fade-out'), 500); });

  // SCROLL REVEAL
  const sections = document.querySelectorAll('section');
  const observer = new IntersectionObserver(entries => { entries.forEach(e => { if(e.isIntersecting) e.target.classList.add('visible'); }); }, { threshold: 0.2 });
  sections.forEach(s => observer.observe(s));

  // TYPING ANIMATION
  const phrases = ["Juniors !", "Future Leaders", "Learners", "Innovators"];
  let idx = 0, charIdx = 0, isDeleting = false;
  const typingSpan = document.getElementById('typingSpan');
  function typeEffect() {
    let current = phrases[idx];
    if(isDeleting) charIdx--;
    else charIdx++;
    typingSpan.textContent = current.substring(0, charIdx);
    if(!isDeleting && charIdx === current.length) { isDeleting = true; setTimeout(typeEffect, 1500); return; }
    if(isDeleting && charIdx === 0) { isDeleting = false; idx = (idx+1)%phrases.length; }
    setTimeout(typeEffect, isDeleting ? 60 : 120);
  }
  typeEffect();

  // STICKY NAV BLUR + scroll top button
  const scrollBtn = document.getElementById('scrollTop');
  window.addEventListener('scroll', ()=> { if(window.scrollY>500) scrollBtn.classList.add('show'); else scrollBtn.classList.remove('show'); });
  scrollBtn.onclick = ()=> window.scrollTo({top:0, behavior:'smooth'});

  // THEME TOGGLE
  const themeBtn = document.getElementById('themeToggle');
  themeBtn.addEventListener('click', ()=> { document.body.classList.toggle('light-mode'); themeBtn.innerHTML = document.body.classList.contains('light-mode') ? '<i class="fas fa-sun"></i> Light' : '<i class="fas fa-moon"></i> Dark'; });

  // HOLIDAY DYNAMIC
  const holidayList = document.getElementById('holidayList');
  const holidayInput = document.getElementById('holidayInput');
  document.getElementById('addHolidayBtn').addEventListener('click', ()=>{
    if(holidayInput.value.trim()) { let li = document.createElement('li'); li.innerHTML = '<i class="fas fa-calendar-check"></i> '+holidayInput.value; holidayList.appendChild(li); holidayInput.value=''; }
  });

  // TIC TAC TOE
  const cells = document.querySelectorAll('.cell');
  let board = ['','','','','','','','',''], turn = 'X', gameOver = false;
  const turnInd = document.getElementById('turnIndicator');
  function checkWinner() { const win = [[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]]; for(let w of win) { if(board[w[0]] && board[w[0]]===board[w[1]] && board[w[1]]===board[w[2]]) return board[w[0]]; } return board.includes('') ? null : 'Tie'; }
  function updateGame() { cells.forEach((c,i)=> c.textContent=board[i]); let winner = checkWinner(); if(winner) { turnInd.textContent = winner==='Tie'? 'Tie!' : `Winner: ${winner}`; gameOver = true; } else { turnInd.textContent = `${turn}'s turn`; } }
  cells.forEach(c=> c.addEventListener('click', (e)=> { if(gameOver) return; let idx = e.target.dataset.index; if(!board[idx]) { board[idx]=turn; turn = turn==='X'?'O':'X'; updateGame(); } }));
  document.getElementById('resetTic').addEventListener('click', ()=> { board = ['','','','','','','','','']; turn='X'; gameOver=false; updateGame(); });
  updateGame();

  // SUDOKU 4x4
  const sudokuGrid = document.getElementById('sudoku-grid');
  for(let i=0;i<16;i++) { let inp = document.createElement('input'); inp.type = 'number'; inp.min=1; inp.max=4; inp.classList.add('sudoku-cell'); inp.setAttribute('data-sudoku', i); sudokuGrid.appendChild(inp); }
  document.getElementById('checkSudoku').addEventListener('click', ()=>{
    let vals = Array.from(document.querySelectorAll('[data-sudoku]')).map(i=>i.value.trim());
    let ok = true;
    if(vals.some(v=>!v.match(/^[1-4]$/))) { document.getElementById('sudokuMsg').textContent='Fill 1-4 only'; return; }
    for(let r=0;r<4;r++) { let row = vals.slice(r*4,r*4+4); if(new Set(row).size!==4) ok=false; }
    for(let c=0;c<4;c++) { let col = [vals[c],vals[c+4],vals[c+8],vals[c+12]]; if(new Set(col).size!==4) ok=false; }
    for(let br=0;br<2;br++) for(let bc=0;bc<2;bc++) { let box = [vals[br*8+bc*2], vals[br*8+bc*2+1], vals[br*8+bc*2+4], vals[br*8+bc*2+5]]; if(new Set(box).size!==4) ok=false; }
    document.getElementById('sudokuMsg').textContent = ok ? '✔ Correct!' : '❌ Wrong.';
  });

  // LIGHTBOX
  const modal = document.getElementById('lightboxModal'), modalImg = document.getElementById('modalImage');
  document.querySelectorAll('.gallery-img').forEach(img => img.addEventListener('click', (e)=> { modal.classList.add('active'); modalImg.src = e.target.src; }));
  document.getElementById('closeModal').onclick = ()=> modal.classList.remove('active');
  window.onclick = (e)=> { if(e.target===modal) modal.classList.remove('active'); };

  // CONTACT VALIDATION
  document.getElementById('contactForm').addEventListener('submit', (e)=> { e.preventDefault(); let name = document.getElementById('name').value, email = document.getElementById('email').value, msg = document.getElementById('message').value; if(name && email.includes('@') && msg) document.getElementById('formFeedback').textContent = 'Thanks, we’ll reach out.'; else document.getElementById('formFeedback').textContent = 'Please fill all fields correctly.'; });
})();

// ========== RESOURCE CARD HANDLERS (MISSING – ADDED) ==========
// Attach click listener to resource cards
document.querySelectorAll('#resources .card').forEach(card => {
  card.addEventListener('click', (e) => {
    const title = card.querySelector('h3').innerText.trim();
    if (title === 'Syllabus') {
      window.location.href = 'syllabus.html';
    } else if (title === 'Notes') {
      window.location.href = 'notes.html';
    } else if (title === 'Prev Papers') {
      window.location.href = 'pyq.html';
    } else if (title === 'Roadmaps') {
      window.location.href = 'roadmaps.html';
    } else if (title === 'Coding Resources') {
      window.location.href = 'coding-resources.html';
    } else {
      alert(`${title} – information coming soon.`);
    }
  });
});

// ========== RESOURCE MODAL (for Syllabus card modal – keep if needed) ==========
const resourceItems = {
  Syllabus: [
    { title: "CSE AI & IoT (1st Year)", pdf: "pdfs/syllabus/A1-Scheme-Syllabus-CSE-AI-IOT-CS-all-Computer-BTECH-1st-year-2022-23.pdf" }
  ]
};

const resourceModal = document.getElementById('resourceModal');
const resourceModalTitle = document.getElementById('resourceModalTitle');
const resourceList = document.getElementById('resourceList');
const closeResourceModal = document.getElementById('closeResourceModal');

if (resourceModal && resourceModalTitle && resourceList && closeResourceModal) {
  function showResourceModal(resourceType) {
    const items = resourceItems[resourceType];
    if (!items) return;
    resourceModalTitle.innerText = `Select Branch & Year for ${resourceType}`;
    resourceList.innerHTML = '';
    items.forEach(item => {
      const div = document.createElement('div');
      div.className = 'syllabus-item';
      div.innerHTML = `
        <h4>${item.title}</h4>
        <a href="${item.pdf}" target="_blank" class="syllabus-btn">VIEW SYLLABUS</a>
      `;
      resourceList.appendChild(div);
    });
    resourceModal.classList.add('active');
  }

  closeResourceModal.addEventListener('click', () => resourceModal.classList.remove('active'));
  window.addEventListener('click', (e) => {
    if (e.target === resourceModal) resourceModal.classList.remove('active');
  });
} else {
  console.error('Resource modal elements not found!');
}

// ========== HERO SLIDESHOW (unchanged) ==========
const heroSection = document.getElementById('hero');
const images = [
  'https://ggnindia.dronacharya.info/images/Gallery/Infrastructure/23112022-7.jpg',
  'https://ggnindia.dronacharya.info/images/Gallery/Infrastructure/Digital-Library-Dronacharya-college-of-Engineering-NCR.jpg',
  'https://ggnindia.dronacharya.info/images/Gallery/Infrastructure/24.jpg',
  'https://ggnindia.dronacharya.info/images/Gallery/Infrastructure/DCE_iMac.jpg',
  'https://ggnindia.dronacharya.info/images/Gallery/Infrastructure/23112022-12.jpg',
  'https://ggnindia.dronacharya.info/images/Gallery/Infrastructure/23112022-7.jpg'
];
let currentIndex = 0;
const preloadedImages = [];
let loadedCount = 0;
images.forEach((src, idx) => {
  const img = new Image();
  img.onload = () => {
    loadedCount++;
    if (idx === 0) heroSection.style.backgroundImage = `url('${src}')`;
    if (loadedCount === images.length) startSlideshow();
  };
  img.src = src;
  preloadedImages.push(img);
});
function startSlideshow() {
  setInterval(() => {
    currentIndex = (currentIndex + 1) % images.length;
    heroSection.style.backgroundImage = `url('${images[currentIndex]}')`;
  }, 3000);
}
heroSection.style.backgroundColor = '#0b0f15';

// ===== PARTICLE BACKGROUND (moving dots) =====
(function() {
  let canvas = document.getElementById('particleCanvas');
  if (!canvas) {
    canvas = document.createElement('canvas');
    canvas.id = 'particleCanvas';
    document.body.appendChild(canvas);
  }
  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];
  function resizeCanvas() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
  }
  window.addEventListener('resize', resizeCanvas);
  resizeCanvas();
  function createParticles() {
    particles = [];
    for (let i = 0; i < 120; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        radius: Math.random() * 2 + 1.2,
        speedX: (Math.random() - 0.5) * 0.6,
        speedY: (Math.random() - 0.5) * 0.6,
        opacity: Math.random() * 0.5 + 0.2,
        color: `hsl(${Math.random() * 60 + 180}, 100%, 60%)`
      });
    }
  }
  function animateParticles() {
    if (!ctx) return;
    ctx.clearRect(0, 0, width, height);
    for (let p of particles) {
      p.x += p.speedX;
      p.y += p.speedY;
      if (p.x < 0) p.x = width;
      if (p.x > width) p.x = 0;
      if (p.y < 0) p.y = height;
      if (p.y > height) p.y = 0;
      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.globalAlpha = p.opacity;
      ctx.fill();
    }
    requestAnimationFrame(animateParticles);
  }
  createParticles();
  window.addEventListener('resize', () => { createParticles(); });
  animateParticles();
})();

// ===== AI CHATBOT (Gemini API) =====
(function() {
  const toggleBtn = document.getElementById('chatbotToggle');
  const chatWindow = document.getElementById('chatbotWindow');
  const closeBtn = document.getElementById('chatbotClose');
  const input = document.getElementById('chatbotInput');
  const sendBtn = document.getElementById('chatbotSend');
  const messagesDiv = document.getElementById('chatbotMessages');
  if (!toggleBtn) return;
  toggleBtn.addEventListener('click', () => chatWindow.classList.toggle('hidden'));
  closeBtn.addEventListener('click', () => chatWindow.classList.add('hidden'));
  function addMessage(text, sender) {
    const msgDiv = document.createElement('div');
    msgDiv.className = `message ${sender}`;
    msgDiv.textContent = text;
    messagesDiv.appendChild(msgDiv);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
  }
  function showTyping() {
    const typingDiv = document.createElement('div');
    typingDiv.className = 'message bot';
    typingDiv.id = 'typingIndicator';
    typingDiv.innerHTML = '<i class="fas fa-ellipsis-h"></i> typing...';
    messagesDiv.appendChild(typingDiv);
    messagesDiv.scrollTop = messagesDiv.scrollHeight;
  }
  function hideTyping() {
    const indicator = document.getElementById('typingIndicator');
    if (indicator) indicator.remove();
  }
  async function askAI(question) {
    const API_KEY = 'YOUR_API_KEY';
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`;
    const systemPrompt = `You are a helpful assistant for Dronacharya College of Engineering. 
Answer questions about:
- Notes, syllabus, previous year papers (PYQs)
- Upcoming events, holiday calendar
- Juniors guide, clubs, exam tips
- Games, gallery, contact info
- Use a friendly, supportive tone. Keep answers concise.`;
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ contents: [{ parts: [{ text: systemPrompt + '\nUser: ' + question }] }] })
      });
      const data = await response.json();
      return data.candidates[0].content.parts[0].text;
    } catch (error) {
      console.error('AI error:', error);
      return "I'm having trouble connecting. Please try again later.";
    }
  }
  function localResponse(question) {
    const q = question.toLowerCase();
    if (q.includes('note') || q.includes('study')) return "Notes are in the Resources section. Choose your branch and semester to view PDFs.";
    if (q.includes('syllabus')) return "Syllabus for all branches is available under the Syllabus card. We have 1st to 4th year detailed curriculum.";
    if (q.includes('pyq') || q.includes('paper')) return "Previous year papers are in the 'Prev Papers' section. Choose your branch and semester.";
    if (q.includes('event')) return "Upcoming events are listed in the Events section. Check Staff Fiesta, Republic Day celebrations, and more!";
    if (q.includes('holiday')) return "Holiday calendar shows all breaks from Jan to Jun 2026. You can also add your own holidays.";
    if (q.includes('game')) return "Play Tic Tac Toe or Sudoku in the Games Zone. They're fully interactive!";
    if (q.includes('gallery')) return "The Image Gallery showcases our campus, labs, and events. Click on any photo to enlarge.";
    if (q.includes('contact') || q.includes('developer')) return "Contact Kaushal Sharma or Roshan Kumari via the Contact section. Their LinkedIn and GitHub are linked.";
    return "I'm here to help with college resources! Try asking about notes, syllabus, events, or games.";
  }
  async function sendMessage() {
    const text = input.value.trim();
    if (!text) return;
    addMessage(text, 'user');
    input.value = '';
    showTyping();
    if (typeof API_KEY !== 'undefined' && API_KEY !== 'YOUR_API_KEY') {
      const reply = await askAI(text);
      hideTyping();
      addMessage(reply, 'bot');
    } else {
      setTimeout(() => {
        hideTyping();
        const reply = localResponse(text);
        addMessage(reply, 'bot');
      }, 800);
    }
  }
  sendBtn.addEventListener('click', sendMessage);
  input.addEventListener('keypress', (e) => { if (e.key === 'Enter') sendMessage(); });
})();

// ===== WORD CYCLING PRELOADER (sessionStorage) =====
(function() {
  if (sessionStorage.getItem('preloaderShown')) {
    const preloader = document.getElementById('wordPreloader');
    if (preloader) preloader.remove();
    return;
  }
  const preloader = document.getElementById('wordPreloader');
  const wordElement = document.getElementById('preloaderWord');
  if (!preloader || !wordElement) return;
  sessionStorage.setItem('preloaderShown', 'true');
  const words = ["Notes.", "Syllabus.", "Papers.", "Events.", "Games.", "Welcome. . . . . ."];
  let index = 0;
  let interval;
  function updateWord() {
    if (index >= words.length) {
      clearInterval(interval);
      setTimeout(() => {
        preloader.classList.add('exit');
        setTimeout(() => { preloader.remove(); document.body.style.overflow = 'auto'; }, 800);
      }, 1000);
      return;
    }
    wordElement.style.opacity = '0';
    wordElement.style.filter = 'blur(8px)';
    wordElement.style.transform = 'scale(1.1)';
    setTimeout(() => {
      wordElement.textContent = words[index];
      wordElement.style.opacity = '1';
      wordElement.style.filter = 'blur(0px)';
      wordElement.style.transform = 'scale(1)';
      index++;
    }, 200);
  }
  interval = setInterval(updateWord, 400);
  wordElement.style.transition = 'all 0.3s ease';
  wordElement.style.opacity = '1';
  wordElement.style.filter = 'blur(0px)';
  wordElement.style.transform = 'scale(1)';
})();
