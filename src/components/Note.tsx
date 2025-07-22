import type { FretboardNote } from '@/types/FretboardNote';
import cx from 'classnames';

const colorMap: Record<string, string> = {
  red: 'border-red-600 text-black',
  redFirst: 'bg-red-500 border-red-600 text-black',
  blue: 'border-blue-600 text-black',
  blueFirst: 'bg-blue-500 border-blue-600 text-black',
  cyan: 'border-cyan-600 text-black',
  cyanFirst: 'bg-cyan-400 border-cyan-600 text-black',
  green: 'border-green-600 text-black',
  greenFirst: 'bg-green-500 border-green-600 text-black',
  yellow: 'border-yellow-500 text-black',
  yellowFirst: 'bg-yellow-400 border-yellow-500 text-black',
  none: '',
};

type NoteProps = {
  shape: string;
  note: FretboardNote;
  showNoteName: boolean;
  viewOnlyFunction: boolean;
  noteBelongsToScale: boolean;
  withBorderRight?: boolean;
  isOnLastFret: boolean;
};

export const Note: React.FC<NoteProps> = ({
  shape,
  note,
  showNoteName,
  viewOnlyFunction,
  noteBelongsToScale,
  withBorderRight = true,
  isOnLastFret,
}) => {
  const colorMapKey =
    note.interval === '1' ? `${shape}-note-root` : `${shape}-note`;
  return (
    <div
      key={note.fret}
      className={cx('flex items-center justify-center min-h-[48px] flex-1', {
        'border-r-[1px]': withBorderRight && !isOnLastFret,
      })}
      style={{ padding: '0.25rem 0' }}
    >
      {noteBelongsToScale && (
        <div
          key={note.fret}
          className={cx(
            'flex items-center justify-center h-[48px] w-[48px] rounded-full border-4 font-bold text-xl shadow-lg transition-all duration-200 z-2',
            colorMapKey ?? 'none'
          )}
        >
          {showNoteName || !viewOnlyFunction ? note.note : note.interval}
        </div>
      )}
    </div>
  );
};
