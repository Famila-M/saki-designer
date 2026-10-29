import { ArrowUpRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import type { Product } from '../types'
import { ProductArtwork } from './ProductArtwork'

export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="product-card">
      <Link className="product-card-image" to={`/products/${product.id}`} aria-label={`View ${product.name}`}>
        <ProductArtwork name={product.name} artwork={product.artwork} />
        <span className="product-category">{product.category}</span>
        {product.badge && <span className="product-badge">{product.badge}</span>}
        <span className="product-quick-view" aria-hidden="true"><ArrowUpRight size={18} /></span>
      </Link>
      <div className="product-card-info">
        <div><p className="product-card-category">{product.category}</p><Link className="product-card-name" to={`/products/${product.id}`}>{product.name}</Link></div>
        <span className="product-price">₹{product.price.toLocaleString('en-IN')}</span>
      </div>
    </article>
  )
}