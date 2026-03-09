import Link from 'next/link'
import { ArrowRight, CheckCircle, Shield, Clock, Users } from 'lucide-react'

interface SeoPageProps {
    title: string
    h1: string
    intro: string
    sections: { heading: string; content: string }[]
    faqs: { q: string; a: string }[]
    relatedLinks: { label: string; href: string }[]
    cta?: string
}

export default function SeoLandingPage({ title, h1, intro, sections, faqs, relatedLinks, cta }: SeoPageProps) {
    return (
        <>
            <section style={{ background: 'linear-gradient(135deg, var(--navy) 0%, var(--navy-light) 100%)', color: '#fff', padding: '4rem 0' }}>
                <div className="container-wide" style={{ maxWidth: '800px' }}>
                    <h1 style={{ color: '#fff', fontSize: '2.5rem', marginBottom: '1rem', lineHeight: 1.15 }}>{h1}</h1>
                    <p style={{ color: 'var(--gray-400)', fontSize: '1.063rem', lineHeight: 1.7, maxWidth: '600px' }}>{intro}</p>
                    <Link href="/aanvraag" className="btn btn-primary btn-lg" style={{ marginTop: '1.5rem' }}>
                        {cta || 'Vraag beschikbaarheid aan'} <ArrowRight size={18} />
                    </Link>
                </div>
            </section>

            <section style={{ background: 'var(--cream)', padding: '1.25rem 0', borderBottom: '1px solid var(--cream-dark)' }}>
                <div className="container-wide">
                    <div style={{ display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' }}>
                        {[
                            { icon: <Shield size={16} />, text: 'Gescreend personeel' },
                            { icon: <Clock size={16} />, text: 'Shortlist < 2 uur' },
                            { icon: <Users size={16} />, text: '840+ professionals' },
                        ].map((item, i) => (
                            <span key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.375rem', fontSize: '0.8rem', fontWeight: 600, color: 'var(--navy)' }}>
                                <span style={{ color: 'var(--gold-dark)' }}>{item.icon}</span> {item.text}
                            </span>
                        ))}
                    </div>
                </div>
            </section>

            <section className="section">
                <div className="container-wide" style={{ maxWidth: '800px' }}>
                    {sections.map((section, i) => (
                        <div key={i} style={{ marginBottom: '2.5rem' }}>
                            <h2 style={{ fontSize: '1.5rem', marginBottom: '0.75rem' }}>{section.heading}</h2>
                            <p style={{ color: 'var(--gray-600)', lineHeight: 1.8 }}>{section.content}</p>
                        </div>
                    ))}
                </div>
            </section>

            {faqs.length > 0 && (
                <section className="section section-cream">
                    <div className="container-wide" style={{ maxWidth: '800px' }}>
                        <h2 style={{ marginBottom: '1.5rem' }}>Veelgestelde vragen</h2>
                        {faqs.map((faq, i) => (
                            <div key={i} style={{ marginBottom: '1.25rem', paddingBottom: '1.25rem', borderBottom: i < faqs.length - 1 ? '1px solid var(--cream-dark)' : 'none' }}>
                                <h3 style={{ fontSize: '1rem', marginBottom: '0.375rem' }}>{faq.q}</h3>
                                <p style={{ fontSize: '0.938rem', color: 'var(--gray-600)', lineHeight: 1.7 }}>{faq.a}</p>
                            </div>
                        ))}
                    </div>
                </section>
            )}

            {relatedLinks.length > 0 && (
                <section className="section">
                    <div className="container-wide" style={{ maxWidth: '800px' }}>
                        <h3 style={{ marginBottom: '1rem' }}>Gerelateerde paginas</h3>
                        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
                            {relatedLinks.map((link, i) => (
                                <Link key={i} href={link.href} className="btn btn-outline btn-sm">{link.label}</Link>
                            ))}
                        </div>
                    </div>
                </section>
            )}

            <section className="section section-dark" style={{ textAlign: 'center' }}>
                <div className="container-narrow">
                    <h2>Direct een chef nodig?</h2>
                    <p style={{ color: 'var(--gray-400)', margin: '0.75rem auto 1.5rem' }}>Dien uw aanvraag in en ontvang dezelfde dag nog een shortlist.</p>
                    <Link href="/aanvraag" className="btn btn-primary btn-lg">Aanvraag indienen <ArrowRight size={18} /></Link>
                </div>
            </section>

            <script type="application/ld+json" dangerouslySetInnerHTML={{
                __html: JSON.stringify({
                    '@context': 'https://schema.org',
                    '@type': 'FAQPage',
                    mainEntity: faqs.map(f => ({
                        '@type': 'Question', name: f.q,
                        acceptedAnswer: { '@type': 'Answer', text: f.a },
                    })),
                })
            }} />
        </>
    )
}
