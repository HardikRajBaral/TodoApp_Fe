import { useState,useEffect } from "react";
import '../assets/css/Notelist.css';
import NoteCard from "./NoteCard";
import type { Note } from "../assets/Types/Notes";

const NoteList= () => {
    const[notes,setNotes]=useState<Note[]>([])
    const [isloading, setIsLoading] = useState(true);
    useEffect(()=>{
       
        const fetchNotes=async ()=>{
            try{
                const res=await fetch('http://localhost:5000/api/todos',{
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    Authorization: `Bearer ${localStorage.getItem("token")}`},

                })
                if(!res.ok){
                    throw new Error(`Error:${res.status}`);
                }
                const data:Note[]=await res.json()
                setNotes(data);
            }
            catch(err){
                console.error('Failed to fetch notes:', err);   
            }finally{
                setIsLoading(false);
            }
        }
                
        fetchNotes();
    },[])
    if(isloading){
        return <div style={{textAlign:'center'}}>Loading...</div>
    }

    if(notes.length===0){
        return <div style={{textAlign:'center'}}>No notes available</div>
    }
    return(
        <>
        <div className="note-gird">
         {notes.map((note)=>( <NoteCard key={note.id} note={note} />))}
           
        </div>
            
        </>
    )
}
export default NoteList;
