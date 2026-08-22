const express = require('express')
const router = express.Router()
const Product = require('../models/Product')
const { proveriToken, proveriAdmina } = require('../middleware/auth')

// GET /api/products - vrati sve proizvode
router.get('/', async (req, res) => {
  try {
    const products = await Product.find()
    res.json(products)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})
// GET /api/products/:id - vrati jedan proizvod po ID-ju
router.get('/:id', async (req, res) => {
  try {
    const product = await Product.findById(req.params.id)

    if (!product) {
      return res.status(404).json({ message: 'Proizvod nije pronađen' })
    }

    res.json(product)
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})
// POST /api/products - dodaj novi proizvod (samo admin)
router.post('/', proveriToken, proveriAdmina, async (req, res) => {
  try {
    const noviProizvod = new Product(req.body)
    await noviProizvod.save()
    res.status(201).json(noviProizvod)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// PUT /api/products/:id - izmeni postojeći proizvod (samo admin)
router.put('/:id', proveriToken, proveriAdmina, async (req, res) => {
  try {
    const izmenjeniProizvod = await Product.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    )

    if (!izmenjeniProizvod) {
      return res.status(404).json({ message: 'Proizvod nije pronađen' })
    }

    res.json(izmenjeniProizvod)
  } catch (error) {
    res.status(400).json({ message: error.message })
  }
})

// DELETE /api/products/:id - obriši proizvod (samo admin)
router.delete('/:id', proveriToken, proveriAdmina, async (req, res) => {
  try {
    const obrisaniProizvod = await Product.findByIdAndDelete(req.params.id)

    if (!obrisaniProizvod) {
      return res.status(404).json({ message: 'Proizvod nije pronađen' })
    }

    res.json({ message: 'Proizvod je uspešno obrisan' })
  } catch (error) {
    res.status(500).json({ message: error.message })
  }
})

module.exports = router