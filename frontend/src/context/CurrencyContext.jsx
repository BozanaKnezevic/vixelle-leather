import { createContext, useContext, useState, useEffect } from 'react'
import { dobijKursEurRsd } from '../utils/currency'

const CurrencyContext = createContext()

export function CurrencyProvider({ children }) {
  const [valuta, setValuta] = useState('EUR')
  const [kursRsd, setKursRsd] = useState(null)

  useEffect(() => {
    dobijKursEurRsd().then((kurs) => setKursRsd(kurs))
  }, [])

  const formatirajCenu = (cenaEur) => {
    if (valuta === 'RSD' && kursRsd) {
      const cenaRsd = cenaEur * kursRsd
      return `${cenaRsd.toLocaleString('sr-RS', { maximumFractionDigits: 0 })} RSD`
    }
    return `${cenaEur} €`
  }

  return (
    <CurrencyContext.Provider value={{ valuta, setValuta, formatirajCenu }}>
      {children}
    </CurrencyContext.Provider>
  )
}

export function useCurrency() {
  return useContext(CurrencyContext)
}