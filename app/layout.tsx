import type { Metadata } from 'next'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
import './globals.css'

export const metadata: Metadata = {
    title: 'سِيادَة | MVP القانوني',
    description: 'منصة سِيادَة للأتمتة القانونية الاحترافية.',
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
                <footer style={{ background: '#F9F9F7', borderTop: '1px solid var(--border)', padding: '60px 0' }}>
                    <div className="container">
                        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '40px' }}>
                            <div>
                                <h3 className="serif-title" style={{ fontSize: '1.5rem', color: 'var(--brand-ink)', marginBottom: '16px' }}>سِيادَة</h3>
                                <p style={{ color: 'var(--text-secondary)', maxWidth: '300px' }}>منصة قانونية متكاملة تهدف إلى تسهيل الوصول للخدمات القانونية في المملكة العربية السعودية.</p>
                            </div>
                            <div style={{ display: 'flex', gap: '80px' }}>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                    <h4 style={{ fontWeight: 700 }}>الخدمات</h4>
                                    <Link href="/contracts" style={{ color: 'var(--text-secondary)' }}>مولد العقود</Link>
                                    <Link href="/advisor" style={{ color: 'var(--text-secondary)' }}>المستشار صقر</Link>
                                </div>
                                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                                    <h4 style={{ fontWeight: 700 }}>المنصة</h4>
                                    <Link href="/terms" style={{ color: 'var(--text-secondary)' }}>الشروط والأحكام</Link>
                                </div>
                            </div>
                        </div>
                        <div style={{ marginTop: '60px', borderTop: '1px solid var(--border)', paddingTop: '24px', textAlign: 'center', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                            © ٢٠٢٦ سِيادَة. جميع الحقوق محفوظة.
                        </div>
                    </div>
                </footer>
            </body>
        </html>
    )
}
