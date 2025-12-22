import { useState, useEffect, useRef } from 'react';

import Note from './components/Note';
import noteService from './services/notes';
import Notification from './components/Notificatoin';
import Footer from './components/Footer';
import loginService from './services/login';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const usernameRef = useRef('');
  const passwordRef = useRef('');
  const [user, setUser] = useState(null);

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

  useEffect(() => {
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes);
      });
  }, []);
  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteAppUser');

    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      
      setUser(user);
      noteService.setToken(user.token);
    }
  }, []);


  const handleLogin = async (event) => {
    event.preventDefault();
    
    try {
      const username = usernameRef.current.value;
      const password = passwordRef.current.value;

      const user = await loginService.login({ username, password });
      
      window.localStorage.setItem('loggedNoteAppUser', JSON.stringify(user));
      noteService.setToken(user.token);
      
      setUser(user);

      usernameRef.current.value = '';
      passwordRef.current.value = '';
    }
    catch {
      setErrorMessage('wrong credentials');
      setTimeout(() => {
        setErrorMessage(null);
      }, 5000);
    }
  }

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
  
  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <fieldset>
        <label>
          username
          <input type='text' ref={usernameRef}></input>
        </label>
      </fieldset>
      <fieldset>
        <label>
          password
          <input type='password' ref={passwordRef}></input>
        </label>
      </fieldset>
      <button type='submit'>Login</button>
    </form>
  )
  const noteForm = () => (
    <form onSubmit={addNote} className='rendering-collection__form rc-form'>
      <input type='text' className='rc-form__input' value={newNote} onChange={handleNoteChange}/>
      <button type='submit' onClick={addNote} className='rc-form__button'>Save</button>
    </form>
  )

  return (
    <div>
      <main className='rendering-collection'>
        <h1 className='rendering-collection__title'>Notes</h1>
        <Notification message={errorMessage} />

        {!user && loginForm()}
        {user && (
          <div>
            <p>{user.name} logged in</p>
            {noteForm()}
          </div>
        )}

        <button onClick={() => setShowAll(!showAll)} className='rendering-collection__important-btn'>
          show {showAll ? 'important' : 'all'}
        </button>

        <ul className='rendering-collection__list rc-list'>
          {notesToShow.map(note =>
            <Note key={note.id} note={note} toggleImportance={() => toggleImportanceOf(note.id)} />
          )}
        </ul>
      </main>
      <Footer />
    </div>
  )
}

export default App;
