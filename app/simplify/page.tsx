'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './page.module.css'
import { FadeInUp } from '@/components/MotionWrapper'

const ELASTIC = [
    'حسب ما تراه الجهة المختصة', 'وفق ما يقتضيه الأمر', 'في الحالات المناسبة',
    'بما يتناسب مع', 'وفقاً للوائح المنفّذة', 'يجوز', 'قد يُعاقَب',
    'حسب الظروف', 'بناءً على ما تقدّره', 'عند الاقتضاء',
    'في حدود ما تسمح به اللوائح', 'التقدير المناسب',
]

function highlight(text: string) {
    let result = text
    const found: string[] = []
    ELASTIC.forEach(w => {
        if (text.includes(w)) {
            found.push(w)
            result = result.replaceAll(w, `<mark class="elastic">${w}</mark>`)
        }
    })
    return { html: result, found }
}

const SAMPLE = `المادة (١٢): يجوز للجهة المختصة، وفق ما تراه مناسباً، أن تفرض على المنشآت التجارية غرامات مالية تتراوح بين (١٠٠٠) ريال و(٥٠,٠٠٠) ريال في حال مخالفة أحكام هذه اللائحة، وذلك بناءً على ما تقدّره من ظروف المخالفة وملابساتها. كما يحق للجهة عند الاقتضاء إغلاق المنشأة مؤقتاً أو بصورة نهائية في الحالات المناسبة.`

export default function SimplifyPage() {
    const [input, setInput] = useState('')
    const [result, setResult] = useState<{ html: string; found: string[] } | null>(null)
    const [loading, setLoading] = useState(false)

    const analyze = () => {
        if (!input.trim()) return
        setLoading(true)
        setTimeout(() => {
            setResult(highlight(input))
            setLoading(false)
        }, 1200)
    }

    const loadSample = () => setInput(SAMPLE)

    return (
        <div className="page-section">
            <div className="container">
                <FadeInUp>
                    <div className="page-header">
                        <div className="badge badge-gold" style={{ marginBottom: 16 }}>📖 تبسيط القوانين</div>
                        <h1 className="section-title">حوّل النص القانوني إلى لغة واضحة</h1>
                        <p className="section-subtitle">
                            الصق أي نص قانوني وسيحدد الذكاء الاصطناعي الكلمات المطاطة والغامضة التي قد تسبب سوء فهم.
                        </p>
                    </div>
                </FadeInUp>

                <div className={styles.layout}>
                    {/* Input */}
                    <motion.div
                        className={styles.panel}
                        initial={{ opacity: 0, x: 30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2, duration: 0.5 }}
                    >
                        <div className={styles.panelHeader}>
                            <h3 className={styles.panelTitle}>📝 النص القانوني</h3>
                            <button className={styles.sampleBtn} onClick={loadSample}>مثال تجريبي</button>
                        </div>
                        <textarea
                            className={styles.textarea}
                            placeholder="الصق هنا النص القانوني الذي تريد تحليله..."
                            value={input}
                            onChange={e => setInput(e.target.value)}
                            rows={12}
                        />
                        <button
                            className="btn-primary"
                            style={{ width: '100%', justifyContent: 'center', marginTop: 16 }}
                            onClick={analyze}
                            disabled={!input.trim() || loading}
                        >
                            {loading ? '⏳ جارٍ التحليل...' : '🔍 حلّل النص'}
                        </button>
                    </motion.div>

                    {/* Output */}
                    <motion.div
                        className={styles.panel}
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3, duration: 0.5 }}
                    >
                        <div className={styles.panelHeader}>
                            <h3 className={styles.panelTitle}>✅ النتيجة</h3>
                            {result && <span className="badge badge-green">{result.found.length} كلمة مطاطة</span>}
                        </div>

                        {!result && !loading && (
                            <div className={styles.empty}>
                                <span style={{ fontSize: '3rem' }}>⚖️</span>
                                <p>ستظهر النتيجة هنا بعد التحليل</p>
                            </div>
                        )}

                        {loading && (
                            <div className={styles.empty}>
                                <div className={styles.spinner} />
                                <p style={{ color: 'var(--text-secondary)' }}>يحلل الذكاء الاصطناعي النص...</p>
                            </div>
                        )}

                        <AnimatePresence>
                            {result && !loading && (
                                <motion.div
                                    initial={{ opacity: 0, y: 15 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.4 }}
                                >
                                    <div
                                        className={styles.resultText}
                                        dangerouslySetInnerHTML={{ __html: result.html }}
                                    />
                                    {result.found.length > 0 && (
                                        <motion.div
                                            className={styles.elasticList}
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.2, duration: 0.4 }}
                                        >
                                            <h4 className={styles.elasticTitle}>⚠️ الكلمات المطاطة المُكتشفة:</h4>
                                            <div className={styles.elasticTags}>
                                                {result.found.map(w => (
                                                    <span key={w} className={styles.elasticTag}>{w}</span>
                                                ))}
                                            </div>
                                            <p className={styles.elasticNote}>
                                                هذه الكلمات تمنح الجهات السلطة التقديرية الواسعة وقد تؤثر على تطبيق القانون عليك.
                                            </p>
                                        </motion.div>
                                    )}
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </motion.div>
                </div>
            </div>
        </div>
    )
}
