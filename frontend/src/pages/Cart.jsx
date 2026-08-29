import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import Footer from '../components/Footer'
import { ucitajKorpu, ukloniIzKorpe, izmeniKolicinu, ukupnaCena } from '../utils/cart'

function Cart() {
  const [stavke, setStavke] = useState([])

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
                      <strong>{item.cena} €</strong>
                    </div>

                    <div className="cart-item-qty">
                      <button onClick={() => handlePromeniKolicinu(item._id, item.kolicina - 1)}>−</button>
                      <span>{item.kolicina}</span>
                      <button onClick={() => handlePromeniKolicinu(item._id, item.kolicina + 1)}>+</button>
                    </div>

                    <div className="cart-item-subtotal">
                      {(item.cena * item.kolicina).toFixed(2)} €
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
                  <strong>{ukupnaCena().toFixed(2)} €</strong>
                </div>

                <button className="hero-button cart-checkout-button">
                  Završi kupovinu
                  <i className="bi bi-arrow-right"></i>
                </button>

              </div>

            </div>

          </div>

        </div>

      </main>

      <Footer />
    </>
  )
}

export default Cart