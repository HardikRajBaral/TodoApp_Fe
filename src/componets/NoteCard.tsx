import type { Note } from "../assets/Types/Notes";
import "../assets/css/NoteCard.css";
import { Edit2, Trash2 } from "lucide-react";

interface NoteCardProps {
  note: Note;
  onDelete?: (id: string) => void;
  onEdit?:(note:Note)=>void;
}

const NoteCard = ({ note,onDelete,onEdit }: NoteCardProps) => {
  return (
    <div className="note-card">
      <h3 className="note-title">{note.title}</h3>
      <p className="note-description">{note.description}</p>
      <div className="note-footer">
        <p className="note-date">
        Due: {new Date(note.duedate).toLocaleDateString()}
      </p>
      <div className="note-actions">
        <button className="icon-btn"
        onClick={()=>onEdit && onEdit(note)}
        > <Edit2 size={18} /></button>
        <button
            className="icon-btn delete"
            onClick={() => onDelete && onDelete(note.id)}
            aria-label="Delete Note"
          >
            <Trash2 size={18} />
          </button>
      </div>

      </div>
    </div>
  );
};

export default NoteCard;
