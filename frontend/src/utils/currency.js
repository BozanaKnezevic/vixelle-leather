import axios from 'axios'

export async function dobijKursEurRsd() {
  try {
    const response = await axios.get('https://open.er-api.com/v6/latest/EUR')
    return response.data.rates.RSD
  } catch (error) {
    console.log('Greška pri učitavanju kursa:', error)
    return null
  }
}