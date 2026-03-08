'use client'
import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './page.module.css'
import { FadeInUp } from '@/components/MotionWrapper'

type Msg = { role: 'user' | 'ai'; text: string; time: string }

const MOCK_RESPONSES: [RegExp, string][] = [
    [/عمل|موظف|راتب|فصل|إجازة/, 'وفقاً لنظام العمل السعودي (الصادر بالمرسوم الملكي م/51)، يحق للموظف الحصول على إجازة سنوية مدفوعة الأجر لا تقل عن 21 يوماً بعد سنة خدمة، ترتفع إلى 30 يوماً بعد 5 سنوات. وفي حالة الفصل التعسفي، يحق للموظف المطالبة بتعويض يعادل أجر شهرين عن كل سنة خدمة.\n\n⚠️ تنبيه: هذا توجيه عام وليس استشارة قانونية رسمية. للقضايا الجوهرية، يُنصح بالتواصل مع محامٍ معتمد.'],
    [/إيجار|مستأجر|مالك|عقار|شقة/, 'وفقاً لنظام الإيجار الجديد في المملكة العربية السعودية، يُشترط توثيق أي عقد إيجار عبر منصة إيجار الحكومية. لا يحق لصاحب العقار إخلاء المستأجر قبل نهاية العقد إلا بموجب حكم قضائي. كما يحق للمستأجر رفع دعوى في حال إخلاء تعسفي وطلب التعويض.\n\n⚠️ تنبيه: هذا توجيه عام وليس استشارة قانونية رسمية.'],
    [/ميراث|وصية|تركة|ورث/, 'في المملكة العربية السعودية، يُطبَّق نظام المواريث وفق أحكام الشريعة الإسلامية. تُقسَّم التركة بين الورثة الشرعيين وفق الفرائض المقررة. يُنصح برفع قضية الحصر والتركة أمام المحكمة الشرعية المختصة لإثبات الوراثة وتقسيم الأموال رسمياً.\n\n⚠️ تنبيه: هذا توجيه عام وليس استشارة قانونية رسمية.'],
    [/شركة|تجارة|عقد|نزاع تجاري/, 'تخضع النزاعات التجارية في المملكة لنظام المحكمة التجارية الصادر عام 2020م. يُنصح في البداية باللجوء إلى الوساطة والتسوية الودية عبر مراكز الوساطة والتحكيم، قبل اللجوء للقضاء. مدة التقادم للمطالبة بحقوق الشركات عادةً 5 سنوات.\n\n⚠️ تنبيه: هذا توجيه عام وليس استشارة قانونية رسمية.'],
    [/جريمة|عقوبة|سجن|غرامة/, 'تعتمد المملكة العربية السعودية نظام الأحوال الشخصية والجزائي المستند للشريعة الإسلامية إلى جانب الأنظمة الوضعية. لأي قضية جزائية، يُنصح بشدة بتوكيل محامٍ معتمد فوراً لأن لذلك أثراً بالغاً على مجريات القضية واحتمالات نتائجها.\n\n⚠️ تنبيه: هذا توجيه عام وليس استشارة قانونية رسمية.'],
    [/.*/, 'شكراً على سؤالك! بناءً على ما ذكرتَه، أنصحك بمراجعة الجهة المختصة أو استشارة محامٍ معتمد للحصول على رأي متخصص في وضعك القانوني الدقيق.\n\nيمكنني مساعدتك بشكل أفضل إذا أوضحت:\n• طبيعة النزاع أو السؤال القانوني\n• الدولة الخليجية المعنية\n• ما الذي تأمل الحصول عليه\n\n⚠️ تنبيه: هذا توجيه عام وليس استشارة قانونية رسمية.'],
]

function getResponse(q: string): string {
    for (const [re, ans] of MOCK_RESPONSES) {
        if (re.test(q)) return ans
    }
    return MOCK_RESPONSES[MOCK_RESPONSES.length - 1][1]
}

function now() {
    return new Date().toLocaleTimeString('ar-SA', { hour: '2-digit', minute: '2-digit' })
}

const SUGGESTIONS = [
    'ما هي حقوق الموظف عند الفصل؟',
    'كيف أحمي حقي كمستأجر؟',
    'ما هي إجراءات تقسيم الميراث؟',
    'كيف أحل نزاعاً تجارياً؟',
]

export default function ConsultPage() {
    const [msgs, setMsgs] = useState<Msg[]>([
        { role: 'ai', text: 'أهلاً! أنا المستشار صقر 🦅⚖️\n\nيمكنني مساعدتك في:\n• تفسير القوانين والأنظمة السعودية\n• الإجابة على أسئلتك القانونية\n• توجيهك للجهة المختصة\n\nكيف يمكنني خدمتك اليوم؟', time: now() },
    ])
    const [input, setInput] = useState('')
    const [loading, setLoading] = useState(false)
    const bottomRef = useRef<HTMLDivElement>(null)

    useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: 'smooth' }) }, [msgs])

    const send = (text?: string) => {
        const q = (text ?? input).trim()
        if (!q || loading) return
        setInput('')
        setMsgs(m => [...m, { role: 'user', text: q, time: now() }])
        setLoading(true)
        setTimeout(() => {
            setMsgs(m => [...m, { role: 'ai', text: getResponse(q), time: now() }])
            setLoading(false)
        }, 1500)
    }

    return (
        <div className="page-section" style={{ paddingBottom: 40 }}>
            <div className="container">
                <FadeInUp>
                    <div className="page-header">
                        <div className="badge badge-gold" style={{ marginBottom: 16 }}>🦅 المستشار صقر</div>
                        <h1 className="section-title">استشارتك القانونية الفورية</h1>
                        <p className="section-subtitle">
                            اطرح سؤالك القانوني بالعامية أو الفصحى وسيرد عليك الذكاء الاصطناعي فوراً.
                        </p>
                    </div>
                </FadeInUp>

                <motion.div
                    className={styles.chatWrapper}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2, duration: 0.5 }}
                >
                    {/* Disclaimer */}
                    <div className={styles.disclaimer}>
                        ⚠️ هذه استشارة توجيهية تعليمية فقط وليست بديلاً عن محامٍ معتمد. للقضايا الجوهرية، تواصل مع{' '}
                        <a href="/lawyers" style={{ color: 'var(--primary)', textDecoration: 'underline' }}>محامينا المعتمدين</a>.
                    </div>

                    {/* Messages */}
                    <div className={styles.messages}>
                        <AnimatePresence mode="popLayout">
                            {msgs.map((m, i) => (
                                <motion.div
                                    key={i}
                                    className={`${styles.msgRow} ${m.role === 'user' ? styles.userRow : ''}`}
                                    initial={{ opacity: 0, y: 10, scale: 0.97 }}
                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                    transition={{ duration: 0.3 }}
                                    layout
                                >
                                    {m.role === 'ai' && <div className={styles.avatar}>⚖️</div>}
                                    <div className={`${styles.bubble} ${m.role === 'user' ? styles.userBubble : styles.aiBubble}`}>
                                        <p className={styles.bubbleText}>{m.text}</p>
                                        <span className={styles.bubbleTime}>{m.time}</span>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>

                        {loading && (
                            <motion.div
                                className={styles.msgRow}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                            >
                                <div className={styles.avatar}>⚖️</div>
                                <div className={styles.aiBubble} style={{ padding: '16px 20px' }}>
                                    <div className={styles.typing}>
                                        <span /><span /><span />
                                    </div>
                                </div>
                            </motion.div>
                        )}
                        <div ref={bottomRef} />
                    </div>

                    {/* Suggestions */}
                    {msgs.length < 3 && (
                        <motion.div
                            className={styles.suggestions}
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.4, duration: 0.4 }}
                        >
                            {SUGGESTIONS.map(s => (
                                <button key={s} className={styles.sugBtn} onClick={() => send(s)}>{s}</button>
                            ))}
                        </motion.div>
                    )}

                    {/* Input */}
                    <div className={styles.inputRow}>
                        <textarea
                            className={styles.chatInput}
                            placeholder="اكتب سؤالك القانوني هنا..."
                            value={input}
                            onChange={e => setInput(e.target.value)}
                            onKeyDown={e => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send() } }}
                            rows={2}
                        />
                        <button className={styles.sendBtn} onClick={() => send()} disabled={!input.trim() || loading}>
                            {loading ? '⏳' : '←'}
                        </button>
                    </div>
                </motion.div>
            </div>
        </div>
    )
}
