import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import axios from 'axios'
import Footer from '../components/Footer'

function ProductDetail() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [varijante, setVarijante] = useState([])
  const [aktivnaSlika, setAktivnaSlika] = useState('')
  const [ucitavanje, setUcitavanje] = useState(true)
  const [greska, setGreska] = useState(false)

  useEffect(() => {
    setUcitavanje(true)

    const ucitajSve = async () => {
      try {
        const glavniResponse = await axios.get(`http://localhost:5000/api/products/${id}`)
        const glavniProizvod = glavniResponse.data

        setProduct(glavniProizvod)
        setAktivnaSlika(glavniProizvod.slikaGlavna)

        const svaResponse = await axios.get('http://localhost:5000/api/products')
        const isteVarijante = svaResponse.data.filter((p) => p.naziv === glavniProizvod.naziv)

        setVarijante(isteVarijante)
        setUcitavanje(false)

      } catch (error) {
        console.log('Greška pri učitavanju proizvoda:', error)
        setGreska(true)
        setUcitavanje(false)
      }
    }

    ucitajSve()
  }, [id])

  if (ucitavanje) {
    return (
      <div className="product-detail-page">
        <p className="text-center">Učitavanje...</p>
      </div>
    )
  }

  if (greska || !product) {
    return (
      <div className="product-detail-page">
        <p className="text-center">Proizvod nije pronađen.</p>
        <p className="text-center">
          <Link to="/proizvodi">Nazad na proizvode</Link>
        </p>
      </div>
    )
  }

  const slike = product.slike && product.slike.length > 0
  ? product.slike
  : [product.slikaGlavna, product.slikaHover].filter(Boolean)

  return (
    <>
      <main className="product-detail-page">

        <div className="container">

          <Link to="/proizvodi" className="product-detail-back">
            ← Nazad na proizvode
          </Link>

          <div className="product-detail-card">

            <div className="row g-0">

              {/* GALERIJA SLIKA */}
              <div className="col-12 col-md-6">

                <div className="product-detail-gallery">

                  {slike.length > 1 && (
                    <div className="product-detail-thumbs">
                      {slike.map((slika, index) => (
                        <button
                          key={index}
                          className={`product-detail-thumb ${aktivnaSlika === slika ? 'active' : ''}`}
                          onClick={() => setAktivnaSlika(slika)}
                        >
                          <img src={slika} alt={`${product.naziv} ${index + 1}`} />
                        </button>
                      ))}
                    </div>
                  )}

                  <div className="product-detail-image">
                    <img src={aktivnaSlika} alt={product.naziv} />
                  </div>

                </div>

              </div>

              {/* INFO */}
              <div className="col-12 col-md-6">

                <div className="product-detail-info">

                  <h1>{product.naziv}</h1>

                  <strong className="product-detail-price">{product.cena} €</strong>

                  <p className="product-detail-desc">{product.opis}</p>

                  <div className="product-detail-meta">
                    <p><strong>Kategorija:</strong> {product.kategorija === 'zene' ? 'Žene' : 'Muškarci'}</p>
                  </div>

                  {varijante.length > 1 && (
                    <div className="product-detail-colors">
                      <p className="product-detail-colors-label">
                        Boja: <span>{product.boja.charAt(0).toUpperCase() + product.boja.slice(1)}</span>
                      </p>

                      <div className="color-swatches">
                        {varijante.map((v) => (
                          <Link
                            key={v._id}
                            to={`/proizvodi/${v._id}`}
                            className={`color-swatch color-${v.boja} ${v._id === product._id ? 'active' : ''}`}
                            title={v.boja}
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  <button className="hero-button">
                    Dodaj u korpu
                    <i className="bi bi-bag-plus"></i>
                  </button>

                </div>

              </div>

            </div>

          </div>

        </div>

      </main>

      <Footer />
    </>
  )
}

export default ProductDetail