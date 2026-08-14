import { Link } from 'react-router-dom'

function Footer() {
  return (
    <footer className="footer-vixelle">

      <div className="container py-5">

        <div className="row g-5">

          {/* BRAND */}
          <div className="col-12 col-md-6 col-lg-4">

            <div className="footer-brand">
              <h3>VIXELLE</h3>
              <span>LEATHER</span>
            </div>

            <p className="footer-description">
              Bezvremenski kožni proizvodi izrađeni sa pažnjom
              prema svakom detalju.
            </p>

          </div>


          {/* BRZI LINKOVI */}
          <div className="col-6 col-md-3 col-lg-2">

            <h4>Linkovi</h4>

            <ul className="footer-links">

              <li>
                <Link to="/">Početna</Link>
              </li>

              <li>
                <Link to="/proizvodi">Proizvodi</Link>
              </li>

              <li>
                <Link to="/o-nama">O nama</Link>
              </li>

              <li>
                <Link to="/korpa">Korpa</Link>
              </li>

            </ul>

          </div>


          {/* KOLEKCIJE */}
          <div className="col-6 col-md-3 col-lg-2">

            <h4>Kolekcije</h4>

            <ul className="footer-links">

              <li>
                <Link to="/proizvodi?kategorija=zenski">
                  Ženska
                </Link>
              </li>

              <li>
                <Link to="/proizvodi?kategorija=muski">
                  Muška
                </Link>
              </li>

            </ul>

          </div>


          {/* KONTAKT */}
          <div className="col-12 col-lg-4">

            <h4>Kontakt</h4>

            <ul className="footer-contact">

              <li>
                <i className="bi bi-envelope"></i>
                <span>info@vixelleleather.com</span>
              </li>

              <li>
                <i className="bi bi-telephone"></i>
                <span>+381 60 123 4567</span>
              </li>

              <li>
                <i className="bi bi-geo-alt"></i>
                <span>Novi Sad, Srbija</span>
              </li>

            </ul>


            <div className="footer-social">

              <a href="#" aria-label="Instagram">
                <i className="bi bi-instagram"></i>
              </a>

              <a href="#" aria-label="Facebook">
                <i className="bi bi-facebook"></i>
              </a>

            </div>

          </div>

        </div>


        {/* DONJI DEO */}

        <div className="footer-bottom">

          <p>
            © 2026 Vixelle Leather. Sva prava zadržana.
          </p>

          <div className="footer-bottom-links">

            <a href="#">
              Uslovi korišćenja
            </a>

            <a href="#">
              Privatnost
            </a>

          </div>

        </div>

      </div>

    </footer>
  )
}

export default Footer