// Musical scale generator in TypeScript

export type Note = string;
export type ScaleType = 'major' | 'minor' | 'majorPentatonic' | 'minorPentatonic';

// Chromatic scale with all 12 notes
const CHROMATIC_SCALE: Note[] = [
  'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B'
];

// Alternative representation with flats
const CHROMATIC_SCALE_FLATS: Note[] = [
  'C', 'Db', 'D', 'Eb', 'E', 'F', 'Gb', 'G', 'Ab', 'A', 'Bb', 'B'
];

// Scale patterns in semitones
const SCALE_PATTERNS = {
  major: [2, 2, 1, 2, 2, 2, 1],          // W-W-H-W-W-W-H
  minor: [2, 1, 2, 2, 1, 2, 2],          // W-H-W-W-H-W-W
  majorPentatonic: [2, 2, 3, 2, 3],      // W-W-WH-W-WH (5 notes)
  minorPentatonic: [3, 2, 2, 3, 2]       // WH-W-W-WH-W (5 notes)
} as const;

/**
 * Generates a musical scale based on the root note and scale type
 * @param root - The root note (e.g., 'C', 'F#', 'Bb')
 * @param scaleType - 'major', 'minor', 'majorPentatonic', or 'minorPentatonic'
 * @param useFlats - Whether to use flats instead of sharps for accidentals
 * @returns Array of notes in the scale
 */
export function generateScale(root: Note, scaleType: ScaleType, useFlats: boolean = false): Note[] {
  const chromaticScale = useFlats ? CHROMATIC_SCALE_FLATS : CHROMATIC_SCALE;
  const pattern = SCALE_PATTERNS[scaleType];
  
  // Find the starting position of the root note
  let rootIndex = chromaticScale.indexOf(root);
  
  // If not found with current chromatic scale, try the other one
  if (rootIndex === -1) {
    const alternateScale = useFlats ? CHROMATIC_SCALE : CHROMATIC_SCALE_FLATS;
    rootIndex = alternateScale.indexOf(root);
    
    if (rootIndex === -1) {
      throw new Error(`Invalid root note: ${root}`);
    }
    
    // Convert the index to work with our chosen chromatic scale
    // This handles cases where user inputs 'C#' but we want flats, etc.
  }
  
  const scale: Note[] = [root];
  let currentIndex = rootIndex;
  
  // Generate the scale using the pattern
  for (const interval of pattern) {
    currentIndex = (currentIndex + interval) % 12;
    scale.push(chromaticScale[currentIndex]);
  }
  
  return scale;
}

/**
 * Gets the relative minor of a major scale (or relative major of a minor scale)
 * @param root - The root note
 * @param scaleType - The current scale type
 * @returns The relative scale's root note
 */
export function getRelativeScale(root: Note, scaleType: ScaleType): Note {
  const chromaticScale = CHROMATIC_SCALE;
  let rootIndex = chromaticScale.indexOf(root);
  
  if (rootIndex === -1) {
    rootIndex = CHROMATIC_SCALE_FLATS.indexOf(root);
  }
  
  if (rootIndex === -1) {
    throw new Error(`Invalid root note: ${root}`);
  }
  
  if (scaleType === 'major') {
    // Relative minor is 9 semitones up (or 3 semitones down)
    const relativeIndex = (rootIndex + 9) % 12;
    return chromaticScale[relativeIndex];
  } else {
    // Relative major is 3 semitones up
    const relativeIndex = (rootIndex + 3) % 12;
    return chromaticScale[relativeIndex];
  }
}

/**
 * Generates all four scale types for a given root note
 * @param root - The root note
 * @param useFlats - Whether to use flats instead of sharps
 * @returns Object containing major, minor, and pentatonic scales
 */
export function generateAllScales(root: Note, useFlats: boolean = false) {
  return {
    major: generateScale(root, 'major', useFlats),
    minor: generateScale(root, 'minor', useFlats),
    majorPentatonic: generateScale(root, 'majorPentatonic', useFlats),
    minorPentatonic: generateScale(root, 'minorPentatonic', useFlats)
  };
}