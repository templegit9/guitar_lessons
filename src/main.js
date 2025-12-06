import './style.css';
import * as THREE from 'three';
import { lessons, chordData, levelMeta } from './data/lessons.js';

// State management
const state = {
  currentLevel: 'beginner',
  currentLesson: null,
  progress: JSON.parse(localStorage.getItem('guitarProgress') || '{}'),
  timerInterval: null,
  timerSeconds: 0,
  timerRunning: false
};

// Save progress to localStorage
function saveProgress() {
  localStorage.setItem('guitarProgress', JSON.stringify(state.progress));
}

// Get total completed lessons
function getTotalCompleted() {
  return Object.values(state.progress).filter(Boolean).length;
}

// Get level progress
function getLevelProgress(level) {
  const levelLessons = lessons[level];
  const completed = levelLessons.filter(l => state.progress[l.id]).length;
  return { completed, total: levelLessons.length, percentage: Math.round((completed / levelLessons.length) * 100) };
}

// Render the entire app
function renderApp() {
  const app = document.querySelector('#app');

  if (state.currentLesson) {
    app.innerHTML = renderLessonDetail();
    initLessonPage();
  } else {
    app.innerHTML = renderHomePage();
    initHomePage();
  }
}

// Home page template
function renderHomePage() {
  const totalCompleted = getTotalCompleted();
  const totalLessons = Object.values(lessons).flat().length;

  return `
    <div class="bg-gradient"></div>
    
    <header class="header">
      <div class="header-content">
        <div class="logo">
          <span class="logo-icon">🎸</span>
          <span>GuitarMaster</span>
        </div>
        <div class="header-actions">
          <div class="progress-badge">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
            </svg>
            ${totalCompleted}/${totalLessons} Completed
          </div>
        </div>
      </div>
    </header>
    
    <main class="main-content">
      <section class="hero">
        <h1>Master the Guitar</h1>
        <p>From your first chord to advanced techniques. Interactive lessons with 3D visualizations to guide your journey.</p>
      </section>
      
      <nav class="level-tabs">
        ${Object.entries(levelMeta).map(([key, meta]) => `
          <button class="level-tab ${state.currentLevel === key ? 'active' : ''}" data-level="${key}">
            <span class="level-dot"></span>
            ${meta.icon} ${meta.label}
          </button>
        `).join('')}
      </nav>
      
      <section class="level-header" style="margin-bottom: var(--space-6);">
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: var(--space-4);">
          <div>
            <h2 style="font-size: var(--font-size-2xl); font-weight: 700; margin-bottom: var(--space-2);">
              ${levelMeta[state.currentLevel].icon} ${levelMeta[state.currentLevel].label} Level
            </h2>
            <p style="color: var(--text-secondary);">${levelMeta[state.currentLevel].description}</p>
          </div>
          <div class="level-progress-container" style="text-align: right;">
            <div style="font-size: var(--font-size-2xl); font-weight: 700; color: ${levelMeta[state.currentLevel].color};">
              ${getLevelProgress(state.currentLevel).percentage}%
            </div>
            <div style="font-size: var(--font-size-sm); color: var(--text-muted);">
              ${getLevelProgress(state.currentLevel).completed}/${getLevelProgress(state.currentLevel).total} lessons
            </div>
          </div>
        </div>
      </section>
      
      <div class="lessons-grid">
        ${lessons[state.currentLevel].map(lesson => renderLessonCard(lesson)).join('')}
      </div>
    </main>
    
    <nav class="bottom-nav">
      <div class="bottom-nav-items">
        <button class="nav-item active">
          <span class="icon">📚</span>
          <span>Lessons</span>
        </button>
        <button class="nav-item">
          <span class="icon">📊</span>
          <span>Progress</span>
        </button>
        <button class="nav-item">
          <span class="icon">⏱️</span>
          <span>Practice</span>
        </button>
        <button class="nav-item">
          <span class="icon">⚙️</span>
          <span>Settings</span>
        </button>
      </div>
    </nav>
  `;
}

// Lesson card template
function renderLessonCard(lesson) {
  const isCompleted = state.progress[lesson.id];
  const chordPreview = lesson.chords[0] || '🎵';

  return `
    <article class="lesson-card ${isCompleted ? 'completed' : ''}" data-lesson-id="${lesson.id}">
      <div class="lesson-thumbnail">
        <div class="chord-preview">${chordPreview}</div>
      </div>
      <div class="lesson-content">
        <div class="lesson-meta">
          <span class="lesson-number">Lesson ${lesson.number}</span>
          <span class="lesson-duration">⏱️ ${lesson.duration}</span>
        </div>
        <h3 class="lesson-title">${lesson.title}</h3>
        <p class="lesson-description">${lesson.description}</p>
        ${isCompleted ? '' : `
          <div class="lesson-progress">
            <div class="lesson-progress-fill" style="width: 0%"></div>
          </div>
        `}
      </div>
    </article>
  `;
}

// Lesson detail page template
function renderLessonDetail() {
  const lesson = state.currentLesson;
  const isCompleted = state.progress[lesson.id];

  return `
    <div class="bg-gradient"></div>
    
    <header class="header">
      <div class="header-content">
        <button class="back-button" id="back-btn">
          ← Back to Lessons
        </button>
        <div class="progress-badge">
          ${levelMeta[state.currentLevel].icon} ${levelMeta[state.currentLevel].label}
        </div>
      </div>
    </header>
    
    <main class="main-content">
      <div class="lesson-header">
        <h1>${lesson.title}</h1>
        <p>${lesson.description}</p>
      </div>
      
      ${lesson.chords.length > 0 ? `
        <div class="guitar-3d-container" id="guitar-3d">
          <div class="guitar-3d-controls">
            ${lesson.chords.map((chord, i) => `
              <button class="${i === 0 ? 'active' : ''}" data-chord="${chord}">${chord}</button>
            `).join('')}
          </div>
        </div>
      ` : `
        <div class="guitar-3d-container" id="guitar-3d"></div>
      `}
      
      ${lesson.chords.length > 0 ? `
        <section class="chord-section">
          <h2>🎸 Chord Diagrams</h2>
          <div class="chord-grid">
            ${lesson.chords.map((chord, i) => `
              <div class="chord-card ${i === 0 ? 'active' : ''}" data-chord="${chord}">
                <div class="chord-name">${chord}</div>
                <svg class="chord-diagram" viewBox="0 0 100 120" id="chord-svg-${chord}"></svg>
              </div>
            `).join('')}
          </div>
        </section>
      ` : ''}
      
      <section class="practice-section">
        <h2>⏱️ Practice Timer</h2>
        <div class="timer-display" id="timer-display">00:00</div>
        <div class="timer-controls">
          <button class="timer-btn primary" id="timer-start">▶ Start</button>
          <button class="timer-btn secondary" id="timer-reset">↺ Reset</button>
        </div>
      </section>
      
      <section class="content-section">
        <h2><span class="icon">📖</span> Introduction</h2>
        <p>${lesson.content.intro}</p>
      </section>
      
      ${lesson.content.sections.map(section => `
        <section class="content-section">
          <h2><span class="icon">📝</span> ${section.title}</h2>
          <p>${section.text}</p>
        </section>
      `).join('')}
      
      ${lesson.content.tips ? `
        <section class="content-section">
          <h2><span class="icon">💡</span> Tips</h2>
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

// Initialize home page functionality
function initHomePage() {
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
      const lesson = Object.values(lessons).flat().find(l => l.id === lessonId);
      state.currentLesson = lesson;
      renderApp();
    });
  });
}

// Initialize lesson page functionality
function initLessonPage() {
  // Back button
  document.getElementById('back-btn')?.addEventListener('click', () => {
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

  // Timer controls
  initTimer();

  // Chord diagrams
  state.currentLesson.chords.forEach(chord => {
    renderChordDiagram(chord);
  });

  // Chord selection
  document.querySelectorAll('.chord-card').forEach(card => {
    card.addEventListener('click', () => {
      document.querySelectorAll('.chord-card').forEach(c => c.classList.remove('active'));
      card.classList.add('active');

      // Update 3D controls
      const chordName = card.dataset.chord;
      document.querySelectorAll('.guitar-3d-controls button').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.chord === chordName);
      });

      // Update 3D fretboard
      update3DFretboard(chordName);
    });
  });

  document.querySelectorAll('.guitar-3d-controls button').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.guitar-3d-controls button').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const chordName = btn.dataset.chord;
      document.querySelectorAll('.chord-card').forEach(card => {
        card.classList.toggle('active', card.dataset.chord === chordName);
      });

      update3DFretboard(chordName);
    });
  });

  // Initialize 3D fretboard
  init3DFretboard();
}

// Timer functionality
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

// Render chord diagram
function renderChordDiagram(chordName) {
  const svg = document.getElementById(`chord-svg-${chordName}`);
  if (!svg || !chordData[chordName]) return;

  const chord = chordData[chordName];
  const startX = 15;
  const startY = 15;
  const stringSpacing = 14;
  const fretSpacing = 22;
  const numFrets = 5;

  let html = '';

  // Draw frets
  for (let i = 0; i <= numFrets; i++) {
    const y = startY + i * fretSpacing;
    const strokeWidth = i === 0 ? 3 : 1;
    html += `<line x1="${startX}" y1="${y}" x2="${startX + 5 * stringSpacing}" y2="${y}" stroke="#888" stroke-width="${strokeWidth}"/>`;
  }

  // Draw strings
  for (let i = 0; i < 6; i++) {
    const x = startX + i * stringSpacing;
    html += `<line x1="${x}" y1="${startY}" x2="${x}" y2="${startY + numFrets * fretSpacing}" stroke="#ccc" stroke-width="1"/>`;
  }

  // Draw barres
  chord.barres.forEach(barre => {
    const y = startY + (barre.fret - 0.5) * fretSpacing;
    const x1 = startX + (6 - barre.fromString) * stringSpacing;
    const x2 = startX + (6 - barre.toString) * stringSpacing;
    html += `<rect x="${x1}" y="${y - 6}" width="${x2 - x1}" height="12" rx="6" fill="#6366f1"/>`;
  });

  // Draw finger positions
  chord.frets.forEach((fret, stringIndex) => {
    const x = startX + stringIndex * stringSpacing;

    if (fret === -1) {
      // X for muted string
      html += `<text x="${x}" y="10" text-anchor="middle" fill="#ef4444" font-size="10" font-weight="bold">✕</text>`;
    } else if (fret === 0) {
      // O for open string
      html += `<text x="${x}" y="10" text-anchor="middle" fill="#22c55e" font-size="10" font-weight="bold">○</text>`;
    } else if (!chord.barres.some(b => b.fret === fret)) {
      // Finger dot
      const y = startY + (fret - 0.5) * fretSpacing;
      html += `<circle cx="${x}" cy="${y}" r="5" fill="#6366f1"/>`;
      if (chord.fingers[stringIndex] > 0) {
        html += `<text x="${x}" y="${y + 3}" text-anchor="middle" fill="white" font-size="7" font-weight="bold">${chord.fingers[stringIndex]}</text>`;
      }
    }
  });

  // Chord name at bottom
  html += `<text x="50" y="115" text-anchor="middle" fill="white" font-size="10" font-weight="bold">${chordName}</text>`;

  svg.innerHTML = html;
}

// 3D Fretboard with Three.js
let scene, camera, renderer, fretboardGroup;
let fingerDots = [];

function init3DFretboard() {
  const container = document.getElementById('guitar-3d');
  if (!container) return;

  // Scene setup
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x1a1a2e);

  // Camera
  camera = new THREE.PerspectiveCamera(45, container.clientWidth / container.clientHeight, 0.1, 1000);
  camera.position.set(0, 3, 8);
  camera.lookAt(0, 0, 0);

  // Renderer
  renderer = new THREE.WebGLRenderer({ antialias: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.insertBefore(renderer.domElement, container.firstChild);

  // Lighting
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);

  const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
  directionalLight.position.set(5, 5, 5);
  scene.add(directionalLight);

  const pointLight = new THREE.PointLight(0x6366f1, 0.5);
  pointLight.position.set(-3, 3, 3);
  scene.add(pointLight);

  // Create fretboard group
  fretboardGroup = new THREE.Group();
  scene.add(fretboardGroup);

  // Fretboard body
  const fretboardGeometry = new THREE.BoxGeometry(6, 0.15, 1.2);
  const fretboardMaterial = new THREE.MeshStandardMaterial({
    color: 0x3d2817,
    roughness: 0.8,
    metalness: 0.1
  });
  const fretboard = new THREE.Mesh(fretboardGeometry, fretboardMaterial);
  fretboardGroup.add(fretboard);

  // Strings
  const stringMaterial = new THREE.MeshStandardMaterial({
    color: 0xd4af37,
    roughness: 0.3,
    metalness: 0.8
  });

  const stringPositions = [-0.45, -0.27, -0.09, 0.09, 0.27, 0.45];
  stringPositions.forEach(z => {
    const stringGeometry = new THREE.CylinderGeometry(0.01, 0.01, 6.2, 8);
    const string = new THREE.Mesh(stringGeometry, stringMaterial);
    string.rotation.z = Math.PI / 2;
    string.position.set(0, 0.1, z);
    fretboardGroup.add(string);
  });

  // Frets
  const fretMaterial = new THREE.MeshStandardMaterial({
    color: 0xc0c0c0,
    roughness: 0.2,
    metalness: 0.9
  });

  for (let i = 0; i <= 12; i++) {
    const fretGeometry = new THREE.BoxGeometry(0.03, 0.05, 1.3);
    const fret = new THREE.Mesh(fretGeometry, fretMaterial);
    fret.position.set(-3 + i * 0.5, 0.1, 0);
    fretboardGroup.add(fret);
  }

  // Fret markers (dots)
  const markerMaterial = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    roughness: 0.5,
    emissive: 0x333333
  });

  const markerFrets = [3, 5, 7, 9, 12];
  markerFrets.forEach(fretNum => {
    const markerGeometry = new THREE.CircleGeometry(0.06, 16);
    const marker = new THREE.Mesh(markerGeometry, markerMaterial);
    marker.rotation.x = -Math.PI / 2;
    marker.position.set(-3 + (fretNum - 0.5) * 0.5, 0.08, 0);
    fretboardGroup.add(marker);

    // Double dot at 12th fret
    if (fretNum === 12) {
      const marker2 = marker.clone();
      marker2.position.z = -0.2;
      marker.position.z = 0.2;
      fretboardGroup.add(marker2);
    }
  });

  // Rotate for better view
  fretboardGroup.rotation.x = -0.3;
  fretboardGroup.rotation.y = 0.2;

  // Animation loop
  function animate() {
    requestAnimationFrame(animate);

    // Gentle rotation
    fretboardGroup.rotation.y = 0.2 + Math.sin(Date.now() * 0.0005) * 0.1;

    renderer.render(scene, camera);
  }
  animate();

  // Handle resize
  window.addEventListener('resize', () => {
    if (!container) return;
    camera.aspect = container.clientWidth / container.clientHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(container.clientWidth, container.clientHeight);
  });

  // Initialize with first chord if available
  if (state.currentLesson?.chords.length > 0) {
    update3DFretboard(state.currentLesson.chords[0]);
  }
}

function update3DFretboard(chordName) {
  if (!fretboardGroup || !chordData[chordName]) return;

  // Remove old finger dots
  fingerDots.forEach(dot => fretboardGroup.remove(dot));
  fingerDots = [];

  const chord = chordData[chordName];
  const stringPositions = [-0.45, -0.27, -0.09, 0.09, 0.27, 0.45];

  const fingerMaterial = new THREE.MeshStandardMaterial({
    color: 0x6366f1,
    roughness: 0.3,
    emissive: 0x3333aa,
    emissiveIntensity: 0.5
  });

  chord.frets.forEach((fret, stringIndex) => {
    if (fret > 0) {
      const fingerGeometry = new THREE.SphereGeometry(0.08, 16, 16);
      const finger = new THREE.Mesh(fingerGeometry, fingerMaterial);

      const x = -3 + (fret - 0.5) * 0.5;
      const z = stringPositions[stringIndex];
      finger.position.set(x, 0.2, z);

      fretboardGroup.add(finger);
      fingerDots.push(finger);
    }
  });
}

// Initialize app
renderApp();

// Register service worker for PWA
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js').catch(() => {
      // Service worker registration failed, but app still works
    });
  });
}
