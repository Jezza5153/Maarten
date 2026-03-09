import { prisma } from '@/lib/db'
import Link from 'next/link'
import { ArrowLeft, Search, MapPin, Star, Clock } from 'lucide-react'
import { roleLabel, parseJsonArray, statusLabel, statusColor } from '@/lib/utils'

export const metadata = { title: 'Chef Beheer — Chef & Serve Admin' }

export default async function AdminChefsPage() {
    const chefs = await prisma.chef.findMany({
        orderBy: [{ status: 'asc' }, { reliabilityScore: 'desc' }],
        take: 100,
    })

    const total = await prisma.chef.count()
    const active = await prisma.chef.count({ where: { status: 'active' } })
    const warm = await prisma.chef.count({ where: { status: 'warm' } })
    const inactive = await prisma.chef.count({ where: { status: 'inactive' } })

    return (
        <div style={{ background: 'var(--gray-50)', minHeight: '100vh' }}>
            <div style={{ background: 'var(--navy)', padding: '1.5rem 0' }}>
                <div className="container-wide">
                    <Link href="/admin" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.25rem', color: 'var(--gray-400)', textDecoration: 'none', fontSize: '0.875rem', marginBottom: '0.75rem' }}>
                        <ArrowLeft size={14} /> Terug naar dashboard
                    </Link>
                    <h1 style={{ color: '#fff', fontSize: '1.5rem' }}>Chef Beheer</h1>
                    <p style={{ color: 'var(--gray-400)', fontSize: '0.875rem' }}>{total} chefs — {active} actief, {warm} warm, {inactive} inactief</p>
                </div>
            </div>

            <div className="container-wide" style={{ padding: '1.5rem 1rem 4rem' }}>
                {/* Quick filters */}
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
                    <span className="badge badge-active" style={{ cursor: 'pointer', padding: '0.375rem 0.875rem' }}>Actief ({active})</span>
                    <span className="badge badge-warm" style={{ cursor: 'pointer', padding: '0.375rem 0.875rem' }}>Warm ({warm})</span>
                    <span className="badge badge-inactive" style={{ cursor: 'pointer', padding: '0.375rem 0.875rem' }}>Inactief ({inactive})</span>
                    <span className="badge" style={{ cursor: 'pointer', padding: '0.375rem 0.875rem', border: '1px solid var(--gray-200)' }}>Alle ({total})</span>
                </div>

                {/* Bulk actions */}
                <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem' }}>
                    <button className="btn btn-outline btn-sm">Reactivatie e-mail versturen</button>
                    <button className="btn btn-outline btn-sm">Beschikbaarheid opvragen</button>
                </div>

                <div className="card" style={{ padding: 0, overflow: 'auto' }}>
                    <table className="data-table">
                        <thead>
                            <tr>
                                <th>Naam</th>
                                <th>Status</th>
                                <th>Functie(s)</th>
                                <th>Stad</th>
                                <th>Ervaring</th>
                                <th>Tarief</th>
                                <th>Profiel %</th>
                                <th>Betrouwbaar</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {chefs.map(chef => {
                                const roles = parseJsonArray(chef.roles)
                                return (
                                    <tr key={chef.id}>
                                        <td style={{ fontWeight: 600 }}>{chef.firstName} {chef.lastName}</td>
                                        <td><span className={`badge badge-${chef.status}`} style={{ fontSize: '0.65rem' }}>{statusLabel(chef.status)}</span></td>
                                        <td style={{ fontSize: '0.8rem' }}>{roles.map(r => roleLabel(r)).join(', ')}</td>
                                        <td style={{ fontSize: '0.8rem' }}><MapPin size={11} style={{ verticalAlign: 'middle' }} /> {chef.city}</td>
                                        <td>{chef.experienceYears}j</td>
                                        <td>€{chef.rateHourlyMin}-{chef.rateHourlyMax}</td>
                                        <td>
                                            <span style={{
                                                fontWeight: 700, fontSize: '0.8rem',
                                                color: chef.profileCompletenessScore >= 80 ? 'var(--success)' : chef.profileCompletenessScore >= 50 ? 'var(--warning)' : 'var(--danger)',
                                            }}>
                                                {chef.profileCompletenessScore}%
                                            </span>
                                        </td>
                                        <td>
                                            <span style={{ fontWeight: 700, fontSize: '0.8rem' }}>{chef.reliabilityScore}%</span>
                                        </td>
                                        <td>
                                            <Link href={`/chef/${chef.slug}`} className="btn btn-outline btn-sm" style={{ fontSize: '0.7rem', padding: '0.25rem 0.5rem' }}>Bekijk</Link>
                                        </td>
                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}
