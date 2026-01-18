import NoteForm from './components/NoteForm.jsx'
import Notes from './components/Notes'
import VisibilityFilter from './components/VisibilityFilter.jsx'

const App = () => {
  return (
    <div>
      <NoteForm />
      <VisibilityFilter />
      <Notes />
    </div>
  )
}

export default App