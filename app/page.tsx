'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import styles from './page.module.css'

const services = [
    { title: 'مولد العقود', desc: 'إصدار وتوليد عقود قانونية ذكية متوافقة مع الأنظمة السعودية الحديثة.', icon: '📜', path: '/contracts' },
    { title: 'المستشار صقر', desc: 'إجابات فورية لاستفساراتك القانونية بدقة عالية وخارج الأوقات الرسمية.', icon: '⚖️', path: '/advisor' },
    { title: 'حاسبة الورث', desc: 'حساب الأنصبة الشرعية والتركات بدقة متناهية تحت إشراف شرعي وقانوني.', icon: '🧮', path: '/inheritance' },
    { title: 'نخبة المحامين', desc: 'تواصل مباشر مع نخبة من المحامين والمستشارين المعتمدين في المملكة العربية السعودية.', icon: '👨‍⚖️', path: '/lawyers' },
]

export default function Home() {
    return (
        <div className={styles.container_wrapper}>
            {/* Hero */}
            <section className={styles.hero}>
                <div className="container" style={{ textAlign: 'center' }}>
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1 }}
                        style={{ marginBottom: '40px' }}
                    >
                        <h1 className={styles.heroBrandName}>سِيادَة</h1>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                    >
                        <h2 className={styles.heroSubtitle}>أمانك القانوني، برؤية تقنية حديثة</h2>
                        <p className={styles.heroSub}>منصة رائدة تمكّنك من إدارة شؤونك القانونية بذكاء، سرعة، وموثوقية تامة، بعيداً عن التعقيدات التقليدية، وفق أحدث الأنظمة السعودية.</p>

                        <div style={{ display: 'flex', gap: '20px', justifyContent: 'center', flexWrap: 'wrap' }}>
                            <Link href="/contracts" className="btn-primary">ابدأ تجربتك المجانية</Link>
                            <Link href="/about" className="btn-secondary">عن سِيادَة</Link>
                        </div>
                    </motion.div>
                </div>
            </section >

            {/* Services */}
            < section className="page-section" style={{ background: 'var(--bg-paper)', borderTop: '1px solid var(--border)' }
            }>
                <div className="container">
                    <div style={{ textAlign: 'center', marginBottom: '80px' }}>
                        <div className="badge">حلول متكاملة</div>
                        <h2 className="section-title serif-title">خدمات قانونية متطورة</h2>
                        <p className="section-subtitle" style={{ margin: '0 auto' }}>حلول تقنية ذكية صُممت خصيصاً لتلبية احتياجات الأفراد والشركات في المملكة العربية السعودية.</p>
                    </div>

                    <div className={styles.grid}>
                        {services.map((s, i) => (
                            <Link key={i} href={s.path} className={`card ${styles.serviceCard}`}>
                                <div className={styles.icon}>{s.icon}</div>
                                <h3 className={styles.sTitle}>{s.title}</h3>
                                <p className={styles.sDesc}>{s.desc}</p>
                                <div className={styles.sLink}>اكتشف المزيد ←</div>
                            </Link>
                        ))}
                    </div>
                </div>
            </section >

        </div >
    )
}
