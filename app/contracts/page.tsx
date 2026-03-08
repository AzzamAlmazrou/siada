'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './contracts.module.css'

type ContractData = {
    type: string;
    firstParty: string;
    firstPartyId: string;
    secondParty: string;
    secondPartyId: string;
    value: string;
    duration: string;
    customTerms: string;
    loc: string;
    ministry: string;
    date: string;
    companyLogo: string | null;
    ministryLogo: string | null;
}

const MINISTRIES_LIST = [
    'وزارة العدل',
    'وزارة التجارة',
    'وزارة الموارد البشرية',
    'وزارة الاستثمار',
    'جهة حكومية أخرى'
];

export default function ContractsPage() {
    const [step, setStep] = useState<'form' | 'preview'>('form')
    const [data, setData] = useState<ContractData>({
        type: 'عقد توريد بضائع',
        firstParty: '',
        firstPartyId: '',
        secondParty: '',
        secondPartyId: '',
        value: '',
        duration: '',
        customTerms: '',
        loc: 'الرياض',
        ministry: 'وزارة العدل',
        date: new Date().toLocaleDateString('ar-SA'),
        companyLogo: null,
        ministryLogo: null
    })

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, field: keyof ContractData) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setData(prev => ({ ...prev, [field]: reader.result as string }));
            };
            reader.readAsDataURL(file);
        }
    }

    const handleGenerate = () => {
        if (!data.firstParty || !data.secondParty) return alert('يرجى ملء بيانات الأطراف الأساسية')
        window.scrollTo({ top: 0, behavior: 'smooth' })
        setStep('preview')
    }

    return (
        <div className="page-section" style={{ background: 'var(--bg-paper)' }}>
            <div className="container">
                <div className="no-print" style={{ textAlign: 'center', marginBottom: '80px' }}>
                    <div className="badge" style={{ background: 'var(--brand-ink)', color: 'var(--bg-white)' }}>التحول الرقمي القانوني</div>
                    <h1 className="section-title serif-title" style={{ fontSize: '4rem' }}>محرك العقود الفاخر</h1>
                    <p className="section-subtitle" style={{ margin: '0 auto' }}>توليد وثائق قانونية رفيعة المستوى متوافقة مع الأنظمة السعودية الحديثة بأعلى معايير الدقة.</p>
                </div>

                <AnimatePresence mode="wait">
                    {step === 'form' ? (
                        <motion.div
                            key="form"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className={`card ${styles.formCard}`}
                        >
                            <div className={styles.formHeader}>
                                <h2>صياغة وثيقة جديدة</h2>
                                <p>أدخل البيانات المطلوبة بدقة للحصول على أفضل صياغة قانونية</p>
                            </div>

                            <div className={styles.formGrid}>
                                <div className={styles.inputGroup}>
                                    <label>نوع الوثيقة القانونية 📜</label>
                                    <select
                                        className={styles.input}
                                        value={data.type}
                                        onChange={e => setData({ ...data, type: e.target.value })}
                                    >
                                        <option>عقد توريد بضائع</option>
                                        <option>عقد تقديم خدمات استشارية</option>
                                        <option>عقد عمل موحد (سعودي)</option>
                                        <option>اتفاقية شراكة استراتيجية</option>
                                        <option>عقد مقاولات وإنشاءات</option>
                                        <option>اتفاقية سرية معلومات (NDA)</option>
                                        <option>اتفاقية وساطة تجارية</option>
                                    </select>
                                </div>

                                <div className={styles.inputGroup}>
                                    <label>الجهة المرجعية (الوزارة) 🏛️</label>
                                    <select
                                        className={styles.input}
                                        value={data.ministry}
                                        onChange={e => setData({ ...data, ministry: e.target.value })}
                                    >
                                        {MINISTRIES_LIST.map(m => <option key={m}>{m}</option>)}
                                    </select>
                                </div>

                                <div className={styles.divider}>الشعارات والتخصيص</div>

                                <div className={styles.inputGroup}>
                                    <label>شعار الشركة (اختياري) 🏢</label>
                                    <input type="file" accept="image/*" className={styles.input} style={{ padding: '8px' }} onChange={e => handleImageUpload(e, 'companyLogo')} />
                                </div>
                                <div className={styles.inputGroup}>
                                    <label>شعار الوزارة (اختياري - يحل محل الشعار الافتراضي) 🏛️</label>
                                    <input type="file" accept="image/*" className={styles.input} style={{ padding: '8px' }} onChange={e => handleImageUpload(e, 'ministryLogo')} />
                                </div>

                                <div className={styles.inputGroup}>
                                    <label>مدينة الإبرام ⚖️</label>
                                    <input className={styles.input} value={data.loc} onChange={e => setData({ ...data, loc: e.target.value })} />
                                </div>

                                <div className={styles.divider}>هوية الأطراف المتعاقدة</div>

                                <div className={styles.inputGroup}>
                                    <label>الطرف الأول (كامل المسمى)</label>
                                    <input className={styles.input} placeholder="مثال: شركة سِيادَة القابضة" value={data.firstParty} onChange={e => setData({ ...data, firstParty: e.target.value })} />
                                </div>
                                <div className={styles.inputGroup}>
                                    <label>رقم السجل / الهوية</label>
                                    <input className={styles.input} placeholder="رقم رسمي معتمد" value={data.firstPartyId} onChange={e => setData({ ...data, firstPartyId: e.target.value })} />
                                </div>

                                <div className={styles.inputGroup}>
                                    <label>الطرف الثاني (كامل المسمى)</label>
                                    <input className={styles.input} placeholder="مثال: مؤسسة المستقبل للمقاولات" value={data.secondParty} onChange={e => setData({ ...data, secondParty: e.target.value })} />
                                </div>
                                <div className={styles.inputGroup}>
                                    <label>رقم السجل / الهوية</label>
                                    <input className={styles.input} placeholder="رقم رسمي معتمد" value={data.secondPartyId} onChange={e => setData({ ...data, secondPartyId: e.target.value })} />
                                </div>

                                <div className={styles.divider}>المقتضيات الممالية والزمنية</div>

                                <div className={styles.inputGroup}>
                                    <label>إجمالي قيمة التعاقد (ريال سعودي)</label>
                                    <input className={styles.input} type="number" placeholder="مثال: ٥٠٠,٠٠٠" value={data.value} onChange={e => setData({ ...data, value: e.target.value })} />
                                </div>
                                <div className={styles.inputGroup}>
                                    <label>المدة الزمنية للتنفيذ</label>
                                    <input className={styles.input} placeholder="مثال: ١٢ شهراً ميلادياً" value={data.duration} onChange={e => setData({ ...data, duration: e.target.value })} />
                                </div>

                                <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
                                    <label>البنود الإضافية والاشتراطات الخاصة (تعزز دقة العقد) ✨</label>
                                    <textarea
                                        className={styles.textarea}
                                        rows={6}
                                        placeholder="اكتب هنا كافة تفاصيل العمل، آلية الدفع، الغرامات، أو أي اشتراطات تود تضمينها في متن العقد..."
                                        value={data.customTerms}
                                        onChange={e => setData({ ...data, customTerms: e.target.value })}
                                    />
                                </div>
                            </div>

                            <div className={styles.formFooterAction}>
                                <button className="btn-primary" style={{ width: '100%', justifyContent: 'center', fontSize: '1.2rem', padding: '20px' }} onClick={handleGenerate}>
                                    بث الروح في الوثيقة وإصدارها ⚡
                                </button>
                                <p style={{ marginTop: '16px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>بضغطك على توليد، يقر الطرفان بموافقتهم على شروط سِيادَة</p>
                            </div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="preview"
                            initial={{ opacity: 0, scale: 0.98 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className={styles.previewView}
                        >
                            <div className={styles.toolbar}>
                                <button className="btn-secondary" onClick={() => setStep('form')}>← العودة للتعديل</button>
                                <div style={{ display: 'flex', gap: '12px' }}>
                                    <button className="btn-secondary" onClick={() => window.print()}>معاينة الطباعة 🔍</button>
                                    <button className="btn-primary" onClick={() => window.print()}>تحميل النسخة الفاخرة 📥</button>
                                </div>
                            </div>

                            <div className={styles.premiumDocument}>
                                <div className={styles.docWatermark}>سِيادَة</div>
                                <div className={styles.docBorder}>
                                    <div className={styles.docInner}>
                                        <div className={styles.premiumHeader} style={{ marginBottom: '15px', paddingBottom: '10px' }}>
                                            <div style={{ flex: 1, textAlign: 'right', fontSize: '0.8rem', color: '#111', lineHeight: 1.6, fontWeight: 'bold' }}>
                                                المملكة العربية السعودية<br />
                                                <strong>{data.ministry}</strong><br />
                                                وثيقة تعاقدية
                                            </div>

                                            <div style={{ flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'flex-start', gap: '20px' }}>
                                                {data.companyLogo && (
                                                    <img
                                                        src={data.companyLogo}
                                                        alt="شعار الشركة"
                                                        style={{ height: '70px', maxWidth: '120px', objectFit: 'contain' }}
                                                    />
                                                )}
                                                <img
                                                    src={data.ministryLogo || "https://upload.wikimedia.org/wikipedia/commons/0/0d/Emblem_of_Saudi_Arabia.svg"}
                                                    alt="شعار المملكة"
                                                    style={{ height: '70px', maxWidth: '120px', objectFit: 'contain' }}
                                                />
                                            </div>

                                            <div style={{ flex: 1, textAlign: 'left', fontSize: '0.75rem', color: '#333', display: 'flex', flexDirection: 'column', gap: '4px' }}>
                                                <span>الرقم: SIG-{Math.floor(Math.random() * 900000 + 100000)}</span>
                                                <span>التاريخ: {data.date}</span>
                                                <span>المرفقات: لا يوجد</span>
                                            </div>
                                        </div>

                                        <div className={styles.docTitleBlock} style={{ textAlign: 'center', marginBottom: '30px', marginTop: '10px' }}>
                                            <h2 className="serif-title" style={{ fontSize: '1.8rem', fontWeight: 900, marginBottom: '6px', color: 'var(--brand-ink)' }}>{data.type}</h2>
                                        </div>

                                        <div className={styles.docBodyContent}>
                                            <p style={{ fontWeight: 800, marginBottom: '15px' }}>
                                                إنه في يوم هذا التاريخ الموفق {data.date} تم الاتفاق بين كلاً من:
                                            </p>

                                            <ol style={{ paddingRight: '20px', marginBottom: '20px', lineHeight: 2, listStyleType: 'decimal' }}>
                                                <li>
                                                    <strong>السادة/ {data.firstParty}</strong>، السجل/الهوية ({data.firstPartyId})، المقر الرئيسي في مدينة ({data.loc})، ويشار إليه فيما بعد بـ <strong>الطرف الأول</strong>.
                                                </li>
                                                <li>
                                                    <strong>السادة/ {data.secondParty}</strong>، السجل/الهوية ({data.secondPartyId})، المقر الرئيسي في مدينة ({data.loc})، ويشار إليه فيما بعد بـ <strong>الطرف الثاني</strong>.
                                                </li>
                                            </ol>

                                            <p style={{ fontWeight: 800, marginBottom: '30px' }}>
                                                وبعد أن أقر طرفي الاتفاقية بأهليتهما القانونية المعتبرة شرعاً ونظاماً والتي تبيح لهم إجراء مثل هذه التصرفات الواردة بالاتفاقية، فقد اتفقا على الآتي:
                                            </p>

                                            <div className={styles.legalSection}>
                                                <h4>١. التمهيد:</h4>
                                                <p style={{ paddingRight: '15px' }}>حيث أن الطرف الأول يعمل كجهة متخصصة، وحيث رغب الطرف الثاني في الاستفادة من تلك الخبرات في تنفيذ ({data.type})، فقد التقت إرادة الطرفين على إبرام هذا العقد المكون من مواد وبنود ملزمة للطرفين وخلفائهم، ويعتبر هذا التمهيد جزءاً لا يتجزأ من الاتفاقية ومكملاً ومفسراً لها عند اللزوم.</p>
                                            </div>

                                            <div className={styles.legalSection}>
                                                <h4>٢. نطاق الالتزامات:</h4>
                                                <p style={{ paddingRight: '15px' }}>يلتزم الطرف الأول بتسخير كافة طاقاته وخبراته لتنفيذ المهام الموكلة إليه، مع الالتزام التام بكافة الأنظمة واللوائح والقرارات المعمول بها في المملكة. كما يلتزم بتقديم تقارير دورية للطرف الثاني حول سير العمل، وضمان جودة التنفيذ وفق المعايير المهنية (Best Practices).</p>
                                            </div>

                                            {data.value && (
                                                <div className={styles.legalSection}>
                                                    <h4>٣. القيمة والضوابط المالية:</h4>
                                                    <p style={{ paddingRight: '15px' }}>اتفق الطرفان على أن القيمة الإجمالية النهائية لهذا التعاقد هي (<strong>{Number(data.value).toLocaleString()}</strong>) ريال سعودي. هذه القيمة تشمل كافة التكاليف التشغيلية، الضرائب، ورسوم القيمة المضافة ما لم يتم النص على خلاف ذلك.</p>
                                                </div>
                                            )}

                                            <div className={styles.legalSection}>
                                                <h4>٤. السرية والملكية الفكرية:</h4>
                                                <p style={{ paddingRight: '15px' }}>يتعهد كل طرف بالمحافظة على سرية كافة المعلومات والبيانات والمستندات التي يتم الاطلاع عليها. وتظل كافة حقوق الملكية الفكرية الناتجة عن تنفيذ هذا التعاقد ملكاً خالصاً للطرف الذي قام بابتكارها، ويحظر استخدامها في غير غرض التعاقد.</p>
                                            </div>

                                            <div className={styles.legalSection}>
                                                <h4>٥. القوة القاهرة والظروف الطارئة:</h4>
                                                <p style={{ paddingRight: '15px' }}>لا يتحمل أي من الطرفين مسؤولية التأخير الناتج عن ظروف القوة القاهرة. وفي حال استمرارها لأكثر من (٣٠) يوماً، يحق للطرفين الاجتماع لبحث تعديل البنود أو إنهاء التعاقد بما يحفظ الحقوق.</p>
                                            </div>

                                            {data.customTerms && (
                                                <div className={styles.legalSection}>
                                                    <h4>٦. الاشتراطات الخاصة الإضافية:</h4>
                                                    <div style={{ paddingRight: '15px', whiteSpace: 'pre-line' }}>
                                                        {data.customTerms}
                                                    </div>
                                                </div>
                                            )}

                                            <div className={styles.legalSection}>
                                                <h4>٧. فض النزاعات:</h4>
                                                <p style={{ paddingRight: '15px' }}>أي نزاع ينشأ من جراء تنفيذ أو تفسير هذا العقد، يتم السعي لحله ودياً. وفي حال تعذر ذلك، يكون الاختصاص القضائي منعقداً للمحاكم المختصة بمدينة ({data.loc})، المملكة العربية السعودية.</p>
                                            </div>

                                            <div className={styles.premiumSignatures} style={{ marginTop: '60px' }}>
                                                <div className={styles.signatureCol} style={{ border: 'none', textAlign: 'right', paddingRight: '20px' }}>
                                                    <h5 style={{ fontSize: '1.2rem', fontWeight: 900, marginBottom: '16px', color: '#000' }}>الطرف الأول</h5>
                                                    <p><strong>الاسم:</strong> {data.firstParty}</p>
                                                    <p><strong>الصفة:</strong> مفوض بالتوقيع</p>
                                                    <p style={{ marginTop: '20px', display: 'flex' }}><strong>التوقيع:</strong> <span style={{ borderBottom: '1px dashed #000', flex: 1, margin: '0 10px' }}></span></p>
                                                    <p style={{ marginTop: '20px' }}><strong>الختم:</strong></p>
                                                </div>
                                                <div className={styles.signatureCol} style={{ border: 'none', textAlign: 'right', paddingRight: '20px' }}>
                                                    <h5 style={{ fontSize: '1.2rem', fontWeight: 900, marginBottom: '16px', color: '#000' }}>الطرف الثاني</h5>
                                                    <p><strong>الاسم:</strong> {data.secondParty}</p>
                                                    <p><strong>الصفة:</strong> مفوض بالتوقيع</p>
                                                    <p style={{ marginTop: '20px', display: 'flex' }}><strong>التوقيع:</strong> <span style={{ borderBottom: '1px dashed #000', flex: 1, margin: '0 10px' }}></span></p>
                                                    <p style={{ marginTop: '20px' }}><strong>الختم:</strong></p>
                                                </div>
                                            </div>
                                        </div>

                                        <div className={styles.premiumFooter}>
                                            <div>مرجع نظامي: الأنظمة العدلية السعودية الحديثة</div>
                                            <div className={styles.qrPlaceholder}>
                                                <span>مسح للمصادقة</span>
                                            </div>
                                            <div>الصفحة ١ من ١</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    )
}
