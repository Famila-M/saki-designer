export const categories = ['Sarees', 'Kurtis', 'Co-ord Sets', 'Dresses'] as const

export type Category = (typeof categories)[number]
export type Size = 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | 'XXXL'

export interface Product {
  id: string
  name: string
  category: Category
  price: number
  description: string
  colors: { name: string; hex: string }[]
  sizes: Size[]
  artwork: string
  badge?: string
}

export interface CartItem {
  productId: string
  size: Size
  color: string
  quantity: number
}