import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import 'bootstrap/dist/css/bootstrap.css'
import '../styles/menu-theme.css'
import '../styles/theme.css'
import '../styles/responsive-menu.css'
import '../styles/custom-spacing.css'
import { FreelancerProvider } from '../context/Marketplace'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Decentralized Talent Exchange',
  description: 'Empowering Freelancers and Clients in a Borderless Marketplace',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
 
  return (
    <html lang="en">
      <head>
      {/* <link rel="icon" href="/favicon.ico" /> */}
      </head>
        <FreelancerProvider>
      <body>
        {children}
      </body>
      </FreelancerProvider>

    </html>
  )
}
