import { Interval } from './Interval';

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
  color: string;
}

export interface FretboardNote {
  string: 1 | 2 | 3 | 4 | 5 | 6;
  fret: number; // absolute fret on the guitar
  interval: Interval; // what chord‑/scale‑degree it is
}

export interface ChordShape {
  notes: FretboardNote[];
  chord: string;
  chordShape: string;
}

export interface ChordStructure extends ChordShape {
  color: string;
  selectedTypeNotes: FretboardNote[];
}
