import { useContext } from "react"
import CounterContext from "../CounterContext"

export default function Display() {
  const { counter } = useContext(CounterContext)
  
  return <div>{counter}</div>
}