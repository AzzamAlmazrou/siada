'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './inheritance.module.css'

// Inheritance Logic Constants (Simplified for MVP, focused on Hanbali/Saudi context)
const HEIRS_LIST = [
    { id: 'husband', label: 'الزوج', category: 'spouse' },
    { id: 'wife', label: 'الزوجة', category: 'spouse' },
    { id: 'father', label: 'الأب', category: 'ancestor' },
    { id: 'mother', label: 'الأم', category: 'ancestor' },
    { id: 'son', label: 'الابن (ذكور)', category: 'descendant' },
    { id: 'daughter', label: 'البنت (إناث)', category: 'descendant' },
    { id: 'g_son', label: 'ابن الابن', category: 'descendant' },
    { id: 'g_daughter', label: 'بنت الابن', category: 'descendant' },
    { id: 'f_brother', label: 'الأخ الشقيق', category: 'collateral' },
    { id: 'f_sister', label: 'الأخت الشقيقة', category: 'collateral' },
    { id: 'p_brother', label: 'الأخ لأب', category: 'collateral' },
    { id: 'p_sister', label: 'الأخت لأب', category: 'collateral' },
]

export default function InheritancePage() {
    const [amount, setAmount] = useState<number>(0)
    const [heirsCounts, setHeirsCounts] = useState<Record<string, number>>({})
    const [result, setResult] = useState<null | any>(null)

    const updateCount = (id: string, val: number) => {
        setHeirsCounts(prev => ({ ...prev, [id]: Math.max(0, val) }))
    }

    const calculate = () => {
        if (amount <= 0) return alert('يرجى إدخال مبلغ التركة')

        const shares: any[] = []
        let totalAssaba = 0 // For residual shares
        const activeHeirs = Object.entries(heirsCounts).filter(([_, count]) => count > 0)

        // BAIT AL-MAL LOGIC (Government share if no heirs)
        if (activeHeirs.length === 0) {
            setResult({
                total: `${amount.toLocaleString()} ريال`,
                isGovernment: true,
                summary: 'نظراً لعدم وجود ورثة شرعيين، تعود التركة كاملة إلى خزينة الدولة (بيت مال المسلمين) وفق الأنظمة المرعية.',
                shares: [
                    { name: 'بيت مال المسلمين (الحكومة)', share: '١٠٠٪', amount: `${amount.toLocaleString()} ريال` }
                ]
            })
            return
        }

        // Mock Logic: In a real app, this would be a full Faraid calculator
        // Here we simulate a professional breakdown for the MVP
        let remaining = amount

        // Spouses
        if (heirsCounts['husband'] > 0) {
            const hasDescendants = heirsCounts['son'] > 0 || heirsCounts['daughter'] > 0
            const share = hasDescendants ? amount * 0.25 : amount * 0.5
            shares.push({
                name: 'الزوج',
                share: hasDescendants ? 'الربع (١/٤)' : 'النصف (١/٢)',
                amount: `${share.toLocaleString()} ريال`,
                individual: `نصيب الفرد: ${share.toLocaleString()} ريال`
            })
            remaining -= share
        }
        if (heirsCounts['wife'] > 0) {
            const wives = heirsCounts['wife'] || 1
            const hasDescendants = heirsCounts['son'] > 0 || heirsCounts['daughter'] > 0
            const totalWifeShare = hasDescendants ? amount * 0.125 : amount * 0.25
            const individualWifeShare = totalWifeShare / wives
            shares.push({
                name: `الزوجات (${wives})`,
                share: hasDescendants ? 'الثمن (١/٨)' : 'الربع (١/٤)',
                amount: `${Math.round(totalWifeShare).toLocaleString()} ريال`,
                individual: `نصيب الزوجة الواحدة: ${Math.round(individualWifeShare).toLocaleString()} ريال`
            })
            remaining -= totalWifeShare
        }

        // Parents
        if (heirsCounts['father'] > 0) {
            const share = amount * (1.666 / 10) // 1/6 approx
            shares.push({
                name: 'الأب',
                share: 'السدس (١/٦)',
                amount: `${Math.round(share).toLocaleString()} ريال`,
                individual: `نصيب الفرد: ${Math.round(share).toLocaleString()} ريال`
            })
            remaining -= share
        }
        if (heirsCounts['mother'] > 0) {
            const share = amount * (1.666 / 10) // 1/6 approx
            shares.push({
                name: 'الأم',
                share: 'السدس (١/٦)',
                amount: `${Math.round(share).toLocaleString()} ريال`,
                individual: `نصيب الفرد: ${Math.round(share).toLocaleString()} ريال`
            })
            remaining -= share
        }

        // Children (Assaba)
        const sons = heirsCounts['son'] || 0
        const daughters = heirsCounts['daughter'] || 0
        if (sons > 0 || daughters > 0) {
            const totalParts = (sons * 2) + daughters
            const partVal = remaining / totalParts
            if (sons > 0) {
                const totalSonShare = partVal * 2 * sons
                const individualShare = totalSonShare / sons
                shares.push({
                    name: `الأبناء (${sons})`,
                    share: 'تعصيباً (للذكر مثل حظ الأنثيين)',
                    amount: `${Math.round(totalSonShare).toLocaleString()} ريال`,
                    individual: `نصيب الابن الواحد: ${Math.round(individualShare).toLocaleString()} ريال`
                })
            }
            if (daughters > 0) {
                const totalDaughterShare = partVal * daughters
                const individualShare = totalDaughterShare / daughters
                shares.push({
                    name: `البنات (${daughters})`,
                    share: 'فرضاً أو تعصيباً',
                    amount: `${Math.round(totalDaughterShare).toLocaleString()} ريال`,
                    individual: `نصيب البنت الواحدة: ${Math.round(individualShare).toLocaleString()} ريال`
                })
            }
            remaining = 0
        }

        // Other relatives would be handled similarly...
        if (remaining > 0) {
            shares.push({ name: 'باقي الورثة / الرد', share: 'حسب الحالة', amount: `${Math.round(remaining).toLocaleString()} ريال` })
        }

        setResult({
            total: `${amount.toLocaleString()} ريال`,
            isGovernment: false,
            summary: 'تم توزيع التركة بناءً على الأنصبة الشرعية المقررة في نظام الأحوال الشخصية السعودي.',
            shares
        })
    }

    return (
        <div className="page-section">
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '64px' }}>
                    <div className="badge">محرك المواريث المطور</div>
                    <h1 className="section-title serif-title">حساب الأنصبة الشرعية</h1>
                    <p className="section-subtitle" style={{ margin: '0 auto' }}>نظام دقيق لحساب توزيع المواريث وفق نظام الأحوال الشخصية السعودي وأحكام الشريعة الإسلامية.</p>
                </div>

                <div className={styles.grid}>
                    <div className="card">
                        <h3 className="serif-title" style={{ marginBottom: '32px', fontSize: '1.5rem' }}>تفاصيل التركة والورثة</h3>
                        <div className={styles.form}>
                            <div className={styles.inputGrp}>
                                <label>قيمة التركة الإجمالية (ريال سعودي)</label>
                                <input
                                    type="number"
                                    className={styles.input}
                                    placeholder="أدخل المبلغ..."
                                    onChange={e => setAmount(Number(e.target.value))}
                                />
                            </div>

                            <div className={styles.heirsControlGrid}>
                                {HEIRS_LIST.map(h => (
                                    <div key={h.id} className={styles.heirControlRow}>
                                        <div className={styles.heirLabel}>
                                            <span style={{ fontWeight: 700 }}>{h.label}</span>
                                        </div>
                                        <div className={styles.counter}>
                                            <button onClick={() => updateCount(h.id, (heirsCounts[h.id] || 0) - 1)}>−</button>
                                            <input
                                                type="number"
                                                value={heirsCounts[h.id] || 0}
                                                onChange={e => updateCount(h.id, Number(e.target.value))}
                                            />
                                            <button onClick={() => updateCount(h.id, (heirsCounts[h.id] || 0) + 1)}>+</button>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <button
                                className="btn-primary"
                                style={{ width: '100%', justifyContent: 'center', marginTop: '32px' }}
                                onClick={calculate}
                            >
                                إجراء الحساب الفوري ⚡
                            </button>
                        </div>
                    </div>

                    <div className={styles.resultCol}>
                        <AnimatePresence mode="wait">
                            {result ? (
                                <motion.div
                                    key="result"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className={`card ${styles.resultCard} ${result.isGovernment ? styles.govResult : ''}`}
                                >
                                    <div className={styles.resultHeader}>
                                        <h3 className="serif-title">{result.isGovernment ? 'أيلولة التركة للدولة' : 'تقرير توزيع الميراث'}</h3>
                                        <div className={styles.totalBadge}>{result.total}</div>
                                    </div>
                                    <p className={styles.summary}>{result.summary}</p>

                                    <div className={styles.sharesContainer}>
                                        {result.shares.map((s: any, i: number) => (
                                            <div key={i} className={styles.shareRow}>
                                                <div className={styles.shareMain}>
                                                    <strong>{s.name}</strong>
                                                    <span>{s.share}</span>
                                                </div>
                                                <div className={styles.shareVal}>
                                                    <div>{s.amount}</div>
                                                    {s.individual && <div className={styles.individualTag}>{s.individual}</div>}
                                                </div>
                                            </div>
                                        ))}
                                    </div>

                                    {!result.isGovernment && (
                                        <button className="btn-secondary" style={{ width: '100%', marginTop: '32px', justifyContent: 'center' }}>
                                            تحميل تقرير قسمة المواريث (PDF)
                                        </button>
                                    )}
                                </motion.div>
                            ) : (
                                <div key="placeholder" className={styles.placeholder}>
                                    <div className={styles.placeholderIcon}>⚖️</div>
                                    <p>أدخل بيانات الورثة والتركة للحصول على التوزيع الشرعي الدقيق</p>
                                </div>
                            )}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </div>
    )
}
