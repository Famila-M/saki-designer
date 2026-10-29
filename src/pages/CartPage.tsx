import { ArrowRight, Minus, Plus, ShoppingBag, Trash2 } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useCart } from '../cart/CartContext'
import { ProductArtwork } from '../components/ProductArtwork'
import { products } from '../data/products'

export function CartPage() {
  const { items, setQuantity, removeItem } = useCart()
  const cartLines = items.flatMap((item) => { const product = products.find((entry) => entry.id === item.productId); return product ? [{ item, product }] : [] })
  const subtotal = cartLines.reduce((total, { item, product }) => total + product.price * item.quantity, 0)

  if (!cartLines.length) return <section className="empty-cart section-wrap"><div className="empty-cart-icon"><ShoppingBag size={27} /></div><p className="eyebrow">Your bag is taking a breather</p><h1>Nothing here <em>just yet.</em></h1><p>Your bag is empty. Browse the demo collection and find a design you love.</p><Link className="button button-dark" to="/shop">Explore the collection <ArrowRight size={17} /></Link></section>

  return <section className="cart-page section-wrap">
    <div className="breadcrumbs"><Link to="/">Home</Link><span>/</span><span>Your bag</span></div>
    <div className="cart-heading"><div><p className="eyebrow">A lovely little edit</p><h1>Your bag <em>({cartLines.reduce((sum, line) => sum + line.item.quantity, 0)})</em></h1></div><Link className="underlined-link" to="/shop">Continue browsing <ArrowRight size={16} /></Link></div>
    <div className="cart-demo-note"><span>Demo bag</span> These are illustrative designs and prices only. No order or payment can be placed.</div>
    <div className="cart-layout"><div className="cart-lines">{cartLines.map(({ item, product }) => <article className="cart-line" key={`${item.productId}-${item.size}-${item.color}`}>
      <Link className="cart-line-art" to={`/products/${product.id}`}><ProductArtwork name={product.name} artwork={product.artwork} /></Link>
      <div className="cart-line-info"><p className="product-card-category">{product.category}</p><Link className="cart-line-name" to={`/products/${product.id}`}>{product.name}</Link><p className="cart-line-options">{item.color} <span>·</span> Size {item.size}</p>
        <div className="cart-line-bottom"><div className="quantity-control" aria-label={`Quantity for ${product.name}`}><button type="button" aria-label="Decrease quantity" onClick={() => setQuantity(item, item.quantity - 1)}><Minus size={14} /></button><span>{item.quantity}</span><button type="button" aria-label="Increase quantity" onClick={() => setQuantity(item, item.quantity + 1)}><Plus size={14} /></button></div><button className="remove-button" type="button" onClick={() => removeItem(item)}><Trash2 size={15} /><span>Remove</span></button></div>
      </div><span className="cart-line-price">₹{(product.price * item.quantity).toLocaleString('en-IN')}</span>
    </article>)}</div>
      <aside className="cart-summary"><p className="eyebrow">The totals</p><div className="summary-row"><span>Subtotal</span><strong>₹{subtotal.toLocaleString('en-IN')}</strong></div><div className="summary-row summary-muted"><span>Delivery</span><span>Not calculated</span></div><div className="summary-total"><span>Estimated total</span><strong>₹{subtotal.toLocaleString('en-IN')}</strong></div><p className="summary-caption">Demo total only. Checkout and payment are not available.</p><Link className="button button-dark summary-button" to="/shop">Keep exploring <ArrowRight size={17} /></Link><p className="shipping-note">✳ Delivery planned across India</p></aside>
    </div>
  </section>
}