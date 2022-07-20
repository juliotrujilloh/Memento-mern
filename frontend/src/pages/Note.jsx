import React, {useEffect} from "react";
import Notes from '../components/notes'
import {useNotesContext} from '../hooks/useNotesContext';

function Note() {

    const {notes, dispatch} = useNotesContext() //Using our own State Component
    

    useEffect(()=>{      
    
        const fetchNotes = async () => {
            const response = await fetch('/api/notes'); //we added the proxy to the upper part of package.json inside our frontend folder;
            const json = await response.json();
            
            if (response.ok) {
                dispatch({type: 'SET_NOTES', payload: json}) //Usage of context
                
            };
        };
        
        fetchNotes();
    },[]);  

	return (
		<div>
            {notes && notes.map((note)=>( 
                <Notes key={note._id} id={note._id} title={note.title} content={note.content} createdAt={note.createdAt}/>
              ))} 
		</div>
	);
};

export default Note;
