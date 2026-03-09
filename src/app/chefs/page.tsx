import { prisma } from '@/lib/db'
import Link from 'next/link'
import { MapPin, Star, Clock } from 'lucide-react'
import { roleLabel, parseJsonArray } from '@/lib/utils'

export const metadata = {
    title: 'Chefs — Chef & Serve',
    description: 'Bekijk ons netwerk van 840+ gescreende keukenprofessionals in Amsterdam en omgeving.',
}

export default async function ChefsPage() {
    const chefs = await prisma.chef.findMany({
        where: { status: { in: ['active', 'warm'] } },
        orderBy: { reliabilityScore: 'desc' },
        take: 24,
    })

    const totalCount = await prisma.chef.count()
    const activeCount = await prisma.chef.count({ where: { status: 'active' } })

    return (
        <>
            <section style={{ background: 'linear-gradient(135deg, var(--navy) 0%, var(--navy-light) 100%)', color: '#fff', padding: '3rem 0' }}>
                <div className="container-wide">
                    <h1 style={{ color: '#fff', marginBottom: '0.5rem' }}>Ons chef-netwerk</h1>
                    <p style={{ color: 'var(--gray-400)' }}>
                        {totalCount} professionals, waarvan {activeCount} direct beschikbaar.
                    </p>
                </div>
            </section>

            <section className="section">
                <div className="container-wide">
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
                        {chefs.map(chef => {
                            const roles = parseJsonArray(chef.roles)
                            const cuisines = parseJsonArray(chef.cuisines)

                            return (
                                <Link key={chef.id} href={`/chef/${chef.slug}`} className="card" style={{ textDecoration: 'none', cursor: 'pointer' }}>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                                        <div style={{
                                            width: '3rem', height: '3rem', borderRadius: '9999px',
                                            background: 'var(--cream)', color: 'var(--gold-dark)',
                                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                                            fontWeight: 800, fontSize: '1rem',
                                        }}>
                                            {chef.firstName[0]}{chef.lastName[0]}
                                        </div>
                                        <div>
                                            <div style={{ fontWeight: 700, color: 'var(--navy)' }}>{chef.firstName} {chef.lastName}</div>
                                            <div style={{ fontSize: '0.75rem', color: 'var(--gray-500)' }}>
                                                {roles.map(r => roleLabel(r)).join(', ')}
                                            </div>
                                        </div>
                                        <span className={`badge badge-${chef.status}`} style={{ marginLeft: 'auto', fontSize: '0.65rem' }}>
                                            {chef.status === 'active' ? 'Actief' : 'Warm'}
                                        </span>
                                    </div>
                                    <div style={{ display: 'flex', gap: '1rem', fontSize: '0.75rem', color: 'var(--gray-500)' }}>
                                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><MapPin size={12} /> {chef.city}</span>
                                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><Star size={12} /> {chef.experienceYears}j</span>
                                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}><Clock size={12} /> €{chef.rateHourlyMin}-{chef.rateHourlyMax}/u</span>
                                    </div>
                                    {cuisines.length > 0 && (
                                        <div style={{ display: 'flex', gap: '0.25rem', flexWrap: 'wrap', marginTop: '0.5rem' }}>
                                            {cuisines.slice(0, 3).map((c, i) => (
                                                <span key={i} style={{ fontSize: '0.65rem', background: 'var(--cream)', padding: '0.125rem 0.5rem', borderRadius: '9999px', color: 'var(--gray-600)' }}>{c}</span>
                                            ))}
                                        </div>
                                    )}
                                </Link>
                            )
                        })}
                    </div>

                    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
                        <p style={{ color: 'var(--gray-500)', fontSize: '0.875rem' }}>
                            Wilt u alle {totalCount} professionals bekijken? Neem contact op of dien een aanvraag in.
                        </p>
                        <Link href="/aanvraag" className="btn btn-primary" style={{ marginTop: '1rem' }}>Aanvraag indienen</Link>
                    </div>
                </div>
            </section>
        </>
    )
}
