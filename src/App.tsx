import { useMemo, useState } from 'react';
import { Fretboard } from '@/components/Fretboard';
import { Selector } from '@/components/ui/Selector';
import Switch from '@mui/material/Switch';
import { generateScale, allScales } from './utils/scales';
import type { ScaleType } from '@/utils/scales';
import {
  generateAllPossibleChords,
  generateMajorRootChordStructure,
} from '@/utils/chords';

import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Radio from '@mui/material/Radio';
import { allMajorPositions } from '@/utils/majorShapes';

function App() {
  const [showViewNote, setShowViewNote] = useState(true);
  const [selectedRootNote, setSelectedRootNote] = useState('C');
  const [majorChords] = useState(generateAllPossibleChords(allMajorPositions));
  const [type, setType] = useState<'rootNotes' | 'pentatonic'>('rootNotes');

  const [selectedScaleType, setSelectedScaleType] =
    useState<ScaleType>('major');
  const selectedScale = useMemo(
    () => generateScale(selectedRootNote, selectedScaleType),
    [selectedRootNote, selectedScaleType]
  );
  const chordStructure = useMemo(
    () =>
      generateMajorRootChordStructure(
        `${selectedRootNote} ${selectedScaleType}`,
        type
      ),
    [selectedRootNote, selectedScaleType, majorChords, type]
  );
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setShowViewNote(event.target.checked);
  };

  const handleTypeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setType(
      (event.target as HTMLInputElement).value as 'rootNotes' | 'pentatonic'
    );
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
          <Switch checked={showViewNote} onChange={handleChange} />
          <label>Intervalos</label>
        </div>
        <div className='flex justify-center items-center'>
          <FormControl>
            <FormLabel id='demo-radio-buttons-group-label'>
              Tipo de estructura
            </FormLabel>
            <RadioGroup
              aria-labelledby='demo-radio-buttons-group-label'
              defaultValue='rootNotes'
              name='radio-buttons-group'
              onChange={handleTypeChange}
            >
              <FormControlLabel
                value='rootNotes'
                control={<Radio />}
                label='Raiz'
              />
              <FormControlLabel
                value='pentatonic'
                control={<Radio />}
                label='Pentatónica'
              />
              <FormControlLabel
                value='full'
                control={<Radio />}
                label='Completa'
              />
            </RadioGroup>
          </FormControl>
        </div>
      </div>
      <main className='flex flex-col items-center gap-5 w-full'>
        <Fretboard
          showNotes={!showViewNote}
          selectedScale={selectedScale}
          chordStructure={chordStructure}
        />
      </main>
    </div>
  );
}

export default App;
