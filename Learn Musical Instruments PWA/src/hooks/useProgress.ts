import { useState, useEffect } from 'react';
import { Progress, InstrumentType } from '../types';

const STORAGE_KEY = 'music-learning-progress';

export function useProgress() {
  const [progress, setProgress] = useState<Progress>(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : {};
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  }, [progress]);

  const markComplete = (instrumentId: InstrumentType, lessonId: string, timeSpent: number) => {
    setProgress(prev => ({
      ...prev,
      [instrumentId]: {
        ...prev[instrumentId],
        [lessonId]: {
          completed: true,
          timeSpent,
          lastPracticed: new Date().toISOString()
        }
      }
    }));
  };

  const updatePracticeTime = (instrumentId: InstrumentType, lessonId: string, timeSpent: number) => {
    setProgress(prev => ({
      ...prev,
      [instrumentId]: {
        ...prev[instrumentId],
        [lessonId]: {
          ...prev[instrumentId]?.[lessonId],
          completed: prev[instrumentId]?.[lessonId]?.completed ?? false,
          timeSpent,
          lastPracticed: new Date().toISOString()
        }
      }
    }));
  };

  const getInstrumentProgress = (instrumentId: InstrumentType, totalLessons: number): number => {
    const instrumentProgress = progress[instrumentId] || {};
    const completedCount = Object.values(instrumentProgress).filter(l => l.completed).length;
    return totalLessons > 0 ? Math.round((completedCount / totalLessons) * 100) : 0;
  };

  const isLessonCompleted = (instrumentId: InstrumentType, lessonId: string): boolean => {
    return progress[instrumentId]?.[lessonId]?.completed ?? false;
  };

  return {
    progress,
    markComplete,
    updatePracticeTime,
    getInstrumentProgress,
    isLessonCompleted
  };
}
