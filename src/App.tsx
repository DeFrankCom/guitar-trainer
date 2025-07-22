import { useMemo, useState } from 'react';
import { Fretboard } from '@/components/Fretboard';
import { Selector } from '@/components/ui/Selector';
import Switch from '@mui/material/Switch';
import { generateScale, FULL_CHROMATIC_SCALE, allScales } from './utils/scales';
import type { ScaleType } from '@/utils/scales';
import {
  generateAllPossibleMajorChords,
  generateMajorChordStructure,
} from '@/utils/chords';

function App() {
  const [checked, setChecked] = useState(true);
  const [viewOnlyFunction, setViewOnlyFunction] = useState(false);
  const [selectedRootNote, setSelectedRootNote] = useState('C');
  const [majorChords] = useState(generateAllPossibleMajorChords());
  const [selectedScaleType, setSelectedScaleType] =
    useState<ScaleType>('major');
  const selectedScale = useMemo(
    () => generateScale(selectedRootNote, selectedScaleType),
    [selectedRootNote, selectedScaleType]
  );
  const chordStructure = useMemo(
    () =>
      generateMajorChordStructure(`${selectedRootNote} ${selectedScaleType}`),
    [selectedRootNote, selectedScaleType, majorChords]
  );
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };
  const handleVisibility = (event: React.ChangeEvent<HTMLInputElement>) => {
    setViewOnlyFunction(event.target.checked);
  };

  console.log(chordStructure);

  return (
    <div className='flex flex-col justify-center gap-4 min-h-screen overflow-x-hidden'>
      <header className='w-full px-5 py-5 bg-black/20 backdrop-blur-md'>
        <h1 className='text-4xl md:text-5xl font-bold text-center mb-2 drop-shadow-lg'>
          🎸 Guitar Trainer
        </h1>
        <p className='text-lg md:text-xl text-center opacity-90'>
          Aprende las notas del diapasón de la guitarra
        </p>
      </header>
      <div>
        <div className='flex justify-center items-center'>
          <Selector
            id='note-selector'
            labelId='note-selector-label'
            label='Nota raíz'
            defaultValue={selectedRootNote}
            options={majorChords.rootChords
              .map(chordShape => chordShape.chord.split(' ')[0])
              .sort()}
            onSelectedValue={setSelectedRootNote}
          />
          <Selector
            id='scale-selector'
            labelId='scale-selector-label'
            label='Tipo de escala'
            defaultValue={selectedScaleType}
            options={allScales}
            onSelectedValue={value => setSelectedScaleType(value as ScaleType)}
          />
        </div>
        <div className='flex justify-center items-center'>
          <label>Notas</label>
          <Switch checked={checked} onChange={handleChange} />
          <label>Intervalos</label>
        </div>
        <div className='flex justify-center align-center'>
          <label>Todas</label>
          <Switch checked={viewOnlyFunction} onChange={handleVisibility} />
          <label>Función</label>
        </div>
      </div>
      <main className='flex flex-col items-center gap-5 w-full'>
        <Fretboard
          showNotes={!checked}
          viewOnlyFunction={viewOnlyFunction}
          selectedScale={selectedScale}
        />
      </main>
    </div>
  );
}

export default App;
