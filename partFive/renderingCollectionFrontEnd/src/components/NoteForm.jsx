export default function NoteForm({ onSubmit, handleChange, value }) {
  return (
    <div>
      <h2>Create a new note</h2>

      <form onSubmit={onSubmit} className='rendering-collection__form rc-form'>
        <input type='text' className='rc-form__input' value={value} onChange={handleChange}/>

        <button type='submit' className='rc-form__button'>Save</button>
      </form>
    </div>
  )
}