import { motion } from 'motion/react';
import { LessonCard } from '../components/LessonCard';
import { InstrumentType, SkillLevel } from '../types';
import { instruments } from '../data/instruments';
import { lessons } from '../data/lessons';
import { useProgress } from '../hooks/useProgress';
import { ArrowLeft, Award } from 'lucide-react';

interface LessonListProps {
  instrumentId: InstrumentType;
  onSelectLesson: (lessonId: string) => void;
  onBack: () => void;
}

const skillLevels: SkillLevel[] = ['beginner', 'intermediate', 'advanced', 'expert'];

export function LessonList({ instrumentId, onSelectLesson, onBack }: LessonListProps) {
  const { isLessonCompleted } = useProgress();
  const instrument = instruments.find(i => i.id === instrumentId)!;
  const instrumentLessons = lessons[instrumentId];

  const completedCount = instrumentLessons.filter(l => 
    isLessonCompleted(instrumentId, l.id)
  ).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-cyan-900 to-slate-950 p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-white/60 hover:text-white mb-8 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to instruments
          </button>

          <div className="flex items-center gap-4 mb-6">
            <span className="text-6xl">{instrument.icon}</span>
            <div>
              <h1 className="text-white text-4xl mb-2">{instrument.name} Lessons</h1>
              <p className="text-white/60">{instrument.description}</p>
            </div>
          </div>

          {/* Progress Summary */}
          <div className="flex items-center gap-6 p-6 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 mb-8">
            <Award className="w-10 h-10 text-cyan-400" />
            <div className="flex-1">
              <div className="text-white/60 text-sm mb-1">Lessons Completed</div>
              <div className="text-white text-2xl">
                {completedCount} / {instrumentLessons.length}
              </div>
            </div>
            <div className="text-right">
              <div className="text-white/60 text-sm mb-1">Progress</div>
              <div className="text-white text-2xl">
                {Math.round((completedCount / instrumentLessons.length) * 100)}%
              </div>
            </div>
          </div>
        </motion.div>

        {/* Lessons by Level */}
        <div className="space-y-8">
          {skillLevels.map((level, levelIndex) => {
            const levelLessons = instrumentLessons.filter(l => l.skillLevel === level);
            if (levelLessons.length === 0) return null;

            return (
              <motion.div
                key={level}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 * levelIndex }}
              >
                <h2 className="text-white text-xl mb-4 capitalize">{level}</h2>
                <div className="space-y-3">
                  {levelLessons.map((lesson, lessonIndex) => (
                    <motion.div
                      key={lesson.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 * levelIndex + 0.05 * lessonIndex }}
                    >
                      <LessonCard
                        lesson={lesson}
                        isCompleted={isLessonCompleted(instrumentId, lesson.id)}
                        color={instrument.color}
                        onClick={() => onSelectLesson(lesson.id)}
                      />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
