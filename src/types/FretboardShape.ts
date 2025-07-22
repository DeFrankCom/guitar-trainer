import { Interval } from './Interval';

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

function findRootNoteName(notes: FretboardNote[]): string | null {
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

export interface ShapeNote {
  string: 1 | 2 | 3 | 4 | 5 | 6;
  fretOffset: number; // 0 = same fret as the root, +2 = two frets above, etc.
  interval: Interval;
  // optionally you could add `muted?: boolean` if you want to mark “Xed” strings
}

// 3) A shape is just a name plus a list of these notes:
export interface FretboardShape {
  name: string;
  notes: ShapeNote[];
}

export const C_Shape: FretboardShape = {
  name: 'C-shape',
  notes: [
    { string: 5, fretOffset: 3, interval: Interval.R }, // root on 5th string
    { string: 4, fretOffset: 2, interval: Interval.M3 }, // major third
    { string: 3, fretOffset: 0, interval: Interval.P5 }, // fifth
    { string: 2, fretOffset: 1, interval: Interval.R }, // octave
    { string: 1, fretOffset: 0, interval: Interval.M3 }, // third again
  ],
};

export const A_Shape: FretboardShape = {
  name: 'A-shape',
  notes: [
    { string: 5, fretOffset: 0, interval: Interval.R }, // root on 5th string
    { string: 4, fretOffset: 2, interval: Interval.P5 }, // fifth
    { string: 3, fretOffset: 2, interval: Interval.R }, // root
    { string: 2, fretOffset: 2, interval: Interval.M3 }, // major third
    { string: 1, fretOffset: 0, interval: Interval.P5 }, // fifth again
  ],
};

export const G_Shape: FretboardShape = {
  name: 'G-shape',
  notes: [
    { string: 6, fretOffset: 3, interval: Interval.R }, // root on 5th string
    { string: 4, fretOffset: 0, interval: Interval.P5 }, // fifth
    { string: 3, fretOffset: 0, interval: Interval.R }, // root
    { string: 2, fretOffset: 0, interval: Interval.M3 }, // major third
    { string: 2, fretOffset: 3, interval: Interval.P5 }, // fifth again
    { string: 1, fretOffset: 3, interval: Interval.R }, // root again
  ],
};

export const E_Shape: FretboardShape = {
  name: 'E-shape',
  notes: [
    { string: 6, fretOffset: 0, interval: Interval.R }, // root on 5th string
    { string: 5, fretOffset: 2, interval: Interval.P5 }, // fifth
    { string: 4, fretOffset: 2, interval: Interval.R }, // root
    { string: 3, fretOffset: 1, interval: Interval.M3 }, // major third
    { string: 2, fretOffset: 0, interval: Interval.P5 }, // fifth again
    { string: 1, fretOffset: 0, interval: Interval.R }, // root again
  ],
};

export const D_Shape: FretboardShape = {
  name: 'D-shape',
  notes: [
    { string: 4, fretOffset: 0, interval: Interval.R }, // root on 5th string
    { string: 3, fretOffset: 2, interval: Interval.P5 }, // fifth
    { string: 2, fretOffset: 2, interval: Interval.R }, // root
    { string: 1, fretOffset: 1, interval: Interval.M3 }, // major third
  ],
};

const allPositions = [C_Shape, A_Shape, G_Shape, E_Shape, D_Shape];

interface FretboardNote {
  string: 1 | 2 | 3 | 4 | 5 | 6;
  fret: number; // absolute fret on the guitar
  interval: Interval; // what chord‑/scale‑degree it is
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

export const genDMajorNotes = () => {
  let startingPos = 2;
  let allNotes = [];

  for (const pos of allPositions) {
    const positionNotes = placeShape(pos, startingPos);
    console.log(getChordNameWithRoot(positionNotes));
    startingPos = getHighestFret(positionNotes, Interval.R);
    allNotes.push(positionNotes);
  }
  return allNotes;
};
