import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import NoteForm from './components/NoteForm.jsx'
import Notes from './components/Notes'
import VisibilityFilter from './components/VisibilityFilter.jsx'
import { setNotes } from './reducers/noteReducer.js'
import noteService from './services/notes.js'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    noteService.getAll().then(notes => dispatch(setNotes(notes)))
  }, [dispatch])

  return (
    <div>
      <NoteForm />
      <VisibilityFilter />
      <Notes />
    </div>
  )
}

export default App