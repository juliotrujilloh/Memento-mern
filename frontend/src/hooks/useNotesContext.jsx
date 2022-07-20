import { NotesContext } from "../context/notesContext";
import { useContext} from "react";

export const useNotesContext = () => {
    const context = useContext(NotesContext); //returns the value of the context => value={{state, dispatch}}

    if (!context) {                           //For Errors handling
        throw Error('useNotesContext must be used inside a notesContextProvider')
        };



   return context
};

//In this file we are creating our own State Hook and we'll destructure it to access to the desired components;
