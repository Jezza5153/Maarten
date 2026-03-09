import { prisma } from '@/lib/db'
import Link from 'next/link'
import { Clock, Users, AlertTriangle, CheckCircle, ArrowRight, Zap } from 'lucide-react'
import { roleLabel, statusLabel, statusColor, formatDate } from '@/lib/utils'

export const metadata = { title: 'Admin Dashboard — Chef & Serve' }

export default async function AdminPage() {
    const requests = await prisma.shiftRequest.findMany({
        include: { hotelCompany: true, matchResults: true },
        orderBy: { createdAt: 'desc' },
    })

    const totalChefs = await prisma.chef.count()
    const activeChefs = await prisma.chef.count({ where: { status: 'active' } })
    const warmChefs = await prisma.chef.count({ where: { status: 'warm' } })
    const inactiveChefs = await prisma.chef.count({ where: { status: 'inactive' } })
    const newRequests = requests.filter(r => r.status === 'new').length
    const urgentRequests = requests.filter(r => r.urgency === 'urgent' && r.status !== 'booked' && r.status !== 'cancelled').length

    return (
        <div style={{ background: 'var(--gray-50)', minHeight: '100vh' }}>
            <div style={{ background: 'var(--navy)', padding: '1.5rem 0' }}>
                <div className="container-wide">
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <div>
                            <h1 style={{ color: '#fff', fontSize: '1.5rem', marginBottom: '0.125rem' }}>Planner Dashboard</h1>
                            <p style={{ color: 'var(--gray-400)', fontSize: '0.8rem' }}>Chef & Serve — Administratie</p>
                        </div>
                        <div style={{ display: 'flex', gap: '0.75rem' }}>
                            <Link href="/admin/chefs" className="btn btn-sm" style={{ background: 'rgba(255,255,255,0.1)', color: '#fff', border: '1px solid rgba(255,255,255,0.2)' }}>
                                Chef beheer
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container-wide" style={{ padding: '1.5rem 1rem 4rem' }}>
                {/* Metrics */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
                    <div className="metric-card">
                        <div className="metric-value">{newRequests}</div>
                        <div className="metric-label">Nieuwe aanvragen</div>
                    </div>
                    <div className="metric-card" style={{ borderColor: urgentRequests > 0 ? 'var(--danger)' : undefined }}>
                        <div className="metric-value" style={{ color: urgentRequests > 0 ? 'var(--danger)' : undefined }}>{urgentRequests}</div>
                        <div className="metric-label">Urgent</div>
                    </div>
                    <div className="metric-card">
                        <div className="metric-value">{activeChefs}</div>
                        <div className="metric-label">Actieve chefs</div>
                    </div>
                    <div className="metric-card">
                        <div className="metric-value">{warmChefs}</div>
                        <div className="metric-label">Warm</div>
                    </div>
                    <div className="metric-card">
                        <div className="metric-value">{inactiveChefs}</div>
                        <div className="metric-label">Inactief</div>
                    </div>
                    <div className="metric-card">
                        <div className="metric-value">{totalChefs}</div>
                        <div className="metric-label">Totaal pool</div>
                    </div>
                </div>

                {/* Request Queue */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
                    <h2 style={{ fontSize: '1.25rem' }}>Aanvragen ({requests.length})</h2>
                </div>

                <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Hotel</th>
                                <th>Functie</th>
                                <th>Datum</th>
                                <th>Tijden</th>
                                <th>Urgentie</th>
                                <th>Status</th>
                                <th>Matches</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {requests.map(req => (
                                <tr key={req.id}>
                                    <td style={{ fontWeight: 600 }}>{req.hotelCompany.name}</td>
                                    <td>{roleLabel(req.roleNeeded)}</td>
                                    <td>{formatDate(req.date)}</td>
                                    <td>{req.startTime} - {req.endTime}</td>
                                    <td>
                                        {req.urgency === 'urgent' ? (
                                            <span className="badge badge-urgent"><Zap size={10} /> Urgent</span>
                                        ) : (
                                            <span style={{ fontSize: '0.8rem', color: 'var(--gray-500)' }}>Normaal</span>
                                        )}
                                    </td>
                                    <td><span className={`badge ${statusColor(req.status)}`}>{statusLabel(req.status)}</span></td>
                                    <td style={{ fontWeight: 600 }}>{req.matchResults.length}</td>
                                    <td>
                                        <Link href={`/admin/requests/${req.id}`} className="btn btn-outline btn-sm">
                                            Bekijk <ArrowRight size={12} />
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
