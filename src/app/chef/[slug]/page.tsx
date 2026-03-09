import { prisma } from '@/lib/db'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { MapPin, Star, Clock, Globe, Award, ArrowLeft, CheckCircle } from 'lucide-react'
import { roleLabel, parseJsonArray, formatDate, completenessColor } from '@/lib/utils'

export default async function ChefProfilePage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params
    const chef = await prisma.chef.findUnique({
        where: { slug },
        include: { availability: { orderBy: { date: 'asc' }, take: 14 } },
    })

    if (!chef) return notFound()

    const roles = parseJsonArray(chef.roles)
    const cuisines = parseJsonArray(chef.cuisines)
    const languages = parseJsonArray(chef.languages)
    const certifications = parseJsonArray(chef.certifications)

    return (
        <div style={{ background: 'var(--gray-50)', minHeight: '80vh' }}>
            <div className="container-wide" style={{ maxWidth: '800px', padding: '2rem 1rem 4rem' }}>
                <Link href="/chefs" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.875rem', color: 'var(--gray-500)', textDecoration: 'none', marginBottom: '1.5rem' }}>
                    <ArrowLeft size={14} /> Terug naar overzicht
                </Link>

                <div className="card" style={{ padding: '2rem', marginBottom: '1.5rem' }}>
                    <div style={{ display: 'flex', gap: '1.25rem', alignItems: 'flex-start', flexWrap: 'wrap' }}>
                        <div style={{
                            width: '5rem', height: '5rem', borderRadius: '9999px',
                            background: 'var(--cream)', color: 'var(--gold-dark)',
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            fontWeight: 800, fontSize: '1.5rem', flexShrink: 0,
                        }}>
                            {chef.firstName[0]}{chef.lastName[0]}
                        </div>
                        <div style={{ flex: 1 }}>
                            <h1 style={{ fontSize: '1.75rem', marginBottom: '0.25rem' }}>{chef.firstName} {chef.lastName}</h1>
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', fontSize: '0.875rem', color: 'var(--gray-500)' }}>
                                <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><MapPin size={14} /> {chef.city} (radius {chef.radiusKm} km)</span>
                                <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><Star size={14} /> {chef.experienceYears} jaar ervaring</span>
                                <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><Clock size={14} /> €{chef.rateHourlyMin}-{chef.rateHourlyMax}/uur</span>
                            </div>
                            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.75rem', flexWrap: 'wrap' }}>
                                <span className={`badge badge-${chef.status}`}>{chef.status === 'active' ? 'Actief' : chef.status === 'warm' ? 'Warm' : 'Inactief'}</span>
                                {roles.map(r => <span key={r} className="badge" style={{ background: 'var(--cream)', color: 'var(--gold-dark)' }}>{roleLabel(r)}</span>)}
                            </div>
                        </div>
                    </div>

                    {chef.bio && (
                        <p style={{ marginTop: '1.25rem', fontSize: '0.938rem', color: 'var(--gray-600)', lineHeight: 1.7 }}>
                            {chef.bio}
                        </p>
                    )}
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                    <div className="card">
                        <h4 style={{ fontSize: '0.875rem', color: 'var(--gray-500)', marginBottom: '0.75rem' }}>Profiel compleetheid</h4>
                        <div className="progress-bar" style={{ marginBottom: '0.375rem' }}>
                            <div className="progress-fill" style={{ width: `${chef.profileCompletenessScore}%`, background: chef.profileCompletenessScore >= 80 ? 'var(--success)' : chef.profileCompletenessScore >= 50 ? 'var(--warning)' : 'var(--danger)' }} />
                        </div>
                        <span className={completenessColor(chef.profileCompletenessScore)} style={{ fontSize: '1.5rem', fontWeight: 800 }}>
                            {chef.profileCompletenessScore}%
                        </span>
                    </div>
                    <div className="card">
                        <h4 style={{ fontSize: '0.875rem', color: 'var(--gray-500)', marginBottom: '0.75rem' }}>Betrouwbaarheid</h4>
                        <div className="progress-bar" style={{ marginBottom: '0.375rem' }}>
                            <div className="progress-fill" style={{ width: `${chef.reliabilityScore}%`, background: chef.reliabilityScore >= 80 ? 'var(--success)' : chef.reliabilityScore >= 50 ? 'var(--warning)' : 'var(--danger)' }} />
                        </div>
                        <span style={{ fontSize: '1.5rem', fontWeight: 800, color: 'var(--navy)' }}>
                            {chef.reliabilityScore}%
                        </span>
                    </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem' }}>
                    <div className="card">
                        <h4 style={{ fontSize: '0.875rem', color: 'var(--gray-500)', marginBottom: '0.5rem' }}>
                            <Globe size={14} style={{ verticalAlign: 'middle', marginRight: '0.25rem' }} /> Talen
                        </h4>
                        <div style={{ display: 'flex', gap: '0.375rem', flexWrap: 'wrap' }}>
                            {languages.map(l => <span key={l} className="badge badge-active">{l}</span>)}
                        </div>
                    </div>
                    <div className="card">
                        <h4 style={{ fontSize: '0.875rem', color: 'var(--gray-500)', marginBottom: '0.5rem' }}>
                            <Award size={14} style={{ verticalAlign: 'middle', marginRight: '0.25rem' }} /> Certificeringen
                        </h4>
                        <div style={{ display: 'flex', gap: '0.375rem', flexWrap: 'wrap' }}>
                            {certifications.length > 0 ? certifications.map(c => <span key={c} className="badge badge-new">{c}</span>) : <span style={{ fontSize: '0.8rem', color: 'var(--gray-400)' }}>Geen certificeringen</span>}
                        </div>
                    </div>
                </div>

                <div className="card" style={{ marginBottom: '1.5rem' }}>
                    <h4 style={{ fontSize: '0.875rem', color: 'var(--gray-500)', marginBottom: '0.5rem' }}>Keukenstijlen</h4>
                    <div style={{ display: 'flex', gap: '0.375rem', flexWrap: 'wrap' }}>
                        {cuisines.map(c => <span key={c} style={{ fontSize: '0.75rem', background: 'var(--cream)', padding: '0.25rem 0.625rem', borderRadius: '9999px', color: 'var(--gray-600)' }}>{c}</span>)}
                    </div>
                </div>

                {chef.availability.length > 0 && (
                    <div className="card">
                        <h4 style={{ fontSize: '0.875rem', color: 'var(--gray-500)', marginBottom: '0.75rem' }}>Beschikbaarheid</h4>
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(140px, 1fr))', gap: '0.5rem' }}>
                            {chef.availability.filter(a => a.isAvailable).map(a => (
                                <div key={a.id} style={{
                                    padding: '0.5rem',
                                    borderRadius: '0.375rem',
                                    background: '#D1FAE5',
                                    textAlign: 'center',
                                    fontSize: '0.75rem',
                                }}>
                                    <div style={{ fontWeight: 600, color: '#065F46' }}>{formatDate(a.date)}</div>
                                    <div style={{ color: '#047857' }}>{a.startTime} - {a.endTime}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}
