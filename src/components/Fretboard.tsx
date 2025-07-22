import React, { useState, useEffect } from 'react';
import type { FretboardData, FretboardNote } from '../types/FretboardNote';
import { generateFretboardData } from '../utils/fretboardData';
import './Fretboard.css';

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
    return <div>Cargando diapasón...</div>;
  }

  return (
    <div className="fretboard-container">
      <div className="fretboard">
        {/* Encabezado con números de trastes */}
        <div className="fret-header">
          <div className="string-label"></div>
          {Array.from({ length: fretboardData.totalFrets + 1 }, (_, i) => (
            <div key={i} className="fret-number">
              {i}
            </div>
          ))}
        </div>

        {/* Cuerdas y notas */}
        {fretboardData.strings.map((guitarString) => (
          <div key={guitarString.stringNumber} className="string-row">
            {/* Etiqueta de la cuerda */}
            <div className="string-label">
              {guitarString.openNote}
            </div>
            
            {/* Contenedor de notas de la cuerda */}
            <div className="fret-notes-container">
              {guitarString.notes.map((note) => (
                <div
                  key={`${note.string}-${note.fret}`}
                  className={`fret-note ${note.isHighlighted ? 'highlighted' : ''} ${note.isSelected ? 'selected' : ''}`}
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