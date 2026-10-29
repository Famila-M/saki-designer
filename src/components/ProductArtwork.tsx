interface ProductArtworkProps {
  name: string
  artwork: string
  className?: string
}

export function ProductArtwork({ name, artwork, className = '' }: ProductArtworkProps) {
  return (
    <div className={`product-art art-${artwork} ${className}`} role="img" aria-label={`${name}, illustrative demo artwork`}>
      <div className="fabric-shape" /><span className="art-mark">S</span><span className="art-caption">Illustrative design</span>
    </div>
  )
}