import { useEffect, useState } from 'react'
import axios from 'axios'

function AdminPanel() {
  const [products, setProducts] = useState([])
  const [ucitavanje, setUcitavanje] = useState(true)

  const [prikaziForma, setPrikaziForma] = useState(false)
  const [izmenaId, setIzmenaId] = useState(null)
  const [noviProizvod, setNoviProizvod] = useState({
    naziv: '',
    opis: '',
    cena: '',
    kategorija: 'zene',
    tip: 'torbe',
    boja: '',
    slikaGlavna: '',
    slikaHover: '',
    slike: []
  })

  useEffect(() => {
    ucitajProizvode()
  }, [])

  const ucitajProizvode = () => {
    axios.get('http://localhost:5000/api/products')
      .then((response) => {
        setProducts(response.data)
        setUcitavanje(false)
      })
      .catch((error) => {
        console.log('Greška pri učitavanju proizvoda:', error)
        setUcitavanje(false)
      })
  }

  const obrisiProizvod = async (id, naziv) => {
    const potvrda = window.confirm(`Obrisati "${naziv}"?`)
    if (!potvrda) return

    try {
      const token = localStorage.getItem('token')

      await axios.delete(`http://localhost:5000/api/products/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      ucitajProizvode()

    } catch (error) {
      alert('Greška pri brisanju proizvoda')
      console.log(error)
    }
  }

  const handleFormChange = (e) => {
    setNoviProizvod({
      ...noviProizvod,
      [e.target.name]: e.target.value
    })
  }

  const dodajPoljeZaSliku = () => {
    setNoviProizvod({
      ...noviProizvod,
      slike: [...noviProizvod.slike, '']
    })
  }

  const izmeniSliku = (index, vrednost) => {
    const noveSlike = [...noviProizvod.slike]
    noveSlike[index] = vrednost
    setNoviProizvod({
      ...noviProizvod,
      slike: noveSlike
    })
  }

  const ukloniSliku = (index) => {
    const noveSlike = noviProizvod.slike.filter((_, i) => i !== index)
    setNoviProizvod({
      ...noviProizvod,
      slike: noveSlike
    })
  }

  const otvoriFormuZaDodavanje = () => {
    setNoviProizvod({
      naziv: '',
      opis: '',
      cena: '',
      kategorija: 'zene',
      tip: 'torbe',
      boja: '',
      slikaGlavna: '',
      slikaHover: '',
      slike: []
    })
    setIzmenaId(null)
    setPrikaziForma(true)
  }

  const otvoriFormuZaIzmenu = (product) => {
    setNoviProizvod({
      naziv: product.naziv,
      opis: product.opis,
      cena: product.cena,
      kategorija: product.kategorija,
      tip: product.tip,
      boja: product.boja,
      slikaGlavna: product.slikaGlavna,
      slikaHover: product.slikaHover || '',
      slike: product.slike || []
    })
    setIzmenaId(product._id)
    setPrikaziForma(true)
  }

  const sacuvajProizvod = async (e) => {
    e.preventDefault()

    try {
      const token = localStorage.getItem('token')
      const headers = { Authorization: `Bearer ${token}` }

      if (izmenaId) {
        await axios.put(`http://localhost:5000/api/products/${izmenaId}`, noviProizvod, { headers })
      } else {
        await axios.post('http://localhost:5000/api/products', noviProizvod, { headers })
      }

      setPrikaziForma(false)
      ucitajProizvode()

    } catch (error) {
      alert('Greška pri čuvanju proizvoda')
      console.log(error)
    }
  }

  return (
    <div className="admin-page">
      <div className="container">

        <div className="admin-header">
          <h1>Admin panel</h1>
          <button className="admin-button-add" onClick={otvoriFormuZaDodavanje}>
            + Dodaj proizvod
          </button>
        </div>

        {ucitavanje && <p>Učitavanje...</p>}

        {!ucitavanje && (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Slika</th>
                <th>Naziv</th>
                <th>Kategorija</th>
                <th>Cena</th>
                <th>Akcije</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product._id}>
                  <td>
                    <img
                      src={product.slikaGlavna}
                      alt={product.naziv}
                      className="admin-table-image"
                    />
                  </td>
                  <td>{product.naziv}</td>
                  <td>{product.kategorija}</td>
                  <td>{product.cena} €</td>
                  <td>
                    <button className="admin-btn-edit" onClick={() => otvoriFormuZaIzmenu(product)}>
                      Izmeni
                    </button>
                    <button
                      className="admin-btn-delete"
                      onClick={() => obrisiProizvod(product._id, product.naziv)}
                    >
                      Obriši
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {prikaziForma && (
          <div className="modal-overlay" onClick={() => setPrikaziForma(false)}>
            <div className="admin-modal" onClick={(e) => e.stopPropagation()}>

              <button className="admin-modal-close" onClick={() => setPrikaziForma(false)}>
                ×
              </button>

              <h2>{izmenaId ? 'Izmeni proizvod' : 'Dodaj proizvod'}</h2>

              <form onSubmit={sacuvajProizvod}>

                <div className="form-group">
                  <label>Naziv</label>
                  <input
                    type="text"
                    name="naziv"
                    value={noviProizvod.naziv}
                    onChange={handleFormChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Opis</label>
                  <input
                    type="text"
                    name="opis"
                    value={noviProizvod.opis}
                    onChange={handleFormChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Cena (€)</label>
                  <input
                    type="number"
                    name="cena"
                    value={noviProizvod.cena}
                    onChange={handleFormChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Kategorija</label>
                  <select name="kategorija" value={noviProizvod.kategorija} onChange={handleFormChange}>
                    <option value="zene">Žene</option>
                    <option value="muskarci">Muškarci</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Tip proizvoda</label>
                  <select name="tip" value={noviProizvod.tip} onChange={handleFormChange}>
                    <option value="torbe">Torbe</option>
                    <option value="novcanici">Novčanici</option>
                    <option value="kaisevi">Kaiševi</option>
                    <option value="putne-torbe">Putne torbe</option>
                    <option value="poslovne-torbe">Poslovne torbe</option>
                    <option value="torbe-za-laptop">Torbe za laptop</option>
                    <option value="rancevi">Rančevi</option>
                    <option value="aksesoari">Aksesoari</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Boja</label>
                  <input
                    type="text"
                    name="boja"
                    value={noviProizvod.boja}
                    onChange={handleFormChange}
                    required
                    placeholder="npr. braon, crna"
                  />
                </div>

                <div className="form-group">
                  <label>Putanja do glavne slike</label>
                  <input
                    type="text"
                    name="slikaGlavna"
                    value={noviProizvod.slikaGlavna}
                    onChange={handleFormChange}
                    required
                    placeholder="/products/naziv-slike.png"
                  />
                </div>

                <div className="form-group">
                  <label>Putanja do hover slike (opciono)</label>
                  <input
                    type="text"
                    name="slikaHover"
                    value={noviProizvod.slikaHover}
                    onChange={handleFormChange}
                    placeholder="/products/naziv-slike-2.png"
                  />
                </div>

                <div className="form-group">
                  <label>Sve slike za galeriju (opciono)</label>

                  {noviProizvod.slike.map((slika, index) => (
                    <div key={index} className="admin-slika-red">
                      <input
                        type="text"
                        value={slika}
                        onChange={(e) => izmeniSliku(index, e.target.value)}
                        placeholder="/products/naziv-slike.png"
                      />
                      <button
                        type="button"
                        className="admin-slika-ukloni"
                        onClick={() => ukloniSliku(index)}
                      >
                        ×
                      </button>
                    </div>
                  ))}

                  <button type="button" className="admin-slika-dodaj" onClick={dodajPoljeZaSliku}>
                    + Dodaj sliku
                  </button>
                </div>

                <div className="admin-modal-dugmad">
                  <button type="button" className="modal-otkazi" onClick={() => setPrikaziForma(false)}>
                    Otkaži
                  </button>
                  <button type="submit" className="admin-button-add">
                    {izmenaId ? 'Sačuvaj izmene' : 'Sačuvaj'}
                  </button>
                </div>

              </form>

            </div>
          </div>
        )}

      </div>
    </div>
  )
}

export default AdminPanel