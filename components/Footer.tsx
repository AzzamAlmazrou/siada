'use client'
import Link from 'next/link'
import styles from './Footer.module.css'

export default function Footer() {
    return (
        <footer className={styles.footer}>
            <div className="container">
                <div className={styles.footerContent}>
                    <div className={styles.brandSection}>
                        <h3 className="serif-title">سِيادَة</h3>
                        <p>منصة قانونية متكاملة تهدف إلى تسهيل الوصول للخدمات القانونية والتحول الرقمي العدلي في المملكة العربية السعودية.</p>
                    </div>

                    <div className={styles.linksGrid}>
                        <div className={styles.linkCol}>
                            <h4>الخدمات الذكية</h4>
                            <Link href="/contracts" className={styles.footerBrandLink}>مركز العقود</Link>
                            <Link href="/advisor" className={styles.footerBrandLink}>المستشار الذكي</Link>
                            <Link href="/inheritance" className={styles.footerBrandLink}>حساب المواريث</Link>
                        </div>
                        <div className={styles.linkCol}>
                            <h4>المجتمع</h4>
                            <Link href="/lawyers" className={styles.footerBrandLink}>دليل الخبراء</Link>
                        </div>
                        <div className={styles.linkCol}>
                            <h4>المنصة</h4>
                            <Link href="/about" className={styles.footerBrandLink}>عن سيادة</Link>
                            <Link href="/terms" className={styles.footerBrandLink}>سياسة الخصوصية</Link>
                            <Link href="/terms" className={styles.footerBrandLink}>الشروط والأحكام</Link>
                        </div>
                    </div>
                </div>

                <div className={styles.bottomBar}>
                    <p>© ٢٠٢٦ سِيادَة. جميع الحقوق محفوظة.</p>
                    <div className={styles.socials}>
                        <span>Twitter</span>
                        <span>LinkedIn</span>
                    </div>
                </div>
            </div>
        </footer>
    )
}
