'use client'
import Link from 'next/link'
import { useState } from 'react'
import { Menu, X, ChefHat } from 'lucide-react'

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false)

    return (
        <header style={{
            position: 'sticky',
            top: 0,
            zIndex: 50,
            background: 'rgba(255,255,255,0.97)',
            backdropFilter: 'blur(8px)',
            borderBottom: '1px solid var(--gray-200)',
        }}>
            <div className="container-wide" style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                height: '4rem',
            }}>
                <Link href="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', textDecoration: 'none' }}>
                    <ChefHat size={28} color="var(--gold)" />
                    <span style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--navy)' }}>
                        Chef <span style={{ color: 'var(--gold)' }}>&</span> Serve
                    </span>
                </Link>

                <nav style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}
                    className="desktop-nav">
                    <Link href="/voor-hotels" style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--gray-600)', textDecoration: 'none' }}>
                        Voor Hotels
                    </Link>
                    <Link href="/werkwijze" style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--gray-600)', textDecoration: 'none' }}>
                        Werkwijze
                    </Link>
                    <Link href="/chefs" style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--gray-600)', textDecoration: 'none' }}>
                        Chefs
                    </Link>
                    <Link href="/login" style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--gray-600)', textDecoration: 'none' }}>
                        Chef Login
                    </Link>
                    <Link href="/admin" style={{ fontSize: '0.875rem', fontWeight: 500, color: 'var(--gray-500)', textDecoration: 'none' }}>
                        Admin
                    </Link>
                    <Link href="/aanvraag" className="btn btn-primary btn-sm">
                        Aanvraag indienen
                    </Link>
                </nav>

                <button
                    className="mobile-menu-btn"
                    onClick={() => setMenuOpen(!menuOpen)}
                    style={{
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        padding: '0.5rem',
                        display: 'none',
                    }}
                >
                    {menuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {menuOpen && (
                <div style={{
                    background: '#fff',
                    borderTop: '1px solid var(--gray-200)',
                    padding: '1rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.75rem',
                }}>
                    <Link href="/voor-hotels" onClick={() => setMenuOpen(false)} style={{ padding: '0.5rem 0', fontWeight: 500, color: 'var(--gray-700)', textDecoration: 'none' }}>Voor Hotels</Link>
                    <Link href="/werkwijze" onClick={() => setMenuOpen(false)} style={{ padding: '0.5rem 0', fontWeight: 500, color: 'var(--gray-700)', textDecoration: 'none' }}>Werkwijze</Link>
                    <Link href="/chefs" onClick={() => setMenuOpen(false)} style={{ padding: '0.5rem 0', fontWeight: 500, color: 'var(--gray-700)', textDecoration: 'none' }}>Chefs</Link>
                    <Link href="/login" onClick={() => setMenuOpen(false)} style={{ padding: '0.5rem 0', fontWeight: 500, color: 'var(--gray-700)', textDecoration: 'none' }}>Chef Login</Link>
                    <Link href="/admin" onClick={() => setMenuOpen(false)} style={{ padding: '0.5rem 0', fontWeight: 500, color: 'var(--gray-500)', textDecoration: 'none' }}>Admin</Link>
                    <Link href="/aanvraag" className="btn btn-primary" onClick={() => setMenuOpen(false)}>Aanvraag indienen</Link>
                </div>
            )}

            <style jsx global>{`
        @media (max-width: 768px) {
          .desktop-nav { display: none !important; }
          .mobile-menu-btn { display: block !important; }
        }
      `}</style>
        </header>
    )
}
