import Link from 'next/link'
import { CheckCircle, Clock, Shield, Users, ArrowRight, Phone, Headphones } from 'lucide-react'

export const metadata = {
    title: 'Voor Hotels — Chef & Serve',
    description: 'Chef & Serve levert gescreend keukenpersoneel aan hotels in Amsterdam. SLA, screening, responstijd en compliance.',
}

export default function VoorHotelsPage() {
    return (
        <>
            <section style={{ background: 'linear-gradient(135deg, var(--navy) 0%, var(--navy-light) 100%)', color: '#fff', padding: '4rem 0' }}>
                <div className="container-wide">
                    <h1 style={{ color: '#fff', marginBottom: '1rem' }}>Keukenpersoneel voor uw hotel</h1>
                    <p style={{ color: 'var(--gray-400)', maxWidth: '560px', fontSize: '1.063rem', lineHeight: 1.7 }}>
                        Chef & Serve is uw operationele partner voor tijdelijk keukenpersoneel. Geen uitzendbureau, maar een direct netwerk van gescreende professionals.
                    </p>
                </div>
            </section>

            <section className="section">
                <div className="container-wide">
                    <h2 style={{ marginBottom: '2rem' }}>Onze garanties</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
                        {[
                            { icon: <Clock size={24} />, title: 'Responstijd < 2 uur', desc: 'Na ontvangst van uw aanvraag ontvangt u binnen 2 uur een shortlist van beschikbare, gescreende kandidaten. Bij spoedaanvragen streven we naar 1 uur.' },
                            { icon: <Shield size={24} />, title: '100% gescreend', desc: 'Elke chef in ons netwerk is geverifieerd op identiteit, werkervaring, certificeringen (HACCP, SVH) en referenties. Geen verassingen.' },
                            { icon: <Users size={24} />, title: 'Altijd een backup', desc: 'Bij ziekte of uitval regelen wij binnen 2 uur een vervangende kandidaat. Uw keuken draait altijd door.' },
                            { icon: <CheckCircle size={24} />, title: 'Transparante tarieven', desc: 'Geen verborgen kosten. U ziet het uurtarief in de shortlist. Facturatie via KvK-geregistreerde B.V. met BTW-specificatie.' },
                            { icon: <Headphones size={24} />, title: 'Dedicated planner', desc: 'Elke hotelklant krijgt een vaste planner die uw keuken kent, uw voorkeuren onthoudt en proactief meedenkt.' },
                            { icon: <Phone size={24} />, title: 'Bereikbaar 7/7', desc: 'Ons planningsteam is 7 dagen per week bereikbaar. Ook op feestdagen en in het weekend.' },
                        ].map((item, i) => (
                            <div key={i} className="card" style={{ padding: '1.5rem' }}>
                                <div style={{ color: 'var(--gold-dark)', marginBottom: '0.75rem' }}>{item.icon}</div>
                                <h4 style={{ marginBottom: '0.5rem' }}>{item.title}</h4>
                                <p style={{ fontSize: '0.875rem', color: 'var(--gray-500)', lineHeight: 1.6 }}>{item.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="section section-cream">
                <div className="container-wide">
                    <h2 style={{ marginBottom: '2rem' }}>Beschikbare functies</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '1rem' }}>
                        {[
                            { role: 'Executive Chef', desc: 'Leidinggevende keukenchef voor fine dining, banqueting en hotelkeukens.', rate: '€40-65/u' },
                            { role: 'Sous Chef', desc: 'Rechterhand van de chef-kok. Aansturing team, mise en place, kwaliteitscontrole.', rate: '€30-50/u' },
                            { role: 'Chef de Partie', desc: 'Verantwoordelijk voor een post. À la carte, gardemanger, entremetier.', rate: '€25-42/u' },
                            { role: 'Pastry Chef', desc: 'Patisserie, desserts, brood, banketwerk. Voor hotels en evenementen.', rate: '€28-48/u' },
                            { role: 'Bediening', desc: 'Professionele bediening voor restaurant, room service en banqueting.', rate: '€22-35/u' },
                        ].map((item, i) => (
                            <div key={i} className="card">
                                <h4 style={{ marginBottom: '0.25rem' }}>{item.role}</h4>
                                <p style={{ fontSize: '0.8rem', color: 'var(--gray-500)', marginBottom: '0.5rem', lineHeight: 1.5 }}>{item.desc}</p>
                                <span className="badge badge-active">{item.rate}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <section className="section section-dark" style={{ textAlign: 'center' }}>
                <div className="container-narrow">
                    <h2>Keukenpersoneel nodig?</h2>
                    <p style={{ color: 'var(--gray-400)', margin: '1rem auto 2rem', maxWidth: '460px' }}>
                        Dien uw aanvraag in en ontvang binnen 2 uur een shortlist van gescreende kandidaten.
                    </p>
                    <Link href="/aanvraag" className="btn btn-primary btn-lg">Aanvraag indienen <ArrowRight size={18} /></Link>
                </div>
            </section>
        </>
    )
}
