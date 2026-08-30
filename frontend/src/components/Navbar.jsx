import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import foxLogo from '../assets/fox-logo.png'
import { ukupnaKolicina } from '../utils/cart'
import { useCurrency } from '../context/CurrencyContext'

function ucitajKorisnika() {
  const podaci = localStorage.getItem('korisnik')
  return podaci ? JSON.parse(podaci) : null
}

function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [korisnik, setKorisnik] = useState(ucitajKorisnika)
  const [brojKorpe, setBrojKorpe] = useState(ukupnaKolicina)
  
  const { valuta, setValuta } = useCurrency()
  const location = useLocation()
  const navigate = useNavigate()
  const jeHome = location.pathname === '/'

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0)
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  useEffect(() => {
    const osveziKorisnika = () => {
      setKorisnik(ucitajKorisnika())
    }

    window.addEventListener('authChange', osveziKorisnika)

    return () => {
      window.removeEventListener('authChange', osveziKorisnika)
    }
  }, [])

  useEffect(() => {
  const osveziKorpu = () => {
    setBrojKorpe(ukupnaKolicina())
  }

  window.addEventListener('cartChange', osveziKorpu)

  return () => {
    window.removeEventListener('cartChange', osveziKorpu)
  }
}, [])

  const handleLogout = () => {
  const potvrda = window.confirm('Odjava?')

  if (potvrda) {
    localStorage.removeItem('token')
    localStorage.removeItem('korisnik')
    window.dispatchEvent(new Event('authChange'))
    navigate('/')
  }
}

  return (
    <nav className={`navbar navbar-expand-lg navbar-vixelle ${scrolled || !jeHome ? 'scrolled' : ''}`}>
      <div className="container-fluid px-4 px-lg-5">

        <Link className="navbar-brand navbar-logo" to="/">
          <img
            src={foxLogo}
            alt="Vixelle Leather logo"
            className="fox-logo"
          />

          <span className="brand-text">
            <strong>VIXELLE</strong>
            <small>LEATHER</small>
          </span>
        </Link>

        <button
          className="navbar-toggler border-0"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarMenu"
          aria-controls="navbarMenu"
          aria-expanded="false"
          aria-label="Otvori navigaciju"
        >
          <i className="bi bi-list"></i>
        </button>

        <div
          className="collapse navbar-collapse justify-content-end"
          id="navbarMenu"
        >
          <ul className="navbar-nav flex-lg-row gap-lg-4">

            <li className="nav-item">
              <Link className="nav-link" to="/">
                <i className="bi bi-house-door"></i>
                Početna
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/proizvodi">
                <i className="bi bi-bag"></i>
                Proizvodi
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/o-nama">
                <i className="bi bi-info-circle"></i>
                O nama
              </Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link" to="/korpa">
                <i className="bi bi-bag-heart"></i>
                Korpa
                {brojKorpe > 0 && (
                  <span className="cart-badge">{brojKorpe}</span>
                )}
             </Link>
           </li>


            {korisnik && korisnik.uloga === 'admin' && (
             <li className="nav-item">
              <Link className="nav-link" to="/admin">
               <i className="bi bi-clipboard-data"></i>
                Admin panel
              </Link>
            </li>
            )}

            <li className="nav-item">
               <span
               className="nav-link currency-switch"
               onClick={() => setValuta(valuta === 'EUR' ? 'RSD' : 'EUR')}
               style={{ cursor: 'pointer' }}
               >
                 <i className="bi bi-currency-exchange"></i>
                 {valuta}
              </span>
            </li>

            {korisnik ? (
              <li className="nav-item">
                <span className="nav-link" onClick={handleLogout} style={{ cursor: 'pointer' }}>
                  <i className="bi bi-box-arrow-right"></i>
                  Odjava ({korisnik.ime})
                </span>
              </li>
            ) : (
              <li className="nav-item">
                <Link className="nav-link" to="/prijava">
                  <i className="bi bi-person"></i>
                  Prijava
                </Link>
              </li>
            )}

          </ul>
        </div>

      </div>
    </nav>
  )
}

export default Navbar