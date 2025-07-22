import React, { useState } from 'react';
import type { FretboardData, FretboardNote } from '@/types/FretboardNote';
import { generateFretboardData } from '@/utils/fretboardData';
import { cagedPositions } from '@/utils/cagedPositions';
import { Note } from '@/components/Note';
// Definición de las posiciones, etiquetas y colores según la imagen

const colorMap: Record<string, string> = {
  red: 'bg-red-500 border-red-600 text-white',
  blue: 'bg-blue-500 border-blue-600 text-white',
  cyan: 'bg-cyan-400 border-cyan-600 text-white',
  green: 'bg-green-500 border-green-600 text-white',
  yellow: 'bg-yellow-400 border-yellow-500 text-yellow-900',
};

const NUM_FRETS = 17;

export const Fretboard: React.FC = () => {
  const [fretboardData] = useState<FretboardData>(() => generateFretboardData(NUM_FRETS));

  return (
    <div className="flex justify-center items-center p-5 w-full">
      <div className="bg-guitar-brown border-3 border-guitar-dark rounded-lg p-5 shadow-2xl w-full max-w-full overflow-x-auto">
        {/* Encabezado con números de trastes */}
        <div className="flex mb-2.5 w-full">
          <div className="bg-transparent min-w-[50px] mr-2.5 flex-shrink-0"></div>
          {Array.from({ length: NUM_FRETS }, (_, i) => (
            <div 
              key={i} 
              className="bg-guitar-dark min-w-[60px] text-gray-100 py-2 px-1 text-center font-bold text-xs rounded mr-0.5 flex-1"
            >
              {i+1}
            </div>
          ))}
        </div>
        {/* Cuerdas y notas */}
        {fretboardData.strings.map((guitarString: FretboardData['strings'][number]) => (
          <div key={guitarString.stringNumber} className="flex mb-0.5 items-center w-full">
            <div className="bg-guitar-dark text-gray-100 py-3 px-2 text-center font-bold text-sm rounded min-w-[50px] mr-2.5 flex-shrink-0 flex items-center justify-center">
              {/* Puedes mostrar la nota al aire si lo deseas */}
            </div>
            <div className="flex flex-1 gap-0.5 w-full">
              {guitarString.notes.map((note: FretboardNote) => {
                const pos = cagedPositions.find((p: any) => p.string === note.string && p.fret === note.fret);
                return <Note key={note.fret} pos={pos} note={note} />;
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}; 