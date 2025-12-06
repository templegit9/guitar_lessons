import { motion } from 'motion/react';
import { InstrumentType } from '../types';
import { instruments } from '../data/instruments';
import { Piano3D } from './3d/Piano3D';
import { Guitar3D } from './3d/Guitar3D';
import { Violin3D } from './3d/Violin3D';
import { Drums3D } from './3d/Drums3D';
import { TrendingUp, Star } from 'lucide-react';

interface InstrumentCardProps {
  instrumentId: InstrumentType;
  progress: number;
  onClick: () => void;
}

const get3DComponent = (id: InstrumentType) => {
  switch (id) {
    case 'piano':
      return <Piano3D />;
    case 'guitar':
      return <Guitar3D />;
    case 'violin':
      return <Violin3D />;
    case 'drums':
      return <Drums3D />;
  }
};

export function InstrumentCard({ instrumentId, progress, onClick }: InstrumentCardProps) {
  const instrument = instruments.find(i => i.id === instrumentId)!;

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -8 }}
      whileTap={{ scale: 0.98 }}
      onClick={onClick}
      className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-xl border border-white/20 cursor-pointer group"
    >
      {/* 3D Preview */}
      <div className="h-64 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/50 z-10" />
        {get3DComponent(instrument.id)}
      </div>

      {/* Content */}
      <div className="p-6 space-y-4">
        <div className="flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <span className="text-4xl">{instrument.icon}</span>
              <h3 className="text-white">{instrument.name}</h3>
            </div>
            <p className="text-white/60 text-sm">{instrument.description}</p>
          </div>
        </div>

        {/* Stats */}
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm">
            <TrendingUp className="w-4 h-4 text-teal-400" />
            <span className="text-white/80">{instrument.marketShare}</span>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <Star className="w-4 h-4 text-yellow-400" />
            <span className="text-white/80">{instrument.accessibility}</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-white/60">Progress</span>
            <span className="text-white">{progress}%</span>
          </div>
          <div className="h-2 bg-white/10 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 1, delay: 0.2 }}
              className={`h-full bg-gradient-to-r ${instrument.gradient}`}
            />
          </div>
        </div>
      </div>

      {/* Hover Effect */}
      <div className={`absolute inset-0 bg-gradient-to-br ${instrument.gradient} opacity-0 group-hover:opacity-10 transition-opacity pointer-events-none`} />
    </motion.div>
  );
}
