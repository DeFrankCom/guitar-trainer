import type { FretboardNote } from '@/types/FretboardNote';
import type { ShapeFretLocation } from '@/types/ShapeFretLocation';

const colorMap: Record<string, string> = {
    red: 'bg-red-500 border-red-600 text-white',
    blue: 'bg-blue-500 border-blue-600 text-white',
    cyan: 'bg-cyan-400 border-cyan-600 text-white',
    green: 'bg-green-500 border-green-600 text-white',
    yellow: 'bg-yellow-400 border-yellow-500 text-yellow-900',
  };

type NoteProps = {
  pos: ShapeFretLocation;
  note: FretboardNote
};

export const Note: React.FC<NoteProps> = ({pos, note}) => {
  return (
    <div key={note.fret} className="flex items-center justify-center min-h-[40px] flex-1">
      {pos && (
        <div
        key={note.fret}
        className={`flex items-center justify-center h-full min-w-[40px] rounded-full border-2 font-bold text-lg shadow-md ${colorMap[pos.color]}`}
      >
        {pos.label}
      </div>
      )}
    </div>
  )
};