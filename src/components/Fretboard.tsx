import React, { useState, useEffect } from 'react';
import type { FretboardData, FretboardNote } from '../types/FretboardNote';
import { generateFretboardData } from '../utils/fretboardData';

interface FretboardProps {
  totalFrets?: number;
  onNoteClick?: (note: FretboardNote) => void;
}

export const Fretboard: React.FC<FretboardProps> = ({ 
  totalFrets = 12, 
  onNoteClick 
}) => {
  const [fretboardData, setFretboardData] = useState<FretboardData | null>(null);

  useEffect(() => {
    const data = generateFretboardData(totalFrets);
    console.log(data);
    setFretboardData(data);
  }, [totalFrets]);

  const handleNoteClick = (note: FretboardNote) => {
    if (onNoteClick) {
      onNoteClick(note);
    }
  };

  if (!fretboardData) {
    return (
      <div className="flex justify-center items-center p-20">
        <div className="text-xl text-white">Cargando diapasón...</div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center p-5 w-full">
      <div className="bg-guitar-brown border-3 border-guitar-dark rounded-lg p-5 shadow-2xl w-full max-w-full overflow-x-auto">
        {/* Encabezado con números de trastes */}
        <div className="flex mb-2.5 w-full">
          <div className="bg-transparent min-w-[60px] mr-2.5 flex-shrink-0"></div>
          {Array.from({ length: fretboardData.totalFrets + 1 }, (_, i) => (
            <div 
              key={i} 
              className="bg-guitar-dark text-gray-100 py-2 px-1 text-center font-bold text-xs rounded min-w-[40px] mr-0.5 flex-1"
            >
              {i+1}
            </div>
          ))}
        </div>

        {/* Cuerdas y notas */}
        {fretboardData.strings.map((guitarString) => (
          <div key={guitarString.stringNumber} className="flex mb-0.5 items-center w-full">
            {/* Etiqueta de la cuerda */}
            <div className="bg-guitar-dark text-gray-100 py-3 px-2 text-center font-bold text-sm rounded min-w-[50px] mr-2.5 flex-shrink-0 flex items-center justify-center">
              {guitarString.openNote}
            </div>
            
            {/* Contenedor de notas de la cuerda */}
            <div className="flex flex-1 gap-0.5 w-full">
              {guitarString.notes.map((note) => (
                <div
                  key={`${note.string}-${note.fret}`}
                  className={`
                    bg-gray-50 border border-gray-300 py-2 px-1 text-center text-xs font-medium cursor-pointer rounded min-w-[40px] min-h-[40px] flex items-center justify-center transition-all duration-200 relative flex-1
                    hover:bg-gray-200 hover:scale-105 hover:shadow-lg
                    ${note.isHighlighted ? 'bg-guitar-gold text-black font-bold shadow-lg' : ''}
                    ${note.isSelected ? 'bg-red-500 text-white font-bold shadow-lg' : ''}
                    ${note.fret === 0 ? 'bg-blue-50 border-blue-500' : ''}
                  `}
                  onClick={() => handleNoteClick(note)}
                  data-fret={note.fret}
                >
                  {note.note}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}; 