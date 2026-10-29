import { Search, SlidersHorizontal } from 'lucide-react'
import { useMemo, useState, type FormEvent } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { ProductCard } from '../components/ProductCard'
import { products } from '../data/products'
import { categories } from '../types'

type SortOption = 'featured' | 'price-low' | 'price-high' | 'name'

export function ShopPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [searchInput, setSearchInput] = useState(searchParams.get('q') ?? '')
  const [sort, setSort] = useState<SortOption>('featured')
  const category = searchParams.get('category') ?? 'All pieces'
  const query = searchParams.get('q')?.trim().toLowerCase() ?? ''
  const visibleProducts = useMemo(() => {
    const filtered = products.filter((product) => (category === 'All pieces' || product.category === category) && (!query || `${product.name} ${product.category} ${product.description}`.toLowerCase().includes(query)))
    if (sort === 'price-low') return [...filtered].sort((a, b) => a.price - b.price)
    if (sort === 'price-high') return [...filtered].sort((a, b) => b.price - a.price)
    if (sort === 'name') return [...filtered].sort((a, b) => a.name.localeCompare(b.name))
    return filtered
  }, [category, query, sort])

  function chooseCategory(nextCategory: string) {
    const next = new URLSearchParams(searchParams)
    if (nextCategory === 'All pieces') next.delete('category')
    else next.set('category', nextCategory)
    setSearchParams(next)
  }

  function submitSearch(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const next = new URLSearchParams(searchParams)
    if (searchInput.trim()) next.set('q', searchInput.trim())
    else next.delete('q')
    setSearchParams(next)
  }

  return (
    <section className="shop-page section-wrap">
      <div className="breadcrumbs"><Link to="/">Home</Link><span>/</span><span>Shop</span></div>
      <div className="shop-heading"><div><p className="eyebrow">The Saki preview edit</p><h1>{category === 'All pieces' ? 'The collection' : category}</h1></div><p>Illustrative demo designs and prices. These are not available products or current inventory.</p></div>
      <div className="shop-controls"><div className="filter-tabs" aria-label="Filter by category"><button className={category === 'All pieces' ? 'active' : ''} type="button" onClick={() => chooseCategory('All pieces')}>All pieces</button>{categories.map((item) => <button className={category === item ? 'active' : ''} type="button" key={item} onClick={() => chooseCategory(item)}>{item}</button>)}</div>
        <div className="shop-tools"><form className="shop-search" role="search" onSubmit={submitSearch}><Search size={17} /><input value={searchInput} onChange={(event) => setSearchInput(event.target.value)} placeholder="Search pieces" aria-label="Search pieces" /></form>
          <label className="sort-select"><SlidersHorizontal size={16} /><span className="sr-only">Sort products</span><select value={sort} onChange={(event) => setSort(event.target.value as SortOption)}><option value="featured">Featured</option><option value="price-low">Price: low to high</option><option value="price-high">Price: high to low</option><option value="name">Name</option></select></label></div>
      </div>
      <div className="results-line"><span>{visibleProducts.length} demo {visibleProducts.length === 1 ? 'design' : 'designs'}</span><span>Illustrative, not for sale</span></div>
      {visibleProducts.length ? <div className="product-grid shop-product-grid">{visibleProducts.map((product) => <ProductCard key={product.id} product={product} />)}</div> : <div className="empty-state"><span className="empty-ornament"><Search size={24} /></span><p className="eyebrow">Nothing in this edit</p><h2>No pieces found.</h2><p>Try another search or choose a different category.</p><button className="button button-dark" type="button" onClick={() => { setSearchInput(''); setSearchParams({}) }}>Clear filters</button></div>}
    </section>
  )
}