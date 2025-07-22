import { useState } from 'react'
import { Fretboard } from './components/Fretboard'
import type { FretboardNote } from './types/FretboardNote'

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
    <div className="min-h-screen bg-gradient-to-br from-slate-800 to-slate-700 text-white overflow-x-hidden">
      <header className="w-full px-5 py-5 bg-black/20 backdrop-blur-md">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-2 drop-shadow-lg">
          🎸 Guitar Trainer
        </h1>
        <p className="text-lg md:text-xl text-center opacity-90">
          Aprende las notas del diapasón de la guitarra
        </p>
      </header>
      
      <main className="flex flex-col items-center gap-5 p-5 w-full">
        <Fretboard 
          totalFrets={12} 
          onNoteClick={handleNoteClick}
        />
        
        {selectedNote && (
          <div className="w-full max-w-2xl bg-white/10 backdrop-blur-md rounded-xl p-5 mt-5 border border-white/20 shadow-2xl">
            <h3 className="text-xl md:text-2xl font-semibold mb-4 text-guitar-gold">
              Nota seleccionada:
            </h3>
            <p className="text-lg md:text-xl mb-2">
              <span className="text-2xl md:text-3xl font-bold text-guitar-gold">
                {selectedNote.note}
              </span>
            </p>
            <p className="text-base md:text-lg opacity-90">
              Cuerda {selectedNote.string}, Traste {selectedNote.fret}
            </p>
          </div>
        )}
      </main>
    </div>
  )
}

export default App
