import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import ProtectedRoute from './components/ProtectedRoute'
import Navbar from './components/Navbar'
import AdminPanel from './pages/AdminPanel'
import Home from './pages/Home'
import Products from './pages/Products'
import About from './pages/About'
import Cart from './pages/Cart'
import Login from './pages/Login'
import ProductDetail from './pages/ProductDetail'

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/proizvodi" element={<Products />} />
        <Route path="/proizvodi/:id" element={<ProductDetail />} />
        <Route path="/o-nama" element={<About />} />
        <Route path="/korpa" element={<Cart />} />
        <Route path="/prijava" element={<Login />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute samoAdmin={true}>
              <AdminPanel />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default App