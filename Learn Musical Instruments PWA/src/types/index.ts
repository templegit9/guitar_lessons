export type InstrumentType = 'piano' | 'guitar' | 'violin' | 'drums';

export type SkillLevel = 'beginner' | 'intermediate' | 'advanced' | 'expert';

export interface Lesson {
  id: string;
  title: string;
  description: string;
  duration: number; // in minutes
  skillLevel: SkillLevel;
  objectives: string[];
}

export interface Instrument {
  id: InstrumentType;
  name: string;
  description: string;
  marketShare: string;
  accessibility: string;
  icon: string;
  color: string;
  gradient: string;
}

export interface Progress {
  [instrumentId: string]: {
    [lessonId: string]: {
      completed: boolean;
      timeSpent: number;
      lastPracticed?: string;
    };
  };
}
