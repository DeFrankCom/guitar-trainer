import { useState } from 'react'
import { Fretboard } from './components/Fretboard'
import type { FretboardNote } from './types/FretboardNote'

function App() {
  return (
    <div className="flex flex-col justify-center gap-[3rem] min-h-screen bg-gradient-to-br from-slate-800 to-slate-700 text-white overflow-x-hidden">
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
        />
      </main>
    </div>
  )
}

export default App
