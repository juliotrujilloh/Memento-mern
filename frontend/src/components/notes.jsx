import {useNotesContext} from '../hooks/useNotesContext';
import DeleteRoundedIcon from '@mui/icons-material/DeleteRounded';

const Notes = (note)=>{
    const {dispatch} = useNotesContext() //deconstructing dispatch to access the Reducer;

    const handleClick = async() => {                             //To Handle DELETE
        const response = await fetch('/api/notes/' + note.id, { //The note.id is received as a prop from Note (inside pages);
            method: 'DELETE'
        })

        console.log('/api/notes/' + note.id);

        const json = await response.json();

        if (response.ok) {
            dispatch({type: 'DELETE_NOTE', payload: json})          
        }
    }


    return(
        <div className="note">
            <h1 key={note._id}>{note.title}</h1>
            <p>{note.content}</p>
            
            <button onClick={handleClick}><DeleteRoundedIcon style={{ fontSize: "30px" }}/></button>
        </div>
    )};



export default Notes;

//<p id='created'>{note.createdAt}</p>