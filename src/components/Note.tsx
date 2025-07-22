import type { FretboardNote } from '@/types/FretboardNote';
import cx from 'classnames';

const colorMap: Record<string, string> = {
  red: 'border-red-600 text-white',
  redFirst: 'bg-red-500 border-red-600 text-white',
  blue: 'border-blue-600 text-white',
  blueFirst: 'bg-blue-500 border-blue-600 text-white',
  cyan: 'border-cyan-600 text-white',
  cyanFirst: 'bg-cyan-400 border-cyan-600 text-white',
  green: 'border-green-600 text-white',
  greenFirst: 'bg-green-500 border-green-600 text-white',
  yellow: 'border-yellow-500 text-white',
  yellowFirst: 'bg-yellow-400 border-yellow-500 text-black',
  none: '',
};

type NoteProps = {
  color: string;
  note: FretboardNote;
  showNoteName: boolean;
  viewOnlyFunction: boolean;
  noteBelongsToScale: boolean;
};

export const Note: React.FC<NoteProps> = ({
  color,
  note,
  showNoteName,
  viewOnlyFunction,
  noteBelongsToScale,
}) => {
  const colorMapKey = note.interval === '1' ? `${color}First` : color;
  return (
    <div
      key={note.fret}
      className='flex items-center justify-center min-h-[48px] flex-1'
    >
      {(noteBelongsToScale || viewOnlyFunction) && (
        <div
          key={note.fret}
          className={cx(
            'flex items-center justify-center h-[48px] w-[48px] rounded-full border-4 font-bold text-xl shadow-lg transition-all duration-200',
            colorMap[colorMapKey ?? 'none']
          )}
        >
          {showNoteName || !viewOnlyFunction ? note.note : note.interval}
        </div>
      )}
    </div>
  );
};
