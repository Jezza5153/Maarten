import { prisma } from '@/lib/db'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { ArrowLeft, User, MapPin, Star, Zap, Clock } from 'lucide-react'
import { roleLabel, parseJsonArray, formatDate, statusLabel, statusColor } from '@/lib/utils'

export default async function AdminRequestDetailPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const request = await prisma.shiftRequest.findUnique({
        where: { id },
        include: {
            hotelCompany: true,
            matchResults: { include: { chef: true }, orderBy: { matchScore: 'desc' } },
        },
    })

    if (!request) return notFound()

    const reqLanguages = parseJsonArray(request.languagesReq)
    const reqCerts = parseJsonArray(request.certificationsReq)

    return (
        <div style={{ background: 'var(--gray-50)', minHeight: '100vh' }}>
            <div style={{ background: 'var(--navy)', padding: '1.5rem 0' }}>
                <div className="container-wide">
                    <Link href="/admin" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', color: 'var(--gray-400)', textDecoration: 'none', fontSize: '0.875rem', marginBottom: '0.75rem' }}>
                        <ArrowLeft size={14} /> Terug naar dashboard
                    </Link>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div>
                            <h1 style={{ color: '#fff', fontSize: '1.5rem' }}>{request.hotelCompany.name}</h1>
                            <p style={{ color: 'var(--gray-400)', fontSize: '0.875rem' }}>
                                {roleLabel(request.roleNeeded)} — {formatDate(request.date)} — {request.startTime}-{request.endTime}
                            </p>
                        </div>
                        <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                            {request.urgency === 'urgent' && <span className="badge badge-urgent"><Zap size={10} /> Urgent</span>}
                            <span className={`badge ${statusColor(request.status)}`}>{statusLabel(request.status)}</span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container-wide" style={{ padding: '1.5rem 1rem 4rem' }}>
                {/* Request Details */}
                <div className="card" style={{ marginBottom: '1.5rem', padding: '1.25rem' }}>
                    <h3 style={{ fontSize: '1rem', marginBottom: '1rem' }}>Aanvraag details</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '1rem' }}>
                        <div><span style={{ fontSize: '0.75rem', color: 'var(--gray-500)' }}>Functie</span><div style={{ fontWeight: 600 }}>{roleLabel(request.roleNeeded)}</div></div>
                        <div><span style={{ fontSize: '0.75rem', color: 'var(--gray-500)' }}>Datum</span><div style={{ fontWeight: 600 }}>{formatDate(request.date)}</div></div>
                        <div><span style={{ fontSize: '0.75rem', color: 'var(--gray-500)' }}>Tijden</span><div style={{ fontWeight: 600 }}>{request.startTime} - {request.endTime}</div></div>
                        <div><span style={{ fontSize: '0.75rem', color: 'var(--gray-500)' }}>Locatie</span><div style={{ fontWeight: 600 }}>{request.locationCity}</div></div>
                        <div><span style={{ fontSize: '0.75rem', color: 'var(--gray-500)' }}>Budget</span><div style={{ fontWeight: 600 }}>{request.budgetMin && request.budgetMax ? `€${request.budgetMin}-${request.budgetMax}/u` : 'Niet opgegeven'}</div></div>
                        <div><span style={{ fontSize: '0.75rem', color: 'var(--gray-500)' }}>Talen vereist</span><div style={{ display: 'flex', gap: '0.25rem', marginTop: '0.125rem' }}>{reqLanguages.map(l => <span key={l} className="badge badge-active" style={{ fontSize: '0.65rem' }}>{l}</span>)}</div></div>
                        <div><span style={{ fontSize: '0.75rem', color: 'var(--gray-500)' }}>Certificeringen</span><div style={{ display: 'flex', gap: '0.25rem', marginTop: '0.125rem' }}>{reqCerts.map(c => <span key={c} className="badge badge-new" style={{ fontSize: '0.65rem' }}>{c}</span>)}</div></div>
                    </div>
                    {request.specialNotes && <div style={{ marginTop: '1rem', padding: '0.75rem', background: 'var(--cream)', borderRadius: '0.375rem', fontSize: '0.875rem', color: 'var(--gray-600)' }}><strong>Opmerkingen:</strong> {request.specialNotes}</div>}
                </div>

                {/* Hotel Contact */}
                <div className="card" style={{ marginBottom: '1.5rem', padding: '1.25rem' }}>
                    <h3 style={{ fontSize: '1rem', marginBottom: '0.5rem' }}>Hotel contact</h3>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: '0.75rem', fontSize: '0.875rem' }}>
                        <div><span style={{ color: 'var(--gray-500)' }}>Naam:</span> {request.hotelCompany.contactName}</div>
                        <div><span style={{ color: 'var(--gray-500)' }}>Email:</span> {request.hotelCompany.contactEmail}</div>
                        <div><span style={{ color: 'var(--gray-500)' }}>KvK:</span> {request.hotelCompany.kvkNumber}</div>
                    </div>
                </div>

                {/* Matches */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <h2 style={{ fontSize: '1.25rem' }}>Matches ({request.matchResults.length})</h2>
                    <button className="btn btn-primary btn-sm">Shortlist versturen</button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {request.matchResults.map((match, i) => {
                        const reasons = parseJsonArray(match.matchReasons)
                        const risks = parseJsonArray(match.risks)
                        const chefRoles = parseJsonArray(match.chef.roles)
                        const scoreClass = match.matchScore >= 60 ? 'score-high' : match.matchScore >= 35 ? 'score-medium' : 'score-low'

                        return (
                            <div key={match.id} className="card" style={{ padding: '1.25rem' }}>
                                <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                                    <div className={`score-circle ${scoreClass}`}>{match.matchScore}</div>
                                    <div style={{ flex: 1 }}>
                                        <div style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem' }}>
                                            <div>
                                                <Link href={`/chef/${match.chef.slug}`} style={{ fontWeight: 700, color: 'var(--navy)', textDecoration: 'none', fontSize: '1rem' }}>
                                                    {match.chef.firstName} {match.chef.lastName}
                                                </Link>
                                                <div style={{ display: 'flex', gap: '0.75rem', fontSize: '0.75rem', color: 'var(--gray-500)', marginTop: '0.125rem' }}>
                                                    <span><User size={11} /> {chefRoles.map(r => r.replace(/_/g, ' ')).join(', ')}</span>
                                                    <span><MapPin size={11} /> {match.chef.city}</span>
                                                    <span><Star size={11} /> {match.chef.experienceYears}j</span>
                                                    <span><Clock size={11} /> €{match.chef.rateHourlyMin}-{match.chef.rateHourlyMax}/u</span>
                                                </div>
                                            </div>
                                            <div style={{ display: 'flex', gap: '0.375rem' }}>
                                                <button className="btn btn-primary btn-sm" style={{ fontSize: '0.75rem', padding: '0.375rem 0.75rem' }}>Shortlist</button>
                                                <button className="btn btn-outline btn-sm" style={{ fontSize: '0.75rem', padding: '0.375rem 0.75rem', color: 'var(--danger)', borderColor: 'var(--danger)' }}>Verwijder</button>
                                            </div>
                                        </div>

                                        {match.summary && <p style={{ fontSize: '0.8rem', color: 'var(--gray-600)', marginTop: '0.5rem', lineHeight: 1.5 }}>{match.summary}</p>}

                                        <div style={{ display: 'flex', gap: '0.375rem', marginTop: '0.5rem', flexWrap: 'wrap' }}>
                                            {reasons.slice(0, 3).map((r, j) => <span key={j} className="badge badge-active" style={{ fontSize: '0.6rem' }}>✓ {r}</span>)}
                                            {risks.slice(0, 2).map((r, j) => <span key={j} className="badge badge-warm" style={{ fontSize: '0.6rem' }}>⚠ {r}</span>)}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>

                {request.matchResults.length === 0 && (
                    <div className="card" style={{ textAlign: 'center', padding: '2rem', color: 'var(--gray-500)' }}>
                        Nog geen matches. Klik op "Match opnieuw" om het systeem te activeren.
                    </div>
                )}
            </div>
        </div>
    )
}
