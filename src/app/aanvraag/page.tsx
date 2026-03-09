'use client'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { ArrowRight, ArrowLeft, CheckCircle, Building2, AlertCircle } from 'lucide-react'

const ROLES = [
    { value: 'chef_de_partie', label: 'Chef de Partie' },
    { value: 'sous_chef', label: 'Sous Chef' },
    { value: 'executive_chef', label: 'Executive Chef' },
    { value: 'pastry_chef', label: 'Pastry Chef' },
    { value: 'bediening', label: 'Bediening' },
]

export default function AanvraagPage() {
    const router = useRouter()
    const [step, setStep] = useState(1)
    const [submitting, setSubmitting] = useState(false)
    const [form, setForm] = useState({
        roleNeeded: '',
        date: '',
        startTime: '',
        endTime: '',
        locationCity: 'Amsterdam',
        languages: ['NL', 'EN'],
        certifications: ['HACCP'],
        dressCode: '',
        specialNotes: '',
        budgetMin: '',
        budgetMax: '',
        urgency: 'normal',
        companyName: '',
        kvkNumber: '',
        contactName: '',
        contactEmail: '',
        contactPhone: '',
    })

    const update = (field: string, value: any) => setForm(f => ({ ...f, [field]: value }))

    const toggleArrayItem = (field: string, item: string) => {
        setForm(f => {
            const arr = (f as any)[field] as string[]
            return { ...f, [field]: arr.includes(item) ? arr.filter(i => i !== item) : [...arr, item] }
        })
    }

    const handleSubmit = async () => {
        setSubmitting(true)
        try {
            const res = await fetch('/api/requests', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            })
            const data = await res.json()
            router.push(`/aanvraag/bevestiging?id=${data.requestId}`)
        } catch {
            alert('Er ging iets mis. Probeer het opnieuw.')
            setSubmitting(false)
        }
    }

    return (
        <div style={{ background: 'var(--gray-50)', minHeight: '80vh' }}>
            <div className="container-narrow" style={{ padding: '2rem 1rem 4rem' }}>
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                    <h1 style={{ fontSize: '2rem' }}>Aanvraag indienen</h1>
                    <p style={{ color: 'var(--gray-500)', marginTop: '0.5rem' }}>
                        Vul de details in en ontvang binnen enkele uren uw shortlist.
                    </p>
                </div>

                {/* Stepper */}
                <div className="stepper">
                    {[1, 2, 3].map(s => (
                        <div className="stepper-step" key={s}>
                            <div className={`stepper-circle ${step > s ? 'completed' : step === s ? 'active' : 'pending'}`}>
                                {step > s ? <CheckCircle size={16} /> : s}
                            </div>
                            <span style={{ fontSize: '0.8rem', fontWeight: 600, color: step >= s ? 'var(--navy)' : 'var(--gray-400)' }}>
                                {s === 1 ? 'Shift' : s === 2 ? 'Vereisten' : 'Contact'}
                            </span>
                            {s < 3 && <div className={`stepper-line ${step > s ? 'completed' : ''}`} />}
                        </div>
                    ))}
                </div>

                <div className="card" style={{ padding: '2rem' }}>
                    {/* Step 1: Shift Details */}
                    {step === 1 && (
                        <div className="animate-fade-in">
                            <h3 style={{ marginBottom: '1.5rem' }}>Shift details</h3>

                            <div className="form-group">
                                <label className="form-label">Welke functie heeft u nodig? *</label>
                                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(150px, 1fr))', gap: '0.5rem' }}>
                                    {ROLES.map(r => (
                                        <button
                                            key={r.value}
                                            onClick={() => update('roleNeeded', r.value)}
                                            style={{
                                                padding: '0.75rem',
                                                borderRadius: '0.5rem',
                                                border: form.roleNeeded === r.value ? '2px solid var(--gold)' : '1.5px solid var(--gray-200)',
                                                background: form.roleNeeded === r.value ? 'var(--cream)' : '#fff',
                                                cursor: 'pointer',
                                                fontWeight: 600,
                                                fontSize: '0.875rem',
                                                color: 'var(--navy)',
                                            }}
                                        >
                                            {r.label}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem' }}>
                                <div className="form-group">
                                    <label className="form-label">Datum *</label>
                                    <input type="date" className="form-input" value={form.date} onChange={e => update('date', e.target.value)} />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Starttijd *</label>
                                    <input type="time" className="form-input" value={form.startTime} onChange={e => update('startTime', e.target.value)} />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Eindtijd *</label>
                                    <input type="time" className="form-input" value={form.endTime} onChange={e => update('endTime', e.target.value)} />
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="form-label">Locatie</label>
                                <input type="text" className="form-input" value={form.locationCity} onChange={e => update('locationCity', e.target.value)} placeholder="Amsterdam" />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Urgentie</label>
                                <div style={{ display: 'flex', gap: '0.75rem' }}>
                                    {[
                                        { value: 'normal', label: 'Normaal', desc: 'Binnen 24 uur' },
                                        { value: 'urgent', label: 'Urgent', desc: 'Binnen 48 uur nodig' },
                                    ].map(u => (
                                        <button
                                            key={u.value}
                                            onClick={() => update('urgency', u.value)}
                                            style={{
                                                flex: 1, padding: '0.75rem', borderRadius: '0.5rem', textAlign: 'left',
                                                border: form.urgency === u.value ? '2px solid var(--gold)' : '1.5px solid var(--gray-200)',
                                                background: form.urgency === u.value ? 'var(--cream)' : '#fff',
                                                cursor: 'pointer',
                                            }}
                                        >
                                            <div style={{ fontWeight: 600, fontSize: '0.875rem', color: u.value === 'urgent' ? 'var(--danger)' : 'var(--navy)' }}>{u.label}</div>
                                            <div style={{ fontSize: '0.75rem', color: 'var(--gray-500)' }}>{u.desc}</div>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Step 2: Requirements */}
                    {step === 2 && (
                        <div className="animate-fade-in">
                            <h3 style={{ marginBottom: '1.5rem' }}>Vereisten</h3>

                            <div className="form-group">
                                <label className="form-label">Talen vereist</label>
                                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                                    {['NL', 'EN', 'DE', 'FR'].map(l => (
                                        <button
                                            key={l}
                                            onClick={() => toggleArrayItem('languages', l)}
                                            className={`badge ${form.languages.includes(l) ? 'badge-active' : ''}`}
                                            style={{ cursor: 'pointer', padding: '0.375rem 0.875rem', border: form.languages.includes(l) ? 'none' : '1px solid var(--gray-200)' }}
                                        >
                                            {l}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="form-label">Certificeringen vereist</label>
                                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                                    {['HACCP', 'SVH', 'BHV', 'Sociale Hygiëne'].map(c => (
                                        <button
                                            key={c}
                                            onClick={() => toggleArrayItem('certifications', c)}
                                            className={`badge ${form.certifications.includes(c) ? 'badge-active' : ''}`}
                                            style={{ cursor: 'pointer', padding: '0.375rem 0.875rem', border: form.certifications.includes(c) ? 'none' : '1px solid var(--gray-200)' }}
                                        >
                                            {c}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <div className="form-group">
                                    <label className="form-label">Budget min (€/uur)</label>
                                    <input type="number" className="form-input" value={form.budgetMin} onChange={e => update('budgetMin', e.target.value)} placeholder="25" />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Budget max (€/uur)</label>
                                    <input type="number" className="form-input" value={form.budgetMax} onChange={e => update('budgetMax', e.target.value)} placeholder="45" />
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="form-label">Dresscode</label>
                                <input type="text" className="form-input" value={form.dressCode} onChange={e => update('dressCode', e.target.value)} placeholder="Bijv. koksbuis, zwarte broek" />
                            </div>

                            <div className="form-group">
                                <label className="form-label">Bijzonderheden / opmerkingen</label>
                                <textarea className="form-input" value={form.specialNotes} onChange={e => update('specialNotes', e.target.value)} placeholder="Bijv. ervaring met banqueting, allergenen-kennis, etc." />
                            </div>
                        </div>
                    )}

                    {/* Step 3: Contact & Company */}
                    {step === 3 && (
                        <div className="animate-fade-in">
                            <h3 style={{ marginBottom: '1.5rem' }}>Contactgegevens</h3>

                            <div className="form-group">
                                <label className="form-label">Bedrijfsnaam *</label>
                                <input type="text" className="form-input" value={form.companyName} onChange={e => update('companyName', e.target.value)} placeholder="Hotel naam" />
                            </div>

                            <div className="form-group">
                                <label className="form-label">
                                    KvK-nummer *
                                    <span style={{ marginLeft: '0.5rem', fontWeight: 400, color: 'var(--gray-400)' }}>(verplicht)</span>
                                </label>
                                <input type="text" className="form-input" value={form.kvkNumber} onChange={e => update('kvkNumber', e.target.value)} placeholder="12345678" maxLength={8} />
                                <div className="form-hint" style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                                    <AlertCircle size={12} />
                                    KvK-nummer is verplicht voor facturatie en compliance. Wij controleren dit automatisch.
                                </div>
                            </div>

                            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                                <div className="form-group">
                                    <label className="form-label">Uw naam *</label>
                                    <input type="text" className="form-input" value={form.contactName} onChange={e => update('contactName', e.target.value)} placeholder="Jan de Vries" />
                                </div>
                                <div className="form-group">
                                    <label className="form-label">Telefoonnummer</label>
                                    <input type="tel" className="form-input" value={form.contactPhone} onChange={e => update('contactPhone', e.target.value)} placeholder="+31 6 12345678" />
                                </div>
                            </div>

                            <div className="form-group">
                                <label className="form-label">E-mailadres *</label>
                                <input type="email" className="form-input" value={form.contactEmail} onChange={e => update('contactEmail', e.target.value)} placeholder="u@hotel.nl" />
                            </div>

                            <div style={{
                                background: 'var(--cream)',
                                padding: '1rem',
                                borderRadius: '0.5rem',
                                fontSize: '0.8rem',
                                color: 'var(--gray-600)',
                                marginTop: '1rem',
                            }}>
                                <strong>Gegevensverwerking:</strong> Uw gegevens worden uitsluitend gebruikt voor het verwerken van deze aanvraag. Wij delen geen data met derden. Zie ons{' '}
                                <a href="/privacy" style={{ color: 'var(--gold-dark)' }}>privacybeleid</a>.
                            </div>
                        </div>
                    )}

                    {/* Navigation */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid var(--gray-200)' }}>
                        {step > 1 ? (
                            <button className="btn btn-outline" onClick={() => setStep(s => s - 1)}>
                                <ArrowLeft size={16} /> Vorige
                            </button>
                        ) : <div />}

                        {step < 3 ? (
                            <button className="btn btn-primary" onClick={() => setStep(s => s + 1)}>
                                Volgende <ArrowRight size={16} />
                            </button>
                        ) : (
                            <button
                                className="btn btn-primary btn-lg"
                                onClick={handleSubmit}
                                disabled={submitting}
                            >
                                {submitting ? 'Bezig...' : 'Aanvraag versturen'} {!submitting && <ArrowRight size={16} />}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}
