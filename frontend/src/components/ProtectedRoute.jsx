import { Navigate } from 'react-router-dom'

function ProtectedRoute({ children, samoAdmin = false }) {
  const token = localStorage.getItem('token')
  const korisnikPodaci = localStorage.getItem('korisnik')
  const korisnik = korisnikPodaci ? JSON.parse(korisnikPodaci) : null

  if (!token || !korisnik) {
    return <Navigate to="/prijava" replace />
  }

  if (samoAdmin && korisnik.uloga !== 'admin') {
    return <Navigate to="/" replace />
  }

  return children
}

export default ProtectedRoute