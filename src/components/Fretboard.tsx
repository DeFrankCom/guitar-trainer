import React, { useState } from 'react';
import type { FretboardData, FretboardNote } from '@/types/FretboardNote';
import { generateFretboardData } from '@/utils/fretboardData';
import { Note as NoteCmp } from '@/components/Note';
import type { ScaleNote } from '@/utils/scales';

const NUM_FRETS = 17;

type FretboardProps = {
  selectedScale: ScaleNote[];
  showNotes: boolean;
  viewOnlyFunction: boolean;
};

export const Fretboard: React.FC<FretboardProps> = ({
  showNotes: showNoteName,
  viewOnlyFunction,
  selectedScale,
}) => {
  const [fretboardData] = useState<FretboardData>(() =>
    generateFretboardData(NUM_FRETS)
  );

  return (
    <div className='flex justify-center items-center w-full'>
      <div className='bg-guitar-brown border-3 border-guitar-dark rounded-lg p-5 shadow-2xl w-full max-w-full overflow-x-auto'>
        {/* Encabezado con números de trastes */}
        <div className='flex mb-2.5 w-full'>
          <div className='bg-transparent min-w-[50px] mr-2.5 shrink-0'></div>
          {Array.from({ length: NUM_FRETS }, (_, i) => (
            <div
              key={i}
              className='bg-guitar-dark min-w-[60px] text-gray-100 py-2 px-1 text-center font-bold text-xs rounded mr-0.5 flex-1'
            >
              {i + 1}
            </div>
          ))}
        </div>
        {/* Cuerdas y notas */}
        {fretboardData.strings.map(
          (guitarString: FretboardData['strings'][number]) => (
            <div
              key={guitarString.stringNumber}
              className='flex mb-0.5 items-center w-full'
            >
              <div className='bg-guitar-dark text-gray-100 py-3 px-2 text-center font-bold text-sm rounded min-w-[50px] mr-2.5 shrink-0 flex items-center justify-center'>
                {guitarString.openNote}
              </div>
              <div className='flex flex-1 gap-0.5 w-full'>
                {guitarString.notes.map((note: FretboardNote) => {
                  const scaleNote = selectedScale.find(
                    scaleNote => scaleNote.note === note.note
                  );
                  return (
                    <NoteCmp
                      key={note.fret}
                      color={'none'}
                      note={{
                        ...note,
                        interval: scaleNote?.interval ?? undefined,
                      }}
                      showNoteName={showNoteName}
                      viewOnlyFunction={viewOnlyFunction}
                      noteBelongsToScale={!!scaleNote}
                    />
                  );
                })}
              </div>
            </div>
          )
        )}
      </div>
    </div>
  );
};
