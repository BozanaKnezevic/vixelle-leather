import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Products from './pages/Products'
import About from './pages/About'
import Cart from './pages/Cart'
import Login from './pages/Login'

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/proizvodi" element={<Products />} />
        <Route path="/o-nama" element={<About />} />
        <Route path="/korpa" element={<Cart />} />
        <Route path="/prijava" element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App