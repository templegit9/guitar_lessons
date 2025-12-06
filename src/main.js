import './style.css';
import * as THREE from 'three';
import { lessons, instruments, levelMeta, chordData } from './data/lessons.js';

// State management
const state = {
  currentView: 'select', // 'select', 'lessons', 'lesson'
  currentInstrument: null,
  currentLevel: 'beginner',
  currentLesson: null,
  progress: JSON.parse(localStorage.getItem('musicProgress') || '{}'),
  timerInterval: null,
  timerSeconds: 0,
  timerRunning: false
};

// Save progress
function saveProgress() {
  localStorage.setItem('musicProgress', JSON.stringify(state.progress));
}

// Get progress stats
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

// Instrument Selection Screen
function renderInstrumentSelect() {
  return `
    <div class="bg-gradient"></div>
    
    <div class="select-container">
      <header class="select-header">
        <div class="brand">
          <span class="brand-icon">🎵</span>
          <h1>LearnMusicalInstruments</h1>
        </div>
        <p class="tagline">Master any instrument with interactive 3D lessons</p>
      </header>
      
      <section class="instrument-grid">
        ${Object.values(instruments).map(inst => `
          <button class="instrument-card" data-instrument="${inst.id}" style="--card-color: ${inst.color}; --card-gradient: ${inst.gradient}">
            <div class="instrument-3d" id="inst-3d-${inst.id}"></div>
            <div class="instrument-info">
              <span class="instrument-icon">${inst.icon}</span>
              <h2>${inst.name}</h2>
              <p>${inst.description}</p>
              <div class="instrument-meta">
                <span class="meta-badge">${inst.marketShare} market</span>
                <span class="meta-badge">${inst.accessibility} access</span>
              </div>
              ${getTotalCompleted(inst.id) > 0 ? `
                <div class="instrument-progress">
                  <div class="progress-text">${getTotalCompleted(inst.id)} lessons completed</div>
                </div>
              ` : ''}
            </div>
          </button>
        `).join('')}
      </section>
      
      <footer class="select-footer">
        <p>🆓 Free lessons available • Premium unlocks full curriculum</p>
      </footer>
    </div>
  `;
}

// Lessons Page (for selected instrument)
function renderLessonsPage() {
  const inst = instruments[state.currentInstrument];
  const totalLessons = Object.values(lessons[state.currentInstrument]).flat().length;
  const completed = getTotalCompleted(state.currentInstrument);

  return `
    <div class="bg-gradient"></div>
    
    <header class="header">
      <div class="header-content">
        <button class="back-button" id="back-to-select">
          ← Choose Instrument
        </button>
        <div class="logo" style="--accent: ${inst.color}">
          <span class="logo-icon">${inst.icon}</span>
          <span>${inst.name}</span>
        </div>
        <div class="progress-badge">
          ✓ ${completed}/${totalLessons}
        </div>
      </div>
    </header>
    
    <main class="main-content">
      <div class="instrument-hero" style="--inst-gradient: ${inst.gradient}">
        <div class="hero-3d" id="hero-3d"></div>
        <div class="hero-text">
          <h1>Learn ${inst.name}</h1>
          <p>${inst.description}</p>
        </div>
      </div>
      
      <nav class="level-tabs">
        ${Object.entries(levelMeta).map(([key, meta]) => {
    const hasLessons = lessons[state.currentInstrument][key]?.length > 0;
    return hasLessons ? `
            <button class="level-tab ${state.currentLevel === key ? 'active' : ''}" data-level="${key}">
              <span class="level-dot" style="background: ${meta.color}"></span>
              ${meta.icon} ${meta.label}
            </button>
          ` : '';
  }).join('')}
      </nav>
      
      <section class="level-info">
        <div class="level-header">
          <h2>${levelMeta[state.currentLevel].icon} ${levelMeta[state.currentLevel].label}</h2>
          <span class="level-progress">${getLevelProgress(state.currentInstrument, state.currentLevel).percentage}% complete</span>
        </div>
      </section>
      
      <div class="lessons-grid">
        ${(lessons[state.currentInstrument][state.currentLevel] || []).map(lesson => renderLessonCard(lesson)).join('')}
      </div>
    </main>
  `;
}

function renderLessonCard(lesson) {
  const isCompleted = state.progress[lesson.id];
  const inst = instruments[state.currentInstrument];

  return `
    <article class="lesson-card ${isCompleted ? 'completed' : ''}" data-lesson-id="${lesson.id}">
      <div class="lesson-thumbnail" style="--inst-color: ${inst.color}">
        <div class="lesson-number-badge">Lesson ${lesson.number}</div>
      </div>
      <div class="lesson-content">
        <div class="lesson-meta">
          <span class="lesson-duration">⏱️ ${lesson.duration}</span>
          ${isCompleted ? '<span class="completed-badge">✓ Done</span>' : ''}
        </div>
        <h3 class="lesson-title">${lesson.title}</h3>
        <p class="lesson-description">${lesson.description}</p>
      </div>
    </article>
  `;
}

// Lesson Detail Page
function renderLessonDetail() {
  const lesson = state.currentLesson;
  const inst = instruments[state.currentInstrument];
  const isCompleted = state.progress[lesson.id];

  return `
    <div class="bg-gradient"></div>
    
    <header class="header">
      <div class="header-content">
        <button class="back-button" id="back-to-lessons">
          ← Back to Lessons
        </button>
        <div class="progress-badge" style="color: ${inst.color}">
          ${inst.icon} ${inst.name}
        </div>
      </div>
    </header>
    
    <main class="main-content">
      <div class="lesson-header">
        <h1>${lesson.title}</h1>
        <p>${lesson.description}</p>
      </div>
      
      <div class="visualization-container" id="viz-3d">
        ${state.currentInstrument === 'guitar' && lesson.chords?.length > 0 ? `
          <div class="viz-controls">
            ${lesson.chords.map((chord, i) => `
              <button class="${i === 0 ? 'active' : ''}" data-chord="${chord}">${chord}</button>
            `).join('')}
          </div>
        ` : ''}
        ${state.currentInstrument === 'piano' && lesson.keys?.length > 0 ? `
          <div class="viz-controls">
            ${lesson.keys.map((key, i) => `
              <button class="${i === 0 ? 'active' : ''}" data-key="${key}">${key}</button>
            `).join('')}
          </div>
        ` : ''}
      </div>
      
      <section class="practice-section">
        <h2>⏱️ Practice Timer</h2>
        <div class="timer-display" id="timer-display">00:00</div>
        <div class="timer-controls">
          <button class="timer-btn primary" id="timer-start">▶ Start</button>
          <button class="timer-btn secondary" id="timer-reset">↺ Reset</button>
        </div>
      </section>
      
      <section class="content-section">
        <h2>📖 Introduction</h2>
        <p>${lesson.content.intro}</p>
      </section>
      
      ${lesson.content.sections.map(section => `
        <section class="content-section">
          <h2>📝 ${section.title}</h2>
          <p>${section.text}</p>
        </section>
      `).join('')}
      
      ${lesson.content.tips ? `
        <section class="content-section tips-section">
          <h2>💡 Pro Tips</h2>
          <ul>
            ${lesson.content.tips.map(tip => `<li>${tip}</li>`).join('')}
          </ul>
        </section>
      ` : ''}
      
      <button class="complete-btn ${isCompleted ? 'completed' : ''}" id="complete-btn">
        ${isCompleted ? '✓ Completed!' : '✓ Mark as Complete'}
      </button>
    </main>
  `;
}

// Initialize Instrument Selection
function initInstrumentSelect() {
  // Initialize mini 3D previews
  Object.keys(instruments).forEach(id => {
    init3DPreview(id);
  });

  // Card click handlers
  document.querySelectorAll('.instrument-card').forEach(card => {
    card.addEventListener('click', () => {
      state.currentInstrument = card.dataset.instrument;
      state.currentView = 'lessons';
      state.currentLevel = 'beginner';
      renderApp();
    });
  });
}

// Initialize Lessons Page
function initLessonsPage() {
  // Back button
  document.getElementById('back-to-select')?.addEventListener('click', () => {
    state.currentView = 'select';
    state.currentInstrument = null;
    renderApp();
  });

  // Level tabs
  document.querySelectorAll('.level-tab').forEach(tab => {
    tab.addEventListener('click', () => {
      state.currentLevel = tab.dataset.level;
      renderApp();
    });
  });

  // Lesson cards
  document.querySelectorAll('.lesson-card').forEach(card => {
    card.addEventListener('click', () => {
      const lessonId = card.dataset.lessonId;
      const allLessons = Object.values(lessons[state.currentInstrument]).flat();
      state.currentLesson = allLessons.find(l => l.id === lessonId);
      state.currentView = 'lesson';
      renderApp();
    });
  });

  // Initialize hero 3D
  initHero3D();
}

// Initialize Lesson Page
function initLessonPage() {
  // Back button
  document.getElementById('back-to-lessons')?.addEventListener('click', () => {
    state.currentView = 'lessons';
    state.currentLesson = null;
    clearInterval(state.timerInterval);
    state.timerRunning = false;
    renderApp();
  });

  // Complete button
  document.getElementById('complete-btn')?.addEventListener('click', () => {
    state.progress[state.currentLesson.id] = true;
    saveProgress();
    renderApp();
  });

  // Timer
  initTimer();

  // Initialize 3D visualization
  initVisualization3D();
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

// ============ THREE.JS 3D VISUALIZATIONS ============

// Mini 3D preview on instrument cards
function init3DPreview(instrumentId) {
  const container = document.getElementById(`inst-3d-${instrumentId}`);
  if (!container) return;

  const scene = new THREE.Scene();
  scene.background = null;

  const camera = new THREE.PerspectiveCamera(50, container.clientWidth / container.clientHeight, 0.1, 100);
  camera.position.set(0, 1, 3);
  camera.lookAt(0, 0, 0);

  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.appendChild(renderer.domElement);

  // Lighting
  const ambient = new THREE.AmbientLight(0xffffff, 0.6);
  scene.add(ambient);
  const directional = new THREE.DirectionalLight(0xffffff, 0.8);
  directional.position.set(2, 2, 2);
  scene.add(directional);

  const group = new THREE.Group();
  scene.add(group);

  // Create instrument-specific shapes
  const color = new THREE.Color(instruments[instrumentId].color);

  if (instrumentId === 'piano') {
    // Piano keys representation
    const whiteKeyGeo = new THREE.BoxGeometry(0.15, 0.8, 0.1);
    const blackKeyGeo = new THREE.BoxGeometry(0.1, 0.5, 0.08);
    const whiteMat = new THREE.MeshStandardMaterial({ color: 0xffffff });
    const blackMat = new THREE.MeshStandardMaterial({ color: 0x1a1a1a });

    for (let i = 0; i < 7; i++) {
      const white = new THREE.Mesh(whiteKeyGeo, whiteMat);
      white.position.x = (i - 3) * 0.16;
      group.add(white);
    }
    for (let i = 0; i < 5; i++) {
      if (i === 2) continue; // Skip E-F gap
      const black = new THREE.Mesh(blackKeyGeo, blackMat);
      black.position.set((i < 2 ? i : i + 1 - 3) * 0.16 + 0.08, 0.2, -0.02);
      group.add(black);
    }
    group.rotation.x = -0.3;
  } else if (instrumentId === 'guitar') {
    // Guitar body and neck
    const bodyGeo = new THREE.SphereGeometry(0.7, 32, 32);
    bodyGeo.scale(1, 0.6, 0.15);
    const bodyMat = new THREE.MeshStandardMaterial({ color: 0x8B4513 });
    const body = new THREE.Mesh(bodyGeo, bodyMat);
    group.add(body);

    const neckGeo = new THREE.BoxGeometry(0.18, 1.2, 0.08);
    const neck = new THREE.Mesh(neckGeo, new THREE.MeshStandardMaterial({ color: 0x3d2817 }));
    neck.position.y = 0.9;
    group.add(neck);

    const holeGeo = new THREE.RingGeometry(0.15, 0.25, 32);
    const hole = new THREE.Mesh(holeGeo, new THREE.MeshStandardMaterial({ color: 0x1a1a1a, side: THREE.DoubleSide }));
    hole.position.z = 0.08;
    group.add(hole);

    group.rotation.z = 0.2;
    group.position.y = -0.3;
  } else if (instrumentId === 'violin') {
    // Violin shape
    const bodyGeo = new THREE.SphereGeometry(0.5, 32, 32);
    bodyGeo.scale(0.6, 1, 0.12);
    const bodyMat = new THREE.MeshStandardMaterial({ color: 0xB8860B });
    const body = new THREE.Mesh(bodyGeo, bodyMat);
    group.add(body);

    const neckGeo = new THREE.BoxGeometry(0.08, 0.8, 0.05);
    const neck = new THREE.Mesh(neckGeo, new THREE.MeshStandardMaterial({ color: 0x2d1810 }));
    neck.position.y = 0.7;
    group.add(neck);

    const scrollGeo = new THREE.SphereGeometry(0.08, 16, 16);
    const scroll = new THREE.Mesh(scrollGeo, new THREE.MeshStandardMaterial({ color: 0x2d1810 }));
    scroll.position.y = 1.15;
    group.add(scroll);

    group.rotation.z = 0.3;
    group.position.y = -0.2;
  } else if (instrumentId === 'drums') {
    // Drum kit simplified
    const snareMat = new THREE.MeshStandardMaterial({ color: 0xc0c0c0 });
    const snareGeo = new THREE.CylinderGeometry(0.35, 0.35, 0.2, 32);
    const snare = new THREE.Mesh(snareGeo, snareMat);
    snare.position.set(0, -0.2, 0);
    group.add(snare);

    const kickMat = new THREE.MeshStandardMaterial({ color: 0x2a2a2a });
    const kickGeo = new THREE.CylinderGeometry(0.5, 0.5, 0.35, 32);
    const kick = new THREE.Mesh(kickGeo, kickMat);
    kick.rotation.x = Math.PI / 2;
    kick.position.set(0, -0.5, 0.3);
    group.add(kick);

    const hihatMat = new THREE.MeshStandardMaterial({ color: 0xd4af37 });
    const hihatGeo = new THREE.CylinderGeometry(0.25, 0.25, 0.02, 32);
    const hihat = new THREE.Mesh(hihatGeo, hihatMat);
    hihat.position.set(-0.5, 0.1, 0);
    group.add(hihat);
    const hihat2 = hihat.clone();
    hihat2.position.y = 0.15;
    group.add(hihat2);

    group.rotation.x = -0.2;
    group.position.y = 0.1;
  }

  function animate() {
    requestAnimationFrame(animate);
    group.rotation.y += 0.01;
    renderer.render(scene, camera);
  }
  animate();
}

// Hero 3D on lessons page
function initHero3D() {
  const container = document.getElementById('hero-3d');
  if (!container || !state.currentInstrument) return;

  // Reuse the same logic but larger
  const scene = new THREE.Scene();
  scene.background = null;

  const camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 100);
  camera.position.set(0, 1, 5);
  camera.lookAt(0, 0, 0);

  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.appendChild(renderer.domElement);

  const ambient = new THREE.AmbientLight(0xffffff, 0.6);
  scene.add(ambient);
  const directional = new THREE.DirectionalLight(0xffffff, 0.8);
  directional.position.set(3, 3, 3);
  scene.add(directional);
  const point = new THREE.PointLight(new THREE.Color(instruments[state.currentInstrument].color), 0.5);
  point.position.set(-2, 2, 2);
  scene.add(point);

  const group = new THREE.Group();
  scene.add(group);

  // Create full instrument visualization based on type
  createInstrument3D(group, state.currentInstrument);

  function animate() {
    requestAnimationFrame(animate);
    group.rotation.y = Math.sin(Date.now() * 0.0005) * 0.3;
    renderer.render(scene, camera);
  }
  animate();
}

// Main visualization for lesson detail
let vizScene, vizCamera, vizRenderer, vizGroup;
let highlightedElements = [];

function initVisualization3D() {
  const container = document.getElementById('viz-3d');
  if (!container) return;

  vizScene = new THREE.Scene();
  vizScene.background = new THREE.Color(0x1a1a2e);

  vizCamera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 100);
  vizCamera.position.set(0, 2, 6);
  vizCamera.lookAt(0, 0, 0);

  vizRenderer = new THREE.WebGLRenderer({ antialias: true });
  vizRenderer.setSize(container.clientWidth, container.clientHeight);
  vizRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.insertBefore(vizRenderer.domElement, container.firstChild);

  const ambient = new THREE.AmbientLight(0xffffff, 0.5);
  vizScene.add(ambient);
  const directional = new THREE.DirectionalLight(0xffffff, 0.8);
  directional.position.set(5, 5, 5);
  vizScene.add(directional);
  const point = new THREE.PointLight(0x6366f1, 0.5);
  point.position.set(-3, 3, 3);
  vizScene.add(point);

  vizGroup = new THREE.Group();
  vizScene.add(vizGroup);

  // Create full instrument based on type
  createInstrument3D(vizGroup, state.currentInstrument, true);

  // Handle controls for guitar chords
  if (state.currentInstrument === 'guitar' && state.currentLesson?.chords?.length) {
    document.querySelectorAll('.viz-controls button').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.viz-controls button').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        highlightGuitarChord(btn.dataset.chord);
      });
    });
    highlightGuitarChord(state.currentLesson.chords[0]);
  }

  // Handle piano keys
  if (state.currentInstrument === 'piano' && state.currentLesson?.keys?.length) {
    document.querySelectorAll('.viz-controls button').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.viz-controls button').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        highlightPianoKey(btn.dataset.key);
      });
    });
    highlightPianoKey(state.currentLesson.keys[0]);
  }

  vizGroup.rotation.x = -0.2;

  function animate() {
    requestAnimationFrame(animate);
    vizGroup.rotation.y = Math.sin(Date.now() * 0.0003) * 0.1;
    vizRenderer.render(vizScene, vizCamera);
  }
  animate();

  window.addEventListener('resize', () => {
    vizCamera.aspect = container.clientWidth / container.clientHeight;
    vizCamera.updateProjectionMatrix();
    vizRenderer.setSize(container.clientWidth, container.clientHeight);
  });
}

function createInstrument3D(group, instrumentId, detailed = false) {
  if (instrumentId === 'piano') {
    createPiano3D(group, detailed);
  } else if (instrumentId === 'guitar') {
    createGuitar3D(group, detailed);
  } else if (instrumentId === 'violin') {
    createViolin3D(group, detailed);
  } else if (instrumentId === 'drums') {
    createDrums3D(group, detailed);
  }
}

function createPiano3D(group, detailed = false) {
  const whiteKeyGeo = detailed ? new THREE.BoxGeometry(0.22, 1.2, 0.18) : new THREE.BoxGeometry(0.15, 0.8, 0.1);
  const blackKeyGeo = detailed ? new THREE.BoxGeometry(0.14, 0.8, 0.12) : new THREE.BoxGeometry(0.1, 0.5, 0.08);

  const whiteMat = new THREE.MeshStandardMaterial({ color: 0xfafafa, roughness: 0.3 });
  const blackMat = new THREE.MeshStandardMaterial({ color: 0x1a1a1a, roughness: 0.4 });

  const keyCount = detailed ? 14 : 7;
  const spacing = detailed ? 0.24 : 0.16;

  // White keys
  group.userData.whiteKeys = [];
  for (let i = 0; i < keyCount; i++) {
    const white = new THREE.Mesh(whiteKeyGeo.clone(), whiteMat.clone());
    white.position.x = (i - keyCount / 2) * spacing;
    white.userData.note = ['C', 'D', 'E', 'F', 'G', 'A', 'B'][i % 7];
    white.userData.octave = Math.floor(i / 7);
    group.add(white);
    group.userData.whiteKeys.push(white);
  }

  // Black keys
  group.userData.blackKeys = [];
  const blackKeyPattern = [1, 1, 0, 1, 1, 1, 0]; // 1 = has black key after
  for (let i = 0; i < keyCount - 1; i++) {
    if (blackKeyPattern[i % 7]) {
      const black = new THREE.Mesh(blackKeyGeo.clone(), blackMat.clone());
      black.position.set((i - keyCount / 2) * spacing + spacing / 2, 0.25, -0.03);
      black.userData.note = ['C#', 'D#', null, 'F#', 'G#', 'A#', null][i % 7];
      group.add(black);
      group.userData.blackKeys.push(black);
    }
  }

  if (detailed) {
    group.rotation.x = -0.4;
    group.position.y = -0.5;
  }
}

function createGuitar3D(group, detailed = false) {
  // Fretboard
  const fretboardGeo = new THREE.BoxGeometry(detailed ? 5 : 3, 0.15, detailed ? 1 : 0.6);
  const fretboardMat = new THREE.MeshStandardMaterial({ color: 0x3d2817, roughness: 0.8 });
  const fretboard = new THREE.Mesh(fretboardGeo, fretboardMat);
  group.add(fretboard);

  // Strings
  const stringMat = new THREE.MeshStandardMaterial({ color: 0xd4af37, roughness: 0.3, metalness: 0.8 });
  group.userData.strings = [];
  const stringCount = 6;
  const stringSpacing = detailed ? 0.15 : 0.08;

  for (let i = 0; i < stringCount; i++) {
    const stringGeo = new THREE.CylinderGeometry(0.008, 0.008, detailed ? 5.2 : 3.2, 8);
    const string = new THREE.Mesh(stringGeo, stringMat);
    string.rotation.z = Math.PI / 2;
    string.position.set(0, 0.1, (i - 2.5) * stringSpacing);
    group.add(string);
    group.userData.strings.push(string);
  }

  // Frets
  if (detailed) {
    const fretMat = new THREE.MeshStandardMaterial({ color: 0xc0c0c0, metalness: 0.9 });
    group.userData.frets = [];
    for (let i = 0; i <= 12; i++) {
      const fretGeo = new THREE.BoxGeometry(0.03, 0.05, 1.1);
      const fret = new THREE.Mesh(fretGeo, fretMat);
      fret.position.set(-2.5 + i * 0.4, 0.1, 0);
      group.add(fret);
      group.userData.frets.push(fret);
    }

    // Finger dots placeholder
    group.userData.fingerDots = [];
  }

  group.rotation.x = -0.3;
}

function createViolin3D(group, detailed = false) {
  const bodyMat = new THREE.MeshStandardMaterial({ color: 0xB8860B, roughness: 0.6 });
  const neckMat = new THREE.MeshStandardMaterial({ color: 0x2d1810, roughness: 0.7 });

  // Body
  const bodyGeo = new THREE.SphereGeometry(detailed ? 0.8 : 0.5, 32, 32);
  bodyGeo.scale(0.6, 1, 0.12);
  const body = new THREE.Mesh(bodyGeo, bodyMat);
  group.add(body);

  // Neck
  const neckGeo = new THREE.BoxGeometry(detailed ? 0.12 : 0.08, detailed ? 1.2 : 0.8, 0.06);
  const neck = new THREE.Mesh(neckGeo, neckMat);
  neck.position.y = detailed ? 1 : 0.7;
  group.add(neck);

  // Scroll
  const scrollGeo = new THREE.SphereGeometry(detailed ? 0.12 : 0.08, 16, 16);
  const scroll = new THREE.Mesh(scrollGeo, neckMat);
  scroll.position.y = detailed ? 1.7 : 1.15;
  group.add(scroll);

  // Strings
  if (detailed) {
    const stringMat = new THREE.MeshStandardMaterial({ color: 0xc0c0c0, metalness: 0.8 });
    for (let i = 0; i < 4; i++) {
      const stringGeo = new THREE.CylinderGeometry(0.005, 0.005, 2, 8);
      const string = new THREE.Mesh(stringGeo, stringMat);
      string.position.set((i - 1.5) * 0.06, 0.5, 0.07);
      group.add(string);
    }

    // Bridge
    const bridgeGeo = new THREE.BoxGeometry(0.3, 0.08, 0.02);
    const bridge = new THREE.Mesh(bridgeGeo, neckMat);
    bridge.position.set(0, -0.1, 0.07);
    group.add(bridge);
  }

  // F-holes
  const fholeGeo = new THREE.TorusGeometry(0.1, 0.02, 8, 16, Math.PI);
  const fhole1 = new THREE.Mesh(fholeGeo, new THREE.MeshStandardMaterial({ color: 0x1a1a1a }));
  fhole1.position.set(-0.15, 0, 0.07);
  fhole1.rotation.z = Math.PI / 4;
  group.add(fhole1);

  const fhole2 = fhole1.clone();
  fhole2.position.x = 0.15;
  fhole2.rotation.z = -Math.PI / 4;
  group.add(fhole2);

  group.rotation.z = detailed ? 0.1 : 0.3;
  group.position.y = detailed ? 0 : -0.2;
}

function createDrums3D(group, detailed = false) {
  // Snare
  const snareMat = new THREE.MeshStandardMaterial({ color: 0xc0c0c0, metalness: 0.7 });
  const snareGeo = new THREE.CylinderGeometry(detailed ? 0.5 : 0.35, detailed ? 0.5 : 0.35, detailed ? 0.25 : 0.2, 32);
  const snare = new THREE.Mesh(snareGeo, snareMat);
  snare.position.set(0, 0, detailed ? 0.5 : 0);
  group.add(snare);
  group.userData.snare = snare;

  // Kick
  const kickMat = new THREE.MeshStandardMaterial({ color: 0x2a2a2a, roughness: 0.8 });
  const kickGeo = new THREE.CylinderGeometry(detailed ? 0.8 : 0.5, detailed ? 0.8 : 0.5, detailed ? 0.5 : 0.35, 32);
  const kick = new THREE.Mesh(kickGeo, kickMat);
  kick.rotation.x = Math.PI / 2;
  kick.position.set(0, detailed ? -0.5 : -0.5, detailed ? 1.2 : 0.3);
  group.add(kick);
  group.userData.kick = kick;

  // Hi-hat
  const hihatMat = new THREE.MeshStandardMaterial({ color: 0xd4af37, metalness: 0.9, roughness: 0.2 });
  const hihatGeo = new THREE.CylinderGeometry(detailed ? 0.4 : 0.25, detailed ? 0.4 : 0.25, 0.02, 32);
  const hihat1 = new THREE.Mesh(hihatGeo, hihatMat);
  hihat1.position.set(detailed ? -1 : -0.5, detailed ? 0.3 : 0.1, 0);
  group.add(hihat1);
  const hihat2 = hihat1.clone();
  hihat2.position.y += 0.06;
  group.add(hihat2);
  group.userData.hihat = [hihat1, hihat2];

  // Toms
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

    group.userData.toms = [tom1, tom2];

    // Floor tom
    const floorTomGeo = new THREE.CylinderGeometry(0.4, 0.4, 0.35, 32);
    const floorTom = new THREE.Mesh(floorTomGeo, tomMat);
    floorTom.position.set(1.2, -0.3, 0.5);
    group.add(floorTom);
    group.userData.floorTom = floorTom;

    // Crash cymbal
    const crashGeo = new THREE.CylinderGeometry(0.5, 0.5, 0.02, 32);
    const crash = new THREE.Mesh(crashGeo, hihatMat);
    crash.position.set(1, 0.8, 0);
    crash.rotation.z = 0.2;
    group.add(crash);

    // Ride cymbal
    const ride = crash.clone();
    ride.position.set(-1.2, 0.7, 0.3);
    ride.rotation.z = -0.2;
    group.add(ride);
  }

  group.rotation.x = -0.15;
  group.position.y = detailed ? 0.3 : 0.1;
}

// Highlight functions for interactive elements
function highlightGuitarChord(chordName) {
  if (!vizGroup?.userData.fingerDots || !chordData[chordName]) return;

  // Remove old dots
  highlightedElements.forEach(el => vizGroup.remove(el));
  highlightedElements = [];

  const chord = chordData[chordName];
  const stringPositions = [-0.375, -0.225, -0.075, 0.075, 0.225, 0.375];

  const fingerMat = new THREE.MeshStandardMaterial({
    color: 0x6366f1,
    emissive: 0x3333aa,
    emissiveIntensity: 0.5
  });

  chord.frets.forEach((fret, i) => {
    if (fret > 0) {
      const fingerGeo = new THREE.SphereGeometry(0.06, 16, 16);
      const finger = new THREE.Mesh(fingerGeo, fingerMat);
      finger.position.set(-2.5 + (fret - 0.5) * 0.4, 0.18, stringPositions[i]);
      vizGroup.add(finger);
      highlightedElements.push(finger);
    }
  });
}

function highlightPianoKey(keyName) {
  if (!vizGroup?.userData.whiteKeys) return;

  // Reset all keys
  vizGroup.userData.whiteKeys.forEach(key => {
    key.material.color.setHex(0xfafafa);
    key.material.emissive?.setHex(0x000000);
  });
  vizGroup.userData.blackKeys?.forEach(key => {
    key.material.color.setHex(0x1a1a1a);
  });

  // Highlight matching key
  vizGroup.userData.whiteKeys.forEach(key => {
    if (key.userData.note === keyName) {
      key.material.color.setHex(0x6366f1);
      key.material.emissive = new THREE.Color(0x3333aa);
      key.material.emissiveIntensity = 0.3;
    }
  });
  vizGroup.userData.blackKeys?.forEach(key => {
    if (key.userData.note === keyName) {
      key.material.color.setHex(0x6366f1);
    }
  });
}

// Start app
renderApp();

// PWA registration
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => { });
  });
}
