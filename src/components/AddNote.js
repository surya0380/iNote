import React, {useContext, useState} from 'react'
import noteContext from '../context/notes/noteContext'

const AddNote = () => {
  const context = useContext(noteContext);
  // eslint-disable-next-line
  const {addNote} = context;
  const [note, setNote] = useState({title: "", description: "", tag: ""})

  const handleClick = (e) => {
    e.preventDefault();
    addNote(note.title,note.description, note.tag)
    setNote({title: "", description: "", tag: ""})
  }

  const onChange = (e) => {
    setNote({...note, [e.target.name]: e.target.value})
  }

    return (
        <div className="container my-4">
            <h1>Add a note</h1>
            <form className='my-3'>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Title</label>
                    <input type="text" className="form-control" id="title" value={note.title} name="title" onChange={onChange}  aria-describedby="emailHelp" />
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Description</label>
                    <input type="text" className="form-control" id="description" value={note.description} name="description"onChange={onChange}  />
                </div> 
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tag" value={note.tag} name="tag"onChange={onChange}  />
                </div>
                <button type="submit" disabled={note.title.length < 5 || note.description.length < 5} className="btn btn-primary" onClick={handleClick}>Submit</button>
            </form>
        </div>
    )
}

export default AddNote
