import { useState } from "react";
import { Fretboard } from '@/components/Fretboard';
import Switch from '@mui/material/Switch';


function App() {
  const [checked, setChecked] = useState(true);
  const [viewOnlyFunction, setViewOnlyFunction] = useState(true);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };
  const handleVisibility= (event: React.ChangeEvent<HTMLInputElement>) => {
    setViewOnlyFunction(event.target.checked);
  };

  return (
    <div className="flex flex-col justify-center gap-12 min-h-screen bg-linear-to-br from-slate-800 to-slate-700 text-white overflow-x-hidden">
      <header className="w-full px-5 py-5 bg-black/20 backdrop-blur-md">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-2 drop-shadow-lg">
          🎸 Guitar Trainer
        </h1>
        <p className="text-lg md:text-xl text-center opacity-90">
          Aprende las notas del diapasón de la guitarra
        </p>
      </header>
      <div>
        <div>
          <label>Notas</label>
          <Switch
            checked={checked}
            onChange={handleChange}
          />
          <label>Función</label>
        </div>
        <div>
          <label>Todas</label>
          <Switch
            checked={viewOnlyFunction}
            onChange={handleVisibility}
          />
          <label>Función</label>
        </div>
      </div>
      <main className="flex flex-col items-center gap-5 p-5 w-full">
        <Fretboard showNotes={!checked} viewOnlyFunction={viewOnlyFunction} />
      </main>
    </div>
  )
}

export default App
