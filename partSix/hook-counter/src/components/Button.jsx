import { useContext } from "react"
import CounterContext from "../CounterContext"

export default function Button({ type, label }) {
  const { counterDispatch } = useContext(CounterContext)

  return (
    <button onClick={() => counterDispatch({ type })}>
      {label}
    </button>
  )
}