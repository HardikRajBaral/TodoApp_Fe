import type { Note } from "../assets/Types/Notes";
import "../assets/css/NoteCard.css";

interface NoteCardProps {
  note: Note;
}

const NoteCard = ({ note }: NoteCardProps) => {
  return (
    <div className="note-card">
      <h3 className="note-title">{note.title}</h3>
      <p className="note-description">{note.description}</p>
      <p className="note-date">
        Due: {new Date(note.duedate).toLocaleDateString()}
      </p>
    </div>
  );
};

export default NoteCard;
