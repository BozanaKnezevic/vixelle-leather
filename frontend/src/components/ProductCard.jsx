import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCurrency } from '../context/CurrencyContext'

function ProductCard({ product, sveVarijante }) {
  const [prikazan, setPrikazan] = useState(product)

  const { formatirajCenu } = useCurrency()

  return (
    <Link to={`/proizvodi/${prikazan._id}`} className="product-card">

      <div className="product-image">

        <img
          src={prikazan.slikaGlavna}
          alt={prikazan.naziv}
        />

        {prikazan.slikaHover && (
          <img
            src={prikazan.slikaHover}
            alt={prikazan.naziv}
            className="image-hover"
          />
        )}

      </div>

      <div className="product-info">
        <h3>{prikazan.naziv}</h3>
        <p>{prikazan.opis}</p>
        <strong>{formatirajCenu(prikazan.cena)}</strong>

        {sveVarijante.length > 1 && (
          <div className="product-card-colors">
            {sveVarijante.map((v) => (
              <span
                key={v._id}
                className={`color-swatch-small color-${v.boja} ${prikazan._id === v._id ? 'active' : ''}`}
                title={v.boja}
                onClick={(e) => {
                  e.preventDefault()
                  setPrikazan(v)
                }}
              />
            ))}
          </div>
        )}
      </div>

    </Link>
  )
}

export default ProductCard