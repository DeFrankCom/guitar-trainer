import React, { useState } from 'react';
import type { FretboardData, FretboardNote } from '@/types/FretboardNote';
import { generateFretboardData } from '@/utils/fretboardData';
import { Note as NoteCmp } from '@/components/Note';
import type { ScaleNote } from '@/utils/scales';
import type { ChordStructure } from '@/types/FretboardShape';

const NUM_FRETS = 14;

type FretboardProps = {
  selectedScale: ScaleNote[];
  chordStructure: ChordStructure[];
  showNotes: boolean;
  viewOnlyFunction: boolean;
};

export const Fretboard: React.FC<FretboardProps> = ({
  showNotes: showNoteName,
  viewOnlyFunction,
  selectedScale,
  chordStructure = [],
}) => {
  const [fretboardData] = useState<FretboardData>(() =>
    generateFretboardData(NUM_FRETS)
  );

  const getChordByNote = (note: FretboardNote): ChordStructure[] => {
    let selectedChords = [];

    for (const chord of chordStructure) {
      const correspondingNote = chord.notes.find(
        n => n.fret === note.fret && n.string === note.string
      );
      if (correspondingNote) {
        selectedChords.push(chord);
      }
    }
    return selectedChords;
  };

  const getNoteOfScale = (note: FretboardNote) => {
    return selectedScale.find(scaleNote => scaleNote.note === note.note);
  };

  console.log(chordStructure);
  return (
    <div className='flex justify-center items-center w-full'>
      <div className='bg-guitar-brown border-3 border-guitar-dark rounded-lg p-5 shadow-2xl w-full max-w-full overflow-x-auto'>
        {/* Encabezado con números de trastes */}
        <div className='flex mb-2.5 w-full'>
          <div className='bg-transparent min-w-[50px] mr-2.5 shrink-0'></div>
          {Array.from({ length: NUM_FRETS }, (_, i) => (
            <div
              key={i}
              className='bg-guitar-dark min-w-[60px] text-black py-2 px-1 text-center font-bold text-xs rounded mr-0.5 flex-1'
            >
              {i + 1}
            </div>
          ))}
        </div>
        {/* Cuerdas y notas */}
        {fretboardData.strings.map(
          (guitarString: FretboardData['strings'][number]) => {
            const zeroNoteChordShape = getChordByNote(guitarString.notes[0])[0];
            const zeroNoteScale = getNoteOfScale(guitarString.notes[0]);
            return (
              <div
                key={guitarString.stringNumber}
                className='flex items-center w-full'
              >
                {/* Nota al aire como círculo */}
                <div className='flex items-center justify-center min-w-[50px] mr-2.5 shrink-0'>
                  <NoteCmp
                    key={0}
                    shapes={[zeroNoteChordShape?.chordShape ?? 'none']}
                    note={{
                      ...guitarString.notes[0],
                      interval: zeroNoteScale?.interval ?? undefined,
                    }}
                    showNoteName={showNoteName}
                    viewOnlyFunction={viewOnlyFunction}
                    noteBelongsToScale={!!zeroNoteScale}
                    noteBelongsToChord={!!zeroNoteChordShape}
                    withBorderRight={false}
                    isOnLastFret={false}
                  />
                </div>
                <div className='relative flex flex-1 gap-0.5 w-full border-l-[4px]'>
                  {guitarString.notes
                    .slice(1)
                    .map((note: FretboardNote, index: number) => {
                      const scaleNote = getNoteOfScale(note);
                      const chordPos = getChordByNote(note);
                      return (
                        <NoteCmp
                          key={note.fret}
                          shapes={chordPos.map(c => c.chordShape) ?? 'none'}
                          note={{
                            ...note,
                            interval: scaleNote?.interval ?? undefined,
                          }}
                          showNoteName={showNoteName}
                          viewOnlyFunction={viewOnlyFunction}
                          noteBelongsToScale={!!scaleNote}
                          noteBelongsToChord={chordPos.length >= 1}
                          isOnLastFret={index + 1 === NUM_FRETS}
                        />
                      );
                    })}
                  <div
                    className='absolute w-full z-1 h-px top-[0] bottom-[0]'
                    style={{
                      margin: 'auto 0',
                      color: 'rgba(170, 170, 170, 0.5)',
                    }}
                  >
                    <hr />
                  </div>
                </div>
              </div>
            );
          }
        )}
      </div>
    </div>
  );
};
