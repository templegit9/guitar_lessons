// Lesson data for all levels
export const lessons = {
    beginner: [
        {
            id: 'b1',
            number: 1,
            title: 'Parts of the Guitar',
            description: 'Learn the anatomy of your guitar - headstock, neck, body, frets, and more.',
            duration: '10 min',
            chords: [],
            content: {
                intro: 'Before you start playing, it\'s essential to understand the different parts of your guitar. This knowledge will help you communicate with other musicians and follow along with lessons.',
                sections: [
                    {
                        title: 'The Headstock',
                        text: 'Located at the top of the guitar, the headstock holds the tuning pegs (also called machine heads). These are used to adjust the tension of each string, changing their pitch.'
                    },
                    {
                        title: 'The Neck',
                        text: 'The long piece of wood where you press down strings. It contains the fretboard (fingerboard) with metal frets that divide it into semitones.'
                    },
                    {
                        title: 'The Body',
                        text: 'The large curved section that amplifies sound. Acoustic guitars have a sound hole, while electric guitars have pickups.'
                    },
                    {
                        title: 'The Strings',
                        text: 'Standard guitars have 6 strings, numbered 1-6 from thinnest to thickest. From low to high: E, A, D, G, B, E.'
                    }
                ],
                tips: ['Remember: "Eddie Ate Dynamite Good Bye Eddie" for string names', 'Keep your guitar in a case when not playing to protect it']
            }
        },
        {
            id: 'b2',
            number: 2,
            title: 'How to Hold Your Guitar',
            description: 'Master proper posture and hand positioning for comfortable playing.',
            duration: '8 min',
            chords: [],
            content: {
                intro: 'Good posture and proper positioning are crucial for playing guitar comfortably and avoiding injury. Let\'s establish good habits from the start.',
                sections: [
                    {
                        title: 'Sitting Position',
                        text: 'Sit on a chair without arms. Rest the guitar body on your right thigh (for right-handed players). Keep your back straight and shoulders relaxed.'
                    },
                    {
                        title: 'Left Hand Position',
                        text: 'Curve your fingers naturally. Your thumb should rest behind the neck, roughly opposite your index/middle finger. Keep your wrist relatively straight.'
                    },
                    {
                        title: 'Right Hand Position',
                        text: 'Rest your forearm on the body of the guitar. Your hand should hang naturally over the sound hole or pickups.'
                    }
                ],
                tips: ['Take breaks every 20-30 minutes to prevent strain', 'If anything hurts, stop and adjust your position']
            }
        },
        {
            id: 'b3',
            number: 3,
            title: 'Your First Chord: G Major',
            description: 'Learn to play the G major chord - one of the most common chords in music.',
            duration: '15 min',
            chords: ['G'],
            content: {
                intro: 'The G major chord is one of the most versatile and commonly used chords in popular music. It\'s a great starting point for beginners.',
                sections: [
                    {
                        title: 'Finger Placement',
                        text: 'Index finger on 2nd fret of A string, Middle finger on 3rd fret of low E string, Ring finger on 3rd fret of high E string.'
                    },
                    {
                        title: 'Getting a Clean Sound',
                        text: 'Press firmly with your fingertips, right behind the fret. Make sure your fingers aren\'t touching adjacent strings.'
                    },
                    {
                        title: 'Practice Tips',
                        text: 'Strum all 6 strings slowly, one at a time. Each note should ring clearly without buzzing.'
                    }
                ],
                tips: ['Press close to the fret, not on top of it', 'Keep your thumb behind the neck for better reach']
            }
        },
        {
            id: 'b4',
            number: 4,
            title: 'C Major Chord',
            description: 'Add the C major chord to your repertoire for more song possibilities.',
            duration: '12 min',
            chords: ['C'],
            content: {
                intro: 'The C major chord pairs perfectly with G major and opens up hundreds of songs you can play.',
                sections: [
                    {
                        title: 'Finger Placement',
                        text: 'Index on 1st fret of B string, Middle on 2nd fret of D string, Ring on 3rd fret of A string.'
                    },
                    {
                        title: 'Strumming',
                        text: 'Strum from the A string down - skip the low E string for a cleaner sound.'
                    }
                ],
                tips: ['Arch your fingers to avoid muting adjacent strings', 'Practice switching between G and C slowly']
            }
        },
        {
            id: 'b5',
            number: 5,
            title: 'D Major Chord',
            description: 'Complete the "holy trinity" of beginner chords with D major.',
            duration: '12 min',
            chords: ['D'],
            content: {
                intro: 'With G, C, and D, you can play countless popular songs. D major has a bright, happy sound.',
                sections: [
                    {
                        title: 'Finger Placement',
                        text: 'Index on 2nd fret of G string, Middle on 2nd fret of high E string, Ring on 3rd fret of B string.'
                    },
                    {
                        title: 'Strumming',
                        text: 'Only strum the top 4 strings (D, G, B, E). The low E and A strings are not part of this chord.'
                    }
                ],
                tips: ['Keep your fingers arched like you\'re holding a ball', 'The shape looks like a small triangle']
            }
        },
        {
            id: 'b6',
            number: 6,
            title: 'E Minor Chord',
            description: 'Learn your first minor chord for a more emotional sound.',
            duration: '10 min',
            chords: ['Em'],
            content: {
                intro: 'Minor chords have a sad or moody quality. E minor is one of the easiest chords to play!',
                sections: [
                    {
                        title: 'Finger Placement',
                        text: 'Middle finger on 2nd fret of A string, Ring finger on 2nd fret of D string. That\'s it!'
                    },
                    {
                        title: 'Full Strum',
                        text: 'You can strum all 6 strings for a full, rich sound.'
                    }
                ],
                tips: ['This is a great chord for building finger strength', 'Try switching between Em and G - they share a finger position']
            }
        },
        {
            id: 'b7',
            number: 7,
            title: 'A Minor Chord',
            description: 'Add another minor chord to express different emotions in your playing.',
            duration: '10 min',
            chords: ['Am'],
            content: {
                intro: 'A minor is similar in shape to C major, making transitions between them smooth.',
                sections: [
                    {
                        title: 'Finger Placement',
                        text: 'Index on 1st fret of B string, Middle on 2nd fret of D string, Ring on 2nd fret of G string.'
                    }
                ],
                tips: ['Notice how similar this is to C major - just shift your ring finger!']
            }
        },
        {
            id: 'b8',
            number: 8,
            title: 'Basic Strumming Patterns',
            description: 'Learn fundamental strumming patterns to bring your chords to life.',
            duration: '15 min',
            chords: ['G', 'C', 'D'],
            content: {
                intro: 'Knowing chords is only half the battle - rhythm and strumming patterns are what make music come alive.',
                sections: [
                    {
                        title: 'Down Strums',
                        text: 'Start with simple down strums on each beat: 1, 2, 3, 4. Keep a steady tempo.'
                    },
                    {
                        title: 'Down-Up Pattern',
                        text: 'Add upstrokes between beats: Down-Up-Down-Up. Count: 1-and-2-and-3-and-4-and.'
                    },
                    {
                        title: 'The Classic Pattern',
                        text: 'Down, Down-Up, Up-Down-Up. This works for countless songs!'
                    }
                ],
                tips: ['Use a metronome to keep steady time', 'Relax your wrist - the motion comes from there, not your whole arm']
            }
        },
        {
            id: 'b9',
            number: 9,
            title: 'Reading Chord Charts',
            description: 'Understand how to read chord diagrams and tablature.',
            duration: '10 min',
            chords: [],
            content: {
                intro: 'Chord charts and tabs are the roadmaps for guitarists. Learning to read them opens up a world of songs.',
                sections: [
                    {
                        title: 'Chord Diagrams',
                        text: 'Vertical lines represent strings, horizontal lines are frets. Dots show where to place fingers. X means don\'t play, O means open string.'
                    },
                    {
                        title: 'Tablature (Tabs)',
                        text: 'Six horizontal lines represent six strings. Numbers show which fret to play. Read left to right.'
                    }
                ],
                tips: ['Many free tabs are available online', 'Start with simple songs you already know']
            }
        },
        {
            id: 'b10',
            number: 10,
            title: 'Your First Song: "Three Little Birds"',
            description: 'Put it all together and play your first complete song!',
            duration: '20 min',
            chords: ['A', 'D', 'E'],
            content: {
                intro: 'Bob Marley\'s "Three Little Birds" uses just 3 chords and a simple strumming pattern. Perfect for beginners!',
                sections: [
                    {
                        title: 'The Chord Progression',
                        text: 'The entire song uses A, D, and E. Verse: A - D - A. Chorus: A - D - E - A.'
                    },
                    {
                        title: 'Strumming',
                        text: 'Use a relaxed down-up reggae strumming pattern. Emphasis on the "and" beats.'
                    }
                ],
                tips: ['Don\'t worry about singing at first - focus on the chords', 'Play along with the original recording']
            }
        },
        {
            id: 'b11',
            number: 11,
            title: 'E Major Chord',
            description: 'Learn the powerful E major chord for rock and blues.',
            duration: '12 min',
            chords: ['E'],
            content: {
                intro: 'E major is a full-bodied chord that\'s essential for rock, blues, and country music.',
                sections: [
                    {
                        title: 'Finger Placement',
                        text: 'Index on 1st fret of G string, Middle on 2nd fret of A string, Ring on 2nd fret of D string.'
                    }
                ],
                tips: ['This shape is similar to Am, just shifted down one string']
            }
        },
        {
            id: 'b12',
            number: 12,
            title: 'A Major Chord',
            description: 'Complete your open chord vocabulary with A major.',
            duration: '12 min',
            chords: ['A'],
            content: {
                intro: 'A major is bright and joyful, perfect for country, rock, and pop songs.',
                sections: [
                    {
                        title: 'Finger Placement',
                        text: 'All three fingers on the 2nd fret: Index on D string, Middle on G string, Ring on B string.'
                    }
                ],
                tips: ['Your fingers will be cramped together - that\'s normal!', 'Some players use just one finger to barre all three strings']
            }
        }
    ],

    intermediate: [
        {
            id: 'i1',
            number: 1,
            title: 'Introduction to Barre Chords',
            description: 'Master the technique that unlocks every chord in every key.',
            duration: '20 min',
            chords: ['F'],
            content: {
                intro: 'Barre chords are challenging but essential. They let you play any chord by moving shapes up and down the neck.',
                sections: [
                    {
                        title: 'The Barre Technique',
                        text: 'Use your index finger to press down all strings at once. Position it close to the fret and use the side of your finger.'
                    },
                    {
                        title: 'F Major - Your First Barre',
                        text: 'Index barres all strings at 1st fret. Add the E major shape with remaining fingers on frets 2 and 3.'
                    }
                ],
                tips: ['Don\'t expect to master this in one day - it takes weeks of practice', 'Use your arm weight to help press down, not just finger strength']
            }
        },
        {
            id: 'i2',
            number: 2,
            title: 'Barre Chord: B Minor',
            description: 'Learn the Am-shape barre chord for minor keys.',
            duration: '15 min',
            chords: ['Bm'],
            content: {
                intro: 'B minor uses the Am barre shape. This opens up minor keys all over the fretboard.',
                sections: [
                    {
                        title: 'Finger Placement',
                        text: 'Barre the 2nd fret with your index finger. Place fingers in the Am shape on frets 3 and 4.'
                    }
                ],
                tips: ['If strings buzz, adjust the angle of your barre finger', 'Practice switching between F and Bm']
            }
        },
        {
            id: 'i3',
            number: 3,
            title: 'The Pentatonic Scale',
            description: 'Learn the most important scale for rock, blues, and improvisation.',
            duration: '25 min',
            chords: [],
            content: {
                intro: 'The pentatonic scale is a 5-note scale that sounds good over almost anything. It\'s the foundation of rock guitar.',
                sections: [
                    {
                        title: 'Pattern 1 (Minor Pentatonic)',
                        text: 'Starting on the 5th fret for A minor pentatonic: Learn the box pattern that spans 4 frets.'
                    },
                    {
                        title: 'Practice Exercise',
                        text: 'Play the scale up and down, then try skipping strings and playing patterns.'
                    }
                ],
                tips: ['This is the scale used in almost every guitar solo you\'ve heard', 'Practice with a backing track for context']
            }
        },
        {
            id: 'i4',
            number: 4,
            title: 'Power Chords',
            description: 'Rock out with these two-note powerhouse chords.',
            duration: '15 min',
            chords: ['E5', 'A5', 'G5'],
            content: {
                intro: 'Power chords are the backbone of rock and punk music. Simple but incredibly effective.',
                sections: [
                    {
                        title: 'The Shape',
                        text: 'Just root and fifth - index finger on root, ring finger two frets higher on the string above.'
                    },
                    {
                        title: 'Palm Muting',
                        text: 'Rest the edge of your palm on the strings near the bridge for that chunky rock sound.'
                    }
                ],
                tips: ['Add distortion for the classic rock tone', 'These work anywhere on the fretboard']
            }
        },
        {
            id: 'i5',
            number: 5,
            title: 'Fingerpicking Basics',
            description: 'Develop independence between your picking fingers.',
            duration: '20 min',
            chords: ['C', 'Am', 'G'],
            content: {
                intro: 'Fingerpicking creates a beautiful, flowing sound perfect for folk, classical, and acoustic music.',
                sections: [
                    {
                        title: 'Finger Assignment',
                        text: 'Thumb (p) covers bass strings (E, A, D). Index (i), middle (m), ring (a) cover G, B, high E respectively.'
                    },
                    {
                        title: 'Basic Pattern',
                        text: 'Try: p-i-m-a-m-i in a steady rhythm. Let notes ring together.'
                    }
                ],
                tips: ['Keep your hand anchored on the guitar body', 'Start very slowly and focus on even timing']
            }
        },
        {
            id: 'i6',
            number: 6,
            title: 'Seventh Chords',
            description: 'Add color to your chords with seventh intervals.',
            duration: '18 min',
            chords: ['G7', 'C7', 'D7', 'Am7'],
            content: {
                intro: 'Seventh chords add sophistication and movement to your playing. They\'re essential for blues and jazz.',
                sections: [
                    {
                        title: 'Dominant 7th',
                        text: 'G7, C7, D7 - these create tension that wants to resolve. Perfect for blues.'
                    },
                    {
                        title: 'Minor 7th',
                        text: 'Am7, Em7, Dm7 - smoother, jazzier versions of minor chords.'
                    }
                ],
                tips: ['Try replacing regular chords with 7ths in songs you know']
            }
        },
        {
            id: 'i7',
            number: 7,
            title: 'Palm Muting Technique',
            description: 'Control your sound with this essential rock technique.',
            duration: '12 min',
            chords: ['E5', 'A5'],
            content: {
                intro: 'Palm muting gives you dynamic control and that punchy, percussive sound.',
                sections: [
                    {
                        title: 'Hand Position',
                        text: 'Rest the fleshy part of your palm on the strings, right at the bridge. Not too much or the notes will be dead.'
                    }
                ],
                tips: ['Experiment with palm position for different amounts of muting']
            }
        },
        {
            id: 'i8',
            number: 8,
            title: 'The Blues Shuffle',
            description: 'Learn the foundation of blues rhythm guitar.',
            duration: '20 min',
            chords: ['E', 'A', 'B7'],
            content: {
                intro: 'The shuffled eighth-note feel is what makes the blues swing. It\'s also the foundation of rock and roll.',
                sections: [
                    {
                        title: 'The Shuffle Feel',
                        text: 'Instead of even eighth notes, play long-short, long-short. Count: 1-a-2-a-3-a-4-a.'
                    },
                    {
                        title: '12-Bar Blues',
                        text: 'The classic progression: 4 bars of E, 2 bars of A, 2 bars of E, 1 bar of B7, 1 bar of A, 2 bars of E.'
                    }
                ],
                tips: ['Listen to early rock and roll to internalize the feel']
            }
        },
        {
            id: 'i9',
            number: 9,
            title: 'Capo Fundamentals',
            description: 'Transpose songs easily with this essential tool.',
            duration: '12 min',
            chords: [],
            content: {
                intro: 'A capo clamps across the fretboard, raising the pitch. It lets you play songs in any key using familiar chord shapes.',
                sections: [
                    {
                        title: 'Using a Capo',
                        text: 'Clamp it just behind the fret, not on top. Make sure all strings ring clearly.'
                    },
                    {
                        title: 'Transposing',
                        text: 'Capo on 2nd fret: G shape sounds like A. Each fret raises pitch by one half-step.'
                    }
                ],
                tips: ['Great for matching your voice or playing with other instruments']
            }
        },
        {
            id: 'i10',
            number: 10,
            title: 'Hammer-ons & Pull-offs',
            description: 'Add smooth, fluid transitions to your playing.',
            duration: '18 min',
            chords: [],
            content: {
                intro: 'These legato techniques create flowing lines without picking every note.',
                sections: [
                    {
                        title: 'Hammer-on',
                        text: 'Pick a note, then slam another finger down on a higher fret on the same string.'
                    },
                    {
                        title: 'Pull-off',
                        text: 'The opposite - pick with finger down, then pull it off with a slight sideways motion to sound the lower note.'
                    }
                ],
                tips: ['Start with simple two-note patterns', 'These are essential for soloing']
            }
        },
        {
            id: 'i11',
            number: 11,
            title: 'Slides & Bends',
            description: 'Express yourself with these lead guitar techniques.',
            duration: '18 min',
            chords: [],
            content: {
                intro: 'Slides and bends add vocal-like expression to your playing.',
                sections: [
                    {
                        title: 'Slides',
                        text: 'Pick a note and slide your finger up or down to another fret while keeping pressure.'
                    },
                    {
                        title: 'String Bending',
                        text: 'Push or pull the string to raise its pitch. Use multiple fingers for support.'
                    }
                ],
                tips: ['Listen for the target pitch when bending', 'Quarter-step bends are great for blues']
            }
        },
        {
            id: 'i12',
            number: 12,
            title: 'Song: "Wish You Were Here"',
            description: 'Apply your skills to this Pink Floyd classic.',
            duration: '25 min',
            chords: ['G', 'C', 'D', 'Am', 'Em'],
            content: {
                intro: 'This song combines many techniques: fingerpicking intro, strumming, and simple lead lines.',
                sections: [
                    {
                        title: 'The Intro',
                        text: 'Combines picked notes with chords. Take it phrase by phrase.'
                    },
                    {
                        title: 'Main Chords',
                        text: 'G, C, D, Am, Em in various combinations. Very accessible chord progression.'
                    }
                ],
                tips: ['The intro is iconic - take your time learning it note by note']
            }
        }
    ],

    advanced: [
        {
            id: 'a1',
            number: 1,
            title: 'Music Theory: Intervals',
            description: 'Understand the building blocks of chords and scales.',
            duration: '25 min',
            chords: [],
            content: {
                intro: 'Intervals are the distances between notes. Understanding them unlocks the logic behind music.',
                sections: [
                    {
                        title: 'Basic Intervals',
                        text: 'Minor 2nd (1 fret), Major 2nd (2 frets), Minor 3rd (3 frets), Major 3rd (4 frets), Perfect 4th (5 frets), Perfect 5th (7 frets).'
                    },
                    {
                        title: 'On the Fretboard',
                        text: 'Learn to recognize interval shapes across strings and up the neck.'
                    }
                ],
                tips: ['Train your ear to recognize intervals by sound']
            }
        },
        {
            id: 'a2',
            number: 2,
            title: 'The CAGED System',
            description: 'See the entire fretboard through 5 interconnected patterns.',
            duration: '30 min',
            chords: ['C', 'A', 'G', 'E', 'D'],
            content: {
                intro: 'CAGED connects the 5 open chord shapes across the neck, unlocking the entire fretboard.',
                sections: [
                    {
                        title: 'The Concept',
                        text: 'Each open chord shape can be played as a barre chord and moved anywhere. They connect and overlap.'
                    },
                    {
                        title: 'Application',
                        text: 'Play a C chord using all 5 shapes at different positions up the neck.'
                    }
                ],
                tips: ['This is the key to understanding the fretboard logically']
            }
        },
        {
            id: 'a3',
            number: 3,
            title: 'Major Scale Patterns',
            description: 'Learn all 5 positions of the major scale.',
            duration: '30 min',
            chords: [],
            content: {
                intro: 'The major scale is the foundation of Western music. Master it in every position.',
                sections: [
                    {
                        title: 'The Five Positions',
                        text: 'Each CAGED position has a corresponding major scale pattern. Learn them all.'
                    },
                    {
                        title: 'Connection',
                        text: 'Practice moving smoothly between positions while playing scales.'
                    }
                ],
                tips: ['Practice these with a metronome, gradually increasing speed']
            }
        },
        {
            id: 'a4',
            number: 4,
            title: 'Minor Scale & Modes',
            description: 'Explore the natural minor and introduction to modes.',
            duration: '30 min',
            chords: [],
            content: {
                intro: 'Minor scales and modes add color and emotion to your playing.',
                sections: [
                    {
                        title: 'Natural Minor',
                        text: 'The 6th mode of major scale. Same patterns, just starting from a different note.'
                    },
                    {
                        title: 'Introduction to Modes',
                        text: 'Dorian, Phrygian, Mixolydian - each has a unique character.'
                    }
                ],
                tips: ['Don\'t get overwhelmed - focus on natural minor first']
            }
        },
        {
            id: 'a5',
            number: 5,
            title: 'Advanced Chord Voicings',
            description: 'Go beyond basic chords with jazz voicings.',
            duration: '25 min',
            chords: ['Cmaj7', 'Dm7', 'G9'],
            content: {
                intro: 'Advanced voicings make your rhythm playing more interesting and professional.',
                sections: [
                    {
                        title: 'Shell Voicings',
                        text: 'Root, 3rd, and 7th only - clean and effective for jazz and funk.'
                    },
                    {
                        title: 'Extended Chords',
                        text: '9ths, 11ths, 13ths - add color layers to your chords.'
                    }
                ],
                tips: ['Less is often more - simple voicings can be very effective']
            }
        },
        {
            id: 'a6',
            number: 6,
            title: 'Arpeggios',
            description: 'Play chord tones melodically for sophisticated soloing.',
            duration: '25 min',
            chords: [],
            content: {
                intro: 'Arpeggios outline chords through melodic lines. Essential for jazz and shred guitar.',
                sections: [
                    {
                        title: 'Major & Minor Arpeggios',
                        text: 'Learn common arpeggio shapes across the fretboard.'
                    },
                    {
                        title: 'Application',
                        text: 'Use arpeggios to outline chord changes in a solo.'
                    }
                ],
                tips: ['Start with simple triadic arpeggios before moving to 7th arpeggios']
            }
        },
        {
            id: 'a7',
            number: 7,
            title: 'Fingerstyle Patterns',
            description: 'Advanced fingerpicking for complex arrangements.',
            duration: '25 min',
            chords: [],
            content: {
                intro: 'Advanced fingerstyle lets you play bass, chords, and melody simultaneously.',
                sections: [
                    {
                        title: 'Travis Picking',
                        text: 'Alternating bass with thumb while picking melody with fingers.'
                    },
                    {
                        title: 'Independence',
                        text: 'Develop complete independence between thumb and fingers.'
                    }
                ],
                tips: ['Listen to Chet Atkins and Tommy Emmanuel for inspiration']
            }
        },
        {
            id: 'a8',
            number: 8,
            title: 'String Skipping',
            description: 'Create unique intervals and patterns by skipping strings.',
            duration: '20 min',
            chords: [],
            content: {
                intro: 'String skipping creates wide intervals for a distinctive sound.',
                sections: [
                    {
                        title: 'Technique',
                        text: 'Practice clean picking when jumping over strings. Muting is crucial.'
                    }
                ],
                tips: ['Start slowly and focus on clean execution']
            }
        },
        {
            id: 'a9',
            number: 9,
            title: 'Hybrid Picking',
            description: 'Combine pick and fingers for maximum versatility.',
            duration: '20 min',
            chords: [],
            content: {
                intro: 'Hybrid picking gives you the best of both worlds - pick attack and finger control.',
                sections: [
                    {
                        title: 'The Technique',
                        text: 'Hold pick normally, use middle and ring fingers to pluck higher strings.'
                    }
                ],
                tips: ['Country and chicken pickin\' rely heavily on this technique']
            }
        },
        {
            id: 'a10',
            number: 10,
            title: 'Solo Construction',
            description: 'Learn to build compelling guitar solos.',
            duration: '30 min',
            chords: [],
            content: {
                intro: 'Great solos tell a story with beginning, middle, and end.',
                sections: [
                    {
                        title: 'Phrasing',
                        text: 'Think of your solo as sentences. Leave space. Build tension and release.'
                    },
                    {
                        title: 'Development',
                        text: 'Start simple, gradually add complexity, build to a climax.'
                    }
                ],
                tips: ['Sing your solo before you play it']
            }
        }
    ],

    expert: [
        {
            id: 'e1',
            number: 1,
            title: 'Improvisation Mastery',
            description: 'Develop your unique voice through spontaneous creation.',
            duration: '35 min',
            chords: [],
            content: {
                intro: 'True improvisation comes from deep knowledge combined with intuition and soul.',
                sections: [
                    {
                        title: 'Beyond Scales',
                        text: 'Use chord tones, chromatic approach notes, and motif development.'
                    },
                    {
                        title: 'Listening',
                        text: 'Great improvising is about responding to what you hear, not just playing licks.'
                    }
                ],
                tips: ['Record yourself and listen back critically']
            }
        },
        {
            id: 'e2',
            number: 2,
            title: 'Jazz Chord Melody',
            description: 'Arrange songs with melody, chords, and bass simultaneously.',
            duration: '40 min',
            chords: [],
            content: {
                intro: 'Chord melody arranging is the art of solo jazz guitar.',
                sections: [
                    {
                        title: 'Harmonizing Melody',
                        text: 'Place the melody on top while filling in harmony below.'
                    },
                    {
                        title: 'Voice Leading',
                        text: 'Minimize movement between chords for smooth transitions.'
                    }
                ],
                tips: ['Study the masters: Joe Pass, Wes Montgomery, Ted Greene']
            }
        },
        {
            id: 'e3',
            number: 3,
            title: 'Sweep Picking',
            description: 'Execute lightning-fast arpeggios with economy of motion.',
            duration: '30 min',
            chords: [],
            content: {
                intro: 'Sweep picking allows incredibly fast arpeggio passages.',
                sections: [
                    {
                        title: 'The Motion',
                        text: 'One fluid stroke across multiple strings. Each note cleanly articulated.'
                    },
                    {
                        title: 'Synchronization',
                        text: 'Left and right hands must be perfectly synchronized.'
                    }
                ],
                tips: ['Practice painfully slowly until the motion is effortless']
            }
        },
        {
            id: 'e4',
            number: 4,
            title: 'Two-Hand Tapping',
            description: 'Advanced tapping techniques for lead and rhythmic playing.',
            duration: '30 min',
            chords: [],
            content: {
                intro: 'Tapping opens up possibilities impossible with traditional technique.',
                sections: [
                    {
                        title: 'Basic Tapping',
                        text: 'Use picking hand finger to tap notes on the fretboard.'
                    },
                    {
                        title: 'Eight-Finger Tapping',
                        text: 'Use all fingers of both hands for piano-like passages.'
                    }
                ],
                tips: ['Muting is crucial - use hair ties or muting techniques']
            }
        },
        {
            id: 'e5',
            number: 5,
            title: 'Odd Time Signatures',
            description: 'Break free from 4/4 with complex rhythms.',
            duration: '30 min',
            chords: [],
            content: {
                intro: 'Odd meters add interest and complexity to your music.',
                sections: [
                    {
                        title: 'Common Odd Meters',
                        text: '5/4, 7/8, 9/8 - learn to feel the pulse and subdivisions.'
                    },
                    {
                        title: 'Polyrhythms',
                        text: 'Play patterns that imply different time signatures simultaneously.'
                    }
                ],
                tips: ['Listen to progressive rock and fusion for examples']
            }
        },
        {
            id: 'e6',
            number: 6,
            title: 'Composition Techniques',
            description: 'Write compelling original music.',
            duration: '40 min',
            chords: [],
            content: {
                intro: 'Turn your guitar skills into original compositions.',
                sections: [
                    {
                        title: 'Song Structure',
                        text: 'Explore verse, chorus, bridge and more complex forms.'
                    },
                    {
                        title: 'Development',
                        text: 'Take a simple idea and develop it through variation and transformation.'
                    }
                ],
                tips: ['Keep a recording device handy for ideas']
            }
        },
        {
            id: 'e7',
            number: 7,
            title: 'Advanced Harmonics',
            description: 'Natural, artificial, and pinch harmonics mastery.',
            duration: '25 min',
            chords: [],
            content: {
                intro: 'Harmonics add bell-like tones and screaming sounds to your palette.',
                sections: [
                    {
                        title: 'Natural Harmonics',
                        text: 'Touch string lightly at frets 5, 7, 12 for pure, ringing tones.'
                    },
                    {
                        title: 'Artificial Harmonics',
                        text: 'Fret a note and touch string 12 frets higher with picking hand.'
                    },
                    {
                        title: 'Pinch Harmonics',
                        text: 'Touch string with thumb immediately after picking for screaming sounds.'
                    }
                ],
                tips: ['Bridge pickup and high gain help harmonics ring out']
            }
        },
        {
            id: 'e8',
            number: 8,
            title: 'Performance & Stage Presence',
            description: 'Take your playing from the bedroom to the stage.',
            duration: '30 min',
            chords: [],
            content: {
                intro: 'Being a great performer is about more than just playing the notes.',
                sections: [
                    {
                        title: 'Stage Setup',
                        text: 'Pedalboard layout, amp positioning, monitoring strategies.'
                    },
                    {
                        title: 'Communication',
                        text: 'Connect with your audience and bandmates. Body language matters.'
                    },
                    {
                        title: 'Handling Mistakes',
                        text: 'How to recover gracefully and keep the show going.'
                    }
                ],
                tips: ['Record your performances and watch them to improve stage presence']
            }
        }
    ]
};

// Chord fingering data for diagrams
export const chordData = {
    'G': { frets: [3, 2, 0, 0, 0, 3], fingers: [2, 1, 0, 0, 0, 3], barres: [] },
    'C': { frets: [-1, 3, 2, 0, 1, 0], fingers: [0, 3, 2, 0, 1, 0], barres: [] },
    'D': { frets: [-1, -1, 0, 2, 3, 2], fingers: [0, 0, 0, 1, 3, 2], barres: [] },
    'E': { frets: [0, 2, 2, 1, 0, 0], fingers: [0, 2, 3, 1, 0, 0], barres: [] },
    'A': { frets: [-1, 0, 2, 2, 2, 0], fingers: [0, 0, 1, 2, 3, 0], barres: [] },
    'Em': { frets: [0, 2, 2, 0, 0, 0], fingers: [0, 2, 3, 0, 0, 0], barres: [] },
    'Am': { frets: [-1, 0, 2, 2, 1, 0], fingers: [0, 0, 2, 3, 1, 0], barres: [] },
    'F': { frets: [1, 3, 3, 2, 1, 1], fingers: [1, 3, 4, 2, 1, 1], barres: [{ fret: 1, fromString: 6, toString: 1 }] },
    'Bm': { frets: [-1, 2, 4, 4, 3, 2], fingers: [0, 1, 3, 4, 2, 1], barres: [{ fret: 2, fromString: 5, toString: 1 }] },
    'E5': { frets: [0, 2, 2, -1, -1, -1], fingers: [0, 1, 2, 0, 0, 0], barres: [] },
    'A5': { frets: [-1, 0, 2, 2, -1, -1], fingers: [0, 0, 1, 2, 0, 0], barres: [] },
    'G5': { frets: [3, 5, 5, -1, -1, -1], fingers: [1, 3, 4, 0, 0, 0], barres: [] },
    'G7': { frets: [3, 2, 0, 0, 0, 1], fingers: [3, 2, 0, 0, 0, 1], barres: [] },
    'C7': { frets: [-1, 3, 2, 3, 1, 0], fingers: [0, 3, 2, 4, 1, 0], barres: [] },
    'D7': { frets: [-1, -1, 0, 2, 1, 2], fingers: [0, 0, 0, 2, 1, 3], barres: [] },
    'Am7': { frets: [-1, 0, 2, 0, 1, 0], fingers: [0, 0, 2, 0, 1, 0], barres: [] },
    'B7': { frets: [-1, 2, 1, 2, 0, 2], fingers: [0, 2, 1, 3, 0, 4], barres: [] },
    'Cmaj7': { frets: [-1, 3, 2, 0, 0, 0], fingers: [0, 3, 2, 0, 0, 0], barres: [] },
    'Dm7': { frets: [-1, -1, 0, 2, 1, 1], fingers: [0, 0, 0, 2, 1, 1], barres: [] },
    'G9': { frets: [3, 2, 0, 2, 0, 1], fingers: [3, 2, 0, 4, 0, 1], barres: [] }
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
        icon: '🎸',
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
