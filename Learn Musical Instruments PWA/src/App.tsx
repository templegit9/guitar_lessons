import { useState } from 'react';
import { InstrumentType } from './types';
import { InstrumentSelect } from './pages/InstrumentSelect';
import { LessonList } from './pages/LessonList';
import { LessonDetail } from './pages/LessonDetail';

type View = 
  | { type: 'instrument-select' }
  | { type: 'lesson-list'; instrumentId: InstrumentType }
  | { type: 'lesson-detail'; instrumentId: InstrumentType; lessonId: string };

export default function App() {
  const [view, setView] = useState<View>({ type: 'instrument-select' });

  const handleSelectInstrument = (instrumentId: InstrumentType) => {
    setView({ type: 'lesson-list', instrumentId });
  };

  const handleSelectLesson = (lessonId: string) => {
    if (view.type === 'lesson-list') {
      setView({ type: 'lesson-detail', instrumentId: view.instrumentId, lessonId });
    }
  };

  const handleBackToInstruments = () => {
    setView({ type: 'instrument-select' });
  };

  const handleBackToLessons = () => {
    if (view.type === 'lesson-detail') {
      setView({ type: 'lesson-list', instrumentId: view.instrumentId });
    }
  };

  if (view.type === 'instrument-select') {
    return <InstrumentSelect onSelectInstrument={handleSelectInstrument} />;
  }

  if (view.type === 'lesson-list') {
    return (
      <LessonList
        instrumentId={view.instrumentId}
        onSelectLesson={handleSelectLesson}
        onBack={handleBackToInstruments}
      />
    );
  }

  if (view.type === 'lesson-detail') {
    return (
      <LessonDetail
        instrumentId={view.instrumentId}
        lessonId={view.lessonId}
        onBack={handleBackToLessons}
      />
    );
  }

  return null;
}
