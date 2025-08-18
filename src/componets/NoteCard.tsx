import type { Note } from "../assets/Types/Notes";
import '../assets/css/NoteCard.css';
interface NoteCardProps{
    note: Note;
}
const NoteCard: React.FC<NoteCardProps> =({note})=> {
 return (
    <div className="note-card">
      <h3 className="note-title">{note.title}</h3>
      <p className="note-content">{note.content}</p>
    </div>
  );
};

export default NoteCard;