const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const User = require('../models/User')
const jwt = require('jsonwebtoken')
const { proveriToken } = require('../middleware/auth')

// POST /api/auth/register - registracija novog korisnika
router.post('/register', async (req, res) => {
  try {
    const { ime, email, lozinka } = req.body

    // Provera da li korisnik sa tim email-om već postoji
    const postojiKorisnik = await User.findOne({ email })
    if (postojiKorisnik) {
      return res.status(400).json({ message: 'Korisnik sa ovim email-om već postoji' })
    }

    // Heš-ovanje lozinke pre čuvanja u bazu
    const salt = await bcrypt.genSalt(10)
    const hesovanaLozinka = await bcrypt.hash(lozinka, salt)

    // Kreiranje novog korisnika
    const noviKorisnik = new User({
      ime,
      email,
      lozinka: hesovanaLozinka
    })

    await noviKorisnik.save()

    res.status(201).json({ message: 'Uspešno ste se registrovali' })

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

module.exports = router

// POST /api/auth/login - prijava korisnika
router.post('/login', async (req, res) => {
  try {
    const { email, lozinka } = req.body

    // Provera da li korisnik postoji
    const korisnik = await User.findOne({ email })
    if (!korisnik) {
      return res.status(400).json({ message: 'Pogrešan email ili lozinka' })
    }

    // Provera da li se lozinka poklapa sa heš-om u bazi
    const lozinkaTacna = await bcrypt.compare(lozinka, korisnik.lozinka)
    if (!lozinkaTacna) {
      return res.status(400).json({ message: 'Pogrešan email ili lozinka' })
    }

    // Kreiranje JWT tokena
    const token = jwt.sign(
      { id: korisnik._id, uloga: korisnik.uloga },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    )

    res.json({
      token,
      korisnik: {
        id: korisnik._id,
        ime: korisnik.ime,
        email: korisnik.email,
        uloga: korisnik.uloga
      }
    })

  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

// GET /api/auth/profil - vrati podatke o ulogovanom korisniku (zaštićena ruta)
router.get('/profil', proveriToken, async (req, res) => {
  try {
    const korisnik = await User.findById(req.korisnik.id).select('-lozinka')
    res.json(korisnik)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})