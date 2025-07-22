import { useMemo } from 'react';
import type { FC } from 'react';
import type { FretboardNote } from '@/types/FretboardNote';
import cx from 'classnames';

type NoteProps = {
  shapes: Array<string>;
  note: FretboardNote;
  showNoteName: boolean;
  viewOnlyFunction: boolean;
  noteBelongsToScale: boolean;
  noteBelongsToChord: boolean;
  withBorderRight?: boolean;
  isOnLastFret: boolean;
};

export const Note: FC<NoteProps> = ({
  shapes,
  note,
  showNoteName,
  viewOnlyFunction,
  noteBelongsToScale,
  noteBelongsToChord,
  withBorderRight = true,
  isOnLastFret,
}) => {
  const shapeClassname = useMemo(() => {
    if (shapes.length === 0) {
      return 'neutral-note';
    }
    if (shapes.length === 1) {
      return note.interval === '1'
        ? `${shapes[0]}-note-root`
        : `${shapes[0]}-note`;
    }
    return note.interval === '1'
      ? `${shapes.join('-')}-note-root`
      : `${shapes.join('-')}-note`;
  }, [shapes, note]);

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
            'flex items-center justify-center h-[48px] w-[48px] rounded-full border-4 text-xl shadow-lg transition-all duration-200 z-2',
            shapeClassname,
            { 'font-bold': note.interval === '1' || noteBelongsToChord }
          )}
        >
          {showNoteName || !viewOnlyFunction
            ? note.note
            : note.interval === '1'
              ? 'R'
              : note.interval}
        </div>
      )}
    </div>
  );
};
