import Footer from '../components/Footer'

function About() {
  return (
    <>
      <main className="about-page">

        <div className="container">

          <div className="about-heading text-center">
            <h1>
              Od 1998. godine, oblikovana tradicijom.<br />
              Dizajnirana za danas.
            </h1>
          </div>

          <p className="about-intro">
            Vixelle Leather nastaje iz poštovanja prema zanatu koji se prenosi generacijama.
            Koža koju koristimo obrađuje se sporim, pažljivim postupcima koji izvlače
            prirodni karakter svake kože — rezultat su proizvodi koji vremenom postaju
            samo lepši, i koji nose svoju priču.
          </p>

          <div className="row g-5 align-items-center about-section">

            <div className="col-12 col-md-6">
              <img src="/images/hero.png" alt="Vixelle Leather zanat" className="about-image" />
            </div>

            <div className="col-12 col-md-6">
              <p>
                Svaki proizvod izrađuju iskusni majstori kojima je jasno da se pravi
                kvalitet krije u najsitnijim detaljima. Rezultat je kolekcija dodataka
                napravljenih ne za jednu sezonu, već za godine svakodnevne upotrebe.
              </p>

              <p>
                Bezvremenski dizajn unosimo u savremeni život. Kroz promišljen oblik,
                vrhunske materijale i tradicionalnu izradu, stvaramo komade koji nose
                tihu eleganciju za sve koji cene postojanost stila.
              </p>
            </div>

          </div>

          <div className="row g-5 align-items-center about-section">

            <div className="col-12 col-md-6 order-md-2">
              <img src="/images/women-collection.png" alt="Održivost Vixelle Leather" className="about-image" />
            </div>

            <div className="col-12 col-md-6 order-md-1">
              <h2>Održivost</h2>

              <p>
                Naš pristup izradi kožnih proizvoda oduvek podržava prave majstore
                zanata — od obrade materijala do finalnog proizvoda. Brinemo da svaki
                komad koji nosite bude najvišeg kvaliteta, izrađen sa poštovanjem prema
                materijalu i ljudima koji ga obrađuju.
              </p>

              <p>
                Sarađujemo isključivo sa proizvođačima koji dele naš stav prema
                odgovornoj i pažljivoj proizvodnji, jer verujemo da lepota traje
                jedino kada je izgrađena na poštenim temeljima.
              </p>
            </div>

          </div>

          <div className="row g-5 align-items-center about-section">

            <div className="col-12 col-md-6">
              <img src="/images/men-collection.png" alt="Materijali Vixelle Leather" className="about-image" />
            </div>

            <div className="col-12 col-md-6">
              <h2>Materijali i izrada</h2>

              <p>
                Koristimo prirodnu, punu kožu, obrađenu tradicionalnim postupcima
                koji čuvaju njenu izdržljivost i jedinstven izgled. Svaki komad kože
                nosi sitne prirodne nepravilnosti — dokaz da nije reč o veštačkom
                materijalu, već o pravoj koži koja stari dostojanstveno.
              </p>

              <p>
                Metalni delovi — kopče, zakovice i patent zatvarači — biraju se prema
                trajnosti i finom, prefinjenom izgledu, kako bi svaki detalj pratio
                kvalitet same kože.
              </p>
            </div>

          </div>

          <div className="about-direct text-center">
            <h2>Direktno do vas</h2>

            <p>
              Izbegavanjem posrednika, veletrgovaca i agenata sa njihovim maržama,
              možemo da prodajemo direktno našim kupcima i ponudimo najbolji odnos
              cene i kvaliteta, uz blizak odnos sa svakim od vas.
            </p>

            <p>
              Verujemo u poštene cene. Ne podižemo cene veštački da bismo ih kasnije
              "snizili" i stvorili lažan utisak popusta. Kvalitet i poštenje su za nas
              važniji od trenutnih akcija.
            </p>
          </div>

        </div>

      </main>

      <Footer />
    </>
  )
}

export default About