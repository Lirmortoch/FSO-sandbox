import { useState, useEffect, useRef } from 'react';

import Note from './components/Note';
import noteService from './services/notes';
import Notification from './components/Notificatoin';
import Footer from './components/Footer';
import loginService from './services/login';
import LoginForm from './components/LoginForm';
import Togglable from './components/Togglable';
import NoteForm from './components/NoteForm';

import './App.css'

const App = () => {
  const [notes, setNotes] = useState([]);
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
  const handleLogout = () => {
    setUser(null)
  }
  
  const addNote = (noteObject) => {
    noteService
      .create(noteObject)
      .then(returnedNote => {
        setNotes(prevNotes => prevNotes.concat(returnedNote));
      })
  }
  
  const notesToShow = showAll 
  ? notes
  : notes.filter(note => note.important);
  
  const noteForm = () => (
    <Togglable buttonLabel='new note'>
      <NoteForm
        createNote={addNote}
      />
    </Togglable>
  )
  const loginForm = () => {
    return (
      <Togglable buttonLabel='login'>
        <LoginForm
          handleLogin={handleLogin}
          username={usernameRef}
          password={passwordRef}
        />
      </Togglable>
    );
  }

  return (
      <div>
          <main className="rendering-collection">
              <h1 className="rendering-collection__title">Notes</h1>
              <Notification message={errorMessage} />

              {!user && loginForm()}
              {user && (
                <div>
                  <p>{user.name} logged in <button className='logout-btn' onClick={handleLogout}>logout</button></p>
                  {noteForm()}
                </div>
              )}

              <button
                onClick={() => setShowAll(!showAll)}
                className="rendering-collection__important-btn"
              >
                show {showAll ? "important" : "all"}
              </button>

              <ul className="rendering-collection__list rc-list">
                {notesToShow.map((note) => (
                  <Note
                    key={note.id}
                    note={note}
                    toggleImportance={() => toggleImportanceOf(note.id)}
                  />
                ))}
              </ul>
          </main>
          <Footer />
      </div>
  );
}

export default App;
