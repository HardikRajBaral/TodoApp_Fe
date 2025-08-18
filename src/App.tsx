import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import Login from './componets/Login'
import Signin from './componets/Signin'
import NoteList from './componets/NoteList'

function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/signup" element={<Signin/>}/>
        <Route path="/Notes" element={<NoteList/>}/>

      </Routes>
    </Router>
      
    </>
  )
}

export default App
