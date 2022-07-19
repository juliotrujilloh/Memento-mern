const express = require("express");
const {createNote, getNote, getNotes, deleteNote, updateNote} = require('../controllers/notesControllers');
const router = express.Router();


//GET all notes
router.get("/", getNotes);


//GET single note
router.get('/:id', getNote);


//POST a new note
router.post('/', createNote); 

 
//DELETE a note
router.delete('/:id', deleteNote);


//UPDATE a note
router.patch('/:id', updateNote);


module.exports = router;