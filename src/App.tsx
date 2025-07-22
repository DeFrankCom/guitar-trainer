import { useState } from 'react'
import { Fretboard } from './components/Fretboard'
import type { FretboardNote } from './types/FretboardNote'
import './App.css'

function App() {
  const [selectedNote, setSelectedNote] = useState<FretboardNote | null>(null);
  const [highlightedNotes, setHighlightedNotes] = useState<FretboardNote[]>([]);

  const handleNoteClick = (note: FretboardNote) => {
    setSelectedNote(note);
    
    // Resaltar todas las notas iguales en el diapasón
    // Esto se implementará más adelante cuando tengamos acceso al estado completo
    console.log('Nota seleccionada:', note);
  };

  return (
    <div className="App">
      <header className="app-header">
        <h1>🎸 Guitar Trainer</h1>
        <p>Aprende las notas del diapasón de la guitarra</p>
      </header>
      
      <main className="app-main">
        <Fretboard 
          totalFrets={12} 
          onNoteClick={handleNoteClick}
        />
        
        {selectedNote && (
          <div className="note-info">
            <h3>Nota seleccionada:</h3>
            <p><strong>{selectedNote.note}</strong></p>
            <p>Cuerda {selectedNote.string}, Traste {selectedNote.fret}</p>
          </div>
        )}
      </main>
    </div>
  )
}

export default App
