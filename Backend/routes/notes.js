const express = require('express');
const router = express.Router();
var fetchuser = require('../middleware/fetchuser');
const Notes = require("../models/Notes");
const { body, validationResult } = require('express-validator');

//fetch all notes
router.get('/fetachallnotes', fetchuser, async (request, response) => {
    const notes = await Notes.find({ user: request.user.id })
    response.json([notes]);
})


//create a notes
router.post('/addnote', fetchuser, [
    body('title', 'Enter a valid title').isLength({ min: 3 }),
    body('description', 'Enter a valid description').isLength({ min: 3 }),
], async (request, response) => {

    try {
        const { title, tag, description } = request.body;
        const errors = validationResult(request);
        if (!errors.isEmpty()) {
            return response.status(400).json({ errors: errors.array() });
        }

        const note = new Notes({
            title, tag, description, userId: request.user.id
        })

        const savedNotes = await note.save()
        response.json(savedNotes)
    } catch (error) {
        response.status(500).send(console.error("something went wrong"));
    }

})

//update a notes
router.put('/updateuser/:id', fetchuser, async (request, response) => {
    const { title, tag, description } = request.body;

    const newNote = {}
    if (title) { newNote.title = title }
    if (tag) { newNote.tag = tag }
    if (description) { newNote.description = description }

    let note = await Notes.findById(request.params.id)
    // console.log("note object ="+note);
    // console.log("request object ="+request.body);
    if (!note) {
         return response.status(404).send("not found")
    }
    // else if (note.user.toString() !== request.user.id) { 
    //     return response.status(401).send("access denied") 
    // }
    else {
        note = await Notes.findByIdAndUpdate(request.params.id, { $set: newNote }, { new: true })
        response.json({ note })
    }

})

//delete a notes
router.delete('/deleteuser/:id', fetchuser, async (request, response) => {
    let note = await Notes.findById(request.params.id)
    // console.log("note object ="+note);
    // console.log("request object ="+request.body);
    if (!note) {
         return response.status(404).send("not found")
    }
    // else if (note.user.toString() !== request.user.id) { 
    //     return response.status(401).send("access denied") 
    // }
    else {
        note = await Notes.findByIdAndDelete(request.params.id)
        response.json({ "success":"note has been deleted",note : note })
    }

})

module.exports = router