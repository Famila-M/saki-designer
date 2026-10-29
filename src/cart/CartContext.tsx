import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import type { CartItem, Product, Size } from '../types'

interface CartContextValue {
  items: CartItem[]
  addItem: (product: Product, size: Size, color: string, quantity: number) => void
  setQuantity: (item: CartItem, quantity: number) => void
  removeItem: (item: CartItem) => void
}

const CartContext = createContext<CartContextValue | null>(null)
const storageKey = 'saki-designer-cart'

function readCart(): CartItem[] {
  try {
    const stored = localStorage.getItem(storageKey)
    const parsed: unknown = stored ? JSON.parse(stored) : []
    if (!Array.isArray(parsed)) return []
    return parsed.filter((item): item is CartItem =>
      typeof item?.productId === 'string'
      && typeof item?.size === 'string'
      && typeof item?.color === 'string'
      && Number.isInteger(item?.quantity)
      && item.quantity > 0,
    )
  } catch {
    return []
  }
}

function isSameItem(left: CartItem, right: CartItem) {
  return left.productId === right.productId && left.size === right.size && left.color === right.color
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>(readCart)

  useEffect(() => {
    localStorage.setItem(storageKey, JSON.stringify(items))
  }, [items])

  function addItem(product: Product, size: Size, color: string, quantity: number) {
    setItems((current) => {
      const newItem = { productId: product.id, size, color, quantity }
      const existing = current.find((item) => isSameItem(item, newItem))
      if (!existing) return [...current, newItem]
      return current.map((item) => isSameItem(item, newItem) ? { ...item, quantity: item.quantity + quantity } : item)
    })
  }

  function setQuantity(itemToUpdate: CartItem, quantity: number) {
    setItems((current) => current.map((item) => isSameItem(item, itemToUpdate) ? { ...item, quantity: Math.max(1, quantity) } : item))
  }

  function removeItem(itemToRemove: CartItem) {
    setItems((current) => current.filter((item) => !isSameItem(item, itemToRemove)))
  }

  return <CartContext.Provider value={{ items, addItem, setQuantity, removeItem }}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart must be used within a CartProvider')
  return context
}