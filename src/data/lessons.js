// Main lessons aggregator - imports from instrument-specific files
import { pianoLessons } from './pianoLessons.js';
import { guitarLessons } from './guitarLessons.js';
import { drumsLessons } from './drumsLessons.js';
import { violinLessons } from './violinLessons.js';

// Instrument metadata
export const instruments = {
    piano: {
        id: 'piano',
        name: 'Piano/Keyboard',
        icon: '🎹',
        color: '#6366f1',
        gradient: 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
        description: 'The foundation of music theory. Perfect for all ages.',
        marketShare: '34-39%',
        growth: '14.8% CAGR',
        accessibility: 'High'
    },
    guitar: {
        id: 'guitar',
        name: 'Guitar',
        icon: '🎸',
        color: '#f59e0b',
        gradient: 'linear-gradient(135deg, #f59e0b 0%, #d97706 100%)',
        description: 'The most popular string instrument. Versatile and portable.',
        marketShare: '25%',
        growth: 'Stable-growing',
        accessibility: 'Medium-High'
    },
    violin: {
        id: 'violin',
        name: 'Violin',
        icon: '🎻',
        color: '#ec4899',
        gradient: 'linear-gradient(135deg, #ec4899 0%, #db2777 100%)',
        description: 'Classical elegance. Express deep emotions through strings.',
        marketShare: '15%',
        growth: 'Stable',
        accessibility: 'Low-Medium'
    },
    drums: {
        id: 'drums',
        name: 'Drums/Percussion',
        icon: '🥁',
        color: '#22c55e',
        gradient: 'linear-gradient(135deg, #22c55e 0%, #16a34a 100%)',
        description: 'The heartbeat of music. Build rhythm and coordination.',
        marketShare: '10%',
        growth: 'Stable',
        accessibility: 'Medium'
    }
};

// Level metadata
export const levelMeta = {
    beginner: { label: 'Beginner', color: '#22c55e', icon: '🌱', description: 'Master the fundamentals' },
    intermediate: { label: 'Intermediate', color: '#3b82f6', icon: '📈', description: 'Expand your skills' },
    advanced: { label: 'Advanced', color: '#f59e0b', icon: '⚡', description: 'Deepen your understanding' },
    expert: { label: 'Expert', color: '#ef4444', icon: '🔥', description: 'Master your craft' }
};

// Song data for exercises
export const songs = {
    // Beginner Songs
    'mary-had-a-lamb': {
        name: 'Mary Had a Little Lamb',
        bpm: 100,
        instrument: 'piano',
        notes: [
            { note: 'E', beat: 1 }, { note: 'D', beat: 2 }, { note: 'C', beat: 3 }, { note: 'D', beat: 4 },
            { note: 'E', beat: 5 }, { note: 'E', beat: 6 }, { note: 'E', beat: 7 },
            { note: 'D', beat: 9 }, { note: 'D', beat: 10 }, { note: 'D', beat: 11 },
            { note: 'E', beat: 13 }, { note: 'G', beat: 14 }, { note: 'G', beat: 15 }
        ]
    },
    'twinkle-violin': {
        name: 'Twinkle Twinkle (Violin)',
        bpm: 80,
        instrument: 'violin',
        notes: [
            { string: 'A', beat: 1 }, { string: 'A', beat: 2 },
            { string: 'E', beat: 3 }, { string: 'E', beat: 4 },
            { string: 'E', beat: 5 }, { string: 'E', beat: 6 },
            { string: 'E', beat: 7 }, { string: 'E', beat: 8 }
        ]
    },
    'basic-rock-beat': {
        name: 'Basic Rock Beat',
        bpm: 100,
        instrument: 'drums',
        pattern: [
            { drum: 'kick', beat: 1 }, { drum: 'hihat', beat: 1 },
            { drum: 'hihat', beat: 1.5 },
            { drum: 'snare', beat: 2 }, { drum: 'hihat', beat: 2 },
            { drum: 'hihat', beat: 2.5 },
            { drum: 'kick', beat: 3 }, { drum: 'hihat', beat: 3 },
            { drum: 'hihat', beat: 3.5 },
            { drum: 'snare', beat: 4 }, { drum: 'hihat', beat: 4 },
            { drum: 'hihat', beat: 4.5 }
        ]
    },

    // Intermediate Songs
    'ode-to-joy': {
        name: 'Ode to Joy',
        bpm: 90,
        instrument: 'piano',
        notes: [
            { note: 'E', beat: 1 }, { note: 'E', beat: 2 }, { note: 'F', beat: 3 }, { note: 'G', beat: 4 },
            { note: 'G', beat: 5 }, { note: 'F', beat: 6 }, { note: 'E', beat: 7 }, { note: 'D', beat: 8 },
            { note: 'C', beat: 9 }, { note: 'C', beat: 10 }, { note: 'D', beat: 11 }, { note: 'E', beat: 12 },
            { note: 'E', beat: 13 }, { note: 'D', beat: 14.5 }, { note: 'D', beat: 16 }
        ]
    },
    'canon-in-d': {
        name: 'Canon in D',
        bpm: 70,
        instrument: 'piano',
        notes: [
            { note: 'D', beat: 1 }, { note: 'A', beat: 3 }, { note: 'B', beat: 5 }, { note: 'F#', beat: 7 },
            { note: 'G', beat: 9 }, { note: 'D', beat: 11 }, { note: 'G', beat: 13 }, { note: 'A', beat: 15 }
        ]
    },
    'knockin-on-heaven': {
        name: "Knockin' on Heaven's Door",
        bpm: 70,
        instrument: 'guitar',
        chords: [
            { chord: 'G', beat: 1 }, { chord: 'D', beat: 5 },
            { chord: 'Am', beat: 9 }, { chord: 'Am', beat: 13 },
            { chord: 'G', beat: 17 }, { chord: 'D', beat: 21 },
            { chord: 'C', beat: 25 }, { chord: 'C', beat: 29 }
        ]
    },
    'wonderwall': {
        name: "Wonderwall",
        bpm: 85,
        instrument: 'guitar',
        chords: [
            { chord: 'Em', beat: 1 }, { chord: 'G', beat: 3 },
            { chord: 'D', beat: 5 }, { chord: 'A', beat: 7 }
        ]
    },
    'billie-jean': {
        name: 'Billie Jean Beat',
        bpm: 117,
        instrument: 'drums',
        pattern: [
            { drum: 'kick', beat: 1 }, { drum: 'hihat', beat: 1 }, { drum: 'hihat', beat: 1.5 },
            { drum: 'snare', beat: 2 }, { drum: 'hihat', beat: 2 }, { drum: 'hihat', beat: 2.5 },
            { drum: 'kick', beat: 3 }, { drum: 'hihat', beat: 3 }, { drum: 'hihat', beat: 3.5 },
            { drum: 'snare', beat: 4 }, { drum: 'hihat', beat: 4 }, { drum: 'hihat', beat: 4.5 }
        ]
    },
    'minuet-in-g': {
        name: 'Minuet in G',
        bpm: 100,
        instrument: 'violin',
        notes: [
            { string: 'D', beat: 1 }, { string: 'G', beat: 2 }, { string: 'A', beat: 3 },
            { string: 'B', beat: 4 }, { string: 'C', beat: 5 }
        ]
    },

    // Advanced/Expert Songs
    'fur-elise': {
        name: 'Fur Elise',
        bpm: 100, // Slightly simplified
        instrument: 'piano',
        notes: [
            { note: 'E', beat: 1 }, { note: 'D#', beat: 1.5 }, { note: 'E', beat: 2 },
            { note: 'D#', beat: 2.5 }, { note: 'E', beat: 3 }, { note: 'B', beat: 3.5 },
            { note: 'D', beat: 4 }, { note: 'C', beat: 4.5 }, { note: 'A', beat: 5 }
        ]
    },
    'moonlight-sonata': {
        name: 'Moonlight Sonata',
        bpm: 60,
        instrument: 'piano',
        notes: [
            { note: 'C#', beat: 1 }, { note: 'G#', beat: 1.33 }, { note: 'C#', beat: 1.66 },
            { note: 'C#', beat: 2 }, { note: 'G#', beat: 2.33 }, { note: 'C#', beat: 2.66 }
        ]
    },
    'stairway-to-heaven': {
        name: 'Stairway to Heaven',
        bpm: 72,
        instrument: 'guitar',
        chords: [
            { chord: 'Am', beat: 1 }, { chord: 'G', beat: 3 },
            { chord: 'C', beat: 5 }, { chord: 'D', beat: 6 },
            { chord: 'F', beat: 7 }, { chord: 'G', beat: 8 }, { chord: 'Am', beat: 9 }
        ]
    },
    'hotel-california': {
        name: 'Hotel California',
        bpm: 75,
        instrument: 'guitar',
        chords: [
            { chord: 'Bm', beat: 1 }, { chord: 'F#', beat: 5 },
            { chord: 'A', beat: 9 }, { chord: 'E', beat: 13 },
            { chord: 'G', beat: 17 }, { chord: 'D', beat: 21 },
            { chord: 'Em', beat: 25 }, { chord: 'F#', beat: 29 }
        ]
    },
    'take-five': {
        name: 'Take Five (5/4)',
        bpm: 100,
        instrument: 'drums',
        pattern: [
            { drum: 'kick', beat: 1 }, { drum: 'hihat', beat: 1 },
            { drum: 'snare', beat: 2 }, { drum: 'hihat', beat: 2.5 },
            { drum: 'kick', beat: 3 }, { drum: 'snare', beat: 4 },
            { drum: 'hihat', beat: 5 }
        ]
    },
    'rosanna': {
        name: 'Rosanna Shuffle',
        bpm: 90,
        instrument: 'drums',
        pattern: [
            { drum: 'kick', beat: 1 }, { drum: 'hihat', beat: 1 },
            { drum: 'hihat', beat: 1.67 }, { drum: 'snare', beat: 2 },
            { drum: 'hihat', beat: 2.5 }, { drum: 'snare', beat: 4 }
        ]
    },
    'bach-partita': {
        name: 'Partita No. 3',
        bpm: 110,
        instrument: 'violin',
        notes: [
            { string: 'E', beat: 1 }, { string: 'E', beat: 1.25 }, { string: 'E', beat: 1.5 },
            { string: 'E', beat: 1.75 }, { string: 'F#', beat: 2 }, { string: 'G#', beat: 2.25 },
            { string: 'A', beat: 2.5 }, { string: 'B', beat: 2.75 }
        ]
    },
    'spring-vivaldi': {
        name: 'Spring (Vivaldi)',
        bpm: 100,
        instrument: 'violin',
        notes: [
            { string: 'E', beat: 1 }, { string: 'G#', beat: 2 }, { string: 'G#', beat: 2.5 },
            { string: 'G#', beat: 3 }, { string: 'F#', beat: 3.5 }, { string: 'E', beat: 4 },
            { string: 'B', beat: 5 }
        ]
    },
    'paganini-24': {
        name: 'Caprice No. 24',
        bpm: 130,
        instrument: 'violin',
        notes: [
            { string: 'A', beat: 1 }, { string: 'C', beat: 1.5 }, { string: 'B', beat: 2 },
            { string: 'E', beat: 2.5 }, { string: 'D', beat: 3 }
        ]
    }
};

// Combined lessons from all instruments
export const lessons = {
    piano: pianoLessons,
    guitar: guitarLessons,
    drums: drumsLessons,
    violin: violinLessons
};

// Chord data for guitar
export const chordData = {
    'G': { frets: [3, 2, 0, 0, 0, 3], fingers: [2, 1, 0, 0, 0, 3], barres: [] },
    'C': { frets: [-1, 3, 2, 0, 1, 0], fingers: [0, 3, 2, 0, 1, 0], barres: [] },
    'D': { frets: [-1, -1, 0, 2, 3, 2], fingers: [0, 0, 0, 1, 3, 2], barres: [] },
    'E': { frets: [0, 2, 2, 1, 0, 0], fingers: [0, 2, 3, 1, 0, 0], barres: [] },
    'A': { frets: [-1, 0, 2, 2, 2, 0], fingers: [0, 0, 1, 2, 3, 0], barres: [] },
    'Em': { frets: [0, 2, 2, 0, 0, 0], fingers: [0, 2, 3, 0, 0, 0], barres: [] },
    'Am': { frets: [-1, 0, 2, 2, 1, 0], fingers: [0, 0, 2, 3, 1, 0], barres: [] },
    'F': { frets: [1, 3, 3, 2, 1, 1], fingers: [1, 3, 4, 2, 1, 1], barres: [{ fret: 1, fromString: 6, toString: 1 }] },
    'Bm': { frets: [-1, 2, 4, 4, 3, 2], fingers: [0, 1, 3, 4, 2, 1], barres: [{ fret: 2, fromString: 5, toString: 1 }] }
};
