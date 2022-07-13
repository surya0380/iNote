import React, { useContext, useEffect, useRef, useState } from 'react'
import noteContext from '../context/notes/noteContext'
import AddNote from './AddNote';
import NoteItem from './NoteItem';
import { useNavigate  } from "react-router-dom";

const Notes = () => {
    const history= useNavigate ();
    const context = useContext(noteContext);
    // eslint-disable-next-line
    const { notes, getNotes, editNote } = context;
    const ref = useRef(null)
    const closeRef = useRef(null)
    const [note, setNote] = useState({ id: "", etitle: "", edescription: "", etag: "default" })

    useEffect(() => {
        if(localStorage.getItem('authToken')){
            getNotes();
        }else{
            history('/login')
        }
        // eslint-disable-next-line
    }, [])

    const updateNote = (currrentNote) => {
        setNote({ id: currrentNote._id, etitle: currrentNote.title, edescription: currrentNote.description, etag: currrentNote.tag })
        ref.current.click();
    }

    const handleClick = (e) => {
        e.preventDefault();
        editNote(note.id, note.etitle, note.edescription, note.etag);
        closeRef.current.click();
    }

    const onChange = (e) => {
        setNote({ ...note, [e.target.name]: e.target.value })
    }

    return (
        <>
            <AddNote />

            <button type="button" className="btn btn-primary d-none" ref={ref} data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch demo modal
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form className='my-3'>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Title</label>
                                    <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} onChange={onChange} aria-describedby="emailHelp" />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Description</label>
                                    <input type="text" className="form-control" id="edescription" value={note.edescription} name="edescription" onChange={onChange} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={onChange} />
                                </div>
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button type="button" ref={closeRef} className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" disabled={note.etitle.length < 5 || note.edescription.length < 5} className="btn btn-primary" onClick={handleClick}>Update changes</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row my-4">
                <h2>Your notes</h2>
                <div className="container">
                    {notes.length === 0 && "no notes to display"}
                </div>
                {notes.map((note) => {
                    return <NoteItem key={note._id} updateNote={updateNote} note={note} />
                })}
            </div>
        </>
    )
}

export default Notes
