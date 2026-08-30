const express = require('express')
const router = express.Router()
const Order = require('../models/Order')
const { proveriToken } = require('../middleware/auth')

// POST /api/orders - kreiraj novu porudžbinu (samo ulogovan korisnik)
router.post('/', proveriToken, async (req, res) => {
  try {
    const { stavke, dostava, ukupnaCena } = req.body

    const novaPorudzbina = new Order({
      korisnik: req.korisnik.id,
      stavke,
      dostava,
      ukupnaCena
    })

    await novaPorudzbina.save()

    res.status(201).json(novaPorudzbina)

  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// GET /api/orders/moje - vrati sve porudžbine ulogovanog korisnika
router.get('/moje', proveriToken, async (req, res) => {
  try {
    const porudzbine = await Order.find({ korisnik: req.korisnik.id }).sort({ createdAt: -1 })
    res.json(porudzbine)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

module.exports = router