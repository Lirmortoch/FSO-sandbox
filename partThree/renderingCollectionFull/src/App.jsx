import { useState, useEffect } from 'react';

import Note from './components/Note';
import noteService from './services/notes';
import Notification from './components/Notificatoin';
import Footer from './components/Footer';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState('some error happened...');

  const toggleImportanceOf = (id) => {
    const note = notes.find(n => n.id === id);
    const changedNote = { ...note, important: !note.important };

    noteService
      .update(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.map(note => note.id === id ? returnedNote : note))
      })
      .catch(error => {
        setErrorMessage(
          `Note '${note.content}' was already removed from server`
        );
        setTimeout(() => {
          setErrorMessage(null);
        }, 5000);
        setNotes(notes.filter(n => n.id !== id));
      });
  }

  const hook = () => {
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes);
      })
  }

  useEffect(hook, []);

  function addNote(event) {
    event.preventDefault();
    const noteObject = {
      content: newNote,
      id: notes.length + 1,
      important: false,
    }

    noteService
      .create(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
        setNewNote('')
      });
  }
  function handleNoteChange(event) {
    setNewNote(event.target.value);
  }
  
  const notesToShow = showAll 
  ? notes
  : notes.filter(note => note.important);

  console.log(notesToShow);

  return (
    <div>
      <main className='rendering-collection'>
        <h1 className='rendering-collection__title'>Notes</h1>
        <Notification message={errorMessage} />
        <button onClick={() => setShowAll(!showAll)} className='rendering-collection__important-btn'>
          show {showAll ? 'important' : 'all'}
        </button>
        <ul className='rendering-collection__list rc-list'>
          {notesToShow.map(note =>
            <Note key={note.id} note={note} toggleImportance={() => toggleImportanceOf(note.id)} />
          )}
        </ul>
        <form onSubmit={addNote} className='rendering-collection__form rc-form'>
          <input type='text' className='rc-form__input' value={newNote} onChange={handleNoteChange}/>
          <button type='submit' onClick={addNote} className='rc-form__button'>Save</button>
        </form>
      </main>
      <Footer />
    </div>
  )
}

export default App;
