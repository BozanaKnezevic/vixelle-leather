
import { useEffect, useState } from 'react'
import foxLogo from '../assets/fox-logo.png'

function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0)
    }

    window.addEventListener('scroll', handleScroll)

    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [])

  return (
    <nav className={`navbar navbar-expand-lg navbar-vixelle ${scrolled ? 'scrolled' : ''}`}>
      <div className="container-fluid px-4 px-lg-5">

        <a className="navbar-brand navbar-logo" href="/">
          <img
            src={foxLogo}
            alt="Vixelle Leather logo"
            className="fox-logo"
          />

          <span className="brand-text">
            <strong>VIXELLE</strong>
            <small>LEATHER</small>
          </span>
        </a>

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
              <a className="nav-link" href="/">
                <i className="bi bi-house-door"></i>
                Početna
              </a>
            </li>

            <li className="nav-item">
              <a className="nav-link" href="/proizvodi">
                <i className="bi bi-bag"></i>
                Proizvodi
              </a>
            </li>

            <li className="nav-item">
              <a className="nav-link" href="/o-nama">
                <i className="bi bi-info-circle"></i>
                O nama
              </a>
            </li>

            <li className="nav-item">
              <a className="nav-link" href="/korpa">
                <i className="bi bi-bag-heart"></i>
                Korpa
              </a>
            </li>

            <li className="nav-item">
              <a className="nav-link" href="/prijava">
                <i className="bi bi-person"></i>
                Prijava
              </a>
            </li>

          </ul>
        </div>

      </div>
    </nav>
  )
}

export default Navbar

