import Link from 'next/link'
import { Search, Filter, UserCheck, Send, ArrowRight, Shield, FileCheck, Eye, ClipboardCheck } from 'lucide-react'

export const metadata = {
    title: 'Werkwijze — Chef & Serve',
    description: 'Hoe Chef & Serve keukenpersoneel screent, matcht en plaatst. Ons proces van aanvraag tot inzet.',
}

export default function WerkwijzePage() {
    return (
        <>
            <section style={{ background: 'linear-gradient(135deg, var(--navy) 0%, var(--navy-light) 100%)', color: '#fff', padding: '4rem 0' }}>
                <div className="container-wide">
                    <h1 style={{ color: '#fff', marginBottom: '1rem' }}>Onze werkwijze</h1>
                    <p style={{ color: 'var(--gray-400)', maxWidth: '560px', fontSize: '1.063rem', lineHeight: 1.7 }}>
                        Transparant, snel en grondig. Zo selecteren en plaatsen wij keukenpersoneel voor uw hotel.
                    </p>
                </div>
            </section>

            <section className="section">
                <div className="container-wide" style={{ maxWidth: '800px' }}>
                    <h2 style={{ marginBottom: '2.5rem' }}>Van aanvraag tot inzet</h2>
                    {[
                        { icon: <ClipboardCheck size={24} />, step: '1', title: 'U dient een aanvraag in', desc: 'Via ons online formulier vult u de shift details in: gewenste functie, datum, tijden, vereisten en budget. Dit duurt gemiddeld 2 minuten.' },
                        { icon: <Search size={24} />, step: '2', title: 'Automatische matching', desc: 'Ons systeem doorzoekt 840+ profielen op beschikbaarheid, rol, locatie, certificeringen, taalkennis en betrouwbaarheid. Dit gebeurt direct na uw aanvraag.' },
                        { icon: <Filter size={24} />, step: '3', title: 'Planner review', desc: 'Een ervaren planner bekijkt de automatische matches, past aan waar nodig en stelt een shortlist samen van 3-10 geschikte kandidaten.' },
                        { icon: <Send size={24} />, step: '4', title: 'U ontvangt de shortlist', desc: 'Binnen 2 uur na uw aanvraag ontvangt u een shortlist met profiel, ervaring, tarief en een korte toelichting per kandidaat.' },
                        { icon: <UserCheck size={24} />, step: '5', title: 'U kiest, wij regelen', desc: 'U kiest de gewenste kandidaat. Wij regelen de rest: briefing, bereikbaarheid en een backup-kandidaat voor noodgevallen.' },
                    ].map((item, i) => (
                        <div key={i} style={{ display: 'flex', gap: '1.5rem', marginBottom: '2rem', paddingBottom: '2rem', borderBottom: i < 4 ? '1px solid var(--gray-200)' : 'none' }}>
                            <div style={{ width: '3rem', height: '3rem', borderRadius: '0.75rem', background: 'var(--cream)', color: 'var(--gold-dark)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                {item.icon}
                            </div>
                            <div>
                                <h3 style={{ fontSize: '1.125rem', marginBottom: '0.375rem' }}>
                                    <span style={{ color: 'var(--gold-dark)' }}>Stap {item.step}.</span> {item.title}
                                </h3>
                                <p style={{ fontSize: '0.938rem', color: 'var(--gray-500)', lineHeight: 1.7 }}>{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <section className="section section-cream">
                <div className="container-wide" style={{ maxWidth: '800px' }}>
                    <h2 style={{ marginBottom: '2rem' }}>
                        <Shield size={28} style={{ verticalAlign: 'middle', marginRight: '0.5rem', color: 'var(--gold-dark)' }} />
                        Screening & kwaliteit
                    </h2>
                    <div style={{ display: 'grid', gap: '1rem' }}>
                        {[
                            { title: 'Identiteitsverificatie', desc: 'Elke chef is geverifieerd op identiteit inclusief kopie ID en BSN-check.' },
                            { title: 'Certificeringen', desc: 'Wij controleren HACCP, SVH, BHV en overige relevante certificeringen op geldigheid.' },
                            { title: 'Werkervaring & referenties', desc: 'Minimaal 2 referenties worden nagetrokken. Wij verifiëren werkervaring bij vorige opdrachtgevers.' },
                            { title: 'Betrouwbaarheidsscore', desc: 'Op basis van punctualiteit, feedback van hotels en beschikbaarheidsbetrouwbaarheid kennen wij een interne score toe.' },
                            { title: 'Proefperiode', desc: 'Nieuwe chefs krijgen een lagere initiële score en worden na de eerste diensten geëvalueerd.' },
                        ].map((item, i) => (
                            <div key={i} className="card" style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                                <FileCheck size={20} color="var(--success)" style={{ marginTop: '2px', flexShrink: 0 }} />
                                <div>
                                    <h4 style={{ fontSize: '0.938rem', marginBottom: '0.25rem' }}>{item.title}</h4>
                                    <p style={{ fontSize: '0.8rem', color: 'var(--gray-500)', lineHeight: 1.6 }}>{item.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="section section-dark" style={{ textAlign: 'center' }}>
                <div className="container-narrow">
                    <h2>Klaar om te beginnen?</h2>
                    <p style={{ color: 'var(--gray-400)', margin: '1rem auto 2rem', maxWidth: '460px' }}>
                        Dien uw eerste aanvraag in. Wij begeleiden u door het hele proces.
                    </p>
                    <Link href="/aanvraag" className="btn btn-primary btn-lg">Aanvraag indienen <ArrowRight size={18} /></Link>
                </div>
            </section>
        </>
    )
}
