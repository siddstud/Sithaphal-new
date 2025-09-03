import type { Metadata } from 'next'
import './globals.css'
import { CartProvider } from './context/CartContext'

export const metadata: Metadata = {
  title: 'Sithaphal - The Royal Fruit',
  description: 'Experience the divine taste of fresh Custard Apples. Premium organic Sithaphal delivered fresh to your door.',
  keywords: 'sithaphal, custard apple, organic fruit, fresh fruit delivery',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="bg-gray-100 text-gray-800">
        <CartProvider>
          {children}
        </CartProvider>
      </body>
    </html>
  )
}
