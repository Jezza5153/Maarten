import { prisma } from '@/lib/db'
import Link from 'next/link'
import { CheckCircle, AlertTriangle, Calendar, ArrowRight, Bell } from 'lucide-react'
import { roleLabel, parseJsonArray, formatDate } from '@/lib/utils'

export const metadata = { title: 'Chef Dashboard — Chef & Serve' }

export default async function ChefDashboardPage() {
    // Mock: pick a random active chef as the "logged in" user
    const chef = await prisma.chef.findFirst({
        where: { status: 'active' },
        include: { availability: { orderBy: { date: 'asc' } } },
    })

    if (!chef) return <div className="container-narrow" style={{ padding: '4rem 1rem' }}><h1>Geen profiel gevonden</h1></div>

    const roles = parseJsonArray(chef.roles)
    const cuisines = parseJsonArray(chef.cuisines)
    const languages = parseJsonArray(chef.languages)
    const certifications = parseJsonArray(chef.certifications)
    const incomplete = chef.profileCompletenessScore < 80
    const suggestions: string[] = []
    if (!chef.bio) suggestions.push('Voeg een bio toe')
    if (certifications.length === 0) suggestions.push('Voeg certificeringen toe')
    if (cuisines.length < 2) suggestions.push('Voeg keukenstijlen toe')
    if (chef.availability.length < 3) suggestions.push('Werk je beschikbaarheid bij')

    // Next 7 days
    const today = new Date()
    const next7 = Array.from({ length: 7 }, (_, i) => {
        const d = new Date(today.getTime() + i * 86400000)
        return d.toISOString().split('T')[0]
    })

    return (
        <div style={{ background: 'var(--gray-50)', minHeight: '80vh' }}>
            <div className="container-wide" style={{ maxWidth: '900px', padding: '2rem 1rem 4rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                    <div>
                        <h1 style={{ fontSize: '1.75rem' }}>Welkom, {chef.firstName}</h1>
                        <p style={{ color: 'var(--gray-500)', fontSize: '0.875rem' }}>Beheer je profiel en beschikbaarheid</p>
                    </div>
                    <span className={`badge badge-${chef.status}`} style={{ fontSize: '0.8rem' }}>
                        {chef.status === 'active' ? 'Actief' : chef.status === 'warm' ? 'Warm' : 'Inactief'}
                    </span>
                </div>

                {/* Reactivation Nudge */}
                {incomplete && (
                    <div className="card animate-fade-in" style={{
                        padding: '1.25rem', marginBottom: '1.5rem',
                        background: 'linear-gradient(135deg, #FEF3C7 0%, #FFFBEB 100%)',
                        border: '1px solid #FDE68A',
                    }}>
                        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                            <Bell size={20} color="var(--warning)" style={{ marginTop: '2px', flexShrink: 0 }} />
                            <div>
                                <h4 style={{ fontSize: '0.938rem', marginBottom: '0.25rem' }}>
                                    Je profiel is {chef.profileCompletenessScore}% compleet
                                </h4>
                                <p style={{ fontSize: '0.8rem', color: 'var(--gray-600)', marginBottom: '0.75rem' }}>
                                    Vul {suggestions.length} dingen in om vaker gematcht te worden met hotels.
                                </p>
                                <div style={{ display: 'flex', gap: '0.375rem', flexWrap: 'wrap' }}>
                                    {suggestions.map((s, i) => (
                                        <span key={i} className="badge badge-warm" style={{ fontSize: '0.7rem' }}>{s}</span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                )}

                {/* Profile Completeness */}
                <div className="card" style={{ padding: '1.25rem', marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
                        <h4 style={{ fontSize: '0.875rem', color: 'var(--gray-500)' }}>Profiel compleetheid</h4>
                        <span style={{ fontWeight: 800, fontSize: '1.25rem', color: chef.profileCompletenessScore >= 80 ? 'var(--success)' : 'var(--warning)' }}>
                            {chef.profileCompletenessScore}%
                        </span>
                    </div>
                    <div className="progress-bar">
                        <div className="progress-fill" style={{
                            width: `${chef.profileCompletenessScore}%`,
                            background: chef.profileCompletenessScore >= 80 ? 'var(--success)' : chef.profileCompletenessScore >= 50 ? 'var(--warning)' : 'var(--danger)',
                        }} />
                    </div>
                </div>

                {/* Quick Stats */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '1.5rem' }}>
                    <div className="metric-card">
                        <div className="metric-value">{roles.length}</div>
                        <div className="metric-label">Functies</div>
                    </div>
                    <div className="metric-card">
                        <div className="metric-value">{chef.experienceYears}j</div>
                        <div className="metric-label">Ervaring</div>
                    </div>
                    <div className="metric-card">
                        <div className="metric-value">€{chef.rateHourlyMin}-{chef.rateHourlyMax}</div>
                        <div className="metric-label">Uurtarief</div>
                    </div>
                </div>

                {/* Availability Quick Update */}
                <div className="card" style={{ padding: '1.5rem', marginBottom: '1.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                        <h3 style={{ fontSize: '1.063rem' }}>
                            <Calendar size={18} style={{ verticalAlign: 'middle', marginRight: '0.375rem' }} />
                            Beschikbaarheid
                        </h3>
                        <form action="/api/chefs/availability" method="POST">
                            <input type="hidden" name="chefId" value={chef.id} />
                            <button type="submit" className="btn btn-primary btn-sm">
                                <CheckCircle size={14} /> Beschikbaar komende 7 dagen
                            </button>
                        </form>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '0.5rem' }}>
                        {next7.map(date => {
                            const avail = chef.availability.find(a => a.date === date && a.isAvailable)
                            const dayName = new Date(date).toLocaleDateString('nl-NL', { weekday: 'short' })
                            const dayNum = new Date(date).getDate()

                            return (
                                <div key={date} style={{
                                    textAlign: 'center', padding: '0.75rem 0.375rem',
                                    borderRadius: '0.5rem',
                                    background: avail ? '#D1FAE5' : 'var(--gray-100)',
                                    border: avail ? '1.5px solid #A7F3D0' : '1.5px solid var(--gray-200)',
                                }}>
                                    <div style={{ fontSize: '0.7rem', fontWeight: 600, color: 'var(--gray-500)', textTransform: 'uppercase' }}>{dayName}</div>
                                    <div style={{ fontSize: '1.125rem', fontWeight: 700, color: avail ? '#065F46' : 'var(--gray-400)' }}>{dayNum}</div>
                                    <div style={{ fontSize: '0.6rem', color: avail ? '#059669' : 'var(--gray-400)' }}>
                                        {avail ? `${avail.startTime}-${avail.endTime}` : '—'}
                                    </div>
                                </div>
                            )
                        })}
                    </div>
                </div>

                {/* Profile Details */}
                <div className="card" style={{ padding: '1.5rem' }}>
                    <h3 style={{ fontSize: '1.063rem', marginBottom: '1rem' }}>Profiel details</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                        <div>
                            <span style={{ fontSize: '0.75rem', color: 'var(--gray-500)' }}>Functies</span>
                            <div style={{ display: 'flex', gap: '0.25rem', flexWrap: 'wrap', marginTop: '0.25rem' }}>
                                {roles.map(r => <span key={r} className="badge" style={{ background: 'var(--cream)', color: 'var(--gold-dark)' }}>{roleLabel(r)}</span>)}
                            </div>
                        </div>
                        <div>
                            <span style={{ fontSize: '0.75rem', color: 'var(--gray-500)' }}>Talen</span>
                            <div style={{ display: 'flex', gap: '0.25rem', flexWrap: 'wrap', marginTop: '0.25rem' }}>
                                {languages.map(l => <span key={l} className="badge badge-active">{l}</span>)}
                            </div>
                        </div>
                        <div>
                            <span style={{ fontSize: '0.75rem', color: 'var(--gray-500)' }}>Certificeringen</span>
                            <div style={{ display: 'flex', gap: '0.25rem', flexWrap: 'wrap', marginTop: '0.25rem' }}>
                                {certifications.length > 0 ? certifications.map(c => <span key={c} className="badge badge-new">{c}</span>) : <span style={{ fontSize: '0.8rem', color: 'var(--gray-400)' }}>Geen</span>}
                            </div>
                        </div>
                        <div>
                            <span style={{ fontSize: '0.75rem', color: 'var(--gray-500)' }}>Locatie</span>
                            <div style={{ fontWeight: 600, marginTop: '0.25rem' }}>{chef.city} (radius {chef.radiusKm} km)</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
