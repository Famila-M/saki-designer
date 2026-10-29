import { ArrowLeft, Minus, Plus, ShoppingBag } from 'lucide-react'
import { useState, type CSSProperties } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useCart } from '../cart/CartContext'
import { ProductArtwork } from '../components/ProductArtwork'
import { ProductCard } from '../components/ProductCard'
import { products } from '../data/products'
import type { Size } from '../types'

export function ProductPage() {
  const { productId } = useParams()
  const product = products.find((item) => item.id === productId)
  const [selectedSize, setSelectedSize] = useState<Size | null>(null)
  const [selectedColor, setSelectedColor] = useState(product?.colors[0]?.name ?? '')
  const [quantity, setQuantity] = useState(1)
  const [message, setMessage] = useState('')
  const { addItem } = useCart()
  const navigate = useNavigate()

  if (!product) return <section className="empty-state page-empty section-wrap"><p className="eyebrow">Not in this collection</p><h1>We couldn't find that piece.</h1><Link className="button button-dark" to="/shop">Back to the shop</Link></section>
  const selectedProduct = product
  const recommendations = products.filter((item) => item.category === product.category && item.id !== product.id).slice(0, 3)

  function handleAddToCart() {
    if (!selectedSize) { setMessage('Choose a size to add this demo design to your bag.'); return }
    addItem(selectedProduct, selectedSize, selectedColor, quantity)
    setMessage('Added to your demo bag.')
  }

  return <>
    <section className="product-detail section-wrap">
      <div className="breadcrumbs"><Link to="/shop"><ArrowLeft size={14} /> Shop</Link><span>/</span><span>{product.category}</span></div>
      <div className="detail-grid"><div className="detail-art-wrap"><ProductArtwork name={product.name} artwork={product.artwork} className="detail-art" /><span className="detail-demo-label">Illustrative demo artwork, not a product photo</span></div>
        <div className="detail-info"><p className="eyebrow">{product.category} · Preview design</p><h1>{product.name}</h1><p className="detail-price">₹{product.price.toLocaleString('en-IN')}</p><p className="detail-description">{product.description}</p>
          <div className="option-block"><div className="option-heading"><span>Colour</span><span>{selectedColor}</span></div><div className="color-options" aria-label="Choose a colour">{product.colors.map((color) => <button className={`color-option ${selectedColor === color.name ? 'selected' : ''}`} type="button" key={color.name} style={{ '--swatch': color.hex } as CSSProperties} onClick={() => setSelectedColor(color.name)} aria-label={color.name} aria-pressed={selectedColor === color.name} />)}</div></div>
          <div className="option-block"><div className="option-heading"><span>Size</span><span className="size-guide-note">XS — XXXL</span></div><div className="size-options" aria-label="Choose a size">{product.sizes.map((size) => <button className={selectedSize === size ? 'selected' : ''} type="button" key={size} onClick={() => { setSelectedSize(size); setMessage('') }} aria-pressed={selectedSize === size}>{size}</button>)}</div></div>
          <div className="detail-actions"><div className="quantity-control" aria-label="Quantity"><button type="button" aria-label="Decrease quantity" onClick={() => setQuantity(Math.max(1, quantity - 1))}><Minus size={15} /></button><span>{quantity}</span><button type="button" aria-label="Increase quantity" onClick={() => setQuantity(quantity + 1)}><Plus size={15} /></button></div><button className="button button-dark add-to-bag" type="button" onClick={handleAddToCart}><ShoppingBag size={17} /> Add to bag</button></div>
          <p className="form-message" role="status">{message}</p><p className="delivery-note"><span>✳</span> Thoughtfully imagined. Demo design only; not available to order.</p><button className="view-bag-link" type="button" onClick={() => navigate('/cart')}>View your bag</button>
        </div>
      </div>
    </section>
    {!!recommendations.length && <section className="related-section section-wrap"><div className="section-heading"><div><p className="eyebrow">More from this edit</p><h2>You may <em>also like.</em></h2></div></div><div className="product-grid">{recommendations.map((item) => <ProductCard key={item.id} product={item} />)}</div></section>}
  </>
}