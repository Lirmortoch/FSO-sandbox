export default function Button({ dispatch, type, label }) {
  return (
    <button onClick={() => dispatch({ type })}>
      {label}
    </button>
  )
}