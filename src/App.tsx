import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { CartProvider } from './cart/CartContext'
import { SiteLayout } from './components/SiteLayout'
import { CartPage } from './pages/CartPage'
import { HomePage } from './pages/HomePage'
import { NotFoundPage } from './pages/NotFoundPage'
import { ProductPage } from './pages/ProductPage'
import { ShopPage } from './pages/ShopPage'

function App() {
  return (
    <CartProvider>
      <BrowserRouter>
        <Routes>
          <Route element={<SiteLayout />}>
            <Route index element={<HomePage />} />
            <Route path="shop" element={<ShopPage />} />
            <Route path="products/:productId" element={<ProductPage />} />
            <Route path="cart" element={<CartPage />} />
            <Route path="*" element={<NotFoundPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </CartProvider>
  )
}

export default App