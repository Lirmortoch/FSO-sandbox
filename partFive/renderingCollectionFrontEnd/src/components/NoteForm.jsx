import { useState } from "react"

export default function NoteForm({ createNote }) {
  const [newNote, setNewNote] = useState('');

  function handleAddNote(event) {
      event.preventDefault();
      createNote({
        content: newNote,
        important: true,
      })
      setNewNote('');
       
    }
    function handleNoteChange(event) {
      setNewNote(event.target.value);
    }

  return (
    <div>
      <h2>Create a new note</h2>

      <form onSubmit={handleAddNote} className='rendering-collection__form rc-form'>
        <input type='text' className='rc-form__input' value={newNote} onChange={handleNoteChange}/>

        <button type='submit' className='rc-form__button'>Save</button>
      </form>
    </div>
  )
}