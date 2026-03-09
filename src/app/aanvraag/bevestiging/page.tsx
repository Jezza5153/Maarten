import { prisma } from '@/lib/db'
import Link from 'next/link'
import { CheckCircle, ArrowRight, Clock, User, MapPin, Star } from 'lucide-react'
import { roleLabel, parseJsonArray, formatDate } from '@/lib/utils'

export default async function BevestigingPage({ searchParams }: { searchParams: Promise<{ id?: string }> }) {
    const params = await searchParams
    const requestId = params.id

    if (!requestId) {
        return (
            <div className="container-narrow" style={{ padding: '4rem 1rem', textAlign: 'center' }}>
                <h1>Geen aanvraag gevonden</h1>
                <Link href="/aanvraag" className="btn btn-primary" style={{ marginTop: '1rem' }}>Nieuwe aanvraag</Link>
            </div>
        )
    }

    const request = await prisma.shiftRequest.findUnique({
        where: { id: requestId },
        include: {
            hotelCompany: true,
            matchResults: {
                include: { chef: true },
                orderBy: { matchScore: 'desc' },
            },
        },
    })

    if (!request) {
        return (
            <div className="container-narrow" style={{ padding: '4rem 1rem', textAlign: 'center' }}>
                <h1>Aanvraag niet gevonden</h1>
                <Link href="/aanvraag" className="btn btn-primary" style={{ marginTop: '1rem' }}>Nieuwe aanvraag</Link>
            </div>
        )
    }

    return (
        <div style={{ background: 'var(--gray-50)', minHeight: '80vh' }}>
            <div className="container-wide" style={{ padding: '2rem 1rem 4rem', maxWidth: '900px' }}>
                {/* Success Banner */}
                <div className="card animate-fade-in" style={{
                    textAlign: 'center', padding: '2rem', marginBottom: '2rem',
                    background: 'linear-gradient(135deg, #D1FAE5 0%, #ECFDF5 100%)',
                    border: '1px solid #A7F3D0',
                }}>
                    <CheckCircle size={48} color="var(--success)" style={{ marginBottom: '0.75rem' }} />
                    <h2 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>Aanvraag ontvangen!</h2>
                    <p style={{ color: 'var(--gray-600)' }}>
                        Wij hebben {request.matchResults.length} matches gevonden. Hieronder vindt u de shortlist.
                    </p>
                </div>

                {/* Request Summary */}
                <div className="card" style={{ marginBottom: '1.5rem', padding: '1.25rem' }}>
                    <h3 style={{ fontSize: '1rem', marginBottom: '0.75rem', color: 'var(--gray-500)' }}>Aanvraag samenvatting</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem' }}>
                        <div><span style={{ fontSize: '0.75rem', color: 'var(--gray-500)' }}>Functie</span><div style={{ fontWeight: 600 }}>{roleLabel(request.roleNeeded)}</div></div>
                        <div><span style={{ fontSize: '0.75rem', color: 'var(--gray-500)' }}>Datum</span><div style={{ fontWeight: 600 }}>{formatDate(request.date)}</div></div>
                        <div><span style={{ fontSize: '0.75rem', color: 'var(--gray-500)' }}>Tijden</span><div style={{ fontWeight: 600 }}>{request.startTime} - {request.endTime}</div></div>
                        <div><span style={{ fontSize: '0.75rem', color: 'var(--gray-500)' }}>Locatie</span><div style={{ fontWeight: 600 }}>{request.locationCity}</div></div>
                    </div>
                </div>

                {/* Shortlist */}
                <h3 style={{ marginBottom: '1rem' }}>Shortlist ({request.matchResults.length} kandidaten)</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                    {request.matchResults.map((match, i) => {
                        const reasons = parseJsonArray(match.matchReasons)
                        const risks = parseJsonArray(match.risks)
                        const chefRoles = parseJsonArray(match.chef.roles)
                        const scoreClass = match.matchScore >= 60 ? 'score-high' : match.matchScore >= 35 ? 'score-medium' : 'score-low'

                        return (
                            <div key={match.id} className="card animate-slide-up" style={{ animationDelay: `${i * 0.1}s`, opacity: 0, padding: '1.5rem' }}>
                                <div style={{ display: 'flex', gap: '1rem', alignItems: 'flex-start' }}>
                                    <div className={`score-circle ${scoreClass}`}>{match.matchScore}</div>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '0.5rem' }}>
                                            <div>
                                                <h4 style={{ fontSize: '1.063rem' }}>{match.chef.firstName} {match.chef.lastName}</h4>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', fontSize: '0.8rem', color: 'var(--gray-500)', marginTop: '0.25rem' }}>
                                                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                                        <User size={12} /> {chefRoles.map(r => r.replace(/_/g, ' ')).join(', ')}
                                                    </span>
                                                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                                        <MapPin size={12} /> {match.chef.city}
                                                    </span>
                                                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                                        <Star size={12} /> {match.chef.experienceYears}j ervaring
                                                    </span>
                                                </div>
                                            </div>
                                            <div style={{ fontWeight: 700, color: 'var(--navy)', fontSize: '0.938rem' }}>
                                                €{match.chef.rateHourlyMin}-{match.chef.rateHourlyMax}/u
                                            </div>
                                        </div>

                                        {match.summary && (
                                            <p style={{ fontSize: '0.875rem', color: 'var(--gray-600)', marginTop: '0.75rem', lineHeight: 1.6 }}>
                                                {match.summary}
                                            </p>
                                        )}

                                        <div style={{ display: 'flex', gap: '1rem', marginTop: '0.75rem', flexWrap: 'wrap' }}>
                                            {reasons.slice(0, 3).map((r, j) => (
                                                <span key={j} className="badge badge-active" style={{ fontSize: '0.7rem' }}>✓ {r}</span>
                                            ))}
                                            {risks.slice(0, 2).map((r, j) => (
                                                <span key={j} className="badge badge-warm" style={{ fontSize: '0.7rem' }}>⚠ {r}</span>
                                            ))}
                                        </div>

                                        <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1rem' }}>
                                            <button className="btn btn-primary btn-sm">Bevestig keuze</button>
                                            <Link href={`/chef/${match.chef.slug}`} className="btn btn-outline btn-sm">Bekijk profiel</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>

                <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                    <p style={{ color: 'var(--gray-500)', fontSize: '0.875rem', marginBottom: '1rem' }}>
                        Vragen over de shortlist? Neem contact op met uw planner.
                    </p>
                    <Link href="/" className="btn btn-outline">
                        Terug naar homepage
                    </Link>
                </div>
            </div>
        </div>
    )
}
