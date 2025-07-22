export type FretboardNote = {
  note: string;
  string: number; // 1-6 (de más aguda a más grave)
  fret: number; // 0-24 (0 = cuerda al aire)
  interval: string | undefined,
  isHighlighted?: boolean;
  isSelected?: boolean;
};

export type GuitarString = {
  stringNumber: number;
  openNote: string;
  notes: FretboardNote[];
};

export type FretboardData = {
  strings: GuitarString[];
  totalFrets: number;
};
