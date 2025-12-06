import { Instrument } from '../types';

export const instruments: Instrument[] = [
  {
    id: 'piano',
    name: 'Piano',
    description: 'Master the keys with harmony and melody',
    marketShare: '38% of music students',
    accessibility: 'High - Great for beginners',
    icon: '🎹',
    color: '#06B6D4',
    gradient: 'from-cyan-500 to-blue-600'
  },
  {
    id: 'guitar',
    name: 'Guitar',
    description: 'Strum your way through chords and riffs',
    marketShare: '42% of music students',
    accessibility: 'Very High - Portable & versatile',
    icon: '🎸',
    color: '#F97316',
    gradient: 'from-orange-500 to-red-600'
  },
  {
    id: 'violin',
    name: 'Violin',
    description: 'Create beautiful melodies with precision',
    marketShare: '12% of music students',
    accessibility: 'Medium - Requires patience',
    icon: '🎻',
    color: '#A855F7',
    gradient: 'from-purple-500 to-fuchsia-600'
  },
  {
    id: 'drums',
    name: 'Drums',
    description: 'Feel the rhythm and keep the beat',
    marketShare: '8% of music students',
    accessibility: 'Medium - Space required',
    icon: '🥁',
    color: '#14B8A6',
    gradient: 'from-teal-500 to-emerald-600'
  }
];
