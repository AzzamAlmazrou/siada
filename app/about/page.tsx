import { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'عن سيادة | منصة الخدمات القانونية',
    description: 'تعريف بمنصة سيادة وأهدافها في التحول الرقمي للخدمات العدلية.',
}

export default function AboutPage() {
    return (
        <div className="page-section">
            <div className="container">
                <div style={{ textAlign: 'center', marginBottom: '80px', maxWidth: '800px', margin: '0 auto 80px' }}>
                    <div className="badge">تعريف بالمنصة</div>
                    <h1 className="section-title serif-title">عن سِيادَة</h1>
                    <p className="section-subtitle" style={{ margin: '0 auto' }}>
                        الريادة في دمج التكنولوجيا بالخدمات القانونية لتقديم تجربة تليق بتطلعات التحول الرقمي في المملكة العربية السعودية.
                    </p>
                </div>

                <div className="card" style={{ maxWidth: '900px', margin: '0 auto', lineHeight: '2' }}>
                    <h2 className="serif-title" style={{ color: 'var(--brand-ink)', marginBottom: '24px' }}>من نحن؟</h2>
                    <p style={{ marginBottom: '24px' }}>
                        نحن في <strong>سِيادَة</strong> نؤمن بأن الوصول إلى العدالة والخدمات القانونية يجب أن يكون متاحاً للجميع بكفاءة، وشفافية، وسرعة. 
                        نشأنا من قلب المملكة العربية السعودية، لنكون المنصة الرائدة التي تجمع بين العراقة القانونية، وبين أحدث ما توصلت إليه تقنيات الذكاء الاصطناعي لتسهيل الإجراءات العدلية وتمكين الأفراد والشركات.
                    </p>
                    
                    <h2 className="serif-title" style={{ color: 'var(--brand-ink)', margin: '40px 0 24px' }}>رؤيتنا</h2>
                    <p style={{ marginBottom: '24px' }}>
                        أن نكون الوجهة الأولى والموثوقة والمبتكرة لجميع الحلول القانونية والشرعية في منطقة الشرق الأوسط، والمساهم الأول في رفع الوعي القانوني بأساليب عصرية تواكب <strong>رؤية السعودية ٢٠٣٠</strong>.
                    </p>

                    <h2 className="serif-title" style={{ color: 'var(--brand-ink)', margin: '40px 0 24px' }}>مقرنا الاستراتيجي وتواجدنا 🏙️</h2>
                    <p style={{ marginBottom: '24px' }}>
                        تفتخر منصة <strong>"سِيادَة"</strong> بأن تتخذ من المملكة العربية السعودية مقراً رئيسياً لعملياتها التقنية والقانونية. نحن نؤمن بأن المملكة تمثل النموذج الأمثل للتحول الرقمي المتسارع عالمياً، لذا حرصنا على أن تكون أنظمتنا متوائمة مع أعلى المعايير العدلية العالمية المطبقة، مع تركيز خاص وحصري على الأنظمة السعودية المتطورة والمتجددة.
                        <br /><br />
                        تهدف سِيادَة إلى أن تكون المرجع التقني والابتكاري الأول في المملكة لتقديم الحلول العدلية الذكية، موظفةً أفضل خبرات كوادرها القانونية والبرمجية لضمان سيادة القانون وسهولة الوصول للعدالة في أي وقت وأي مكان.
                    </p>

                    <h2 className="serif-title" style={{ color: 'var(--brand-ink)', margin: '40px 0 24px' }}>ماذا نقدم؟</h2>
                    <ul style={{ listStylePosition: 'inside', paddingRight: '20px', marginBottom: '24px' }}>
                        <li style={{ marginBottom: '12px' }}><strong>مولد العقود الذكي:</strong> صياغة مؤتمتة وتخصيص دقيق للعقود بطريقة خالية من الأخطاء بناءً على أحدث الأنظمة السعودية.</li>
                        <li style={{ marginBottom: '12px' }}><strong>المستشار الذكي "صقر":</strong> نموذج ذكاء اصطناعي حصري للإجابة على استفساراتك القانونية الأولية وتحليل النصوص المعقدة.</li>
                        <li style={{ marginBottom: '12px' }}><strong>حاسبة المواريث:</strong> نظام شرعي دقيق يحسب الأنصبة الشرعية استناداً إلى الشريعة الإسلامية.</li>
                        <li style={{ marginBottom: '12px' }}><strong>نخبة المحامين:</strong> شبكة متميزة من المحامين والمستشارين المعتمدين لتولي قضاياكم وتقديم استشارات متخصصة.</li>
                    </ul>

                    <h2 className="serif-title" style={{ color: 'var(--brand-ink)', margin: '40px 0 24px' }}>التزامنا بالأمان والموثوقية</h2>
                    <p>
                        سرية بياناتك هي أولويتنا القصوى. نطبق في منصة سِيادَة أعلى معايير التشفير والأمن السيبراني لحماية مستنداتك وتفاصيل قضاياك، ولا نشارك معلوماتك مع أي أطراف غير مصرح لها دون إذنك الكتابي والصريح.
                    </p>
                </div>
            </div>
        </div>
    )
}
