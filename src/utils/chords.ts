import _ from 'lodash';
import type {
  ChordShape,
  ChordStructure,
  FretboardNote,
  FretboardShape,
} from '@/types/FretboardShape';
import { Interval } from '@/types/Interval';
import { allMajorPositions } from './majorShapes';
import { allMajorPentatonicPositions } from './majorPentatonicShapes';

const POSITIONS_AVAILABLE = {
  rootNotes: allMajorPositions,
  pentatonic: allMajorPentatonicPositions,
};

const NOTE_NAMES = [
  'C',
  'C#',
  'D',
  'D#',
  'E',
  'F',
  'F#',
  'G',
  'G#',
  'A',
  'A#',
  'B',
];

// Standard tuning: strings 6 → 1
const STRING_TUNINGS: Record<1 | 2 | 3 | 4 | 5 | 6, string> = {
  6: 'E', // low E
  5: 'A',
  4: 'D',
  3: 'G',
  2: 'B',
  1: 'E', // high E
};

function getNoteName(string: 1 | 2 | 3 | 4 | 5 | 6, fret: number): string {
  const openNote = STRING_TUNINGS[string];
  const openIndex = NOTE_NAMES.indexOf(openNote);
  const noteIndex = (openIndex + fret) % 12;
  return NOTE_NAMES[noteIndex];
}

export function findRootNoteName(notes: FretboardNote[]): string | null {
  const root = notes.find(n => n.interval === Interval.R);
  return root ? getNoteName(root.string, root.fret) : null;
}

export function getChordNameWithRoot(notes: FretboardNote[]): string {
  const rootNote = findRootNoteName(notes);
  if (!rootNote) return 'Unknown chord (no root note)';

  const intervals = new Set(notes.map(n => n.interval));
  const has = (i: Interval) => intervals.has(i);

  let quality = '';

  if (has(Interval.M3) && has(Interval.P5)) quality = 'major';
  else if (has(Interval.m3) && has(Interval.P5)) quality = 'minor';
  else if (has(Interval.m3)) quality = 'minor (no 5)';
  else if (has(Interval.M3)) quality = 'major (no 5)';
  else if (has(Interval.P5))
    quality = '5'; // power chord
  else quality = 'unknown';

  return `${rootNote} ${quality}`;
}

export function placeShape(
  shape: FretboardShape,
  rootFret: number
): FretboardNote[] {
  return shape.notes.map(n => ({
    string: n.string,
    fret: rootFret + n.fretOffset,
    interval: n.interval,
  }));
}

export function getHighestFret(
  notes: FretboardNote[],
  interval?: Interval
): number {
  const filteredNotes = interval
    ? notes.filter(note => note.interval === interval)
    : notes;

  if (filteredNotes.length === 0) {
    throw new Error(
      interval
        ? `No notes found for interval: ${interval}`
        : 'No notes provided.'
    );
  }

  return Math.max(...filteredNotes.map(note => note.fret));
}

export function getLowestFret(
  notes: FretboardNote[],
  interval?: Interval
): number {
  const filteredNotes = interval
    ? notes.filter(note => note.interval === interval)
    : notes;

  if (filteredNotes.length === 0) {
    throw new Error(
      interval
        ? `No notes found for interval: ${interval}`
        : 'No notes provided.'
    );
  }

  return Math.min(...filteredNotes.map(note => note.fret));
}

export const generateAllPossibleChords = (positions: FretboardShape[]) => {
  const getLowestChord = (allChords: Array<ChordShape>): ChordShape => {
    let lowestRootPos = Infinity;
    let selectedChord: ChordShape = { notes: [], chordShape: '', chord: '' };
    allChords.forEach(c => {
      const rootPos = getLowestFret(c.notes, Interval.R);
      if (rootPos < lowestRootPos) {
        lowestRootPos = rootPos;
        selectedChord = { ...c };
      }
    });
    return selectedChord;
  };

  const allChords = [];
  for (let i = 0; i <= 12; i++) {
    for (const pos of positions) {
      const positionNotes = placeShape(pos, i);
      allChords.push({
        notes: positionNotes,
        chord: getChordNameWithRoot(positionNotes),
        chordShape: pos.name,
      });
    }
  }
  const groupedChords = _.groupBy(allChords, 'chord');
  const rootChords: Array<ChordShape> = [];
  Object.keys(groupedChords)
    .map(chordName => groupedChords[chordName])
    .map(allChords => {
      rootChords.push(getLowestChord(allChords));
    });
  return {
    allChords: groupedChords,
    rootChords,
  };
};

export const generateMajorRootChordStructure = (
  startingChordName: string,
  type: keyof typeof POSITIONS_AVAILABLE
) => {
  console.log('FOR ', startingChordName);
  const { rootChords } = generateAllPossibleChords(allMajorPositions);
  const chord = rootChords.find(
    chordShape => chordShape.chord === startingChordName
  )!;
  let lowestFret = getLowestFret(chord.notes);
  const allChords: Array<ChordStructure> = [];
  let chordsAdded = 0;
  const selectedPosition = POSITIONS_AVAILABLE[type];
  let posIndex = allMajorPositions.findIndex(
    pos => pos.name === chord.chordShape
  );
  while (chordsAdded < 6) {
    const index = (posIndex + chordsAdded) % 5;
    const nextPosition = allMajorPositions[index];
    if (nextPosition.name === 'C-shape' && chordsAdded) {
      lowestFret -= 1;
    }
    const rootPositionNotes = placeShape(nextPosition, lowestFret);
    const selectedTypeNotes = placeShape(selectedPosition[index], lowestFret);
    lowestFret = getHighestFret(rootPositionNotes, Interval.R);
    allChords.push({
      notes: rootPositionNotes,
      selectedTypeNotes,
      chord: getChordNameWithRoot(rootPositionNotes),
      chordShape: allMajorPositions[index].name,
      color: allMajorPositions[index].color,
    });
    chordsAdded += 1;
  }
  return allChords;
};
