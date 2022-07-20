import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import {NotesContextProvider} from './context/notesContext';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <NotesContextProvider>
        < App />
    </NotesContextProvider>
);

//The App is wrapped around the Context Provider so that all the components can have access to it.
