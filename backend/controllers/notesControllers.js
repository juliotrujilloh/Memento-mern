const Note = require("../models/note_model"); //We are using this new file to handle all the DB logic
const mongoose = require('mongoose');

//get all notes
const getNotes = async (req, res) =>{
    const notes = await Note.find({}).sort({createdAt: -1}) //-1 for the new ones to be places at the top or first;

    res.status(200).json(notes);
};

//get a single note
const getNote = async (req, res) => {
    const {id} = req.params;
    //We are catching an error about an id not equal to string or 24hex since its not a mongoose or mongodb type of id;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({error: "No such note"})
    };

    const note = await Note.findById(id);

    if (!note) {
        return res.status(400).json({error: "No such note"})
        //we have to return so that the rest of the code doesn't get fired;     
    };
    
    res.status(200).json(note);
};

//create a new note
const createNote = async(req, res) => {
    const {title, content} = req.body;
    //add document to DB
    try {
        const note = await Note.create({title, content})
        res.status(200).json(note);        
    } catch (error) {
        res.status(400).json({error: error.message});
    };

};


//delete a note
const deleteNote = async (req, res) => {
    const {id} = req.params;
    //Catching if theres an error;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({error: "No such note"});
    };

    const note = await Note.findOneAndDelete({_id: id})

    if (!note) {
        return res.status(400).json({error: "No such note"})
             
    };

    res.status(200).json(note);

};

//update a note
const updateNote = async (req, res) =>{
    const {id} = req.params;
    //Catching error;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({error: "No such note"});
    };

    const note = await Note.findOneAndUpdate({_id: id}, {
        ...req.body                 //it updates all the properties on the body of the document;
    });

    if (!note) {
        return res.status(400).json({error: "No such note"})
           
    };

    res.status(200).json(note);



};

module.exports = {createNote, getNote, getNotes, deleteNote, updateNote};