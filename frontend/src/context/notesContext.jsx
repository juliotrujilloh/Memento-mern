import { createContext, useReducer} from "react";

export const NotesContext = createContext();

const notesReducer = (state, action) => { //the initial state is the object value of {notes:null} line 27;
    switch (action.type) {
        case 'SET_NOTES':
            return {notes: action.payload} 
        case 'CREATE_NOTE':
            return {
            notes: [action.payload, ...state.notes]
            }    
        case 'DELETE_NOTE':
            return {
            notes: state.notes.filter((note) => note._id !== action.payload._id) //Used a filter to remove the selected item trough it's id;
            }

        default:
            return state;
    };
} ;



export const NotesContextProvider = ({children}) => {

    const [state, dispatch] = useReducer(notesReducer, {
        notes: null
    }); //the dispatch triggers the notesReducer function


    return(
    <NotesContext.Provider value= {{...state, dispatch}}> 
        {children}
    </NotesContext.Provider> 
    ) 
};

