const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()

const dns = require('dns')
dns.setServers(['8.8.8.8', '8.8.4.4'])

const app = express()

// Middleware
app.use(cors())
app.use(express.json())

const productRoutes = require('./routes/products')
app.use('/api/products', productRoutes)

// Konekcija na MongoDB bazu
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Uspešno povezano na MongoDB bazu'))
  .catch((error) => console.log('❌ Greška pri povezivanju na bazu:', error))

// Test ruta - da proverimo da server radi
app.get('/', (req, res) => {
  res.send('Vixelle Leather backend radi!')
})

const PORT = process.env.PORT || 5000

app.listen(PORT, () => {
  console.log(`🚀 Server radi na portu ${PORT}`)
})