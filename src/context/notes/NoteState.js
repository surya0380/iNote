import React, { useState } from 'react';
import NoteContext from './noteContext';
import axios from "axios";

const NoteState = (props) => {
    const host = "http://localhost:5000"
    const noteInitial = [];

    const [notes, setNotes] = useState(noteInitial)

    //fetching all notes
    const getNotes = async  () => {
        await axios.get(`${host}/api/notes/fetachallnotes`, {
            headers: {
                "Content-Type": "application/json",
                "auth-token": localStorage.getItem('authToken')
            }
        })
            .then((response) => {
                const result = response.data[0]
                setNotes(result);
            });
    }

    //adding a note
    const addNote = async  (title, description, tag) => {

        // eslint-disable-next-line
        let result;
        await axios
            .post(`${host}/api/notes/addnote`,
                { title, description, tag },
                {
                    headers: {
                        "Content-Type": "application/json",
                        "auth-token": localStorage.getItem('authToken')
                    }
                })
            .then((response) => {
                result = response.data;
            });

        const note = result
        setNotes(notes.concat(note));
    }

    //deleting a note
    const delteNote = async  (id) => {
        await axios
            .delete(`${host}/api/notes/deleteuser/${id}`,
            {
                headers: {
                    "Content-Type": "application/json",
                    "auth-token": localStorage.getItem('authToken')
                }
            })
        .then(() => {
                // alert("Post deleted!");
            });

        const newNote = notes.filter((note) => { return note._id !== id })
        setNotes(newNote);
    }

    //updating a note
    const editNote = async  (id, title, description, tag) => {
        // eslint-disable-next-line
        let result;
        await axios
            .put(`${host}/api/notes/updateuser/${id}`,
                { title, description, tag },
                {
                    headers: {
                        "Content-Type": "application/json",
                        "auth-token": localStorage.getItem('authToken')
                    }
                })
            .then((response) => {
                result = response.data;
            });

        let newNotes= JSON.parse(JSON.stringify(notes))
        console.log(newNotes)
        for (let index = 0; index < newNotes.length; index++) {
            const element = newNotes[index];
            if (element._id === id) {
                newNotes[index].title = title;
                newNotes[index].description = description;
                newNotes[index].tag = tag;
                break;
            }
        }
        setNotes(newNotes);
    }

    return (
        <NoteContext.Provider value={{ notes, addNote, delteNote, editNote, getNotes }}>
            {props.children}
        </NoteContext.Provider>
    )
}

export default NoteState;
