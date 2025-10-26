import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function History({allClicks}) {
  if (allClicks.length === 0) {
    return (
      <div>
        the app is used by pressing the buttons
      </div>
    );
  }

  return (
    <div>
      button press history: {allClicks.join(' ')}
    </div>
  );
}

function Button({onClick, text}) {
  return (
    <button onClick={onClick}>{text}</button>
  );
}

function App() {
  const [value, setValue] = useState(10);

  const setToValue = newValue => {
    console.log('value now', newValue);
    setValue(newValue);
  }

  return (
    <div>
        <Button onClick={() => setToValue(1000)} text='1000' />
        <Button onClick={() => setToValue(0)} text='reset' />
        <Button onClick={() => setToValue(value+1)} text='increment' />
    </div>
  );
}

export default App
