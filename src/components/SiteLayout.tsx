import { ArrowUpRight, Menu, Search, ShoppingBag, X } from 'lucide-react'
import { useEffect, useState, type FormEvent } from 'react'
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import { useCart } from '../cart/CartContext'
import { categories } from '../types'

export function SiteLayout() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [search, setSearch] = useState('')
  const { items } = useCart()
  const navigate = useNavigate()
  const location = useLocation()
  const cartCount = items.reduce((total, item) => total + item.quantity, 0)

  useEffect(() => {
    setMenuOpen(false)
    setSearchOpen(false)
  }, [location.pathname])

  function submitSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const params = new URLSearchParams()
    if (search.trim()) params.set('q', search.trim())
    navigate(`/shop${params.size ? `?${params.toString()}` : ''}`)
  }

  return (
    <div className="site-shell">
      <div className="announcement">A little more lovely, delivered across India <span>✳</span></div>
      <header className="site-header">
        <div className="header-main">
          <button className="icon-button menu-toggle" type="button" aria-label={menuOpen ? 'Close menu' : 'Open menu'} onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X size={21} /> : <Menu size={21} />}</button>
          <Link className="brand" to="/" aria-label="Saki Designer home"><span className="brand-name">saki</span><span className="brand-subtitle">DESIGNER</span></Link>
          <nav className="desktop-nav" aria-label="Main navigation">
            <NavLink to="/shop">Shop all</NavLink>
            {categories.map((category) => <NavLink key={category} to={`/shop?category=${encodeURIComponent(category)}`}>{category}</NavLink>)}
          </nav>
          <div className="header-actions">
            <button className="icon-button search-toggle" type="button" aria-label="Search products" onClick={() => setSearchOpen(!searchOpen)}>{searchOpen ? <X size={20} /> : <Search size={20} />}</button>
            <Link className="icon-button bag-link" to="/cart" aria-label={`Shopping bag, ${cartCount} items`}><ShoppingBag size={20} /><span className="bag-count">{cartCount}</span></Link>
          </div>
        </div>
        {searchOpen && <form className="header-search" onSubmit={submitSearch} role="search"><Search size={18} /><input autoFocus value={search} onChange={(event) => setSearch(event.target.value)} placeholder="Search the collection" aria-label="Search the collection" /><button className="text-button" type="submit">Search <ArrowUpRight size={15} /></button></form>}
        {menuOpen && <nav className="mobile-nav" aria-label="Mobile navigation"><NavLink to="/shop">Shop all</NavLink>{categories.map((category) => <NavLink key={category} to={`/shop?category=${encodeURIComponent(category)}`}>{category}</NavLink>)}<p>Thoughtful Indian style, made to feel like you.</p></nav>}
      </header>
      <main className="main-content"><Outlet /></main>
      <footer className="site-footer">
        <div className="footer-main">
          <div className="footer-brand-block"><Link className="brand footer-brand" to="/"><span className="brand-name">saki</span><span className="brand-subtitle">DESIGNER</span></Link><p>Indian wear for the moments that become memories.</p></div>
          <div className="footer-links"><span className="footer-heading">Explore</span><Link to="/shop">Shop all</Link><Link to="/shop?category=Sarees">Sarees</Link><Link to="/shop?category=Kurtis">Kurtis</Link></div>
          <div className="footer-note"><span className="footer-heading">A note from Saki</span><p>Demo collection for preview only. Product designs, prices and availability are illustrative and are not current inventory.</p></div>
        </div>
        <div className="footer-bottom"><span>© {new Date().getFullYear()} Saki Designer</span><span>Made with love in India</span></div>
      </footer>
    </div>
  )
}