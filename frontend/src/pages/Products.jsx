import { useEffect, useState } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import axios from 'axios'
import Footer from '../components/Footer'
import ProductCard from '../components/ProductCard'
import { useCurrency } from '../context/CurrencyContext'

const naziviTipova = {
  'torbe': 'Torbe',
  'novcanici': 'Novčanici',
  'kaisevi': 'Kaiševi',
  'putne-torbe': 'Putne torbe',
  'poslovne-torbe': 'Poslovne torbe',
  'torbe-za-laptop': 'Torbe za laptop',
  'rancevi': 'Rančevi',
  'aksesoari': 'Aksesoari'
}

function Products() {
  const [products, setProducts] = useState([])
  const [ucitavanje, setUcitavanje] = useState(true)
  const [searchParams, setSearchParams] = useSearchParams()

  const [boja, setBoja] = useState('sve')
  const [cenaMin, setCenaMin] = useState('')
  const [cenaMax, setCenaMax] = useState('')
  const [tip, setTip] = useState('sve')
  const [trenutnaStranica, setTrenutnaStranica] = useState(1)
  const proizvodaPoStranici = 6

  const kategorija = searchParams.get('kategorija') || 'sve'

  const { formatirajCenu } = useCurrency()

  useEffect(() => {
    axios.get('http://localhost:5000/api/products')
      .then((response) => {
        setProducts(response.data)
        setUcitavanje(false)
      })
      .catch((error) => {
        console.log('Greška pri učitavanju proizvoda:', error)
        setUcitavanje(false)
      })
  }, [])

  useEffect(() => {
    setTrenutnaStranica(1)
  }, [kategorija, tip, boja, cenaMin, cenaMax])

  // Sve dostupne boje, izvučene iz proizvoda (bez ponavljanja)
  const sveBoje = [...new Set(products.map((product) => product.boja))]
  const sviTipovi = [...new Set(products.map((product) => product.tip))]

  const jedinstveniProizvodi = products.filter(
    (product, index, niz) => niz.findIndex((p) => p.naziv === product.naziv) === index
  )

  const filtriraniProizvodi = jedinstveniProizvodi
    .map((product) => {
      if (boja !== 'sve') {
        const tacnaVarijanta = products.find(
          (p) => p.naziv === product.naziv && p.boja === boja
        )
        return tacnaVarijanta || product
      }
      return product
    })
    .filter((product) => {
      if (kategorija !== 'sve' && product.kategorija !== kategorija) return false
      if (tip !== 'sve' && product.tip !== tip) return false
      if (cenaMin !== '' && product.cena < Number(cenaMin)) return false
      if (cenaMax !== '' && product.cena > Number(cenaMax)) return false

      if (boja !== 'sve' && product.boja !== boja) return false

      return true
    })

  const ukupnoStranica = Math.ceil(filtriraniProizvodi.length / proizvodaPoStranici)

  const pocetniIndex = (trenutnaStranica - 1) * proizvodaPoStranici
  const prikazaniProizvodi = filtriraniProizvodi.slice(pocetniIndex, pocetniIndex + proizvodaPoStranici)

  const resetujFiltere = () => {
    setSearchParams({})
    setTip('sve')
    setBoja('sve')
    setCenaMin('')
    setCenaMax('')
    setTrenutnaStranica(1)
  }

  return (
    <>
      <main className="products-page">

        <section className="products-hero">
          <div className="products-hero-overlay">
            <p className="products-hero-eyebrow">Kolekcija</p>
            <h1>Svi proizvodi</h1>
          </div>
        </section>

        <div className="container products-content">

          <div className="row g-5">

            {/* SIDEBAR FILTERI */}
            <div className="col-12 col-lg-3">

              <div className="filters-sidebar">

                <div className="filter-group">
                  <h4>Kategorija</h4>

                  <label>
                    <input
                      type="radio"
                      name="kategorija"
                      checked={kategorija === 'sve'}
                      onChange={() => setSearchParams({})}
                    />
                    Sve
                  </label>

                  <label>
                    <input
                      type="radio"
                      name="kategorija"
                      checked={kategorija === 'zene'}
                      onChange={() => setSearchParams({ kategorija: 'zene' })}
                    />
                    Žene
                  </label>

                  <label>
                    <input
                      type="radio"
                      name="kategorija"
                      checked={kategorija === 'muskarci'}
                      onChange={() => setSearchParams({ kategorija: 'muskarci' })}
                    />
                    Muškarci
                  </label>
                </div>

                <div className="filter-group">
                  <h4>Tip proizvoda</h4>

                  <label>
                    <input
                      type="radio"
                      name="tip"
                      checked={tip === 'sve'}
                      onChange={() => setTip('sve')}
                    />
                    Sve
                  </label>

                  {sviTipovi.map((t) => (
                    <label key={t}>
                      <input
                        type="radio"
                        name="tip"
                        checked={tip === t}
                        onChange={() => setTip(t)}
                      />
                      {naziviTipova[t] || t}
                    </label>
                  ))}

                </div>

                <div className="filter-group">
                  <h4>Boja</h4>

                  <label>
                    <input
                      type="radio"
                      name="boja"
                      checked={boja === 'sve'}
                      onChange={() => setBoja('sve')}
                    />
                    Sve
                  </label>

                  {sveBoje.map((b) => (
                    <label key={b}>
                      <input
                        type="radio"
                        name="boja"
                        checked={boja === b}
                        onChange={() => setBoja(b)}
                      />
                      {b.charAt(0).toUpperCase() + b.slice(1)}
                    </label>
                  ))}
                </div>

                <div className="filter-group">
                  <h4>Cena (€)</h4>

                  <div className="filter-cena">
                    <input
                      type="number"
                      placeholder="Min"
                      value={cenaMin}
                      onChange={(e) => setCenaMin(e.target.value)}
                    />
                    <span>–</span>
                    <input
                      type="number"
                      placeholder="Max"
                      value={cenaMax}
                      onChange={(e) => setCenaMax(e.target.value)}
                    />
                  </div>
                </div>

                <button className="filter-reset" onClick={resetujFiltere}>
                  Resetuj filtere
                </button>

              </div>

            </div>

            {/* PROIZVODI */}
            <div className="col-12 col-lg-9">

              {ucitavanje && (
                <p className="text-center">Učitavanje proizvoda...</p>
              )}

              {!ucitavanje && filtriraniProizvodi.length === 0 && (
                <p className="text-center">Nema proizvoda koji odgovaraju izabranim filterima.</p>
              )}

              {!ucitavanje && filtriraniProizvodi.length > 0 && (
                <p className="products-count">
                  {filtriraniProizvodi.length} {filtriraniProizvodi.length === 1 ? 'proizvod' : 'proizvoda'}
                </p>
              )}

              <div className="row g-4">

                {prikazaniProizvodi.map((product) => (

                  <div className="col-12 col-sm-6 col-md-4" key={product._id}>
                    <ProductCard
                      product={product}
                      sveVarijante={products.filter((p) => p.naziv === product.naziv)}
                    />
                  </div>

                ))}

              </div>

              {ukupnoStranica > 1 && (
                <div className="pagination">
                  <button
                    onClick={() => setTrenutnaStranica(trenutnaStranica - 1)}
                    disabled={trenutnaStranica === 1}
                  >
                    ← Prethodna
                  </button>

                  {Array.from({ length: ukupnoStranica }, (_, i) => i + 1).map((broj) => (
                    <button
                      key={broj}
                      className={trenutnaStranica === broj ? 'active' : ''}
                      onClick={() => setTrenutnaStranica(broj)}
                    >
                      {broj}
                    </button>
                  ))}

                  <button
                    onClick={() => setTrenutnaStranica(trenutnaStranica + 1)}
                    disabled={trenutnaStranica === ukupnoStranica}
                  >
                    Sledeća →
                  </button>
                </div>
              )}

            </div>

          </div>

        </div>

      </main>

      <Footer />
    </>
  )
}

export default Products