import { ArrowDown, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { ProductCard } from '../components/ProductCard'
import { ProductArtwork } from '../components/ProductArtwork'
import { categoryArtworks, products } from '../data/products'
import { categories } from '../types'

export function HomePage() {
  return (
    <>
      <section className="hero">
        <div className="hero-copy"><p className="eyebrow"><span className="eyebrow-rule" /> A wardrobe with a little soul</p><h1>Rooted in <em>tradition.</em><br />Made for <em>your story.</em></h1><p className="hero-description">Thoughtful Indian wear, imagined for the way you live, celebrate and make every day your own.</p><Link className="button button-dark" to="/shop">Shop the collection <ArrowRight size={17} /></Link><div className="hero-footnote"><span>01 / 04</span><span>Everyday silhouettes, a little extraordinary</span></div></div>
        <div className="hero-visual"><ProductArtwork name="Saki collection" artwork="hero" className="hero-art" /><div className="hero-stamp"><span>SAKI</span><span>DESIGNER</span><i>✳</i></div><span className="hero-image-caption">A glimpse of what's to come</span></div>
        <a className="scroll-hint" href="#categories"><ArrowDown size={16} /><span>Explore</span></a>
      </section>
      <section className="demo-notice" aria-label="Demo product notice"><span className="notice-mark">i</span><p><strong>Preview collection.</strong> The products and prices shown are demo examples, not current inventory. Real designs are on their way.</p><Link to="/shop">View demo shop <ArrowRight size={15} /></Link></section>
      <section className="categories-section section-wrap" id="categories">
        <div className="section-heading"><div><p className="eyebrow">Find your feeling</p><h2>Pieces for <em>every you.</em></h2></div><Link className="underlined-link" to="/shop">Explore all <ArrowRight size={16} /></Link></div>
        <div className="category-grid">{categories.map((category, index) => <Link className={`category-card category-card-${index + 1}`} to={`/shop?category=${encodeURIComponent(category)}`} key={category}><ProductArtwork name={`${category} demo artwork`} artwork={categoryArtworks[category]} /><span className="category-number">0{index + 1}</span><span className="category-name">{category}</span><span className="category-arrow"><ArrowRight size={17} /></span></Link>)}</div>
      </section>
      <section className="featured-section"><div className="section-wrap"><div className="section-heading"><div><p className="eyebrow">The preview edit</p><h2>Meet the <em>mood.</em></h2></div><Link className="underlined-link" to="/shop">All demo pieces <ArrowRight size={16} /></Link></div><div className="product-grid">{products.slice(0, 4).map((product) => <ProductCard key={product.id} product={product} />)}</div></div></section>
      <section className="home-note section-wrap"><span className="note-ornament">✳</span><p className="eyebrow">From India, with intention</p><h2>Made for the<br /><em>way you feel.</em></h2><p>We're building a thoughtful collection of sarees, kurtis, co-ord sets and dresses. Stay close; the real pieces are coming soon.</p><Link className="text-link" to="/shop">Discover the preview <ArrowRight size={16} /></Link></section>
    </>
  )
}