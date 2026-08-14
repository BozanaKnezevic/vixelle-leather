const mongoose = require('mongoose')
require('dotenv').config()
const dns = require('dns')
dns.setServers(['8.8.8.8', '8.8.4.4'])

const Product = require('./models/Product')

const products = [
  {
    naziv: 'Kožna torba',
    opis: 'Elegantna ženska kožna torba',
    cena: 120,
    kategorija: 'zene',
    slikaGlavna: '/products/bag-front.png',
    slikaHover: '/products/bag-side.png'
  },
  {
    naziv: 'Kožni novčanik',
    opis: 'Minimalistički ženski novčanik',
    cena: 65,
    kategorija: 'zene',
    slikaGlavna: '/products/wallet-front.png',
    slikaHover: '/products/wallet-side.jpg'
  },
  {
    naziv: 'Kožna torba za laptop',
    opis: 'Elegantna poslovna muška torba za laptop',
    cena: 95,
    kategorija: 'muskarci',
    slikaGlavna: '/products/laptop-bag-front.jpg',
    slikaHover: '/products/laptop-bag-side.jpg'
  }
]

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 5000
    })
    console.log('✅ Povezano na bazu')

    await Product.deleteMany()
    console.log('🗑️  Obrisani stari proizvodi (ako ih je bilo)')

    await Product.insertMany(products)
    console.log(`✅ Ubačeno ${products.length} proizvoda u bazu`)

    mongoose.connection.close()
    console.log('👋 Konekcija zatvorena')
  } catch (error) {
    console.log('❌ Greška:', error)
    mongoose.connection.close()
  }
}

seedDatabase()