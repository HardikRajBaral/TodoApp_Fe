import { useState, useEffect } from "react";
import '../assets/css/Notelist.css';
import NoteCard from "./NoteCard";
import type { Note } from "../assets/Types/Notes";

const NoteList = () => {
  const [notes, setNotes] = useState<Note[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isOpen, setIsOpen] = useState(false)
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [duedate, setDueDate] = useState('')
  const [editNote, setEditNote] = useState<Note | null>(null);

    const fetchNotes = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/todos', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem("token")}`
          },
        })

        if (!res.ok) throw new Error(`Error: ${res.status}`)

        const data = await res.json()
        const mappedNotes: Note[] = data.todos.map((todo: any) => ({
          id: todo._id,
          title: todo.title,
          description: todo.description,
          duedate: todo.duedate,
        }))

        setNotes(mappedNotes)
      } catch (err) {
        console.error('Failed to fetch notes:', err)
      } finally {
        setIsLoading(false)
      }
    }
  useEffect(() => {
    fetchNotes()
  }, [])

  
  const handleSubmit= async(e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try{
      if(editNote){
        const res=await fetch (`http://localhost:5000/api/todos/${editNote.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({
          title,
          description,
          duedate
        })
      })
      if (!res.ok) throw new Error(`Error: ${res.status}`)
      }
      else{
        const res=await fetch ('http://localhost:5000/api/todos/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify({
          title,
          description,
          duedate
        })
      })
      if (!res.ok) throw new Error(`Error: ${res.status}`)
      }
    fetchNotes();
    }catch (err) {
      console.error('Failed to create note:', err)
    }finally {
      setIsOpen(false)
      setTitle('')
      setDescription('')
      setDueDate('')
      setEditNote(null);
    }
  }
  const handleDelete = async (id: string) => {
  try {
    const res = await fetch(`http://localhost:5000/api/todos/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    if (!res.ok) throw new Error(`Error: ${res.status}`);
    fetchNotes(); // refresh after delete
  } catch (err) {
    console.error("Failed to delete note:", err);
  }
  };

  const handleEdit = (note: Note) => {
    setEditNote(note);
    setTitle(note.title);
    setDescription(note.description);
    setDueDate(note.duedate.split('T')[0]); // format date for input
    setIsOpen(true);
  };

  return (
    <div className="note-list-container">
      <h1 className="note-list-header">Todos</h1>

      <hr className="note-list-divider" />
      <div className="note-grid">
        <div className="note-grid">
          {isLoading ? (
            <p style={{ textAlign: 'center' }}>Loading...</p>
          ) : notes.length === 0 ? (
            <div style={{ textAlign: 'center' }}>No notes available</div>
          ) : (
            notes.map(note => <NoteCard key={note.id} note={note} onDelete={handleDelete} onEdit={handleEdit} />)
          )}
        </div>

      </div>
      <div>
        <button className="add-todo-button" onClick={()=>setIsOpen(true)}>+</button>
      </div>
      {isOpen && (
        <div className="form-overlay">
          <div className="form">
            <h2 className="form-header">{editNote?"Update Note":"New Note"}</h2>
            <form onSubmit={handleSubmit}>
              <input 
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
                className="form-input"
                required
              />
              <textarea 
                placeholder="Description"
                value={description}
                onChange={(e)=> setDescription(e.target.value)}
                className="form-textarea"
                required
              />
              <input 
                type="date"
                value={duedate}
                onChange={(e) => setDueDate(e.target.value)}
                className="form-input"
                required
              />
              <button
                type="button"
                className="form-close-button"
                onClick={() => {
                  setIsOpen(false);
                  setEditNote(null);
                  setTitle('');
                  setDescription('');
                  setDueDate(''); 
                }}
              >X</button>
              <button 
              type="submit"
               className="form-button"
               >{editNote?"Update":"Save"}</button>
            </form>

          </div>
        </div>
      )}
    </div>
  )
}

export default NoteList;
