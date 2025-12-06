import { useState, useEffect, useRef } from 'react';
import { motion } from 'motion/react';
import { Play, Pause, RotateCcw } from 'lucide-react';

interface PracticeTimerProps {
  onTimeUpdate?: (seconds: number) => void;
}

export function PracticeTimer({ onTimeUpdate }: PracticeTimerProps) {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = window.setInterval(() => {
        setSeconds(s => {
          const newSeconds = s + 1;
          onTimeUpdate?.(newSeconds);
          return newSeconds;
        });
      }, 1000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, onTimeUpdate]);

  const formatTime = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const secs = totalSeconds % 60;

    if (hours > 0) {
      return `${hours}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    }
    return `${minutes}:${secs.toString().padStart(2, '0')}`;
  };

  const handleReset = () => {
    setIsRunning(false);
    setSeconds(0);
    onTimeUpdate?.(0);
  };

  return (
    <div className="flex items-center gap-4 p-6 rounded-2xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20">
      {/* Timer Display */}
      <div className="flex-1">
        <div className="text-sm text-white/60 mb-1">Practice Time</div>
        <div className="text-3xl text-white font-mono tabular-nums">
          {formatTime(seconds)}
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-2">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setIsRunning(!isRunning)}
          className={`p-3 rounded-xl ${
            isRunning 
              ? 'bg-orange-500 hover:bg-orange-600' 
              : 'bg-cyan-500 hover:bg-cyan-600'
          } text-white transition-colors`}
        >
          {isRunning ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={handleReset}
          className="p-3 rounded-xl bg-white/10 hover:bg-white/20 text-white transition-colors"
        >
          <RotateCcw className="w-5 h-5" />
        </motion.button>
      </div>
    </div>
  );
}
