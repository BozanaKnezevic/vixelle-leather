import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

function Login() {
  const [mod, setMod] = useState('prijava') // 'prijava' ili 'registracija'
  const [ime, setIme] = useState('')
  const [email, setEmail] = useState('')
  const [lozinka, setLozinka] = useState('')
  const [greska, setGreska] = useState('')
  const [ucitavanje, setUcitavanje] = useState(false)

  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setGreska('')

    if (mod === 'registracija' && ime.trim() === '') {
      setGreska('Molimo unesite vaše ime')
      return
    }

    if (email.trim() === '') {
      setGreska('Molimo unesite email adresu')
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(email)) {
      setGreska('Email adresa nije u ispravnom formatu')
      return
    }

    if (lozinka.trim() === '') {
      setGreska('Molimo unesite lozinku')
      return
    }

    if (lozinka.length < 6) {
      setGreska('Lozinka mora imati najmanje 6 karaktera')
      return
    }

    setUcitavanje(true)

    try {
      if (mod === 'prijava') {
        const response = await axios.post('http://localhost:5000/api/auth/login', {
          email,
          lozinka
        })

        localStorage.setItem('token', response.data.token)
        localStorage.setItem('korisnik', JSON.stringify(response.data.korisnik))
        window.dispatchEvent(new Event('authChange'))

        navigate('/')

      } else {
        await axios.post('http://localhost:5000/api/auth/register', {
          ime,
          email,
          lozinka
        })

        setMod('prijava')
        setGreska('')
        alert('Uspešno ste se registrovali! Sada se prijavite.')
      }

    } catch (error) {
      const poruka = error.response?.data?.message || 'Došlo je do greške'
      setGreska(poruka)
    } finally {
      setUcitavanje(false)
    }
  }

  return (
    <div className="auth-page">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-12 col-sm-10 col-md-7 col-lg-5 col-xl-4">

            <div className="auth-card">

              <h1>
                {mod === 'prijava' ? 'Prijava' : 'Registracija'}
              </h1>

              <form onSubmit={handleSubmit}>

                {mod === 'registracija' && (
                  <div className="form-group">
                    <label>Ime</label>
                    <input
                      type="text"
                      value={ime}
                      onChange={(e) => setIme(e.target.value)}
                    />
                  </div>
                )}

                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="text"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className="form-group">
                  <label>Lozinka</label>
                  <input
                    type="password"
                    value={lozinka}
                    onChange={(e) => setLozinka(e.target.value)}
                  />
                </div>

                {greska && (
                  <p className="auth-error">{greska}</p>
                )}

                <button type="submit" className="auth-button" disabled={ucitavanje}>
                  {ucitavanje
                    ? 'Sačekajte...'
                    : mod === 'prijava' ? 'Prijavi se' : 'Registruj se'}
                </button>

              </form>

              <p className="auth-switch">
                {mod === 'prijava' ? (
                  <>
                    Nemate nalog?{' '}
                    <span onClick={() => { setMod('registracija'); setGreska('') }}>
                      Registrujte se
                    </span>
                  </>
                ) : (
                  <>
                    Već imate nalog?{' '}
                    <span onClick={() => { setMod('prijava'); setGreska('') }}>
                      Prijavite se
                    </span>
                  </>
                )}
              </p>

            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Login