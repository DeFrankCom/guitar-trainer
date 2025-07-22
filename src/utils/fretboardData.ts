import type { FretboardData, GuitarString, FretboardNote } from '../types/FretboardNote';

// Definir las notas musicales en orden
const notes = ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'];

// Notas de las cuerdas al aire (de más aguda a más grave)
const openStringNotes = ['E', 'B', 'G', 'D', 'A', 'E'];

// Función para obtener la nota en un traste específico
function getNoteAtFret(openNote: string, fret: number): string {
  const startIndex = notes.indexOf(openNote);
  const noteIndex = (startIndex + fret) % 12;
  return notes[noteIndex];
}

// Función para generar todas las notas de una cuerda
function generateStringNotes(stringNumber: number, openNote: string, totalFrets: number): FretboardNote[] {
  const stringNotes: FretboardNote[] = [];
  
  for (let fret = 0; fret <= totalFrets; fret++) {
    const note = getNoteAtFret(openNote, fret);
    stringNotes.push({
      note,
      string: stringNumber,
      fret,
      isHighlighted: false,
      isSelected: false
    });
  }
  
  return stringNotes;
}

// Función para generar toda la estructura del diapasón
export function generateFretboardData(totalFrets: number = 12): FretboardData {
  const strings: GuitarString[] = [];
  
  for (let i = 0; i < 6; i++) {
    const stringNumber = i + 1;
    const openNote = openStringNotes[i];
    const notes = generateStringNotes(stringNumber, openNote, totalFrets);
    
    strings.push({
      stringNumber,
      openNote,
      notes
    });
  }
  
  return {
    strings,
    totalFrets
  };
} 