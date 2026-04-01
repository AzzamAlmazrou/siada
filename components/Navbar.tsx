'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import styles from './Navbar.module.css'

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false)
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20)
        window.addEventListener('scroll', handleScroll)
        return () => window.removeEventListener('scroll', handleScroll)
    }, [])

    return (
        <nav className={`${styles.navbar} ${scrolled ? styles.scrolled : ''}`}>
            <div className={`container ${styles.navContent}`}>
                <Link href="/" className={styles.logo}>
                    <span className={styles.bracket}>[</span>
                    سِيادَة
                    <span className={styles.bracket}>]</span>
                </Link>

                {/* Overlay Background for Sidebar */}
                <div 
                    className={`${styles.menuOverlay} ${isOpen ? styles.activeOverlay : ''}`} 
                    onClick={() => setIsOpen(false)}
                />

                <div className={`${styles.links} ${isOpen ? styles.active : ''}`}>
                    <Link href="/" onClick={() => setIsOpen(false)}>الرئيسية</Link>
                    <Link href="/contracts" onClick={() => setIsOpen(false)}>مولد العقود</Link>
                    <Link href="/advisor" onClick={() => setIsOpen(false)}>المستشار صقر</Link>
                    <Link href="/inheritance" onClick={() => setIsOpen(false)}>حاسبة الورث</Link>
                    <Link href="/lawyers" onClick={() => setIsOpen(false)}>نخبة المحامين</Link>
                </div>

                <div className={styles.actions}>
                    <button
                        className={styles.themeToggle}
                        onClick={() => document.documentElement.classList.toggle('dark')}
                        title="تبديل الوضع الليلي"
                    >
                        🌓
                    </button>
                    <Link href="/advisor" className="btn-primary" style={{ padding: '10px 20px', fontSize: '0.9rem' }}>
                        ابدأ الآن
                    </Link>
                    <button className={styles.menuToggle} onClick={() => setIsOpen(!isOpen)}>
                        {isOpen ? '✕' : '☰'}
                    </button>
                </div>
            </div>
        </nav>
    )
}
