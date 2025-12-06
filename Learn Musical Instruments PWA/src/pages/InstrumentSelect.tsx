import { motion } from 'motion/react';
import { InstrumentCard } from '../components/InstrumentCard';
import { InstrumentType } from '../types';
import { instruments } from '../data/instruments';
import { lessons } from '../data/lessons';
import { useProgress } from '../hooks/useProgress';
import { Music } from 'lucide-react';

interface InstrumentSelectProps {
  onSelectInstrument: (instrumentId: InstrumentType) => void;
}

export function InstrumentSelect({ onSelectInstrument }: InstrumentSelectProps) {
  const { getInstrumentProgress } = useProgress();

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-cyan-900 to-slate-950 p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center gap-3 mb-4">
            <Music className="w-12 h-12 text-cyan-400" />
            <h1 className="text-white text-5xl">LearnMusic</h1>
          </div>
          <p className="text-white/60 text-xl">
            Master your musical journey with interactive 3D lessons
          </p>
        </motion.div>

        {/* Instrument Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {instruments.map((instrument, index) => (
            <motion.div
              key={instrument.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * index }}
            >
              <InstrumentCard
                instrumentId={instrument.id}
                progress={getInstrumentProgress(instrument.id, lessons[instrument.id].length)}
                onClick={() => onSelectInstrument(instrument.id)}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Footer Info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="mt-16 text-center"
        >
          <div className="inline-flex items-center gap-8 px-8 py-4 rounded-2xl bg-white/5 backdrop-blur-xl border border-white/10">
            <div>
              <div className="text-2xl text-white mb-1">8+</div>
              <div className="text-sm text-white/60">Lessons per instrument</div>
            </div>
            <div className="w-px h-12 bg-white/10" />
            <div>
              <div className="text-2xl text-white mb-1">4</div>
              <div className="text-sm text-white/60">Skill levels</div>
            </div>
            <div className="w-px h-12 bg-white/10" />
            <div>
              <div className="text-2xl text-white mb-1">3D</div>
              <div className="text-sm text-white/60">Interactive models</div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
