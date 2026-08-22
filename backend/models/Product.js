const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
  naziv: {
    type: String,
    required: true
  },
  opis: {
    type: String,
    required: true
  },
  cena: {
    type: Number,
    required: true
  },
  kategorija: {
    type: String,
    required: true // npr. "zene", "muskarci"
  },
  boja: {
    type: String,
    required: true
  },
   tip: {
    type: String,
    required: true
  },
  slikaGlavna: {
    type: String,
    required: true // putanja do slike, npr. "/products/bag-front.png"
  },
  slikaHover: {
    type: String // opciono - druga slika za hover efekat
  },
  slike: {
  type: [String],
  default: []
}
}, {
  timestamps: true // automatski dodaje "createdAt" i "updatedAt"
})

module.exports = mongoose.model('Product', productSchema)