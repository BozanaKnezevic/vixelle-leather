const mongoose = require('mongoose')

const orderSchema = new mongoose.Schema({
  korisnik: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  stavke: [
    {
      naziv: String,
      cena: Number,
      kolicina: Number,
      boja: String,
      slikaGlavna: String
    }
  ],
  dostava: {
    imePrezime: {
      type: String,
      required: true
    },
    adresa: {
      type: String,
      required: true
    },
    grad: {
      type: String,
      required: true
    },
    telefon: {
      type: String,
      required: true
    }
  },
  ukupnaCena: {
    type: Number,
    required: true
  },
  status: {
    type: String,
    enum: ['na cekanju', 'potvrdjena', 'poslata', 'zavrsena'],
    default: 'na cekanju'
  }
}, {
  timestamps: true
})

module.exports = mongoose.model('Order', orderSchema)