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
    beginner: {
        label: 'Beginner',
        color: '#22c55e',
        icon: '🌱',
        description: 'Master the fundamentals'
    },
    intermediate: {
        label: 'Intermediate',
        color: '#3b82f6',
        icon: '📈',
        description: 'Expand your skills'
    },
    advanced: {
        label: 'Advanced',
        color: '#f59e0b',
        icon: '⚡',
        description: 'Deepen your understanding'
    },
    expert: {
        label: 'Expert',
        color: '#ef4444',
        icon: '🔥',
        description: 'Master your craft'
    }
};

// Lessons organized by instrument and level
export const lessons = {
    piano: {
        beginner: [
            {
                id: 'piano-b1',
                number: 1,
                title: 'Meet Your Piano',
                description: 'Learn the keyboard layout, octaves, and basic hand position.',
                duration: '10 min',
                keys: ['C', 'D', 'E'],
                content: {
                    intro: 'The piano is a wonderful first instrument. Let\'s explore its 88 keys and understand how they\'re organized.',
                    sections: [
                        { title: 'The Keyboard Layout', text: 'The piano has white and black keys arranged in a repeating pattern. White keys are natural notes (A-G), black keys are sharps/flats.' },
                        { title: 'Finding Middle C', text: 'Middle C is your home base. It\'s the C closest to the center of the keyboard, usually near the brand name.' },
                        { title: 'Hand Position', text: 'Curve your fingers naturally, as if holding a ball. Keep wrists level with the keyboard.' }
                    ],
                    tips: ['Number your fingers 1-5, thumb to pinky', 'Practice finding C in every octave']
                }
            },
            {
                id: 'piano-b2',
                number: 2,
                title: 'Playing Your First Notes',
                description: 'Play C, D, E with proper finger technique.',
                duration: '12 min',
                keys: ['C', 'D', 'E'],
                content: {
                    intro: 'Time to make music! We\'ll start with three notes in your right hand.',
                    sections: [
                        { title: 'C-D-E Position', text: 'Place thumb on C, index on D, middle finger on E. These are your first three notes.' },
                        { title: 'Finger Technique', text: 'Press keys with your fingertips, not the pads. Use arm weight, not just finger strength.' }
                    ],
                    tips: ['Keep unused fingers relaxed', 'Listen for even tone across all notes']
                }
            },
            {
                id: 'piano-b3',
                number: 3,
                title: 'The C Major Scale',
                description: 'Learn all white keys from C to C - the foundation of music.',
                duration: '15 min',
                keys: ['C', 'D', 'E', 'F', 'G', 'A', 'B'],
                content: {
                    intro: 'The C major scale uses only white keys, making it perfect for beginners.',
                    sections: [
                        { title: 'Scale Pattern', text: 'C-D-E-F-G-A-B-C. This pattern of whole and half steps defines the major scale.' },
                        { title: 'Fingering', text: 'Right hand: 1-2-3, thumb under, 1-2-3-4-5. Practice this crossover smoothly.' }
                    ],
                    tips: ['Practice hands separately first', 'Use a metronome at slow tempos']
                }
            },
            {
                id: 'piano-b4',
                number: 4,
                title: 'Reading Music: Treble Clef',
                description: 'Decode sheet music for the right hand.',
                duration: '15 min',
                keys: [],
                content: {
                    intro: 'Sheet music is the universal language of musicians. Let\'s learn to read the treble clef.',
                    sections: [
                        { title: 'The Staff', text: 'Five lines and four spaces. Each position represents a different note.' },
                        { title: 'FACE and Every Good Boy', text: 'Spaces spell FACE (bottom to top). Lines are E-G-B-D-F ("Every Good Boy Does Fine").' }
                    ],
                    tips: ['Flash cards help with note recognition', 'Practice naming notes before playing']
                }
            },
            {
                id: 'piano-b5',
                number: 5,
                title: 'Your First Chord: C Major',
                description: 'Combine notes to create harmony.',
                duration: '12 min',
                keys: ['C', 'E', 'G'],
                content: {
                    intro: 'Chords are multiple notes played together. The C major chord is bright and happy.',
                    sections: [
                        { title: 'Building the Chord', text: 'Play C, E, and G together with fingers 1, 3, and 5.' },
                        { title: 'Chord Quality', text: 'Major chords have a happy, bright sound. C major is C-E-G.' }
                    ],
                    tips: ['Press all keys at exactly the same time', 'Listen for balance between notes']
                }
            },
            {
                id: 'piano-b6',
                number: 6,
                title: 'G Major and F Major Chords',
                description: 'Add two more chords to play countless songs.',
                duration: '15 min',
                keys: ['F', 'A', 'C', 'G', 'B', 'D'],
                content: {
                    intro: 'With C, F, and G major chords, you can play hundreds of popular songs.',
                    sections: [
                        { title: 'G Major', text: 'G-B-D. Place your hand in the G position.' },
                        { title: 'F Major', text: 'F-A-C. This completes the primary chords in C major.' }
                    ],
                    tips: ['Practice switching between C, F, and G smoothly']
                }
            }
        ],
        intermediate: [
            {
                id: 'piano-i1',
                number: 1,
                title: 'Left Hand Bass Patterns',
                description: 'Add depth with accompaniment patterns.',
                duration: '18 min',
                keys: [],
                content: {
                    intro: 'The left hand provides the harmonic foundation. Let\'s explore common patterns.',
                    sections: [
                        { title: 'Alberti Bass', text: 'A broken chord pattern: root-fifth-third-fifth. Used extensively in classical music.' },
                        { title: 'Block Chords', text: 'Play all chord notes together on beats 1 and 3.' }
                    ],
                    tips: ['Practice left hand alone until automatic']
                }
            },
            {
                id: 'piano-i2',
                number: 2,
                title: 'Hands Together',
                description: 'Coordinate both hands for complete music.',
                duration: '20 min',
                keys: [],
                content: {
                    intro: 'Playing hands together is the biggest challenge for pianists. Let\'s develop coordination.',
                    sections: [
                        { title: 'Starting Slow', text: 'Begin at half speed or less. Let your brain form the connections.' },
                        { title: 'Rhythmic Unity', text: 'Count aloud while playing. Both hands lock to the beat.' }
                    ],
                    tips: ['If you struggle, go back to hands separate']
                }
            },
            {
                id: 'piano-i3',
                number: 3,
                title: 'Minor Chords & Keys',
                description: 'Explore the emotional depth of minor tonality.',
                duration: '18 min',
                keys: ['A', 'C', 'E'],
                content: {
                    intro: 'Minor chords and keys have a sadder, more introspective quality.',
                    sections: [
                        { title: 'A Minor Chord', text: 'A-C-E. Just one note different from C major, but completely different emotion.' },
                        { title: 'Minor Scale', text: 'The natural minor scale has a different pattern of whole and half steps.' }
                    ],
                    tips: ['Compare C major to A minor - they share the same notes!']
                }
            },
            {
                id: 'piano-i4',
                number: 4,
                title: 'Dynamics and Expression',
                description: 'Bring music to life with volume and feeling.',
                duration: '15 min',
                keys: [],
                content: {
                    intro: 'Music isn\'t just notes - it\'s how you play them.',
                    sections: [
                        { title: 'Dynamic Markings', text: 'pp (very soft) to ff (very loud). Use arm weight to control volume.' },
                        { title: 'Crescendo & Diminuendo', text: 'Gradually getting louder or softer creates emotional journeys.' }
                    ],
                    tips: ['Record yourself and listen for dynamic contrast']
                }
            }
        ],
        advanced: [
            {
                id: 'piano-a1',
                number: 1,
                title: 'Chord Inversions',
                description: 'Smooth voice leading through chord positions.',
                duration: '20 min',
                keys: [],
                content: {
                    intro: 'Inversions let you move between chords without jumping around the keyboard.',
                    sections: [
                        { title: 'Root Position, 1st, 2nd Inversion', text: 'Same notes, different bottom note. C major: C-E-G, E-G-C, G-C-E.' }
                    ],
                    tips: ['Inversions make chord progressions smoother']
                }
            },
            {
                id: 'piano-a2',
                number: 2,
                title: 'Seventh Chords',
                description: 'Add color and complexity to your harmony.',
                duration: '20 min',
                keys: [],
                content: {
                    intro: 'Seventh chords add an extra note for richer, more complex harmony.',
                    sections: [
                        { title: 'Major 7, Minor 7, Dominant 7', text: 'Each has a unique character and function in music.' }
                    ],
                    tips: ['Jazz uses seventh chords almost exclusively']
                }
            }
        ],
        expert: [
            {
                id: 'piano-e1',
                number: 1,
                title: 'Jazz Voicings',
                description: 'Professional chord voicings for jazz piano.',
                duration: '30 min',
                keys: [],
                content: {
                    intro: 'Jazz pianists use specific voicings to create that characteristic sound.',
                    sections: [
                        { title: 'Shell Voicings', text: 'Root, 3rd, and 7th only. Clean and effective.' },
                        { title: 'Rootless Voicings', text: 'Let the bass player handle the root. Use 3-7 or 7-3 combinations.' }
                    ],
                    tips: ['Listen to Bill Evans and Herbie Hancock']
                }
            }
        ]
    },

    guitar: {
        beginner: [
            {
                id: 'guitar-b1',
                number: 1,
                title: 'Parts of the Guitar',
                description: 'Learn the anatomy of your guitar.',
                duration: '10 min',
                chords: [],
                content: {
                    intro: 'Understanding your instrument is the first step to mastery.',
                    sections: [
                        { title: 'The Headstock', text: 'Holds the tuning pegs. Turn them to adjust string tension.' },
                        { title: 'The Neck & Fretboard', text: 'Where you press strings. Metal frets divide it into semitones.' },
                        { title: 'The Body', text: 'Amplifies sound. Acoustic guitars have a sound hole.' }
                    ],
                    tips: ['Remember: E-A-D-G-B-E for string names']
                }
            },
            {
                id: 'guitar-b2',
                number: 2,
                title: 'G Major Chord',
                description: 'Your first chord - opens up hundreds of songs.',
                duration: '15 min',
                chords: ['G'],
                content: {
                    intro: 'G major is one of the most common chords in popular music.',
                    sections: [
                        { title: 'Finger Placement', text: 'Index on 2nd fret A string, middle on 3rd fret low E, ring on 3rd fret high E.' },
                        { title: 'Clean Sound', text: 'Press firmly near the fret. Each string should ring clearly.' }
                    ],
                    tips: ['Strum all 6 strings']
                }
            },
            {
                id: 'guitar-b3',
                number: 3,
                title: 'C and D Major Chords',
                description: 'Complete the beginner chord trio.',
                duration: '15 min',
                chords: ['C', 'D'],
                content: {
                    intro: 'With G, C, and D you can play countless songs.',
                    sections: [
                        { title: 'C Major', text: 'Index on 1st fret B, middle on 2nd fret D, ring on 3rd fret A.' },
                        { title: 'D Major', text: 'Triangle shape on top 4 strings at frets 2-3.' }
                    ],
                    tips: ['Practice switching between all three chords']
                }
            },
            {
                id: 'guitar-b4',
                number: 4,
                title: 'Basic Strumming',
                description: 'Bring your chords to life with rhythm.',
                duration: '15 min',
                chords: ['G', 'C', 'D'],
                content: {
                    intro: 'Strumming patterns are what make guitar music groove.',
                    sections: [
                        { title: 'Down Strums', text: 'Start with steady down strums on each beat: 1-2-3-4.' },
                        { title: 'Down-Up Pattern', text: 'Add upstrokes: Down-Up-Down-Up for a fuller sound.' }
                    ],
                    tips: ['Keep your wrist loose and relaxed']
                }
            },
            {
                id: 'guitar-b5',
                number: 5,
                title: 'E Minor and A Minor',
                description: 'Add emotion with minor chords.',
                duration: '12 min',
                chords: ['Em', 'Am'],
                content: {
                    intro: 'Minor chords have a sad or moody quality.',
                    sections: [
                        { title: 'E Minor', text: 'Just two fingers! Middle and ring on 2nd fret of A and D strings.' },
                        { title: 'A Minor', text: 'Similar to C major shape, shifted slightly.' }
                    ],
                    tips: ['Em is one of the easiest chords to play']
                }
            }
        ],
        intermediate: [
            {
                id: 'guitar-i1',
                number: 1,
                title: 'Barre Chords',
                description: 'Unlock every chord using moveable shapes.',
                duration: '20 min',
                chords: ['F', 'Bm'],
                content: {
                    intro: 'Barre chords are challenging but essential.',
                    sections: [
                        { title: 'The Barre Technique', text: 'Use your index finger to press all strings at once.' },
                        { title: 'F Major', text: 'The notorious F chord. Barre at 1st fret with E major shape.' }
                    ],
                    tips: ['This takes weeks to develop - be patient!']
                }
            },
            {
                id: 'guitar-i2',
                number: 2,
                title: 'Pentatonic Scale',
                description: 'The essential scale for improvisation.',
                duration: '20 min',
                chords: [],
                content: {
                    intro: 'The pentatonic scale is used in virtually every guitar solo.',
                    sections: [
                        { title: 'Box Pattern 1', text: 'The most common pattern, starting at the 5th fret for A minor pentatonic.' }
                    ],
                    tips: ['Practice with backing tracks']
                }
            }
        ],
        advanced: [
            {
                id: 'guitar-a1',
                number: 1,
                title: 'CAGED System',
                description: 'See the entire fretboard as interconnected patterns.',
                duration: '30 min',
                chords: ['C', 'A', 'G', 'E', 'D'],
                content: {
                    intro: 'CAGED connects all chord shapes across the neck.',
                    sections: [
                        { title: 'The Concept', text: 'Each open chord shape can be moved anywhere on the neck.' }
                    ],
                    tips: ['This unlocks the fretboard completely']
                }
            }
        ],
        expert: [
            {
                id: 'guitar-e1',
                number: 1,
                title: 'Sweep Picking',
                description: 'Execute lightning-fast arpeggios.',
                duration: '25 min',
                chords: [],
                content: {
                    intro: 'Sweep picking allows incredibly fast arpeggio passages.',
                    sections: [
                        { title: 'The Motion', text: 'One fluid stroke across multiple strings.' }
                    ],
                    tips: ['Start painfully slowly']
                }
            }
        ]
    },

    violin: {
        beginner: [
            {
                id: 'violin-b1',
                number: 1,
                title: 'Meet Your Violin',
                description: 'Understand the parts and proper handling.',
                duration: '12 min',
                strings: ['G', 'D', 'A', 'E'],
                content: {
                    intro: 'The violin is one of the most expressive instruments ever created.',
                    sections: [
                        { title: 'Parts of the Violin', text: 'Scroll, pegbox, neck, body, f-holes, bridge, tailpiece, and chin rest.' },
                        { title: 'The Bow', text: 'Made of horsehair stretched on a wooden stick. Handle it by the frog.' },
                        { title: 'Rosin', text: 'Apply rosin to the bow hair to create friction on the strings.' }
                    ],
                    tips: ['Always loosen the bow after playing', 'Never touch the bow hair with fingers']
                }
            },
            {
                id: 'violin-b2',
                number: 2,
                title: 'Holding the Violin',
                description: 'Develop proper posture and positioning.',
                duration: '15 min',
                strings: [],
                content: {
                    intro: 'Proper posture is crucial for good tone and preventing injury.',
                    sections: [
                        { title: 'Shoulder Rest', text: 'A shoulder rest helps support the violin. Adjust for comfort.' },
                        { title: 'Chin Rest', text: 'Rest your jaw (not chin) on the chin rest. Support with shoulder, not hand.' },
                        { title: 'Left Hand Position', text: 'Curve fingers, thumb opposite first/second finger, relaxed wrist.' }
                    ],
                    tips: ['Practice holding without playing at first']
                }
            },
            {
                id: 'violin-b3',
                number: 3,
                title: 'Bow Technique Basics',
                description: 'Create your first sounds with proper bowing.',
                duration: '18 min',
                strings: ['A'],
                content: {
                    intro: 'The bow is what creates the violin\'s singing tone.',
                    sections: [
                        { title: 'Bow Hold', text: 'Curved fingers, relaxed grip. Thumb bent and opposite middle finger.' },
                        { title: 'Open Strings', text: 'Draw the bow across one string. Keep it parallel to the bridge.' },
                        { title: 'Bow Speed and Pressure', text: 'Experiment with different speeds and weights for varied tone.' }
                    ],
                    tips: ['Practice long, slow bow strokes']
                }
            },
            {
                id: 'violin-b4',
                number: 4,
                title: 'First Finger Notes',
                description: 'Add notes by stopping the strings.',
                duration: '15 min',
                strings: ['A', 'E'],
                content: {
                    intro: 'Now we\'ll add our first stopped notes with the left hand.',
                    sections: [
                        { title: 'First Position', text: 'Your hand stays in one position, fingers reach different spots.' },
                        { title: 'Finger Placement', text: 'Place fingertip firmly on string. Use tapes as guides initially.' }
                    ],
                    tips: ['Intonation takes time - use a tuner at first']
                }
            },
            {
                id: 'violin-b5',
                number: 5,
                title: 'Playing Simple Scales',
                description: 'Connect notes into flowing musical lines.',
                duration: '18 min',
                strings: ['A', 'E'],
                content: {
                    intro: 'Scales are the foundation of all melody.',
                    sections: [
                        { title: 'A Major Scale', text: 'Two octaves using all four fingers across A and E strings.' }
                    ],
                    tips: ['Practice scales daily for intonation']
                }
            }
        ],
        intermediate: [
            {
                id: 'violin-i1',
                number: 1,
                title: 'Shifting Positions',
                description: 'Expand your range by moving the left hand.',
                duration: '20 min',
                strings: [],
                content: {
                    intro: 'Shifting allows you to play higher notes and different fingerings.',
                    sections: [
                        { title: 'Third Position', text: 'Move hand up so first finger is where third finger was.' }
                    ],
                    tips: ['Practice shifts slowly and listen carefully']
                }
            },
            {
                id: 'violin-i2',
                number: 2,
                title: 'Vibrato',
                description: 'Add warmth and expression to sustained notes.',
                duration: '25 min',
                strings: [],
                content: {
                    intro: 'Vibrato is what makes the violin sing.',
                    sections: [
                        { title: 'Wrist Vibrato', text: 'The most common type. Finger rocks while wrist oscillates.' }
                    ],
                    tips: ['Start with slow, wide oscillations']
                }
            }
        ],
        advanced: [
            {
                id: 'violin-a1',
                number: 1,
                title: 'Double Stops',
                description: 'Play two notes simultaneously.',
                duration: '25 min',
                strings: [],
                content: {
                    intro: 'Double stops add harmony to solo violin playing.',
                    sections: [
                        { title: 'Thirds and Sixths', text: 'The most common intervals for double stops.' }
                    ],
                    tips: ['Intonation is twice as challenging with double stops']
                }
            }
        ],
        expert: [
            {
                id: 'violin-e1',
                number: 1,
                title: 'Advanced Bow Techniques',
                description: 'Spiccato, ricochet, and col legno.',
                duration: '30 min',
                strings: [],
                content: {
                    intro: 'Advanced bow strokes create unique textures.',
                    sections: [
                        { title: 'Spiccato', text: 'Bouncing bow stroke for light, dancing passages.' },
                        { title: 'Ricochet', text: 'Multiple bounces from one bow stroke.' }
                    ],
                    tips: ['These take years to fully develop']
                }
            }
        ]
    },

    drums: {
        beginner: [
            {
                id: 'drums-b1',
                number: 1,
                title: 'The Drum Kit',
                description: 'Understand each part of your drum set.',
                duration: '10 min',
                drums: ['kick', 'snare', 'hihat'],
                content: {
                    intro: 'The drum kit is actually many instruments combined into one.',
                    sections: [
                        { title: 'Bass Drum (Kick)', text: 'The large drum on the floor, played with a foot pedal. Provides the low thump.' },
                        { title: 'Snare Drum', text: 'The main drum, positioned between your legs. Has wires underneath for its distinctive crack.' },
                        { title: 'Hi-Hat', text: 'Two cymbals on a stand with a foot pedal. Provides the time-keeping pulse.' },
                        { title: 'Toms', text: 'Usually 2-3 drums for fills and accents. Mounted above the kick and on floor.' }
                    ],
                    tips: ['Start with just kick, snare, and hi-hat']
                }
            },
            {
                id: 'drums-b2',
                number: 2,
                title: 'Grip and Posture',
                description: 'Hold your sticks properly for power and control.',
                duration: '12 min',
                drums: [],
                content: {
                    intro: 'Good technique prevents injury and improves sound.',
                    sections: [
                        { title: 'Matched Grip', text: 'Both hands hold sticks the same way. Fulcrum between thumb and index.' },
                        { title: 'Seated Position', text: 'Sit up straight, throne at right height, sticks angle naturally to drums.' }
                    ],
                    tips: ['Grip should be firm but not tight']
                }
            },
            {
                id: 'drums-b3',
                number: 3,
                title: 'Your First Beat',
                description: 'Learn the basic rock beat that drives most songs.',
                duration: '15 min',
                drums: ['kick', 'snare', 'hihat'],
                content: {
                    intro: 'This one beat is used in thousands of songs.',
                    sections: [
                        { title: 'The Pattern', text: 'Hi-hat on every 8th note. Kick on 1 and 3. Snare on 2 and 4.' },
                        { title: 'Limb Independence', text: 'Your hands and feet work independently. Start slow!' }
                    ],
                    tips: ['Count out loud: 1-and-2-and-3-and-4-and']
                }
            },
            {
                id: 'drums-b4',
                number: 4,
                title: 'Counting and Timing',
                description: 'Develop rock-solid internal timing.',
                duration: '15 min',
                drums: [],
                content: {
                    intro: 'Drummers are the timekeepers. Your tempo is everything.',
                    sections: [
                        { title: 'Using a Metronome', text: 'Practice with a click track. Start at 60 BPM and work up.' },
                        { title: 'Subdivisions', text: 'Feel the smaller subdivisions even when not playing them.' }
                    ],
                    tips: ['The metronome is your best friend and worst critic']
                }
            },
            {
                id: 'drums-b5',
                number: 5,
                title: 'Simple Fills',
                description: 'Connect sections with tasteful fills.',
                duration: '15 min',
                drums: ['snare', 'tom'],
                content: {
                    intro: 'Fills signal transitions in songs.',
                    sections: [
                        { title: 'Single Stroke Fill', text: 'Move around the toms with alternating sticks.' },
                        { title: 'Timing the Fill', text: 'Usually beat 4 or "3 and 4" leading into a new section.' }
                    ],
                    tips: ['Simple fills are often more musical than complex ones']
                }
            }
        ],
        intermediate: [
            {
                id: 'drums-i1',
                number: 1,
                title: 'Groove Variations',
                description: 'Beyond the basic beat with hi-hat and kick patterns.',
                duration: '20 min',
                drums: ['kick', 'snare', 'hihat'],
                content: {
                    intro: 'Subtle variations make beats more interesting.',
                    sections: [
                        { title: 'Adding Kick Variations', text: 'Add kicks on the "and" of 2 or 4 for more drive.' },
                        { title: 'Open Hi-Hat', text: 'Open the hi-hat on certain beats for accents.' }
                    ],
                    tips: ['Listen to how pro drummers vary patterns slightly']
                }
            },
            {
                id: 'drums-i2',
                number: 2,
                title: 'Rudiments',
                description: 'Build technique with essential sticking patterns.',
                duration: '25 min',
                drums: ['snare'],
                content: {
                    intro: 'Rudiments are the vocabulary of drumming.',
                    sections: [
                        { title: 'Singles and Doubles', text: 'Single stroke roll (RLRL), double stroke roll (RRLL RRLL).' },
                        { title: 'Paradiddle', text: 'RLRR LRLL - accent the first note of each group.' }
                    ],
                    tips: ['Practice rudiments on a pad daily']
                }
            }
        ],
        advanced: [
            {
                id: 'drums-a1',
                number: 1,
                title: 'Complex Time Signatures',
                description: 'Master odd meters like 5/4 and 7/8.',
                duration: '25 min',
                drums: [],
                content: {
                    intro: 'Breaking out of 4/4 opens new creative possibilities.',
                    sections: [
                        { title: '5/4 Time', text: 'Count it as 3+2 or 2+3. Each has a different feel.' }
                    ],
                    tips: ['Listen to prog rock for examples']
                }
            }
        ],
        expert: [
            {
                id: 'drums-e1',
                number: 1,
                title: 'Advanced Independence',
                description: 'Play different patterns with all four limbs.',
                duration: '30 min',
                drums: [],
                content: {
                    intro: 'True independence is the mark of a master drummer.',
                    sections: [
                        { title: 'Jazz Independence', text: 'Ride cymbal pattern while snare and bass drum comp freely.' }
                    ],
                    tips: ['This takes years of daily practice']
                }
            }
        ]
    }
};

// Chord/fingering data for guitar
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
