import type { FretboardShape } from '@/types/FretboardShape';
import { Interval } from '@/types/Interval';
export const C_Shape: FretboardShape = {
  name: 'C-shape',
  color: 'red',
  notes: [
    { string: 1, fretOffset: 0, interval: Interval.M3 }, // third again
    { string: 2, fretOffset: 1, interval: Interval.R }, // octave
    { string: 3, fretOffset: 0, interval: Interval.P5 }, // fifth
    { string: 4, fretOffset: 2, interval: Interval.M3 }, // major third
    { string: 5, fretOffset: 3, interval: Interval.R }, // root on 5th string
  ],
};

export const A_Shape: FretboardShape = {
  name: 'A-shape',
  color: 'blue',
  notes: [
    { string: 1, fretOffset: 0, interval: Interval.P5 }, // fifth again
    { string: 2, fretOffset: 2, interval: Interval.M3 }, // major third
    { string: 3, fretOffset: 2, interval: Interval.R }, // root
    { string: 4, fretOffset: 2, interval: Interval.P5 }, // fifth
    { string: 5, fretOffset: 0, interval: Interval.R }, // root on 5th string
  ],
};

export const G_Shape: FretboardShape = {
  name: 'G-shape',
  color: 'cyan',
  notes: [
    { string: 1, fretOffset: 3, interval: Interval.R }, // root again
    { string: 2, fretOffset: 3, interval: Interval.P5 }, // fifth again
    { string: 2, fretOffset: 0, interval: Interval.M3 }, // major third
    { string: 3, fretOffset: 0, interval: Interval.R }, // root
    { string: 4, fretOffset: 0, interval: Interval.P5 }, // fifth
    { string: 5, fretOffset: 2, interval: Interval.M3 }, // root on 5th string
    { string: 6, fretOffset: 3, interval: Interval.R }, // root on 5th string
  ],
};

export const E_Shape: FretboardShape = {
  name: 'E-shape',
  color: 'green',
  notes: [
    { string: 1, fretOffset: 0, interval: Interval.R }, // root again
    { string: 2, fretOffset: 0, interval: Interval.P5 }, // fifth again
    { string: 3, fretOffset: 1, interval: Interval.M3 }, // major third
    { string: 4, fretOffset: 2, interval: Interval.R }, // root
    { string: 5, fretOffset: 2, interval: Interval.P5 }, // fifth
    { string: 6, fretOffset: 0, interval: Interval.R }, // root on 5th string
  ],
};

export const D_Shape: FretboardShape = {
  name: 'D-shape',
  color: 'yellow',
  notes: [
    { string: 1, fretOffset: 2, interval: Interval.M3 }, // major third
    { string: 2, fretOffset: 3, interval: Interval.R }, // root
    { string: 3, fretOffset: 2, interval: Interval.P5 }, // fifth
    { string: 4, fretOffset: 0, interval: Interval.R }, // root on 5th string
  ],
};

export const allMajorPositions = [C_Shape, A_Shape, G_Shape, E_Shape, D_Shape];
