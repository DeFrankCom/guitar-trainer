import type { FretboardShape } from '@/types/FretboardShape';
import { Interval } from '@/types/Interval';
export const C_Major_Pentatonic_Shape: FretboardShape = {
  name: 'C-shape',
  color: 'red',
  notes: [
    { string: 1, fretOffset: 0, interval: Interval.M3 },
    { string: 1, fretOffset: 3, interval: Interval.P5 },
    { string: 2, fretOffset: 1, interval: Interval.R },
    { string: 2, fretOffset: 3, interval: Interval.M2 },
    { string: 3, fretOffset: 0, interval: Interval.P5 },
    { string: 3, fretOffset: 2, interval: Interval.M6 },
    { string: 4, fretOffset: 0, interval: Interval.M2 },
    { string: 4, fretOffset: 2, interval: Interval.M3 },
    { string: 5, fretOffset: 0, interval: Interval.M6 },
    { string: 5, fretOffset: 3, interval: Interval.R },
    { string: 6, fretOffset: 0, interval: Interval.M3 },
    { string: 6, fretOffset: 3, interval: Interval.P5 },
  ],
};

export const A_Major_Pentatonic_Shape: FretboardShape = {
  name: 'A-shape',
  color: 'blue',
  notes: [
    { string: 1, fretOffset: 0, interval: Interval.P5 },
    { string: 1, fretOffset: 2, interval: Interval.M6 },
    { string: 2, fretOffset: 0, interval: Interval.M2 },
    { string: 2, fretOffset: 2, interval: Interval.M3 },
    { string: 3, fretOffset: -1, interval: Interval.M6 },
    { string: 3, fretOffset: 2, interval: Interval.R },
    { string: 4, fretOffset: -1, interval: Interval.M3 },
    { string: 4, fretOffset: 2, interval: Interval.P5 },
    { string: 5, fretOffset: 0, interval: Interval.R },
    { string: 5, fretOffset: 2, interval: Interval.M2 },
    { string: 6, fretOffset: 0, interval: Interval.P5 },
    { string: 6, fretOffset: 2, interval: Interval.M6 },
  ],
};

export const G_Major_Pentatonic_Shape: FretboardShape = {
  name: 'G-shape',
  color: 'cyan',
  notes: [
    { string: 1, fretOffset: 0, interval: Interval.M6 },
    { string: 1, fretOffset: 3, interval: Interval.R },
    { string: 2, fretOffset: 0, interval: Interval.M3 },
    { string: 2, fretOffset: 3, interval: Interval.P5 },
    { string: 3, fretOffset: 0, interval: Interval.R },
    { string: 3, fretOffset: 2, interval: Interval.M2 },
    { string: 4, fretOffset: 0, interval: Interval.P5 },
    { string: 4, fretOffset: 2, interval: Interval.M6 },
    { string: 5, fretOffset: 0, interval: Interval.M2 },
    { string: 5, fretOffset: 2, interval: Interval.M3 },
    { string: 6, fretOffset: 0, interval: Interval.M6 },
    { string: 6, fretOffset: 3, interval: Interval.R },
  ],
};

export const E_Major_Pentatonic_Shape: FretboardShape = {
  name: 'E-shape',
  color: 'green',
  notes: [
    { string: 1, fretOffset: 0, interval: Interval.R },
    { string: 1, fretOffset: 2, interval: Interval.M2 },
    { string: 2, fretOffset: 0, interval: Interval.P5 },
    { string: 2, fretOffset: 2, interval: Interval.M6 },
    { string: 3, fretOffset: -1, interval: Interval.M2 },
    { string: 3, fretOffset: 1, interval: Interval.M3 },
    { string: 4, fretOffset: -1, interval: Interval.M6 },
    { string: 4, fretOffset: 2, interval: Interval.R },
    { string: 5, fretOffset: -1, interval: Interval.M3 },
    { string: 5, fretOffset: 2, interval: Interval.P5 },
    { string: 6, fretOffset: 0, interval: Interval.R },
    { string: 6, fretOffset: 2, interval: Interval.M2 },
  ],
};

export const D_Major_Pentatonic_Shape: FretboardShape = {
  name: 'D-shape',
  color: 'yellow',
  notes: [
    { string: 1, fretOffset: 0, interval: Interval.M2 },
    { string: 1, fretOffset: 2, interval: Interval.M3 },
    { string: 2, fretOffset: 0, interval: Interval.M6 },
    { string: 2, fretOffset: 3, interval: Interval.R },
    { string: 3, fretOffset: -1, interval: Interval.P5 },
    { string: 3, fretOffset: 2, interval: Interval.P5 },
    { string: 4, fretOffset: 0, interval: Interval.R },
    { string: 4, fretOffset: 2, interval: Interval.M2 },
    { string: 5, fretOffset: 0, interval: Interval.P5 },
    { string: 5, fretOffset: 2, interval: Interval.M6 },
    { string: 6, fretOffset: 0, interval: Interval.M2 },
    { string: 6, fretOffset: 2, interval: Interval.M3 },
  ],
};

export const allMajorPentatonicPositions = [
  C_Major_Pentatonic_Shape,
  A_Major_Pentatonic_Shape,
  G_Major_Pentatonic_Shape,
  E_Major_Pentatonic_Shape,
  D_Major_Pentatonic_Shape,
];
