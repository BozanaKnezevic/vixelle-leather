const jwt = require('jsonwebtoken')

function proveriToken(req, res, next) {
  const authHeader = req.headers.authorization

  if (!authHeader) {
    return res.status(401).json({ message: 'Niste ulogovani' })
  }

  const token = authHeader.split(' ')[1]

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.korisnik = decoded
    next()
  } catch (error) {
    return res.status(401).json({ message: 'Nevažeći token' })
  }
}

function proveriAdmina(req, res, next) {
  if (req.korisnik.uloga !== 'admin') {
    return res.status(403).json({ message: 'Nemate dozvolu za ovu akciju' })
  }
  next()
}

module.exports = { proveriToken, proveriAdmina }