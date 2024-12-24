import { useState } from 'react'
import Form from './Form'
import Login from './Login'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Crud from './Crud'


function App() {
  const [count, setCount] = useState(0)

  return (
    <main>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<Crud/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/form" element={<Form />} />
      </Routes>
      </BrowserRouter>
    </main>
  )
}

export default App
