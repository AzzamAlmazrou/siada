import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import './globals.css'

export const metadata: Metadata = {
    title: 'سِيادَة | MVP القانوني',
    description: 'منصة سِيادَةللخدمات القانونية الاحترافية.',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="ar" dir="rtl" suppressHydrationWarning>
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
            </head>
            <body suppressHydrationWarning>
                <Navbar />
                <main style={{ paddingTop: 'var(--navbar-height)' }}>
                    {children}
                </main>
                <Footer />
            </body>
        </html>
    )
}
