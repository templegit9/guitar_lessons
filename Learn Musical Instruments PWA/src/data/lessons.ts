import { Lesson, InstrumentType } from '../types';

export const lessons: Record<InstrumentType, Lesson[]> = {
  piano: [
    {
      id: 'piano-1',
      title: 'Hand Position & Posture',
      description: 'Learn proper hand placement and sitting position for optimal playing',
      duration: 15,
      skillLevel: 'beginner',
      objectives: ['Correct finger numbering', 'Proper wrist height', 'Relaxed shoulders']
    },
    {
      id: 'piano-2',
      title: 'C Major Scale',
      description: 'Master your first scale with both hands',
      duration: 20,
      skillLevel: 'beginner',
      objectives: ['Right hand C scale', 'Left hand C scale', 'Hands together']
    },
    {
      id: 'piano-3',
      title: 'Basic Chords: C, F, G',
      description: 'Build foundation with essential major chords',
      duration: 25,
      skillLevel: 'beginner',
      objectives: ['Chord shapes', 'Smooth transitions', 'Chord progressions']
    },
    {
      id: 'piano-4',
      title: 'Reading Sheet Music',
      description: 'Understand treble and bass clef notation',
      duration: 30,
      skillLevel: 'intermediate',
      objectives: ['Note recognition', 'Rhythm values', 'Key signatures']
    },
    {
      id: 'piano-5',
      title: 'Minor Scales & Chords',
      description: 'Explore the emotional depth of minor tonalities',
      duration: 25,
      skillLevel: 'intermediate',
      objectives: ['Natural minor scale', 'Minor chord voicings', 'Relative minors']
    },
    {
      id: 'piano-6',
      title: 'Arpeggios & Broken Chords',
      description: 'Develop finger independence and fluidity',
      duration: 30,
      skillLevel: 'advanced',
      objectives: ['Arpeggio patterns', 'Finger crossing', 'Speed development']
    },
    {
      id: 'piano-7',
      title: 'Jazz Voicings',
      description: 'Master sophisticated chord extensions',
      duration: 35,
      skillLevel: 'expert',
      objectives: ['7th chords', '9th & 11th extensions', 'Voicing techniques']
    },
    {
      id: 'piano-8',
      title: 'Classical Repertoire',
      description: 'Perform works by Bach, Mozart, and Chopin',
      duration: 45,
      skillLevel: 'expert',
      objectives: ['Interpretation', 'Dynamics', 'Musical expression']
    }
  ],
  guitar: [
    {
      id: 'guitar-1',
      title: 'Guitar Anatomy & Tuning',
      description: 'Learn the parts of the guitar and how to tune it',
      duration: 15,
      skillLevel: 'beginner',
      objectives: ['String names (EADGBE)', 'Tuning methods', 'Holding position']
    },
    {
      id: 'guitar-2',
      title: 'First Chords: Em, Am, D',
      description: 'Start playing songs with easy open chords',
      duration: 20,
      skillLevel: 'beginner',
      objectives: ['Finger placement', 'Clean strumming', 'Chord changes']
    },
    {
      id: 'guitar-3',
      title: 'Strumming Patterns',
      description: 'Develop rhythm with various strumming techniques',
      duration: 25,
      skillLevel: 'beginner',
      objectives: ['Down strums', 'Up strums', 'Mixed patterns']
    },
    {
      id: 'guitar-4',
      title: 'Barre Chords',
      description: 'Unlock the fretboard with moveable chord shapes',
      duration: 30,
      skillLevel: 'intermediate',
      objectives: ['F major barre', 'Minor barre chords', 'Position shifting']
    },
    {
      id: 'guitar-5',
      title: 'Pentatonic Scales',
      description: 'Learn the foundation of lead guitar and soloing',
      duration: 25,
      skillLevel: 'intermediate',
      objectives: ['Box patterns', 'Improvisation basics', 'Bending notes']
    },
    {
      id: 'guitar-6',
      title: 'Fingerstyle Technique',
      description: 'Play melody and accompaniment simultaneously',
      duration: 35,
      skillLevel: 'advanced',
      objectives: ['Thumb independence', 'Picking patterns', 'Classical pieces']
    },
    {
      id: 'guitar-7',
      title: 'Advanced Soloing',
      description: 'Master modes, arpeggios, and expressive techniques',
      duration: 40,
      skillLevel: 'expert',
      objectives: ['Modal playing', 'Sweep picking', 'Tapping']
    },
    {
      id: 'guitar-8',
      title: 'Music Theory for Guitar',
      description: 'Understand harmony and composition on the fretboard',
      duration: 35,
      skillLevel: 'expert',
      objectives: ['Chord construction', 'Scale harmonization', 'Songwriting']
    }
  ],
  violin: [
    {
      id: 'violin-1',
      title: 'Bow Hold & Posture',
      description: 'Establish proper form for beautiful tone production',
      duration: 20,
      skillLevel: 'beginner',
      objectives: ['Bow grip', 'Violin position', 'Straight bowing']
    },
    {
      id: 'violin-2',
      title: 'Open Strings & Tone',
      description: 'Develop consistent sound on all four strings',
      duration: 25,
      skillLevel: 'beginner',
      objectives: ['String crossing', 'Bow speed', 'Tone quality']
    },
    {
      id: 'violin-3',
      title: 'First Position Fingering',
      description: 'Learn finger placement for basic scales',
      duration: 30,
      skillLevel: 'beginner',
      objectives: ['D major scale', 'Finger spacing', 'Intonation']
    },
    {
      id: 'violin-4',
      title: 'Vibrato Fundamentals',
      description: 'Add warmth and expression to your sound',
      duration: 30,
      skillLevel: 'intermediate',
      objectives: ['Wrist vibrato', 'Arm vibrato', 'Speed control']
    },
    {
      id: 'violin-5',
      title: 'Third Position',
      description: 'Expand your range with position shifting',
      duration: 35,
      skillLevel: 'intermediate',
      objectives: ['Shifting technique', 'Position security', 'Scale studies']
    },
    {
      id: 'violin-6',
      title: 'Double Stops',
      description: 'Play two notes simultaneously for richer harmony',
      duration: 40,
      skillLevel: 'advanced',
      objectives: ['Thirds', 'Sixths', 'Octaves']
    },
    {
      id: 'violin-7',
      title: 'Advanced Bow Techniques',
      description: 'Master spiccato, sautillé, and col legno',
      duration: 40,
      skillLevel: 'expert',
      objectives: ['Off-string strokes', 'Bow articulation', 'Dynamic control']
    },
    {
      id: 'violin-8',
      title: 'Concerto Performance',
      description: 'Perform major violin concertos with artistry',
      duration: 50,
      skillLevel: 'expert',
      objectives: ['Musical interpretation', 'Stage presence', 'Technical mastery']
    }
  ],
  drums: [
    {
      id: 'drums-1',
      title: 'Grip & Stick Control',
      description: 'Learn proper stick grip and basic stroke techniques',
      duration: 15,
      skillLevel: 'beginner',
      objectives: ['Matched grip', 'Rebound control', 'Basic strokes']
    },
    {
      id: 'drums-2',
      title: 'Basic Rock Beat',
      description: 'Play your first complete drum pattern',
      duration: 20,
      skillLevel: 'beginner',
      objectives: ['Hi-hat timing', 'Kick-snare coordination', 'Steady tempo']
    },
    {
      id: 'drums-3',
      title: 'Rudiments: Singles & Doubles',
      description: 'Build technical foundation with essential rudiments',
      duration: 25,
      skillLevel: 'beginner',
      objectives: ['Single stroke roll', 'Double stroke roll', 'Paradiddle']
    },
    {
      id: 'drums-4',
      title: 'Fill Techniques',
      description: 'Add excitement with creative drum fills',
      duration: 25,
      skillLevel: 'intermediate',
      objectives: ['Tom patterns', 'Cymbal crashes', 'Fill placement']
    },
    {
      id: 'drums-5',
      title: 'Genre Styles',
      description: 'Explore beats from rock, jazz, funk, and Latin',
      duration: 30,
      skillLevel: 'intermediate',
      objectives: ['Style characteristics', 'Ghost notes', 'Groove variations']
    },
    {
      id: 'drums-6',
      title: 'Independence Training',
      description: 'Develop four-way limb coordination',
      duration: 35,
      skillLevel: 'advanced',
      objectives: ['Polyrhythms', 'Ostinatos', 'Complex patterns']
    },
    {
      id: 'drums-7',
      title: 'Jazz Drumming',
      description: 'Master swing feel and jazz vocabulary',
      duration: 40,
      skillLevel: 'expert',
      objectives: ['Ride cymbal patterns', 'Brush technique', 'Trading fours']
    },
    {
      id: 'drums-8',
      title: 'Session Drumming',
      description: 'Professional recording and performance techniques',
      duration: 45,
      skillLevel: 'expert',
      objectives: ['Click track playing', 'Chart reading', 'Studio etiquette']
    }
  ]
};
