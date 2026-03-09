import Link from 'next/link'
import { ChefHat } from 'lucide-react'

export default function Footer() {
    return (
        <footer style={{ background: 'var(--navy)', color: '#fff', padding: '3rem 0 1.5rem' }}>
            <div className="container-wide">
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '2rem', marginBottom: '2rem' }}>
                    <div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
                            <ChefHat size={24} color="var(--gold)" />
                            <span style={{ fontSize: '1.125rem', fontWeight: 800 }}>Chef <span style={{ color: 'var(--gold)' }}>&</span> Serve</span>
                        </div>
                        <p style={{ fontSize: '0.875rem', color: 'var(--gray-400)', lineHeight: 1.6 }}>
                            Professioneel keukenpersoneel voor hotels in Amsterdam en omgeving. Snel, betrouwbaar, gescreend.
                        </p>
                    </div>

                    <div>
                        <h4 style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--gold)', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Voor Hotels</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <Link href="/aanvraag" style={{ fontSize: '0.875rem', color: 'var(--gray-400)', textDecoration: 'none' }}>Aanvraag indienen</Link>
                            <Link href="/voor-hotels" style={{ fontSize: '0.875rem', color: 'var(--gray-400)', textDecoration: 'none' }}>Hoe het werkt</Link>
                            <Link href="/werkwijze" style={{ fontSize: '0.875rem', color: 'var(--gray-400)', textDecoration: 'none' }}>Werkwijze & screening</Link>
                        </div>
                    </div>

                    <div>
                        <h4 style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--gold)', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Voor Chefs</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <Link href="/login" style={{ fontSize: '0.875rem', color: 'var(--gray-400)', textDecoration: 'none' }}>Inloggen</Link>
                            <Link href="/chefs" style={{ fontSize: '0.875rem', color: 'var(--gray-400)', textDecoration: 'none' }}>Chef overzicht</Link>
                        </div>
                    </div>

                    <div>
                        <h4 style={{ fontSize: '0.875rem', fontWeight: 700, color: 'var(--gold)', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>SEO</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                            <Link href="/chef-huren-amsterdam" style={{ fontSize: '0.875rem', color: 'var(--gray-400)', textDecoration: 'none' }}>Chef huren Amsterdam</Link>
                            <Link href="/tijdelijke-kok-amsterdam" style={{ fontSize: '0.875rem', color: 'var(--gray-400)', textDecoration: 'none' }}>Tijdelijke kok</Link>
                            <Link href="/banqueting-chef" style={{ fontSize: '0.875rem', color: 'var(--gray-400)', textDecoration: 'none' }}>Banqueting Chef</Link>
                            <Link href="/pastry-chef-inhuren" style={{ fontSize: '0.875rem', color: 'var(--gray-400)', textDecoration: 'none' }}>Pastry Chef inhuren</Link>
                            <Link href="/keukenpersoneel-hotel" style={{ fontSize: '0.875rem', color: 'var(--gray-400)', textDecoration: 'none' }}>Keukenpersoneel hotel</Link>
                        </div>
                    </div>
                </div>

                <div style={{ borderTop: '1px solid var(--navy-medium)', paddingTop: '1.5rem', display: 'flex', flexWrap: 'wrap', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
                    <p style={{ fontSize: '0.8rem', color: 'var(--gray-500)' }}>
                        © 2026 Chef & Serve B.V. — KvK 12345678 — BTW NL123456789B01
                    </p>
                    <div style={{ display: 'flex', gap: '1.5rem' }}>
                        <Link href="/privacy" style={{ fontSize: '0.8rem', color: 'var(--gray-500)', textDecoration: 'none' }}>Privacybeleid</Link>
                        <Link href="/voorwaarden" style={{ fontSize: '0.8rem', color: 'var(--gray-500)', textDecoration: 'none' }}>Voorwaarden</Link>
                        <Link href="/cookies" style={{ fontSize: '0.8rem', color: 'var(--gray-500)', textDecoration: 'none' }}>Cookies</Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}
