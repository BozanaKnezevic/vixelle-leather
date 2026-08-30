import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
import { ucitajKorpu, ukloniIzKorpe, izmeniKolicinu, ukupnaCena, sacuvajKorpu } from '../utils/cart'
import axios from 'axios'
import { useCurrency } from '../context/CurrencyContext'

function Cart() {
  const [stavke, setStavke] = useState([])
  const [saljemo, setSaljemo] = useState(false)
  const [porudzbinaPoslata, setPorudzbinaPoslata] = useState(false)
  const [prikaziFormu, setPrikaziFormu] = useState(false)
  const [greskaForma, setGreskaForma] = useState('')
  const [dostava, setDostava] = useState({
    imePrezime: '',
    adresa: '',
    grad: '',
    telefon: ''
  })
  const { formatirajCenu } = useCurrency()

  useEffect(() => {
    osveziKorpu()

    window.addEventListener('cartChange', osveziKorpu)
    return () => window.removeEventListener('cartChange', osveziKorpu)
  }, [])

  const osveziKorpu = () => {
    setStavke(ucitajKorpu())
  }

  const handleUkloni = (id, naziv) => {
    const potvrda = window.confirm(`Ukloniti "${naziv}" iz korpe?`)
    if (potvrda) {
      ukloniIzKorpe(id)
    }
  }

  const handlePromeniKolicinu = (id, novaKolicina) => {
    izmeniKolicinu(id, novaKolicina)
  }

  const handleDostavaChange = (e) => {
    setDostava({
      ...dostava,
      [e.target.name]: e.target.value
    })
  }

  const zavrsiKupovinu = async (e) => {
    e.preventDefault()
    setGreskaForma('')

    if (dostava.imePrezime.trim() === '') {
      setGreskaForma('Unesite ime i prezime')
      return
    }

    if (dostava.adresa.trim() === '') {
      setGreskaForma('Unesite adresu')
      return
    }

    if (dostava.grad.trim() === '') {
      setGreskaForma('Unesite grad')
      return
    }

    const telefonRegex = /^[0-9+\s-]{6,15}$/
    if (!telefonRegex.test(dostava.telefon)) {
      setGreskaForma('Unesite validan broj telefona (npr. 060 123 4567)')
      return
    }

    setSaljemo(true)

    try {
      const token = localStorage.getItem('token')

      await axios.post('http://localhost:5000/api/orders', {
        stavke: stavke,
        dostava: dostava,
        ukupnaCena: ukupnaCena()
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      sacuvajKorpu([])
      setPorudzbinaPoslata(true)

    } catch (error) {
  alert('Greška pri slanju porudžbine. Pokušajte ponovo.')
  console.log('Detalji greske:', error.response?.data)
} finally {
      setSaljemo(false)
    }
  }

  if (porudzbinaPoslata) {
    return (
      <>
        <main className="cart-page">
          <div className="container">
            <div className="cart-empty">
              <i className="bi bi-check-circle"></i>
              <h1>Hvala na porudžbini!</h1>
              <p>Vaša porudžbina je uspešno primljena i biće uskoro obrađena.</p>
              <Link to="/proizvodi" className="hero-button">
                Nastavi kupovinu
                <i className="bi bi-arrow-right"></i>
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  if (stavke.length === 0) {
    return (
      <>
        <main className="cart-page">
          <div className="container">
            <div className="cart-empty">
              <i className="bi bi-bag-x"></i>
              <h1>Vaša korpa je prazna</h1>
              <p>Pogledajte našu kolekciju i pronađite nešto za sebe.</p>
              <Link to="/proizvodi" className="hero-button">
                Pogledaj proizvode
                <i className="bi bi-arrow-right"></i>
              </Link>
            </div>
          </div>
        </main>
        <Footer />
      </>
    )
  }

  return (
    <>
      <main className="cart-page">

        <div className="container">

          <p className="cart-eyebrow">Vaša porudžbina</p>
          <h1>Korpa</h1>

          <div className="row g-4 mt-4">

            {/* STAVKE */}
            <div className="col-12 col-lg-8">

              <div className="cart-card">

                {stavke.map((item) => (
                  <div className="cart-item" key={item._id}>

                    <img src={item.slikaGlavna} alt={item.naziv} className="cart-item-image" />

                    <div className="cart-item-info">
                      <h3>{item.naziv}</h3>
                      {item.boja && (
                        <p className="cart-item-color">
                          Boja: {item.boja.charAt(0).toUpperCase() + item.boja.slice(1)}
                        </p>
                      )}
                      <strong>{formatirajCenu(item.cena)}</strong>
                    </div>

                    <div className="cart-item-qty">
                      <button onClick={() => handlePromeniKolicinu(item._id, item.kolicina - 1)}>−</button>
                      <span>{item.kolicina}</span>
                      <button onClick={() => handlePromeniKolicinu(item._id, item.kolicina + 1)}>+</button>
                    </div>

                    <div className="cart-item-subtotal">
                      {formatirajCenu(item.cena * item.kolicina)}
                    </div>

                    <button
                      className="cart-item-remove"
                      onClick={() => handleUkloni(item._id, item.naziv)}
                      aria-label="Ukloni"
                    >
                      <i className="bi bi-trash"></i>
                    </button>

                  </div>
                ))}

              </div>

              <Link to="/proizvodi" className="cart-continue">
                ← Nastavi kupovinu
              </Link>

            </div>

            {/* REZIME */}
            <div className="col-12 col-lg-4">

              <div className="cart-summary">

                <h2>Rezime porudžbine</h2>

                <div className="cart-summary-row">
                  <span>Broj artikala</span>
                  <span>{stavke.reduce((zbir, item) => zbir + item.kolicina, 0)}</span>
                </div>

                <div className="cart-summary-row">
                  <span>Dostava</span>
                  <span>Besplatno</span>
                </div>

                <div className="cart-summary-divider"></div>

                <div className="cart-summary-total">
                  <span>Ukupno</span>
                  <strong>{formatirajCenu(ukupnaCena())}</strong>
                </div>

                <button
                  className="hero-button cart-checkout-button"
                  onClick={() => setPrikaziFormu(true)}
                >
                  Završi kupovinu
                  <i className="bi bi-arrow-right"></i>
                </button>

              </div>

            </div>

          </div>

          {prikaziFormu && (
            <div className="modal-overlay" onClick={() => setPrikaziFormu(false)}>
              <div className="admin-modal" onClick={(e) => e.stopPropagation()}>

                <button className="admin-modal-close" onClick={() => setPrikaziFormu(false)}>
                  ×
                </button>

                <h2>Podaci za dostavu</h2>

                <form onSubmit={zavrsiKupovinu}>

                  <div className="form-group">
                    <label>Ime i prezime</label>
                    <input
                      type="text"
                      name="imePrezime"
                      value={dostava.imePrezime}
                      onChange={handleDostavaChange}
                    />
                  </div>

                  <div className="form-group">
                    <label>Adresa</label>
                    <input
                      type="text"
                      name="adresa"
                      value={dostava.adresa}
                      onChange={handleDostavaChange}
                    />
                  </div>

                  <div className="form-group">
                    <label>Grad</label>
                    <input
                      type="text"
                      name="grad"
                      value={dostava.grad}
                      onChange={handleDostavaChange}
                    />
                  </div>

                  <div className="form-group">
                    <label>Telefon</label>
                    <input
                      type="text"
                      name="telefon"
                      value={dostava.telefon}
                      onChange={handleDostavaChange}
                    />
                  </div>

                  {greskaForma && (
                    <p className="auth-error">{greskaForma}</p>
                  )}

                  <div className="admin-modal-dugmad">
                    <button type="button" className="modal-otkazi" onClick={() => setPrikaziFormu(false)}>
                      Otkaži
                    </button>
                    <button type="submit" className="admin-button-add" disabled={saljemo}>
                      {saljemo ? 'Slanje...' : 'Potvrdi porudžbinu'}
                    </button>
                  </div>

                </form>

              </div>
            </div>
          )}

        </div>

      </main>

      <Footer />
    </>
  )
}

export default Cart