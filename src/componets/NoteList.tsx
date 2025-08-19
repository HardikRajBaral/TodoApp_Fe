import { useState, useEffect } from "react";
import '../assets/css/Notelist.css';
import NoteCard from "./NoteCard";
import type { Note } from "../assets/Types/Notes";

const NoteList = () => {
  const [notes, setNotes] = useState<Note[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
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

    fetchNotes()
  }, [])

  if (isLoading) return <div style={{ textAlign: 'center' }}>Loading...</div>
  if (notes.length === 0) return <div style={{ textAlign: 'center' }}>No notes available</div>

  return (
    <div className="note-list-container">
      <h1 className="note-list-header">Todos</h1>
      <hr className="note-list-divider" />
      <div className="note-grid">
        {notes.map(note => <NoteCard key={note.id} note={note} />)}
      </div>
    </div>
  )
}

export default NoteList;
