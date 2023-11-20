
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Components/Home';
import Login from './Components/Login';
import Register from './Components/Register';
import UploadProfile from './Components/UploadProfile';

import './App.css'
import About from './Components/About';

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/uploadprofile' element={<UploadProfile />} />
        <Route path='/about' element={<About/>} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;