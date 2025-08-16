import { BrowserRouter as Router,Routes,Route } from 'react-router-dom'
import Home from './componets/Home'
import Login from './componets/Login'
import Signin from './componets/Signin'

function App() {

  return (
    <>
    <Router>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="/signup" element={<Signin/>}/>
        <Route path="/home" element={<Home/>}/>

      </Routes>
    </Router>
      
    </>
  )
}

export default App
