import './style.css';
import * as THREE from 'three';
import { lessons, instruments, levelMeta, chordData } from './data/lessons.js';

// SVG Icons (inline to match Figma design)
const icons = {
  music: `<svg class="brand-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 18V5l12-2v13"/><circle cx="6" cy="18" r="3"/><circle cx="18" cy="16" r="3"/></svg>`,
  arrowLeft: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>`,
  trendingUp: `<svg class="stat-icon teal" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/><polyline points="16 7 22 7 22 13"/></svg>`,
  star: `<svg class="stat-icon yellow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
  award: `<svg class="progress-summary-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="7"/><polyline points="8.21 13.89 7 23 12 20 17 23 15.79 13.88"/></svg>`,
  checkCircle: `<svg class="lesson-status-icon completed" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>`,
  circle: `<svg class="lesson-status-icon pending" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/></svg>`,
  clock: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
  chevronRight: `<svg class="lesson-arrow" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="9 18 15 12 9 6"/></svg>`,
  target: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>`,
  timer: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>`,
  check: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`
};

// State management
const state = {
  currentView: 'select',
  currentInstrument: null,
  currentLevel: 'beginner',
  currentLesson: null,
  progress: JSON.parse(localStorage.getItem('musicProgress') || '{}'),
  timerInterval: null,
  timerSeconds: 0,
  timerRunning: false
};

function saveProgress() {
  localStorage.setItem('musicProgress', JSON.stringify(state.progress));
}

function getTotalCompleted(instrument = null) {
  if (instrument) {
    const instrumentLessons = Object.values(lessons[instrument]).flat();
    return instrumentLessons.filter(l => state.progress[l.id]).length;
  }
  return Object.values(state.progress).filter(Boolean).length;
}

function getLevelProgress(instrument, level) {
  const levelLessons = lessons[instrument][level] || [];
  const completed = levelLessons.filter(l => state.progress[l.id]).length;
  return { completed, total: levelLessons.length, percentage: Math.round((completed / levelLessons.length) * 100) || 0 };
}

function getInstrumentProgress(instrumentId) {
  const allLessons = Object.values(lessons[instrumentId]).flat();
  const completed = allLessons.filter(l => state.progress[l.id]).length;
  return Math.round((completed / allLessons.length) * 100) || 0;
}

// Main render function
function renderApp() {
  const app = document.querySelector('#app');

  if (state.currentView === 'select') {
    app.innerHTML = renderInstrumentSelect();
    initInstrumentSelect();
  } else if (state.currentView === 'lessons') {
    app.innerHTML = renderLessonsPage();
    initLessonsPage();
  } else if (state.currentView === 'lesson') {
    app.innerHTML = renderLessonDetail();
    initLessonPage();
  }
}

// ============ INSTRUMENT SELECT ============
function renderInstrumentSelect() {
  const gradientClasses = {
    piano: 'cyan',
    guitar: 'orange',
    violin: 'purple',
    drums: 'teal'
  };

  return `
    <div class="select-screen">
      <div class="select-container">
        <!-- Header -->
        <div class="select-header">
          <div class="brand">
            ${icons.music}
            <h1>LearnMusic</h1>
          </div>
          <p class="tagline">Master your musical journey with interactive 3D lessons</p>
        </div>
        
        <!-- Instrument Grid -->
        <div class="instrument-grid">
          ${Object.values(instruments).map((inst, i) => `
            <div class="instrument-card animate-fade-in animate-fade-in-delay-${i + 1}" data-instrument="${inst.id}">
              <div class="instrument-3d-preview" id="preview-${inst.id}"></div>
              
              <div class="instrument-card-content">
                <div>
                  <div class="instrument-title-row">
                    <span class="instrument-icon">${inst.icon}</span>
                    <h3 class="instrument-name">${inst.name}</h3>
                  </div>
                  <p class="instrument-description">${inst.description}</p>
                </div>
                
                <div class="instrument-stats">
                  <div class="stat-row">
                    ${icons.trendingUp}
                    <span>${inst.marketShare}</span>
                  </div>
                  <div class="stat-row">
                    ${icons.star}
                    <span>${inst.accessibility}</span>
                  </div>
                </div>
                
                <div class="progress-section">
                  <div class="progress-header">
                    <span class="progress-label">Progress</span>
                    <span class="progress-value">${getInstrumentProgress(inst.id)}%</span>
                  </div>
                  <div class="progress-bar">
                    <div class="progress-fill ${gradientClasses[inst.id]}" style="width: ${getInstrumentProgress(inst.id)}%"></div>
                  </div>
                </div>
              </div>
              
              <div class="instrument-card-overlay" style="background: ${inst.color}"></div>
            </div>
          `).join('')}
        </div>
        
        <!-- Footer Stats -->
        <div class="select-footer">
          <div class="footer-stats">
            <div class="footer-stat">
              <div class="footer-stat-value">8+</div>
              <div class="footer-stat-label">Lessons per instrument</div>
            </div>
            <div class="footer-divider"></div>
            <div class="footer-stat">
              <div class="footer-stat-value">4</div>
              <div class="footer-stat-label">Skill levels</div>
            </div>
            <div class="footer-divider"></div>
            <div class="footer-stat">
              <div class="footer-stat-value">3D</div>
              <div class="footer-stat-label">Interactive models</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `;
}

// ============ LESSON LIST ============
function renderLessonsPage() {
  const inst = instruments[state.currentInstrument];
  const allLessons = Object.values(lessons[state.currentInstrument]).flat();
  const completedCount = allLessons.filter(l => state.progress[l.id]).length;

  const levelConfig = {
    beginner: { emoji: '🌱', color: 'beginner' },
    intermediate: { emoji: '📈', color: 'intermediate' },
    advanced: { emoji: '⚡', color: 'advanced' },
    expert: { emoji: '🔥', color: 'expert' }
  };

  return `
    <div class="lesson-screen">
      <div class="lesson-container">
        <!-- Back Button -->
        <button class="back-button" id="back-to-select">
          ${icons.arrowLeft}
          Back to instruments
        </button>
        
        <!-- Header -->
        <div class="lesson-header animate-fade-in">
          <span class="lesson-header-icon">${inst.icon}</span>
          <div class="lesson-header-text">
            <h1>${inst.name} Lessons</h1>
            <p>${inst.description}</p>
          </div>
        </div>
        
        <!-- Progress Summary -->
        <div class="progress-summary animate-fade-in animate-fade-in-delay-1">
          ${icons.award}
          <div class="progress-summary-text">
            <div class="progress-summary-label">Lessons Completed</div>
            <div class="progress-summary-value">${completedCount} / ${allLessons.length}</div>
          </div>
          <div class="progress-summary-text" style="text-align: right;">
            <div class="progress-summary-label">Progress</div>
            <div class="progress-summary-value">${Math.round((completedCount / allLessons.length) * 100)}%</div>
          </div>
        </div>
        
        <!-- Lessons by Level -->
        ${['beginner', 'intermediate', 'advanced', 'expert'].map((level, levelIndex) => {
    const levelLessons = lessons[state.currentInstrument][level] || [];
    if (levelLessons.length === 0) return '';

    return `
            <div class="skill-section animate-fade-in animate-fade-in-delay-${Math.min(levelIndex + 2, 4)}">
              <h2>${level.charAt(0).toUpperCase() + level.slice(1)}</h2>
              <div class="lesson-list">
                ${levelLessons.map(lesson => {
      const isCompleted = state.progress[lesson.id];
      const config = levelConfig[level];

      return `
                    <div class="lesson-card" data-lesson-id="${lesson.id}">
                      <div class="lesson-card-body">
                        ${isCompleted ? icons.checkCircle : icons.circle}
                        
                        <div class="lesson-card-content">
                          <div class="lesson-level-badge">
                            <span class="lesson-level-emoji">${config.emoji}</span>
                            <span class="lesson-level-text ${config.color}">${level.charAt(0).toUpperCase() + level.slice(1)}</span>
                          </div>
                          
                          <h4 class="lesson-card-title">${lesson.title}</h4>
                          <p class="lesson-card-description">${lesson.description}</p>
                          
                          <div class="lesson-duration">
                            ${icons.clock}
                            <span>${lesson.duration} minutes</span>
                          </div>
                        </div>
                        
                        ${icons.chevronRight}
                      </div>
                    </div>
                  `;
    }).join('')}
              </div>
            </div>
          `;
  }).join('')}
      </div>
    </div>
  `;
}

// ============ LESSON DETAIL ============
function renderLessonDetail() {
  const lesson = state.currentLesson;
  const inst = instruments[state.currentInstrument];
  const isCompleted = state.progress[lesson.id];

  // Generate objectives from content
  const objectives = lesson.content.sections.map(s => s.title);
  if (lesson.content.tips) objectives.push('Apply pro tips');

  return `
    <div class="detail-screen">
      <div class="detail-container">
        <!-- Back Button -->
        <button class="back-button" id="back-to-lessons">
          ${icons.arrowLeft}
          Back to lessons
        </button>
        
        <div class="detail-grid">
          <!-- Left Column - 3D Model -->
          <div class="animate-fade-in">
            <div class="model-container" id="model-3d"></div>
            
            <!-- Timer -->
            <div class="timer-section">
              <div class="timer-header">
                ${icons.timer}
                <span>Practice Timer</span>
              </div>
              <div class="timer-display" id="timer-display">00:00</div>
              <div class="timer-controls">
                <button class="timer-btn primary" id="timer-start">▶ Start</button>
                <button class="timer-btn secondary" id="timer-reset">↺ Reset</button>
              </div>
            </div>
          </div>
          
          <!-- Right Column - Content -->
          <div class="animate-fade-in animate-fade-in-delay-1">
            <!-- Lesson Header -->
            <div class="content-card">
              <div class="content-card-header">
                <span class="content-card-header-icon">${inst.icon}</span>
                <div class="content-card-header-text">
                  <div class="content-card-title-row">
                    <h1>${lesson.title}</h1>
                    ${isCompleted ? `<svg class="completed-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/></svg>` : ''}
                  </div>
                  <p class="content-card-description">${lesson.description}</p>
                </div>
              </div>
              
              <div class="content-card-badges">
                <div class="content-badge">
                  <span>Duration: </span>
                  <span class="text-white">${lesson.duration}</span>
                </div>
                <div class="content-badge">
                  <span class="text-white" style="text-transform: capitalize;">${Object.keys(lessons[state.currentInstrument]).find(level =>
    lessons[state.currentInstrument][level]?.some(l => l.id === lesson.id)
  )}</span>
                </div>
              </div>
            </div>
            
            <!-- Learning Objectives -->
            <div class="content-card">
              <div class="objectives-header">
                ${icons.target}
                <h2>Learning Objectives</h2>
              </div>
              <ul class="objectives-list">
                ${objectives.map((obj, i) => `
                  <li class="objective-item">
                    <div class="objective-number">${i + 1}</div>
                    <span class="objective-text">${obj}</span>
                  </li>
                `).join('')}
              </ul>
            </div>
            
            <!-- Complete Button or Completed State -->
            ${isCompleted ? `
              <div class="completed-message">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/>
                  <polyline points="22 4 12 14.01 9 11.01"/>
                </svg>
                <h3>Lesson Completed!</h3>
                <p>Great work! Keep practicing.</p>
              </div>
            ` : `
              <button class="complete-btn primary" id="complete-btn">
                ${icons.check}
                <span>Mark as Complete</span>
              </button>
            `}
          </div>
        </div>
      </div>
    </div>
  `;
}

// ============ INITIALIZATION ============
function initInstrumentSelect() {
  // Initialize 3D previews
  Object.keys(instruments).forEach(id => {
    init3DPreview(id);
  });

  // Card click handlers
  document.querySelectorAll('.instrument-card').forEach(card => {
    card.addEventListener('click', () => {
      state.currentInstrument = card.dataset.instrument;
      state.currentView = 'lessons';
      renderApp();
    });
  });
}

function initLessonsPage() {
  document.getElementById('back-to-select')?.addEventListener('click', () => {
    state.currentView = 'select';
    state.currentInstrument = null;
    renderApp();
  });

  document.querySelectorAll('.lesson-card').forEach(card => {
    card.addEventListener('click', () => {
      const lessonId = card.dataset.lessonId;
      const allLessons = Object.values(lessons[state.currentInstrument]).flat();
      state.currentLesson = allLessons.find(l => l.id === lessonId);
      state.currentView = 'lesson';
      renderApp();
    });
  });
}

function initLessonPage() {
  document.getElementById('back-to-lessons')?.addEventListener('click', () => {
    state.currentView = 'lessons';
    state.currentLesson = null;
    clearInterval(state.timerInterval);
    state.timerRunning = false;
    renderApp();
  });

  document.getElementById('complete-btn')?.addEventListener('click', () => {
    state.progress[state.currentLesson.id] = true;
    saveProgress();
    renderApp();
  });

  initTimer();
  init3DModel();
}

function initTimer() {
  const display = document.getElementById('timer-display');
  const startBtn = document.getElementById('timer-start');
  const resetBtn = document.getElementById('timer-reset');

  function updateDisplay() {
    const mins = Math.floor(state.timerSeconds / 60).toString().padStart(2, '0');
    const secs = (state.timerSeconds % 60).toString().padStart(2, '0');
    if (display) display.textContent = `${mins}:${secs}`;
  }

  startBtn?.addEventListener('click', () => {
    if (state.timerRunning) {
      clearInterval(state.timerInterval);
      state.timerRunning = false;
      startBtn.textContent = '▶ Start';
    } else {
      state.timerInterval = setInterval(() => {
        state.timerSeconds++;
        updateDisplay();
      }, 1000);
      state.timerRunning = true;
      startBtn.textContent = '⏸ Pause';
    }
  });

  resetBtn?.addEventListener('click', () => {
    clearInterval(state.timerInterval);
    state.timerRunning = false;
    state.timerSeconds = 0;
    updateDisplay();
    if (startBtn) startBtn.textContent = '▶ Start';
  });
}

// ============ THREE.JS 3D ============
function init3DPreview(instrumentId) {
  const container = document.getElementById(`preview-${instrumentId}`);
  if (!container) return;

  const scene = new THREE.Scene();
  scene.background = null;

  const camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 100);
  camera.position.set(0, 1.5, 4);
  camera.lookAt(0, 0, 0);

  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.appendChild(renderer.domElement);

  const ambient = new THREE.AmbientLight(0xffffff, 0.6);
  scene.add(ambient);
  const directional = new THREE.DirectionalLight(0xffffff, 0.8);
  directional.position.set(2, 2, 2);
  scene.add(directional);

  const group = new THREE.Group();
  scene.add(group);

  createInstrument3D(group, instrumentId);

  function animate() {
    requestAnimationFrame(animate);
    group.rotation.y += 0.008;
    renderer.render(scene, camera);
  }
  animate();
}

function init3DModel() {
  const container = document.getElementById('model-3d');
  if (!container) return;

  const scene = new THREE.Scene();
  scene.background = new THREE.Color(0x0d1117);

  const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 100);
  camera.position.set(0, 2, 6);
  camera.lookAt(0, 0, 0);

  const renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.appendChild(renderer.domElement);

  const ambient = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambient);
  const directional = new THREE.DirectionalLight(0xffffff, 0.8);
  directional.position.set(5, 5, 5);
  scene.add(directional);
  const point = new THREE.PointLight(0x06b6d4, 0.5);
  point.position.set(-3, 3, 3);
  scene.add(point);

  const group = new THREE.Group();
  scene.add(group);

  createInstrument3D(group, state.currentInstrument, true);
  group.rotation.x = -0.2;

  function animate() {
    requestAnimationFrame(animate);
    group.rotation.y = Math.sin(Date.now() * 0.0003) * 0.15;
    renderer.render(scene, camera);
  }
  animate();

  window.addEventListener('resize', () => {
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  });
}

function createInstrument3D(group, instrumentId, detailed = false) {
  if (instrumentId === 'piano') createPiano3D(group, detailed);
  else if (instrumentId === 'guitar') createGuitar3D(group, detailed);
  else if (instrumentId === 'violin') createViolin3D(group, detailed);
  else if (instrumentId === 'drums') createDrums3D(group, detailed);
}

function createPiano3D(group, detailed = false) {
  const whiteKeyGeo = new THREE.BoxGeometry(0.22, 1.2, 0.18);
  const blackKeyGeo = new THREE.BoxGeometry(0.14, 0.8, 0.12);
  const whiteMat = new THREE.MeshStandardMaterial({ color: 0xfafafa, roughness: 0.3 });
  const blackMat = new THREE.MeshStandardMaterial({ color: 0x1a1a1a, roughness: 0.4 });

  const keyCount = detailed ? 14 : 7;

  for (let i = 0; i < keyCount; i++) {
    const white = new THREE.Mesh(whiteKeyGeo, whiteMat);
    white.position.x = (i - keyCount / 2) * 0.24;
    group.add(white);
  }

  const blackKeyPattern = [1, 1, 0, 1, 1, 1, 0];
  for (let i = 0; i < keyCount - 1; i++) {
    if (blackKeyPattern[i % 7]) {
      const black = new THREE.Mesh(blackKeyGeo, blackMat);
      black.position.set((i - keyCount / 2) * 0.24 + 0.12, 0.25, -0.03);
      group.add(black);
    }
  }

  group.rotation.x = -0.4;
  group.position.y = -0.3;
}

function createGuitar3D(group, detailed = false) {
  const fretboardGeo = new THREE.BoxGeometry(detailed ? 5 : 3, 0.15, detailed ? 1 : 0.6);
  const fretboardMat = new THREE.MeshStandardMaterial({ color: 0x3d2817, roughness: 0.8 });
  group.add(new THREE.Mesh(fretboardGeo, fretboardMat));

  const stringMat = new THREE.MeshStandardMaterial({ color: 0xd4af37, metalness: 0.8 });
  for (let i = 0; i < 6; i++) {
    const stringGeo = new THREE.CylinderGeometry(0.008, 0.008, detailed ? 5.2 : 3.2, 8);
    const string = new THREE.Mesh(stringGeo, stringMat);
    string.rotation.z = Math.PI / 2;
    string.position.set(0, 0.1, (i - 2.5) * (detailed ? 0.15 : 0.08));
    group.add(string);
  }

  if (detailed) {
    const fretMat = new THREE.MeshStandardMaterial({ color: 0xc0c0c0, metalness: 0.9 });
    for (let i = 0; i <= 12; i++) {
      const fretGeo = new THREE.BoxGeometry(0.03, 0.05, 1.1);
      const fret = new THREE.Mesh(fretGeo, fretMat);
      fret.position.set(-2.5 + i * 0.4, 0.1, 0);
      group.add(fret);
    }
  }

  group.rotation.x = -0.3;
}

function createViolin3D(group, detailed = false) {
  const bodyMat = new THREE.MeshStandardMaterial({ color: 0xB8860B, roughness: 0.6 });
  const neckMat = new THREE.MeshStandardMaterial({ color: 0x2d1810, roughness: 0.7 });

  const bodyGeo = new THREE.SphereGeometry(0.8, 32, 32);
  bodyGeo.scale(0.6, 1, 0.12);
  group.add(new THREE.Mesh(bodyGeo, bodyMat));

  const neckGeo = new THREE.BoxGeometry(0.12, 1.2, 0.06);
  const neck = new THREE.Mesh(neckGeo, neckMat);
  neck.position.y = 1;
  group.add(neck);

  const scrollGeo = new THREE.SphereGeometry(0.12, 16, 16);
  const scroll = new THREE.Mesh(scrollGeo, neckMat);
  scroll.position.y = 1.7;
  group.add(scroll);

  if (detailed) {
    const stringMat = new THREE.MeshStandardMaterial({ color: 0xc0c0c0, metalness: 0.8 });
    for (let i = 0; i < 4; i++) {
      const stringGeo = new THREE.CylinderGeometry(0.005, 0.005, 2, 8);
      const string = new THREE.Mesh(stringGeo, stringMat);
      string.position.set((i - 1.5) * 0.06, 0.5, 0.07);
      group.add(string);
    }
  }

  group.rotation.z = 0.1;
}

function createDrums3D(group, detailed = false) {
  const snareMat = new THREE.MeshStandardMaterial({ color: 0xc0c0c0, metalness: 0.7 });
  const snareGeo = new THREE.CylinderGeometry(0.5, 0.5, 0.25, 32);
  const snare = new THREE.Mesh(snareGeo, snareMat);
  snare.position.set(0, 0, 0.5);
  group.add(snare);

  const kickMat = new THREE.MeshStandardMaterial({ color: 0x2a2a2a, roughness: 0.8 });
  const kickGeo = new THREE.CylinderGeometry(0.8, 0.8, 0.5, 32);
  const kick = new THREE.Mesh(kickGeo, kickMat);
  kick.rotation.x = Math.PI / 2;
  kick.position.set(0, -0.5, 1.2);
  group.add(kick);

  const hihatMat = new THREE.MeshStandardMaterial({ color: 0xd4af37, metalness: 0.9 });
  const hihatGeo = new THREE.CylinderGeometry(0.4, 0.4, 0.02, 32);
  const hihat1 = new THREE.Mesh(hihatGeo, hihatMat);
  hihat1.position.set(-1, 0.3, 0);
  group.add(hihat1);
  const hihat2 = hihat1.clone();
  hihat2.position.y += 0.06;
  group.add(hihat2);

  if (detailed) {
    const tomMat = new THREE.MeshStandardMaterial({ color: 0x4a4a4a, roughness: 0.7 });
    const tom1Geo = new THREE.CylinderGeometry(0.3, 0.3, 0.25, 32);
    const tom1 = new THREE.Mesh(tom1Geo, tomMat);
    tom1.position.set(-0.5, 0.6, 0.8);
    tom1.rotation.x = -0.3;
    group.add(tom1);

    const tom2 = tom1.clone();
    tom2.position.x = 0.5;
    group.add(tom2);

    const crashGeo = new THREE.CylinderGeometry(0.5, 0.5, 0.02, 32);
    const crash = new THREE.Mesh(crashGeo, hihatMat);
    crash.position.set(1, 0.8, 0);
    crash.rotation.z = 0.2;
    group.add(crash);
  }

  group.rotation.x = -0.15;
  group.position.y = 0.3;
}

// Start app
renderApp();

// PWA
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => { });
  });
}
