import { useEffect, useState } from 'react'
import axios from 'axios'
import Footer from '../components/Footer'

function Home() {
  const [products, setProducts] = useState([])

  useEffect(() => {
    axios.get('http://localhost:5000/api/products')
      .then((response) => {
        setProducts(response.data)
      })
      .catch((error) => {
        console.log('Greška pri učitavanju proizvoda:', error)
      })
  }, [])

  useEffect(() => {
    const elements = document.querySelectorAll('.scroll-reveal')

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
          }
        })
      },
      {
        threshold: 0.2
      }
    )

    elements.forEach((element) => observer.observe(element))

    return () => {
      elements.forEach((element) => observer.unobserve(element))
    }
  }, [products])

  return (
    <>
      <main className="home">

        {/* =========================
            HERO
        ========================= */}

        <section className="hero">

          <img
            src="/images/hero.png"
            alt="Vixelle Leather"
            className="hero-image"
          />

          <div className="hero-overlay">

            <p className="hero-eyebrow">
              VIXELLE LEATHER
            </p>

            <h1>
              Koža koja<br />
              priča priču.
            </h1>

            <p className="hero-description">
              Bezvremenski kožni proizvodi izrađeni
              sa pažnjom prema svakom detalju.
            </p>

            <a href="/proizvodi" className="hero-button">
              Pogledaj kolekciju
              <i className="bi bi-arrow-right"></i>
            </a>

          </div>

        </section>


        {/* =========================
            IZDVOJENI PROIZVODI
        ========================= */}

        <section className="featured-products">

          <div className="container">

            <div className="featured-heading text-center">

              <p className="scroll-reveal">
                Izdvojeno
              </p>

              <h2 className="scroll-reveal reveal-delay-1">
                Izdvojeno iz kolekcije
              </h2>

              <span className="scroll-reveal reveal-delay-2">
                Pažljivo odabrani komadi od kože.
              </span>

            </div>


            <div className="row g-4 mt-5">

              {products.map((product, index) => (

                <div className="col-12 col-md-4" key={product._id}>

                  <div className={`product-card scroll-reveal reveal-delay-${index + 1}`}>

                    <div className="product-image">

                      <img
                        src={product.slikaGlavna}
                        alt={product.naziv}
                      />

                      {product.slikaHover && (
                        <img
                          src={product.slikaHover}
                          alt={product.naziv}
                          className="image-hover"
                        />
                      )}

                    </div>

                    <div className="product-info">

                      <h3>
                        {product.naziv}
                      </h3>

                      <p>
                        {product.opis}
                      </p>

                      <strong>
                        {product.cena} €
                      </strong>

                    </div>

                  </div>

                </div>

              ))}

            </div>


            {/* DUGME */}

            <div className="text-center mt-5">

              <a href="/proizvodi"  className="products-button scroll-reveal reveal-delay-2">
              
                Pogledaj sve proizvode
                <i className="bi bi-arrow-right"></i>
              </a>

            </div>

          </div>

        </section>


        {/* =========================
            KOLEKCIJE
        ========================= */}

        <section className="collections py-5">

          <div className="container">

            <div className="collections-heading text-center mb-5">

              <p className="scroll-reveal">
                Istraži
              </p>

              <h2 className="scroll-reveal reveal-delay-1">
                Naše kolekcije
              </h2>

              <span className="scroll-reveal reveal-delay-2">
                Kožni komadi za svaki stil i priliku.
              </span>

            </div>


            <div className="row g-4">

              {/* ŽENSKA KOLEKCIJA */}

              <div className="col-12 col-md-6">

                <div className="collection-card scroll-reveal reveal-delay-1">

                  <img
                    src="/images/women-collection.png"
                    alt="Ženska kolekcija"
                    className="collection-image"
                  />

                  <div className="collection-overlay">

                    <p>
                      VIXELLE WOMEN
                    </p>

                    <h3>
                      Ženska kolekcija
                    </h3>

                    <span>
                      Elegantni kožni komadi
                      osmišljeni za svaki dan.
                    </span>

                     <a href="/proizvodi?kategorija=zene"  className="collection-button">
                    
                      Istraži kolekciju
                      <i className="bi bi-arrow-right"></i>
                    </a>

                  </div>

                </div>

              </div>


              {/* MUŠKA KOLEKCIJA */}

              <div className="col-12 col-md-6">

                <div className="collection-card scroll-reveal reveal-delay-2">

                  <img
                    src="/images/men-collection.png"
                    alt="Muška kolekcija"
                    className="collection-image"
                  />

                  <div className="collection-overlay">

                    <p>
                      VIXELLE MEN
                    </p>

                    <h3>
                      Muška kolekcija
                    </h3>

                    <span>
                      Bezvremenski kožni komadi
                      sa karakterom.
                    </span>

                     <a href="/proizvodi?kategorija=muskarci"  className="collection-button">
                    
                      Istraži kolekciju
                      <i className="bi bi-arrow-right"></i>
                    </a>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </section>

      </main>

      <Footer />
    </>
  )
}

export default Home