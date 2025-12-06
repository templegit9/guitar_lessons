import { motion } from 'motion/react';
import { Lesson } from '../types';
import { Clock, CheckCircle2, Circle, ChevronRight } from 'lucide-react';

interface LessonCardProps {
  lesson: Lesson;
  isCompleted: boolean;
  color: string;
  onClick: () => void;
}

const levelConfig = {
  beginner: { emoji: '🌱', label: 'Beginner', color: 'text-emerald-400' },
  intermediate: { emoji: '📈', label: 'Intermediate', color: 'text-cyan-400' },
  advanced: { emoji: '⚡', label: 'Advanced', color: 'text-violet-400' },
  expert: { emoji: '🔥', label: 'Expert', color: 'text-rose-400' }
};

export function LessonCard({ lesson, isCompleted, color, onClick }: LessonCardProps) {
  const level = levelConfig[lesson.skillLevel];

  return (
    <motion.div
      whileHover={{ scale: 1.01, x: 8 }}
      whileTap={{ scale: 0.99 }}
      onClick={onClick}
      className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 p-6 cursor-pointer group"
    >
      <div className="flex items-start gap-4">
        {/* Status Icon */}
        <div className="flex-shrink-0 mt-1">
          {isCompleted ? (
            <CheckCircle2 className="w-6 h-6 text-teal-400" />
          ) : (
            <Circle className="w-6 h-6 text-white/30" />
          )}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-lg">{level.emoji}</span>
            <span className={`text-sm ${level.color}`}>{level.label}</span>
          </div>

          <h4 className="text-white mb-2">{lesson.title}</h4>
          <p className="text-white/60 text-sm mb-4">{lesson.description}</p>

          {/* Duration */}
          <div className="flex items-center gap-2 text-sm text-white/50">
            <Clock className="w-4 h-4" />
            <span>{lesson.duration} minutes</span>
          </div>
        </div>

        {/* Arrow */}
        <div className="flex-shrink-0">
          <ChevronRight className="w-5 h-5 text-white/30 group-hover:text-white/60 group-hover:translate-x-1 transition-all" />
        </div>
      </div>

      {/* Hover Effect */}
      <div 
        className="absolute inset-0 opacity-0 group-hover:opacity-5 transition-opacity pointer-events-none"
        style={{ background: color }}
      />
    </motion.div>
  );
}
