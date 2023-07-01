import './globals.css'
import Header from './components/Header'
import Footer from './components/Footer'
import { Inter } from 'next/font/google'
import GlobalStateProvider from './context/store'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Yearn',
  description: 'Yearn Finance App',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <GlobalStateProvider>
          <Header />
          {children}
          <Footer/>
        </GlobalStateProvider>
      </body>
    </html>
  )
}
