import { useEffect } from 'react'
import { useDispatch } from 'react-redux'

import NoteForm from './components/NoteForm.jsx'
import Notes from './components/Notes'
import VisibilityFilter from './components/VisibilityFilter.jsx'
import { initializeNotes } from './reducers/noteReducer.js'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeNotes())
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