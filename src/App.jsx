import { useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import OpenAIComponent from './components/OpenAIComponent'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <OpenAIComponent/>
    </div>
  )
}

export default App
