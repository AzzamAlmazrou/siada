'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './page.module.css'
import { FadeInUp, StaggerParent, StaggerChild } from '@/components/MotionWrapper'

const SAMPLE_LAW = `نظام حماية بيانات الأفراد الرقمية: يُلزم هذا النظام جميع الشركات والمنشآت العاملة في المملكة بالحصول على موافقة صريحة من الأفراد قبل جمع بياناتهم الشخصية أو معالجتها أو مشاركتها مع أطراف ثالثة. ويُحدد النظام غرامات مالية تتراوح بين (٥٠,٠٠٠) ريال و(٥,٠٠٠,٠٠٠) ريال على المنشآت المخالفة، مع إلزامها بالإفصاح عن أي اختراق أمني خلال (٧٢) ساعة من اكتشافه.`

type Impact = { icon: string; color: string; label: string; score: number; points: string[]; desc: string }

function analyzeImpact(text: string): { citizen: Impact; state: Impact; verdict: string } {
    const hasFinancial = /غرام|ريال|مليون/.test(text)
    const hasRights = /حق|حقوق|موافقة|حماية|خصوصية/.test(text)
    const hasObligation = /يُلزم|يجب|يتعين/.test(text)
    const hasPenalty = /عقوبة|سجن|غرامة|إغلاق/.test(text)

    const citizenScore = hasRights ? 78 : 45
    const stateScore = hasObligation ? 82 : 60

    return {
        citizen: {
            icon: hasRights ? '🟢' : '🟡',
            color: hasRights ? 'green' : 'yellow',
            label: hasRights ? 'مفيد للمواطن' : 'محايد',
            score: citizenScore,
            points: hasRights
                ? ['يحمي خصوصيتك وبياناتك الشخصية', 'يمنحك حق الموافقة قبل مشاركة بياناتك', 'يُلزم الشركات بالشفافية']
                : ['أثر محدود على المواطن اليومي', 'قد يزيد من تعقيد الإجراءات'],
            desc: hasRights ? 'يعزز حقوق المواطن ويحمي خصوصيته الرقمية' : 'تأثيره على المواطن متوازن',
        },
        state: {
            icon: hasPenalty ? '🟡' : '🟢',
            color: hasPenalty ? 'yellow' : 'green',
            label: hasPenalty ? 'تقييدي للشركات' : 'مفيد للدولة',
            score: stateScore,
            points: hasFinancial
                ? ['يُدر إيرادات من الغرامات', 'يُعزز ثقة المستثمرين في بيئة الأعمال', 'يُرسّخ سيادة الدولة على البيانات']
                : ['يُنظّم قطاعاً حيوياً', 'يتوافق مع المعايير الدولية'],
            desc: hasFinancial ? 'يُعزز موقف الدولة التنظيمي ويدعم الاقتصاد الرقمي' : 'يُنظّم القطاع ويدعم التنمية',
        },
        verdict: hasRights && hasFinancial ? '✅ القانون متوازن: يحمي الأفراد ويُنظّم الشركات.' : '⚠️ القانون يحتاج مراجعة لضمان التوازن بين مصالح الأطراف.'
    }
}

export default function ImpactPage() {
    const [input, setInput] = useState('')
    const [result, setResult] = useState<ReturnType<typeof analyzeImpact> | null>(null)
    const [loading, setLoading] = useState(false)

    const analyze = () => {
        if (!input.trim()) return
        setLoading(true)
        setTimeout(() => { setResult(analyzeImpact(input)); setLoading(false) }, 1400)
    }

    const colorMap: Record<string, string> = {
        green: 'var(--green)', yellow: 'var(--yellow)', red: 'var(--red)'
    }
    const bgMap: Record<string, string> = {
        green: 'rgba(46,139,87,.06)', yellow: 'rgba(184,134,11,.06)', red: 'rgba(196,71,58,.06)'
    }

    return (
        <div className="page-section">
            <div className="container">
                <FadeInUp>
                    <div className="page-header">
                        <div className="badge badge-gold" style={{ marginBottom: 16 }}>📊 تحليل الأثر</div>
                        <h1 className="section-title">اكتشف أثر القانون عليك وعلى الدولة</h1>
                        <p className="section-subtitle">
                            أدخل نص القانون وسيُحلل الذكاء الاصطناعي تأثيره على المواطن والدولة ويصدر حكماً بموضوعية.
                        </p>
                    </div>
                </FadeInUp>

                <motion.div
                    className={styles.inputBox}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                >
                    <div className={styles.inputHeader}>
                        <h3 className={styles.inputTitle}>نص القانون أو اللائحة</h3>
                        <button className={styles.sampleBtn} onClick={() => setInput(SAMPLE_LAW)}>مثال تجريبي</button>
                    </div>
                    <textarea className={styles.textarea} value={input} onChange={e => setInput(e.target.value)}
                        placeholder="الصق هنا نص القانون أو اللائحة التنظيمية..." rows={6} />
                    <button className="btn-primary" style={{ width: '100%', justifyContent: 'center', marginTop: 16 }}
                        onClick={analyze} disabled={!input.trim() || loading}>
                        {loading ? '⏳ جارٍ التحليل...' : '📊 حلّل الأثر'}
                    </button>
                </motion.div>

                {loading && (
                    <motion.div
                        className={styles.loadingBox}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                    >
                        <div className={styles.spinner} />
                        <p>يُحلل الذكاء الاصطناعي أثر القانون...</p>
                    </motion.div>
                )}

                <AnimatePresence>
                    {result && !loading && (
                        <motion.div
                            className={styles.results}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
                        >
                            {/* Cards */}
                            <StaggerParent className={styles.cardsGrid}>
                                {([result.citizen, result.state] as Impact[]).map((item, i) => (
                                    <StaggerChild key={i}>
                                        <div className={styles.impactCard}
                                            style={{ borderColor: colorMap[item.color] + '40', background: bgMap[item.color] }}>
                                            <div className={styles.cardTop}>
                                                <span className={styles.cardIcon}>{item.icon}</span>
                                                <div>
                                                    <p className={styles.cardRole}>{i === 0 ? '👤 المواطن' : '🏛️ الدولة'}</p>
                                                    <p className={styles.cardLabel} style={{ color: colorMap[item.color] }}>{item.label}</p>
                                                </div>
                                                <div className={styles.scoreCircle} style={{ borderColor: colorMap[item.color], color: colorMap[item.color] }}>
                                                    {item.score}%
                                                </div>
                                            </div>
                                            <p className={styles.cardDesc}>{item.desc}</p>
                                            <ul className={styles.pointsList}>
                                                {item.points.map((p, j) => (
                                                    <li key={j} style={{ color: colorMap[item.color] }}>
                                                        <span style={{ color: 'var(--text-secondary)' }}>• {p}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </StaggerChild>
                                ))}
                            </StaggerParent>
                            {/* Verdict */}
                            <FadeInUp>
                                <div className={styles.verdict}>
                                    <h3 className={styles.verdictTitle}>📋 الحكم الإجمالي</h3>
                                    <p className={styles.verdictText}>{result.verdict}</p>
                                </div>
                            </FadeInUp>
                            {/* GCC Comparison */}
                            <FadeInUp>
                                <div className={styles.gccBox}>
                                    <h3 className={styles.gccTitle}>🌍 مقارنة بدول الخليج</h3>
                                    <div className={styles.gccGrid}>
                                        {[
                                            { flag: '🇸🇦', country: 'السعودية', status: 'نظام مماثل', color: 'green' },
                                            { flag: '🇦🇪', country: 'الإمارات', status: 'أكثر شمولاً', color: 'blue' },
                                            { flag: '🇰🇼', country: 'الكويت', status: 'قيد الإعداد', color: 'yellow' },
                                            { flag: '🇧🇭', country: 'البحرين', status: 'نظام مماثل', color: 'green' },
                                            { flag: '🇶🇦', country: 'قطر', status: 'أقل تقييداً', color: 'yellow' },
                                        ].map(c => (
                                            <div key={c.country} className={styles.gccItem}>
                                                <span style={{ fontSize: '1.5rem' }}>{c.flag}</span>
                                                <span className={styles.gccCountry}>{c.country}</span>
                                                <span className={`badge badge-${c.color}`} style={{ fontSize: '0.75rem' }}>{c.status}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </FadeInUp>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
}
