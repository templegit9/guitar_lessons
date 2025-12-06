import './style.css';
import * as THREE from 'three';
import { lessons, instruments, levelMeta, chordData, songs } from './data/lessons.js';

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
  check: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>`,
  lightbulb: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A6 6 0 0 0 6 8c0 1 .2 2.2 1.5 3.5.7.7 1.3 1.5 1.5 2.5"/><path d="M9 18h6"/><path d="M10 22h4"/></svg>`,
  book: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20"/></svg>`,
  volume: `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"/><path d="M15.54 8.46a5 5 0 0 1 0 7.07"/></svg>`
};

// Audio context for instrument sounds
let audioContext = null;

function getAudioContext() {
  if (!audioContext) {
    audioContext = new (window.AudioContext || window.webkitAudioContext)();
  }
  return audioContext;
}

// Note frequencies for piano
const noteFrequencies = {
  'C': 261.63, 'C#': 277.18, 'Db': 277.18,
  'D': 293.66, 'D#': 311.13, 'Eb': 311.13,
  'E': 329.63,
  'F': 349.23, 'F#': 369.99, 'Gb': 369.99,
  'G': 392.00, 'G#': 415.30, 'Ab': 415.30,
  'A': 440.00, 'A#': 466.16, 'Bb': 466.16,
  'B': 493.88
};

function playNote(note, duration = 0.5) {
  const ctx = getAudioContext();
  const freq = noteFrequencies[note];
  if (!freq) return;

  const oscillator = ctx.createOscillator();
  const gainNode = ctx.createGain();

  oscillator.type = 'sine';
  oscillator.frequency.setValueAtTime(freq, ctx.currentTime);

  gainNode.gain.setValueAtTime(0.3, ctx.currentTime);
  gainNode.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + duration);

  oscillator.connect(gainNode);
  gainNode.connect(ctx.destination);

  oscillator.start(ctx.currentTime);
  oscillator.stop(ctx.currentTime + duration);
}

function playDrumSound(type) {
  const ctx = getAudioContext();
  const now = ctx.currentTime;

  if (type === 'kick') {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(150, now);
    osc.frequency.exponentialRampToValueAtTime(0.01, now + 0.5);
    gain.gain.setValueAtTime(1, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.5);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.5);
  } else if (type === 'snare') {
    const noise = ctx.createBufferSource();
    const buffer = ctx.createBuffer(1, ctx.sampleRate * 0.2, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
    noise.buffer = buffer;
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.3, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.2);
    const filter = ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.value = 1000;
    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    noise.start(now);
  } else if (type === 'hihat') {
    const noise = ctx.createBufferSource();
    const buffer = ctx.createBuffer(1, ctx.sampleRate * 0.1, ctx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < data.length; i++) data[i] = Math.random() * 2 - 1;
    noise.buffer = buffer;
    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0.1, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.05);
    const filter = ctx.createBiquadFilter();
    filter.type = 'highpass';
    filter.frequency.value = 5000;
    noise.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    noise.start(now);
  } else if (type === 'tom') {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(200, now);
    osc.frequency.exponentialRampToValueAtTime(100, now + 0.2);
    gain.gain.setValueAtTime(0.5, now);
    gain.gain.exponentialRampToValueAtTime(0.01, now + 0.3);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start(now);
    osc.stop(now + 0.3);
  }
}

function playChord(notes) {
  notes.forEach((note, i) => {
    setTimeout(() => playNote(note, 1.5), i * 50);
  });
}

// State management
const state = {
  currentView: 'select',
  currentInstrument: null,
  currentLevel: 'beginner',
  currentLesson: null,
  progress: JSON.parse(localStorage.getItem('musicProgress') || '{}'),
  timerInterval: null,
  timerSeconds: 0,
  timerRunning: false,
  highlightedKeys: [],
  highlightedDrums: [],
  // Exercise state
  exercise: {
    active: false,
    type: null,         // 'sequence', 'beat', 'song'
    sequence: [],
    currentIndex: 0,
    score: { correct: 0, wrong: 0 },
    passed: false,
    beatInterval: null,
    currentBeat: 0,
    expectedInput: null,
    tolerance: 250       // ms tolerance for beat timing
  }
};

function saveProgress() {
  localStorage.setItem('musicProgress', JSON.stringify(state.progress));
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
  const gradientClasses = { piano: 'cyan', guitar: 'orange', violin: 'purple', drums: 'teal' };

  return `
    <div class="select-screen">
      <div class="select-container">
        <div class="select-header">
          <div class="brand">
            ${icons.music}
            <h1>LearnMusic</h1>
          </div>
          <p class="tagline">Master your musical journey with interactive 3D lessons</p>
        </div>
        
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
                  <div class="stat-row">${icons.trendingUp}<span>${inst.marketShare}</span></div>
                  <div class="stat-row">${icons.star}<span>${inst.accessibility}</span></div>
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
        
        <div class="select-footer">
          <div class="footer-stats">
            <div class="footer-stat"><div class="footer-stat-value">8+</div><div class="footer-stat-label">Lessons per instrument</div></div>
            <div class="footer-divider"></div>
            <div class="footer-stat"><div class="footer-stat-value">4</div><div class="footer-stat-label">Skill levels</div></div>
            <div class="footer-divider"></div>
            <div class="footer-stat"><div class="footer-stat-value">3D</div><div class="footer-stat-label">Interactive models</div></div>
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
        <button class="back-button" id="back-to-select">${icons.arrowLeft} Back to instruments</button>
        
        <div class="lesson-header animate-fade-in">
          <span class="lesson-header-icon">${inst.icon}</span>
          <div class="lesson-header-text">
            <h1>${inst.name} Lessons</h1>
            <p>${inst.description}</p>
          </div>
        </div>
        
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
                          <div class="lesson-duration">${icons.clock}<span>${lesson.duration} minutes</span></div>
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
  const content = lesson.content;

  // Get interactive elements based on instrument
  const interactiveElements = getInteractiveElements(lesson);

  return `
    <div class="detail-screen">
      <div class="detail-container">
        <button class="back-button" id="back-to-lessons">${icons.arrowLeft} Back to lessons</button>
        
        <div class="detail-grid">
          <!-- Left Column - 3D + Timer -->
          <div class="animate-fade-in">
            <div class="model-container" id="model-3d"></div>
            
            ${interactiveElements}
            
            <div class="timer-section">
              <div class="timer-header">${icons.timer}<span>Practice Timer</span></div>
              <div class="timer-display" id="timer-display">00:00</div>
              <div class="timer-controls">
                <button class="timer-btn primary" id="timer-start">▶ Start</button>
                <button class="timer-btn secondary" id="timer-reset">↺ Reset</button>
              </div>
            </div>
          </div>
          
          <!-- Right Column - Content -->
          <div class="animate-fade-in animate-fade-in-delay-1">
            <!-- Header -->
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
                <div class="content-badge"><span>Duration: </span><span class="text-white">${lesson.duration}</span></div>
                <div class="content-badge"><span class="text-white" style="text-transform: capitalize;">${getLessonLevel(lesson.id)}</span></div>
              </div>
            </div>
            
            <!-- Intro -->
            <div class="content-card intro-card">
              <div class="intro-header">
                ${icons.book}
                <h2>Introduction</h2>
              </div>
              <p class="intro-text">${content.intro}</p>
            </div>
            
            <!-- Sections -->
            ${content.sections.map((section, i) => `
              <div class="content-card section-card animate-fade-in" style="animation-delay: ${0.2 + i * 0.1}s;">
                <h3 class="section-title">${section.title}</h3>
                <p class="section-text">${section.text}</p>
              </div>
            `).join('')}
            
            <!-- Tips -->
            ${content.tips && content.tips.length > 0 ? `
              <div class="content-card tips-card">
                <div class="tips-header">
                  ${icons.lightbulb}
                  <h2>Pro Tips</h2>
                </div>
                <ul class="tips-list">
                  ${content.tips.map(tip => `<li class="tip-item">💡 ${tip}</li>`).join('')}
                </ul>
              </div>
            ` : ''}
            
            <!-- Practice Exercise -->
            ${lesson.exercise ? renderExerciseSection(lesson) : ''}
            
            <!-- Complete Button -->
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

function getLessonLevel(lessonId) {
  for (const level of ['beginner', 'intermediate', 'advanced', 'expert']) {
    if (lessons[state.currentInstrument][level]?.some(l => l.id === lessonId)) {
      return level;
    }
  }
  return 'beginner';
}

function getInteractiveElements(lesson) {
  const inst = state.currentInstrument;

  if (inst === 'piano' && lesson.keys && lesson.keys.length > 0) {
    state.highlightedKeys = lesson.keys;
    return `
      <div class="interactive-section">
        <div class="interactive-header">
          ${icons.volume}
          <span>Click keys to hear notes: <strong>${lesson.keys.join(', ')}</strong></span>
        </div>
        <div class="piano-keys" id="piano-keys">
          ${['C', 'D', 'E', 'F', 'G', 'A', 'B'].map(note => `
            <button class="piano-key ${lesson.keys.includes(note) ? 'highlighted' : ''}" data-note="${note}">
              ${note}
            </button>
          `).join('')}
        </div>
      </div>
    `;
  }

  if (inst === 'guitar' && lesson.chords && lesson.chords.length > 0) {
    return `
      <div class="interactive-section">
        <div class="interactive-header">
          ${icons.volume}
          <span>Click chords to hear: <strong>${lesson.chords.join(', ')}</strong></span>
        </div>
        <div class="chord-buttons" id="chord-buttons">
          ${lesson.chords.map(chord => `
            <button class="chord-btn" data-chord="${chord}">${chord}</button>
          `).join('')}
        </div>
      </div>
    `;
  }

  if (inst === 'drums' && lesson.drums && lesson.drums.length > 0) {
    state.highlightedDrums = lesson.drums;
    return `
      <div class="interactive-section">
        <div class="interactive-header">
          ${icons.volume}
          <span>Click to play: <strong>${lesson.drums.join(', ')}</strong></span>
        </div>
        <div class="drum-pads" id="drum-pads">
          ${['kick', 'snare', 'hihat', 'tom'].map(drum => `
            <button class="drum-pad ${lesson.drums.includes(drum) ? 'highlighted' : ''}" data-drum="${drum}">
              ${drum.charAt(0).toUpperCase() + drum.slice(1)}
            </button>
          `).join('')}
        </div>
      </div>
    `;
  }

  if (inst === 'violin' && lesson.strings && lesson.strings.length > 0) {
    return `
      <div class="interactive-section">
        <div class="interactive-header">
          ${icons.volume}
          <span>Strings used: <strong>${lesson.strings.join(', ')}</strong></span>
        </div>
        <div class="string-buttons" id="string-buttons">
          ${['G', 'D', 'A', 'E'].map(string => `
            <button class="string-btn ${lesson.strings.includes(string) ? 'highlighted' : ''}" data-string="${string}">
              ${string} String
            </button>
          `).join('')}
        </div>
      </div>
    `;
  }

  return '';
}

// ============ EXERCISE SECTION ============
function renderExerciseSection(lesson) {
  const ex = lesson.exercise;
  const exerciseCompleted = state.exercise.passed;

  return `
    <div class="content-card exercise-card">
      <div class="exercise-header">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="m9 12 2 2 4-4"/></svg>
        <h2>Practice Exercise</h2>
        <span class="exercise-type-badge">${ex.type.charAt(0).toUpperCase() + ex.type.slice(1)}</span>
      </div>
      
      <p class="exercise-instructions">${ex.instructions}</p>
      
      ${ex.type === 'sequence' ? renderSequenceExercise(lesson) : ''}
      ${ex.type === 'beat' ? renderBeatExercise(lesson) : ''}
      ${ex.type === 'song' ? renderSongExercise(lesson) : ''}
      
      <div class="exercise-score" id="exercise-score">
        <div class="score-display">
          <span class="score-label">Score:</span>
          <span class="score-value" id="score-correct">0</span>
          <span class="score-divider">/</span>
          <span class="score-total" id="score-total">${ex.sequence?.length || 8}</span>
        </div>
        <div class="score-percentage" id="score-percentage">0%</div>
      </div>
      
      <div class="exercise-controls">
        <button class="exercise-btn start-btn" id="start-exercise">▶ Start Exercise</button>
        <button class="exercise-btn reset-btn" id="reset-exercise">↺ Reset</button>
      </div>
      
      <div class="exercise-feedback" id="exercise-feedback"></div>
    </div>
  `;
}

function renderSequenceExercise(lesson) {
  const ex = lesson.exercise;
  const inst = state.currentInstrument;

  return `
    <div class="sequence-display" id="sequence-display">
      ${ex.sequence.map((item, i) => `
        <div class="sequence-item" data-index="${i}">
          <span class="sequence-note">${item}</span>
        </div>
      `).join('')}
    </div>
    
    <div class="exercise-input-area" id="exercise-input">
      ${inst === 'piano' ? `
        <div class="piano-keys exercise-keys" id="exercise-piano">
          ${['C', 'D', 'E', 'F', 'G', 'A', 'B'].map(note => `
            <button class="piano-key" data-note="${note}">${note}</button>
          `).join('')}
        </div>
      ` : ''}
      ${inst === 'guitar' ? `
        <div class="chord-buttons exercise-chords" id="exercise-chords">
          ${[...new Set(ex.sequence)].map(chord => `
            <button class="chord-btn" data-chord="${chord}">${chord}</button>
          `).join('')}
        </div>
      ` : ''}
      ${inst === 'drums' ? `
        <div class="drum-pads exercise-drums" id="exercise-drums">
          ${[...new Set(ex.sequence)].map(drum => `
            <button class="drum-pad" data-drum="${drum}">${drum.charAt(0).toUpperCase() + drum.slice(1)}</button>
          `).join('')}
        </div>
      ` : ''}
      ${inst === 'violin' ? `
        <div class="string-buttons exercise-strings" id="exercise-strings">
          ${['G', 'D', 'A', 'E'].map(str => `
            <button class="string-btn" data-string="${str}">${str}</button>
          `).join('')}
        </div>
      ` : ''}
    </div>
  `;
}

function renderBeatExercise(lesson) {
  const ex = lesson.exercise;

  return `
    <div class="beat-display" id="beat-display">
      <div class="metronome-visual">
        <div class="beat-indicator" id="beat-indicator"></div>
        <div class="bpm-display">${ex.bpm} BPM</div>
      </div>
      <div class="beat-grid" id="beat-grid">
        ${Array.from({ length: ex.measures * 4 }, (_, i) => `
          <div class="beat-slot ${ex.pattern.includes((i % 4) + 1) ? 'target' : ''}" data-beat="${i + 1}">
            ${(i % 4) + 1}
          </div>
        `).join('')}
      </div>
    </div>
  `;
}

function renderSongExercise(lesson) {
  const ex = lesson.exercise;
  const song = songs[ex.songId];

  if (!song) return '<p>Song not found</p>';

  return `
    <div class="song-display" id="song-display">
      <div class="song-info">
        <span class="song-name">🎵 ${song.name}</span>
        <span class="song-bpm">${song.bpm} BPM</span>
      </div>
      <div class="note-track" id="note-track">
        <div class="track-notes" id="track-notes">
          ${(song.notes || song.chords || song.pattern || []).map((item, i) => `
            <div class="track-note" data-index="${i}" style="left: ${(item.beat - 1) * 60}px">
              ${item.note || item.chord || item.drum || item.string}
            </div>
          `).join('')}
        </div>
        <div class="playhead" id="playhead"></div>
      </div>
    </div>
  `;
}

// ============ INITIALIZATION ============
function initInstrumentSelect() {
  Object.keys(instruments).forEach(id => init3DPreview(id));

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
    state.timerSeconds = 0;
    renderApp();
  });

  document.getElementById('complete-btn')?.addEventListener('click', () => {
    state.progress[state.currentLesson.id] = true;
    saveProgress();
    renderApp();
  });

  initTimer();
  init3DModel();
  initInteractiveElements();
  initExercise();
}

// ============ EXERCISE LOGIC ============
function initExercise() {
  const lesson = state.currentLesson;
  if (!lesson?.exercise) return;

  const ex = lesson.exercise;

  // Reset exercise state
  state.exercise = {
    active: false,
    type: ex.type,
    sequence: ex.sequence || [],
    currentIndex: 0,
    score: { correct: 0, wrong: 0 },
    passed: false,
    beatInterval: null,
    currentBeat: 0,
    expectedInput: null,
    tolerance: 250
  };

  // Start button
  document.getElementById('start-exercise')?.addEventListener('click', startExercise);

  // Reset button
  document.getElementById('reset-exercise')?.addEventListener('click', resetExercise);
}

function startExercise() {
  const lesson = state.currentLesson;
  const ex = lesson.exercise;

  state.exercise.active = true;
  state.exercise.currentIndex = 0;
  state.exercise.score = { correct: 0, wrong: 0 };

  const startBtn = document.getElementById('start-exercise');
  if (startBtn) {
    startBtn.textContent = '⏸ Running...';
    startBtn.disabled = true;
  }

  // Update UI to show active state
  document.querySelectorAll('.sequence-item').forEach(el => el.classList.remove('active', 'correct', 'wrong'));
  document.getElementById('exercise-feedback')?.classList.remove('show', 'success', 'error');

  if (ex.type === 'sequence') {
    highlightCurrentSequenceItem();
    bindExerciseInputs();
  } else if (ex.type === 'beat') {
    startBeatExercise();
  } else if (ex.type === 'song') {
    startSongExercise();
  }
}

function resetExercise() {
  state.exercise.active = false;
  state.exercise.currentIndex = 0;
  state.exercise.score = { correct: 0, wrong: 0 };
  clearInterval(state.exercise.beatInterval);

  const startBtn = document.getElementById('start-exercise');
  if (startBtn) {
    startBtn.textContent = '▶ Start Exercise';
    startBtn.disabled = false;
  }

  document.querySelectorAll('.sequence-item').forEach(el => el.classList.remove('active', 'correct', 'wrong'));
  document.getElementById('exercise-feedback')?.classList.remove('show', 'success', 'error');
  updateScore();
}

function highlightCurrentSequenceItem() {
  document.querySelectorAll('.sequence-item').forEach((el, i) => {
    el.classList.toggle('active', i === state.exercise.currentIndex);
  });
}

function bindExerciseInputs() {
  const inst = state.currentInstrument;

  // Remove old listeners by cloning
  const replaceElement = (selector) => {
    document.querySelectorAll(selector).forEach(el => {
      const clone = el.cloneNode(true);
      el.parentNode.replaceChild(clone, el);
    });
  };

  if (inst === 'piano') {
    replaceElement('#exercise-piano .piano-key');
    document.querySelectorAll('#exercise-piano .piano-key').forEach(key => {
      key.addEventListener('click', () => handleExerciseInput(key.dataset.note, 'note'));
    });
  } else if (inst === 'guitar') {
    replaceElement('#exercise-chords .chord-btn');
    document.querySelectorAll('#exercise-chords .chord-btn').forEach(btn => {
      btn.addEventListener('click', () => handleExerciseInput(btn.dataset.chord, 'chord'));
    });
  } else if (inst === 'drums') {
    replaceElement('#exercise-drums .drum-pad');
    document.querySelectorAll('#exercise-drums .drum-pad').forEach(pad => {
      pad.addEventListener('click', () => handleExerciseInput(pad.dataset.drum, 'drum'));
    });
  } else if (inst === 'violin') {
    replaceElement('#exercise-strings .string-btn');
    document.querySelectorAll('#exercise-strings .string-btn').forEach(btn => {
      btn.addEventListener('click', () => handleExerciseInput(btn.dataset.string, 'string'));
    });
  }
}

function handleExerciseInput(input, type) {
  if (!state.exercise.active) return;

  const expected = state.exercise.sequence[state.exercise.currentIndex];
  const isCorrect = input === expected;

  // Play sound
  if (type === 'note') playNote(input);
  else if (type === 'chord') playChord(getChordNotes(input));
  else if (type === 'drum') playDrumSound(input);
  else if (type === 'string') {
    const freq = { 'G': 196, 'D': 293.66, 'A': 440, 'E': 659.25 };
    const ctx = getAudioContext();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = 'sawtooth';
    osc.frequency.value = freq[input];
    gain.gain.setValueAtTime(0.2, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 0.5);
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.start();
    osc.stop(ctx.currentTime + 0.5);
  }

  // Update sequence item
  const currentItem = document.querySelector(`.sequence-item[data-index="${state.exercise.currentIndex}"]`);
  if (currentItem) {
    currentItem.classList.remove('active');
    currentItem.classList.add(isCorrect ? 'correct' : 'wrong');
  }

  // Show feedback
  showFeedback(isCorrect);

  // Update score
  if (isCorrect) state.exercise.score.correct++;
  else state.exercise.score.wrong++;

  updateScore();

  // Move to next
  state.exercise.currentIndex++;

  if (state.exercise.currentIndex >= state.exercise.sequence.length) {
    finishExercise();
  } else {
    highlightCurrentSequenceItem();
  }
}

function showFeedback(isCorrect) {
  const feedback = document.getElementById('exercise-feedback');
  if (feedback) {
    feedback.textContent = isCorrect ? '✓ Correct!' : '✗ Try again';
    feedback.className = `exercise-feedback show ${isCorrect ? 'success' : 'error'}`;
    setTimeout(() => feedback.classList.remove('show'), 500);
  }
}

function updateScore() {
  const { correct, wrong } = state.exercise.score;
  const total = state.exercise.sequence.length || 1;
  const percentage = Math.round((correct / total) * 100);

  document.getElementById('score-correct').textContent = correct;
  document.getElementById('score-total').textContent = total;
  document.getElementById('score-percentage').textContent = `${percentage}%`;
}

function finishExercise() {
  state.exercise.active = false;

  const ex = state.currentLesson.exercise;
  const { correct } = state.exercise.score;
  const total = state.exercise.sequence.length;
  const percentage = correct / total;
  const passed = percentage >= (ex.passThreshold || 0.8);

  state.exercise.passed = passed;

  const feedback = document.getElementById('exercise-feedback');
  if (feedback) {
    if (passed) {
      feedback.innerHTML = `<div class="finish-message success">🎉 Excellent! You passed with ${Math.round(percentage * 100)}%!</div>`;
    } else {
      feedback.innerHTML = `<div class="finish-message fail">Keep practicing! Score: ${Math.round(percentage * 100)}% (need ${Math.round(ex.passThreshold * 100)}%)</div>`;
    }
    feedback.classList.add('show');
  }

  const startBtn = document.getElementById('start-exercise');
  if (startBtn) {
    startBtn.textContent = '↺ Try Again';
    startBtn.disabled = false;
  }
}

function startBeatExercise() {
  const ex = state.currentLesson.exercise;
  const beatDuration = 60000 / ex.bpm;
  const totalBeats = ex.measures * 4;
  let beatCount = 0;

  state.exercise.sequence = ex.drums || ex.notes || ex.chords || ex.strings || [];

  const indicator = document.getElementById('beat-indicator');
  const beatSlots = document.querySelectorAll('.beat-slot');

  // Bind input for beat mode
  bindExerciseInputs();

  state.exercise.beatInterval = setInterval(() => {
    beatCount++;
    state.exercise.currentBeat = beatCount;

    // Visual pulse
    if (indicator) {
      indicator.classList.add('pulse');
      setTimeout(() => indicator.classList.remove('pulse'), 100);
    }

    // Highlight current beat
    beatSlots.forEach((slot, i) => {
      slot.classList.toggle('current', i === beatCount - 1);
    });

    if (beatCount >= totalBeats) {
      clearInterval(state.exercise.beatInterval);
      finishExercise();
    }
  }, beatDuration);
}

function startSongExercise() {
  const ex = state.currentLesson.exercise;
  const song = songs[ex.songId];
  if (!song) return;

  const beatDuration = 60000 / song.bpm;
  const notes = song.notes || song.chords || song.pattern || [];

  state.exercise.sequence = notes.map(n => n.note || n.chord || n.drum || n.string);

  bindExerciseInputs();

  const playhead = document.getElementById('playhead');
  const trackNotes = document.querySelectorAll('.track-note');
  let startTime = Date.now();

  const animate = () => {
    const elapsed = Date.now() - startTime;
    const beatPosition = (elapsed / beatDuration) * 60;

    if (playhead) {
      playhead.style.left = `${beatPosition}px`;
    }

    // Check for notes to highlight
    trackNotes.forEach((note, i) => {
      const noteBeat = notes[i].beat;
      const notePosition = (noteBeat - 1) * 60;
      if (Math.abs(beatPosition - notePosition) < 30 && !note.classList.contains('passed')) {
        note.classList.add('active');
      }
    });

    if (elapsed < notes[notes.length - 1].beat * beatDuration + 2000) {
      requestAnimationFrame(animate);
    } else {
      finishExercise();
    }
  };

  requestAnimationFrame(animate);
}

function initInteractiveElements() {
  // Piano keys
  document.querySelectorAll('.piano-key').forEach(key => {
    key.addEventListener('click', () => {
      const note = key.dataset.note;
      playNote(note);
      key.classList.add('playing');
      setTimeout(() => key.classList.remove('playing'), 200);
    });
  });

  // Guitar chords
  document.querySelectorAll('.chord-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const chord = btn.dataset.chord;
      const chordNotes = getChordNotes(chord);
      playChord(chordNotes);
      btn.classList.add('playing');
      setTimeout(() => btn.classList.remove('playing'), 500);
    });
  });

  // Drum pads
  document.querySelectorAll('.drum-pad').forEach(pad => {
    pad.addEventListener('click', () => {
      const drum = pad.dataset.drum;
      playDrumSound(drum);
      pad.classList.add('playing');
      setTimeout(() => pad.classList.remove('playing'), 150);
    });
  });

  // Violin strings
  document.querySelectorAll('.string-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const string = btn.dataset.string;
      const freq = { 'G': 196, 'D': 293.66, 'A': 440, 'E': 659.25 };
      const ctx = getAudioContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.value = freq[string];
      gain.gain.setValueAtTime(0.2, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, ctx.currentTime + 1);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 1);
      btn.classList.add('playing');
      setTimeout(() => btn.classList.remove('playing'), 300);
    });
  });
}

function getChordNotes(chord) {
  const chords = {
    'C': ['C', 'E', 'G'], 'G': ['G', 'B', 'D'], 'D': ['D', 'F#', 'A'],
    'E': ['E', 'G#', 'B'], 'A': ['A', 'C#', 'E'], 'F': ['F', 'A', 'C'],
    'Em': ['E', 'G', 'B'], 'Am': ['A', 'C', 'E'], 'Dm': ['D', 'F', 'A'],
    'Bm': ['B', 'D', 'F#']
  };
  return chords[chord] || ['C', 'E', 'G'];
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
  const highlightMat = new THREE.MeshStandardMaterial({ color: 0x22d3ee, roughness: 0.3, emissive: 0x22d3ee, emissiveIntensity: 0.3 });

  const keyCount = detailed ? 14 : 7;
  const noteNames = ['C', 'D', 'E', 'F', 'G', 'A', 'B'];

  for (let i = 0; i < keyCount; i++) {
    const noteName = noteNames[i % 7];
    const isHighlighted = detailed && state.highlightedKeys.includes(noteName);
    const white = new THREE.Mesh(whiteKeyGeo, isHighlighted ? highlightMat : whiteMat);
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
  const highlightMat = new THREE.MeshStandardMaterial({ color: 0x22d3ee, metalness: 0.7, emissive: 0x22d3ee, emissiveIntensity: 0.2 });

  const snareGeo = new THREE.CylinderGeometry(0.5, 0.5, 0.25, 32);
  const snare = new THREE.Mesh(snareGeo, state.highlightedDrums.includes('snare') ? highlightMat : snareMat);
  snare.position.set(0, 0, 0.5);
  group.add(snare);

  const kickMat = new THREE.MeshStandardMaterial({ color: 0x2a2a2a, roughness: 0.8 });
  const kickGeo = new THREE.CylinderGeometry(0.8, 0.8, 0.5, 32);
  const kick = new THREE.Mesh(kickGeo, state.highlightedDrums.includes('kick') ? highlightMat : kickMat);
  kick.rotation.x = Math.PI / 2;
  kick.position.set(0, -0.5, 1.2);
  group.add(kick);

  const hihatMat = new THREE.MeshStandardMaterial({ color: 0xd4af37, metalness: 0.9 });
  const hihatGeo = new THREE.CylinderGeometry(0.4, 0.4, 0.02, 32);
  const hihat1 = new THREE.Mesh(hihatGeo, state.highlightedDrums.includes('hihat') ? highlightMat : hihatMat);
  hihat1.position.set(-1, 0.3, 0);
  group.add(hihat1);
  const hihat2 = hihat1.clone();
  hihat2.position.y += 0.06;
  group.add(hihat2);

  if (detailed) {
    const tomMat = new THREE.MeshStandardMaterial({ color: 0x4a4a4a, roughness: 0.7 });
    const tom1Geo = new THREE.CylinderGeometry(0.3, 0.3, 0.25, 32);
    const tom1 = new THREE.Mesh(tom1Geo, state.highlightedDrums.includes('tom') ? highlightMat : tomMat);
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
