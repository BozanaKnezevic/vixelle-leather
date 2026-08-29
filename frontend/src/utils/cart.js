export function ucitajKorpu() {
  const podaci = localStorage.getItem('korpa')
  return podaci ? JSON.parse(podaci) : []
}

export function sacuvajKorpu(korpa) {
  localStorage.setItem('korpa', JSON.stringify(korpa))
  window.dispatchEvent(new Event('cartChange'))
}

export function dodajUKorpu(product, kolicina = 1) {
  const korpa = ucitajKorpu()

  const postojecaStavka = korpa.find((item) => item._id === product._id)

  if (postojecaStavka) {
    postojecaStavka.kolicina += kolicina
  } else {
    korpa.push({
      _id: product._id,
      naziv: product.naziv,
      cena: product.cena,
      slikaGlavna: product.slikaGlavna,
      boja: product.boja,
      kolicina: kolicina
    })
  }

  sacuvajKorpu(korpa)
}

export function ukloniIzKorpe(id) {
  const korpa = ucitajKorpu()
  const novaKorpa = korpa.filter((item) => item._id !== id)
  sacuvajKorpu(novaKorpa)
}

export function izmeniKolicinu(id, novaKolicina) {
  const korpa = ucitajKorpu()
  const stavka = korpa.find((item) => item._id === id)

  if (stavka) {
    if (novaKolicina < 1) {
      ukloniIzKorpe(id)
    } else {
      stavka.kolicina = novaKolicina
      sacuvajKorpu(korpa)
    }
  }
}

export function ukupnaKolicina() {
  const korpa = ucitajKorpu()
  return korpa.reduce((zbir, item) => zbir + item.kolicina, 0)
}

export function ukupnaCena() {
  const korpa = ucitajKorpu()
  return korpa.reduce((zbir, item) => zbir + (item.cena * item.kolicina), 0)
}