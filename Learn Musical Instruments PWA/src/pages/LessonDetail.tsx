import { useState } from 'react';
import { motion } from 'motion/react';
import { InstrumentType } from '../types';
import { instruments } from '../data/instruments';
import { lessons } from '../data/lessons';
import { useProgress } from '../hooks/useProgress';
import { PracticeTimer } from '../components/PracticeTimer';
import { Piano3D } from '../components/3d/Piano3D';
import { Guitar3D } from '../components/3d/Guitar3D';
import { Violin3D } from '../components/3d/Violin3D';
import { Drums3D } from '../components/3d/Drums3D';
import { ArrowLeft, CheckCircle2, Target } from 'lucide-react';

interface LessonDetailProps {
  instrumentId: InstrumentType;
  lessonId: string;
  onBack: () => void;
}

const get3DComponent = (id: InstrumentType) => {
  switch (id) {
    case 'piano':
      return <Piano3D animate={false} />;
    case 'guitar':
      return <Guitar3D animate={false} />;
    case 'violin':
      return <Violin3D animate={false} />;
    case 'drums':
      return <Drums3D animate={false} />;
  }
};

export function LessonDetail({ instrumentId, lessonId, onBack }: LessonDetailProps) {
  const { isLessonCompleted, markComplete, updatePracticeTime } = useProgress();
  const [practiceTime, setPracticeTime] = useState(0);
  
  const instrument = instruments.find(i => i.id === instrumentId)!;
  const lesson = lessons[instrumentId].find(l => l.id === lessonId)!;
  const completed = isLessonCompleted(instrumentId, lessonId);

  const handleComplete = () => {
    markComplete(instrumentId, lessonId, practiceTime);
  };

  const handleTimeUpdate = (seconds: number) => {
    setPracticeTime(seconds);
    updatePracticeTime(instrumentId, lessonId, seconds);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-cyan-900 to-slate-950 p-8">
      <div className="max-w-6xl mx-auto">
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
            Back to lessons
          </button>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Column - 3D Model */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
          >
            <div className="h-96 rounded-3xl overflow-hidden bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20">
              {get3DComponent(instrumentId)}
            </div>

            {/* Timer */}
            <div className="mt-6">
              <PracticeTimer onTimeUpdate={handleTimeUpdate} />
            </div>
          </motion.div>

          {/* Right Column - Lesson Content */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="space-y-6"
          >
            {/* Lesson Header */}
            <div className="p-6 rounded-3xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20">
              <div className="flex items-start gap-4 mb-4">
                <span className="text-5xl">{instrument.icon}</span>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h1 className="text-white text-3xl">{lesson.title}</h1>
                    {completed && (
                      <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                    )}
                  </div>
                  <p className="text-white/60">{lesson.description}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 text-sm">
                <div className="px-3 py-1 rounded-lg bg-white/10">
                  <span className="text-white/60">Duration: </span>
                  <span className="text-white">{lesson.duration} min</span>
                </div>
                <div className="px-3 py-1 rounded-lg bg-white/10 capitalize">
                  <span className="text-white">{lesson.skillLevel}</span>
                </div>
              </div>
            </div>

            {/* Learning Objectives */}
            <div className="p-6 rounded-3xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20">
              <div className="flex items-center gap-2 mb-4">
                <Target className="w-5 h-5 text-cyan-400" />
                <h2 className="text-white text-xl">Learning Objectives</h2>
              </div>
              <ul className="space-y-3">
                {lesson.objectives.map((objective, index) => (
                  <motion.li
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <div className="w-6 h-6 rounded-full bg-cyan-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-cyan-400 text-sm">{index + 1}</span>
                    </div>
                    <span className="text-white/80">{objective}</span>
                  </motion.li>
                ))}
              </ul>
            </div>

            {/* Complete Button */}
            {!completed && (
              <motion.button
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={handleComplete}
                className={`w-full py-4 rounded-2xl bg-gradient-to-r ${instrument.gradient} text-white transition-all hover:shadow-lg hover:shadow-cyan-500/50`}
              >
                <div className="flex items-center justify-center gap-2">
                  <CheckCircle2 className="w-5 h-5" />
                  <span>Mark as Complete</span>
                </div>
              </motion.button>
            )}

            {completed && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-6 rounded-2xl bg-teal-500/20 border border-teal-500/30 text-center"
              >
                <CheckCircle2 className="w-12 h-12 text-teal-400 mx-auto mb-3" />
                <div className="text-white text-xl mb-1">Lesson Completed!</div>
                <div className="text-white/60 text-sm">Great work! Keep practicing.</div>
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </div>
  );
}
