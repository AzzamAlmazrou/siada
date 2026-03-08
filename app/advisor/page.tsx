'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './advisor.module.css'

export default function AdvisorPage() {
    const [messages, setMessages] = useState([
        { role: 'bot', text: 'مرحباً بك في مستشار سيادة. أنا هنا لمساعدتك في الحصول على إجابات أولية لاستفساراتك القانونية بناءً على الأنظمة المعمول بها في المملكة العربية السعودية. كيف يمكنني مساعدتك اليوم؟' }
    ])
    const [input, setInput] = useState('')

    const send = () => {
        if (!input.trim()) return
        const newMsgs = [...messages, { role: 'user', text: input }]
        setMessages(newMsgs)
        setInput('')

        setTimeout(() => {
            setMessages([...newMsgs, { role: 'bot', text: 'شكراً لاستفسارك. بناءً على نظام المعاملات المدنية، فإن الحالة التي ذكرتها قد تتطلب مراجعة دقيقة للبنود التعاقدية بالدرجة ... (هذا عرض توضيحي للمستشار AI).' }])
        }, 800)
    }

    return (
        <div className="page-section">
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '64px' }}>
                    <div className="badge" style={{ marginBottom: '16px' }}>ذكاء اصطناعي 🤖</div>
                    <h1 className="section-title serif-title">المستشار القانوني الذكي</h1>
                    <p className="section-subtitle" style={{ margin: '0 auto' }}>احصل على توضيحات قانونية فورية مدعومة بأحدث أنظمة الذكاء الاصطناعي.</p>
                </div>

                <div className={`card ${styles.chatWrapper}`}>
                    <div className={styles.chatBox}>
                        <AnimatePresence initial={false}>
                            {messages.map((m, i) => (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0, x: m.role === 'bot' ? 20 : -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className={`${styles.msg} ${styles[m.role]}`}
                                >
                                    <div className={styles.msgBody}>
                                        {m.text}
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    </div>

                    <div className={styles.inputArea}>
                        <input
                            className={styles.input}
                            value={input}
                            onChange={e => setInput(e.target.value)}
                            onKeyDown={e => e.key === 'Enter' && send()}
                            placeholder="اكتب استفسارك القانوني هنا..."
                        />
                        <button className="btn-primary" onClick={send} style={{ padding: '0 48px', fontSize: '1.2rem', height: '70px' }}>ارسال</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
